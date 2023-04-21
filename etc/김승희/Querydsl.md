# Querydsl

- 쿼리를 자바 코드로 작성
- 문법 오류를 컴파일 시점에 잡을 수 있음
    - jpql은 오류를 실행해야 알 수 있음
- 동적 쿼리 문제 해결
- 쉬운 SQL 스타일 문법
- Spring Data JPA + QueryDSL : 단순 반복 코드 없고 쿼리도 자바 코드로 작성 가능

## Querydsl 의 build.gradle

```java
buildscript {
	ext{
		queryDslVersion = "5.0.0"
	}
}
plugins {
	id 'java'
	id 'org.springframework.boot' version '2.7.11'
	id 'io.spring.dependency-management' version '1.0.15.RELEASE'
	// querydsl 추가
	id 'com.ewerk.gradle.plugins.querydsl' version '1.0.10'
}

group = 'com.study'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	// querydsl 추가
	implementation 'com.querydsl:querydsl-jpa'
	annotationProcessor "com.querydsl:querydsl-apt:${queryDslVersion}"

	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'com.h2database:h2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
	useJUnitPlatform()
}
//queydsl 추가 시작
def querydslDir = "$buildDir/generated/querydsl"

querydsl{
	jpa = true
	querydslSourcesDir = querydslDir
}
sourceSets{
	main.java.srcDir querydslDir
}

configurations{
	querydsl.extendsFrom compileClasspath
}
compileQuerydsl{
	options.annotationProcessorPath = configurations.querydsl
}
// querydsl 추가 끝 
```

### entity 추가 후

Gradle → Tasks → other → compileQuerydsl 더블 클릭

그러면 QueryDsl 빌드

### console에서 gradle build, clean

```java
./gradlew clean
./gradlew compileQuerydsl
./gradlew compileJava
```

만들어지는 Q type은 어차피 컴파일하면 자동 생성되기 때문에 버전 관리(git)에 포함되지 않는 것이 좋다. 

지금은 Q type이 build 폴더 안에 생기는데 build 폴더는 git ignore가 되기 때문에 신경쓰지 않아도 된다.

## Querydsl 라이브러리

- querydsl-apt : Querydsl 관련 코드 생성 기능 제공(Q type 생성)
- querydsl-jpa : Querydsl 라이브러리
