package com.ssafy.benaeng.domain.user.controller;

import com.ssafy.benaeng.domain.user.responseDto.UpdateUserDto;
import com.ssafy.benaeng.domain.user.responseDto.UserDto;
import com.ssafy.benaeng.domain.user.service.UserService;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@CrossOrigin
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
            UserDto user = userService.login(code, response);
            return CommonDto.of("200", "login 성공", user);
        }catch (RuntimeException re){
            return CommonDto.of("400", "login 실패", re.getMessage());
        }
    }
    @GetMapping("/user")
    public CommonDto<Object> getUser(@AuthenticationPrincipal String userId, HttpServletRequest request){
        Long id = Long.parseLong(userId);
        try {
            UserDto user = userService.getUser(request, id);
            return CommonDto.of("200", "사용자 정보 획득 성공", user);
        }catch(RuntimeException re){
            return CommonDto.of("400", "사용자 정보 획득 실패", re.getMessage());
        }
    }
    @PutMapping("/user")
    public CommonDto<Object> update(@AuthenticationPrincipal String userId, @RequestBody com.ssafy.benaeng.domain.user.requestDto.UpdateUserDto updateUserDto){
        Long id = Long.parseLong(userId);
        try {
            UpdateUserDto user = userService.updateUser(id, updateUserDto);
            return CommonDto.of("200", "사용자 정보 변경 성공", user);
        }catch(RuntimeException re){
            return CommonDto.of("400", "사용자 정보 변경 실패", re.getMessage());
        }
    }

    @GetMapping("/user/logout")
    public CommonDto<Object> update(@AuthenticationPrincipal String userId){
        Long id = Long.parseLong(userId);
        try {
            userService.logout();
            return CommonDto.of("200", "사용자 정보 변경 성공", id);
        }catch(RuntimeException re){
            return CommonDto.of("400", "사용자 정보 변경 실패", re.getMessage());
        }
    }

}
