package com.ssafy.benaeng.domain.food.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

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
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private int totalContents;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double calories;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double carbohydrates;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double cholesterol;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double fat;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double protein;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double saturatedFattyAcids;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double sodium;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double sugars;
    @Column(nullable = true, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private double transFat;
    private String foodName;

}
