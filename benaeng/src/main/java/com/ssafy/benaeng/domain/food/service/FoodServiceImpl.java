package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.*;
import com.ssafy.benaeng.domain.food.repository.*;
import com.ssafy.benaeng.domain.food.repository.alarm.AlarmRepository;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.requestDto.YearMonthDto;
import com.ssafy.benaeng.domain.food.responseDto.*;
import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.lang.Math.abs;

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
    private final AlarmRepository alarmRepository;
    @Override
    public MyFood saveMyFood(RegistDto registDto) {
        MyFood myFood = new MyFood();
        myFood.setFoodName(registDto.getFoodName());
        myFood.setFoodCategory(foodCategoryRepository.findById(registDto.getFoodCategoryId()).orElseThrow());
        myFood.setTotalCount(registDto.getTotalCount());
        myFood.setCount(registDto.getTotalCount());
        myFood.setUser(userRepository.findById(registDto.getUserId()).orElseThrow());
        if(!registDto.getIsConsume()){
            Date startDate = registDto.getStartDate();
            Date endDate = registDto.getEndDate();
            LocalDate startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            long daysDifference = ChronoUnit.DAYS.between(startLocalDate, endLocalDate);
            double assumedPeriod  =  daysDifference/(0.4);
            double period80Percent = assumedPeriod * 0.9;
            LocalDate period80EndDate = startLocalDate.plusDays((long) period80Percent);
            LocalDate period80EndDateLocalDate = period80EndDate.plusDays((long) period80Percent);
            Instant period80EndDateInstant = period80EndDateLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
            endDate = Date.from(period80EndDateInstant);
            myFood.setStartDate(startDate);
            myFood.setEndDate(endDate);
        }
        else {
            myFood.setStartDate(registDto.getStartDate());
            myFood.setEndDate(registDto.getEndDate());
        }
//        if(registDto.getIsRecommend()){
//            String barcode = registDto.getBarcode();
//            List<FoodData> foodDataList  = foodDataRepository.findAllByBarcode(barcode);
//            FoodData foodData = foodDataList.get(0);
//            String day = foodData.getPogDaycnt();
//            int dayCnt = Integer.parseInt(day);
//            LocalDate currentDate = LocalDate.now();
//            Date startDate = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            LocalDate endDateLocal = currentDate.plusDays(dayCnt);
//            Date endDate = Date.from(endDateLocal.atStartOfDay(ZoneId.systemDefault()).toInstant());
//
//            myFood.setStartDate(startDate);
//            myFood.setEndDate(endDate);
//            log.info("소비기한 계산로직이 들어갈예정입니다.");
//            return myFood;
//        }
//        else{
//            if(!registDto.getIsConsume()) {
//                String barcode = registDto.getBarcode();
//                List<FoodData> foodDataList  = foodDataRepository.findAllByBarcode(barcode);
//                FoodData foodData = foodDataList.get(0);
//                String day = foodData.getPogDaycnt();
//                int dayCnt = Integer.parseInt(day);
//                LocalDate currentDate = LocalDate.now();
//                Date startDate = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//                LocalDate endDateLocal = currentDate.plusDays(dayCnt);
//                Date endDate = Date.from(endDateLocal.atStartOfDay(ZoneId.systemDefault()).toInstant());
//
//                myFood.setStartDate(startDate);
//                myFood.setEndDate(endDate);
//                log.info("유통기한 기반 계산로직이 들어갈예정입니다.");
//                return null;
//            }
//            else{
//        log.info("소비기한을 입력했으므로 바로 저장합니다.");
//            }
//        }
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
        List<NutrientInfo> nutrientInfos = nutrientInfoRepository.findAllByFoodName(myFood.getFoodName());
        NutrientInfo nutrientInfo = null;
        if(nutrientInfos.size() != 0) nutrientInfo = nutrientInfos.get(0);
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
        int index = 0;

        while(true){
            if(entryList.size() ==0) break;
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
        if(usedFoodList.size() >=2) foodMoreInfoDto.setCycle(total / usedFoodList.size());
        else if(usedFoodList.size() <= 1) foodMoreInfoDto.setCycle(-1L);
        foodMoreInfoDto.setPercent( wastedFoodList.size() * 100 / (myFoodList.size() + usedFoodList.size() + wastedFoodList.size()));


        if(foodMoreInfoDto.getPurchase() <  foodMoreInfoDto.getCycle()){
            foodMoreInfoDto.getMsg().add(myFood.getFoodCategory().getSubCategory() + "을(를) 평소보다 자주 구매하고 있어요.");
        }
        else if(abs(foodMoreInfoDto.getPurchase() - foodMoreInfoDto.getCycle()) <= 10){
            foodMoreInfoDto.getMsg().add(myFood.getFoodCategory().getSubCategory() + "을(를) 적절한 시기에 구매하고 있어요.");
        }
        else{
            foodMoreInfoDto.getMsg().add(myFood.getFoodCategory().getSubCategory() + "을(를) 구매하는 시기가 늦춰졌어요.");
        }
        int usedPercent = usedFoodList.size() * 100 / (myFoodList.size() + usedFoodList.size() + wastedFoodList.size());
        int margin = 4;
        if(usedPercent >= foodMoreInfoDto.getPercent() + margin){
            foodMoreInfoDto.getMsg().add( "절약을 위해 더 큰 용량의 " + myFood.getFoodCategory().getSubCategory() + "을(를) 구매하는 건 어떨까요 ?");

        }
        else if(usedPercent < foodMoreInfoDto.getPercent() - margin){
            foodMoreInfoDto.getMsg().add( "더 작은 크기의 " +  myFood.getFoodCategory().getSubCategory() + "을(를) 구매해 보세요!");
        }
        else{
            foodMoreInfoDto.getMsg().add( "적절한 용량의 " +  myFood.getFoodCategory().getSubCategory() + "을(를) 소비하고 있네요");
        }


        if(foodMoreInfoDto.getPercent()>0 &&foodMoreInfoDto.getPercent()<=33){
            foodMoreInfoDto.getMsg().add("소비기한에 맞게 " + myFood.getFoodCategory().getSubCategory() + "을(를) 소비하고 있어요.");
        }
        else if(foodMoreInfoDto.getPercent()>33 &&foodMoreInfoDto.getPercent()<=66){
            foodMoreInfoDto.getMsg().add("소비기한 내" + myFood.getFoodCategory().getSubCategory() + "을(를) 소비하지 못하고 있어요.");
        }
        else if(foodMoreInfoDto.getPercent()>66 && foodMoreInfoDto.getPercent()<=100){
            foodMoreInfoDto.getMsg().add("대부분의 " + myFood.getFoodCategory().getSubCategory() + "가 폐기되고 있어요, 더욱 신중한 구매가 필요해요.");
        }

        log.info("저장된 메시지 목록입니다." , foodMoreInfoDto.getMsg());
        return foodMoreInfoDto;
    }

    @Override
    public FoodDataDto getFoodData(String codeNumber) {
        List<FoodData> foodDatas = foodDataRepository.findAllByBarcode(codeNumber);
        if(foodDatas.size() == 0 ) return null;
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

        reportDto.setConsume(usedCount);
        reportDto.setDiscard(wastedCount);
        reportDto.setPurchase(myFoodCount + usedCount + wastedCount);

        for(Map.Entry<String , Long> s : wastedList){
            reportDto.getDiscardTopThreeCategory().add(s);
        }
        for(Map.Entry<String , Long> s : usedList){
            reportDto.getFavoriteTopThreeCategory().add(s);
        }
        return reportDto;
    }

    @Override
    public MonthReportDto getMonthReport(YearMonthDto yearMonthDto , Long userId) {
        MonthReportDto monthReportDto = new MonthReportDto();

        int nowYear = yearMonthDto.getYear();
        int nowMonth = yearMonthDto.getMonth();
        int myFoodCount = 0;
        int usedCount = 0;
        int wastedCount = 0;
        List<MyFood> myFoodList  = myfoodRepository.findAllByUserId(userId);
        List<UsedFood> usedFoodList = usedFoodRepository.findAllByUserId(userId);
        List<WastedFood> wastedFoodList  = wastedFoodRepository.findAllByUserId(userId);
        Calendar cal = Calendar.getInstance();


        for(MyFood myFood : myFoodList){
            cal.setTime(myFood.getStartDate());
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            if(month == nowMonth && year == nowYear){
                myFoodCount +=1;
            }
        }
        for(UsedFood usedFood : usedFoodList){
            cal.setTime(usedFood.getEndDate());
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            if(month == nowMonth && year == nowYear){
                usedCount +=1;
            }
        }
        for(WastedFood wastedFood : wastedFoodList){
            cal.setTime(wastedFood.getEndDate());
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            if(month == nowMonth && year == nowYear){
                wastedCount +=1;
            }
        }

        monthReportDto.setCountPurchase(myFoodCount + usedCount + wastedCount);
        monthReportDto.setCountConsumer(usedCount);
        monthReportDto.setCountWaste(wastedCount);

        Map<Long , Long> usedTopThree  = new HashMap<>();
        for(UsedFood uf: usedFoodList){
            cal.setTime(uf.getEndDate());
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            if(month == nowMonth && year == nowYear) {
                FoodCategory cate = foodCategoryRepository.findById(uf.getFoodCategory().getId()).orElseThrow();
                if (usedTopThree.containsKey(cate.getId()))
                    usedTopThree.replace(cate.getId(), usedTopThree.get(cate.getId()) + 1);
                else {
                    usedTopThree.put(cate.getId(), 1L);
                }
            }
        }

        List<Map.Entry<Long, Long>> usedList = new LinkedList<>(usedTopThree.entrySet());
        usedList.sort(Map.Entry.comparingByValue());
        Collections.reverse(usedList);


        Map<Long , Long> wastedTopThree  = new HashMap<>();
        for(WastedFood wf: wastedFoodList){
            cal.setTime(wf.getEndDate());
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            if(month == nowMonth && year == nowYear) {
                FoodCategory cate = foodCategoryRepository.findById(wf.getFoodCategory().getId()).orElseThrow();
                if (wastedTopThree.containsKey(cate.getId()))
                    wastedTopThree.replace(cate.getId(), wastedTopThree.get(cate.getId()) + 1);
                else {
                    wastedTopThree.put(cate.getId(), 1L);
                }
            }
        }

        List<Map.Entry<Long, Long>> wastedList = new LinkedList<>(wastedTopThree.entrySet());
        wastedList.sort(Map.Entry.comparingByValue());
        Collections.reverse(wastedList);

        int index = 0;
        while(true){
            MonthReportDto.MostUsed mostUsed = new MonthReportDto.MostUsed();
            if(index >= 3 || index >= usedList.size()) break;
            mostUsed.foodCategoryId  = usedList.get(index).getKey();
            mostUsed.consumer  = usedList.get(index).getValue();
            mostUsed.waste = wastedFoodRepository.countByFoodCategoryIdAndUserId(mostUsed.foodCategoryId , userId);
            index +=1;
            monthReportDto.getMostConsumer().add(mostUsed);
        }

        index = 0;
        while(true){
            MonthReportDto.MostUsed mostUsed = new MonthReportDto.MostUsed();
            if(index >= 3 || index >= wastedList.size()) break;
            mostUsed.foodCategoryId  = wastedList.get(index).getKey();
            mostUsed.consumer  = usedFoodRepository.countByFoodCategoryIdAndUserId(mostUsed.foodCategoryId , userId);
            mostUsed.waste =  wastedList.get(index).getValue();
            index +=1;
            monthReportDto.getMostWaste().add(mostUsed);
        }
        return monthReportDto;
    }

    @Override
    public ReportDetailDto getReportDetail(Long userId, Long foodCategoryId) {
        ReportDetailDto reportDetailDto = new ReportDetailDto();
        Purchase purchaseInfo = purchaseRepository.findByFoodCategoryIdAndUserId(foodCategoryId , userId);
        FoodCategory foodCategory = foodCategoryRepository.findById(foodCategoryId).orElseThrow();
        reportDetailDto.setSubCategory(foodCategory.getSubCategory());
        if(purchaseInfo == null) return null;
        log.info("진입 후 구매 내역 조회 " , purchaseInfo);
        if(purchaseInfo != null) {
            if (purchaseInfo.getCnt() == 1) {
                reportDetailDto.setPurchase(-1L);
            } else {
                Long cnt = purchaseInfo.getCnt();
                long differenceInMilliseconds = purchaseInfo.getLastDate().getTime() - purchaseInfo.getFirstDate().getTime();
                long differenceInSeconds = differenceInMilliseconds / 1000;
                long differenceInMinutes = differenceInSeconds / 60;
                long differenceInHours = differenceInMinutes / 60;
                long differenceInDays = differenceInHours / 24;

                reportDetailDto.setPurchase(differenceInDays / (cnt - 1));
            }
        }
        List<MyFood> myFoodList = myfoodRepository.findAllByFoodCategoryIdAndUserId( foodCategoryId, userId);
        List<UsedFood> usedFoodList = usedFoodRepository.findAllByFoodCategoryIdAndUserId(foodCategoryId, userId);
        List<WastedFood> wastedFoodList = wastedFoodRepository.findAllByFoodCategoryIdAndUserId(foodCategoryId, userId);

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
        int index = 0;

        while(true){
            if(entryList.size() ==0) break;
            if(index >= 3 || index >= entryList.size()) break;
            reportDetailDto.getPreferProducts().add(entryList.get(index).getKey());
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
        if(usedFoodList.size() >=2) reportDetailDto.setCycle(total / usedFoodList.size());
        else reportDetailDto.setCycle(-1L);
        reportDetailDto.setPercent( wastedFoodList.size() * 100 / (myFoodList.size() + usedFoodList.size() + wastedFoodList.size()));

        if(reportDetailDto.getPurchase() <  reportDetailDto.getCycle()){
            reportDetailDto.getMsg().add(foodCategory.getSubCategory() + "을(를) 평소보다 자주 구매하고 있어요.");
        }
        else if(Math.abs(reportDetailDto.getPurchase() - reportDetailDto.getCycle()) <= 10){
            reportDetailDto.getMsg().add(foodCategory.getSubCategory() + "을(를) 적절한 시기에 구매하고 있어요.");
        }
        else{
            reportDetailDto.getMsg().add(foodCategory.getSubCategory() + "을(를) 구매하는 시기가 늦춰졌어요.");
        }

        int usedPercent = 0;

        if(myFoodList.size() + usedFoodList.size() + wastedFoodList.size() >= 1) {
            usedPercent = usedFoodList.size() * 100 / (myFoodList.size() + usedFoodList.size() + wastedFoodList.size());
        }
        int margin = 4;

        if(usedPercent >= reportDetailDto.getPercent() + margin){
            reportDetailDto.getMsg().add( "절약을 위해 더 큰 용량의 " + foodCategory.getSubCategory() + "을(를) 구매하는 건 어떨까요 ?");

        }
        else if(usedPercent < reportDetailDto.getPercent() - margin){
            reportDetailDto.getMsg().add( "더 작은 크기의 " +  foodCategory.getSubCategory() + "을(를) 구매해 보세요!");
        }
        else{
            reportDetailDto.getMsg().add( "적절한 용량의 " +  foodCategory.getSubCategory() + "을(를) 소비하고 있네요");
        }

        if(reportDetailDto.getPercent()>0 &&reportDetailDto.getPercent()<=33){
            reportDetailDto.getMsg().add("소비기한에 맞게 " + foodCategory.getSubCategory() + "을(를) 소비하고 있어요.");
        }
        else if(reportDetailDto.getPercent()>33 && reportDetailDto.getPercent()<=66){
            reportDetailDto.getMsg().add("소비기한 내" + foodCategory.getSubCategory() + "을(를) 소비하지 못하고 있어요.");
        }
        else if(reportDetailDto.getPercent()>66 && reportDetailDto.getPercent()<=100){
            reportDetailDto.getMsg().add("대부분의 " + foodCategory.getSubCategory() + "가 폐기되고 있어요, 더욱 신중한 구매가 필요해요.");
        }
        log.info("식품 분석리포트 입니다." , reportDetailDto.getMsg());

        return reportDetailDto;
    }


    @Override
    public CalendarDetailDto getCalendarDetail(Long userId, int year, int month) {
        CalendarDetailDto calendarDetailDto = new CalendarDetailDto();
        List<MyFood> myFoodList = myfoodRepository.findAllByUserId(userId);
        List<UsedFood> usedFoodList = usedFoodRepository.findAllByUserId(userId);
        List<WastedFood> wastedFoodList = wastedFoodRepository.findAllByUserId(userId);

        Map<String, List<String>> purchaseInfo = new HashMap<>();
        Map<Long, List<String>> calendarInfo = new HashMap<>();
        Map<String, Long> foodNameInfo = new HashMap<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (UsedFood uf : usedFoodList) {
            CalendarDetailDto.CalData calData = new CalendarDetailDto.CalData();
            calData.setFoodName(uf.getFoodName());
            calData.setFoodCategoryId(uf.getFoodCategory().getId());
            if (purchaseInfo.containsKey(uf.getFoodName())) {
                purchaseInfo.get(uf.getFoodName()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                purchaseInfo.put(uf.getFoodName(), dates);
            }

            if (calendarInfo.containsKey(uf.getFoodCategory().getId())) {
                calendarInfo.get(uf.getFoodCategory().getId()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                calendarInfo.put(uf.getFoodCategory().getId(), dates);
            }

            if (!foodNameInfo.containsKey(uf.getFoodName())) {
                foodNameInfo.put(uf.getFoodName(), uf.getFoodCategory().getId());
            }
        }
        for (MyFood uf : myFoodList) {
            CalendarDetailDto.CalData calData = new CalendarDetailDto.CalData();
            calData.setFoodName(uf.getFoodName());
            calData.setFoodCategoryId(uf.getFoodCategory().getId());
            if (purchaseInfo.containsKey(uf.getFoodName())) {
                purchaseInfo.get(uf.getFoodName()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                purchaseInfo.put(uf.getFoodName(), dates);
            }

            if (calendarInfo.containsKey(uf.getFoodCategory().getId())) {
                calendarInfo.get(uf.getFoodCategory().getId()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                calendarInfo.put(uf.getFoodCategory().getId(), dates);
            }

            if (!foodNameInfo.containsKey(uf.getFoodName())) {
                foodNameInfo.put(uf.getFoodName(), uf.getFoodCategory().getId());
            }
        }
        for (WastedFood uf : wastedFoodList) {
            CalendarDetailDto.CalData calData = new CalendarDetailDto.CalData();
            calData.setFoodName(uf.getFoodName());
            calData.setFoodCategoryId(uf.getFoodCategory().getId());
            if (purchaseInfo.containsKey(uf.getFoodName())) {
                purchaseInfo.get(uf.getFoodName()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                purchaseInfo.put(uf.getFoodName(), dates);
            }

            if (calendarInfo.containsKey(uf.getFoodCategory().getId())) {
                calendarInfo.get(uf.getFoodCategory().getId()).add(dateFormat.format(uf.getStartDate()));
            } else {
                List<String> dates = new ArrayList<>();
                dates.add(dateFormat.format(uf.getStartDate()));
                calendarInfo.put(uf.getFoodCategory().getId(), dates);
            }

            if (!foodNameInfo.containsKey(uf.getFoodName())) {
                foodNameInfo.put(uf.getFoodName(), uf.getFoodCategory().getId());
            }
        }
        List<Map.Entry<String, List<String>>> entryList = new LinkedList<>(purchaseInfo.entrySet());
        for (int i = 0; i < entryList.size(); i++) {
            CalendarDetailDto.CalData calData = new CalendarDetailDto.CalData();
            String fn = entryList.get(i).getKey();
            calData.setFoodName(fn);
            calData.setFoodCategoryId(foodNameInfo.get(fn));
            calData.setPurchaseRecords(purchaseInfo.get(fn));
            calendarDetailDto.getPurchase().add(calData);
        }
        return calendarDetailDto;

    }

    @Transactional
    @Override
    public void deleteByUserId(Long id) {
        myfoodRepository.deleteByUserId(id);
        alarmRepository.deleteByUserId(id);
    }
}
