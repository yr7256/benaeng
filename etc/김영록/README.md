## 알고리즘 문제 해결 

### BOJ 2533 - 사회망 서비스(SNS) (https://www.acmicpc.net/problem/2533)

import sys


def dfs(start):
    visited[start] = 1
    dp[start][1] = 1
    for destination in route[start]:
        if not visited[destination]:
            dfs(destination)
            dp[start][0] += dp[destination][1]
            dp[start][1] += min(dp[destination][0], dp[destination][1])


input = sys.stdin.readline
sys.setrecursionlimit(10**8)
N = int(input())
route = [[] for _ in range(N+1)]
for i in range(N-1):
    u, v = map(int, input().split())
    route[u].append(v)
    route[v].append(u)
dp = [[0, 0] for _ in range(N+1)]
visited = [0]*(N+1)
dfs(1)
print(min(dp[1][0], dp[1][1]))

### BOJ 17298 - 오큰수 (https://www.acmicpc.net/problem/17298)

N = int(input())
nums = list(map(int, input().split()))
stack = []
ans = [-1]*N
for i in range(N):
    while stack and nums[stack[-1]] < nums[i]:
        ans[stack.pop()] = nums[i]
    stack.append(i)
print(*ans)

### BOJ 15918 - 랭퍼든 수열쟁이야!! (https://www.acmicpc.net/problem/15918)

def dfs(x):
    global ans
    if x == 2*n+1:
        ans += 1
        # print(arr)
        return
    if arr[x]:
        dfs(x+1)
    else:
        for i in range(1, n+1):
            if not visited[i] and x+i+1 < 2*n+1 and not arr[x+i+1]:
                visited[i] = 1
                arr[x] = i
                arr[x+i+1] = i
                dfs(x+1)
                visited[i] = 0
                arr[x] = 0
                arr[x+i+1] = 0


n, x, y = map(int, input().split())
arr = [0]*(2*n+1)
visited = [0]*(n+1)
arr[x] = arr[y] = y-x-1
visited[y-x-1] = 1
ans = 0
dfs(1)
print(ans)


### 230420 TIL

Flutter, Firebase Cloud Messaging 연동

Flutter 에 Firebase 연동하기
1. Firebase CLI 설치
2. Firebase login
3. FlutterFire CLI 설치
4. flutterfire configure 명령어 실행
5. firebase_core 플러그인 설치
6. flutterfire configure 명령어 실행

Firebase Cloud Messaging 연동하기
1. firebase_messaging, flutter_local_notifications 설치
2. Flutter 에서 기기의 FCM Token 값 찾은 후, 메시지 전송