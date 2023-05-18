# Web Push Notification

브라우저 환경에서 푸시 알림을 받을 수 있는 기능

### 동작

- Pull
    - 클라이언트가 서버에 데이터를 요청하고 서버가 클라이언트에게 데이터를 응답하는 것
- Push
    - 클라이언트가 요청하지 않았지만 서버가 클라이언트에게 데이터를 밀어 넣는 것

### 웹 푸시의 기본 구성요소

1. 클라이언트
2. 푸시 알림을 전송할 서버
3. 푸시 알림을 사용자에게 전달할 푸시 서비스

**서버에서 어떤 사용자에게 어떤 메시지를 보낼지에 대한 내용이 담긴 메시지 데이터를 푸시 서비스로 전달하면 푸시 서비스에서 해당 사용자에게 알림을 전달한다.**

![image](https://user-images.githubusercontent.com/43427305/232808019-811ad1c7-8ff2-44fd-8b4a-c4ba83d09ff1.png)

- subscribe : 푸시 서비스 구독 요청
- push subscription : 구독 정보
- push message : 메시지 전달
- unsubscribe : 푸시 서비스 구독 취소

참고

[https://geundung.dev/114](https://geundung.dev/114)
