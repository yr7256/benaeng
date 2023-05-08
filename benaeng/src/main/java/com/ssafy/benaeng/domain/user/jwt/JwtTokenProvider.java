package com.ssafy.benaeng.domain.user.jwt;

import com.ssafy.benaeng.domain.user.entity.JwtToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private final Key key;
    @Value("${jwt.access-token.expire-length}") Long accessExpire;
    @Value("${jwt.refresh-token.expire-length}") Long refreshExpire;

    public JwtTokenProvider(@Value("${jwt.token.secret-key}") String secret){
        byte[] secretByte = DatatypeConverter.parseBase64Binary(secret);
        this.key = Keys.hmacShaKeyFor(secretByte);
    }

    public JwtToken generateToken(Authentication authentication){
        log.info("-----------------generateToken of JwtTokenProvider--------------------");
        String authorities = authentication.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Long now = (new Date()).getTime();
        Date accessTokenExpire = new Date(now + accessExpire);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpire)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .build();
    }
    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        log.info("-----------validateToken of JwtTokenProvider0--------------");
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }

    // JWT 토큰을 복호화해 토큰에 들어있는 정보 Get
    public Authentication getAuthentication(String accessToken) {
        log.info("-----------getAuthentication of JwtTokenProvider0--------------");
        Claims claims = parseClaims(accessToken);

        if(claims.get("auth") == null){
            throw new RuntimeException("권한 정보가 없는 토큰");
        }
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    private Claims parseClaims(String accessToken){
        try{
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        }catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }
    public String resolveToken(HttpServletRequest request) {
        log.info("-----------resolveToken of JwtTokenProvider0--------------");
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authorization")) {
                    String token = cookie.getValue();
                    log.info("cookie token : " + token);
                    return token;
                }
            }
        }
        // TODO exception
        return null;
    }

}