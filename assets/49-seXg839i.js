const s="49",n="素数之积RSA加密算法",o="A",a=100,i="RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数分解的困难度，数据越大，安全系数越高，给定一个32位正整数，请对其进行因数分解，找出是哪两个素数的乘积。",t="一个正整数num，0 < num <= 2147483647",r="如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1, -1",u=[{input:"15",output:"3 5",explanation:"15 = 3 × 5，3和5都是素数。"},{input:"27",output:"-1 -1",explanation:`27 = 3 × 9 = 3 × 3 × 3。
9不是素数，无法分解为两个素数之积。`},{input:"17",output:"-1 -1",explanation:"17本身是素数，无法分解。"},{input:"143",output:"11 13",explanation:"143 = 11 × 13，都是素数。"}],e=`**解题思路：**

本题是一道**素数判断+因数分解**问题。

**算法步骤：**

1. 首先判断num本身是否是素数，是则无法分解
2. 从2到√num枚举因子i
3. 若num能被i整除，令j = num/i
4. 检查i和j是否都是素数
5. 若都是素数，输出较小的在前
6. 遍历完无结果则输出"-1 -1"

**素数判断优化：**
- 小于等于3的直接判断
- 不是6k±1的一定不是素数
- 只需检查到√n

**时间复杂度**：O(√n × √n) = O(n)`,m={java:`import java.util.Scanner;

public class Main {
    public static boolean isPrime(int num) {
        if (num <= 3) {
            return num > 1;
        }
        if (num % 6 != 1 && num % 6 != 5) {
            return false;
        }
        for (int i = 5; i <= Math.sqrt(num); i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        // 如果输入的数本身就是素数，无法进行因数分解
        if (isPrime(num)) {
            System.out.println("-1 -1");
            return;
        }
        // 因数分解
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                int j = num / i;
                // 判断 i 和 j 是否都是素数
                if (isPrime(i) && isPrime(j)) {
                    System.out.println(i < j ? i + " " + j : j + " " + i);
                    return;
                }
            }
        }
        System.out.println("-1 -1");
    }
}`,python:`import math

# 函数：检查一个数是否为素数
def is_prime(num):
    if num <= 3:
        return num > 1
    if num % 6 != 1 and num % 6 != 5:
        return False
    for i in range(5, int(math.sqrt(num)) + 1, 6):
        if num % i == 0 or num % (i + 2) == 0:
            return False
    return True

num = int(input())

# 如果数字本身就是素数，那么它不能被分解
if is_prime(num):
    print("-1 -1")
else:
    # 分解数字
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            j = num // i
            # 检查 i 和 j 是否都是素数
            if is_prime(i) and is_prime(j):
                print(f"{min(i, j)} {max(i, j)}")
                break
    else:
        print("-1 -1")`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isPrime(num) {
    if (num <= 3) return num > 1;
    if (num % 6 !== 1 && num % 6 !== 5) return false;
    for (let i = 5; i <= Math.sqrt(num); i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

rl.on('line', (line) => {
    const num = parseInt(line);
    if (isPrime(num)) {
        console.log('-1 -1');
        rl.close();
        return;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            const j = num / i;
            if (isPrime(i) && isPrime(j)) {
                console.log(i < j ? \`\${i} \${j}\` : \`\${j} \${i}\`);
                rl.close();
                return;
            }
        }
    }
    console.log('-1 -1');
    rl.close();
});`,cpp:`#include <iostream>
#include <cmath>

// 函数：检查一个数是否为素数
bool isPrime(int num) {
    if (num <= 3) {
        return num > 1;
    }
    if (num % 6 != 1 && num % 6 != 5) {
        return false;
    }
    for (int i = 5; i <= sqrt(num); i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int num;
    std::cin >> num; // 读取输入

    // 如果数字本身就是素数，那么它不能被分解
    if (isPrime(num)) {
        std::cout << "-1 -1" << std::endl;
        return 0;
    }

    // 分解数字
    for (int i = 2; i <= sqrt(num); i++) {
        if (num % i == 0) {
            int j = num / i;
            // 检查 i 和 j 是否都是素数
            if (isPrime(i) && isPrime(j)) {
                std::cout << (i < j ? std::to_string(i) + " " + std::to_string(j) : std::to_string(j) + " " + std::to_string(i)) << std::endl;
                return 0;
            }
        }
    }
    std::cout << "-1 -1" << std::endl;
    return 0;
}`,c:`#include <stdio.h>
#include <math.h>

// 函数：检查一个数是否为素数
int isPrime(int num) {
    if (num <= 3) {
        return num > 1;
    }
    if (num % 6 != 1 && num % 6 != 5) {
        return 0;
    }
    for (int i = 5; i <= sqrt(num); i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int num;
    scanf("%d", &num); // 读取输入

    // 如果数字本身就是素数，那么它不能被分解
    if (isPrime(num)) {
        printf("-1 -1\\n");
        return 0;
    }

    // 分解数字
    for (int i = 2; i <= sqrt(num); i++) {
        if (num % i == 0) {
            int j = num / i;
            // 检查 i 和 j 是否都是素数
            if (isPrime(i) && isPrime(j)) {
                printf("%d %d\\n", i < j ? i : j, i < j ? j : i);
                return 0;
            }
        }
    }
    printf("-1 -1\\n");
    return 0;
}`},l={id:"49",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:r,examples:u,solution:e,codes:m};export{m as codes,l as default,i as description,o as examType,u as examples,s as id,t as inputDesc,r as outputDesc,a as score,e as solution,n as title};
