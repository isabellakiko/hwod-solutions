const r="118",n="云短信平台优惠活动",a="A",l=200,i="某云短信厂商，为庆祝国庆，推出充值优惠活动。 现在给出客户预算，和优惠售价序列，求最多可获得的短信总条数。",t=`第一行客户预算M，其中 0 ≤ M ≤ 10^6
第二行给出售价表， P1, P2, … Pn , 其中 1 ≤ n ≤ 100 ,
Pi为充值 i 元获得的短信条数。1 ≤ Pi ≤ 1000 , 1 ≤ n ≤ 100`,e="最多获得的短信条数",o=[{input:`6
10 20 30 40 60`,output:"70",explanation:"预算6元。充1元得10条+充5元得60条=70条最优"},{input:`15
10 20 30 40 60 60 70 80 90 150`,output:"210",explanation:"预算15元。充5元得60条+充10元得150条=210条最优"}],p=`**解题思路：**

本题是一道**完全背包**问题。

**核心思路：**
- 预算M相当于背包容量
- 充值i元相当于物品重量i
- 获得Pi条短信相当于物品价值
- 每种充值可无限次使用

**状态转移：**
- dp[j] = max(dp[j], dp[j-i] + P[i])
- 遍历顺序：从小到大（完全背包）

**时间复杂度**：O(N×M)`,s={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 处理输入
        Scanner in = new Scanner(System.in);
        int money = Integer.parseInt(in.nextLine());
        int[] topupInfo = Arrays.stream(in.nextLine().split(" "))
                .mapToInt(Integer::parseInt)
                .toArray();

        int[] dp = new int[money + 1];

        for (int i = 0; i < topupInfo.length; i++) {
            for (int j = i + 1; j <= money; j++) {
                dp[j] = Math.max(dp[j], dp[j - (i + 1)] + topupInfo[i]);
            }
        }
        System.out.println(dp[money]);
    }
}`,python:`def main():
    # 处理输入
    money = int(input())
    topup_info = list(map(int, input().split()))

    dp = [0] * (money + 1)

    for i in range(len(topup_info)):
        for j in range(i + 1, money + 1):
            dp[j] = max(dp[j], dp[j - (i + 1)] + topup_info[i])

    print(dp[money])

if __name__ == "__main__":
    main()`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const inputs = line.split(' ');
  if (inputs.length === 1) {
    const money = parseInt(inputs[0]);
    rl.on('line', (line) => {
      const topupInfo = line.split(' ').map(Number);
      const dp = new Array(money + 1).fill(0);

      for (let i = 0; i < topupInfo.length; i++) {
        for (let j = i + 1; j <= money; j++) {
          dp[j] = Math.max(dp[j], dp[j - (i + 1)] + topupInfo[i]);
        }
      }
      console.log(dp[money]);
      rl.close();
    });
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;
int main() {
    // 处理输入
    int money;
    cin >> money;
    cin.ignore();

    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> topup_info;
    int value;

    while (iss >> value) {
        topup_info.push_back(value);
    }

    vector<int> dp(money + 1, 0);

    for (size_t i = 0; i < topup_info.size(); i++) {
        for (int j = static_cast<int>(i) + 1; j <= money; j++) {
            dp[j] = max(dp[j], dp[j - (i + 1)] + topup_info[i]);
        }
    }
    cout << dp[money] << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

 
int main() {
    int money;
  
    scanf("%d", &money);

    // 定义售价表数组，并读取售价表
    int topupInfo[100];
    int n = 0;
    while (scanf("%d", &topupInfo[n]) != EOF) {
        n++;
    }
 
    int dp[1001] = {0};

    // 遍历每一个充值选项
    for (int i = 0; i < n; i++) {
        // 从当前预算开始，向后更新 dp 数组
        for (int j = i + 1; j <= money; j++) {
            // 更新 dp[j] 为在充值 i+1 元的情况下获得的最大短信数
            dp[j] = dp[j] > dp[j - (i + 1)] + topupInfo[i] ? dp[j] : dp[j - (i + 1)] + topupInfo[i];
        }
    }

    // 输出在预算 money 下最多可获得的短信条数
    printf("%d\\n", dp[money]);

    return 0;
}`},c={id:"118",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:o,solution:p,codes:s};export{s as codes,c as default,i as description,a as examType,o as examples,r as id,t as inputDesc,e as outputDesc,l as score,p as solution,n as title};
