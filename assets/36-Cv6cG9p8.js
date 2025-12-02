const a="36",n="服务器广播需要广播的服务器数量",l="A",u=100,i=`服务器连接方式包括直接相连，间接连接。
A和B直接连接，B和C直接连接，则A和C间接连接。
直接连接和间接连接都可以发送广播。
给出一个N*N数组，代表N个服务器，
matrix[i][j] == 1， 则代表i和j直接连接；不等于 1 时，代表i和j不直接连接。
matrix[i][i] == 1，
即自己和自己直接连接。matrix[i][j] == matrix[j][i]。
计算初始需要给几台服务器广播， 才可以使每个服务器都收到广播。`,t=`输入为N行，每行有N个数字，为0或1，由空格分隔，
构成N*N的数组，N的范围为 1 <= N <= 40`,r="输出一个数字，为需要广播的服务器的数量",e=[{input:`1 0 0
0 1 0
0 0 1`,output:"3",explanation:`3×3矩阵，3台服务器互不连接（只有对角线为1）。
每台服务器都是独立的连通分量，需要分别广播3次。`},{input:`1 1
1 1`,output:"1",explanation:`2×2矩阵，2台服务器相互连接。
它们属于同一个连通分量，只需广播1台即可。`},{input:`1 1 0
1 1 0
0 0 1`,output:"2",explanation:`3×3矩阵，服务器0和1相连，服务器2独立。
共2个连通分量，需要广播2次。`}],s=`**解题思路：**

本题是一道**图的连通分量**问题。

**核心思想：**
- 每个连通分量只需要广播1台服务器
- 答案 = 连通分量的数量

**算法步骤：**

1. 读取N×N的邻接矩阵
2. 使用DFS/BFS遍历图
3. 每发现一个未访问的节点，就找出其所在的整个连通分量
4. 统计连通分量的数量

**时间复杂度**：O(N²)`,o={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
    
        Scanner in = new Scanner(System.in);

        // 首先读取第一行，并将其通过空格拆分成字符串数组
        String[] str = in.nextLine().split(" ");
        int n = str.length;  // 服务器的数量，n 为矩阵的维度

        // 创建 n*n 的二维数组来存储服务器连接状态
        int[][] arr = new int[n][n];

        // 将第一行的连接状态转换为整数并存入数组 arr
        for(int i = 0; i < n; i++) {   
            arr[0][i] = Integer.parseInt(str[i]);
        }

        // 读取剩下的 n-1 行，并逐行存入 arr 矩阵
        for(int i = 1; i < n; i++) {   
            String[] s = in.nextLine().split(" ");
            for(int j = 0; j < n; j++) {
                arr[i][j] = Integer.parseInt(s[j]);
            }
        }

        int count = 0;  // 计数器，记录连通分量的数量（即需要广播的服务器数量）

        // 使用队列来记录访问过的节点（服务器）
        Queue<Integer> queue = new LinkedList<>();

        // 遍历每个服务器，如果该服务器没有被访问过，就执行 DFS，找到其所有连通的服务器
        for(int i = 0; i < n; i++) {
            if(!queue.contains(i)) {  // 如果该服务器不在已访问队列中
                dfs(arr, queue, i);  // 执行深度优先搜索
                count++;  // 每次找到一个新的连通分量，计数器加1
            }
        }

        // 输出需要广播的服务器数量
        System.out.println(count);
    }
    
    // 深度优先搜索函数，递归查找服务器的所有连通节点
    public static void dfs(int[][] arr, Queue<Integer> queue, int index) {
        queue.offer(index);  // 将当前服务器加入已访问队列

        // 从当前服务器开始，查找所有直接相连的服务器
        for (int i = index + 1; i < arr.length; i++) {
            // 如果服务器 i 和当前服务器相连且还没有访问过，则继续递归搜索
            if (arr[index][i] == 1 && !queue.contains(i)) {
                dfs(arr, queue, i);
            }
        }
    }
}`,python:`import sys

# 深度优先搜索函数，递归遍历图中与当前服务器相连的所有服务器
def dfs(arr, visited, index):
    visited[index] = True  # 标记当前服务器为已访问
    flag = True  # 标记是否存在相连的服务器
    for i in range(index + 1, len(arr)):  # 遍历所有服务器
        if arr[index][i] == 1:  # 如果当前服务器与服务器 i 相连
            flag = False  # 发现相连的服务器，设置 flag 为 False
            dfs(arr, visited, i)  # 递归搜索与服务器 i 相连的所有服务器
    if flag:  # 如果没有发现相连的服务器，即 flag 仍为 True
        global count  # 使用全局变量 count 计数
        count += 1  # 说明这是一个新的连通分量，计数加 1

# 初始化计数器
count = 0

# 读取输入的第一行，表示服务器的连接矩阵的第一行
str = input().split(" ")
n = len(str)  # 服务器的数量，也就是矩阵的维度

# 初始化 n*n 的二维数组 arr 来存储服务器连接状态
arr = [[0]*n for _ in range(n)]

# 将第一行数据存入 arr 的第一行
for i in range(n):
    arr[0][i] = int(str[i])

# 读取剩下的行并存入 arr 中
for i in range(1, n):
    s = input().split(" ")
    for j in range(n):
        arr[i][j] = int(s[j])

# 初始化 visited 数组，用来标记每个服务器是否已经被访问
visited = [False] * n

# 遍历每个服务器，执行 DFS 查找连通分量
for i in range(n):
    if not visited[i]:  # 如果该服务器没有被访问
        dfs(arr, visited, i)  # 递归查找所有与该服务器相连的服务器

# 输出连通分量的数量，即需要广播的服务器数量
print(count)`,javascript:`const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 深度优先搜索函数，递归查找与当前服务器相连的所有服务器
function dfs(arr, visited, index) {
  visited[index] = true;  // 标记当前服务器为已访问
  let flag = true;  // 标记是否发现相连的服务器
  for (let i = index + 1; i < arr.length; i++) {  // 遍历服务器
    if (arr[index][i] === 1) {  // 如果服务器 i 和当前服务器相连
      flag = false;  // 发现相连的服务器，设置 flag 为 false
      dfs(arr, visited, i);  // 递归搜索与服务器 i 相连的服务器
    }
  }
  if (flag) {  // 如果 flag 仍为 true，表示该服务器为单独的连通分量
    count++;  // 增加连通分量计数
  }
}

// 初始化计数器
let count = 0;
let input = '';

 
rl.on('line', (line) => {
  input += line + '\\n';  // 收集每一行输入
}).on('close', () => {
  const lines = input.trim().split('\\n');  // 将输入按行拆分
  const str = lines[0].split(' ');  // 读取第一行
  const n = str.length;  // 获取服务器数量
  const arr = Array(n).fill(0).map(() => Array(n).fill(0));  // 初始化二维数组
  
  // 将第一行输入转换为二维数组的第一行
  for (let i = 0; i < n; i++) {
    arr[0][i] = parseInt(str[i]);
  }
  
  // 读取剩余行并存入二维数组
  for (let i = 1; i < n; i++) {
    const s = lines[i].split(' ');
    for (let j = 0; j < n; j++) {
      arr[i][j] = parseInt(s[j]);
    }
  }
  
  // 初始化访问数组，记录每个服务器是否已访问
  const visited = Array(n).fill(false);
  
  // 遍历每个服务器，查找未访问过的服务器并进行 DFS
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(arr, visited, i);
    }
  }

  // 输出连通分量的数量
  console.log(count);
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int count = 0;  // 全局变量，用于记录连通分量的数量

// 深度优先搜索函数，递归查找与当前服务器相连的服务器
void dfs(vector<vector<int>>& arr, vector<bool>& visited, int index) {
    visited[index] = true;  // 标记当前服务器为已访问
    bool flag = true;  // 标记是否发现相连的服务器

    // 遍历当前服务器的所有可能相连的服务器
    for (int i = index + 1; i < arr.size(); i++) {
        if (arr[index][i] == 1) {  // 如果服务器 i 和当前服务器直接相连
            flag = false;  // 发现相连服务器，设置 flag 为 false
            dfs(arr, visited, i);  // 递归查找与服务器 i 相连的服务器
        }
    }

    if (flag) {  // 如果 flag 仍然为 true，表示这是一个新的连通分量
        count++;  // 增加连通分量计数
    }
}

int main() {
    string input;
    getline(cin, input);  // 读取输入的第一行
    vector<string> str;  // 用于存储拆分后的字符串
    size_t pos = 0;

    // 将输入按空格拆分存入 str
    while ((pos = input.find(" ")) != string::npos) {
        str.push_back(input.substr(0, pos));
        input.erase(0, pos + 1);
    }
    str.push_back(input);  // 最后一个元素也存入 str

    int n = str.size();  // 服务器数量
    vector<vector<int>> arr(n, vector<int>(n, 0));  // 初始化 n*n 的二维数组

    // 将第一行输入数据存入 arr 的第一行
    for (int i = 0; i < n; i++) {
        arr[0][i] = stoi(str[i]);
    }

    // 读取剩余行并存入 arr
    for (int i = 1; i < n; i++) {
        getline(cin, input);
        pos = 0;
        vector<string> s;
        while ((pos = input.find(" ")) != string::npos) {
            s.push_back(input.substr(0, pos));
            input.erase(0, pos + 1);
        }
        s.push_back(input);  // 最后一个元素也存入 s

        // 将该行数据存入 arr
        for (int j = 0; j < n; j++) {
            arr[i][j] = stoi(s[j]);
        }
    }

    vector<bool> visited(n, false);  // 初始化 visited 数组，标记服务器是否已访问

    // 遍历每个服务器，查找未访问过的服务器并进行 DFS
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(arr, visited, i);
        }
    }

    // 输出连通分量的数量
    cout << count << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int count = 0;  // 全局变量，用于记录连通分量的数量

// 深度优先搜索函数，递归查找与当前服务器相连的服务器
void dfs(int** arr, bool* visited, int n, int index) {
    visited[index] = true;  // 标记当前服务器为已访问
    bool flag = true;  // 标记是否发现相连的服务器

    // 遍历当前服务器的所有可能相连的服务器
    for (int i = index + 1; i < n; i++) {
        if (arr[index][i] == 1) {  // 如果服务器 i 和当前服务器直接相连
            flag = false;  // 发现相连服务器，设置 flag 为 false
            dfs(arr, visited, n, i);  // 递归查找与服务器 i 相连的服务器
        }
    }

    if (flag) {  // 如果 flag 仍然为 true，表示这是一个新的连通分量
        count++;  // 增加连通分量计数
    }
}

int main() {
    char input[1024];
    
    // 读取输入的第一行
    fgets(input, sizeof(input), stdin);

    // 按空格拆分输入的字符串，计算服务器数量
    int n = 0;
    char* token = strtok(input, " ");
    int* str = (int*)malloc(sizeof(int) * 100);  // 假设最多100个服务器

    while (token != NULL) {
        str[n++] = atoi(token);
        token = strtok(NULL, " ");
    }

    // 初始化 n*n 的二维数组
    int** arr = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) {
        arr[i] = (int*)malloc(n * sizeof(int));
        for (int j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }

    // 将第一行输入数据存入 arr 的第一行
    for (int i = 0; i < n; i++) {
        arr[0][i] = str[i];
    }

    // 读取剩余行并存入 arr
    for (int i = 1; i < n; i++) {
        fgets(input, sizeof(input), stdin);
        token = strtok(input, " ");
        for (int j = 0; j < n; j++) {
            arr[i][j] = atoi(token);
            token = strtok(NULL, " ");
        }
    }

    // 初始化 visited 数组，标记服务器是否已访问
    bool* visited = (bool*)malloc(n * sizeof(bool));
    for (int i = 0; i < n; i++) {
        visited[i] = false;
    }

    // 遍历每个服务器，查找未访问过的服务器并进行 DFS
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(arr, visited, n, i);
        }
    }

    // 输出连通分量的数量
    printf("%d\\n", count);

    return 0;
}`},f={id:"36",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:r,examples:e,solution:s,codes:o};export{o as codes,f as default,i as description,l as examType,e as examples,a as id,t as inputDesc,r as outputDesc,u as score,s as solution,n as title};
