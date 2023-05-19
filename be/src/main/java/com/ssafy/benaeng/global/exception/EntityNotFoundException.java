package com.ssafy.benaeng.global.exception;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String entity){
        super(entity + "를 찾을 수 없습니다");
    }
}
