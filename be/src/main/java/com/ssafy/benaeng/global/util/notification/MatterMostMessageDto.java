package com.ssafy.benaeng.global.util.notification;

import lombok.AllArgsConstructor;

import java.util.List;

public class MatterMostMessageDto {

    public static class Attachments {
        private final List<Attachment> attachments;
        private final Props props;

        public Attachments(Attachment attachment, Props props) {
            this.attachments = List.of(attachment);
            this.props = props;
        }
    }

    @AllArgsConstructor
    public static class Attachment {
        private String title;
        private String text;
        private String color;
        private String footer;
    }

    public static class Props {
        private String card;

        public Props(String stackTrace) {
            this.card = stackTrace;
        }
    }
}