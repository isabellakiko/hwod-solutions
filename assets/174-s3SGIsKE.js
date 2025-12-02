const o="174",n="计算疫情扩散时间",p="A",f=200,t="在一个地图中(地图由n*n个区域组成），有部分区域被感染病菌。 感染区域每天都会把周围（上下左右）的4个区域感染。 请根据给定的地图计算，多少天以后，全部区域都会被感染。 如果初始地图上所有区域全部都被感染，或者没有被感染区域，返回-1",e=`一行N*N个数字（只包含0,1，不会有其他数字）表示一个地图，数字间用,分割，0表示未感染区域，1表示已经感染区域
每N个数字表示地图中一行，输入数据共表示N行N列的区域地图。
例如输入1,0,1,0,0,0,1,0,1，表示地图
123`,i="一个整数，表示经过多少天以后，全部区域都被感染 1<=N<200",a=[{input:"1,0,1,0,0,0,1,0,1",output:"2",explanation:"1天以后，地图中仅剩余中心点未被感染；2天以后，全部被感染。"},{input:"1,1,1,1,1,1,1,1,1",output:"-1",explanation:"全部都感染"}],s=`**解题思路：**

本题是一道**BFS广度优先搜索**问题。

**核心思路：**
- 多源BFS，从所有感染点同时扩散
- 每天向四周扩散一格
- 统计全部感染所需天数

**算法步骤：**
1. 将所有初始感染点入队
2. BFS逐层扩散，每层代表一天
3. 感染未感染的相邻区域
4. 返回扩散完成的天数

**时间复杂度**：O(N²)`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> map = new ArrayList<>();
        int pos = 0;
        String token;
        while ((pos = input.indexOf(",")) != -1) { // 将输入字符串转换为一维数组
            token = input.substring(0, pos);
            map.add(Integer.parseInt(token));
            input = input.substring(pos + 1);
        }
        map.add(Integer.parseInt(input));
        System.out.println(getInfectionDays(map)); // 输出感染天数
    }

    public static int getInfectionDays(List<Integer> map) {
        int n = (int) Math.sqrt(map.size());

        int[][] matrix = new int[n][n]; // 将一维数组转换为二维矩阵

        Queue<int[]> q = new LinkedList<>(); // 用队列存储感染区域

        int healthy = 0; // 记录未感染区域数量

        int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 记录四个方向的偏移量

        for (int i = 0; i < n * n; i++) {
            int x = i / n;
            int y = i % n;
            matrix[x][y] = map.get(i); // 将一维数组转换为二维矩阵
            if (matrix[x][y] == 1) {
                q.offer(new int[]{x, y}); // 将感染区域加入队列
            } else {
                healthy++; // 计算未感染区域数量
            }
        }

        if (healthy == 0 || healthy == n * n) { // 判断特殊情况
            return -1;
        }

        int day = 0; // 记录感染天数
        while (!q.isEmpty() && healthy > 0) { // 当队列不为空且还有未感染区域时，进行循环
            int[] tmp = q.poll(); // 取出队首元素
            int x = tmp[0], y = tmp[1]; // 获取队首元素的坐标
            day = matrix[x][y] + 1; // 记录感染天数

            for (int[] offset : offsets) { // 遍历四个方向
                int newX = x + offset[0]; // 新的横坐标
                int newY = y + offset[1]; // 新的纵坐标

                if (newX >= 0 && newX < n && newY >= 0 && newY < n && matrix[newX][newY] == 0) { // 判断边界和未感染区域
                    healthy--; // 未感染区域数量减一
                    matrix[newX][newY] = day; // 标记该区域已感染
                    q.offer(new int[]{newX, newY}); // 将该区域加入队列
                }
            }
        }

        return day - 1; // 返回感染天数
    }
}`,python:`import math
from queue import Queue

def getInfectionDays(map):
    # 计算地图边长，即每一行（或列）的元素个数
    n = int(math.sqrt(len(map)))
    
    # 构建二维矩阵表示地图，初始值为0
    matrix = [[0 for j in range(n)] for i in range(n)]
    
    # 初始化一个队列，用于存放已感染区域的位置
    q = Queue()
    
    # 遍历地图，将已感染区域的坐标入队，并初始化二维矩阵
    for i in range(n):
        for j in range(n):
            matrix[i][j] = map[i * n + j]
            if matrix[i][j] == 1:
                q.put((i, j))
    
    # 如果队列为空（没有感染区域）或所有区域都已被感染，返回-1
    if q.empty() or q.qsize() == len(map):
        return -1
    
    # 计算未感染区域的数量
    healthy = len(map) - q.qsize()
    
    # 定义四个方向的偏移量（上下左右）
    offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    
    # 初始化天数计数器
    day = 0
    
    # 广度优先搜索，通过队列逐层扩散感染
    while not q.empty() and healthy > 0:
        tmp = q.get()
        x, y = tmp[0], tmp[1]
        day = matrix[x][y] + 1  # 更新天数
        
        # 对当前节点的四个方向进行探索
        for offset in offsets:
            new_x = x + offset[0]
            new_y = y + offset[1]
            
            # 检查新坐标是否越界
            if new_x < 0 or new_x >= n or new_y < 0 or new_y >= n:
                continue
            
            # 如果新坐标的区域未被感染，则将其感染，并将其加入队列
            if matrix[new_x][new_y] == 0:
                healthy -= 1
                matrix[new_x][new_y] = day
                q.put((new_x, new_y))
    
    # 返回全部区域被感染所需的天数，由于最后一天的增加已在循环中完成，故减1
    return day - 1

# 读取输入，并转换成整数列表
input_str = input()
input_list = list(map(int, input_str.split(",")))

# 输出计算结果
print(getInfectionDays(input_list))`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getInfectionDays(map) {
  const n = Math.sqrt(map.length);

  const matrix = new Array(n).fill().map(() => new Array(n)); // 将一维数组转换为二维矩阵

  const q = []; // 用队列存储感染区域

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = map[i * n + j]; // 将一维数组转换为二维矩阵
      if (matrix[i][j] === 1) q.push([i, j]); // 将感染区域加入队列
    }
  }

  if (q.length === 0 || q.length === map.length) { // 判断特殊情况
    return -1;
  }

  let healthy = map.length - q.length; // 记录未感染区域数量

  const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 记录四个方向的偏移量

  let day = 0; // 记录感染天数
  while (q.length > 0 && healthy > 0) { // 当队列不为空且还有未感染区域时，进行循环
    const [x, y] = q.shift(); // 取出队首元素
    day = matrix[x][y] + 1; // 记录感染天数

    for (const offset of offsets) { // 遍历四个方向
      const [dx, dy] = offset;
      const newX = x + dx; // 新的横坐标
      const newY = y + dy; // 新的纵坐标

      if (newX < 0 || newX >= n || newY < 0 || newY >= n) continue; // 判断边界

      if (matrix[newX][newY] === 0) { // 如果该区域未感染
        healthy--; // 未感染区域数量减一
        matrix[newX][newY] = day; // 标记该区域已感染
        q.push([newX, newY]); // 将该区域加入队列
      }
    }
  }

  return day - 1; // 返回感染天数
}

rl.on('line', (input) => {
  const map = input.split(',').map(Number);
  console.log(getInfectionDays(map));
});`,cpp:`#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
using namespace std;

int getInfectionDays(vector<int>& map) {
    int n = sqrt(map.size());

    vector<vector<int>> matrix(n, vector<int>(n)); // 将一维数组转换为二维矩阵

    queue<pair<int, int>> q; // 用队列存储感染区域

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            matrix[i][j] = map[i * n + j]; // 将一维数组转换为二维矩阵
            if (matrix[i][j] == 1) q.push({i, j}); // 将感染区域加入队列
        }
    }

    if (q.empty() || q.size() == map.size()) { // 判断特殊情况
        return -1;
    }

    int healthy = map.size() - q.size(); // 记录未感染区域数量

    vector<vector<int>> offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 记录四个方向的偏移量

    int day = 0; // 记录感染天数
    while (!q.empty() && healthy > 0) { // 当队列不为空且还有未感染区域时，进行循环
        pair<int, int> tmp = q.front(); // 取出队首元素
        q.pop(); // 弹出队首元素
        int x = tmp.first, y = tmp.second; // 获取队首元素的坐标
        day = matrix[x][y] + 1; // 记录感染天数

        for (vector<int>& offset : offsets) { // 遍历四个方向
            int newX = x + offset[0]; // 新的横坐标
            int newY = y + offset[1]; // 新的纵坐标

            if (newX < 0 || newX >= n || newY < 0 || newY >= n) continue; // 判断边界

            if (matrix[newX][newY] == 0) { // 如果该区域未感染
                healthy--; // 未感染区域数量减一
                matrix[newX][newY] = day; // 标记该区域已感染
                q.push({newX, newY}); // 将该区域加入队列
            }
        }
    }

    return day - 1; // 返回感染天数
}

int main() {
    string input;
    getline(cin, input);
    vector<int> map;
    size_t pos = 0;
    string token;
    while ((pos = input.find(",")) != string::npos) { // 将输入字符串转换为一维数组
        token = input.substr(0, pos);
        map.push_back(stoi(token));
        input.erase(0, pos + 1);
    }
    map.push_back(stoi(input));
    cout << getInfectionDays(map) << endl; // 输出感染天数
    return 0;
}`,c:""},m={id:"174",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:i,examples:a,solution:s,codes:r};export{r as codes,m as default,t as description,p as examType,a as examples,o as id,e as inputDesc,i as outputDesc,f as score,s as solution,n as title};
