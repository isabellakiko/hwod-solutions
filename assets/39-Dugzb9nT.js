const m="39",n="水仙花数 Ⅰ",a="A",c=100,i=`所谓水仙花数，是指一个n位的正整数，其各位数字的n次方和等于该数本身。
例如153是水仙花数，153是一个3位数，并且153 = 1^3 + 5^3 + 3^3。`,s=`第一行输入一个整数n，表示一个n位的正整数。n在3到7之间，包含3和7。
第二行输入一个正整数m，表示需要返回第m个水仙花数。`,t=`返回长度是n的第m个水仙花数。个数从0开始编号。
若m大于水仙花数的个数，返回最后一个水仙花数和m的乘积。
若输入不合法，返回-1。`,r=[{input:`3
0`,output:"153",explanation:`n=3，求第0个3位水仙花数。
3位水仙花数有：153, 370, 371, 407（共4个）。
153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✓
第0个是153。`},{input:`3
3`,output:"407",explanation:`n=3，求第3个3位水仙花数。
3位水仙花数有：153, 370, 371, 407。
第3个是407。`},{input:`3
10`,output:"4070",explanation:`n=3，求第10个3位水仙花数。
但3位水仙花数只有4个，m=10超过数量。
返回最后一个水仙花数407乘以m=10，即407×10=4070。`},{input:`9
0`,output:"-1",explanation:"n=9不在[3,7]范围内，输入不合法，返回-1。"}],u=`**解题思路：**

本题是一道**数学+枚举**问题。

**什么是水仙花数：**
- n位数，其各位数字的n次方之和等于该数本身
- 例如：153 = 1³ + 5³ + 3³

**算法步骤：**

1. 判断输入合法性，n必须在[3,7]范围内
2. 确定n位数的范围：[10^(n-1), 10^n)
3. 遍历范围内所有数，判断是否为水仙花数
4. 将所有水仙花数存入列表
5. 根据m返回结果：
   - m < 列表长度：返回第m个
   - m >= 列表长度：返回最后一个 × m

**时间复杂度**：O(10^n × n)`,e={java:`import java.util.*;

public class Main {
     public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 输入n和m
        int n = sc.nextInt();
        int m = sc.nextInt();
        
        // 判断输入是否合法
        if (n < 3 || n > 7) {
            System.out.println("-1");
            return;
        }
        
        // 计算水仙花数的范围
        int start = (int) Math.pow(10, n - 1);
        int end = (int) Math.pow(10, n);
        
        // 存储水仙花数的列表
        List<Integer> narcissusList = new ArrayList<>();
        
        // 遍历范围内的数，判断是否为水仙花数并加入列表
        for (int i = start; i < end; i++) {
            if (isNarcissusNumber(i, n)) {
                narcissusList.add(i);
            }
        }
        
        // 获取水仙花数列表的长度
        int size = narcissusList.size();
        
        // 若列表为空，输出-1
        if (size == 0) {
            System.out.println("-1");
            return;
        }
        
        // 输出第m个水仙花数，若m大于列表长度，则输出最后一个水仙花数乘以m
        System.out.println(m >= size ? narcissusList.get(size - 1) : narcissusList.get(m));
    }
    
    // 判断一个数是否为水仙花数
    public static boolean isNarcissusNumber(int num, int n) {
        int sum = 0;
        String numStr = String.valueOf(num);
        
        // 计算各位数字的n次方和
        for (int i = 0; i < n; i++) {
            sum += Math.pow(Integer.parseInt(numStr.substring(i, i + 1)), n);
        }
        
        // 判断是否为水仙花数
        return sum == num;
    }
}`,python:`def isNarcissusNumber(num, n):
    sum = 0
    numStr = str(num)

    for i in range(n):
        sum += int(numStr[i]) ** n

    return sum == num
n = int(input())
m = int(input())

if n < 3 or n > 7:
    print("-1")
    exit()

start = 10 ** (n - 1)
end = 10 ** n

narcissusList = []

for i in range(start, end):
    if isNarcissusNumber(i, n):
        narcissusList.append(i)

size = len(narcissusList)

if size == 0:
    print("-1")
    exit()

print(narcissusList[size - 1] if m >= size else narcissusList[m])`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (n) => {
  rl.on('line', (m) => {
    n= parseInt(n);
    m= parseInt(m);
 // 判断输入是否合法
  if (n < 3 || n > 7) {
    console.log("-1");
    rl.close();
    return;
  }
  
  // 计算水仙花数的范围
  const start = Math.pow(10, n - 1);
  const end = Math.pow(10, n);
  
  // 存储水仙花数的列表
  const narcissusList = [];
  
  // 遍历范围内的数，判断是否为水仙花数并加入列表
  for (let i = start; i < end; i++) {
    if (isNarcissusNumber(i, n)) {
      narcissusList.push(i);
    }
  }
  
  // 获取水仙花数列表的长度
  const size = narcissusList.length;
  
  // 若列表为空，输出-1
  if (size === 0) {
    console.log("-1");
    rl.close();
    return;
  }
  
  // 输出第m个水仙花数，若m大于列表长度，则输出最后一个水仙花数乘以m
  console.log(m >= size ? narcissusList[size - 1] : narcissusList[m]);
  
  rl.close();
});
});
 

// 判断一个数是否为水仙花数
function isNarcissusNumber(num, n) {
  let sum = 0;
  const numStr = String(num);
  
  // 计算各位数字的n次方和
  for (let i = 0; i < n; i++) {
    sum += Math.pow(parseInt(numStr.substring(i, i + 1)), n);
  }
  
  // 判断是否为水仙花数
  return sum === num;
}`,cpp:`#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

bool isNarcissusNumber(int num, int n) {
    int sum = 0;
    string numStr = to_string(num);
    
    for (int i = 0; i < n; i++) {
        sum += pow(stoi(numStr.substr(i, 1)), n);
    }
    
    return sum == num;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    if (n < 3 || n > 7) {
        cout << "-1" << endl;
        return 0;
    }
    
    int start = pow(10, n - 1);
    int end = pow(10, n);
    
    vector<int> narcissusList;
    
    for (int i = start; i < end; i++) {
        if (isNarcissusNumber(i, n)) {
            narcissusList.push_back(i);
        }
    }
    
    int size = narcissusList.size();
    
    if (size == 0) {
        cout << "-1" << endl;
        return 0;
    }
    
    cout << (m >= size ? narcissusList[size - 1] : narcissusList[m]) << endl;
    
    return 0;
}`,c:`#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// 判断一个数是否为水仙花数的函数声明
int isNarcissusNumber(int num, int n);

int main() {
    int n, m;
    
    // 输入n和m
    if (scanf("%d %d", &n, &m) != 2) {
        printf("-1\\n");
        return -1;
    }

    // 判断输入是否合法，n必须在3到7之间
    if (n < 3 || n > 7) {
        printf("-1\\n");
        return -1;
    }
    
    // 计算n位数的范围
    int start = pow(10, n - 1); // n位数的起始值，例如3位数从100开始
    int end = pow(10, n);       // n位数的结束值，例如3位数到999结束

    // 存储水仙花数的数组，最大长度为end - start
    int narcissusList[end - start];
    int count = 0; // 用于记录找到的水仙花数数量

    // 遍历范围内的数，判断是否为水仙花数
    for (int i = start; i < end; i++) {
        if (isNarcissusNumber(i, n)) {
            narcissusList[count++] = i; // 将水仙花数加入数组
        }
    }

    // 若没有找到任何水仙花数，输出-1
    if (count == 0) {
        printf("-1\\n");
        return 0;
    }

    // 判断m的值是否超出找到的水仙花数的数量
    if (m >= count) {
        // m大于或等于水仙花数的数量时，返回最后一个水仙花数乘以m
        printf("%ld\\n", narcissusList[count - 1] * m);
    } else {
        // 否则，返回第m个水仙花数
        printf("%ld\\n", narcissusList[m]);
    }

    return 0;
}

// 判断一个数是否为水仙花数
int isNarcissusNumber(int num, int n) {
    int sum = 0;          // 用于存储各位数字的n次方和
    int original_num = num; // 保留原始数值用于最后比较

    // 逐位提取数字并计算n次方和
    while (num > 0) {
        int digit = num % 10;           // 获取当前数的最后一位数字
        sum += pow(digit, n);           // 计算该数字的n次方并加到总和中
        num /= 10;                      // 移除最后一位数字，继续处理剩下的数字
    }

    // 若n次方和等于原始数值，则该数为水仙花数
    return sum == original_num;
}`},o={id:"39",title:n,examType:"A",score:100,description:i,inputDesc:s,outputDesc:t,examples:r,solution:u,codes:e};export{e as codes,o as default,i as description,a as examType,r as examples,m as id,s as inputDesc,t as outputDesc,c as score,u as solution,n as title};
