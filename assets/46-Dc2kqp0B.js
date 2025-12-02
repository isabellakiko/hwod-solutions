const l="46",n="第k个排列",o="A",m=100,e=`给定参数n，从1到n会有n个整数：1,2,3,…,n,这n个数字共有n!种排列。
按大小顺序升序列出所有排列的情况，并一一标记，
当n=3时,所有排列如下:
“123” “132” “213” “231” “312” “321”
给定n和k，返回第k个排列。`,t="输入两行，第一行为n，第二行为k，给定n的范围是[1,9],给定k的范围是[1,n!]。",r="输出排在第k位置的数字。",i=[{input:`3
3`,output:"213",explanation:`n=3时所有排列按字典序：
1."123" 2."132" 3."213" 4."231" 5."312" 6."321"
第3个是"213"。`},{input:`3
5`,output:"312",explanation:'n=3的第5个排列是"312"。'},{input:`4
9`,output:"2314",explanation:`n=4共有24种排列。
第9个排列是"2314"。`}],s=`**解题思路：**

本题是一道**康托展开逆运算**问题。

**核心思想：**
- n个数的全排列共有n!种
- 确定第一位后，剩余(n-1)!种排列
- 利用除法和取模逐位确定

**算法步骤（康托逆展开）：**

1. k = k - 1（转为0索引）
2. 对于第i位（从左到右）：
   - index = k / (n-i)!
   - 从剩余数字中取第index个
   - k = k % (n-i)!
3. 重复直到所有位确定

**示例：n=3, k=3**
- k=2, 剩余[1,2,3]
- 第1位：2/2!=1 → 取数字2，k=0
- 第2位：0/1!=0 → 取数字1
- 第3位：取剩余3
- 结果：213

**时间复杂度**：O(n²)`,u={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        int n, k;
        Vector<String> lines = new Vector<String>();
        Scanner scanner = new Scanner(System.in);

        // 读取 n 和 k
        n = scanner.nextInt();
        k = scanner.nextInt();

        // 如果 n 等于 1，则直接输出 1 并结束程序
        if (n == 1) {
            System.out.println("1");
            return;
        }

        // 初始化 nums 数组，存储 1 到 n 的整数
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = i + 1;
        }

        // 初始化结果列表
        List<String> result = new ArrayList<>();

        // 递归函数，用于生成所有排列
        generatePermutations(nums, "", result, k);

        // 对结果列表进行排序
        Collections.sort(result);

        // 输出第k个排列
        System.out.println(result.get(k - 1));
    }

    public static void generatePermutations(int[] nums, String current, List<String> result, int k) {
        // 如果数字数组为空，将当前结果添加到结果列表中
        if (nums.length == 0) {
            result.add(current);
            return;
        }

        // 遍历当前数字数组
        for (int i = 0; i < nums.length; i++) {
            // 取出一个数字
            int num = nums[i];

            // 创建新的数字数组，删除当前数字
            int[] newNums = new int[nums.length - 1];
            for (int j = 0; j < i; j++) {
                newNums[j] = nums[j];
            }
            for (int j = i + 1; j < nums.length; j++) {
                newNums[j - 1] = nums[j];
            }

            // 递归调用函数，传递更新后的数字数组和结果字符串
            generatePermutations(newNums, current + num, result, k);

            // 如果结果列表长度等于k，直接返回
            if (result.size() == k) {
                return;
            }
        }
    }
}`,python:`n = int(input())
k = int(input())


if n == 1:
    print("1")
    exit()

nums = [i+1 for i in range(n)]
result = []

def generatePermutations(nums, current, result, k):
    if len(nums) == 0:
        result.append(current)
        return

    for i in range(len(nums)):
        num = nums[i]
        newNums = nums[:i] + nums[i+1:]
        generatePermutations(newNums, current + str(num), result, k)

        if len(result) == k:
            return

generatePermutations(nums, "", result, k)

result.sort()
print(result[k-1])`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (n) => {
  rl.on('line', (k) => {
    // 如果 n 等于 1，则直接输出 1 并结束程序
    if (n == 1) {
      console.log("1");
      rl.close();
      return;
    }

    // 初始化 nums 数组，存储 1 到 n 的整数
    let nums = [];
    for (let i = 0; i < n; i++) {
      nums.push(i + 1);
    }

    // 初始化结果列表
    let result = [];

    // 递归函数，用于生成所有排列
    generatePermutations(nums, "", result, k);

    // 对结果列表进行排序
    result.sort();

    // 输出第k个排列
    console.log(result[k - 1]);

    rl.close();
  });
});

function generatePermutations(nums, current, result, k) {
  // 如果数字数组为空，将当前结果添加到结果列表中
  if (nums.length === 0) {
    result.push(current);
    return;
  }

  // 遍历当前数字数组
  for (let i = 0; i < nums.length; i++) {
    // 取出一个数字
    let num = nums[i];

    // 创建新的数字数组，删除当前数字
    let newNums = nums.slice(0, i).concat(nums.slice(i + 1));

    // 递归调用函数，传递更新后的数字数组和结果字符串
    generatePermutations(newNums, current + num, result, k);

    // 如果结果列表长度等于k，直接返回
    if (result.length === k) {
      return;
    }
  }
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void generatePermutations(vector<int>& nums, string current, vector<string>& result, int k);

int main() {
    int n, k;
    vector<string> lines;
    cin >> n >> k;

    if (n == 1) {
        cout << "1" << endl;
        return 0;
    }

    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        nums[i] = i + 1;
    }

    vector<string> result;
    generatePermutations(nums, "", result, k);

    sort(result.begin(), result.end());

    cout << result[k - 1] << endl;

    return 0;
}

void generatePermutations(vector<int>& nums, string current, vector<string>& result, int k) {
    if (nums.empty()) {
        result.push_back(current);
        return;
    }

    for (int i = 0; i < nums.size(); i++) {
        int num = nums[i];
        vector<int> newNums(nums.size() - 1);
        copy(nums.begin(), nums.begin() + i, newNums.begin());
        copy(nums.begin() + i + 1, nums.end(), newNums.begin() + i);

        generatePermutations(newNums, current + to_string(num), result, k);

        if (result.size() == k) {
            return;
        }
    }
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 生成排列的递归函数
void generatePermutations(int* nums, int numsSize, char* current, char** result, int* resultSize, int k) {
    // 如果数字数组为空，将当前结果添加到结果列表中
    if (numsSize == 0) {
        result[*resultSize] = (char*)malloc(strlen(current) + 1);
        strcpy(result[*resultSize], current);
        (*resultSize)++;
        return;
    }

    // 遍历当前数字数组
    for (int i = 0; i < numsSize; i++) {
        // 取出一个数字
        int num = nums[i];

        // 创建新的数字数组，删除当前数字
        int* newNums = (int*)malloc((numsSize - 1) * sizeof(int));
        for (int j = 0; j < i; j++) {
            newNums[j] = nums[j];
        }
        for (int j = i + 1; j < numsSize; j++) {
            newNums[j - 1] = nums[j];
        }

        // 更新结果字符串
        int newCurrentLen = strlen(current) + 10; // 分配足够大的空间
        char *newCurrent = (char*)malloc(newCurrentLen * sizeof(char));
        snprintf(newCurrent, newCurrentLen, "%s%d", current, num);

        // 递归调用函数，传递更新后的数字数组和结果字符串
        generatePermutations(newNums, numsSize - 1, newCurrent, result, resultSize, k);

        // 如果结果列表长度等于k，直接返回
        if (*resultSize == k) {
            free(newNums);
            free(newCurrent); // 避免内存泄漏
            return;
        }

        // 释放内存
        free(newNums);
        free(newCurrent); // 每次循环后释放newCurrent
    }
}

int compareStrings(const void* a, const void* b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

int main() {
    int n, k;

    // 读取 n 和 k
    scanf("%d %d", &n, &k);

    // 如果 n 等于 1，则直接输出 1 并结束程序
    if (n == 1) {
        printf("1\\n");
        return 0;
    }

    // 初始化 nums 数组，存储 1 到 n 的整数
    int* nums = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        nums[i] = i + 1;
    }

    // 初始化结果列表
    char** result = (char**)malloc(100000000 * sizeof(char*));   
    int resultSize = 0;

    // 调用递归函数生成所有排列
    char current[100] = "";  // 初始的结果字符串为空
    generatePermutations(nums, n, current, result, &resultSize, k);

    // 对结果列表进行排序
    qsort(result, resultSize, sizeof(char*), compareStrings);

    // 输出第 k 个排列
    printf("%s\\n", result[k - 1]);

    // 释放内存
    for (int i = 0; i < resultSize; i++) {
        free(result[i]);
    }
    free(result);
    free(nums);

    return 0;
}`},c={id:"46",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:r,examples:i,solution:s,codes:u};export{u as codes,c as default,e as description,o as examType,i as examples,l as id,t as inputDesc,r as outputDesc,m as score,s as solution,n as title};
