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

    private String foodName;
    private String barcode;
    private String pogDaycnt;

    @OneToOne
    @JoinColumn(name = "FOOD_CATEGORY_ID")
    private FoodCategory foodCategory;


}
