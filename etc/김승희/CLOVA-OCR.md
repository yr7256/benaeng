# CLOVA OCR
[https://guide.ncloud-docs.com/docs/clovaocr-procedure](https://guide.ncloud-docs.com/docs/clovaocr-procedure)

1. API Gateway 서비스 신청
    1. [https://console.ncloud.com/apigw/myProducts](https://console.ncloud.com/apigw/myProducts)
    2. 
2. Sub Account 생성
    1. [https://guide.ncloud-docs.com/docs/subaccount-use](https://guide.ncloud-docs.com/docs/subaccount-use)

3. Domain 생성
    1. [https://guide.ncloud-docs.com/docs/clovaocr-general](https://guide.ncloud-docs.com/docs/clovaocr-general)
    
    
4. API Gateway 연동
    1. Text OCR 버튼 눌러서 Secret Key랑 APIGW Invoke URL 생성

- 바코드 이미지
    - [https://user-images.githubusercontent.com/43427305/232509871-b02db32d-8ca6-4669-b42d-abfe9d179c10.jpg](https://user-images.githubusercontent.com/43427305/232509871-b02db32d-8ca6-4669-b42d-abfe9d179c10.jpg)
    - request header
        
        ```html
        Content-Type : application/json
        X-OCR-SECRET : secret key
        ```
        
    - request Body
        
        ```html
        {
            "images": [
              {
                "format": "jpg",
                "name": "medium",
                "data": null,
                "url": "https://user-images.githubusercontent.com/43427305/232509871-b02db32d-8ca6-4669-b42d-abfe9d179c10.jpg"
              }
            ],
            "lang": "ko",
            "requestId": "string",
            "resultType": "string",
            "timestamp": {{$timestamp}},
            "version": "V1"
        }
        ```
        
    - response
        
        ```html
        바코드가 인식 되는게 아니라 글자가 인식됨
        바코드는 인식되지 않음
        ```
        
- 영화표
    - [https://user-images.githubusercontent.com/43427305/232512989-6a3927a2-c263-4619-8dbd-5302d0775f76.jpg](https://user-images.githubusercontent.com/43427305/232512989-6a3927a2-c263-4619-8dbd-5302d0775f76.jpg)
    - request header는 똑같고, request body의 url만 바꿔주기
    - response
        
        ```html
        {
            "version": "V1",
            "requestId": "string",
            "timestamp": 1681741418881,
            "images": [
                {
                    "uid": "7e0f0efb37f842fcb8e44aba3e4eca42",
                    "name": "medium",
                    "inferResult": "SUCCESS",
                    "message": "SUCCESS",
                    "validationResult": {
                        "result": "NO_REQUESTED"
                    },
                    "fields": [
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    {
                                        "x": 357.0,
                                        "y": 318.0
                                    },
                                    {
                                        "x": 440.0,
                                        "y": 318.0
                                    },
                                    {
                                        "x": 440.0,
                                        "y": 383.0
                                    },
                                    {
                                        "x": 357.0,
                                        "y": 383.0
                                    }
                                ]
                            },
                            "inferText": "CGV",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "영화입장권",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "2023-01-23",
                            "inferConfidence": 0.9996
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "14:55(KIOSK03)",
                            "inferConfidence": 0.9982
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "[전체발권]",
                            "inferConfidence": 0.999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "2D,",
                            "inferConfidence": 0.9884
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "12세이상관람가",
                            "inferConfidence": 0.9998
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "교섭",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "The",
                            "inferConfidence": 0.9997
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "Point",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "Men",
                            "inferConfidence": 0.9991
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "2023.01.23(월)",
                            "inferConfidence": 0.998
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "3회",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "15:00~16:58",
                            "inferConfidence": 0.9987
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "5관",
                            "inferConfidence": 0.9997
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "G열18번,G열19번",
                            "inferConfidence": 0.9989
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "총인원",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "2명",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "(일반",
                            "inferConfidence": 0.9982
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "2명)",
                            "inferConfidence": 0.9997
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "CGV",
                            "inferConfidence": 0.9995
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "대전가수원",
                            "inferConfidence": 0.9997
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "[155-81-01588]",
                            "inferConfidence": 0.9998
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "*",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "티켓",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "미지참시",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "교환,",
                            "inferConfidence": 0.9958
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "환불",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "불가",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "*",
                            "inferConfidence": 0.9993
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "결제수단",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "변경",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "및",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "교환,",
                            "inferConfidence": 0.9964
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "환불은",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "상영시간",
                            "inferConfidence": 0.9999
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "전",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "구매한",
                            "inferConfidence": 0.9998
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                   
                                ]
                            },
                            "inferText": "매장에서",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "가능",
                            "inferConfidence": 1.0
                        },
                        {
                            "valueType": "ALL",
                            "boundingPoly": {
                                "vertices": [
                                    
                                ]
                            },
                            "inferText": "2023-0123- 7143-087 5",
                            "inferConfidence": 0.8416
                        }
                    ]
                }
            ]
        }
        ```
        
        → vertices는 단어의 위치 같다.
        
        → inferText는 추론한 단어. (공백과 줄바꿈을 기준으로 잘려서 인식함)
        
        → inferConfidence는 inferText의 정확도를 의미
        
        → 여기도 아래 바코드 같이 있는데 이건 나름 잘 인식함. (공백이 중간에 껴있긴 하지만)
