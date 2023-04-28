package com.ssafy.benaeng.domain.food.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_info_id")
    private Long id;

    private String name;
    private String barcode;
    private int pog_daycnt;

    @OneToOne
    private FoodCategory foodCategory;


}
