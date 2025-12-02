const a="104",n="最长连续子序列",m="A",u=100,t=`有N个正整数组成的一个序列。给定整数sum，求长度最长的连续子序列，使他们的和等于sum，返回此子序列的长度，
如果没有满足要求的序列，返回-1。`,e=`第一行输入是：N个正整数组成的一个序列
第二行输入是：给定整数sum`,i="最长的连续子序列的长度",s=[{input:`1,2,3,4,2
6`,output:"3",explanation:"1+2+3=6和4+2=6均满足，最长序列为1,2,3，长度为3"},{input:`1,2,3,4,2
100`,output:"-1",explanation:"没有和为100的连续子序列，返回-1"}],r=`**解题思路：**

本题是一道**滑动窗口**问题。

**核心思路：**
- 双指针维护窗口，记录窗口内元素和
- 和大于target时收缩左边界
- 和等于target时更新最大长度

**算法步骤：**
1. 初始化左右指针和窗口和
2. 右指针扩展，累加元素
3. 窗口和>target时，左指针收缩
4. 窗口和=target时，更新最大长度

**时间复杂度**：O(N)`,l={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] nums = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
        int target = Integer.parseInt(sc.nextLine());

        int n = nums.length;
        int left = 0, right = 0, sum = 0, maxLen = -1;

        while (right < n) {
            // 不断扩大窗口，增加右边界
            sum += nums[right];
            right++;

            // 如果当前窗口内的和大于目标值，收缩左边界
            while (sum > target && left < right) {
                sum -= nums[left];
                left++;
            }

            // 检查是否等于目标值，并更新最大长度
            if (sum == target) {
                maxLen = Math.max(maxLen, right - left);
            }
        }

        System.out.println(maxLen);
    }
}`,python:`nums = list(map(int, input().split(',')))
target = int(input())

n = len(nums)
left, right, sum_, max_len = 0, 0, 0, -1

while right < n:
    # 不断扩大窗口，增加右边界
    sum_ += nums[right]
    right += 1

    # 如果当前窗口内的和大于目标值，收缩左边界
    while sum_ > target and left < right:
        sum_ -= nums[left]
        left += 1

    # 检查是否等于目标值，并更新最大长度
    if sum_ == target:
        max_len = max(max_len, right - left)

# 输出结果
print(max_len)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 读取用户输入的序列和目标值
rl.on('line', (line1) => {
    rl.on('line', (line2) => {
        
        const nums = line1.split(',').map(Number);
        const target = parseInt(line2);
        rl.close();

        let n = nums.length;
        let left = 0, right = 0, sum = 0, maxLen = -1;

        while (right < n) {
            // 不断扩大窗口，增加右边界
            sum += nums[right];
            right++;

            // 如果当前窗口内的和大于目标值，收缩左边界
            while (sum > target && left < right) {
                sum -= nums[left];
                left++;
            }

            // 检查是否等于目标值，并更新最大长度
            if (sum === target) {
                maxLen = Math.max(maxLen, right - left);
            }
        }

        // 输出结果
        console.log(maxLen);
    });
});`,cpp:`#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string line1, line2;
    getline(cin, line1);  // 读取序列输入
    getline(cin, line2);  // 读取目标值输入

    // 解析输入的序列
    vector<int> nums;
    stringstream ss(line1);
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }

    int target = stoi(line2);
    int n = nums.size();
    int left = 0, right = 0, sum = 0, maxLen = -1;

    while (right < n) {
        // 不断扩大窗口，增加右边界
        sum += nums[right];
        right++;

        // 如果当前窗口内的和大于目标值，收缩左边界
        while (sum > target && left < right) {
            sum -= nums[left];
            left++;
        }

        // 检查是否等于目标值，并更新最大长度
        if (sum == target) {
            maxLen = max(maxLen, right - left);
        }
    }

    // 输出结果
    cout << maxLen << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char line1[1000], line2[10];
    fgets(line1, 1000, stdin);  // 读取序列输入
    fgets(line2, 10, stdin);    // 读取目标值输入

    // 解析输入的序列
    int nums[200], n = 0;
    char *token = strtok(line1, ",");
    while (token != NULL) {
        nums[n++] = atoi(token);
        token = strtok(NULL, ",");
    }

    int target = atoi(line2);
    int left = 0, right = 0, sum = 0, maxLen = -1;

    while (right < n) {
        // 不断扩大窗口，增加右边界
        sum += nums[right++];
        
        // 如果当前窗口内的和大于目标值，收缩左边界
        while (sum > target && left < right) {
            sum -= nums[left++];
        }

        // 检查是否等于目标值，并更新最大长度
        if (sum == target) {
            int len = right - left;
            if (len > maxLen) {
                maxLen = len;
            }
        }
    }

    // 输出结果
    printf("%d\\n", maxLen);
    return 0;
}`},g={id:"104",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:i,examples:s,solution:r,codes:l};export{l as codes,g as default,t as description,m as examType,s as examples,a as id,e as inputDesc,i as outputDesc,u as score,r as solution,n as title};
