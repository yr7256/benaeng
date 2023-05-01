package com.ssafy.benaeng.domain.user.controller;

import com.ssafy.benaeng.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final HttpSession httpSession;
    private final UserService userService;
    @GetMapping("/check")
    public ResponseEntity<String> check(){
        log.info("------------check of User controller-------------");
        return new ResponseEntity<>("안녕 나는 check야 ", HttpStatus.OK);
    }
    @GetMapping("/social/{code}")
    public ResponseEntity<String> code(@PathVariable("code") String code){
        log.info("------------code of User controller-------------");
        log.info("인가 코드 : " + code);
        /**
         * user service에서
         * token 발급 받고
         * token 받은 걸로 사용자 정보 가져오기
         * 사용자 정보 가져온 걸로 DB에 있는지 확인하고
         * DB에 없으면 회원가입
         * access token 발급하고
         * response 보내기
         * */

        String accessToken = userService.getKakaoToken(code);
        log.info("kakao access token : " + accessToken);
        String temp = "kakao access token : " + accessToken;

        /**
         * accessToken 발급하고
         * response 보내기
         * */
        log.info("이미 가입된 유저");
        return new ResponseEntity<>(temp, HttpStatus.OK);
    }

}
