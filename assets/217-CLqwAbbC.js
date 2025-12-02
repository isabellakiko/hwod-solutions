const f="217",n="欢乐的周末",r="B",o=200,i=`小华和小为是很要好的朋友，他们约定周末一起吃饭。
通过手机交流，他们在地图上选择了多个聚餐地点（由于自然地形等原因，部分聚餐地点不可达），求小华和小为都能到达的聚餐地点有多少个？
`,t=`第一行输入 m 和 n
m 代表地图的长度n 代表地图的宽度
第二行开始具体输入地图信息，地图信息包含：
0 为通畅的道路1 为障碍物（且仅1为障碍物）2 为小华或者小为，地图中必定有且仅有2个 （非障碍物）3 为被选中的聚餐地点（非障碍物）
`,s=`可以被两方都到达的聚餐地点数量，行末无空格。

地图的长宽为 m 和 n，其中：
聚餐的地点数量为 k，则

第一行输入地图的长宽为3和4。
第二行开始为具体的地图，其中：3代表小华和小明选择的聚餐地点；2代表小华或者小明（确保有2个）；0代表可以通行的位置；1代表不可以通行的位置。
此时两者能都能到达的聚餐位置有2处。
第一行输入地图的长宽为4和4。
第二行开始为具体的地图，其中：3代表小华和小明选择的聚餐地点；2代表小华或者小明（确保有2个）；0代表可以通行的位置；1代表不可以通行的位置。
由于图中小华和小为之间有个阻隔，此时，没有两人都能到达的聚餐地址，故而返回0。


本题可以使用并查集解题。
小华和小为想去同一个餐厅，那么必然小华和小为和餐厅是可以连通，如果它们不能连通，则去不了同一个餐厅。
因此，我们可以遍历矩阵中每一个元素，将它和其上下左右元素进行连接，需要注意的是如果遍历的元素本身是1，或者其上下左右的元素是1，则不进行连接。
这样的话，遍历完矩阵后，就可以得到一个连通图。
同时在遍历矩阵过程中，记录小华、小为（值为2），以及餐厅（值为3）的位置，遍历结束后，首先看小华和小为是不是同一个祖先，若不是，则二者不可连通，就更别说去同一个餐厅了，因此返回0。若二者可以连通，则再看每一个餐厅的祖先是否和华为的祖先相同，若相同则计数++，这样就可以得到小华，小为去的同一个餐厅的数量了。
2023.11.30 请特别注意下：
本题输入中
长度 m 指的是地图矩阵的行数，宽度 n 指的是地图矩阵的列数。
`,e=[],u="",a={java:`import java.util.ArrayList;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    // 长度m表示行数
    int m = sc.nextInt();
    // 宽度n表示列数
    int n = sc.nextInt();

    int[][] matrix = new int[m][n];

    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }

    System.out.println(getResult(matrix));
  }

  public static int getResult(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;

    UnionFindSet ufs = new UnionFindSet(rows * cols);

    // 记录小华，小为的位置
    ArrayList<Integer> huawei = new ArrayList<>();
    // 记录餐厅的位置
    ArrayList<Integer> restaurants = new ArrayList<>();

    // 上下左右四个方向偏移量
    int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        if (matrix[i][j] != 1) {
          // 二维坐标(i, j) 转为 一维坐标pos
          int pos = i * cols + j;

          if (matrix[i][j] == 2) {
            // 收集小华，小为的位置
            huawei.add(pos);
          } else if (matrix[i][j] == 3) {
            // 收集餐厅的位置
            restaurants.add(pos);
          }

          for (int[] offset : offsets) {
            int newI = i + offset[0];
            int newJ = j + offset[1];
            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols && matrix[newI][newJ] != 1) {
              // 如果(i,j)和（newI,newJ）位置都是非1，则合并
              ufs.union(pos, newI * cols + newJ);
            }
          }
        }
      }
    }

    // 小华所在连通分量的根
    int hua_fa = ufs.find(huawei.get(0));
    // 小为所在连通分量的根
    int wei_fa = ufs.find(huawei.get(1));

    // 如果小华和小为的不属于同一个连通分量，则二人无法去往相同餐厅
    if (hua_fa != wei_fa) {
      return 0;
    }

    // 找出和小华、小为在同一个连通分量里面的餐厅
    int ans = 0;
    for (Integer restaurant : restaurants) {
      if (ufs.find(restaurant) == hua_fa) {
        ans++;
      }
    }

    return ans;
  }
}

// 并查集实现
class UnionFindSet {
  int[] fa;

  public UnionFindSet(int n) {
    fa = new int[n];
    for (int i = 0; i < n; i++) fa[i] = i;
  }

  public int find(int x) {
    if (x != this.fa[x]) {
      this.fa[x] = this.find(this.fa[x]);
      return this.fa[x];
    }
    return x;
  }

  public void union(int x, int y) {
    int x_fa = this.find(x);
    int y_fa = this.find(y);

    if (x_fa != y_fa) {
      this.fa[y_fa] = x_fa;
    }
  }
}`,python:`# 输入获取
m, n = map(int, input().split())  # 长度m是行数， 宽度n是列数
matrix = [list(map(int, input().split())) for _ in range(m)]


# 并查集实现
class UnionFindSet:
    def __init__(self, n):
        self.fa = [i for i in range(n)]

    def find(self, x):
        if x != self.fa[x]:
            self.fa[x] = self.find(self.fa[x])
            return self.fa[x]
        return x

    def union(self, x, y):
        x_fa = self.find(x)
        y_fa = self.find(y)
        if x_fa != y_fa:
            self.fa[y_fa] = x_fa


# 算法入口
def getResult():
    rows = len(matrix)
    cols = len(matrix[0])

    ufs = UnionFindSet(rows * cols)

    #  记录小华，小为的位置
    huawei = []
    # 记录餐厅的位置
    restaurants = []
    # 上下左右四个方向偏移量
    offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))

    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] != 1:
                # 二维坐标(i, j) 转为 一维坐标pos
                pos = i * cols + j

                if matrix[i][j] == 2:
                    # 收集小华，小为的位置
                    huawei.append(pos)
                elif matrix[i][j] == 3:
                    # 收集餐厅的位置
                    restaurants.append(pos)

                for offset in offsets:
                    newI = i + offset[0]
                    newJ = j + offset[1]

                    if 0 <= newI < rows and 0 <= newJ < cols and matrix[newI][newJ] != 1:
                        # 如果(i,j)和（newI,newJ）位置都是非1，则合并
                        ufs.union(pos, newI * cols + newJ)

    # 小华所在连通分量的根
    hua_fa = ufs.find(huawei[0])
    # 小为所在连通分量的根
    wei_fa = ufs.find(huawei[1])

    # 如果小华和小为的不属于同一个连通分量，则二人无法去往相同餐厅
    if hua_fa != wei_fa:
        return 0

    # 找出和小华、小为在同一个连通分量里面的餐厅
    ans = 0
    for r in restaurants:
        if ufs.find(r) == hua_fa:
            ans += 1

    return ans


# 算法调用
print(getResult())`,javascript:`const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // 长度m是行数， 宽度n是列数
  const [m, n] = (await readline()).split(" ").map(Number);

  const matrix = [];
  for (let i = 0; i < m; i++) {
    matrix.push((await readline()).split(" ").map(Number));
  }

  console.log(getResult(matrix));
})();

function getResult(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const ufs = new UnionFindSet(rows * cols);

  // 记录小华，小为的位置
  const huawei = [];
  // 记录餐厅的位置
  const restrant = [];

  // 上下左右四个方向偏移量
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] !== 1) {
        // 二维坐标(i, j) 转为 一维坐标pos
        const pos = i * cols + j;

        if (matrix[i][j] === 2) {
          // 收集小华，小为的位置
          huawei.push(pos);
        } else if (matrix[i][j] === 3) {
          // 收集餐厅的位置
          restrant.push(pos);
        }

        for (let [offsetX, offsetY] of offsets) {
          const newI = i + offsetX;
          const newJ = j + offsetY;
          if (
            newI >= 0 &&
            newI < rows &&
            newJ >= 0 &&
            newJ < cols &&
            matrix[newI][newJ] != 1
          ) {
            // 如果(i,j)和（newI,newJ）位置都是非1，则合并
            ufs.union(pos, newI * cols + newJ);
          }
        }
      }
    }
  }

  const [hua, wei] = huawei;

  // 小华所在连通分量的根
  const hua_fa = ufs.find(hua);

  // 小为所在连通分量的根
  const wei_fa = ufs.find(wei);

  // 如果小华和小为的不属于同一个连通分量，则二人无法去往相同餐厅
  if (hua_fa !== wei_fa) {
    return 0;
  }

  // 找出和小华、小为在同一个连通分量里面的餐厅
  return restrant.filter((r) => ufs.find(r) === hua_fa).length;
}

// 并查集实现
class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, idx) => idx);
  }

  find(x) {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }

  union(x, y) {
    const x_fa = this.find(x);
    const y_fa = this.find(y);

    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
    }
  }
}`,cpp:"",c:""},c={id:"217",title:n,examType:"B",score:200,description:i,inputDesc:t,outputDesc:s,examples:e,solution:"",codes:a};export{a as codes,c as default,i as description,r as examType,e as examples,f as id,t as inputDesc,s as outputDesc,o as score,u as solution,n as title};
