const a="219",n="竖直四子棋",l="B",o=200,r=`竖直四子棋的棋盘是竖立起来的，双方轮流选择棋盘的一列下子，棋子因重力落到棋盘底部或者其他棋子之上，当一列的棋子放满时，无法再在这列上下子。
一方的4个棋子横、竖或者斜方向连成一线时获胜。
现给定一个棋盘和红蓝对弈双方的下子步骤，判断红方或蓝方是否在某一步获胜。
下面以一个6×5的棋盘图示说明落子过程：

下面给出横、竖和斜方向四子连线的图示：

`,t=`输入为2行，第一行指定棋盘的宽和高，为空格分隔的两个数字；
第二行依次间隔指定红蓝双方的落子步骤，第1步为红方的落子，第2步为蓝方的落子，第3步为红方的落子，以此类推。
步骤由空格分隔的一组数字表示，每个数字为落子的列的编号（最左边的列编号为1，往右递增）。用例保证数字均为32位有符号数。
`,e=`如果落子过程中红方获胜，输出 N,red ；
如果落子过程中蓝方获胜，输出 N,blue ；
如果出现非法的落子步骤，输出 N,error。
N为落子步骤的序号，从1开始。如果双方都没有获胜，输出 0,draw 。
非法落子步骤有两种，一是列的编号超过棋盘范围，二是在一个已经落满子的列上落子。
N和单词red、blue、draw、error之间是英文逗号连接。


纯逻辑题，我们只需要构造一个矩阵，并按照第二行输入来落子，需要注意的是，当第7个及以后的落子，才可能会产生四连击，因此四连击判断放在step>=7中判断。
另外，关于四连击的判断，要检查四个方向：
同时，需要以落子位置为中心，向当前方向两端发散检查。

自测用例
5 5
1 2 1 3 1 1 2 4 5 3 3 4 4 2 5 1
输出：14,blue
2023.07.31
考虑到可能存在超过四子连珠的情况，因此isFour函数判断中，对应连续数量判断应该改为>=4更稳妥。
`,i=[],c="",s={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int[] tmp = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    int n = tmp[0];
    int m = tmp[1];

    int[] cols = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();

    System.out.println(getResult(n, m, cols));
  }

  /**
   * @param n 宽 ，矩阵列数
   * @param m 高，矩阵行数
   * @param cols 落子的列的编号
   */
  public static String getResult(int n, int m, int[] cols) {
    int r = m;
    int c = n;

    // 构造棋盘，注意棋盘长宽都+1了，方便后面棋子获取
    int[][] matrix = new int[r + 1][c + 1];

    // 这里i对应第几步，由于题目是从第1步开始算，而这里 i 从0开始算，因此最终返回要i+1
    for (int i = 0; i < cols.length; i++) {
      // cols[i]代表第 i 步下在第几列
      if (cols[i] < 1 || cols[i] > c) return i + 1 + ",error";

      // player落子颜色：1代表红色，2代表蓝色
      int player = i % 2 == 0 ? 1 : 2;

      // 落子逻辑
      int x = m;
      int y = cols[i];
      while (matrix[x][y] > 0) {
        x--; // 如果当前列底部有棋子，则需要往上查找
        if (x < 1) return i + 1 + ",error"; // 如果当前列已经放满棋子，则报错
      }
      matrix[x][y] = player; // 如果当前列底部没有棋子，则可以放入

      // i >= 6，即第七步及之后落子时，才可能产生四连击
      if (i >= 6 && isFour(x, y, player, matrix, r, c)) {
        return i + 1 + "," + (player == 1 ? "red" : "blue");
      }
    }

    // 双方都没有获胜
    return "0,draw";
  }

  // 上，左，左上，左下
  static int[][] offsets = {{-1, 0}, {0, -1}, {-1, -1}, {-1, 1}};

  public static boolean isFour(int x, int y, int player, int[][] matrix, int r, int c) {
    for (int[] offset : offsets) {
      int len = 1;

      // 向着某个方向延申判断是否存在相同子
      int x1 = x, y1 = y;
      while (true) {
        x1 += offset[0];
        y1 += offset[1];

        if (x1 >= 1 && x1 <= r && y1 >= 1 && y1 <= c && matrix[x1][y1] == player) {
          len++;
        } else {
          break;
        }
      }

      // 向着上面方向的反方向延申判断是否存在相同子（两个相反方向其实处于一条线上）
      int x2 = x, y2 = y;
      while (true) {
        x2 -= offset[0];
        y2 -= offset[1];

        if (x2 >= 1 && x2 <= r && y2 >= 1 && y2 <= c && matrix[x2][y2] == player) {
          len++;
        } else {
          break;
        }
      }

      // 如果此线可以形成四子连击，则直接返回true
      if (len >= 4) return true;
    }

    return false;
  }
}`,python:`# 输入获取
c, r = map(int, input().split())
cols = list(map(int, input().split()))

# 构造棋盘，注意棋盘长宽都+1了，方便后面棋子获取
matrix = [[0] * (c + 1) for _ in range(r + 1)]
# 上，左，左上，左下 偏移量
offsets = ((-1, 0), (0, -1), (-1, -1), (-1, 1))


def isFour(x, y, player):
    for offsetX, offsetY in offsets:
        long = 1

        # 向着某个方向延申判断是否存在相同子
        x1, y1 = x, y
        while True:
            x1 += offsetX
            y1 += offsetY
            if r >= x1 >= 1 and c >= y1 >= 1 and matrix[x1][y1] == player:
                long += 1
            else:
                break

        # 向着上面方向的反方向延申判断是否存在相同子（两个相反方向其实处于一条线上）
        x2, y2 = x, y
        while True:
            x2 -= offsetX
            y2 -= offsetY
            if r >= x2 >= 1 and c >= y2 >= 1 and matrix[x2][y2] == player:
                long += 1
            else:
                break

        # 如果此线可以形成四子连击，则直接返回true
        if long >= 4:
            return True

    return False


# 算法入口
def getResult():
    # 这里i对应第几步，由于题目是从第1步开始算，而这里 i 从0开始算，因此最终返回要i+1
    for i in range(len(cols)):
        #  cols[i]代表第 i 步下在第几列
        if cols[i] < 1 or cols[i] > c:
            return f"{i + 1},error"

        # player落子颜色：1代表红色，2代表蓝色
        player = 1 if i % 2 == 0 else 2

        # 落子逻辑
        x, y = r, cols[i]
        while matrix[x][y] > 0:
            x -= 1  # 如果当前列底部有棋子，则需要往上查找
            if x < 1:
                return f"{i + 1},error"  # 如果当前列已经放满棋子，则报错

        matrix[x][y] = player  # 如果当前列底部没有棋子，则可以放入

        # i >= 6，即第七步及之后落子时，才可能产生四连击
        if i >= 6 and isFour(x, y, player):
            return f"{i + 1},{'red' if player == 1 else 'blue'}"

    # 双方都没有获胜
    return "0,draw"


# 调用算法
print(getResult())`,javascript:"",cpp:"",c:""},y={id:"219",title:n,examType:"B",score:200,description:r,inputDesc:t,outputDesc:e,examples:i,solution:"",codes:s};export{s as codes,y as default,r as description,l as examType,i as examples,a as id,t as inputDesc,e as outputDesc,o as score,c as solution,n as title};
