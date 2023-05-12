package com.ssafy.benaeng.domain.user.repository;

import com.ssafy.benaeng.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

}
