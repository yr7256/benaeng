package com.ssafy.benaeng.domain.user.controller;

import com.ssafy.benaeng.domain.user.entity.User;
import com.ssafy.benaeng.domain.user.requestDto.UpdateUserDto;
import com.ssafy.benaeng.domain.user.responseDto.UserDto;
import com.ssafy.benaeng.domain.user.responseDto.loginUserDto;
import com.ssafy.benaeng.domain.user.service.UserService;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final HttpSession httpSession;
    private final UserService userService;
    @GetMapping("/social/{code}")
    public CommonDto<Object> code(@PathVariable("code") String code, HttpServletResponse response) throws Exception{
        try {
            loginUserDto user = userService.login(code, response);
            log.info("--------------------code of UserController--------------------");
            log.info("accessToken : " + user.getAccessToken());
            log.info(user.toString());
            return CommonDto.of("200", "login 성공", user);
        }catch (RuntimeException re){
            return CommonDto.of("400", "login 실패", re.getMessage());
        }
    }
    @PutMapping("/user")
    public CommonDto<Object> update(@AuthenticationPrincipal String userId, @RequestBody UpdateUserDto updateUserDto){
        Long id = Long.parseLong(userId);
        try {
            UserDto user = userService.updateUser(id, updateUserDto);
            return CommonDto.of("200", "사용자 정보 변경 성공", user);
        }catch(RuntimeException re){
            return CommonDto.of("400", "사용자 정보 변경 실패", re.getMessage());
        }
    }

}
