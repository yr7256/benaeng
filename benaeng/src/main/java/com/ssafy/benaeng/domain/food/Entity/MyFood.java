package com.ssafy.benaeng.domain.food.Entity;

import com.ssafy.benaeng.domain.user.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_email")
    private User user;

    @OneToOne
    @JoinColumn(name = "food_category_id")
    private FoodCategory foodCategory;


}
