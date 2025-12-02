const a="126",n="数字游戏",u="A",d=200,e=`小明玩一个游戏。
系统发1+n张牌，每张牌上有一个整数。
第一张给小明，后n张按照发牌顺序排成连续的一行。
需要小明判断，后n张牌中，是否存在连续的若干张牌，其和可以整除小明手中牌上的数字。`,i=`输入数据有多组，每组输入数据有两行，输入到文件结尾结束。
第一行有两个整数n和m，空格隔开。m代表发给小明牌上的数字。
第二行有n个数，代表后续发的n张牌上的数字，以空格隔开。
1 ≤ n ≤ 10001 ≤ 牌上的整数 ≤ 400000输入的组数，不多于1000用例确保输入都正确，不需要考虑非法情况。`,r="对每组输入，如果存在满足条件的连续若干张牌，则输出1;否则，输出0",s=[{input:`6 7
12 6 3 5 5 1`,output:"1",explanation:"小明牌的数字为7，再发了6张牌。第1、2两张牌数字和为12+6=18，再加第3张=21，可以整除7，输出1"},{input:`10 11
1 1 1 1 1 1 1 1 1 1`,output:"0",explanation:"小明牌的数字为11，再发了10张牌，这10张牌数字和为10，无法整除11，输出0"}],t=`**解题思路：**

本题是一道**前缀和+取余**问题。

**核心思路：**
- 利用前缀和的余数判断连续子数组和是否能被m整除
- 若prefix[j] % m == prefix[i] % m，则sum(i+1, j)能被m整除
- 用哈希表记录已出现的余数

**算法步骤：**
1. 计算前缀和的余数
2. 若余数为0或余数重复出现，返回1
3. 遍历完未找到则返回0

**时间复杂度**：O(N)`,m={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNextLine()) {
            // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
            String[] input = scanner.nextLine().split(" ");
            int n = Integer.parseInt(input[0]);
            int m = Integer.parseInt(input[1]);

            // 读取后续发的n张牌的数字
            int[] cardNumbers = new int[n];
            String[] numStrings = scanner.nextLine().split(" ");
            for (int i = 0; i < n; i++) {
                cardNumbers[i] = Integer.parseInt(numStrings[i]);
            }

            // 使用boolean数组来记录余数的出现情况
            boolean[] remainderExists = new boolean[m];

            int sum = 0;
            boolean found = false;
            for (int cardNumber : cardNumbers) {
                sum += cardNumber; // 将当前牌的数字累加到sum中
                int remainder = sum % m; // 计算当前和的余数
                if (remainderExists[remainder]) { // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
                    found = true;
                    break;
                } else {
                    remainderExists[remainder] = true; // 将当前余数标记为已存在
                }
            }
            System.out.println(found ? 1 : 0);
        }
    }
}`,python:`import sys

for line in sys.stdin:
    # 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
    n, m = map(int, line.split())

    # 读取后续发的n张牌的数字
    cardNumbers = list(map(int, input().split()))

    # 使用列表来记录余数的出现情况
    remainderExists = [False] * m

    sum = 0
    found = False
    for cardNumber in cardNumbers:
        sum += cardNumber  # 将当前牌的数字累加到sum中
        remainder = sum % m  # 计算当前和的余数
        if remainderExists[remainder]:  # 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
            found = True
            break
        else:
            remainderExists[remainder] = True  # 将当前余数标记为已存在

    print(1 if found else 0)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isFirstLine = true;
let n, m, cardNumbers;

rl.on('line', (line) => {
  if (isFirstLine) {
    // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
    [n, m] = line.split(' ').map(Number);
    isFirstLine = false;
  } else {
    // 读取后续发的n张牌的数字
    cardNumbers = line.split(' ').map(Number);

    // 使用数组来记录余数的出现情况
    const remainderExists = new Array(m).fill(false);

    let sum = 0;
    let found = false;
    for (let i = 0; i < n; i++) {
      const cardNumber = cardNumbers[i];
      sum += cardNumber;  // 将当前牌的数字累加到sum中
      const remainder = sum % m;  // 计算当前和的余数
      if (remainderExists[remainder]) {  // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
        found = true;
        break;
      } else {
        remainderExists[remainder] = true;  // 将当前余数标记为已存在
      }
    }

    console.log(found ? 1 : 0);

    isFirstLine = true;
  }
});`,cpp:`#include <iostream>
#include <sstream>
#include <vector>

int main() {
    std::string line;
    while (std::getline(std::cin, line)) {
        std::istringstream iss(line);

        // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
        int n, m;
        iss >> n >> m;

        // 读取后续发的n张牌的数字
        std::vector<int> cardNumbers(n);
        std::getline(std::cin, line);
        iss.str(line);
        iss.clear();
        for (int i = 0; i < n; i++) {
            iss >> cardNumbers[i];
        }

        // 使用bool数组来记录余数的出现情况
        std::vector<bool> remainderExists(m, false);

        int sum = 0;
        bool found = false;
        for (int cardNumber : cardNumbers) {
            sum += cardNumber; // 将当前牌的数字累加到sum中
            int remainder = sum % m; // 计算当前和的余数
            if (remainderExists[remainder]) { // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
                found = true;
                break;
            } else {
                remainderExists[remainder] = true; // 将当前余数标记为已存在
            }
        }

        std::cout << (found ? 1 : 0) << std::endl;
    }

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int n, m; // 定义两个整数变量n和m，n代表牌的数量，m代表小明手中牌上的数字

    // 使用while循环读取输入，当输入不是文件结束符EOF时继续执行
    while (scanf("%d %d", &n, &m) != EOF) {
        int cardNumbers[n]; // 定义一个数组来存储n张牌的数字

        // 读取n个牌的数字
        for (int i = 0; i < n; i++) {
            scanf("%d", &cardNumbers[i]); // 从输入中读取每个牌的数字并存入数组
        }

        // 定义一个布尔数组用于记录余数的出现情况，初始值全部为false
        bool remainderExists[m]; 
        for (int i = 0; i < m; i++) {
            remainderExists[i] = false; // 初始化布尔数组
        }

        int sum = 0; // 用于存储牌数字的累加和
        bool found = false; // 标记是否找到满足条件的连续牌

        // 遍历每张牌的数字，计算累加和并求余数
        for (int i = 0; i < n; i++) {
            sum += cardNumbers[i]; // 将当前牌的数字累加到sum中
            int remainder = sum % m; // 计算当前和的余数

            // 如果当前余数为0，或者之前已经存在相同的余数，说明存在满足条件的连续牌
            if (remainder == 0 || remainderExists[remainder]) {
                found = true; // 设置found为true表示找到满足条件的连续牌
                break; // 跳出循环
            } else {
                remainderExists[remainder] = true; // 将当前余数标记为已存在
            }
        }

        // 输出结果，1表示找到满足条件的连续牌，0表示没有找到
        printf("%d\\n", found ? 1 : 0);
    }

    return 0; // 返回0表示程序正常结束
}`},o={id:"126",title:n,examType:"A",score:200,description:e,inputDesc:i,outputDesc:r,examples:s,solution:t,codes:m};export{m as codes,o as default,e as description,u as examType,s as examples,a as id,i as inputDesc,r as outputDesc,d as score,t as solution,n as title};
