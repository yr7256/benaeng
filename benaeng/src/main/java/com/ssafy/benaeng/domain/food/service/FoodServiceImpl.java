package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.*;
import com.ssafy.benaeng.domain.food.repository.*;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodDataDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodMoreInfoDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodsDto;
import com.ssafy.benaeng.domain.food.responseDto.ReportDto;
import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService{
    private final FoodCategoryRepository foodCategoryRepository;
    private final NutrientInfoRepository nutrientInfoRepository;
    private final FoodDataRepository foodDataRepository;
    private final UserRepository userRepository;
    private final MyfoodRepository myfoodRepository;
    private final UsedFoodRepository usedFoodRepository;
    private final WastedFoodRepository wastedFoodRepository;
    private final PurchaseRepository purchaseRepository;
    @Override
    public MyFood saveMyFood(RegistDto registDto) {
        MyFood myFood = new MyFood();
        myFood.setFoodName(registDto.getFoodName());
        myFood.setFoodCategory(foodCategoryRepository.findById(registDto.getFoodCategoryId()).orElseThrow());
        myFood.setTotalCount(registDto.getTotalCount());
        myFood.setCount(registDto.getTotalCount());
        myFood.setUser(userRepository.findById(registDto.getUserId()).orElseThrow());
        if(registDto.getIsRecommend()){
            log.info("소비기한 계산로직이 들어갈예정입니다.");
            return null;
        }
        else{
            if(!registDto.getIsConsume()) {
                log.info("유통기한 기반 계산로직이 들어갈예정입니다.");
                return null;
            }
            else{
                log.info("소비기한을 입력했으므로 바로 저장합니다.");
                myFood.setStartDate(registDto.getStartDate());
                myFood.setEndDate(registDto.getEndDate());
            }
        }
        log.info("음식 {} (이)가 {}의 냉장고에 저장됩니다.",myFood.getFoodName() , myFood.getUser().getName());
        myfoodRepository.save(myFood);
        return myFood;
    }

    @Override
    public List<FoodsDto> findMyFoodList(Long userId) {

        List<MyFood> myFoodList = myfoodRepository.findAllByUserId(userId);
        List<FoodsDto> foodsDtoList = new ArrayList<>();
        for(MyFood mf : myFoodList){
            FoodsDto foodsDto = new FoodsDto();
            foodsDto.setFoodId(mf.getId());
            foodsDto.setFoodCategoryId(mf.getFoodCategory().getId());
            foodsDto.setStartDate(mf.getStartDate());
            foodsDto.setEndDate(mf.getEndDate());
            foodsDto.setTotalCount(mf.getTotalCount());
            foodsDto.setCount(mf.getCount());
            foodsDto.setFoodName(mf.getFoodName());
            foodsDtoList.add(foodsDto);
        }
        return foodsDtoList;
    }

    @Override
    public List<FoodCategory> findAllFoodCategory() {
        return foodCategoryRepository.findAll();
    }

    @Override
    public void changeStateMyFood(StateDto stateDto) throws ParseException {
        MyFood myFood = myfoodRepository.findById(stateDto.getMyFoodId()).orElseThrow();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        Date currentTime = new Date();
        String formattedTime = dateFormat.format(currentTime);
        if(stateDto.getStatus() == 1) {
            UsedFood usedFood = new UsedFood();
            usedFood.setFoodName(myFood.getFoodName());
            usedFood.setUser(myFood.getUser());
            usedFood.setFoodCategory(myFood.getFoodCategory());
            usedFood.setStartDate(myFood.getStartDate());
            usedFood.setEndDate(dateFormat.parse(formattedTime));
            usedFood.setId(myFood.getId());
            usedFoodRepository.save(usedFood);
        }
        else if(stateDto.getStatus() == 0) {
            WastedFood wastedFood = new WastedFood();
            wastedFood.setFoodName(myFood.getFoodName());
            wastedFood.setUser(myFood.getUser());
            wastedFood.setFoodCategory(myFood.getFoodCategory());
            wastedFood.setStartDate(myFood.getStartDate());
            wastedFood.setEndDate(dateFormat.parse(formattedTime));
            wastedFood.setId(myFood.getId());
            wastedFoodRepository.save(wastedFood);
        }
        myFood.setUser(null);
        myfoodRepository.save(myFood);
        myfoodRepository.deleteById(stateDto.getMyFoodId());
    }

    @Override
    public void changeCountMyFood(ChangeCountDto changeCountDto) {
        MyFood myFood = myfoodRepository.findById(changeCountDto.getMyFoodId()).orElseThrow();
        myFood.setCount(changeCountDto.getCount());
        myfoodRepository.save(myFood);
    }

    @Override
    public FoodMoreInfoDto getFoodMoreInfo(Long foodId) {
        FoodMoreInfoDto foodMoreInfoDto = new FoodMoreInfoDto();
        MyFood myFood = myfoodRepository.findById(foodId).orElseThrow();
        NutrientInfo nutrientInfo = nutrientInfoRepository.findByFoodName(myFood.getFoodName());
        Long cateId = myFood.getFoodCategory().getId();
        Long userId = myFood.getUser().getId();
        Long usedCount = usedFoodRepository.countByFoodCategoryIdAndUserId(cateId , userId);
        Long wastedCount = wastedFoodRepository.countByFoodCategoryIdAndUserId(cateId ,userId);
        Purchase purchaseInfo = purchaseRepository.findByFoodCategoryIdAndUserId(myFood.getFoodCategory().getId() , myFood.getUser().getId());
        foodMoreInfoDto.setFoodId(foodId);
        foodMoreInfoDto.setFoodName(myFood.getFoodName());
        foodMoreInfoDto.setTotal(myFood.getTotalCount());
        foodMoreInfoDto.setCount(myFood.getCount());
        if(nutrientInfo != null){
            foodMoreInfoDto.setNutrientInfo(nutrientInfo);
        }
        foodMoreInfoDto.setStartDate(myFood.getStartDate());
        foodMoreInfoDto.setEndDate(myFood.getEndDate());
        FoodCategory foodCategory = foodCategoryRepository.findById(myFood.getFoodCategory().getId()).orElseThrow();
        foodMoreInfoDto.setFoodCategoryId(foodCategory.getId());
        foodMoreInfoDto.setMiddleCategory(foodCategory.getMiddleCategory());
        foodMoreInfoDto.setSubCategory(foodCategory.getSubCategory());
        if(purchaseInfo != null) {
            if (purchaseInfo.getCnt() == 1) {
                foodMoreInfoDto.setPurchase(-1L);
            } else {
                Long cnt = purchaseInfo.getCnt();
                long differenceInMilliseconds = purchaseInfo.getLastDate().getTime() - purchaseInfo.getFirstDate().getTime();
                long differenceInSeconds = differenceInMilliseconds / 1000;
                long differenceInMinutes = differenceInSeconds / 60;
                long differenceInHours = differenceInMinutes / 60;
                long differenceInDays = differenceInHours / 24;

                foodMoreInfoDto.setPurchase(differenceInDays / (cnt - 1));
            }
        }
        List<MyFood> myFoodList = myfoodRepository.findAllByFoodCategoryIdAndUserId(myFood.getFoodCategory().getId() , myFood.getUser().getId());
        List<UsedFood> usedFoodList = usedFoodRepository.findAllByFoodCategoryIdAndUserId(myFood.getFoodCategory().getId() , myFood.getUser().getId());
        List<WastedFood> wastedFoodList = wastedFoodRepository.findAllByFoodCategoryIdAndUserId(myFood.getFoodCategory().getId() , myFood.getUser().getId());

        Map<String , Long> topthree  = new HashMap<>();
        for(MyFood mf: myFoodList){
            if(topthree.containsKey(mf.getFoodName())) topthree.replace (mf.getFoodName() ,topthree.get(mf.getFoodName()) + 1) ;
            else {
                topthree.put(mf.getFoodName() , 1L);
            }
        }
        for(UsedFood uf: usedFoodList){
            if(topthree.containsKey(uf.getFoodName())) topthree.replace (uf.getFoodName() ,topthree.get(uf.getFoodName()) + 1) ;
            else {
                topthree.put(uf.getFoodName() , 1L);
            }
        }
        for(WastedFood wf: wastedFoodList){
            if(topthree.containsKey(wf.getFoodName())) topthree.replace (wf.getFoodName() ,topthree.get(wf.getFoodName()) + 1) ;
            else {
                topthree.put(wf.getFoodName() , 1L);
            }
        }
        List<Map.Entry<String, Long>> entryList = new LinkedList<>(topthree.entrySet());
        entryList.sort(Map.Entry.comparingByValue());
        Collections.reverse(entryList);
        System.out.println(topthree);
        int index = 0;
        while(true){
            if(index >= 3 || index >= entryList.size()) break;
            foodMoreInfoDto.getPreferProducts().add(entryList.get(index).getKey());
            index +=1;
        }

        long start = Integer.MAX_VALUE;
        long end = Integer.MIN_VALUE;
        long total = 0;
        for(UsedFood uf : usedFoodList){
            start = uf.getStartDate().getTime();
            end = uf.getEndDate().getTime();
            long differenceInSeconds = (end - start) / 1000;
            long differenceInMinutes = differenceInSeconds / 60;
            long differenceInHours = differenceInMinutes / 60;
            long differenceInDays = differenceInHours / 24;
            total += differenceInDays;
        }
        System.out.println(total);
        foodMoreInfoDto.setCycle(total / usedFoodList.size());
        System.out.println(foodMoreInfoDto.getPreferProducts());
        System.out.println(foodMoreInfoDto.getPurchase());
        System.out.println(foodMoreInfoDto.getCycle());
        foodMoreInfoDto.setPercent( wastedFoodList.size() * 100 / myFoodList.size() + usedFoodList.size() + wastedFoodList.size());
        return foodMoreInfoDto;
    }

    @Override
    public FoodDataDto getFoodData(String codeNumber) {
        List<FoodData> foodDatas = foodDataRepository.findAllByBarcode(codeNumber);
        FoodData foodData = foodDatas.get(0);
        FoodDataDto foodDataDto = new FoodDataDto();
        foodDataDto.setFoodName(foodData.getFoodName());
        foodDataDto.setFoodCategoryId(foodData.getFoodCategory().getId());
        foodDataDto.setPogDaycnt(foodData.getPogDaycnt());
        foodDataDto.setFoodId(foodData.getId());
        return foodDataDto;
    }

    @Override
    public void savePurchase(MyFood myFood) {
        Purchase purchase = new Purchase();
        Purchase temp  = purchaseRepository.findByFoodCategoryIdAndUserId(myFood.getFoodCategory().getId() , myFood.getUser().getId());
        if(temp == null){
            purchase.setFoodCategory(myFood.getFoodCategory());
            purchase.setFirstDate(myFood.getStartDate());
            purchase.setLastDate(myFood.getStartDate());
            purchase.setUser(myFood.getUser());
            purchase.setCnt(1L);
            purchaseRepository.save(purchase);
        }
        else{
            if(myFood.getStartDate().compareTo(temp.getFirstDate()) < 0){
                temp.setFirstDate(myFood.getStartDate());
            }

            if(myFood.getStartDate().compareTo(temp.getLastDate()) > 0){
                temp.setLastDate(myFood.getStartDate());
            }
            temp.setCnt(temp.getCnt()+1L);
            purchaseRepository.save(temp);
        }


    }

    @Override
    public ReportDto getReportInfo(Long userId) {
        ReportDto reportDto = new ReportDto();
        long myFoodCount = 0L;
        long usedCount = 0L;
        long wastedCount = 0L;
        List<MyFood> myFoodList = myfoodRepository.findAllByUserId(userId);
        List<UsedFood> usedFoodList = usedFoodRepository.findAllByUserId(userId);
        List<WastedFood> wastedFoodList = wastedFoodRepository.findAllByUserId(userId);
        LocalDate currentDate = LocalDate.now();

        Month currentMonth = currentDate.getMonth();

        int currentMonthNumber = currentDate.getMonthValue();


        for(MyFood myFood : myFoodList){
            Calendar cal = Calendar.getInstance();
            cal.setTime(myFood.getStartDate());
            int month = cal.get(Calendar.MONTH) + 1;
            if(month == currentMonthNumber){
                myFoodCount +=1;
            }
        }
        for(UsedFood usedFood : usedFoodList){
            Calendar cal = Calendar.getInstance();
            cal.setTime(usedFood.getStartDate());
            int month = cal.get(Calendar.MONTH) + 1;
            if(month == currentMonthNumber){
                usedCount +=1;
            }
        }
        for(WastedFood wastedFood : wastedFoodList){
            Calendar cal = Calendar.getInstance();
            cal.setTime(wastedFood.getStartDate());
            int month = cal.get(Calendar.MONTH) + 1;
            if(month == currentMonthNumber){
                wastedCount +=1;
            }
        }

        Map<String , Long> usedTopThree  = new HashMap<>();
        for(UsedFood uf: usedFoodList){
            FoodCategory cate = foodCategoryRepository.findById(uf.getFoodCategory().getId()).orElseThrow();
            if(usedTopThree.containsKey(cate.getSubCategory())) usedTopThree.replace(cate.getSubCategory(),usedTopThree.get(cate.getSubCategory()) + 1) ;
            else {
                usedTopThree.put(cate.getSubCategory() , 1L);
            }
        }

        List<Map.Entry<String, Long>> usedList = new LinkedList<>(usedTopThree.entrySet());
        usedList.sort(Map.Entry.comparingByValue());
        Collections.reverse(usedList);


        Map<String , Long> wastedTopThree  = new HashMap<>();
        for(WastedFood wf: wastedFoodList){
            FoodCategory cate = foodCategoryRepository.findById(wf.getFoodCategory().getId()).orElseThrow();
            if(wastedTopThree.containsKey(cate.getMiddleCategory())) wastedTopThree.replace (cate.getMiddleCategory(),wastedTopThree.get(cate.getMiddleCategory()) + 1) ;
            else {
                wastedTopThree.put(cate.getMiddleCategory() , 1L);
            }
        }

        List<Map.Entry<String, Long>> wastedList = new LinkedList<>(wastedTopThree.entrySet());
        wastedList.sort(Map.Entry.comparingByValue());
        Collections.reverse(wastedList);

        System.out.println(myFoodCount);
        System.out.println(usedCount);
        System.out.println(wastedCount);

        reportDto.setConsume(usedCount);
        reportDto.setDiscard(wastedCount);
        reportDto.setPurchase(myFoodCount + usedCount + wastedCount);

        for(Map.Entry<String , Long> s : wastedList){
            reportDto.getDiscardTopThreeCategory().add(s);
        }
        for(Map.Entry<String , Long> s : usedList){
            reportDto.getFavoriteTopThreeCategory().add(s);
        }
        System.out.println(reportDto.getDiscardTopThreeCategory());
        System.out.println(reportDto.getFavoriteTopThreeCategory());
        return reportDto;
    }
}
