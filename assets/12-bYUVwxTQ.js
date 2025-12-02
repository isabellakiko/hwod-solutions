const l="12",s="分披萨",r="A",c=100,n=`"吃货"和"馋嘴"两人到披萨店点了一份铁盘（圆形）披萨，并嘱咐店员将披萨按放射状切成大小相同的偶数个小块。但是粗心的服务员将披萨切成了每块大小都完全不同奇数块，且肉眼能分辨出大小。
由于两人都想吃到最多的披萨，他们商量了一个他们认为公平的分法：从"吃货"开始，轮流取披萨。除了第一块披萨可以任意选取外，其他都必须从缺口开始选。
他俩选披萨的思路不同。"馋嘴"每次都会选最大块的披萨，而且"吃货"知道"馋嘴"的想法。
已知披萨小块的数量以及每块的大小，求"吃货"能分得的最大的披萨大小的总和。`,i=`第 1 行为一个正整数奇数 N，表示披萨小块数量。
3 ≤ N < 500
接下来的第 2 行到第 N + 1 行（共 N 行），每行为一个正整数，表示第 i 块披萨的大小
1 ≤ i ≤ N
披萨小块从某一块开始，按照一个方向次序顺序编号为 1 ~ N
每块披萨的大小范围为 [1, 2147483647]`,a='"吃货"能分得到的最大的披萨大小的总和。',t=[{input:`5
8
2
10
5
7`,output:"19",explanation:`披萨按顺序排列为 [8,2,10,5,7]（环形）。

一种最优拿法：
1. "吃货"先拿大小为10的披萨（打开缺口）
2. "馋嘴"从缺口两端选较大的，拿5（因为5<7，实际会拿边界较大值）
3. "吃货"拿7
4. "馋嘴"拿8
5. "吃货"拿2

"吃货"总共拿到：10 + 7 + 2 = 19`},{input:`3
1
2
3`,output:"4",explanation:'披萨 [1,2,3]（环形），"吃货"先拿3，"馋嘴"拿2，"吃货"拿1。总共 3+1=4。'}],o=`**解题思路：**

本题是一道**博弈论 + 记忆化搜索**问题。

**关键理解：**
- 披萨是环形排列的
- "吃货"先手，可以任选一块开始
- 之后双方只能从缺口两端选择
- "馋嘴"总是贪心选较大的，"吃货"知道这一点

**算法步骤：**

1. **枚举起点**："吃货"枚举第一块披萨的选择（共n种）
2. **记忆化递归**：对于剩余的环形区间 [L, R]，计算"吃货"能获得的最大值
3. **模拟"馋嘴"的贪心**："馋嘴"总是选两端较大的
4. **"吃货"的最优决策**：在"馋嘴"行动后，"吃货"选择能使自己总和最大的那端

**状态定义**：\`dp[L][R]\` = 从左边界L到右边界R，"吃货"能获得的最大值

**时间复杂度**：O(n²)，每个状态只计算一次`,e={java:`import java.util.*;

public class Main {
    static int n;  // 披萨的数量
    static int[] a;  // 每块披萨的美味值
    static int[][] dp;  // 记忆化数组，用于存储已计算过的状态

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        n = scanner.nextInt();  // 输入披萨的数量
        a = new int[n];  // 初始化存储每块披萨美味值的数组
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();  // 输入每块披萨的美味值
        }
        dp = new int[n][n];  // 初始化记忆化数组，其维度为披萨数量的平方
        for (int[] row : dp) {
            Arrays.fill(row, -1);  // 初始化记忆化数组，将所有值设为-1，表示未计算
        }

        int ans = 0;  // 初始化最大美味值为0
        // 遍历每块披萨，尝试以每块披萨作为起点计算最大美味值
        for (int i = 0; i < n; i++) {
            // 更新最大美味值，allocation函数计算从当前披萨开始的最大美味值
            ans = Math.max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
        }

        System.out.println(ans);  // 输出最多能吃到的披萨的美味值总和
    }

    static int allocation(int L, int R) {
        // 如果当前状态已经计算过，则直接返回结果
        if (dp[L][R] != -1) {
            return dp[L][R];
        }
        // 根据贪心策略，选择当前美味值较大的披萨
        if (a[L] > a[R]) {
            L = (L + 1) % n;  // 如果左边的披萨更美味，则吃掉左边的披萨
        } else {
            R = (R + n - 1) % n;  // 如果右边的披萨更美味，则吃掉右边的披萨
        }
        // 如果只剩下一块披萨，则直接返回这块披萨的美味值
        if (L == R) {
            dp[L][R] = a[L];
        } else {
            // 否则，递归计算剩下披萨的最大美味值，并更新记忆化数组
            dp[L][R] = Math.max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n));
        }
        return dp[L][R];  // 返回当前状态下的最大美味值
    }
}`,python:`# 用于读取输入的标准库
import sys

# 用于存储输入行的数组
lines = []
# 读取标准输入
for line in sys.stdin:
    lines.append(line.strip())

# 披萨的数量
n = int(lines[0])
# 每块披萨的美味值
a = list(map(int, lines[1:1 + n]))
# 记忆化数组，用于存储已计算过的状态
dp = [[-1 for _ in range(n)] for _ in range(n)]

# 计算最大美味值的函数
def allocation(L, R):
    # 如果已计算过，直接返回结果
    if dp[L][R] != -1:
        return dp[L][R]
    # 根据美味值选择吃掉左边或右边的披萨
    if a[L] > a[R]:
        L = (L + 1) % n
    else:
        R = (R + n - 1) % n
    # 如果只剩一块披萨，返回其美味值
    if L == R:
        dp[L][R] = a[L]
    else:
        dp[L][R] = max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n))
    return dp[L][R]

# 初始化最大美味值为 0
ans = 0
# 计算并更新最大美味值
for i in range(n):
    ans = max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i])

# 输出最多能吃到的披萨的美味值总和
print(ans)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const n = parseInt(lines[0]);
  const a = [];
  for (let i = 1; i <= n; i++) a.push(parseInt(lines[i]));
  
  const dp = Array.from({length: n}, () => Array(n).fill(-1));
  
  function allocation(L, R) {
    if (dp[L][R] !== -1) return dp[L][R];
    
    // "馋嘴"贪心选较大的
    if (a[L] > a[R]) {
      L = (L + 1) % n;
    } else {
      R = (R + n - 1) % n;
    }
    
    if (L === R) {
      dp[L][R] = a[L];
    } else {
      dp[L][R] = Math.max(
        a[L] + allocation((L + 1) % n, R),
        a[R] + allocation(L, (R + n - 1) % n)
      );
    }
    return dp[L][R];
  }
  
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
  }
  
  console.log(ans);
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm> // 用于 std::max 函数

using namespace std;

int n; // 披萨的数量
vector<int> a; // 每块披萨的美味值
vector<vector<int>> dp; // 记忆化数组，用于存储已计算过的状态

// 计算最大美味值的函数
int allocation(int L, int R) {
    if (dp[L][R] != -1) {
        return dp[L][R]; // 如果已计算过，直接返回结果
    }
    if (a[L] > a[R]) {
        L = (L + 1) % n; // 左边披萨更美味，吃掉左边的
    } else {
        R = (R + n - 1) % n; // 右边披萨更美味，吃掉右边的
    }
    if (L == R) {
        dp[L][R] = a[L]; // 只剩一块披萨时，返回其美味值
    } else {
        // 否则，递归计算剩下披萨的最大美味值，并更新记忆化数组
        dp[L][R] = max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n));
    }
    return dp[L][R]; // 返回当前状态下的最大美味值
}

int main() {
    cin >> n; // 输入披萨的数量
    a.resize(n); // 调整数组大小以存储每块披萨的美味值
    for (int i = 0; i < n; ++i) {
        cin >> a[i]; // 输入每块披萨的美味值
    }
    dp.assign(n, vector<int>(n, -1)); // 初始化记忆化数组

    int ans = 0; // 初始化最大美味值为 0
    for (int i = 0; i < n; ++i) {
        // 更新最大美味值，allocation函数计算从当前披萨开始的最大美味值
        ans = max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
    }

    cout << ans << endl;  // 输出最多能吃到的披萨的美味值
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;  // 披萨的数量
    int *a; // 存储每块披萨美味值的数组
    int **dp; // 记忆化数组，用于存储已计算过的状态

    // 读取披萨的数量
    scanf("%d", &n);
    a = (int *)malloc(n * sizeof(int));

    // 读取每块披萨的美味值
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    // 初始化记忆化数组
    dp = (int **)malloc(n * sizeof(int *));
    for (int i = 0; i < n; i++) {
        dp[i] = (int *)malloc(n * sizeof(int));
        for (int j = 0; j < n; j++) {
            dp[i][j] = -1;
        }
    }

    // 计算最大美味值的函数声明
    int allocation(int, int, int, int *, int **);

    int ans = 0; // 初始化最大美味值为 0
    for (int i = 0; i < n; i++) {
        ans = (ans > allocation((i + 1) % n, (i + n - 1) % n, n, a, dp) + a[i]) ? ans : allocation((i + 1) % n, (i + n - 1) % n, n, a, dp) + a[i];
    }

    // 输出最多能吃到的披萨的美味值总和
    printf("%d\\n", ans);

    // 释放分配的内存
    for (int i = 0; i < n; i++) {
        free(dp[i]);
    }
    free(dp);
    free(a);

    return 0;
}

// 计算最大美味值的函数
int allocation(int L, int R, int n, int *a, int **dp) {
    if (dp[L][R] != -1) {
        return dp[L][R]; // 如果已计算过，直接返回结果
    }
    if (a[L] > a[R]) {
        L = (L + 1) % n; // 左边披萨更美味，吃掉左边的
    } else {
        R = (R + n - 1) % n; // 右边披萨更美味，吃掉右边的
    }
    if (L == R) {
        dp[L][R] = a[L]; // 只剩一块披萨时，返回其美味值
    } else {
        dp[L][R] = (a[L] + allocation((L + 1) % n, R, n, a, dp)) > (a[R] + allocation(L, (R + n - 1) % n, n, a, dp)) ? (a[L] + allocation((L + 1) % n, R, n, a, dp)) : (a[R] + allocation(L, (R + n - 1) % n, n, a, dp));
    }
    return dp[L][R]; // 返回当前状态下的最大美味值
}`},p={id:"12",title:"分披萨",examType:"A",score:100,description:n,inputDesc:i,outputDesc:a,examples:t,solution:o,codes:e};export{e as codes,p as default,n as description,r as examType,t as examples,l as id,i as inputDesc,a as outputDesc,c as score,o as solution,s as title};
