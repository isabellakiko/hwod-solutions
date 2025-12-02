const r="21",h="悄悄话",m="A",l=100,n=`给定一个二叉树，每个节点上站一个人，节点数字表示父节点到该节点传递悄悄话需要花费的时间。
初始时，根节点所在位置的人有一个悄悄话想要传递给其他人，求二叉树所有节点上的人都接收到悄悄话花费的时间。`,e=`输入一行，为空格分隔的整数数组，表示二叉树的层序遍历。
-1表示空节点。数组第一个元素是根节点（值为0表示根节点无传递时间）。`,i="输出一个整数，表示所有节点都接收到悄悄话花费的最长时间。",t=[{input:"0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2",output:"38",explanation:`二叉树结构：
       0
      / \\
     9   20
        /  \\
       15   7
      /  \\
     3    2

路径时间：
- 根→9：9
- 根→20：20
- 根→20→15：35
- 根→20→7：27
- 根→20→15→3：38
- 根→20→15→2：37

最长路径是38。`}],d=`**解题思路：**

本题是一道**二叉树BFS层序遍历**问题。

**核心思想：**
- 二叉树用数组存储（层序），索引 i 的左子节点是 2*i+1，右子节点是 2*i+2
- 悄悄话同时传递给所有子节点，求所有节点都收到的时间即求最长路径

**算法步骤：**

1. BFS从根节点开始遍历
2. 对于每个节点，计算子节点的累计时间 = 父节点时间 + 子节点边权
3. 将子节点加入队列继续遍历
4. 记录所有节点中的最大累计时间

**时间复杂度**：O(n)，每个节点访问一次`,s={java:`import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建扫描器读取输入
        Scanner scanner = new Scanner(System.in);
        // 读取一行输入并将其转换为整数数组，数组中的每个元素代表从父节点到当前节点的时间
        int[] whisperTimes = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        // 关闭扫描器
        scanner.close();

        // 记录最后一个节点接收悄悄话的时间
        int maxTime = 0;

        // 使用队列来进行二叉树的层次遍历
        Queue<Integer> nodeQueue = new LinkedList<>();
        // 将根节点索引0加入队列
        nodeQueue.add(0);

        // 当队列不为空时，继续遍历
        while (!nodeQueue.isEmpty()) {
            // 从队列中取出一个节点索引
            int parentNodeIndex = nodeQueue.poll();

            // 计算左子节点索引
            int leftChildIndex = 2 * parentNodeIndex + 1;
            // 计算右子节点索引
            int rightChildIndex = 2 * parentNodeIndex + 2;

            // 如果左子节点存在，处理左子节点
            if (leftChildIndex < whisperTimes.length && whisperTimes[leftChildIndex] != -1) {
                // 更新左子节点的时间（父节点时间 + 当前节点时间）
                whisperTimes[leftChildIndex] += whisperTimes[parentNodeIndex];
                // 将左子节点加入队列
                nodeQueue.add(leftChildIndex);
                // 更新最大时间
                maxTime = Math.max(maxTime, whisperTimes[leftChildIndex]);
            }

            // 如果右子节点存在，处理右子节点
            if (rightChildIndex < whisperTimes.length && whisperTimes[rightChildIndex] != -1) {
                // 更新右子节点的时间（父节点时间 + 当前节点时间）
                whisperTimes[rightChildIndex] += whisperTimes[parentNodeIndex];
                // 将右子节点加入队列
                nodeQueue.add(rightChildIndex);
                // 更新最大时间
                maxTime = Math.max(maxTime, whisperTimes[rightChildIndex]);
            }
        }

        // 所有节点都接收到悄悄话后，打印最大时间
        System.out.println(maxTime);
    }
}`,python:`from collections import deque

# 读取一行输入并将其转换为整数列表
# 列表中的每个元素代表从父节点到当前节点的时间
whisper_times = list(map(int, input().split()))

# 记录最后一个节点接收悄悄话的时间
max_time = 0

# 使用队列来进行二叉树的层次遍历
node_queue = deque([0])  # 将根节点索引0加入队列

# 当队列不为空时，继续遍历
while node_queue:
    # 从队列中取出一个节点索引
    parent_node_index = node_queue.popleft()

    # 计算左子节点索引
    left_child_index = 2 * parent_node_index + 1
    # 计算右子节点索引
    right_child_index = 2 * parent_node_index + 2

    # 如果左子节点存在，处理左子节点
    if left_child_index < len(whisper_times) and whisper_times[left_child_index] != -1:
        # 更新左子节点的时间（父节点时间 + 当前节点时间）
        whisper_times[left_child_index] += whisper_times[parent_node_index]
        # 将左子节点加入队列
        node_queue.append(left_child_index)
        # 更新最大时间
        max_time = max(max_time, whisper_times[left_child_index])

    # 如果右子节点存在，处理右子节点
    if right_child_index < len(whisper_times) and whisper_times[right_child_index] != -1:
        # 更新右子节点的时间（父节点时间 + 当前节点时间）
        whisper_times[right_child_index] += whisper_times[parent_node_index]
        # 将右子节点加入队列
        node_queue.append(right_child_index)
        # 更新最大时间
        max_time = max(max_time, whisper_times[right_child_index])

# 所有节点都接收到悄悄话后，打印最大时间
print(max_time)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  // 读取输入并转换为整数数组
  const whisperTimes = line.split(' ').map(Number);
  
  // 记录最大时间
  let maxTime = 0;
  
  // 使用队列进行BFS
  const queue = [0];
  
  while (queue.length > 0) {
    const parentIndex = queue.shift();
    
    // 计算左右子节点索引
    const leftIndex = 2 * parentIndex + 1;
    const rightIndex = 2 * parentIndex + 2;
    
    // 处理左子节点
    if (leftIndex < whisperTimes.length && whisperTimes[leftIndex] !== -1) {
      whisperTimes[leftIndex] += whisperTimes[parentIndex];
      queue.push(leftIndex);
      maxTime = Math.max(maxTime, whisperTimes[leftIndex]);
    }
    
    // 处理右子节点
    if (rightIndex < whisperTimes.length && whisperTimes[rightIndex] !== -1) {
      whisperTimes[rightIndex] += whisperTimes[parentIndex];
      queue.push(rightIndex);
      maxTime = Math.max(maxTime, whisperTimes[rightIndex]);
    }
  }
  
  console.log(maxTime);
  rl.close();
});`,cpp:`#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <queue>

using namespace std;
int main() {
    // 读取一行输入并将其转换为整数数组
    // 数组中的每个元素代表从父节点到当前节点的时间
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> whisperTimes;
    int time;
    while (iss >> time) {
        whisperTimes.push_back(time);
    }

    // 记录最后一个节点接收悄悄话的时间
    int maxTime = 0;

    // 使用队列来进行二叉树的层次遍历
    queue<int> nodeQueue;
    // 将根节点索引0加入队列
    nodeQueue.push(0);

    // 当队列不为空时，继续遍历
    while (!nodeQueue.empty()) {
        // 从队列中取出一个节点索引
        int parentNodeIndex = nodeQueue.front();
        nodeQueue.pop();

        // 计算左子节点索引
        int leftChildIndex = 2 * parentNodeIndex + 1;
        // 计算右子节点索引
        int rightChildIndex = 2 * parentNodeIndex + 2;

        // 如果左子节点存在，处理左子节点
        if (leftChildIndex < whisperTimes.size() && whisperTimes[leftChildIndex] != -1) {
            // 更新左子节点的时间（父节点时间 + 当前节点时间）
            whisperTimes[leftChildIndex] += whisperTimes[parentNodeIndex];
            // 将左子节点加入队列
            nodeQueue.push(leftChildIndex);
            // 更新最大时间
            maxTime = max(maxTime, whisperTimes[leftChildIndex]);
        }

        // 如果右子节点存在，处理右子节点
        if (rightChildIndex < whisperTimes.size() && whisperTimes[rightChildIndex] != -1) {
            // 更新右子节点的时间（父节点时间 + 当前节点时间）
            whisperTimes[rightChildIndex] += whisperTimes[parentNodeIndex];
            // 将右子节点加入队列
            nodeQueue.push(rightChildIndex);
            // 更新最大时间
            maxTime = max(maxTime, whisperTimes[rightChildIndex]);
        }
    }

    // 所有节点都接收到悄悄话后，打印最大时间
    cout << maxTime << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_SIZE 10000 // 假设二叉树节点数不超过10000

int main() {
    // 读取一行输入并将其转换为整数数组
    char input[MAX_SIZE];
    fgets(input, sizeof(input), stdin);
    
    int whisperTimes[MAX_SIZE];
    int i = 0, time;
    char *token = strtok(input, " ");
    while (token != NULL) {
        sscanf(token, "%d", &time);
        whisperTimes[i++] = time;
        token = strtok(NULL, " ");
    }
    int length = i; // 数组长度

    // 记录最后一个节点接收悄悄话的时间
    int maxTime = 0;

    // 使用数组模拟队列进行二叉树的层次遍历
    int queue[MAX_SIZE];
    int front = 0, rear = 0; // 队列的头和尾索引

    // 将根节点索引0加入队列
    queue[rear++] = 0;

    // 当队列不为空时，继续遍历
    while (front < rear) {
        // 从队列中取出一个节点索引
        int parentNodeIndex = queue[front++];
        
        // 计算左子节点索引
        int leftChildIndex = 2 * parentNodeIndex + 1;
        // 计算右子节点索引
        int rightChildIndex = 2 * parentNodeIndex + 2;

        // 如果左子节点存在，处理左子节点
        if (leftChildIndex < length && whisperTimes[leftChildIndex] != -1) {
            // 更新左子节点的时间（父节点时间 + 当前节点时间）
            whisperTimes[leftChildIndex] += whisperTimes[parentNodeIndex];
            // 将左子节点加入队列
            queue[rear++] = leftChildIndex;
            // 更新最大时间
            if (whisperTimes[leftChildIndex] > maxTime) {
                maxTime = whisperTimes[leftChildIndex];
            }
        }

        // 如果右子节点存在，处理右子节点
        if (rightChildIndex < length && whisperTimes[rightChildIndex] != -1) {
            // 更新右子节点的时间（父节点时间 + 当前节点时间）
            whisperTimes[rightChildIndex] += whisperTimes[parentNodeIndex];
            // 将右子节点加入队列
            queue[rear++] = rightChildIndex;
            // 更新最大时间
            if (whisperTimes[rightChildIndex] > maxTime) {
                maxTime = whisperTimes[rightChildIndex];
            }
        }
    }

    // 所有节点都接收到悄悄话后，打印最大时间
    printf("%d\\n", maxTime);
    return 0;
}`},p={id:"21",title:"悄悄话",examType:"A",score:100,description:n,inputDesc:e,outputDesc:i,examples:t,solution:d,codes:s};export{s as codes,p as default,n as description,m as examType,t as examples,r as id,e as inputDesc,i as outputDesc,l as score,d as solution,h as title};
