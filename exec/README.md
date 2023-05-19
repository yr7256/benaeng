# 1. Docker Engine 설치

이전 버전 제거
```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

apt 패키지를 업데이트하고 HTTPS를 통해 리포지토리를 사용할 수 있도록 패키지를 설치
```bash
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```

Docker의 공식 GPG 키 추가
```bash
$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

다음 명령을 사용하여 리포지토리를 설정
```bash
$ echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Docker Engine, containerd, Docker Compose 설치
```bash
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

hello-world 이미지를 실행하여 Docker 엔진 설치가 성공했는지 확인
```bash
$ sudo docker run hello-world
```

# 2. Nginx에 Nginx 및 SSL 인증서 설치

Nginx & Let’s Encrypt 설치
```bash
$ sudo apt update
$ sudo apt-get install nginx
$ sudo apt-get install letsencrypt
```

인증서 적용 및 .pem 키 발급
```bash
$ sudo letsencrypt certonly --standalone -d [domain]
$ cd /etc/letencrypt/live/[domain]
```
해당 명령어 입력 후 이메일 입력(선택사항), 서비스 이용 동의(필수), 정보 수집(선택사항)을 하고나면 Congratulation!이라는 메시지와 함께 .pem키 발급이 완료된 것을 확인

Nginx 기본 구성 파일 수정
```bash
$ cd /etc/nginx/sites-available
$ sudo vi default
```

default 파일 수정
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name [domain];

        location / {
                return 301 https://[domain]$request_uri;
        }
}

server {
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/[domain]/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/[domain]/privkey.pem;

        location / {
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_pass http://localhost:8080;
        }
}
```

Nginx 재시작 및 상태 확인
```bash
$ sudo systemctl resstart nginx
$ sudo systemctl status nginx
```

# 3. MySQL 설치 및 실행

docker-compose.yml 작성
```
version: '1'
services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: database
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - TZ=Asia/Seoul
    volumes:
      - ./data/mysql:/var/lib/mysql
```

docker-compose.yml 실행
```bash
$ sudo docker compose up -d
```

# 4. Jenkins 설치 및 실행
Jenkins 설치
```bash
$ sudo docker pull jenkins/jenkins
$ sudo docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 --restart=on-failure jenkins/jenkins
```

Jenkins 대시보드 로그인 > Jenkins의 기능을 사용하기 위해 필요한 추가 플러그인을 설치 >
Freestyle project 생성 > 구성, Git 연동, Excute shell 작성 
```
# Frontend 빌드 및 실행
cd /var/jenkins_home/workspace/benaeng/fe
cp /var/jenkins_home/workspace/resources/.env /var/jenkins_home/workspace/benaeng/fe
npm i
npm run build
docker rm -f frontend
docker image rm frontend
docker build -t frontend .
docker run --name frontend -d -p 3000:3000 frontend

# Backend 빌드 및 실행
cd /var/jenkins_home/workspace/benaeng/be
cp /var/jenkins_home/workspace/resources/application-local.yml /var/jenkins_home/workspace/benaeng/be/src/main/resources
cp /var/jenkins_home/workspace/resources/firebase_service_key.json /var/jenkins_home/workspace/benaeng/be/src/main/resources/firebase
chmod 777 ./gradlew
./gradlew clean build
docker rm -f backend
docker rmi backend
docker build -t backend .
docker run --name backend -d -p 8080:8080 backend

# Mattermost Webhook URL
WEBHOOK_URL="https://meeting.ssafy.com/hooks/szcz7pztwtff3k1ia5iuqtbgdo"

# Jenkins 환경 변수
BUILD_STATUS=${BUILD_STATUS}
JOB_NAME=${JOB_NAME}
BUILD_NUMBER=${BUILD_NUMBER}
BUILD_URL=${BUILD_URL}

# Mattermost에 보낼 메시지 생성
if [ "${BUILD_STATUS}" = "FAILURE" ]; then
  MESSAGE="빌드 실패: [${JOB_NAME}] 빌드 #${BUILD_NUMBER}\n\n빌드 결과 페이지: ${BUILD_URL}"
else
  MESSAGE="빌드 성공: [${JOB_NAME}] 빌드 #${BUILD_NUMBER}\n\n빌드 결과 페이지: ${BUILD_URL}"
fi

# Mattermost로 메시지 전송
curl -X POST -H 'Content-Type: application/json' --data '{"text": "'"${MESSAGE}"'"}' ${WEBHOOK_URL}
```

# 5. Flutter 설치 및 실행
```
# Flutter 앱의 App Bundle 파일 빌드 명령어
flutter build appbundle

# BundleTool을 사용하여 APK 파일 생성 명령어
java -jar bundletool-all-1.15.0.jar build-apks --bundle=my_app.aab --output=my_app.apks --mode=universal
```

# 환경 설정 파일
## frontend
.env
```
VITE_REST_API_KEY=
VITE_KAKAO_REDIRECTURI=
VITE_LOGIN_REDIRECTURI=
```

## flutter
.env
```
storePassword=
keyPassword=
keyAlias=
storeFile=
```

## backend
application-local.yml
```
spring:
  jpa:
    hibernate:
      ddl-auto:
    properties:
      hibernate:
  datasource:
    driver-class-name: 
    url: 
    username: 
    password: 

notification:
  webhook-url:
    mattermost: 

jwt:
  token:
    secret-key:
  access-token:
    expire-length:

fcm:
  api-url:
cloud:
  aws:
    s3:
      bucket:
    credentials:
      access-key:
      secret-key:
    region:
      static:
    stack:
      auto: false
```

firebase_service_key.json
1. Firebase 콘솔에 로그인(https://console.firebase.google.com/)
2. 프로젝트를 선택 후 왼쪽 메뉴에서 프로젝트 설정 선택
3. 서비스 계정탭 선택 후 새 비공개 키 생성
4. 비공개 키를 생성할 서비스 계정 선택 후 역할 선택
5. firebase_service_key.json 키 생성
6. spring boot 프로젝트 src/main/resources/firebase에 저장