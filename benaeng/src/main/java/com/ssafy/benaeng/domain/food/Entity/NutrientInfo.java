package com.ssafy.benaeng.domain.food.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NutrientInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NUTRIENT_INFO_ID")
    private Long id;
    private double calories;
    private double carbohydrates;
    private double cholesterol;
    private double fat;
    private double protein;
    private double saturated_fatty_acids;
    private double sodium;
    private double sugars;
    private double trans_fat;
    private String food_name;

}
