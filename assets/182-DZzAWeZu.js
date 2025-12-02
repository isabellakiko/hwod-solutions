const h="182",n="传递悄悄话",m="B",l=100,e=`给定一个二叉树，每个节点上站一个人，节点数字表示父节点到该节点传递悄悄话需要花费的时间。
初始时，根节点所在位置的人有一个悄悄话想要传递给其他人，求二叉树所有节点上的人都接收到悄悄话花费的时间。`,i=`给定二叉树
0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2
注：-1表示空节点
`,t=`返回所有节点都接收到悄悄话花费的时间
38`,d=[{input:"0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2",output:"38",explanation:"根节点0，左子树9，右子树20->15->3路径最长，0+20+15+3=38"},{input:"0 5 10",output:"10",explanation:"根节点0，左子节点5，右子节点10，最大路径0+10=10"}],s=`**解题思路：**

本题是一道**二叉树BFS**问题。

**核心思路：**
- 层次遍历二叉树
- 累加从根到叶子的路径时间
- 求最大路径时间

**算法步骤：**
1. BFS遍历二叉树
2. 子节点时间=父节点时间+自身时间
3. 记录最大时间
4. 遍历结束返回最大值

**时间复杂度**：O(N)`,r={java:`import java.util.Arrays;
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
print(max_time)`,javascript:"",cpp:`#include <iostream>
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
}`},p={id:"182",title:n,examType:"B",score:100,description:e,inputDesc:i,outputDesc:t,examples:d,solution:s,codes:r};export{r as codes,p as default,e as description,m as examType,d as examples,h as id,i as inputDesc,t as outputDesc,l as score,s as solution,n as title};
