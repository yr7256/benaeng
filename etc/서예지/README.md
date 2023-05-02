### **React Query의 lifecycle**

> 데이터 상태주기 : isFetching -> fresh -> stale -> inActive -> GC
> 

1️⃣ fetching : 요청 중

2️⃣ fresh : 만료 X

3️⃣ stale : 만료 O

4️⃣ inactive : 사용 X, 일정 시간 후 캐시에서 제거

5️⃣ delete : 제거됨

### **StaleTime과 CacheTime**

**staleTime**

▫ 데이터가 fresh에서 stale 상태로 변경되는데 걸리는 시간

▫ 기본 값 : 0

▫ 해당 시간 동안에는 쿼리 인스턴스가 새롭게 mount 되어도 데이터 fetch가 일어나지 않음

**cacheTime**

▫ unused/inactive 캐시 데이터가 메모리에서 유지되는 시간

▫ 기본 값 : 5분

▫ staleTime과 관계없이 무조건 inactive된 시점을 기준으로 삭제를 결정

▫ infinity로 설정 시 쿼리 데이터는 캐시에서 제거 X

### **refetch 수행**

▫ 아래의 경우 발생 시 자동으로 refetch 수행

- default: `true`
    - refetchOnMount : 마운트됨
    - refetchOnWindowFocus : 창에 다시 초점 맞춤
    - refetchOnReconnect : 네트워크 재연결

### **retry 수행**

▫ 실패한 쿼리는 자동으로 3번 재시도

▫ delay는 1000초에서 실패한 횟수와 비례해서 증가

- default
    - retry: `3`
    - retryDelay: `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)`
    

### QueryKey

[Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys#structure)

▫ **array** 또는 **string**

▫ 일관성을 유지하기 위해 항상 배열 사용을 권장

▫ react-query는 내부적으로 Array로 변환함

▫ 동일한 key의 데이터로 타입 등에 따라 다른 캐시 사용 O

### 즉,

▫모든 쿼리 결과는 쿼리 키에 종속적 -> **QueryClient** 를 통해 캐시된 값 가져오기 가능

▫ isLoading, isError, isSuccess 상태 반환 

▫ status로 받는 것도 가능

- isLoading : status===loading
- isError : status===error
- isSuccess : status===success

▫ error, data 정보 반환

---

## ****useQuery****

get 요청 처리

[useQuery](https://react-query-v3.tanstack.com/reference/useQuery)

**파라미터** 

1️⃣ unique Key

이 요청이 어떤 API를 호출했는지 구분할 수 있는 식별키

다른 컴포넌트에서도 해당 키를 사용하면 호출 가능

배열로 넘기면, 

- 0번 값은 string값으로 다른 컴포넌트에서 부를 값이 들어감
- 두번째 값을 넣으면 query 함수 내부에 파라미터로 해당 값이 전달됨 (해당 값이 바뀔 때만 서버에 query 요청 보내도록 할 수 있음)

2️⃣ 비동기 함수(api호출 함수)

promise를 return 하는 함수

3️⃣ 옵션

▫ enabled : 쿼리가 자동으로 실행되지 않게 설정하는 옵션 (동기적으로 사용 가능)

- ex) email 변수가 존재할 때만 쿼리 요청을 하고 싶음 → `enabled: !!email`

▫ staleTime

▫ cacheTime 

▫ retryDelay

▫ onSuccess : 성공 시 실행

▫ onError : 실패 시 실행

▫ onSettled : 성공 / 실패 모두 실행

▫ initialData : 캐시된 데이터가 없을 때 표기할 초기값

**return**

api의 성공, 실패여부, api return 값을 포함한 객체

▫ data

▫ isLoading : 저장된 캐시가 없는 상태에서 데이터를 요청 중일 때 (로딩 UI 처리가 쉬움)

▫ isFetching : 캐시가 있거나 없거나 데이터가 요청 중일 때

비동기로 작동

⇒ **한 컴포넌트에 여러개의 useQuery가 있다면 하나가 끝나고 다음 useQuery가 실행되는 것이 아닌 두개의 useQuery가 동시에 실행됨**
여러개의 비동기 query가 있다면 useQueries 권장

<aside>
✅ ▫ isFetching은 캐싱 된 데이터 유무에 상관없이 데이터 Fetching 때마다 true를 리턴
▫ isLoading은 캐싱 된 데이터가 없을 때만 true를 리턴 (initialData 옵션을 설정하면 항상 false를 리턴)

</aside>

---

### ****useQueries****

쿼리들을 묶어서 처리할 수 있게 해주는 훅

자체적으로 options 값 설정 X → useQueries 안에 선언되는 쿼리는 options 값 설정 가능

### ****QueryCache****

쿼리에 대해 성공, 실패 전처리

### useMutation

POST, PUT, DELETE

**useMutation의 mutate함수는 Promise를 반환하지 않음 → 직접적으로 결과 할당해서 사용 불가**

mutateAsync 함수는 Promise를 반환 → 성공, 실패와 같은 서버의 응답 결과 처리

useMutation은 중복 호출에 대한 제어 옵션X 

 → 쓰로틀링, 디바운싱을 구현해서 사용

 → isLoading이나 useIsMutating을 활용해서 제어

---

### **useInfiniteQuery**

무한 스크롤 구현 시, 특정 조건 (스크롤이 바닥에 닿는 등) 하에서 다음 데이터 목록을 패치함

▫ 1번째 인자 : **key**

▫ 2번째 인자 : **패치함수** → pageParam이라는 페이지 값 지정 (기본값 1로 설정)

▫ 3번째 인자 : 옵션

- **getNextPageParam() 함수** : 다음 API 요청에 사용할 pageParam 값을 정함 (통상 첫 번째 인자인 lastPage에 nextCursor를 같이 보내주므로 이로 설정)

data는 **pageParams(pageParam 정보들), pages(페이지 별 데이터) 2가지 프로퍼티**를 가진 객체로 내려옴

→ 여기서 pages의 data 프로퍼티들만 매핑해서 보여주면 됨

쿼리 반환값 활용

- **hasNextPage** : getNextPageParam() 에 따른 다음 페이지 존재 여부 (Boolean)
- **fetchNextPage** : 다음 데이터를 불러오는 메서드 (data의 pages 배열의 제일 끝에 새로운 데이터를 담음)
- **isFetchingNextPage** : 다음 데이터를 패치중인지 여부(Boolean)
