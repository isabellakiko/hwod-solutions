const a="123",n="战场索敌",f="A",m=200,i=`有一个大小是N*M的战场地图，被墙壁 ‘#’ 分隔成大小不同的区域，上下左右四个方向相邻的空地 ‘.’ 属于同一个区域，只有空地上可能存在敌人’E”，
请求出地图上总共有多少区域里的敌人数小于K。`,t=`第一行输入为N,M,K；
N表示地图的行数，M表示地图的列数， K表示目标敌人数量N，M<=100
之后为一个NxM大小的字符数组。`,e="敌人数小于K的区域数量",s=[{input:`3 5 2
..#EE
E.#E.
###..`,output:"1",explanation:"地图被#分为两个区域，左边1个敌人<2，右边3个敌人>=2，符合条件的区域数为1"}],o=`**解题思路：**

本题是一道**DFS连通区域**问题。

**核心思路：**
- 用DFS遍历每个连通区域
- 统计区域内敌人E的数量
- 敌人数<K的区域计入答案

**算法步骤：**
1. 遍历地图每个格子
2. 未访问且非墙壁时启动DFS
3. DFS统计该连通区域的敌人数
4. 敌人数<K则答案+1

**时间复杂度**：O(N×M)`,r={java:`import java.util.Scanner;

public class Main {
    // 定义地图的行数、列数和目标敌人数量
    private static int n, m, k;
    // 定义存储地图的二维字符数组
    private static char[][] matrix;
    // 定义标记访问状态的二维数组
    private static int[][] visited;
    // 记录当前区域的敌人数量
    private static int enemyCount;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 读取地图的行数n、列数m和目标敌人数量k
        n = scanner.nextInt();
        m = scanner.nextInt();
        k = scanner.nextInt();

        // 初始化地图矩阵和访问标记数组
        matrix = new char[n][m];
        visited = new int[n][m];

        // 读取地图矩阵数据
        for (int i = 0; i < n; i++) {
            String row = scanner.next();
            for (int j = 0; j < m; j++) {
                matrix[i][j] = row.charAt(j); // 逐字符读取地图
            }
        }

        int ans = 0; // 初始化符合条件的区域计数

        // 遍历地图中的每个位置
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // 如果当前格子已经访问过或是墙壁，跳过
                if (visited[i][j] != 0 || matrix[i][j] == '#') {
                    continue;
                }
                enemyCount = 0; // 初始化当前区域的敌人计数
                dfs(i, j); // 深度优先搜索该区域
                // 如果该区域的敌人数小于k，则该区域符合条件
                ans += enemyCount < k ? 1 : 0;
            }
        }

        // 输出符合条件的区域数量
        System.out.println(ans);
    }

    // 深度优先搜索函数，从(i, j)位置开始计算敌人数
    public static void dfs(int i, int j) {
        visited[i][j] = 1; // 将当前位置标记为已访问

        // 如果当前位置是敌人，增加敌人计数
        if (matrix[i][j] == 'E') {
            enemyCount++;
        }

        // 定义四个方向的偏移量：上、下、左、右
        int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // 遍历四个相邻方向
        for (int[] offset : offsets) {
            int newX = i + offset[0];
            int newY = j + offset[1];

            // 检查相邻位置是否在地图范围内，未访问过且不是墙壁
            if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
                dfs(newX, newY); // 递归访问相邻位置
            }
        }
    }
}`,python:`import sys

def dfs(i, j):
    visited[i][j] = 1  # 标记当前位置已访问

    if matrix[i][j] == 'E':  # 如果当前位置是敌人，增加敌人数量
        global enemyCount
        enemyCount += 1

    offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]  # 定义上下左右四个方向

    # 遍历四个方向，检查相邻格子
    for offset in offsets:
        newX = i + offset[0]
        newY = j + offset[1]

        # 检查相邻格子是否在范围内、未访问且不是墙壁
        if newX >= 0 and newX < n and newY >= 0 and newY < m and visited[newX][newY] == 0 and matrix[newX][newY] != '#':
            dfs(newX, newY)  # 递归访问相邻格子

# 读取地图行数、列数和目标敌人数量
n, m, k = map(int, input().split())

matrix = []  # 初始化地图矩阵
visited = [[0] * m for _ in range(n)]  # 初始化访问标记数组

# 读取地图数据
for _ in range(n):
    row = input()
    matrix.append(list(row))

ans = 0  # 初始化符合条件的区域计数

# 遍历地图的每个格子
for i in range(n):
    for j in range(m):
        # 如果该格子已访问或是墙壁，跳过
        if visited[i][j] != 0 or matrix[i][j] == '#':
            continue
        enemyCount = 0  # 初始化敌人数量
        dfs(i, j)  # 深度优先搜索
        # 如果该区域敌人数小于k，则符合条件
        ans += 1 if enemyCount < k else 0

# 输出符合条件的区域数量
print(ans)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n, m, k;
let matrix = [];
let visited = [];

rl.on('line', (line) => {
  if (!n) {
    [n, m, k] = line.split(' ').map(Number);  // 读取地图行数、列数和敌人数量
    visited = Array.from({ length: n }, () => Array(m).fill(false));  // 初始化访问标记数组
  } else {
    matrix.push(line.split(''));  // 读取地图矩阵
  }
}).on('close', () => {
  const enemyCount = { count: 0 };  // 用于记录敌人数量的对象

  // 深度优先搜索函数
  function dfs(i, j) {
    visited[i][j] = true;  // 标记为已访问

    if (matrix[i][j] === 'E') {
      enemyCount.count++;  // 如果是敌人，增加计数
    }

    const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];  // 定义四个方向

    // 遍历四个相邻方向
    for (const offset of offsets) {
      const newX = i + offset[0];
      const newY = j + offset[1];

      // 检查是否在地图范围内且未访问
      if (newX >= 0 && newX < n && newY >= 0 && newY < m && !visited[newX][newY] && matrix[newX][newY] !== '#') {
        dfs(newX, newY);  // 递归搜索
      }
    }
  }

  let ans = 0;  // 记录符合条件的区域数量

  // 遍历地图的每个格子
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || matrix[i][j] === '#') {
        continue;  // 如果已访问或是墙壁，跳过
      }
      enemyCount.count = 0;  // 初始化敌人计数
      dfs(i, j);  // 深度优先搜索
      ans += enemyCount.count < k ? 1 : 0;  // 判断是否符合条件
    }
  }

  console.log(ans);  // 输出结果
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int n, m, k;  // 地图行数、列数和目标敌人数量
vector<vector<char>> matrix;  // 存储地图的二维数组
vector<vector<int>> visited;  // 标记访问状态的二维数组
int enemyCount;  // 记录当前区域敌人的数量

// 深度优先搜索函数，从(i, j)开始计算该区域的敌人数
void dfs(int i, int j) {
    visited[i][j] = 1;  // 标记当前位置为已访问
    
    if (matrix[i][j] == 'E') {
        enemyCount++;  // 如果当前位置是敌人，增加计数
    }
    
    vector<vector<int>> offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};  // 定义四个方向

    // 遍历相邻的四个方向
    for (vector<int> offset : offsets) {
        int newX = i + offset[0];
        int newY = j + offset[1];
        
        // 检查新位置是否在地图范围内，且未访问过且不是墙壁
        if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
            dfs(newX, newY);  // 递归访问相邻位置
        }
    }
}

int main() {
    cin >> n >> m >> k;  // 读取地图行数、列数和目标敌人数量
    
    matrix.resize(n, vector<char>(m));  // 初始化地图矩阵
    visited.resize(n, vector<int>(m));  // 初始化访问标记数组
    
    // 读取地图数据
    for (int i = 0; i < n; i++) {
        string row;
        cin >> row;
        for (int j = 0; j < m; j++) {
            matrix[i][j] = row[j];  // 将地图数据存入矩阵
        }
    }
    
    int ans = 0;  // 记录符合条件的区域数量
    
    // 遍历地图的每个格子
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (visited[i][j] != 0 || matrix[i][j] == '#') {
                continue;  // 如果已经访问或是墙壁，跳过
            }
            enemyCount = 0;  // 初始化敌人计数
            dfs(i, j);  // 深度优先搜索
            ans += enemyCount < k ? 1 : 0;  // 判断该区域是否符合条件
        }
    }
    
    cout << ans << endl;  // 输出符合条件的区域数量
    
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int n, m, k;  // 地图行数、列数和目标敌人数量
char **matrix;  // 存储地图的二维数组
int **visited;  // 标记访问状态的二维数组
int enemyCount;  // 记录当前区域敌人的数量

// 深度优先搜索函数，从(i, j)开始计算该区域的敌人数
void dfs(int i, int j) {
    visited[i][j] = 1;  // 标记当前位置为已访问

    if (matrix[i][j] == 'E') {
        enemyCount++;  // 如果当前位置是敌人，增加计数
    }

    int offsets[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};  // 定义四个方向

    // 遍历相邻的四个方向
    for (int d = 0; d < 4; d++) {
        int newX = i + offsets[d][0];
        int newY = j + offsets[d][1];

        // 检查新位置是否在地图范围内，且未访问过且不是墙壁
        if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
            dfs(newX, newY);  // 递归访问相邻位置
        }
    }
}

int main() {
    // 读取地图行数、列数和目标敌人数量
    scanf("%d %d %d", &n, &m, &k);

    // 初始化地图矩阵
    matrix = (char **)malloc(n * sizeof(char *));
    for (int i = 0; i < n; i++) {
        matrix[i] = (char *)malloc((m + 1) * sizeof(char));  // 额外分配1个字符存储字符串终止符
    }

    // 初始化访问标记数组
    visited = (int **)malloc(n * sizeof(int *));
    for (int i = 0; i < n; i++) {
        visited[i] = (int *)malloc(m * sizeof(int));
    }

    // 读取地图数据
    for (int i = 0; i < n; i++) {
        scanf("%s", matrix[i]);  // 直接读取一整行字符串
    }

    int ans = 0;  // 记录符合条件的区域数量

    // 遍历地图的每个格子
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (visited[i][j] != 0 || matrix[i][j] == '#') {
                continue;  // 如果已经访问或是墙壁，跳过
            }
            enemyCount = 0;  // 初始化敌人计数
            dfs(i, j);  // 深度优先搜索
            ans += (enemyCount < k) ? 1 : 0;  // 判断该区域是否符合条件
        }
    }

    printf("%d\\n", ans);  // 输出符合条件的区域数量

    // 释放动态分配的内存
    for (int i = 0; i < n; i++) {
        free(matrix[i]);
        free(visited[i]);
    }
    free(matrix);
    free(visited);

    return 0;
}`},c={id:"123",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:s,solution:o,codes:r};export{r as codes,c as default,i as description,f as examType,s as examples,a as id,t as inputDesc,e as outputDesc,m as score,o as solution,n as title};
