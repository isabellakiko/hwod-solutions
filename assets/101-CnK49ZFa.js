const s="101",n="最大利润贪心的商人",o="A",p=100,i=`商人经营一家店铺，有number种商品，由于仓库限制每件商品的最大持有数量是item[index]，每种商品的价格是item-price[item_index][day]
通过对商品的买进和卖出获取利润，请给出商人在days天内能获取的最大的利润 注：同一件商品可以反复买进和卖出`,t=`第一行输入商品的数量number，比如3 第二行输入商品售货天数 days，比如3 第三行输入仓库限制每件商品的最大持有数量是item[index]，比如4 5 6 后面继续输入number行days列，含义如下： 第一件商品每天的价格，比如1 2 3 第二件商品每天的价格，比如4 3 2 第三件商品每天的价格，比如1 5 3
第一行输入商品的数量number，比如3
第二行输入商品售货天数 days，比如3
第三行输入仓库限制每件商品的最大持有数量是item[index]，比如4 5 6
后面继续输入number行days列，含义如下：
第一件商品每天的价格，比如1 2 3
第二件商品每天的价格，比如4 3 2
第三件商品每天的价格，比如1 5 3`,e="输出商人在这段时间内的最大利润。",r=[{input:`3
3
4 5 6
1 2 3
4 3 2
1 5 3`,output:"32",explanation:"商品1：价格上涨(1→2→3)，利润=(1+1)×4=8。商品2：价格下跌，利润=0。商品3：(1→5)利润=4×6=24。总利润=32。"},{input:`2
2
3 4
1 2
3 1`,output:"3",explanation:"商品1价格上涨1元，利润=1×3=3。商品2价格下跌，利润=0。"}],m=`**解题思路：**

本题是一道**贪心**问题（类似股票买卖）。

**核心思路：**
- 找到价格上升区间，低买高卖
- 每个上升段利润 = 价差 × 最大持有量
- 下跌段不交易

**算法步骤：**
1. 遍历每种商品的每日价格
2. 若今日价格>昨日价格，计算利润
3. 利润 = (今日-昨日) × 最大持有量
4. 累加所有利润

**时间复杂度**：O(N×D)`,a={java:`import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

class Main {
    public static void main(String[] args) {
        // 处理输入
        Scanner in = new Scanner(System.in);
        int itemNumber = in.nextInt(); // 商品数量
        int days = in.nextInt(); // 售货天数
        int[] maxItems = new int[itemNumber]; // 每件商品最大持有数量
        for (int i = 0; i < itemNumber; i++) {
            maxItems[i] = in.nextInt();
        }
        int[][] prices = new int[itemNumber][days]; // 商品价格列表
        for (int i = 0; i < itemNumber; i++) {
            for (int j = 0; j < days; j++) {
                prices[i][j] = in.nextInt();
            }
        }

        // 贪心算法
        int maxProfit = 0;
        for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
            for (int j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
                int profit = Math.max(0, prices[i][j] - prices[i][j - 1]);
                // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
                maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
            }
        }

        System.out.println(maxProfit); // 输出最大利润
    }
}`,python:`# 处理输入
itemNumber = int(input())  # 商品数量
days = int(input())  # 售货天数

maxItems = list(map(int, input().split()))  # 每件商品最大持有数量

prices = [list(map(int, input().split())) for _ in range(itemNumber)]  # 商品价格列表

# 贪心算法
maxProfit = 0
for i in range(itemNumber):  # 遍历每件商品
    for j in range(1, days):  # 遍历商品价格列表，求出每天的利润
        profit = max(0, prices[i][j] - prices[i][j - 1])
        # 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
        maxProfit += profit * maxItems[i]  # 求出当前商品能够获取的最大利润

print(maxProfit)  # 输出最大利润`,javascript:`const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 处理输入
let input = [];
readline.on('line', (line) => {
  input.push(line);
});

readline.on('close', () => {
  const itemNumber = parseInt(input[0])
  const days = parseInt(input[1]); // 商品数量和售货天数

  const maxItems = input[2].split(' ').map(Number); // 每件商品最大持有数量

  const prices = input.slice(3).map((line) => line.split(' ').map(Number)); // 商品价格列表
 
  let maxProfit = 0;
  for (let i = 0; i < itemNumber; i++) { // 遍历每件商品
    for (let j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
      const profit = Math.max(0, prices[i][j] - prices[i][j - 1]);
      // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
      maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
    }
  }

  console.log(maxProfit); // 输出最大利润
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 处理输入
    int itemNumber, days;
    cin >> itemNumber >> days;

    vector<int> maxItems(itemNumber); // 每件商品最大持有数量
    for (int i = 0; i < itemNumber; i++) {
        cin >> maxItems[i];
    }

    vector<vector<int>> prices(itemNumber, vector<int>(days)); // 商品价格列表
    for (int i = 0; i < itemNumber; i++) {
        for (int j = 0; j < days; j++) {
            cin >> prices[i][j];
        }
    }

    // 贪心算法
    int maxProfit = 0;
    for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
        for (int j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
            int profit = max(0, prices[i][j] - prices[i][j - 1]);
            // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
            maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
        }
    }

    cout << maxProfit << endl; // 输出最大利润
    return 0;
}`,c:`#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b; // 返回两个整数中的较大值
}

int main() {
    // 处理输入
    int itemNumber; // 商品数量
    int days; // 售货天数

    // 从标准输入读取商品数量和售货天数
    scanf("%d %d", &itemNumber, &days);

    int maxItems[itemNumber]; // 每件商品的最大持有数量
    for (int i = 0; i < itemNumber; i++) {
        scanf("%d", &maxItems[i]); // 读取每件商品的最大持有数量
    }

    int prices[itemNumber][days]; // 商品价格列表，二维数组存储
    for (int i = 0; i < itemNumber; i++) {
        for (int j = 0; j < days; j++) {
            scanf("%d", &prices[i][j]); // 读取每件商品在每一天的价格
        }
    }

    // 贪心算法计算最大利润
    int maxProfit = 0; // 初始化最大利润为0
    for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
        for (int j = 1; j < days; j++) { // 遍历每一天的价格
            // 当前价格减去前一天的价格，计算利润
            int profit = max(0, prices[i][j] - prices[i][j - 1]);
            // 如果利润为正，则将其乘以该商品的最大持有量，加到总利润中
            maxProfit += profit * maxItems[i];
        }
    }

    // 输出最大利润
    printf("%d\\n", maxProfit);

    return 0;
}`},c={id:"101",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:r,solution:m,codes:a};export{a as codes,c as default,i as description,o as examType,r as examples,s as id,t as inputDesc,e as outputDesc,p as score,m as solution,n as title};
