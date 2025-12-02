const a="83",n="用户调度问题",c="A",o=100,i=`在通信系统中，一个常见的问题是对用户进行不同策略的调度，会得到不同的系统消耗和性能。
假设当前有n个待串行调度用户，每个用户可以使用A/B/C三种不同的调度策略，不同的策略会消耗不同的系统资源。请你根据如下规则进行用户调度，并返回总的消耗资源数。
规则：
相邻的用户不能使用相同的调度策略，例如，第1个用户使用了A策略，则第2个用户只能使用B或者C策略。对单个用户而言，不同的调度策略对系统资源的消耗可以归一化后抽象为数值。例如，某用户分别使用A/B/C策略的系统消耗分别为15/8/17。每个用户依次选择当前所能选择的对系统资源消耗最少的策略（局部最优），如果有多个满足要求的策略，选最后一个。
`,t=`第一行表示用户个数n
接下来每一行表示一个用户分别使用三个策略的系统消耗resA resB resC
`,e="最优策略组合下的总的系统资源消耗数。",s=[{input:`3
15 8 17
12 20 9
11 7 5`,output:"24",explanation:"用户1选B(8)→用户2排除B选C(9)→用户3排除C选B(7)，总消耗8+9+7=24。"},{input:`2
10 10 10
5 5 5`,output:"15",explanation:"用户1选C(10，多个相同选最后)→用户2选B(5)，总消耗10+5=15。"},{input:`1
3 1 2`,output:"2",explanation:"只有1个用户，选最小且最后的策略C(2)。注意1和2相比选最后的C。"}],r=`**解题思路：**

本题是一道**贪心**问题（局部最优）。

**核心规则：**
1. 相邻用户不能用相同策略
2. 每个用户选当前可选的最小消耗策略
3. 相同消耗选最后一个（索引大的）

**算法步骤：**
1. 记录上一个用户选择的策略索引
2. 遍历当前用户可选策略（排除上一个索引）
3. 选择消耗最小且索引最大的策略
4. 累加消耗值

**时间复杂度**：O(N)`,l={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    int[][] res = new int[n][3];
    for (int i = 0; i < n; i++) {
      res[i][0] = sc.nextInt();
      res[i][1] = sc.nextInt();
      res[i][2] = sc.nextInt();
    }

    System.out.println(getResult(n, res));
  }

  public static int getResult(int n, int[][] res) {
    int last = -1;
    int sum = 0;

    for (int i = 0; i < n; i++) {
      last = getMinEleIdx(res[i], last);
      sum += res[i][last];
    }

    return sum;
  }

  public static int getMinEleIdx(int[] arr, int excludeIdx) {
    int minEleVal = Integer.MAX_VALUE;
    int minEleIdx = -1;

    for (int i = 0; i < arr.length; i++) {
      if (i == excludeIdx) continue;

      if (arr[i] <= minEleVal) {
        minEleVal = arr[i];
        minEleIdx = i;
      }
    }

    return minEleIdx;
  }
}`,python:`import sys

# 输入获取
n = int(input())
res = [list(map(int, input().split())) for _ in range(n)]


def getMinEleIdx(arr, excludeIdx):
    minEleVal = sys.maxsize
    minEleIdx = -1

    for i in range(len(arr)):
        if i == excludeIdx:
            continue

        if arr[i] <= minEleVal:
            minEleVal = arr[i]
            minEleIdx = i

    return minEleIdx


# 算法入口
def getResult():
    last = -1
    total = 0

    for i in range(n):
        last = getMinEleIdx(res[i], last)
        total += res[i][last]

    return total


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let m;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    m = parseInt(lines[0]);
  }

  if (m != undefined && lines.length === m + 1) {
    lines.shift();
    const res = lines.map((line) => line.split(" ").map(Number));
    const ans = [Infinity];
    dfs(res, m, 0, -1, 0, ans);
    console.log(ans[0]);

    lines.length = 0;
  }
});

function dfs(res, m, level, index, total, ans) {
  if (level == m) {
    ans[0] = Math.min(ans[0], total);
    return;
  }

  const r = res[level];
  for (let i = 0; i < r.length; i++) {
    if (i != index) {
      dfs(res, m, level + 1, i, total + r[i], ans);
    }
  }
}`,cpp:`#include <iostream>
#include <climits>
using namespace std;

int getMinIdx(int arr[], int excludeIdx) {
    int minVal = INT_MAX;
    int minIdx = -1;
    for (int i = 0; i < 3; i++) {
        if (i == excludeIdx) continue;
        if (arr[i] <= minVal) {
            minVal = arr[i];
            minIdx = i;
        }
    }
    return minIdx;
}

int main() {
    int n;
    cin >> n;
    
    int res[n][3];
    for (int i = 0; i < n; i++) {
        cin >> res[i][0] >> res[i][1] >> res[i][2];
    }
    
    int last = -1;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        last = getMinIdx(res[i], last);
        sum += res[i][last];
    }
    
    cout << sum << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <limits.h>

int getMinIdx(int arr[], int excludeIdx) {
    int minVal = INT_MAX;
    int minIdx = -1;
    for (int i = 0; i < 3; i++) {
        if (i == excludeIdx) continue;
        if (arr[i] <= minVal) {
            minVal = arr[i];
            minIdx = i;
        }
    }
    return minIdx;
}

int main() {
    int n;
    scanf("%d", &n);
    
    int res[n][3];
    for (int i = 0; i < n; i++) {
        scanf("%d %d %d", &res[i][0], &res[i][1], &res[i][2]);
    }
    
    int last = -1;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        last = getMinIdx(res[i], last);
        sum += res[i][last];
    }
    
    printf("%d\\n", sum);
    return 0;
}`},u={id:"83",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:s,solution:r,codes:l};export{l as codes,u as default,i as description,c as examType,s as examples,a as id,t as inputDesc,e as outputDesc,o as score,r as solution,n as title};
