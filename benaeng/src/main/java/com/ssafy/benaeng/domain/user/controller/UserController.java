package com.ssafy.benaeng.domain.user.controller;

import com.ssafy.benaeng.domain.user.entity.User;
import com.ssafy.benaeng.domain.user.requestDto.UpdateUserDto;
import com.ssafy.benaeng.domain.user.responseDto.UserDto;
import com.ssafy.benaeng.domain.user.responseDto.loginUserDto;
import com.ssafy.benaeng.domain.user.service.UserService;
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
    public ResponseEntity<?> code(@PathVariable("code") String code, HttpServletResponse response) throws RuntimeException{
        try {
            loginUserDto user = userService.login(code, response);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch (RuntimeException re){
            return new ResponseEntity<>(re.getMessage(), HttpStatus.OK);
        }
    }
    @PutMapping("/user")
    public ResponseEntity<?> update(@AuthenticationPrincipal String userId, @RequestBody UpdateUserDto updateUserDto){
        Long id = Long.parseLong(userId);
        UserDto user = userService.updateUser(id, updateUserDto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
