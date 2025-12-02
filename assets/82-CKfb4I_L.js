const s="82",n="玩牌高手",d="A",o=100,i=`给定一个长度为n的整型数组，表示一个选手在n轮内可选择的牌面分数。选手基于规则选牌，
请计算所有轮结束后其可以获得的最高总分数。
选择规则如下：
在每轮里选手可以选择获取该轮牌面，则其总分数加上该轮牌面分数，为其新的总分数。选手也可不选择本轮牌面直接跳到下一轮，此时将当前总分数还原为3轮前的总分数，若当前轮次小于等于3（即在第1、2、3轮选择跳过轮次），则总分数置为0。选手的初始总分数为0，且必须依次参加每一轮。
`,t=`第一行为一个小写逗号分割的字符串，表示n轮的牌面分数，1<= n <=20。
分数值为整数，-100 <= 分数值 <= 100。
不考虑格式问题。
`,e="所有轮结束后选手获得的最高总分数。",r=[{input:"1,-5,-6,4,3,6,-2",output:"11",explanation:"选1(总分1)→跳过-5(重置为0)→跳过-6(0)→选4(4)→选3(7)→选6(13)→选-2(11>回退到4)，最终11。"},{input:"1,2,3,4,5",output:"15",explanation:"全部选择：1+2+3+4+5=15。"},{input:"-1,-2,-3",output:"0",explanation:"前3轮跳过都重置为0，全跳过最优。"}],a=`**解题思路：**

本题是一道**动态规划**问题。

**状态转移方程：**
- dp[0] = max(arr[0], 0)
- dp[i] = max(dp[i-1] + arr[i], 0)，当1≤i≤2
- dp[i] = max(dp[i-1] + arr[i], dp[i-3])，当i>2

**核心思路：**
- 选牌：总分加上当前牌面
- 跳过：前3轮重置为0，之后回退到3轮前的分数
- 每轮取两种选择的最大值

**时间复杂度**：O(N)`,p={java:`import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  // 输入获取
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    Integer[] arr =
        Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
 
    System.out.println(getResult(arr));
  }
 
  // 算法入口
  public static int getResult(Integer[] arr) {
    int n = arr.length;
 
    int[] dp = new int[n];
 
    for (int i = 0; i < n; i++) {
      if (i == 0) {
        dp[0] = Math.max(0, arr[0]);
      } else if (i < 3) {
        dp[i] = Math.max(0, dp[i - 1] + arr[i]);
      } else {
        dp[i] = Math.max(dp[i - 3], dp[i - 1] + arr[i]);
      }
    }
 
    return dp[n - 1];
  }
}`,python:`# 输入获取
arr = list(map(int, input().split(",")))
 
 
# 算法入口
def getResult():
    n = len(arr)
 
    dp = [0] * n
 
    for i in range(n):
        if i == 0:
            dp[0] = max(0, arr[0])
        elif i < 3:
            dp[i] = max(0, dp[i - 1] + arr[i])
        else:
            dp[i] = max(dp[i - 3], dp[i - 1] + arr[i])
 
    return dp[-1]
 
 
# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const arr = line.split(",").map((ele) => parseInt(ele));

  console.log(getMaxScore(arr));
});

function getMaxScore(arr) {
  const dp = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      dp[0] = Math.max(arr[0], 0);
    } else if (i > 0 && i < 3) {
      dp[i] = Math.max(dp[i - 1] + arr[i], 0);
    } else {
      dp[i] = Math.max(dp[i - 1] + arr[i], dp[i - 3]);
    }
  }

  return dp.pop();
}`,cpp:`#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    vector<int> arr;
    stringstream ss(line);
    string token;
    while (getline(ss, token, ',')) {
        arr.push_back(stoi(token));
    }
    
    int n = arr.size();
    vector<int> dp(n);
    
    for (int i = 0; i < n; i++) {
        if (i == 0) {
            dp[0] = max(0, arr[0]);
        } else if (i < 3) {
            dp[i] = max(0, dp[i-1] + arr[i]);
        } else {
            dp[i] = max(dp[i-3], dp[i-1] + arr[i]);
        }
    }
    
    cout << dp[n-1] << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int max(int a, int b) {
    return a > b ? a : b;
}

int main() {
    char line[1000];
    fgets(line, sizeof(line), stdin);
    
    int arr[20];
    int n = 0;
    char* token = strtok(line, ",");
    while (token) {
        arr[n++] = atoi(token);
        token = strtok(NULL, ",");
    }
    
    int dp[20];
    for (int i = 0; i < n; i++) {
        if (i == 0) {
            dp[0] = max(0, arr[0]);
        } else if (i < 3) {
            dp[i] = max(0, dp[i-1] + arr[i]);
        } else {
            dp[i] = max(dp[i-3], dp[i-1] + arr[i]);
        }
    }
    
    printf("%d\\n", dp[n-1]);
    return 0;
}`},l={id:"82",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:r,solution:a,codes:p};export{p as codes,l as default,i as description,d as examType,r as examples,s as id,t as inputDesc,e as outputDesc,o as score,a as solution,n as title};
