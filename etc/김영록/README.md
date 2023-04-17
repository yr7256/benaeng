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