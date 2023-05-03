package com.ssafy.benaeng.domain.food.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.benaeng.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PURCHASE_ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "food_category_id")
    private FoodCategory foodCategory;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long cnt;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date firstDate;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date lastDate;

}


