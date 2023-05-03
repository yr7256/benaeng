package com.ssafy.benaeng.domain.user.service;

import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("--------------------loadUserByUsername");
        log.info("username : " + username);
        UserDetails userDetails = userRepository.findById(Long.parseLong(username))
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        log.info("userDetails : " + userDetails.getUsername() + " | " + userDetails.getPassword());
        return userDetails;
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(com.ssafy.benaeng.domain.user.entity.User user) {
        log.info("----------- createUserDetails");
        String encode = passwordEncoder.encode(user.getPassword());
        UserDetails build = User.builder()
                .username(String.valueOf(user.getUsername()))
                .password(passwordEncoder.encode(user.getPassword()))
                .roles("USER")
                .build();
        return build;
    }
}
