## Access Token과 Refresh Token

보통 Refresh Token은 로그인 성공시 발급되며 저장소에 저장하여 관리된다.
그리고 사용자가 로그아웃을 하면 저장소에서 Refresh Token을 삭제하여 사용이 불가능하도록 한다. 사용이 불가능한 이유는 아래 재발급 과정을 확인하면 알 수 있다.

Access Token이 만료되어 재발급이 진행되면 다음의 과정을 통해 재발급이 된다.

RefreshToken을 AccessToken 처럼 HTTP 헤더의 Authorization 속성으로 전달 받는다.
토큰의 payload(Subject)의 type을 통해 ATK인지 RTK인지 구분한다.
RTK이며, URI가 /account/reissue인 경우 재발급을 진행한다.
ATK 재발급은 RTK의 payload에서 유저의 email을 꺼낸 뒤, Redis 인메모리에 해당 유저의 존재 유무로 결정된다.
TokenResponse에 새로운 ATK를 넣어 응답한다.
Redis 사용하기
ATK 재발급을 위해 Redis 인메모리 저장소를 사용한다.
키-벨류 형식으로 저장되는데 email-RTK 형식으로 저장한다.

사실상 RTK는 /account/reissue로 접근 시, RTK Subject에서 email을 꺼낸 후 더 이상 이용되지 않는다.

왜? 이미 /account/reissue로 접근하기 위해서는 유효한 RTK이어야 하며, 유효한 RTK에서 꺼낸 email이기 때문이다.

기본적으로 Redis가 설치되어있어야 한다. (Docker를 사용하면 간단함.)
Redis 설치 참고

프로젝트에 Redis 설정은 다음의 과정을 통해 진행된다.

디펜던시 추가
RedisConfig 작성
RedisDao 작성
Redis 디펜던시 추가
간단하게 build.gradle에 다음을 추가한다.

implementation 'org.springframework.boot:spring-boot-starter-data-redis'
RedisConfig 작성
디펜던시을 추가하였기 때문에 이제 설정파일을 작성한다.

RedisConfig에 Redis의 HOST 및 PORT값을 설정하기 위해 설정파일에(application.yml 또는 application.properties) 추가해야한다.

아래의 PORT 값은 설치된 Redis가 동작하고있는 port값을 넣는다.
Redis는 기본적으로 6379로 동작한다.

spring:
...
redis:
host: localhost
port: 6379
RedisConfig
아래의 위치에 작성한다.
/springbootjwt/config/RedisConfig.java

@Configuration
@EnableRedisRepositories
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }

}
RedisDao
어디서든 redisTemplate를 받아와서 set, get, delete.. 등을 사용할 수 있으나 그렇게 사용하지 않고 RedisDao를 작성하여 사용한다.

RedisDao
아래의 위치에 작성한다.
/springbootjwt/common/RedisDao.java

redisTemplate의 사용법은 자세히 다루지 않는다.

이제 아래의 메서드를 통해 redis 저장소에 Key-Value 쌍으로 데이터를 넣고 가져오며 삭제 가능하다.

## 데이터 모델링 이란?

데이터 모델링이란 정보시스템 구축의 대상이 되는 업무 내용을 분석하여 이해하고 약속된 표기법에 의해 표현하는걸 의미한다. 그리고 이렇게 분석된 모델을 가지고 실제 데이터베이스를 생성하여 개발 및 데이터 관리에 사용된다.

특히 데이터를 추상화한 데이터 모델은 데이터베이스의 골격을 이해하고 그 이해를 바탕으로 SQL문장을 기능과 성능적인 측면에서 효율적으로 작성할 수 있기 때문에, 데이터 모델링은 데이터베이스 설계의 핵심 과정이기도 하다.
