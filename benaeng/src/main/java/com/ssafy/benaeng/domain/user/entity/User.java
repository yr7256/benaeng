package com.ssafy.benaeng.domain.user.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    private Long id;

    private String name;

    private Boolean isDark;

    private Boolean isAlarm;

    private  Boolean isPurchase;

    private  Boolean isCycle;


    @Builder.Default
    private String role = "USER";

    public User updateUser(Boolean isDark, Boolean isAlarm, Boolean isPurchase, Boolean isCycle){
        this.isDark = isDark;
        this.isAlarm = isAlarm;
        this.isPurchase = isPurchase;
        this.isCycle = isCycle;
        return this;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }


    @Override
    public String getPassword() {
        return name;
    }

    @Override
    public String getUsername() {
        return String.valueOf(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
