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

@CrossOrigin
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    /**
     * login API
     * @param code  kakao authorization code
     * @return      login result
     */
    @GetMapping("/social/{code}")
    public CommonDto<Object> login(@PathVariable("code") String code){
        try {
            UserDto user = userService.login(code);
            return CommonDto.of("200", "login 성공", user);
        }catch (Exception re){
            return CommonDto.of("400", "login 실패", re.getMessage());
        }
    }

    /**
     * get user information API
     * @param userId    user identification value
     * @param request
     * @return
     */
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

    /**
     * change user information API
     * @param userId            user identification value
     * @param updateUserDto     changed user information
     * @return
     */
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

    /**
     * logout API
     * @param userId    user identification value
     * @return
     */
    @GetMapping("/user/logout")
    public CommonDto<Object> logout(@AuthenticationPrincipal String userId){
        Long id = Long.parseLong(userId);
        try {
            userService.logout();
            log.info("logout " + userId);
            return CommonDto.of("200", "사용자 정보 변경 성공", id);
        }catch(RuntimeException re){
            return CommonDto.of("400", "사용자 정보 변경 실패", re.getMessage());
        }
    }

}
