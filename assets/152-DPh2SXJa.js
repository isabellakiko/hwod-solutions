const f="152",n="学生方阵",l="A",r=200,t=`学校组织活动，将学生排成一个矩形方阵。
请在矩形方阵中找到最大的位置相连的男生数量。
这个相连位置在一个直线上，方向可以是水平的，垂直的，成对角线的或者呈反对角线的。
注：学生个数不会超过10000
`,e=`输入的第一行为矩阵的行数和列数，接下来的n行为矩阵元素，元素间用”,”分隔。
`,i=`输出一个整数，表示矩阵中最长的位置相连的男生个数。


本题的解题思路其实不难，遍历查找矩阵中每一个M点，然后求该M点的水平、垂直、正对角线、反对角线，四个方向的M点个数，然后保留最大的个数，就是题解。

但是这种方法会存在很多重复的查找，比如

红色M是当前遍历到的M，绿色M是以红色M为原点查找到的M，如上图两个红色M点会重复查找同一条M链。
为了避免这种重复查找，我们可以增加判断：
如果当前M点的

如上图红色M的左上、上、左点都是M，因此红色M的
`,s=[{input:`3,4
M,M,F,M
F,M,M,F
M,F,F,M`,output:"3",explanation:"3行4列矩阵，最长连续M在对角线或水平方向，长度为3"},{input:`2,3
M,M,M
F,F,F`,output:"3",explanation:"第一行水平方向连续3个M"}],o=`**解题思路：**

本题是一道**矩阵遍历**问题。

**核心思路：**
- 遍历每个M点，检查四个方向的连续M数量
- 四个方向：水平、垂直、正对角线、反对角线
- 避免重复计算：检查当前方向的前一个位置是否也是M

**算法步骤：**
1. 遍历矩阵找到每个M点
2. 对每个M点检查4个方向
3. 若该方向前一个位置不是M，则开始计数
4. 沿该方向统计连续M的数量
5. 保留最大值

**时间复杂度**：O(R×C×max(R,C))`,a={java:`import java.util.Scanner;

public class Main {
  static int n;
  static int m;
  static String[][] matrix;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in).useDelimiter("[,\\n]");

    n = sc.nextInt();
    m = sc.nextInt();

    matrix = new String[n][m];
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        matrix[i][j] = sc.next();
      }
    }

    System.out.println(getResult());
  }

  public static int getResult() {
    int ans = 0;

    int[][] offsets = {{0, 1}, {1, 0}, {1, 1}, {1, -1}};

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        if ("M".equals(matrix[i][j])) {
          for (int[] offset : offsets) {
            int oldI = i - offset[0];
            int oldJ = j - offset[1];

            if (oldI >= 0 && oldI < n && oldJ >= 0 && oldJ < m && "M".equals(matrix[oldI][oldJ])) {
              continue;
            }

            int len = 1;
            int newI = i + offset[0];
            int newJ = j + offset[1];

            while (newI >= 0
                && newI < n
                && newJ >= 0
                && newJ < m
                && "M".equals(matrix[newI][newJ])) {
              len++;
              newI += offset[0];
              newJ += offset[1];
            }

            ans = Math.max(ans, len);
          }
        }
      }
    }

    return ans;
  }
}`,python:`# 输入获取
n, m = map(int, input().split(","))
matrix = [input().split(",") for _ in range(n)]


# 算法入口
def getResult():
    ans = 0

    offsets = ((0, 1), (1, 0), (1, 1), (1, -1))

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == "M":
                for offset in offsets:
                    oldI = i - offset[0]
                    oldJ = j - offset[1]

                    if n > oldI >= 0 and m > oldJ >= 0 and matrix[oldI][oldJ] == "M":
                        continue

                    length = 1
                    newI = i + offset[0]
                    newJ = j + offset[1]

                    while n > newI >= 0 and m > newJ >= 0 and matrix[newI][newJ] == "M":
                        length += 1
                        newI += offset[0]
                        newJ += offset[1]

                    ans = max(ans, length)

    return ans


# 调用算法
print(getResult())`,javascript:"",cpp:"",c:""},M={id:"152",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:i,examples:s,solution:o,codes:a};export{a as codes,M as default,t as description,l as examType,s as examples,f as id,e as inputDesc,i as outputDesc,r as score,o as solution,n as title};
