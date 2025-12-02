const l="108",n="爱吃蟠桃的孙悟空",o="A",c=100,t=`孙悟空爱吃蟠桃，有一天趁着蟠桃园守卫不在来偷吃。已知蟠桃园有 N 棵桃树，每颗树上都有桃子，守卫将在 H 小时后回来。
孙悟空可以决定他吃蟠桃的速度K（个/小时），每个小时选一颗桃树，并从树上吃掉 K 个，如果树上的桃子少于 K 个，则全部吃掉，并且这一小时剩余的时间里不再吃桃。
孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。
请返回孙悟空可以在 H 小时内吃掉所有桃子的最小速度 K（K为整数）。如果以任何速度都吃不完所有桃子，则返回0。`,i=`一行输入为 N 个数字，N 表示桃树的数量，这 N 个数字表示每颗桃树上蟠桃的数量。
第二行输入为一个数字，表示守卫离开的时间 H。
其中数字通过空格分割，N、H为正整数，每颗树上都有蟠桃，且 0 < N < 10000，0 < H < 10000。`,e="吃掉所有蟠桃的最小速度 K，无解或输入异常时输出 0。",s=[{input:`2 3 4 5
4`,output:"5",explanation:"4棵桃树有2,3,4,5个桃子，4小时内吃完。速度5时：1+1+1+1=4小时刚好吃完"},{input:`2 3 4 5
3`,output:"0",explanation:"4棵树只有3小时，每小时只能吃一棵树，无法吃完，返回0"}],h=`**解题思路：**

本题是一道**二分查找**问题（LeetCode 875）。

**核心思路：**
- 二分查找最小吃桃速度K
- 对于速度K，计算吃完所有桃子需要的时间
- 时间<=H则速度可行，尝试更小速度

**算法步骤：**
1. 二分范围：[1, max(桃子数)]
2. 计算当前速度吃完所有树需要的时间
3. 时间<=H：right=mid，否则left=mid+1
4. 特判：树的数量>H时无解返回0

**时间复杂度**：O(N×log(max))`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 创建一个Scanner对象用于读取输入
        Scanner cin = new Scanner(System.in);
        // 读取一行输入并转换为整数数组，代表每棵桃树上的桃子数量
        int[] peachCounts = Arrays.stream(cin.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        // 读取下一行输入，转换为整数，代表可用的小时数
        int h = Integer.parseInt(cin.nextLine());
        // 获取桃树的数量
        int n = peachCounts.length;
 
        // 输入验证：如果桃树数量为0，或小时数不合法，或桃树数量大于小时数，则输出0并返回
        if (n == 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
            System.out.println(0);
            return;
        }

        // 初始化二分查找的左右边界
        int left = 1, right = (int)1e9; // 假设最大的吃桃速度不会超过1e9
        // 当左边界小于右边界时，执行二分查找
        while (left < right) {
            // 计算中间值
            int mid = left + (right - left) / 2;
            // 如果以mid的速度可以在h小时内吃完桃子，则尝试更小的速度
            if (canFinish(peachCounts, h, mid)) {
                right = mid;
            } else {
                // 否则尝试更大的速度
                left = mid + 1;
            }
        }

        // 输出最小吃桃速度，此时left是满足条件的最小速度
        System.out.println(left);
    }

    // 定义一个方法，判断以速度k是否能在h小时内吃完所有桃子
    static boolean canFinish(int[] p, int h, int k) {
        // 初始化所需的总小时数
        int ans = 0;
        // 遍历每棵桃树
        for (int x : p) {
            // 计算吃完这棵桃树上桃子所需的小时数，向上取整
            ans += Math.ceil(x * 1.0 / k);
        }
        // 如果所需总小时数小于等于h，则返回true，表示可以完成
        return ans <= h;
    }
}`,python:`import math

# 判断以速度k是否能在h小时内吃完所有桃子
def can_finish(p, h, k):
    ans = 0
    for x in p:
        ans += math.ceil(x / k)
    return ans <= h

# 读取输入
peach_counts = list(map(int, input().split()))
h = int(input())

# 输入验证
n = len(peach_counts)
if n == 0 or h <= 0 or n >= 10000 or h >= 10000 or n > h:
    print(0)
    exit(0)

# 二分查找最小吃桃速度
left, right = 1, int(1e9)
while left < right:
    mid = (left + right) // 2
    if can_finish(peach_counts, h, mid):
        right = mid
    else:
        left = mid + 1

# 输出最小吃桃速度
print(left)`,javascript:`// 读取标准输入
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 判断以速度k是否能在h小时内吃完所有桃子
function canFinish(p, h, k) {
    let ans = 0;
    for (let x of p) {
        ans += Math.ceil(x / k);
    }
    return ans <= h;
}

// 处理输入
rl.on('line', (input) => {
    if (!this.peachCounts) {
        // 第一行输入，转换为桃子数量数组
        this.peachCounts = input.split(' ').map(Number);
        return;
    }
    // 第二行输入，转换为小时数
    const h = Number(input);
    rl.close(); // 不再读取输入

    // 输入验证
    const n = this.peachCounts.length;
    if (n === 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
        console.log(0);
        return;
    }

    // 二分查找最小吃桃速度
    let left = 1, right = 1e9;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canFinish(this.peachCounts, h, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    // 输出最小吃桃速度
    console.log(left);
});`,cpp:`#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <sstream>
using namespace std;

// 判断以速度k是否能在h小时内吃完所有桃子
bool canFinish(vector<int>& p, int h, int k) {
    long long ans = 0; // 使用 long long 防止溢出
    for (int x : p) {
        ans += ceil(x * 1.0 / k); // 向上取整
    }
    return ans <= h;
}

int main() {
    // 读取输入
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> peachCounts;
    int x;
    while (iss >> x) {
        peachCounts.push_back(x);
    }
    int h;
    cin >> h;

    // 输入验证
    int n = peachCounts.size();
    if (n == 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
        cout << 0 << endl;
        return 0;
    }

    // 二分查找最小吃桃速度
    int left = 1, right = 1e9; // 假设最大的吃桃速度不会超过1e9
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(peachCounts, h, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    // 输出最小吃桃速度
    cout << left << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

// 判断以速度k是否能在h小时内吃完所有桃子
int can_finish(int* p, int n, int h, int k) {
    int ans = 0;
    for (int i = 0; i < n; i++) {
        ans += (int)ceil((double)p[i] / k);
    }
    return ans <= h;
}

int main() {
 
    char input[10000];
    fgets(input, sizeof(input), stdin);

    // 将输入分割并存入数组
    int peach_counts[10000];  
    int n = 0;

    char *token = strtok(input, " ");
    while (token != NULL) {
        peach_counts[n++] = atoi(token);
        token = strtok(NULL, " ");
    }


    int h;
    scanf("%d", &h);

    // 输入验证
    if (n == 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
        printf("0\\n");
        return 0;
    }

    // 二分查找最小吃桃速度
    int left = 1, right = (int)1e9;
    while (left < right) {
        int mid = (left + right) / 2;
        if (can_finish(peach_counts, n, h, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    // 输出最小吃桃速度
    printf("%d\\n", left);

    return 0;
}`},a={id:"108",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:e,examples:s,solution:h,codes:r};export{r as codes,a as default,t as description,o as examType,s as examples,l as id,i as inputDesc,e as outputDesc,c as score,h as solution,n as title};
