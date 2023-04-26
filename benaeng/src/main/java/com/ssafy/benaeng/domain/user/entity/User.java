package com.ssafy.benaeng.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

//    @Column(nullable = false)
//    private String profile;

    private String email;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

//    public User(String name, String profile, String email, Role role){
    public User(String name, String email, Role role){
        this.name = name;
        this.email = email;
        this.role = role;

    }
    public User update(String name, String email){
        this.name = name;
        this.email = email;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}
