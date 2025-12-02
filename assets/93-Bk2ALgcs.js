const u="93",m="分苹果",o="A",l=100,n=`A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位 12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。
输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。
如果无法满足A的要求，输出-1。
数据范围
1 <= 总苹果数量 <= 200001 <= 每个苹果重量 <= 10000`,i=`输入第一行是苹果数量：3
输入第二行是每个苹果重量：3 5 6`,t="输出第一行是B获取的苹果总重量：11",s=[{input:`3
3 5 6`,output:"11",explanation:"3^5^6=0，可以等分。B拿最多=总和14-最小3=11。"},{input:`2
5 6`,output:"-1",explanation:"5^6=3≠0，无法按A的规则等分。"},{input:`4
1 2 3 4`,output:"9",explanation:"1^2^3^4=4≠0，无法等分，输出-1。（需验证）"}],e=`**解题思路：**

本题是一道**异或运算**问题。

**核心思路：**
- 二进制加法不进位 = 异或运算(XOR)
- A要求等分：两堆异或结果相等 → 全部异或为0
- B要最多：把最小的苹果给A，其余给B

**算法步骤：**
1. 计算所有苹果重量的异或和
2. 若异或和≠0，无法等分，返回-1
3. 若异或和=0，B获取 = 总和 - 最小值

**时间复杂度**：O(N)`,a={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建一个扫描器对象，用于读取输入
        Scanner scanner = new Scanner(System.in);
        // 读取苹果的数量 n
        int n = scanner.nextInt();
        // 创建一个大小为 n 的数组，用于存储每个苹果的重量
        int[] a = new int[n];
        // 循环读取每个苹果的重量，并存储到数组中
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();
        }
        // 初始化异或总和变量
        int sums = 0;
        // 初始化最小值变量为整型的最大值
        int min = Integer.MAX_VALUE;
        // 遍历所有苹果的重量
        for (int x : a) {
            // 按位异或操作，更新异或总和
            sums = sums ^ x;
            // 找到当前最小的苹果重量
            if (x < min) {
                min = x;
            }
        }
        // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
        if (sums != 0) {
            System.out.println(-1);
        } else {
            // 计算所有苹果重量的总和
            int sum = 0;
            for (int x : a) {
                sum += x;
            }
            // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
            System.out.println(sum - min);
        }
    }
}`,python:`import sys

# 读取苹果的数量 n
n = int(input())
# 读取每个苹果的重量并存储到列表 a 中
a = list(map(int, input().split()))

# 初始化异或总和
sums = 0
# 初始化最小值为系统的最大整数
min_val = sys.maxsize
# 遍历所有苹果的重量
for x in a:
    # 按位异或操作，更新异或总和
    sums = sums ^ x
    # 找到当前最小的苹果重量
    if x < min_val:
        min_val = x

# 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
if sums != 0:
    print(-1)
else:
    # 计算所有苹果重量的总和
    total_sum = sum(a)
    # 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
    print(total_sum - min_val)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n;  // 苹果数量
let a;  // 每个苹果的重量数组

// 读取输入的第一行，苹果数量 n
rl.on('line', (inputN) => {
  n = parseInt(inputN);
  
  // 读取输入的第二行，苹果的重量列表
  rl.on('line', (inputA) => {
    a = inputA.split(' ').map(Number);
    
    // 初始化异或总和
    let sums = 0;
    // 初始化最小值为 JavaScript 中安全的最大整数
    let min_val = Number.MAX_SAFE_INTEGER;
    
    // 遍历所有苹果的重量
    a.forEach((x) => {
      // 按位异或操作，更新异或总和
      sums = sums ^ x;
      // 找到当前最小的苹果重量
      if (x < min_val) {
        min_val = x;
      }
    });
    
    // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
    if (sums !== 0) {
      console.log(-1);
    } else {
      // 计算所有苹果重量的总和
      const total_sum = a.reduce((sum, x) => sum + x, 0);
      // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
      console.log(total_sum - min_val);
    }
    
    rl.close();  // 关闭读取接口
  });
});`,cpp:`#include <iostream>
#include <vector>
#include <limits>

int main() {
    int n;
    // 读取苹果的数量 n
    std::cin >> n;
    // 创建一个大小为 n 的向量，用于存储每个苹果的重量
    std::vector<int> a(n);
    // 循环读取每个苹果的重量，并存储到向量中
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    // 初始化异或总和变量
    int sums = 0;
    // 初始化最小值变量为整型的最大值
    int min = std::numeric_limits<int>::max();
    // 遍历所有苹果的重量
    for (int x : a) {
        // 按位异或操作，更新异或总和
        sums = sums ^ x;
        // 找到当前最小的苹果重量
        if (x < min) {
            min = x;
        }
    }
    // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
    if (sums != 0) {
        std::cout << -1 << std::endl;
    } else {
        // 计算所有苹果重量的总和
        int sum = 0;
        for (int x : a) {
            sum += x;
        }
        // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
        std::cout << sum - min << std::endl;
    }
    return 0;
}`,c:`#include <stdio.h>
#include <limits.h>  // 用于定义整型的最大值 INT_MAX

int main() {
    int n;
    // 读取苹果的数量 n
    scanf("%d", &n);
    
    // 创建一个大小为 n 的数组，用于存储每个苹果的重量
    int a[n];
    
    // 循环读取每个苹果的重量，并存储到数组中
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    
    // 初始化异或总和变量
    int sums = 0;
    // 初始化最小值变量为整型的最大值
    int min = INT_MAX;
    
    // 遍历所有苹果的重量
    for (int i = 0; i < n; i++) {
        // 按位异或操作，更新异或总和
        sums = sums ^ a[i];
        // 找到当前最小的苹果重量
        if (a[i] < min) {
            min = a[i];
        }
    }
    
    // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
    if (sums != 0) {
        printf("-1\\n");
    } else {
        // 计算所有苹果重量的总和
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += a[i];
        }
        // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
        printf("%d\\n", sum - min);
    }
    
    return 0;
}`},r={id:"93",title:"分苹果",examType:"A",score:100,description:n,inputDesc:i,outputDesc:t,examples:s,solution:e,codes:a};export{a as codes,r as default,n as description,o as examType,s as examples,u as id,i as inputDesc,t as outputDesc,l as score,e as solution,m as title};
