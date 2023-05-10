package com.ssafy.benaeng.domain.food.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alram_id")
    private Long id;

    private int type;
    private int status;
    private Date createTime;
    private int dDay;
    private String foodName;
    private Long foodId;
    private Long foodCategoryId;
    private String msg;



}
