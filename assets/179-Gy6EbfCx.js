const a="179",n="返回矩阵中非1的元素个数",c="",p=200,t=`存在一个m*n的二维数组，其成员取值范围为0，1，2。
其中值为1的元素具备同化特性，每经过1S，将上下左右值为0的元素同化为1。
而值为2的元素，免疫同化。
将数组所有成员随机初始化为0或2，再将矩阵的[0, 0]元素修改成1，在经过足够长的时间后求矩阵中有多少个元素是0或2（即0和2数量之和）。
`,e=`输入的前两个数字是矩阵大小。后面是数字矩阵内容。
`,i=`返回矩阵中非1的元素个数。

输入数字前两个数字是矩阵大小。后面的数字是矩阵内容。
起始位置(0,0)被修改为1后，最终只能同化矩阵为：
1 1 1 1
1 2 2 2
1 2 0 0
1 2 0 0
所以矩阵中非1的元素个数为9

本题可以使用广度优先搜索BFS解决。
关于广度优先搜索，可以看：华为OD机试 - 计算疫情扩散时间（Java & JS & Python）_在一个地图中(地图由n*n个区域组成)_伏城之外的博客-CSDN博客
`,s=[{input:`4 4
0 0 0 0
0 2 2 2
0 2 0 0
0 2 0 0`,output:"9",explanation:"从(0,0)开始同化，2为免疫区域形成屏障，最终有9个非1元素"},{input:`3 3
0 0 0
0 0 0
0 0 0`,output:"0",explanation:"所有区域都被同化为1，非1元素个数为0"}],o=`**解题思路：**

本题是一道**BFS广度优先搜索**问题。

**核心思路：**
- 从(0,0)开始BFS，只同化值为0的元素
- 值为2的元素免疫同化

**算法步骤：**
1. 将(0,0)设为1并入队
2. BFS向四个方向扩散
3. 遇到0则同化为1并入队
4. 返回m*n减去被同化的元素数量

**时间复杂度**：O(M*N)`,u={java:`import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();
    int n = sc.nextInt();

    int[][] matrix = new int[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }

    matrix[0][0] = 1;

    System.out.println(getResult(m, n, matrix));
  }

  public static int getResult(int m, int n, int[][] matrix) {
    // 上、下、左、右偏移量
    int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    // 广搜队列
    LinkedList<int[]> queue = new LinkedList<>();

    // 初始时只有矩阵[0,0]位置元素为1
    queue.add(new int[] {0, 0});

    // count记录矩阵中值为1的元素的个数
    int count = 1;

    // 广搜
    while (queue.size() > 0) {
      int[] pos = queue.removeFirst();

      int x = pos[0];
      int y = pos[1];

      for (int[] offset : offsets) {
        int newX = x + offset[0];
        int newY = y + offset[1];

        if (newX >= 0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] == 0) {
          matrix[newX][newY] = 1;
          count++;
          queue.add(new int[] {newX, newY});
        }
      }
    }

    return m * n - count;
  }
}`,python:`# 输入获取
m, n = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(m)]
matrix[0][0] = 1


# 算法入口
def getResult():
    # 上、下、左、右偏移量
    offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))

    # 广搜队列, 初始时只有矩阵[0,0]位置元素为1
    queue = [[0, 0]]

    # count记录矩阵中值为1的元素的个数
    count = 1

    # 广搜
    while len(queue) > 0:
        x, y = queue.pop(0)

        for offset in offsets:
            newX = x + offset[0]
            newY = y + offset[1]

            if m > newX >= 0 and n > newY >= 0 and matrix[newX][newY] == 0:
                matrix[newX][newY] = 1
                count += 1
                queue.append([newX, newY])

    return m * n - count


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},r={id:"179",title:n,examType:"",score:200,description:t,inputDesc:e,outputDesc:i,examples:s,solution:o,codes:u};export{u as codes,r as default,t as description,c as examType,s as examples,a as id,e as inputDesc,i as outputDesc,p as score,o as solution,n as title};
