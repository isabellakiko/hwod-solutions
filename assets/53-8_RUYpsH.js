const a="53",n="补种未成活胡杨",l="A",o=100,t=`近些年来，我国防沙治沙取得显著成果。某沙漠新种植N棵胡杨（编号1-N），排成一排。
一个月后，有M棵胡杨未能成活。
现可补种胡杨K棵，请问如何补种（只能补种，不能新种），可以得到最多的连续胡杨树？`,e=`N 总种植数量，1 <= N <= 100000
M 未成活胡杨数量，M 个空格分隔的数，按编号从小到大排列，1 <= M <= N
K 最多可以补种的数量，0 <= K <= M`,i="最多的连续胡杨棵树",u=[{input:`5
2
2 4
1`,output:"3",explanation:`5棵树，第2和第4棵未成活。
树的状态：1 _ 3 _ 5
补种1棵到位置2或4，最多连续3棵。`},{input:`10
2
4 7
1`,output:"6",explanation:`10棵树，第4和第7棵未成活。
树的状态：1 2 3 _ 5 6 _ 8 9 10
补种1棵到第7棵，得到连续6棵(5,6,7,8,9,10)。`},{input:`8
3
2 5 7
2`,output:"6",explanation:`8棵树，第2、5、7棵未成活。
树的状态：1 _ 3 4 _ 6 _ 8
补种2棵到位置2和5，得到连续6棵(1,2,3,4,5,6)。`}],s=`**解题思路：**

本题是一道**滑动窗口**问题，类似LeetCode 1004「最大连续1的个数 III」。

**算法步骤：**

1. 将胡杨树状态转为0/1数组，成活为0，未成活为1
2. 使用滑动窗口，维护窗口内未成活树的数量
3. 当窗口内未成活数量超过K时，左边界右移
4. 每次更新最大窗口长度

**核心思想：**
- 窗口内最多允许K棵未成活的树（可以补种）
- 滑动窗口找最长的满足条件的连续区间

**时间复杂度**：O(N)
**空间复杂度**：O(N)`,m={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 创建一个扫描器对象，用于读取输入
        Scanner scanner = new Scanner(System.in);
        
        // 读取总共的胡杨树数量
        int total = scanner.nextInt();
        
        // 读取未成活的胡杨树数量
        int deadCount = scanner.nextInt();
        
        // 创建一个数组来表示每棵树是否成活，0表示成活，1表示未成活
        int[] nums = new int[total];
        
        // 初始化数组，所有元素设为0，表示所有树最初都是成活的
        Arrays.fill(nums, 0);
 
        // 根据输入，将未成活的树的位置标记为1
        for (int i = 0; i < deadCount; i++) {
            int num = scanner.nextInt();
            nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
        }
        
        // 读取可以补种的树的数量
        int supplementCount = scanner.nextInt();
        
        // 初始化滑动窗口的左右边界
        int left = 0;
        int maxLen = 0; // 用于存储最大连续成活区域的长度
        int sumLeft = 0; // 滑动窗口左边界的未成活树数量
        int sumRight = 0; // 滑动窗口右边界的未成活树数量
        
        // 遍历所有的树，right代表滑动窗口的右边界
        for (int right = 0; right < total; right++) {
            sumRight += nums[right]; // 更新右边界的未成活树数量
            
            // 如果窗口内的未成活树数量大于可以补种的数量
            while (sumRight - sumLeft > supplementCount) {
                sumLeft += nums[left]; // 缩小窗口，左边界右移
                left++;
            }
            
            // 更新最大成活区域的长度
            maxLen = Math.max(maxLen, right - left + 1);
        }
        
        // 输出最大连续成活区域的长度
        System.out.println(maxLen);
    }
}`,python:`# 读取胡杨树的总数N
total = int(input())

# 读取未成活胡杨树的数量M
dead_count = int(input())

# 读取未成活胡杨树的编号列表
dead_list = list(map(int, input().split()))

# 读取可以补种的胡杨树数量K
supplement_count = int(input())

# 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
nums = [0] * total

# 根据输入，将未成活的树的位置标记为1
for num in dead_list:
    nums[num - 1] = 1  # 树的编号从1开始，因此需要减1

# 初始化滑动窗口的左右边界
left = 0
max_len = 0  # 用于存储最大连续成活区域的长度
sum_left = 0  # 滑动窗口左边界的未成活树数量
sum_right = 0  # 滑动窗口右边界的未成活树数量

# 遍历所有的树，right代表滑动窗口的右边界
for right in range(total):
    sum_right += nums[right]  # 更新右边界的未成活树数量
    
    # 如果窗口内的未成活树数量大于可以补种的数量
    while sum_right - sum_left > supplement_count:
        sum_left += nums[left]  # 缩小窗口，左边界右移
        left += 1
    
    # 更新最大成活区域的长度
    max_len = max(max_len, right - left + 1)

# 输出最大连续成活区域的长度
print(max_len)`,javascript:`const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputLines = [];
rl.on('line', (input) => {
    inputLines.push(input);
});

rl.on('close', () => {
    // 读取胡杨树的总数N
    const total = parseInt(inputLines[0]);

    // 读取未成活胡杨树的数量M
    const deadCount = parseInt(inputLines[1]);

    // 读取未成活胡杨树的编号列表
    const deadList = inputLines[2].split(' ').map(Number);

    // 读取可以补种的胡杨树数量K
    const supplementCount = parseInt(inputLines[3]);

    // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
    const nums = new Array(total).fill(0);

    // 根据输入，将未成活的树的位置标记为1
    deadList.forEach(num => {
        nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
    });

    // 初始化滑动窗口的左右边界
    let left = 0;
    let maxLen = 0; // 用于存储最大连续成活区域的长度
    let sumLeft = 0; // 滑动窗口左边界的未成活树数量
    let sumRight = 0; // 滑动窗口右边界的未成活树数量

    // 遍历所有的树，right代表滑动窗口的右边界
    for (let right = 0; right < total; right++) {
        sumRight += nums[right]; // 更新右边界的未成活树数量
        
        // 如果窗口内的未成活树数量大于可以补种的数量
        while (sumRight - sumLeft > supplementCount) {
            sumLeft += nums[left]; // 缩小窗口，左边界右移
            left++;
        }
        
        // 更新最大成活区域的长度
        maxLen = Math.max(maxLen, right - left + 1);
    }

    // 输出最大连续成活区域的长度
    console.log(maxLen);
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm> 

using namespace std;

int main() {
    int total, deadCount;
    cin >> total >> deadCount;

    // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
    vector<int> nums(total, 0);

    // 根据输入，将未成活的树的位置标记为1
    for (int i = 0; i < deadCount; i++) {
        int num;
        cin >> num;
        nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
    }

    // 读取可以补种的树的数量
    int supplementCount;
    cin >> supplementCount;

    // 初始化滑动窗口的左右边界
    int left = 0, maxLen = 0, sumLeft = 0, sumRight = 0;

    // 遍历所有的树，right代表滑动窗口的右边界
    for (int right = 0; right < total; right++) {
        sumRight += nums[right]; // 更新右边界的未成活树数量

        // 如果窗口内的未成活树数量大于可以补种的数量
        while (sumRight - sumLeft > supplementCount) {
            sumLeft += nums[left]; // 缩小窗口，左边界右移
            left++;
        }

        // 更新最大成活区域的长度
        maxLen = max(maxLen, right - left + 1);
    }

    // 输出最大连续成活区域的长度
    cout << maxLen << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

// 定义一个max函数，用于求两个数中的最大值
int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int total, deadCount;

    scanf("%d %d", &total, &deadCount);

    // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
    int *nums = (int *)calloc(total, sizeof(int));

    // 根据输入，将未成活的树的位置标记为1
    for (int i = 0; i < deadCount; i++) {
        int num;
        scanf("%d", &num);
        nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
    }

    // 读取可以补种的树的数量
    int supplementCount;
    scanf("%d", &supplementCount);

    // 初始化滑动窗口的左右边界
    int left = 0, maxLen = 0, sumLeft = 0, sumRight = 0;

    // 遍历所有的树，right代表滑动窗口的右边界
    for (int right = 0; right < total; right++) {
        sumRight += nums[right]; // 更新右边界的未成活树数量

        // 如果窗口内的未成活树数量大于可以补种的数量
        while (sumRight - sumLeft > supplementCount) {
            sumLeft += nums[left]; // 缩小窗口，左边界右移
            left++;
        }

        // 更新最大成活区域的长度
        maxLen = max(maxLen, right - left + 1);
    }

    // 输出最大连续成活区域的长度
    printf("%d\\n", maxLen);

    // 释放动态分配的内存
    free(nums);

    return 0;
}`},r={id:"53",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:i,examples:u,solution:s,codes:m};export{m as codes,r as default,t as description,l as examType,u as examples,a as id,e as inputDesc,i as outputDesc,o as score,s as solution,n as title};
