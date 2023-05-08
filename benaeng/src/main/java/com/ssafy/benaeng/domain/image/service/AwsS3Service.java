package com.ssafy.benaeng.domain.image.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.benaeng.domain.food.entity.FoodData;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AwsS3Service {
    List<String> uploadImage(MultipartFile multipartFile);
    void deleteImage(String fileName);
    String getThumbnailPath(String path);
    FoodData getBarcode(String path) throws JsonProcessingException;
}
