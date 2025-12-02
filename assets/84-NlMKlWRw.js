const u="84",n="矩阵扩散",o="A",m=100,e=`存在一个m×n的二维数组，其成员取值范围为0或1。
其中值为1的成员具备扩散性，每经过1S，将上下左右值为0的成员同化为1。
二维数组的成员初始值都为0，将第[i,j]和[k,l]两个个位置上元素修改成1后，求矩阵的所有元素变为1需要多长时间。
`,t=`输入数据中的前2个数字表示这是一个m×n的矩阵，m和n不会超过1024大小；
中间两个数字表示一个初始扩散点位置为i,j；
最后2个数字表示另一个扩散点位置为k,l。
`,i="输出矩阵的所有元素变为1所需要秒数。",r=[{input:"4,4,0,0,3,3",output:"3",explanation:"4×4矩阵，扩散点在(0,0)和(3,3)对角，各需3秒到达中心，总共3秒。"},{input:"3,3,1,1,1,1",output:"2",explanation:"3×3矩阵，两个扩散点重合在中心(1,1)，向四周扩散2秒覆盖全部。"},{input:"2,2,0,0,1,1",output:"1",explanation:"2×2矩阵，扩散点在对角，1秒后全部覆盖。"}],a=`**解题思路：**

本题是一道**多源BFS**问题。

**算法步骤：**
1. 初始化矩阵，将两个扩散点标记为1
2. 将两个扩散点加入BFS队列
3. 每轮遍历队列中所有点，向上下左右扩散
4. 新被扩散的点加入下一轮队列
5. 统计轮数直到所有点被覆盖

**时间复杂度**：O(M×N)`,s={java:`import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    Integer[] arr =
        Arrays.stream(sc.next().split(",")).map(Integer::parseInt).toArray(Integer[]::new);

    System.out.println(getResult(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]));
  }

  /**
   * @param m m m×n的二维数组
   * @param n n m×n的二维数组
   * @param i 扩散点位置为i,j
   * @param j 扩散点位置为i,j
   * @param k 扩散点位置为k,l
   * @param l 扩散点位置为k,l
   * @return 扩散所有点需要的时间
   */
  public static int getResult(int m, int n, int i, int j, int k, int l) {
    int[][] matrix = new int[m][n];
    matrix[i][j] = 1;
    matrix[k][l] = 1;

    // count记录未被扩散的点的数量
    int count = m * n - 2;

    // 多源BFS实现队列
    LinkedList<int[]> queue = new LinkedList<>();
    queue.addLast(new int[] {i, j});
    queue.addLast(new int[] {k, l});

    // 上下左右偏移量
    int[][] offsets = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    int day = 0;
    // 如果扩散点没有了，或者所有点已被扩散，则停止循环
    while (queue.size() > 0 && count > 0) {
      LinkedList<int[]> newQueue = new LinkedList<>();

      for (int[] pos : queue) {
        int x = pos[0];
        int y = pos[1];

        for (int[] offset : offsets) {
          int newX = x + offset[0];
          int newY = y + offset[1];

          if (newX >= 0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] == 0) {
            // 将点被扩散的时间记录为该点的值
            matrix[newX][newY] = 1;
            // 被扩散到的点将变为新的扩散源
            newQueue.addLast(new int[] {newX, newY});
            // 未被扩散点的数量--
            count--;
          }
        }
      }

      queue = newQueue;
      day++;
    }

    return day;
  }
}`,python:`# 输入获取
m, n, i, j, k, l = map(int, input().split(","))


# 算法入口
def getResult(m, n, i, j, k, l):
    """
    :param m: 矩阵行数
    :param n: 矩阵列数
    :param i: 扩散点1行号
    :param j: 扩散点1列好
    :param k: 扩散点2行号
    :param l: 扩散点2列号
    :return: 矩阵的所有元素变为1所需要秒数
    """
    matrix = [[0 for _ in range(n)] for _ in range(m)]
    matrix[i][j] = 1
    matrix[k][l] = 1

    # count记录未被扩散的点的数量
    count = m * n - 2

    # 多源BFS实现队列
    queue = [[i, j], [k, l]]

    # 上下左右偏移量
    offsets = ((1, 0), (-1, 0), (0, 1), (0, -1))

    day = 0

    # 如果扩散点没有了，或者所有点已被扩散，则停止循环
    while len(queue) > 0 and count > 0:
        newQueue = []

        for x, y in queue:
            for offsetX, offsetY in offsets:
                newX = x + offsetX
                newY = y + offsetY

                if 0 <= newX < m and 0 <= newY < n and matrix[newX][newY] == 0:
                    # 将点被扩散的时间记录为该点的值
                    matrix[newX][newY] = 1
                    # 被扩散到的点将变为新的扩散源
                    newQueue.append([newX, newY])
                    # 未被扩散点的数量--
                    count -= 1

        queue = newQueue
        day += 1

    return day


# 算法调用
print(getResult(m, n, i, j, k, l))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [m, n, i, j, k, l] = line.split(",").map(Number);
  console.log(getResult(m, n, i, j, k, l));
});

/**
 * @param {*} m m×n的二维数组
 * @param {*} n m×n的二维数组
 * @param {*} i 扩散点位置为i,j
 * @param {*} j 扩散点位置为i,j
 * @param {*} k 扩散点位置为k,l
 * @param {*} l 扩散点位置为k,l
 */
function getResult(m, n, i, j, k, l) {
  const matrix = new Array(m).fill(0).map(() => new Array(n).fill(0));
  matrix[i][j] = 1;
  matrix[k][l] = 1;

  // count记录未被扩散的点的数量
  let count = m * n - 2;

  // 多源BFS实现队列
  let queue = [
    [i, j],
    [k, l],
  ];

  // 上下左右偏移量
  const offsets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let day = 0;

  // 如果扩散点没有了，或者所有点已被扩散，则停止循环
  while (queue.length > 0 && count > 0) {
    const newQueue = [];

    for (const [x, y] of queue) {
      for (let [offsetX, offsetY] of offsets) {
        const newX = x + offsetX;
        const newY = y + offsetY;

        if (
          newX >= 0 &&
          newX < m &&
          newY >= 0 &&
          newY < n &&
          matrix[newX][newY] == 0
        ) {
          // 将点被扩散的时间记录为该点的值
          matrix[newX][newY] = 1;
          // 被扩散到的点将变为新的扩散源
          newQueue.push([newX, newY]);
          // 未被扩散点的数量--
          count--;
        }
      }
    }

    queue = newQueue;
    day++;
  }

  return day;
}`,cpp:`#include <iostream>
#include <queue>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    int arr[6], idx = 0;
    stringstream ss(line);
    string token;
    while (getline(ss, token, ',')) {
        arr[idx++] = stoi(token);
    }
    
    int m = arr[0], n = arr[1];
    int i = arr[2], j = arr[3], k = arr[4], l = arr[5];
    
    vector<vector<int>> matrix(m, vector<int>(n, 0));
    matrix[i][j] = 1;
    matrix[k][l] = 1;
    
    int count = m * n - 2;
    queue<pair<int,int>> q;
    q.push({i, j});
    q.push({k, l});
    
    int offsets[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    int day = 0;
    
    while (!q.empty() && count > 0) {
        int size = q.size();
        for (int s = 0; s < size; s++) {
            auto [x, y] = q.front();
            q.pop();
            for (auto& off : offsets) {
                int nx = x + off[0], ny = y + off[1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && matrix[nx][ny] == 0) {
                    matrix[nx][ny] = 1;
                    q.push({nx, ny});
                    count--;
                }
            }
        }
        day++;
    }
    
    cout << day << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char line[100];
    fgets(line, sizeof(line), stdin);
    
    int arr[6], idx = 0;
    char* token = strtok(line, ",");
    while (token) {
        arr[idx++] = atoi(token);
        token = strtok(NULL, ",");
    }
    
    int m = arr[0], n = arr[1];
    int si = arr[2], sj = arr[3], sk = arr[4], sl = arr[5];
    
    int matrix[1024][1024] = {0};
    matrix[si][sj] = 1;
    matrix[sk][sl] = 1;
    
    int count = m * n - 2;
    int queueX[1024*1024], queueY[1024*1024];
    int front = 0, rear = 0;
    queueX[rear] = si; queueY[rear++] = sj;
    queueX[rear] = sk; queueY[rear++] = sl;
    
    int offsets[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    int day = 0;
    
    while (front < rear && count > 0) {
        int size = rear - front;
        for (int s = 0; s < size; s++) {
            int x = queueX[front], y = queueY[front++];
            for (int d = 0; d < 4; d++) {
                int nx = x + offsets[d][0], ny = y + offsets[d][1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && matrix[nx][ny] == 0) {
                    matrix[nx][ny] = 1;
                    queueX[rear] = nx;
                    queueY[rear++] = ny;
                    count--;
                }
            }
        }
        day++;
    }
    
    printf("%d\\n", day);
    return 0;
}`},l={id:"84",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:r,solution:a,codes:s};export{s as codes,l as default,e as description,o as examType,r as examples,u as id,t as inputDesc,i as outputDesc,m as score,a as solution,n as title};
