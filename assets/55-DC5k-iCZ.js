const r="55",n="转盘寿司",o="A",a=100,e=`寿司店周年庆，正在举办优惠活动回馈新老客户。
寿司转盘上总共有 n 盘寿司，prices[i] 是第 i 盘寿司的价格，
如果客户选择了第 i 盘寿司，寿司店免费赠送客户距离第 i 盘寿司最近的下一盘寿司 j，前提是 prices[j] < prices[i]，如果没有满足条件的 j，则不赠送寿司。
每个价格的寿司都可无限供应。`,t=`输入的每一个数字代表每盘寿司的价格，每盘寿司的价格之间使用空格分隔，例如:
3 15 6 14
表示：
第 0 盘寿司价格 prices[0] 为 3第 1 盘寿司价格 prices[1] 为 15第 2 盘寿司价格 prices[2] 为 6第 3 盘寿司价格 prices[3] 为 14寿司的盘数 n 范围为：1 ≤ n ≤ 500
每盘寿司的价格 price 范围为：1 ≤ price ≤ 1000`,i=`输出享受优惠后的一组数据，每个值表示客户选择第 i 盘寿司时实际得到的寿司的总价格。使用空格进行分隔，例如：
3 21 9 17
根据题目的描述，客户选择了第 i 盘寿司，寿司店免费赠送距离第 i 盘寿司最近的下一盘寿司 j，且 prices[j] < prices[i]。如果没有满足条件的 j，则不赠送寿司。因此，对于每一盘寿司，我们需要找到其价格右侧第一个比它小的寿司的价格，并将其加到当前寿司的价格上。
给定输入 3 15 6 14，我们来逐个分析：
综合以上，输出结果为 3 21 9 17。
通过这个用例，可以得出数组是可以循环到头部继续寻找`,s=[{input:"3 15 6 14",output:"3 21 9 17",explanation:`分析每盘寿司：
价格3：右边没有更便宜的→3
价格15：右边第一个更便宜的是6→15+6=21
价格6：循环找到3→6+3=9
价格14：循环找到3→14+3=17`},{input:"5 2 8 3",output:"7 2 11 5",explanation:`分析每盘寿司：
价格5：右边第一个更便宜的是2→5+2=7
价格2：没有更便宜的→2
价格8：右边第一个更便宜的是3→8+3=11
价格3：循环找到2→3+2=5`},{input:"10 10 10",output:"10 10 10",explanation:"所有价格相同，没有更便宜的寿司，不赠送。"}],p=`**解题思路：**

本题是一道**单调栈+循环数组**问题。

**问题本质：**
找每个元素右边第一个比它小的元素（循环数组）。

**算法步骤：**

1. 使用单调栈存储待处理元素的索引
2. 遍历2n-1次处理循环数组
3. 当栈顶元素价格大于当前价格时，找到了更便宜的寿司
4. 栈中剩余元素表示没有更便宜的，保持原价

**时间复杂度**：O(N)
**空间复杂度**：O(N)`,c={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 使用Scanner从控制台读取输入
        Scanner sc = new Scanner(System.in);
        // 读取一行输入，按空格分割，然后将每个数字字符串转换为整数，并收集到数组中
        int[] prices = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        // 获取寿司价格数组的长度，代表寿司盘数
        int n = prices.length;
        
        // 创建一个数组来存储结果，即每个寿司盘享受优惠后的总价格
        int[] res = new int[n];
        // 创建一个双端队列作为栈使用，用于跟踪寿司价格的索引
        Deque<Integer> stack = new ArrayDeque<>();

        // 遍历每个寿司盘的价格，由于寿司盘是循环的，需要遍历两倍长度减一次
        for (int j = 0; j < n * 2 - 1; j++) {
            // 计算当前索引，由于数组是循环的，使用模运算得到实际索引
            int index = j % n;
            // 当栈不为空且栈顶元素的价格大于当前索引对应的价格时
            while (!stack.isEmpty() && prices[stack.peek()] > prices[index]) {
                // 弹出栈顶元素的索引
                int topIndex = stack.pop();
                // 计算栈顶元素享受优惠后的价格，并更新结果数组
                res[topIndex] = prices[topIndex] + prices[index];
            }
            // 第一轮遍历时，将索引压入栈中
            if (j < n) {
                stack.push(index);
            }
        }
 
        // 遍历完成后，栈中剩余的元素代表它们右侧没有更小的价格
        // 直接将它们自身的价格作为结果
        while (!stack.isEmpty()) {
            int topIndex = stack.pop();
            res[topIndex] = prices[topIndex];
        }

        // 使用StringBuilder构建输出结果
        StringBuilder sb = new StringBuilder();
        for (int num : res) {
            // 将每个价格添加到StringBuilder中，并加上空格
            sb.append(num).append(" ");
        }
        // 输出结果，并去除末尾的空格
        System.out.println(sb.toString().trim());
    }
}`,python:`# 读取一行输入，按空格分割，然后将每个数字字符串转换为整数，并收集到列表中
prices = list(map(int, input().split()))
# 获取寿司价格列表的长度，代表寿司盘数
n = len(prices)

# 创建一个列表来存储结果，即每个寿司盘享受优惠后的总价格
res = [0] * n
# 创建一个列表作为栈使用，用于跟踪寿司价格的索引
stack = []

# 遍历每个寿司盘的价格，由于寿司盘是循环的，需要遍历两倍长度减一次
for j in range(n * 2 - 1):
    # 计算当前索引，由于列表是循环的，使用模运算得到实际索引
    index = j % n
    # 当栈不为空且栈顶元素的价格大于当前索引对应的价格时
    while stack and prices[stack[-1]] > prices[index]:
        # 弹出栈顶元素的索引
        top_index = stack.pop()
        # 计算栈顶元素享受优惠后的价格，并更新结果列表
        res[top_index] = prices[top_index] + prices[index]
    # 第一轮遍历时，将索引压入栈中
    if j < n:
        stack.append(index)

# 遍历完成后，栈中剩余的元素代表它们右侧没有更小的价格
# 直接将它们自身的价格作为结果
while stack:
    top_index = stack.pop()
    res[top_index] = prices[top_index]

# 输出结果，每个价格后加上空格
print(' '.join(map(str, res)))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    // 读取价格数组
    const prices = line.split(' ').map(Number);
    const n = prices.length;
    
    // 创建结果数组和栈
    const res = new Array(n).fill(0);
    const stack = [];
    
    // 遍历2n-1次处理循环数组
    for (let j = 0; j < n * 2 - 1; j++) {
        const index = j % n;
        // 当栈顶价格大于当前价格时，找到了更便宜的寿司
        while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[index]) {
            const topIndex = stack.pop();
            res[topIndex] = prices[topIndex] + prices[index];
        }
        // 第一轮遍历时入栈
        if (j < n) {
            stack.push(index);
        }
    }
    
    // 栈中剩余元素没有更便宜的，保持原价
    while (stack.length > 0) {
        const topIndex = stack.pop();
        res[topIndex] = prices[topIndex];
    }
    
    console.log(res.join(' '));
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <stack>
#include <sstream>

int main() {
    // 使用iostream从控制台读取输入
    std::string line;
    std::getline(std::cin, line);
    std::istringstream iss(line);

    // 读取一行输入，按空格分割，然后将每个数字字符串转换为整数，并收集到vector中
    std::vector<int> prices;
    int price;
    while (iss >> price) {
        prices.push_back(price);
    }

    // 获取寿司价格数组的长度，代表寿司盘数
    int n = prices.size();
    
    // 创建一个数组来存储结果，即每个寿司盘享受优惠后的总价格
    std::vector<int> res(n, 0);
    // 创建一个栈来跟踪寿司价格的索引
    std::stack<int> stack;

    // 遍历每个寿司盘的价格，由于寿司盘是循环的，需要遍历两倍长度减一次
    for (int j = 0; j < n * 2 - 1; ++j) {
        // 计算当前索引，由于数组是循环的，使用模运算得到实际索引
        int index = j % n;
        // 当栈不为空且栈顶元素的价格大于当前索引对应的价格时
        while (!stack.empty() && prices[stack.top()] > prices[index]) {
            // 弹出栈顶元素的索引
            int topIndex = stack.top();
            stack.pop();
            // 计算栈顶元素享受优惠后的价格，并更新结果数组
            res[topIndex] = prices[topIndex] + prices[index];
        }
        // 第一轮遍历时，将索引压入栈中
        if (j < n) {
            stack.push(index);
        }
    }

    // 遍历完成后，栈中剩余的元素代表它们右侧没有更小的价格
    // 直接将它们自身的价格作为结果
    while (!stack.empty()) {
        int topIndex = stack.top();
        stack.pop();
        res[topIndex] = prices[topIndex];
    }

    // 输出结果，每个价格后加上空格
    for (int num : res) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}`,c:`#include <stdio.h>

#define MAX_N 500

int main() {
    int prices[MAX_N]; // 创建一个数组，用于存储每盘寿司的价格
    int n = 0; // 初始化寿司盘数为0

    // 从控制台读取每盘寿司的价格，直到读取到换行符
    while (scanf("%d", &prices[n]) == 1) {
        n++; // 每读取一个价格，寿司盘数加1
    }

    int res[MAX_N]; // 创建一个数组，用于存储每个寿司盘享受优惠后的总价格
    int stack[MAX_N]; // 创建一个数组作为栈使用，用于跟踪寿司价格的索引
    int top = -1; // 初始化栈顶指针为-1，表示栈为空

    // 遍历每个寿司盘的价格，由于寿司盘是循环的，需要遍历两倍长度减一次
    for (int j = 0; j < n * 2 - 1; j++) {
        // 计算当前索引，由于数组是循环的，使用模运算得到实际索引
        int index = j % n;
        // 当栈不为空且栈顶元素的价格大于当前索引对应的价格时
        while (top >= 0 && prices[stack[top]] > prices[index]) {
            // 弹出栈顶元素的索引
            int topIndex = stack[top--];
            // 计算栈顶元素享受优惠后的价格，并更新结果数组
            res[topIndex] = prices[topIndex] + prices[index];
        }
        // 第一轮遍历时，将索引压入栈中
        if (j < n) {
            stack[++top] = index;
        }
    }

    // 遍历完成后，栈中剩余的元素代表它们右侧没有更小的价格
    // 直接将它们自身的价格作为结果
    while (top >= 0) {
        int topIndex = stack[top--];
        res[topIndex] = prices[topIndex];
    }

    // 输出每个寿司盘享受优惠后的总价格
    for (int i = 0; i < n; i++) {
        printf("%d ", res[i]);
    }

    return 0;
}`},d={id:"55",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:s,solution:p,codes:c};export{c as codes,d as default,e as description,o as examType,s as examples,r as id,t as inputDesc,i as outputDesc,a as score,p as solution,n as title};
