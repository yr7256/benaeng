package com.ssafy.benaeng.domain.image.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.benaeng.domain.food.entity.FoodData;
import com.ssafy.benaeng.domain.image.service.AwsS3ServiceImpl;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class AmazonS3Controller {

    private final AwsS3ServiceImpl awsS3Service;
    @PostMapping("/image")
    public CommonDto<FoodData> uploadImage(@RequestPart MultipartFile multipartFile) throws JsonProcessingException {
        List<String> fileName = awsS3Service.uploadImage(multipartFile);
        String path = awsS3Service.getThumbnailPath(fileName.get(0));
        System.out.println(path);
        FoodData foodData = awsS3Service.getBarcode(path);
        if(foodData != null)return CommonDto.of("200" , "요청한 바코드의 식품정보입니다." , foodData);
        else return CommonDto.of("400" , "요청한 바코드의 식품정보가 존재하지 않습니다." , null);
    }

    @GetMapping("/image")
    public CommonDto<String> getImage(@RequestParam String fileName){
        return CommonDto.of("200" ,"이미지 경로입니다." , awsS3Service.getThumbnailPath(fileName));
    }
    @DeleteMapping("/image")
    public CommonDto<Void> deleteImage(@RequestParam String fileName) {
        awsS3Service.deleteImage(fileName);
        return  CommonDto.of("200" , "이미지를 삭제합니다." , null);
    }
}