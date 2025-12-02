const s="40",n="游戏分组王者荣耀",c="A",o=100,t=`2020年题：
英雄联盟是一款十分火热的对战类游戏。每一场对战有10位玩家参与，分为两组，每组5人。每位玩家都有一个战斗力，代表着这位玩家的厉害程度。为了对战尽可能精彩，我们需要把玩家们分为实力尽量相等的两组。一组的实力可以表示为这一组5位玩家的战斗力和。现在，给你10位玩家的战斗力，请你把他们分为实力尽量相等的两组。请你输出这两组的实力差。
2023年题：
部门准备举办一场王者荣耀表演赛，有10名游戏爱好者参与，分5为两队，每队5人。每位参与者都有一个评分，代表着他的游戏水平。为了表演赛尽可能精彩，我们需要把10名参赛者分为实力尽量相近的两队。一队的实力可以表示为这一队5名队员的评分总和。 现在给你10名参与者的游戏水平评分，请你根据上述要求分队最后输出这两组的实力差绝对值。 例: 10名参赛者的评分分别为5 1 8 3 4 6 710 9 2，分组为 (135 8 10) (24 679)，两组实力差最小，差值为1。有多种分法，但实力差的绝对值最小为1。`,u="10个整数，表示10名参与者的游戏水平评分。范围在[1,10000]之间",r=`1个整数，表示分组后两组实力差绝对值的最小值.
输入：
输出：
说明：
10名队员分成两组，两组实力差绝对值最小为1.`,e=[{input:"5 1 8 3 4 6 7 10 9 2",output:"1",explanation:`10名参赛者评分：5 1 8 3 4 6 7 10 9 2，总和55。
最优分组：(1,3,5,8,10)=27 和 (2,4,6,7,9)=28。
实力差：|27-28| = 1。`},{input:"1 2 3 4 5 6 7 8 9 10",output:"1",explanation:`评分1-10，总和55。
最优分组：(1,4,5,8,10)=28 和 (2,3,6,7,9)=27。
实力差：|28-27| = 1。`}],i=`**解题思路：**

本题是一道**DFS+组合枚举**问题。

**问题分析：**
- 从10人中选5人组成一队，另外5人自动成为另一队
- 组合数C(10,5) = 252，暴力枚举可行

**算法步骤：**

1. 计算所有玩家评分总和totalSum
2. DFS枚举所有选5人的组合
3. 每次递归有两种选择：选当前玩家入队1，或不选
4. 当队1满5人时，计算两队差值并更新最小值
5. 剪枝：idx到10时停止

**时间复杂度**：O(C(10,5)) = O(252)`,m={java:`import java.util.*;

public class Main {
    static int res = Integer.MAX_VALUE;
    static int totalSum = 0;
    static int targetSum = 0;

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int[] nums = Arrays.stream(cin.nextLine().split(" "))
                .mapToInt(Integer::parseInt).toArray();
        for (int num : nums) {
            totalSum += num;
        }
        targetSum = totalSum / 2;
        dfs(nums, 0, 0, 0);
        System.out.println(res);
        cin.close();
    }

    static void dfs(int[] nums, int idx, int count, int currentSum) {
        // 剪枝条件：如果当前总和超过目标，则停止.考友反馈，去掉可得100%
        // if (currentSum > targetSum) return;

        // 当我们为一个队伍选择了5名玩家时
        if (count == 5) {
            // 计算另一个队伍的总和
            int otherTeamSum = totalSum - currentSum;
            // 用较小的差值更新结果
            res = Math.min(res, Math.abs(currentSum - otherTeamSum));
            return;
        }

        // 如果我们已经考虑了所有玩家，停止递归
        if (idx == 10) return;

        // 为第一个队伍选择当前玩家
        dfs(nums, idx + 1, count + 1, currentSum + nums[idx]);
        
        // 不为第一个队伍选择当前玩家
        dfs(nums, idx + 1, count, currentSum);
    }
}`,python:`import sys

res = sys.maxsize
totalSum = 0
targetSum = 0

# 深度优先搜索函数
def dfs(nums, idx, count, currentSum):
    global res, totalSum, targetSum
    # 剪枝条件：如果当前总和超过目标，则停止.考友反馈，去掉可得100%
    # if currentSum > targetSum:
    #    return

    # 当我们为一个队伍选择了5名玩家时
    if count == 5:
        # 计算另一个队伍的总和
        otherTeamSum = totalSum - currentSum
        # 用较小的差值更新结果
        res = min(res, abs(currentSum - otherTeamSum))
        return

    # 如果我们已经考虑了所有玩家，停止递归
    if idx == 10:
        return

    # 为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count + 1, currentSum + nums[idx])
    
    # 不为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count, currentSum)

nums = list(map(int, input().split()))
for num in nums:
    totalSum += num
targetSum = totalSum // 2
dfs(nums, 0, 0, 0)
print(res)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let res = Infinity;
let totalSum = 0;

function dfs(nums, idx, count, currentSum) {
    if (count === 5) {
        const otherTeamSum = totalSum - currentSum;
        res = Math.min(res, Math.abs(currentSum - otherTeamSum));
        return;
    }
    if (idx === 10) return;
    dfs(nums, idx + 1, count + 1, currentSum + nums[idx]);
    dfs(nums, idx + 1, count, currentSum);
}

rl.on('line', (line) => {
    const nums = line.split(' ').map(Number);
    totalSum = nums.reduce((a, b) => a + b, 0);
    dfs(nums, 0, 0, 0);
    console.log(res);
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <climits>

using namespace std;

int res = INT_MAX;
int totalSum = 0;
int targetSum = 0;

// 深度优先搜索函数
void dfs(vector<int>& nums, int idx, int count, int currentSum) {
    // 剪枝条件：如果当前总和超过目标，则停止 ,考友反馈，去掉可得100%
    // if (currentSum > targetSum) return;

    // 当我们为一个队伍选择了5名玩家时
    if (count == 5) {
        // 计算另一个队伍的总和
        int otherTeamSum = totalSum - currentSum;
        // 用较小的差值更新结果
        res = min(res, abs(currentSum - otherTeamSum));
        return;
    }

    // 如果我们已经考虑了所有玩家，停止递归
    if (idx == 10) return;

    // 为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count + 1, currentSum + nums[idx]);
    
    // 不为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count, currentSum);
}

int main() {
    vector<int> nums(10);
    for (int i = 0; i < 10; ++i) {
        cin >> nums[i];
        totalSum += nums[i];
    }
    targetSum = totalSum / 2;
    dfs(nums, 0, 0, 0);
    cout << res << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int res = INT_MAX;
int totalSum = 0;
int targetSum = 0;

// 深度优先搜索函数
void dfs(int nums[10], int idx, int count, int currentSum) {
    // 剪枝条件：如果当前总和超过目标，则停止.考友反馈，去掉可得100%
    // if (currentSum > targetSum) return;

    // 当我们为一个队伍选择了5名玩家时
    if (count == 5) {
        // 计算另一个队伍的总和
        int otherTeamSum = totalSum - currentSum;
        // 用较小的差值更新结果
        res = abs(currentSum - otherTeamSum) < res ? abs(currentSum - otherTeamSum) : res;
        return;
    }

    // 如果我们已经考虑了所有玩家，停止递归
    if (idx == 10) return;

    // 为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count + 1, currentSum + nums[idx]);
    
    // 不为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count, currentSum);
}

int main() {
    int nums[10];
    for (int i = 0; i < 10; ++i) {
        scanf("%d", &nums[i]);
        totalSum += nums[i];
    }
    targetSum = totalSum / 2;
    dfs(nums, 0, 0, 0);
    printf("%d\\n", res);
    return 0;
}`},a={id:"40",title:n,examType:"A",score:100,description:t,inputDesc:u,outputDesc:r,examples:e,solution:i,codes:m};export{m as codes,a as default,t as description,c as examType,e as examples,s as id,u as inputDesc,r as outputDesc,o as score,i as solution,n as title};
