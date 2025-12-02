const o="102",n="最大报酬",m="A",p=100,i="小明每周上班都会拿到自己的工作清单，工作清单内包含 n 项工作，每项工作都有对应的耗时时间（单位 h）和报酬，工作的总报酬为所有已完成工作的报酬之和，那么请你帮小明安排一下工作，保证小明在指定的工作时间内工作收入最大化。",t="T 代表工作时长（单位 h， 0 < T < 1000000）， n 代表工作数量（ 1 < n ≤ 3000）。 接下来是 n 行，每行包含两个整数 t，w。 t 代表该工作消耗的时长（单位 h， t > 0），w 代表该项工作的报酬。",e="输出小明指定工作时长内工作可获得的最大报酬。",s=[{input:`40 3
20 10
20 20
20 5`,output:"30",explanation:"工作时长40小时，3项工作。选择工作1(20h,10元)和工作2(20h,20元)，总耗时40h，报酬30元。"},{input:`20 2
10 5
15 8`,output:"13",explanation:"选择两项工作耗时25h超时。选工作1+部分时间或只选工作2。选工作1(10h,5元)+工作2(15h,8元)超时，只能选其中组合，最优为两者都选=13元。"}],r=`**解题思路：**

本题是一道**01背包**问题。

**核心思路：**
- 工作时长T = 背包容量
- 工作耗时 = 物品重量
- 工作报酬 = 物品价值

**状态转移：**
- dp[i][j] = 前i项工作在j时间内的最大报酬
- dp[i][j] = max(dp[i-1][j], dp[i-1][j-t]+w)

**时间复杂度**：O(N×T)`,a={java:`import java.util.Scanner;
import java.util.*;

class Main {
    
	public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt(); // 工作时长
        int n = scanner.nextInt(); // 工作数量
        int[][] works = new int[n][2]; // 工作清单，每个工作包含耗时和报酬
        for (int i = 0; i < n; i++) {
            works[i][0] = scanner.nextInt(); // 耗时
            works[i][1] = scanner.nextInt(); // 报酬
        }
 
        int minTime = Integer.MAX_VALUE; // 记录工作清单中最小的耗时
        for (int[] work : works) {
            minTime = Math.min(minTime, work[0]);
        }
 
        int[][] dp = new int[n + 1][T + 1]; // 动态规划数组
        for (int i = 1; i <= n; i++) {
            for (int j = minTime; j <= T; j++) {
                int last = dp[i - 1][j]; // 不选当前工作
                int current = works[i - 1][0] > j ? 0 : works[i - 1][1] + dp[i - 1][j - works[i - 1][0]]; // 选当前工作
                dp[i][j] = Math.max(last, current); // 取最大值
            }
        }
        System.out.print(dp[n][T]); // 输出最大报酬
        
    }
 
}`,python:`import sys
input = sys.stdin.readline

work_time, n = map(int, input().split()) # 工作时间和工作数量
tasks = [] # 存储每项工作的耗时时间和报酬
for i in range(n):
    tasks.append(list(map(int, input().split())))

min_time = float('inf') # 找到所有工作中耗时最短的那个min_time
for task in tasks:
    min_time = min(min_time, task[0])

dp = [[0] * (work_time + 1) for _ in range(n + 1)] # 初始化dp数组
for i in range(1, n + 1):
    for j in range(min_time, work_time + 1):
        last = dp[i - 1][j] # 上一项工作在j时间内能获得的最大报酬
        current = 0 if tasks[i - 1][0] > j else tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]] # 当前工作在j时间内能获得的最大报酬
        dp[i][j] = max(last, current) # 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值

print(dp[n][work_time]) # 输出前n项工作在T时间内能获得的最大报酬`,javascript:`const readline = require('readline');
// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 用于存储输入的数据
const lines = [];
let workTime, n;
// 监听每行输入的数据
rl.on("line", (line) => {
  // 将输入的数据存入 lines 数组中
  lines.push(line);
  // 当 lines 数组长度为 1 时，表示输入的是工作时长和工作数量
  if (lines.length === 1) {
    [workTime, n] = lines[0].split(" ").map(Number);
  }
  // 当 lines 数组长度为 n + 1 时，表示输入的是 n 个工作的耗时时间和报酬
  if (n && lines.length === n + 1) {
    // 删除 lines 数组中的第一个元素，即工作耗时时间和报酬的数量
    lines.shift();
    // 将每个工作的耗时时间和报酬存入 tasks 数组中
    const tasks = lines.map((line) => line.split(" ").map(Number));
    // 找出所有工作中的最小耗时时间
    let minTime = Infinity;
    for (const task of tasks) {
      minTime = Math.min(minTime, task[0]);
    }
    // 创建 dp 数组，用于存储不同工作在不同时间下的最大报酬
    const dp = new Array(n + 1).fill().map(() => new Array(workTime + 1).fill(0));
    // 遍历所有工作，计算在不同时间下的最大报酬
    for (let i = 1; i <= n; i++) {
      for (let j = minTime; j <= workTime; j++) {
        // 当前工作不在可用时间内，无法完成，报酬为 0
        if (tasks[i - 1][0] > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          // 当前工作在可用时间内，可完成，计算完成后的总报酬
          const last = dp[i - 1][j];
          const current = tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]];
          dp[i][j] = Math.max(last, current);
        }
      }
    }
    // 输出在指定工作时间内的最大报酬
    console.log(dp[n][workTime]);
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int main() {
    int work_time, n; // 工作时间和工作数量
    cin >> work_time >> n;
    vector<vector<int>> tasks(n, vector<int>(2)); // 存储每项工作的耗时时间和报酬
    for (int i = 0; i < n; i++) {
        cin >> tasks[i][0] >> tasks[i][1];
    }

    int min_time = INT_MAX; // 找到所有工作中耗时最短的那个min_time
    for (auto task : tasks) {
        min_time = min(min_time, task[0]);
    }

    vector<vector<int>> dp(n + 1, vector<int>(work_time + 1)); // 初始化dp数组
    for (int i = 1; i <= n; i++) {
        for (int j = min_time; j <= work_time; j++) {
            int last = dp[i - 1][j]; // 上一项工作在j时间内能获得的最大报酬
            int current = tasks[i - 1][0] > j ? 0 : tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]]; // 当前工作在j时间内能获得的最大报酬
            dp[i][j] = max(last, current); // 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值
        }
    }
    cout << dp[n][work_time] << endl; // 输出前n项工作在T时间内能获得的最大报酬
    return 0;
}`,c:`#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

int main() {
    int work_time, n; // 工作时间和工作数量
    scanf("%d %d", &work_time, &n);
    int tasks[n][2]; // 存储每项工作的耗时时间和报酬

    for (int i = 0; i < n; i++) {
        scanf("%d %d", &tasks[i][0], &tasks[i][1]);
    }

    int min_time = INT_MAX; // 找到所有工作中耗时最短的那个min_time
    for (int i = 0; i < n; i++) {
        if (tasks[i][0] < min_time) {
            min_time = tasks[i][0];
        }
    }

    // 动态规划数组
    int **dp = (int**) malloc((n + 1) * sizeof(int*));
    for (int i = 0; i <= n; i++) {
        dp[i] = (int*) malloc((work_time + 1) * sizeof(int));
        for (int j = 0; j <= work_time; j++) {
            dp[i][j] = 0;
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = min_time; j <= work_time; j++) {
            int last = dp[i - 1][j]; // 上一项工作在j时间内能获得的最大报酬
            int current = tasks[i - 1][0] > j ? 0 : tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]]; // 当前工作在j时间内能获得的最大报酬
            dp[i][j] = (last > current) ? last : current; // 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值
        }
    }

    printf("%d\\n", dp[n][work_time]); // 输出前n项工作在T时间内能获得的最大报酬

    // 释放动态分配的内存
    for (int i = 0; i <= n; i++) {
        free(dp[i]);
    }
    free(dp);

    return 0;
}`},l={id:"102",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:s,solution:r,codes:a};export{a as codes,l as default,i as description,m as examType,s as examples,o as id,t as inputDesc,e as outputDesc,p as score,r as solution,n as title};
