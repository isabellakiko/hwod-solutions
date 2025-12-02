const l="28",n="数字涂色",e="A",c=100,o=`疫情过后，希望小学终于又重新开学了，三年二班开学第一天的任务是将后面的黑板报重新制作。
黑板上已经写上了N个正整数，同学们需要给这每个数分别上一种颜色。
为了让黑板报既美观又有学习意义，老师要求同种颜色的所有数都可以被这种颜色中最小的那个数整除。
现在请你帮帮小朋友们，算算最少需要多少种颜色才能给这N个数进行上色。`,t=`第一行有一个正整数N，表示数字个数（1≤N≤100）。
第二行有N个int型数(保证输入数据在[1,100]范围中)，表示黑板上各个正整数的值。`,i="输出只有一个整数，为最少需要的颜色种数。",r=[{input:`3
2 4 6`,output:"1",explanation:"3个数字：2、4、6，都能被2整除，所以只需要1种颜色。"},{input:`4
2 3 4 9`,output:"2",explanation:`4个数字排序后：2、3、4、9。
2单独一组；3不能被2整除，新开一组；4能被2整除，归入2的组；9能被3整除，归入3的组。
最终：{2,4}和{3,9}两组，需要2种颜色。`}],s=`**解题思路：**

本题是一道**贪心 + 整除分组**问题。

**核心思想：**
- 同种颜色的数都能被该颜色中最小的数整除
- 为使颜色数最少，应尽可能将数字归入已有的组

**算法步骤：**

1. **排序**：将数字从小到大排序，保证先处理小数
2. **贪心分组**：遍历每个数字
   - 检查能否被某个已有组的最小数整除
   - 如果能，归入该组
   - 如果不能，新建一个组（当前数字作为该组最小数）
3. **统计组数**：最终的组数即为答案

**示例演示（2,3,4,9）：**
- 2：新建组，colors=[2]
- 3：不能被2整除，新建组，colors=[2,3]
- 4：能被2整除，归入2的组
- 9：能被3整除，归入3的组
- 结果：2种颜色

**时间复杂度**：O(n²)`,u={java:`import java.util.*;

public class Main {
 
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);   
        int N = input.nextInt();  // 读取整数N，表示黑板上数字的数量
        int[] numList = new int[N];  // 创建一个数组存储N个数字
        for (int i = 0; i < N; i++) {
            numList[i] = input.nextInt();  // 读取N个数字并存储在numList数组中
        }
        Arrays.sort(numList);  // 对numList数组进行从小到大排序
        
        int[] colors = new int[N];  // 创建一个数组colors来存储颜色组的最小数
        int colorCount = 0;  // 记录使用的颜色种数
        for (int i = 0; i < N; i++) {
            boolean foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
            for (int j = 0; j < colorCount; j++) {
                if (numList[i] % colors[j] == 0) {  // 检查当前数字能否被已有颜色组的最小数整除
                    foundColor = true;  // 如果找到合适的颜色组，标志位置为true
                    break;  // 跳出循环
                }
            }
            if (!foundColor) {  // 如果没有找到合适的颜色组
                colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
                colorCount++;  // 增加颜色组数量
            }
        }
        
        System.out.println(colorCount);  // 输出最少需要的颜色种数
    }
}`,python:`import sys

N = int(input())  # 读取整数N，表示黑板上数字的数量
numList = list(map(int, input().split()))  # 读取N个数字并存储在列表numList中
numList.sort()  # 对numList进行从小到大排序

colors = []  # 创建一个列表colors来存储颜色组的最小数
colorCount = 0  # 记录使用的颜色种数
for i in range(N):
    foundColor = False  # 标志位，用于检查当前数字是否找到合适的颜色组
    for j in range(colorCount):
        if numList[i] % colors[j] == 0:  # 检查当前数字能否被已有颜色组的最小数整除
            foundColor = True  # 如果找到合适的颜色组，标志位置为True
            break  # 跳出循环
    if not foundColor:  # 如果没有找到合适的颜色组
        colors.append(numList[i])  # 将当前数字作为一个新的颜色组的最小数添加到colors列表中
        colorCount += 1  # 增加颜色组数量

print(colorCount)  # 输出最少需要的颜色种数`,javascript:`const readline = require('readline');  // 导入readline模块以读取标准输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (N) => {  // 读取第一行输入，表示数字数量N
  let numList = [];  // 用于存储输入的数字列表
  let colorCount = 0;  // 记录使用的颜色种数

  rl.on('line', (numbers) => {  // 读取第二行输入的N个数字
    numList = numbers.split(' ').map(Number);  // 将输入的字符串转化为数字数组
    numList.sort((a, b) => a - b);  // 对数字数组进行从小到大排序

    let colors = new Array(N).fill(0);  // 创建一个数组用于存储颜色组的最小数

    for (let i = 0; i < N; i++) {
      let foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
      for (let j = 0; j < colorCount; j++) {
        if (numList[i] % colors[j] === 0) {  // 检查当前数字能否被已有颜色组的最小数整除
          foundColor = true;  // 如果找到合适的颜色组，标志位置为true
          break;  // 跳出循环
        }
      }
      if (!foundColor) {  // 如果没有找到合适的颜色组
        colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
        colorCount++;  // 增加颜色组数量
      }
    }

    console.log(colorCount);  // 输出最少需要的颜色种数
    rl.close();  // 关闭输入接口
  });
});`,cpp:`#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;  // 读取整数N，表示黑板上数字的数量
    int* numList = new int[N];  // 动态分配一个数组用于存储N个数字
    for (int i = 0; i < N; i++) {
        cin >> numList[i];  // 读取N个数字并存储在numList数组中
    }
    sort(numList, numList + N);  // 对numList数组进行从小到大排序
    
    int* colors = new int[N];  // 动态分配一个数组用于存储颜色组的最小数
    int colorCount = 0;  // 记录使用的颜色种数
    for (int i = 0; i < N; i++) {
        bool foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
        for (int j = 0; j < colorCount; j++) {
            if (numList[i] % colors[j] == 0) {  // 检查当前数字能否被已有颜色组的最小数整除
                foundColor = true;  // 如果找到合适的颜色组，标志位置为true
                break;  // 跳出循环
            }
        }
        if (!foundColor) {  // 如果没有找到合适的颜色组
            colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
            colorCount++;  // 增加颜色组数量
        }
    }
    
    cout << colorCount << endl;  // 输出最少需要的颜色种数
    
    delete[] numList;  // 释放动态分配的numList数组
    delete[] colors;  // 释放动态分配的colors数组
    
    return 0;
}`,c:`#include <stdio.h>    
#include <stdlib.h>    
#include <stdbool.h>   
#include <string.h>    

// 定义比较函数，用于qsort的排序
int compare(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);  // 比较两个整数的大小
}

int main() {
    int N;
    scanf("%d", &N);  // 读取整数N，表示黑板上数字的数量

    // 动态分配一个数组用于存储N个数字
    int* numList = (int*)malloc(N * sizeof(int));
 

    // 读取N个数字并存储在numList数组中
    for (int i = 0; i < N; i++) {
        scanf("%d", &numList[i]);
    }

    // 使用qsort对numList数组进行从小到大排序
    qsort(numList, N, sizeof(int), compare);

    // 动态分配一个数组用于存储颜色组的最小数
    int* colors = (int*)malloc(N * sizeof(int));
 

    int colorCount = 0;  // 记录使用的颜色种数

    // 遍历numList中的每个数字，决定是否能归入已有颜色组
    for (int i = 0; i < N; i++) {
        bool foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组

        // 检查当前数字是否可以加入已有的颜色组
        for (int j = 0; j < colorCount; j++) {
            if (numList[i] % colors[j] == 0) {  // 如果能被已有颜色组的最小数整除
                foundColor = true;  // 找到合适的颜色组，标志位设为true
                break;  // 跳出循环，不再需要检查其他颜色组
            }
        }

        // 如果没有找到合适的颜色组，创建新的颜色组
        if (!foundColor) {
            colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
            colorCount++;  // 增加颜色组数量
        }
    }

    // 输出最少需要的颜色种数
    printf("%d\\n", colorCount);

 

    return 0;  // 程序正常结束
}`},a={id:"28",title:n,examType:"A",score:100,description:o,inputDesc:t,outputDesc:i,examples:r,solution:s,codes:u};export{u as codes,a as default,o as description,e as examType,r as examples,l as id,t as inputDesc,i as outputDesc,c as score,s as solution,n as title};
