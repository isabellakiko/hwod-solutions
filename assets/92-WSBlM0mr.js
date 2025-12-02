const u="92",s="分糖果",l="A",r=100,n=`小明从糖果盒中随意抓一把糖果，每次小明会取出一半的糖果分给同学们。
当糖果不能平均分配时，小明可以选择从糖果盒中（假设盒中糖果足够）取出一个糖果或放回一个糖果。
小明最少需要多少次（取出、放回和平均分配均记一次），能将手中糖果分至只剩一颗。`,t="抓取的糖果数（<10000000000）：15",i="最少分至一颗糖果的次数：5",o=[{input:"15",output:"5",explanation:"15→16(+1)→8(÷2)→4(÷2)→2(÷2)→1(÷2)，共5次。"},{input:"3",output:"2",explanation:"3→2(-1)→1(÷2)，共2次。"},{input:"8",output:"3",explanation:"8→4(÷2)→2(÷2)→1(÷2)，共3次。"}],e=`**解题思路：**

本题是一道**贪心**问题。

**核心思路：**
- 偶数：直接除以2
- 奇数：选择+1或-1使其变为偶数
- 贪心策略：选择使(n±1)/2为偶数的操作
- 特殊情况：n=3时直接减1

**算法步骤：**
1. 若n是偶数，除以2
2. 若n是奇数且n=3，减1
3. 若n是奇数，判断(n+1)/2是否为偶数决定加减
4. 每次操作计数+1

**时间复杂度**：O(log N)`,c={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    long x = scanner.nextLong();
    
    int count = 0;

    // 循环直到只剩一颗糖果
    for (long i = x; i != 1; i /= 2, count++) {
      // 当剩余糖果数量为3时，需要特殊处理
      if (i == 3) {
        count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
        break;
      }
      // 当剩余糖果数量为奇数时，需要进行调整
      if (i % 2 != 0) {
        // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
        if ((i + 1) / 2 % 2 == 0) {
          i++;
        } else { // 否则放回一个糖果
          i--;
        }
        count++;
      }
    }

    System.out.print(count);
  }
}`,python:`import math

# 从标准输入读取糖果的初始数量
x = int(input())
# 初始化操作计数器
count = 0

# 当糖果数量不为1时，继续操作
while x != 1:
    # 特殊情况，当糖果数为3时，直接通过两步操作减至1
    if x == 3:
        count += 2  # 直接加2到计数器（3-1=2，然后2/2=1）
        break
    # 如果当前糖果数是奇数，需要调整糖果数使其成为偶数
    if x % 2 != 0:
        # 选择加1还是减1：如果当前数加1后的一半是偶数，则加1
        if (x + 1) // 2 % 2 == 0:
            x += 1
        else:
            x -= 1  # 否则减1
        count += 1  # 调整操作也算一次操作
    # 糖果数除以2，模拟小明分糖果的过程
    x //= 2
    count += 1  # 分糖果的操作

# 打印总的操作次数
print(count)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (x) => {
  let count = 0;

  // 循环直到只剩一颗糖果
  for (let i = x; i !== 1; i /= 2, count++) {
     // 当剩余糖果数量为3时，需要特殊处理
    if (i === 3) {
      count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
      break;
    }
    // 当剩余糖果数量为奇数时，需要进行调整
    if (i % 2 !== 0) {
      // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
 
      let T = ((Number(i) + 1) / 2) % 2;

 
      if (T === 0) {
        i++;
      } else { // 否则放回一个糖果
        i--;
      }
      count++;
    }
  }

  console.log(count);

  rl.close();
});`,cpp:`#include <iostream>

int main() {
  long long x;
  std::cin >> x;
  
  int count = 0;

  // 循环直到只剩一颗糖果
  for (long long i = x; i != 1; i /= 2, count++) {
    // 当剩余糖果数量为3时，需要特殊处理
    if (i == 3) {
      count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
      break;
    }
    // 当剩余糖果数量为奇数时，需要进行调整
    if (i % 2 != 0) {
      // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
      if ((i + 1) / 2 % 2 == 0) {
        i++;
      } else { // 否则放回一个糖果
        i--;
      }
      count++;
    }
  }

  std::cout << count;

  return 0;
}`,c:`#include <stdio.h>

int main() {
    long long x;
    scanf("%lld", &x); // 从标准输入读取糖果的初始数量

    int count = 0;

    // 循环直到只剩一颗糖果
    for (long long i = x; i != 1; i /= 2, count++) {
        // 当剩余糖果数量为3时，需要特殊处理
        if (i == 3) {
            count += 2; // 直接进行两次操作，将3减到1
            break;
        }
        // 当剩余糖果数量为奇数时，需要进行调整
        if (i % 2 != 0) {
            // 判断增加1后的数除以2是否为偶数，决定是加1还是减1
            if ((i + 1) / 2 % 2 == 0) {
                i++;  // 如果加1后的数可以被2整除，则增加1
            } else {
                i--;  // 否则减1
            }
            count++; // 对糖果数的调整也算作一次操作
        }
    }

    printf("%d", count); // 打印出执行的最小操作次数

    return 0;
}`},a={id:"92",title:"分糖果",examType:"A",score:100,description:n,inputDesc:t,outputDesc:i,examples:o,solution:e,codes:c};export{c as codes,a as default,n as description,l as examType,o as examples,u as id,t as inputDesc,i as outputDesc,r as score,e as solution,s as title};
