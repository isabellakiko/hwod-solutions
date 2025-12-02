const m="11",n="分割数组的最大差值",u="A",o=100,e="给定一个由若干整数组成的数组nums ，可以在数组内的任意位置进行分割，将该数组分割成两个非空子数组（即左数组和右数组），分别对子数组求和得到两个值，计算这两个值的差值，请输出所有分割方案中，差值最大的值。",i="第一行输入数组中元素个数n，1 < n ≤ 100000 第二行输入数字序列，以空格进行分隔，数字取值为4字节整数",r="输出差值的最大取值",t=[{input:`6
1 -2 3 4 -9 7`,output:"10",explanation:`数组 [1,-2,3,4,-9,7] 所有分割方案：
- [1] | [-2,3,4,-9,7]：|1 - 3| = 2
- [1,-2] | [3,4,-9,7]：|-1 - 5| = 6
- [1,-2,3] | [4,-9,7]：|2 - 2| = 0
- [1,-2,3,4] | [-9,7]：|6 - (-2)| = 8
- [1,-2,3,4,-9] | [7]：|-3 - 7| = 10

最大差值为 10。`},{input:`3
5 10 -3`,output:"18",explanation:`数组 [5,10,-3] 的分割方案：
- [5] | [10,-3]：|5 - 7| = 2
- [5,10] | [-3]：|15 - (-3)| = 18

最大差值为 18。`}],l=`**解题思路：**

本题是一道**前缀和**问题。

**算法步骤：**

1. **计算总和**：先计算整个数组的总和 \`total\`
2. **枚举分割点**：遍历每个可能的分割位置 i（从 0 到 n-2）
3. **计算差值**：
   - 左边和 = prefixSum[i]
   - 右边和 = total - prefixSum[i]
   - 差值 = |左边和 - 右边和|
4. **记录最大值**：更新最大差值

**优化**：可以边遍历边累加左边和，无需预处理前缀和数组。

**时间复杂度**：O(n)，只需一次遍历。`,f={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // 输入数组长度
    int length = Integer.parseInt(scanner.nextLine());
    
    // 输入数字序列
    long[] numbers = Arrays.stream(scanner.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();

    // 计算前缀和
    long[] prefixSum = new long[length];
    prefixSum[0] = numbers[0];
    for (int i = 1; i < length; i++) {
      prefixSum[i] = prefixSum[i-1] + numbers[i];
    }

    // 差值的最大取值
    long maxDifference = 0;
    
    // 计算差值的最大取值
    for (int i = 0; i < length - 1; i++) {
      long leftSum = prefixSum[i];
      long rightSum = prefixSum[length-1] - prefixSum[i];
      long difference = Math.abs(leftSum - rightSum);
      maxDifference = Math.max(maxDifference, difference);
    }

    // 输出差值的最大取值
    System.out.println(maxDifference);
  }
}`,python:`import sys

# 输入数组长度
length = int(sys.stdin.readline())

# 输入数字序列
numbers = list(map(int, sys.stdin.readline().split()))

# 计算前缀和
prefixSum = [0] * length
prefixSum[0] = numbers[0]
for i in range(1, length):
  prefixSum[i] = prefixSum[i-1] + numbers[i]

# 差值的最大取值
maxDifference = 0

# 计算差值的最大取值
for i in range(length - 1):
  leftSum = prefixSum[i]
  rightSum = prefixSum[length-1] - prefixSum[i]
  difference = abs(leftSum - rightSum)
  maxDifference = max(maxDifference, difference)

# 输出差值的最大取值
print(maxDifference)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (length) => {
  rl.on('line', (numbers) => {
    numbers = numbers.split(' ').map(Number);

    // 计算前缀和
    let prefixSum = new Array(length);
    prefixSum[0] = numbers[0];
    for (let i = 1; i < length; i++) {
      prefixSum[i] = prefixSum[i-1] + numbers[i];
    }

    // 差值的最大取值
    let maxDifference = 0;

    // 计算差值的最大取值
    for (let i = 0; i < length - 1; i++) {
      let leftSum = prefixSum[i];
      let rightSum = prefixSum[length-1] - prefixSum[i];
      let difference = Math.abs(leftSum - rightSum);
      maxDifference = Math.max(maxDifference, difference);
    }

    // 输出差值的最大取值
    console.log(maxDifference);

    rl.close();
  });
});`,cpp:`#include <iostream>
#include <sstream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
  string input;
  getline(cin, input);
  int length = stoi(input);

  getline(cin, input);
  istringstream iss(input);
  vector<long long> numbers(length);
  for (int i = 0; i < length; i++) {
    iss >> numbers[i];
  }

  vector<long long> prefixSum(length);
  prefixSum[0] = numbers[0];
  for (int i = 1; i < length; i++) {
    prefixSum[i] = prefixSum[i-1] + numbers[i];
  }

  long long maxDifference = 0;
  for (int i = 0; i < length - 1; i++) {
    long long leftSum = prefixSum[i];
    long long rightSum = prefixSum[length-1] - prefixSum[i];
    long long difference = abs(leftSum - rightSum);
    maxDifference = max(maxDifference, difference);
  }

  cout << maxDifference << endl;

  return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main() {
    // 输入数组长度
    int length;
    scanf("%d", &length);

    // 输入数字序列
    long long *numbers = (long long *)malloc(length * sizeof(long long));
    for (int i = 0; i < length; i++) {
        scanf("%lld", &numbers[i]);
    }

    // 计算前缀和数组
    long long *prefixSum = (long long *)malloc(length * sizeof(long long));
    prefixSum[0] = numbers[0];  // 第一个元素的前缀和即为其自身
    for (int i = 1; i < length; i++) {
        prefixSum[i] = prefixSum[i - 1] + numbers[i];  // 计算每个位置的前缀和
    }

    // 记录差值的最大取值
    long long maxDifference = 0;

    // 遍历所有的分割点，计算左右子数组和的差值
    for (int i = 0; i < length - 1; i++) {
        long long leftSum = prefixSum[i];  // 左子数组的和
        long long rightSum = prefixSum[length - 1] - prefixSum[i];  // 右子数组的和
        long long difference = llabs(leftSum - rightSum);  // 计算差值的绝对值
        if (difference > maxDifference) {
            maxDifference = difference;  // 更新最大差值
        }
    }

    // 输出差值的最大取值
    printf("%lld\\n", maxDifference);

    // 释放动态分配的内存
    free(numbers);
    free(prefixSum);

    return 0;
}`},s={id:"11",title:n,examType:"A",score:100,description:e,inputDesc:i,outputDesc:r,examples:t,solution:l,codes:f};export{f as codes,s as default,e as description,u as examType,t as examples,m as id,i as inputDesc,r as outputDesc,o as score,l as solution,n as title};
