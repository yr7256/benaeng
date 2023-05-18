package com.ssafy.benaeng.global.util.notification;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Enumeration;

import static com.ssafy.benaeng.global.util.notification.MatterMostMessageDto.*;

@RequiredArgsConstructor
public class MatterMostSender implements NotificationSender {
    private final RestTemplate restTemplate;
    @Value("${notification.webhook-url.mattermost}")
    private String webhookUrl;

    public void sendNotification(HttpServletRequest request, Exception e) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        Props props = new Props(getStackTrace(e));
        Attachment attachment = getAttachment(request, e);
        Attachments attachments = new Attachments(attachment, props);
        Gson gson = new Gson();
        String body = gson.toJson(attachments);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        restTemplate.postForEntity(webhookUrl, entity, String.class);
    }

    private Attachment getAttachment(HttpServletRequest request, Exception e) {
        String text = getText(request, e);
        String title = getTitle(e);
        String color = "#FF0000";
        String footer = getFooter();
        return new Attachment(title, text, color, footer);
    }

    private String getTitle(Exception e) {
        return e.getClass().getName();
    }

    private String getText(HttpServletRequest request, Exception e) {
        StringBuilder text = new StringBuilder();
        text.append("```Error Message```\n").append(e.getMessage()).append("\n");
        text.append("```Request URL```\n").append("[").append(request.getMethod()).append("] ").append(request.getRequestURI()).append("\n");
        text.append("```Parameters```\n").append(getParameters(request));
        return text.toString();
    }

    private String getFooter() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    private String getParameters(HttpServletRequest request) {
        StringBuilder parameters = new StringBuilder();
        Enumeration<String> keys = request.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            parameters.append(key).append("=").append(request.getParameter(key)).append("\n");
        }
        return parameters.toString();
    }

    private String getStackTrace(Exception e) {
        StringBuilder stackTrace = new StringBuilder();
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw));
        stackTrace.append("**Stack Trace**").append("\n\n").append(sw.toString().substring(0, Math.min(5500, sw.toString().length())));
        return stackTrace.toString();
    }
}
