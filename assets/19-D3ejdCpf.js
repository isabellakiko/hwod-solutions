const x="19",n="开心消消乐",c="A",a=100,t=`给定一个N行M列的二维矩阵，矩阵中每个位置的数字取值为0或1。矩阵示例如：
1234
现需要将矩阵中所有的1进行反转为0，规则如下：
当点击一个1时，该1便被反转为0，同时相邻的上、下、左、右，以及左上、左下、右上、右下8 个方向的1（如果存在1）均会自动反转为0；进一步地，一个位置上的1被反转为0时，与其相邻的8个方向的1（如果存在1）均会自动反转为0；
按照上述规则示例中的矩阵只最少需要点击2次后，所有值均为0。
请问，给定一个矩阵，最少需要点击几次后，所有数字均为0？`,i=`第一行为两个整数，分别表示句子的行数 N 和列数 M，取值范围均为 [1, 100]
接下来 N 行表示矩阵的初始值，每行均为 M 个数，取值范围 [0, 1]`,r="输出一个整数，表示最少需要点击的次数",e=[{input:`3 3
0 1 0
1 1 1
0 1 0`,output:"1",explanation:"3x3矩阵，中间的1与四周的1都连通（8方向），形成一个连通块，点击一次即可全部变0。"},{input:`4 3
1 0 0
0 0 1
0 1 1
1 1 1`,output:"2",explanation:`4x3矩阵。
左上角的1(0,0)孤立，是一个连通块。
右边的1组成另一个连通块：(0,2)→(1,2)→(2,1)→(2,2)→(3,0)→(3,1)→(3,2)都连通。
共2个连通块，需要点击2次。`}],s=`**解题思路：**

本题是一道**DFS/BFS 连通块计数**问题，类似于 LeetCode 200.岛屿数量。

**核心思想：**
- 点击一个1，会将其所在的整个8方向连通块全部变为0
- 因此，最少点击次数 = 矩阵中1的连通块数量

**算法步骤：**

1. 遍历矩阵的每个位置
2. 遇到1时，连通块计数+1
3. 从该位置进行DFS，将整个连通块的1全部标记为0（已访问）
4. 继续遍历直到结束

**8个方向**：上、下、左、右、左上、左下、右上、右下

**时间复杂度**：O(N*M)，每个格子最多访问一次`,o={java:`import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        // 处理输入
        Scanner in = new Scanner(System.in);
        int rows = in.nextInt(); // 输入矩阵的行数
        int cols = in.nextInt(); // 输入矩阵的列数
        int[][] matrix = new int[rows][cols]; // 定义一个rows行cols列的矩阵
        for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
            for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                matrix[i][j] = in.nextInt(); // 读入矩阵的每一个元素
            }
        }

        int result = 0; // 定义结果变量，表示矩阵中1的连通块数量
        for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
            for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                // 从任意一个位置的1开始遍历
                if (matrix[i][j] == 1) { // 如果当前位置是1
                    result++; // 连通块数量加1
                    dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
                }
            }
        }
        System.out.println(result); // 输出矩阵中1的连通块数量
    }

    public static void dfs(int[][] matrix, int x, int y) {
        matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
        int rows = matrix.length; // 矩阵的行数
        int cols = matrix[0].length; // 矩阵的列数
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}; // 定义8个方向的偏移量
        for (int[] dir : directions) { // 遍历8个方向
            int nextX = x + dir[0]; // 计算下一个位置的行坐标
            int nextY = y + dir[1]; // 计算下一个位置的列坐标
            if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) { // 如果下一个位置在矩阵范围内且值为1
                dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
            }
        }
    }
}`,python:`def dfs(matrix, x, y):
    matrix[x][y] = 0 # 将当前位置的值设为0，表示已经遍历过
    rows, cols = len(matrix), len(matrix[0]) # 矩阵的行数和列数
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)] # 定义8个方向的偏移量
    for dir in directions: # 遍历8个方向
        nextX, nextY = x + dir[0], y + dir[1] # 计算下一个位置的行坐标和列坐标
        if 0 <= nextX < rows and 0 <= nextY < cols and matrix[nextX][nextY] == 1: # 如果下一个位置在矩阵范围内且值为1
            dfs(matrix, nextX, nextY) # 对下一个位置进行深度优先遍历
rows, cols = map(int, input().split()) # 输入矩阵的行数和列数
matrix = [] # 定义一个空列表存放矩阵
for i in range(rows): # 遍历矩阵的每一行
    row = list(map(int, input().split())) # 读入矩阵的每一行
    matrix.append(row) # 将每一行添加到矩阵中

result = 0 # 定义结果变量，表示矩阵中1的连通块数量
for i in range(rows): # 遍历矩阵的每一行
    for j in range(cols): # 遍历矩阵的每一列
        # 从任意一个位置的1开始遍历
        if matrix[i][j] == 1: # 如果当前位置是1
            result += 1 # 连通块数量加1
            dfs(matrix, i, j) # 对以当前位置为起点的连通块进行深度优先遍历

print(result) # 输出矩阵中1的连通块数量`,javascript:`function dfs(matrix, x, y) {
  matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
  const rows = matrix.length;
  const cols = matrix[0].length; // 矩阵的行数和列数
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]; // 定义8个方向的偏移量
  for (let dir of directions) {
    // 遍历8个方向
    const nextX = x + dir[0];
    const nextY = y + dir[1]; // 计算下一个位置的行坐标和列坐标
    if (
      nextX >= 0 &&
      nextX < rows &&
      nextY >= 0 &&
      nextY < cols &&
      matrix[nextX][nextY] === 1
    ) {
      // 如果下一个位置在矩阵范围内且值为1
      dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
    }
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let rows, cols;
let matrix = []; // 定义一个空列表存放矩阵

rl.on("line", (line) => {
  if (!rows && !cols) {
    [rows, cols] = line.split(" ").map(Number); // 输入矩阵的行数和列数
  } else {
    const row = line.split(" ").map(Number); // 读入矩阵的每一行
    matrix.push(row); // 将每一行添加到矩阵中
    if (matrix.length === rows) {
      let result = 0; // 定义结果变量，表示矩阵中1的连通块数量
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // 从任意一个位置的1开始遍历
          if (matrix[i][j] === 1) {
            // 如果当前位置是1
            result += 1; // 连通块数量加1
            dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
          }
        }
      }
      console.log(result); // 输出矩阵中1的连通块数量
      rl.close();
    }
  }
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<int>>& matrix, int x, int y) {
    matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
    int rows = matrix.size(); // 矩阵的行数
    int cols = matrix[0].size(); // 矩阵的列数
    vector<vector<int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}; // 定义8个方向的偏移量
    for (auto dir : directions) { // 遍历8个方向
        int nextX = x + dir[0]; // 计算下一个位置的行坐标
        int nextY = y + dir[1]; // 计算下一个位置的列坐标
        if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) { // 如果下一个位置在矩阵范围内且值为1
            dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
        }
    }
}

int main() {
    // 处理输入
    int rows, cols;
    cin >> rows >> cols; // 输入矩阵的行数和列数
    vector<vector<int>> matrix(rows, vector<int>(cols)); // 定义一个rows行cols列的矩阵
    for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
        for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
            cin >> matrix[i][j]; // 读入矩阵的每一个元素
        }
    }

    int result = 0; // 定义结果变量，表示矩阵中1的连通块数量
    for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
        for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
            // 从任意一个位置的1开始遍历
            if (matrix[i][j] == 1) { // 如果当前位置是1
                result++; // 连通块数量加1
                dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
            }
        }
    }
    cout << result << endl; // 输出矩阵中1的连通块数量
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

#define MAXN 100

int matrix[MAXN][MAXN];
int rows, cols;

// 8个方向的移动向量
int directions[8][2] = {
    {-1, 0}, {1, 0}, {0, -1}, {0, 1}, 
    {-1, -1}, {-1, 1}, {1, -1}, {1, 1}
};

// 深度优先搜索
void dfs(int x, int y) {
    // 将当前位置的值设为0，表示已经遍历过
    matrix[x][y] = 0;

    // 遍历8个方向
    for (int i = 0; i < 8; i++) {
        int nextX = x + directions[i][0];
        int nextY = y + directions[i][1];

        // 判断下一个位置是否在矩阵范围内且值为1
        if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) {
            dfs(nextX, nextY);
        }
    }
}

int main() {
    // 处理输入
    scanf("%d %d", &rows, &cols);

    // 读入矩阵的每一个元素
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    int result = 0; // 定义结果变量，表示矩阵中1的连通块数量

    // 遍历矩阵的每一个元素
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            // 从任意一个位置的1开始遍历
            if (matrix[i][j] == 1) {
                result++; // 连通块数量加1
                dfs(i, j); // 对以当前位置为起点的连通块进行深度优先遍历
            }
        }
    }

    // 输出结果
    printf("%d\\n", result);
    
    return 0;
}`},l={id:"19",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:r,examples:e,solution:s,codes:o};export{o as codes,l as default,t as description,c as examType,e as examples,x as id,i as inputDesc,r as outputDesc,a as score,s as solution,n as title};
