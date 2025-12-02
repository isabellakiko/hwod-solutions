const o="106",n="查找充电设备组合",d="A",s=100,i=`某个充电站，可提供 n 个充电设备，每个充电设备均有对应的输出功率。
任意个充电设备组合的输出功率总和，均构成功率集合 P 的 1 个元素。
功率集合 P 的最优元素，表示最接近充电站最大输出功率 p_max 的元素。`,p=`输入为 3 行：
第 1 行为充电设备个数 n第 2 行为每个充电设备的输出功率第 3 行为充电站最大输出功率 p_max
充电设备个数 n > 0最优元素必须小于或等于充电站最大输出功率 p_max`,e="功率集合 P 的最优元素",t=[{input:`4
50 20 20 60
90`,output:"90",explanation:"4个设备功率50,20,20,60，最大功率90。选50+20+20=90，最接近90"},{input:`2
50 40
30`,output:"0",explanation:"所有设备功率都>30，无法组合，返回0"}],a=`**解题思路：**

本题是一道**01背包**问题。

**核心思路：**
- p_max = 背包容量
- 设备功率 = 物品重量 = 物品价值
- 求不超过p_max的最大功率和

**状态转移：**
- dp[i][j] = 前i个设备在功率j内的最大值
- dp[i][j] = max(dp[i-1][j], dp[i-1][j-p]+p)

**时间复杂度**：O(N×P)`,r={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建Scanner对象
        Scanner scanner = new Scanner(System.in);
        // 读取输入的整数
        int n = scanner.nextInt();

        // 创建一个长度为n的整型数组
        int[] power = new int[n];
        // 循环读取n个整数，存入数组中
        for (int i = 0; i < n; i++) {
            power[i] = scanner.nextInt();
        }

        // 读取输入的整数
        int p_max = scanner.nextInt();

        // 创建一个n+1行，p_max+1列的二维整型数组
        int[][] dp = new int[n + 1][p_max + 1];

        // 循环计算dp数组的每个元素
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= p_max; j++) {
                // 如果当前能量值大于当前承受的伤害值，则不受伤
                if (power[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else { // 否则需要扣除相应的能量值
                    dp[i][j] = Math.max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
                }
            }
        }

        // 输出结果
        System.out.println(dp[n][p_max]);
    }
}`,python:`n = int(input()) # 充电设备个数
power = list(map(int, input().split())) # 每个充电设备的输出功率
p_max = int(input()) # 充电站最大输出功率

dp = [[0] * (p_max + 1) for _ in range(n + 1)] # 初始化为0

for i in range(1, n + 1):
    for j in range(1, p_max + 1):
        if power[i - 1] > j: # 当前充电设备的功率大于当前总功率j，不能选
            dp[i][j] = dp[i - 1][j] # 不选当前充电设备
        else:
            dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]) # 选或不选当前充电设备

print(dp[n][p_max]) # 输出最大功率`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n, power, p_max;
let dp = [];

// 监听输入流中的每一行数据
rl.on('line', (line) => {
  // 如果n还未赋值，则将输入的第一行数据赋值给n
  if (!n) {
    n = parseInt(line.trim());
  } 
  // 如果power还未赋值，则将输入的第二行数据转化为数组赋值给power
  else if (!power) {
    power = line.trim().split(' ').map(Number);
  } 
  // 如果p_max还未赋值，则将输入的第三行数据赋值给p_max，并进行动态规划
  else if (!p_max) {
    p_max = parseInt(line.trim());
    // 初始化dp数组
    dp = new Array(n + 1).fill().map(() => new Array(p_max + 1).fill(0));
    // 进行动态规划
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= p_max; j++) {
        if (power[i - 1] > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
        }
      }
    }
    // 输出结果
    console.log(dp[n][p_max]);
    // 关闭接口实例
    rl.close();
  }
});`,cpp:`#include <iostream>
using namespace std;

int main() {
    int n; // 充电设备个数
    cin >> n;

    int power[n]; // 每个充电设备的输出功率
    for (int i = 0; i < n; i++) {
        cin >> power[i];
    }

    int p_max; // 充电站最大输出功率
    cin >> p_max;

    int dp[n + 1][p_max + 1] = {}; // 初始化为0

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= p_max; j++) {
            if (power[i - 1] > j) { // 当前充电设备的功率大于当前总功率j，不能选
                dp[i][j] = dp[i - 1][j]; // 不选当前充电设备
            } else {
                dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]); // 选或不选当前充电设备
            }
        }
    }

    cout << dp[n][p_max] << endl; // 输出最大功率

    return 0;
}`,c:`#include <stdio.h>
#include <string.h> // 用于memset函数

int max(int a, int b) {
    return (a > b) ? a : b; // 返回两个整数中的较大值
}

int main() {
    int n; // 充电设备个数
    scanf("%d", &n); // 输入充电设备的个数

    int power[n]; // 每个充电设备的输出功率
    for (int i = 0; i < n; i++) {
        scanf("%d", &power[i]); // 输入每个充电设备的输出功率
    }

    int p_max; // 充电站最大输出功率
    scanf("%d", &p_max); // 输入充电站的最大输出功率

    // 定义一个二维数组dp，初始化为0
    int dp[n + 1][p_max + 1];
    memset(dp, 0, sizeof(dp)); // 使用memset将数组dp初始化为0

    // 动态规划计算最大输出功率
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= p_max; j++) {
            if (power[i - 1] > j) { // 如果当前充电设备的功率大于当前总功率j，不能选择这个设备
                dp[i][j] = dp[i - 1][j]; // 不选择当前充电设备，最大功率为上一个状态的值
            } else {
                // 选择当前充电设备与不选择当前充电设备的最大值
                dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
            }
        }
    }

    // 输出结果，即充电站可以达到的最大输出功率
    printf("%d\\n", dp[n][p_max]);

    return 0;
}`},m={id:"106",title:n,examType:"A",score:100,description:i,inputDesc:p,outputDesc:e,examples:t,solution:a,codes:r};export{r as codes,m as default,i as description,d as examType,t as examples,o as id,p as inputDesc,e as outputDesc,s as score,a as solution,n as title};
