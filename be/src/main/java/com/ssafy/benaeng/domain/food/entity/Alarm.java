package com.ssafy.benaeng.domain.food.entity;

import com.ssafy.benaeng.domain.user.entity.User;
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
    @Column(name = "alarm_id")
    private Long id;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;
    private Integer type;
    private Integer status;
    private Date createDate;
    private Integer dDay;
    private String foodName;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "my_food_id")
    private MyFood food;
    @OneToOne
    @JoinColumn(name = "food_category_id")
    private FoodCategory foodCategory;
}
