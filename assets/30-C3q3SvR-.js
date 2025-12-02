const u="30",n="整数对最小和",o="A",c=100,r=`给定两个整数数组array1、array2，数组元素按升序排列。
假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，
并对取出的所有元素求和，计算和的最小值。
注意：
两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。`,a=`输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);
0 < array1[i] <= 1000
0 < array2[i] <= 1000
接下来一行为正整数k
0 < k <= array1.size() * array2.size()`,i="满足要求的最小和",t=[{input:`2 1 1
3 1 2 3
2`,output:"4",explanation:`array1=[1,1]，array2=[1,2,3]，需要取k=2对元素。
所有可能的和：1+1=2, 1+2=3, 1+3=4, 1+1=2, 1+2=3, 1+3=4
排序后取前2个最小的：2+2=4`},{input:`3 1 2 3
3 1 2 3
3`,output:"8",explanation:`array1=[1,2,3]，array2=[1,2,3]，需要取k=3对元素。
最小的3对：(1,1)=2, (1,2)=3, (2,1)=3
最小和：2+3+3=8`}],s=`**解题思路：**

本题是一道**暴力枚举 + 排序**问题。

**算法步骤：**

1. 读取两个升序数组array1和array2
2. 枚举所有可能的元素对，计算每对的和
3. 将所有和排序
4. 取前k个最小的和相加

**优化思路：**
可以使用最小堆优化，但由于数组较小(size≤100)，暴力也能通过。

**时间复杂度**：O(n*m*log(n*m))，其中n、m为数组大小`,e={java:`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 输入第一个数组
        int size1 = scanner.nextInt();
        List<Integer> array1 = new ArrayList<>();
        for (int i = 0; i < size1; i++) {
            array1.add(scanner.nextInt());
        }

        // 输入第二个数组
        int size2 = scanner.nextInt();
        List<Integer> array2 = new ArrayList<>();
        for (int i = 0; i < size2; i++) {
            array2.add(scanner.nextInt());
        }

        // 输入需要取出的元素对数
        int k = scanner.nextInt();

        // 存储所有可能的元素对的和
        List<Integer> pairsSum = new ArrayList<>();
        for (int value1 : array1) {
            for (int value2 : array2) {
                pairsSum.add(value1 + value2);
            }
        }

        // 对和进行排序
        Collections.sort(pairsSum);

        // 取前k个元素进行求和
        int minSum = 0;
        for (int i = 0; i < k; i++) {
            minSum += pairsSum.get(i);
        }

        System.out.println(minSum);
    }
}`,python:`# 从输入中获取数组array1，使用map函数将输入的字符串转换为整数，并使用列表切片[1:]去除第一个元素
array1 = list(map(int, input().split()))[1:]

# 从输入中获取数组array2，使用map函数将输入的字符串转换为整数，并使用列表切片[1:]去除第一个元素
array2 = list(map(int, input().split()))[1:]

# 从输入中获取k的值，将其转换为整数
k = int(input())

# 存储所有可能的元素对的和
pairsSum = []
for value1 in array1:
    for value2 in array2:
        pairsSum.append(value1 + value2)

# 对和进行排序
pairsSum.sort()

# 取前k个元素进行求和
minSum = sum(pairsSum[:k])

# 输出最小和
print(minSum)`,javascript:`const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 rl.on('line', (array1Input) => {
  // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
  const array1 = array1Input.split(' ').map(Number).slice(1);

   rl.on('line', (array2Input) => {
    // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
    const array2 = array2Input.split(' ').map(Number).slice(1);

     rl.on('line', (kInput) => {
      // 将输入的字符串转换为整数
      const k = parseInt(kInput);

      // 创建一个空数组pairsSum
      const pairsSum = [];

      // 嵌套循环，将array1和array2中的元素两两相加，并将结果存储到pairsSum中
      for (const value1 of array1) {
        for (const value2 of array2) {
          pairsSum.push(value1 + value2);
        }
      }

      // 对pairsSum中的元素进行排序
      pairsSum.sort();

      // 取出pairsSum中前k个元素，并使用reduce方法计算它们的和
      const minSum = pairsSum.slice(0, k).reduce((sum, value) => sum + value, 0);

      // 输出最小和
      console.log(minSum);

      // 关闭readline接口，结束程序的执行
      rl.close();
    });
  });
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // 输入数组array1的大小
    int size1;
    std::cin >> size1;

    // 创建大小为size1的vector来存储array1的元素
    std::vector<int> array1(size1);
    for (int i = 0; i < size1; i++) {
        // 逐个读取array1的元素并存储到vector中
        std::cin >> array1[i];
    }

    // 输入数组array2的大小
    int size2;
    std::cin >> size2;

    // 创建大小为size2的vector来存储array2的元素
    std::vector<int> array2(size2);
    for (int i = 0; i < size2; i++) {
        // 逐个读取array2的元素并存储到vector中
        std::cin >> array2[i];
    }

    // 输入k的值
    int k;
    std::cin >> k;

    // 创建一个vector来存储所有可能的元素对的和
    std::vector<int> pairsSum;
    for (int value1 : array1) {
        for (int value2 : array2) {
            // 将array1和array2中的元素两两相加，并将结果存储到pairsSum中
            pairsSum.push_back(value1 + value2);
        }
    }

    // 对pairsSum中的元素进行排序
    std::sort(pairsSum.begin(), pairsSum.end());

    // 计算前k个元素的和
    int minSum = 0;
    for (int i = 0; i < k; i++) {
        minSum += pairsSum[i];
    }

    // 输出最小和
    std::cout << minSum << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

// 比较函数，用于qsort
int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int size1, size2, k;
    // 输入数组array1和array2的大小
    scanf("%d", &size1);
    int array1[size1];
    for (int i = 0; i < size1; i++) {
        scanf("%d", &array1[i]);
    }

    scanf("%d", &size2);
    int array2[size2];
    for (int i = 0; i < size2; i++) {
        scanf("%d", &array2[i]);
    }

    // 输入k的值
    scanf("%d", &k);

    // 创建数组来存储所有可能的元素对的和
    int pairsSum[size1 * size2];
    int count = 0;
    for (int i = 0; i < size1; i++) {
        for (int j = 0; j < size2; j++) {
            // 将array1和array2中的元素两两相加，并将结果存储到pairsSum中
            pairsSum[count++] = array1[i] + array2[j];
        }
    }

    // 对pairsSum中的元素进行排序
    qsort(pairsSum, count, sizeof(int), compare);

    // 计算前k个元素的和
    int minSum = 0;
    for (int i = 0; i < k; i++) {
        minSum += pairsSum[i];
    }

    // 输出最小和
    printf("%d\\n", minSum);

    return 0;
}`},m={id:"30",title:n,examType:"A",score:100,description:r,inputDesc:a,outputDesc:i,examples:t,solution:s,codes:e};export{e as codes,m as default,r as description,o as examType,t as examples,u as id,a as inputDesc,i as outputDesc,c as score,s as solution,n as title};
