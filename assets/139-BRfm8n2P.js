const a="139",n="计算网络信号信号强度",c="A",l=200,i=`网络信号经过传递会逐层衰减，且遇到阻隔物无法直接穿透，在此情况下需要计算某个位置的网络信号值。 注意:网络信号可以绕过阻隔物。
array[m][n] 的二维数组代表网格地图，array[i][j] = 0代表i行j列是空旷位置;array[i][j] = x(x为正整数)代表i行j列是信号源，信号强度是x;array[i][j] = -1代表i行j列是阻隔物。信号源只有1个，阻隔物可能有0个或多个网络信号衰减是上下左右相邻的网格衰减1
现要求输出对应位置的网络信号值。`,e=`输入为三行，
第一行为 m 、n ，代表输入是一个 m × n 的数组。第二行是一串 m × n 个用空格分隔的整数。每连续 n 个数代表一行，再往后 n 个代表下一行，以此类推。对应的值代表对应的网格是空旷位置，还是信号源，还是阻隔物。第三行是 i 、 j，代表需要计算array[i][j]的网络信号值。
注意：此处 i 和 j 均从 0 开始，即第一行 i 为 0。
123
代表如下地图

需要输出第1行第4列的网络信号值，值为2。
`,t=`输出对应位置的网络信号值，如果网络信号未覆盖到，也输出0。
一个网格如果可以途径不同的传播衰减路径传达，取较大的值作为其信号值。`,r=[{input:`6 5
0 0 0 -1 0 0 0 0 0 0 0 -1 4 0 0 0 0 0 0 0 0 0 0 -1 0 0 0 0 0 0
1 4`,output:"2",explanation:"信号源在(2,2)位置强度为4，到(1,4)需绕过阻隔物，最短路径衰减后强度为2"},{input:`3 3
0 0 0 0 5 0 0 0 0
0 0`,output:"3",explanation:"信号源在(1,1)强度5，到(0,0)距离2，信号强度为5-2=3"}],s=`**解题思路：**

本题是一道**BFS广度优先搜索**问题。

**核心思路：**
- 信号从信号源向四周扩散，每传一格衰减1
- 遇到阻隔物(-1)无法穿透但可绕行
- BFS保证找到最短路径即最大信号强度

**算法步骤：**
1. 找到信号源位置，加入BFS队列
2. 向四个方向扩散，空位置(0)设为当前强度-1
3. 阻隔物(-1)跳过，已访问位置跳过
4. 返回目标位置的信号值

**时间复杂度**：O(M×N)`,o={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int rows = scanner.nextInt();
        int cols = scanner.nextInt();

        // 创建一个大小为 rows*cols 的数组，存储矩阵中每个位置的信号强度
        int[] signalStrength = new int[rows * cols];
        // 创建一个队列，存储所有信号源的位置
        Queue<int[]> sourcePositions = new LinkedList<>();

        // 读入矩阵并找到信号源位置
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                signalStrength[i * cols + j] = scanner.nextInt();
                // 如果该位置的信号强度大于 0，说明这是一个信号源的位置，将其加入队列
                if (signalStrength[i * cols + j] > 0) {
                    sourcePositions.offer(new int[]{i, j});
                }
            }
        }

        // 广度优先搜索传播信号
        while (!sourcePositions.isEmpty()) {
            // 取出队列头部的位置
            int[] pos = sourcePositions.poll();
            int i = pos[0], j = pos[1];

            // 如果信号强度为1，则不需要再传播了，后面肯定都是0
            if (signalStrength[i * cols + j] == 1) {
                break;
            }

            // 信号可以上下左右传播，存储四个方向的偏移量
            int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

            // 遍历四个方向
            for (int[] direction : directions) {
                // 计算新位置的坐标
                int newI = i + direction[0], newJ = j + direction[1];
                // 如果新位置在矩阵范围内，且该位置的信号强度为0，说明可以传播到该位置
                if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols && signalStrength[newI * cols + newJ] == 0) {
                    // 将该位置的信号强度设为当前位置的信号强度减1，并将其加入队列
                    signalStrength[newI * cols + newJ] = signalStrength[i * cols + j] - 1;
                    sourcePositions.offer(new int[]{newI, newJ});
                }
            }
        }

        // 输出目标位置的信号强度
        int targetRow = scanner.nextInt(), targetCol = scanner.nextInt();
        System.out.println(signalStrength[targetRow * cols + targetCol]);
    }
}`,python:`# 输入获取，读入网格地图大小、地图数据和目标位置
num_rows, num_cols = map(int, input().split())
grid_map = list(map(int, input().split()))
target_pos = list(map(int, input().split()))

# 算法入口
def get_signal_strength(map_array, num_rows, num_cols, target_pos):
    # 初始化队列，将所有信号源位置加入队列
    queue = [[i, j] for j in range(num_cols) for i in range(num_rows) if map_array[i*num_cols+j] > 0]
    # 定义四个方向偏移量
    directions = ((-1, 0), (1, 0), (0, -1), (0, 1))

    # 广度优先搜索
    while queue:
        new_queue = []
        for i, j in queue:
            signal_strength = map_array[i*num_cols+j] - 1  # 计算信号强度
            for dx, dy in directions:
                new_i, new_j = i+dx, j+dy  # 计算新位置
                if 0 <= new_i < num_rows and 0 <= new_j < num_cols and map_array[new_i*num_cols+new_j] == 0:
                    # 如果新位置在地图内且为空旷位置，则更新该位置信号强度并将其加入队列
                    map_array[new_i*num_cols+new_j] = signal_strength
                    new_queue.append([new_i, new_j])
        queue = new_queue
        
    # 返回目标位置的信号强度（如果未被覆盖到则返回0）
    target_row, target_col = target_pos
    return max(0, map_array[target_row*num_cols+target_col])

# 算法调用，输出结果
print(get_signal_strength(grid_map, num_rows, num_cols, target_pos))`,javascript:`// 创建 readline 接口
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let m, n;
let matrix = []; // 保存输入的二维数组
let posQueue = []; // 保存信号源的位置

// 监听命令行输入
rl.on('line', (line) => {
    if (!m) { // 第一行为矩阵行列数
        [m, n] = line.trim().split(' ').map(Number);
    } else if (matrix.length < m * n) { // 保存输入的二维数组
        matrix.push(...line.trim().split(' ').map(Number));
        if (matrix.length === m * n) { // 找出所有信号源的位置
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    if (matrix[i * n + j] > 0) {
                        posQueue.push([i, j]);
                    }
                }
            }
        }
    } else { // 处理需要计算的位置
        const [target_i, target_j] = line.trim().split(' ').map(Number);
        while (posQueue.length > 0) { // 广度优先搜索信号源的传播路径
            const [i, j] = posQueue.shift();
            if (matrix[i * n + j] === 1) { // 当前是信号源，不再向外扩散
                break;
            }
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 四个方向
            for (const [dx, dy] of directions) { // 向四个方向扩散
                const new_i = i + dx, new_j = j + dy;
                if (new_i >= 0 && new_i < m && new_j >= 0 && new_j < n && matrix[new_i * n + new_j] === 0) { // 可以传播到该位置
                    matrix[new_i * n + new_j] = matrix[i * n + j] - 1; // 计算信号值
                    posQueue.push([new_i, new_j]); // 将该位置加入队列
                }
            }
        }
        console.log(matrix[target_i * n + target_j]); // 输出目标位置的信号值
        rl.close(); // 关闭 readline 接口
    }
});`,cpp:`#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int rows, cols;
    cin >> rows >> cols;

    // 创建一个大小为 rows*cols 的 vector，存储矩阵中每个位置的信号强度
    vector<int> signal_strength(rows * cols);
    // 创建一个队列，存储所有信号源的位置
    queue<pair<int, int>> source_positions;

    // 读入矩阵并找到信号源位置
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cin >> signal_strength[i * cols + j];
            // 如果该位置的信号强度大于 0，说明这是一个信号源的位置，将其加入队列
            if (signal_strength[i * cols + j] > 0) {
                source_positions.push({i, j});
            }
        }
    }

    // 广度优先搜索传播信号
    while (!source_positions.empty()) {
        // 取出队列头部的位置
        auto [i, j] = source_positions.front();
        source_positions.pop();

        // 如果信号强度为1，则不需要再传播了，后面肯定都是0
        if (signal_strength[i * cols + j] == 1) {
            break;
        }

        // 信号可以上下左右传播，存储四个方向的偏移量
        vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // 遍历四个方向
        for (auto [dx, dy] : directions) {
            // 计算新位置的坐标
            int new_i = i + dx, new_j = j + dy;
            // 如果新位置在矩阵范围内，且该位置的信号强度为0，说明可以传播到该位置
            if (new_i >= 0 && new_i < rows && new_j >= 0 && new_j < cols && signal_strength[new_i * cols + new_j] == 0) {
                // 将该位置的信号强度设为当前位置的信号强度减1，并将其加入队列
                signal_strength[new_i * cols + new_j] = signal_strength[i * cols + j] - 1;
                source_positions.push({new_i, new_j});
            }
        }
    }

    // 输出目标位置的信号强度
    int target_row, target_col;
    cin >> target_row >> target_col;
    cout << signal_strength[target_row * cols + target_col] << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int main() {
    int m, n;

    // 读取矩阵的行数和列数
    scanf("%d %d", &m, &n);

    // 创建一个大小为 m*n 的数组，用于存储矩阵的信号强度
    int *matrix = (int *)malloc(m * n * sizeof(int));
    
    // 创建两个数组来充当队列，分别存储信号源的行坐标和列坐标
    int *queueX = (int *)malloc(m * n * sizeof(int));
    int *queueY = (int *)malloc(m * n * sizeof(int));
    int front = 0, rear = 0;  // 队列的头和尾索引

    // 读入矩阵并找到所有信号源的位置
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &matrix[i * n + j]);
            // 如果该位置的信号强度大于 0，说明这是一个信号源，将其加入队列
            if (matrix[i * n + j] > 0) {
                queueX[rear] = i;  // 存储行坐标
                queueY[rear] = j;  // 存储列坐标
                rear++;  // 队尾后移
            }
        }
    }

    // 读取目标位置
    int target_i, target_j;
    scanf("%d %d", &target_i, &target_j);

    // 广度优先搜索（BFS）传播信号
    while (front < rear) {  // 当队列不为空时
        int i = queueX[front];
        int j = queueY[front];
        front++;  // 队头前移

        // 如果当前位置的信号强度为1，则不再向外扩散
        if (matrix[i * n + j] == 1) {
            continue;
        }

        // 信号可以向上下左右传播，定义四个方向的偏移量
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // 遍历四个方向，检查信号传播的可能性
        for (int d = 0; d < 4; d++) {
            int new_i = i + directions[d][0];
            int new_j = j + directions[d][1];

            // 检查新位置是否在矩阵范围内，并且信号强度为0，说明可以传播到该位置
            if (new_i >= 0 && new_i < m && new_j >= 0 && new_j < n && matrix[new_i * n + new_j] == 0) {
                // 将该位置的信号强度设为当前位置的信号强度减1，并将其加入队列
                matrix[new_i * n + new_j] = matrix[i * n + j] - 1;
                queueX[rear] = new_i;
                queueY[rear] = new_j;
                rear++;  // 队尾后移
            }
        }
    }

    // 输出目标位置的信号强度
    printf("%d\\n", matrix[target_i * n + target_j]);

    // 释放动态分配的内存
    free(matrix);
    free(queueX);
    free(queueY);

    return 0;
}`},u={id:"139",title:n,examType:"A",score:200,description:i,inputDesc:e,outputDesc:t,examples:r,solution:s,codes:o};export{o as codes,u as default,i as description,c as examType,r as examples,a as id,e as inputDesc,t as outputDesc,l as score,s as solution,n as title};
