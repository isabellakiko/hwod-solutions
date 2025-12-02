const r="141",n="跳格子3",o="A",c=200,e=`小明和朋友们一起玩跳格子游戏，每个格子上有特定的分数 score = [1, -1, -6, 7, -17, 7]，
从起点score[0]开始，每次最大的步长为k，请你返回小明跳到终点 score[n-1] 时，能得到的最大得分。`,i=`第一行输入总的格子数量 n
第二行输入每个格子的分数 score[i]
第三行输入最大跳的步长 k
格子的总长度 n 和步长 k 的区间在 [1, 100000] 每个格子的分数 score[i] 在 [-10000, 10000] 区间中
格子的总长度 n 和步长 k 的区间在 [1, 100000]
每个格子的分数 score[i] 在 [-10000, 10000] 区间中`,t="输出最大得分",s=[{input:`6
1 -1 -6 7 -17 7
2`,output:"14",explanation:"从score[0]=1开始，最大步长2，最优路径1->7->7，得分1+7+7=15，但必须到终点，最优解为14"},{input:`3
1 2 3
1`,output:"6",explanation:"步长为1，必须依次跳过每个格子，得分1+2+3=6"}],d=`**解题思路：**

本题是一道**动态规划+单调队列优化**问题。

**核心思路：**
- dp[i]表示到达第i格的最大得分
- dp[i] = max(dp[i-k]...dp[i-1]) + score[i]
- 用单调队列维护滑动窗口最大值

**算法步骤：**
1. 初始化dp[0]=score[0]，队列加入索引0
2. 遍历每格，移除超出k范围的队首元素
3. dp[i]=score[i]+dp[队首]，队首为窗口最大值
4. 维护队列单调递减，将当前索引入队
5. 返回dp[n-1]

**时间复杂度**：O(N)`,p={java:`import java.util.*;

public class Main {
    public static void main(String[] args)  {
        Scanner sc = new Scanner(System.in);
 
        int n = Integer.parseInt(sc.nextLine());
        int[] scores = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int k = Integer.parseInt(sc.nextLine());
    

        // 特殊情况处理：如果格子数量为1，直接输出该格子的分数
        if (n == 1) {
            System.out.println(scores[0]);
            return;
        }

        // 动态规划数组，dp[i]存储到达第i个格子时能得到的最大分数
        int[] dp = new int[n];
        dp[0] = scores[0]; // 初始化，起点的最大分数就是起点的分数

        // 使用双端队列来维护窗口内的最大dp值的索引
        Deque<Integer> deque = new LinkedList<>();
        deque.add(0);

        for (int i = 1; i < n; i++) {
            // 如果队列不为空且队列头部的索引已经超出了跳跃范围，从队列中移除头部
            if (!deque.isEmpty() && deque.peekFirst() < i - k) {
                deque.pollFirst();
            }

            // 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
            dp[i] = scores[i] + (deque.isEmpty() ? 0 : dp[deque.peekFirst()]);

            // 维护队列，保持队列为递减，新的最大值需要添加到队尾
            while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) {
                deque.pollLast();
            }

            // 将当前索引加到队列尾部
            deque.addLast(i);
        }

        // 输出到达最后一个格子时能得到的最大分数
        System.out.println(dp[n - 1]);
    }
}`,python:`from collections import deque

n = int(input().strip())
scores = list(map(int, input().strip().split()))
k = int(input().strip())

# 特殊情况处理：如果格子数量为1，直接输出该格子的分数
if n == 1:
    print(scores[0])
    exit()

# 动态规划数组，dp[i]存储到达第i个格子时能得到的最大分数
dp = [0] * n
dp[0] = scores[0]  # 初始化，起点的最大分数就是起点的分数

# 使用双端队列来维护窗口内的最大dp值的索引
deque = deque([0])

for i in range(1, n):
    # 如果队列不为空且队列头部的索引已经超出了跳跃范围，从队列中移除头部
    if deque and deque[0] < i - k:
        deque.popleft()

    # 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
    dp[i] = scores[i] + (dp[deque[0]] if deque else 0)

    # 维护队列，保持队列为递减，新的最大值需要添加到队尾
    while deque and dp[deque[-1]] <= dp[i]:
        deque.pop()

    # 将当前索引加到队列尾部
    deque.append(i)

# 输出到达最后一个格子时能得到的最大分数
print(dp[-1])`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputs = [];
rl.on('line', function(line) {
    inputs.push(line);
}).on('close', function() {
    const n = parseInt(inputs[0]); // 读取第一行输入，格子的数量
    const scores = inputs[1].split(' ').map(Number); // 读取第二行输入，并转化为整数数组
    const k = parseInt(inputs[2]); // 读取第三行输入，跳跃的最大范围

    // 特殊情况处理：如果格子数量为1，直接输出该格子的分数
    if (n === 1) {
        console.log(scores[0]);
        return;
    }

    // 动态规划数组，dp[i]存储到达第i个格子时能得到的最大分数
    const dp = Array(n).fill(0);
    dp[0] = scores[0]; // 初始化，起点的最大分数就是起点的分数

    // 使用双端队列来维护窗口内的最大dp值的索引
    const deque = [];
    deque.push(0);

    for (let i = 1; i < n; i++) {
        // 如果队列不为空且队列头部的索引已经超出了跳跃范围，从队列中移除头部
        while (deque.length > 0 && deque[0] < i - k) {
            deque.shift();
        }

        // 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
        dp[i] = scores[i] + (deque.length === 0 ? 0 : dp[deque[0]]);

        // 维护队列，保持队列为递减，新的最大值需要添加到队尾
        while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
            deque.pop();
        }

        // 将当前索引加到队列尾部
        deque.push(i);
    }

    // 输出到达最后一个格子时能得到的最大分数
    console.log(dp[n - 1]);
    
});`,cpp:`#include <iostream>
#include <vector>
#include <deque>
#include <sstream>
using namespace std;

int main() {
    int n, k;
    cin >> n;
    cin.ignore(); // 忽略换行符，以便读取下一行分数

    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> scores(n);
    for (int &score : scores) {
        ss >> score;
    }
    cin >> k;

    // 特殊情况处理：如果格子数量为1，直接输出该格子的分数
    if (n == 1) {
        cout << scores[0] << endl;
        return 0;
    }

    // 动态规划数组，dp[i]存储到达第i个格子时能得到的最大分数
    vector<int> dp(n);
    dp[0] = scores[0]; // 初始化，起点的最大分数就是起点的分数

    // 使用双端队列来维护窗口内的最大dp值的索引
    deque<int> deque;
    deque.push_back(0);

    for (int i = 1; i < n; i++) {
        // 如果队列不为空且队列头部的索引已经超出了跳跃范围，从队列中移除头部
        if (!deque.empty() && deque.front() < i - k) {
            deque.pop_front();
        }

        // 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
        dp[i] = scores[i] + (deque.empty() ? 0 : dp[deque.front()]);

        // 维护队列，保持队列为递减，新的最大值需要添加到队尾
        while (!deque.empty() && dp[deque.back()] <= dp[i]) {
            deque.pop_back();
        }

        // 将当前索引加到队列尾部
        deque.push_back(i);
    }

    // 输出到达最后一个格子时能得到的最大分数
    cout << dp[n - 1] << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n, k;
    scanf("%d", &n); // 读取格子的数量

    int scores[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &scores[i]); // 读取每个格子的分数
    }
    scanf("%d", &k); // 读取跳跃的最大范围

    // 特殊情况处理：如果格子数量为1，直接输出该格子的分数
    if (n == 1) {
        printf("%d\\n", scores[0]);
        return 0;
    }

    int dp[n];
    dp[0] = scores[0]; // 初始化，起点的最大分数就是起点的分数

    // 使用数组模拟窗口内最大dp值的索引
    int window[n];
    int start = 0, end = 0; // 窗口的起始和终止位置
    window[end++] = 0;

    for (int i = 1; i < n; i++) {
        // 如果窗口的第一个元素已经超出了跳跃范围，从窗口中移除该元素
        if (window[start] < i - k) {
            start++;
        }

        // 计算当前格子的最大分数：当前格子的分数加上可以跳到该格子的最大分数
        dp[i] = scores[i] + dp[window[start]];

        // 维护窗口，保持窗口内为递减，新的最大值需要添加到窗口尾部
        while (start < end && dp[window[end - 1]] <= dp[i]) {
            end--;
        }

        // 将当前索引加到窗口尾部
        window[end++] = i;
    }

    // 输出到达最后一个格子时能得到的最大分数
    printf("%d\\n", dp[n - 1]);
    return 0;
}`},u={id:"141",title:n,examType:"A",score:200,description:e,inputDesc:i,outputDesc:t,examples:s,solution:d,codes:p};export{p as codes,u as default,e as description,o as examType,s as examples,r as id,i as inputDesc,t as outputDesc,c as score,d as solution,n as title};
