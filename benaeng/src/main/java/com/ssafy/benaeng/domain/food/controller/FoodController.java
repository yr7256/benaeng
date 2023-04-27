package com.ssafy.benaeng.domain.food.controller;

import com.ssafy.benaeng.domain.food.RequestDto.RegistDto;
import com.ssafy.benaeng.domain.food.ResponseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/food")
public class FoodController {
    @PostMapping("/regist")
    public CommonDto<Object> resgistMyFood(@RequestBody RegistDto registDto) {
        try {
            busService.saveBusInfo(busInfo);
            return CommonDto.of("200", "버스 정보 저장됨", busInfo.getBusNumPad());
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }
}
