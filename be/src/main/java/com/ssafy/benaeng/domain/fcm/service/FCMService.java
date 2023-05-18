package com.ssafy.benaeng.domain.fcm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.ssafy.benaeng.domain.fcm.dto.FCMMessage;
import com.ssafy.benaeng.domain.food.repository.alarm.AlarmRepository;
import com.ssafy.benaeng.domain.food.repository.alarm.AlarmRepositoryCustom;
import com.ssafy.benaeng.domain.food.responseDto.FcmAlarmDto;
import com.ssafy.benaeng.domain.user.entity.User;
import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FCMService {
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private String title = "냉장고를 확인하세요!";

    @Value("${fcm.api-url}")
    private String url;

    public void sendMessageTo(String deviceToken) throws IOException {
        FcmAlarmDto fcmAlarmDto = alarmRepository.getFcmAlarm(deviceToken);
        int imminentCnt = fcmAlarmDto.getImminentCnt();
        int expirationCnt = fcmAlarmDto.getExpirationCnt();
        int periodCnt = fcmAlarmDto.getPeriodCnt();
        sendToDevice(deviceToken, imminentCnt, expirationCnt, periodCnt);
    }

    @Scheduled(cron = "0 0 13 * * *")
    public void sendMessageTo() throws IOException {
        List<FcmAlarmDto> alarmList = alarmRepository.getFcmAlarmList();
        System.out.println(alarmList.size());
        for (FcmAlarmDto fcmAlarmDto : alarmList) {
            String deviceToken = fcmAlarmDto.getDeviceToken();
            int imminentCnt = fcmAlarmDto.getImminentCnt();
            int expirationCnt = fcmAlarmDto.getExpirationCnt();
            int periodCnt = fcmAlarmDto.getPeriodCnt();
            sendToDevice(deviceToken, imminentCnt, expirationCnt, periodCnt);
        }
    }

    void sendToDevice(String deviceToken, int imminentCnt, int expirationCnt, int periodCnt) throws IOException{
        StringBuilder body = new StringBuilder();
        if (imminentCnt != 0) {
            body.setLength(0);
            body.append("소비기한이 임박한 상품 ").append(imminentCnt).append("개가 존재합니다.");
            sendMessageTo(deviceToken, body.toString());
        }

        if (expirationCnt != 0) {
            body.setLength(0);
            body.append("소비기한이 만료된 상품 ").append(expirationCnt).append("개가 존재합니다.");
            sendMessageTo(deviceToken, body.toString());
        }

        if (periodCnt != 0) {
            body.setLength(0);
            body.append("구매 주기가 돌아온 상품").append(periodCnt).append("개가 존재합니다.");
            sendMessageTo(deviceToken, body.toString());
        }
    }

    public void sendMessageTo(String deviceToken, String body) throws IOException {
        String message = makeMessage(deviceToken, body);
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();
        Response response = client.newCall(request)
                .execute();
    }

    private String makeMessage(String deviceToken, String body) throws JsonProcessingException {
        FCMMessage fcmMessage = FCMMessage.builder()
                .message(FCMMessage.Message.builder()
                        .token(deviceToken)
                        .notification(FCMMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .build()
                        )
                        .build()
                )
                .validateOnly(false)
                .build();
        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/firebase_service_key.json";
        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

    public void setUserDeviceToken(Long userId, String deviceToken) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setDeviceToken(deviceToken);
        userRepository.save(user);
    }
}