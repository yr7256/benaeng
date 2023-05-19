package com.ssafy.benaeng.domain.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.ssafy.benaeng.domain.food.entity.FoodData;
import com.ssafy.benaeng.domain.food.repository.FoodDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final FoodDataRepository foodDataRepository;
    private final AmazonS3 amazonS3;
    private final AmazonS3Client amazonS3Client;

    public List<String> uploadImage(MultipartFile multipartFile) {
        List<String> fileNameList = new ArrayList<>();

//        multipartFile.forEach(file -> {
//            String fileName = createFileName(file.getOriginalFilename());
//            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentLength(file.getSize());
//            objectMetadata.setContentType(file.getContentType());
//
//            try(InputStream inputStream = file.getInputStream()) {
//                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                        .withCannedAcl(CannedAccessControlList.PublicRead));
//            } catch(IOException e) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//            }
//
//            fileNameList.add(fileName);
//        });
        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
        }

        fileNameList.add(fileName);
        return fileNameList;
    }

    public void deleteImage(String fileName) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }
    public String getThumbnailPath(String path) {
        return amazonS3Client.getUrl(bucket, path).toString();
    }

    @Override
    public FoodData getBarcode(String path) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-OCR-SECRET" , "akVtSVBDaGxyaFN2d2h0T2Vaam56S3l4anpJem9ackw=");
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("lang", "ko");
        jsonObject.addProperty("requestId", "string");
        jsonObject.addProperty("resultType", "string");
        long timestamp = System.currentTimeMillis();
        jsonObject.addProperty("timestamp", timestamp);
        jsonObject.addProperty("version", "V1");

        JsonArray imagesArray = new JsonArray();
        JsonObject imagesObject = new JsonObject();
        imagesObject.addProperty("format", "jpg");
        imagesObject.addProperty("name", "medium");
        imagesObject.addProperty("data", (Boolean) null);
        imagesObject.addProperty("url", path);
        imagesArray.add(imagesObject);

        jsonObject.add("images", imagesArray);
        HttpEntity<String> entity = new HttpEntity<String>(jsonObject.toString(), headers);
        String url = "https://ko2s2s8rt1.apigw.ntruss.com/custom/v1/21967/daa565e94a765520362474fe25806000f502042e1cfdcd08107d9467a6e5edc3/general";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String responseBody = response.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.getBody());
        JsonNode imagesNode = rootNode.get("images");
        String result = "";
        for (JsonNode imageNode : imagesNode) {
            JsonNode fieldsNode = imageNode.get("fields");
            for (JsonNode fieldNode : fieldsNode) {
                String inferText = fieldNode.get("inferText").asText();
                // Do something with inferText
                result += inferText;
            }
        }
        System.out.println(result);
        List<FoodData> foodData = foodDataRepository.findAllByBarcode(result);
        System.out.println(response.getStatusCodeValue());
        return foodData.get(foodData.size()-1);
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}