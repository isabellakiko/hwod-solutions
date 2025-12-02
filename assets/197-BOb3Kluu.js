const r="197",n="精准核酸检测",o="B",c=100,i=`为了达到新冠疫情精准防控的需要，为了避免全员核酸检测带来的浪费，需要精准圈定可能被感染的人群。
现在根据传染病流调以及大数据分析，得到了每个人之间在时间、空间上是否存在轨迹交叉。
现在给定一组确诊人员编号（X1,X2,X3,...,Xn），在所有人当中，找出哪些人需要进行核酸检测，输出需要进行核酸检测的人数。（注意：确诊病例自身不需要再做核酸检测）
需要进行核酸检测的人，是病毒传播链条上的所有人员，即有可能通过确诊病例所能传播到的所有人。
例如：A是确诊病例，A和B有接触、B和C有接触、C和D有接触、D和E有接触，那么B\\C\\D\\E都是需要进行核酸检测的人。
`,t=`第一行为总人数 N
第二行为确认病例人员编号（确诊病例人员数量 < N），用逗号分割
第三行开始，为一个 N * N 的矩阵，表示每个人员之间是否有接触，0表示没有接触，1表示有接触。
`,f=`整数：需要做核酸检测的人数


编号为1、2号的人员，为确诊病例。
1号和0号有接触，0号和3号有接触。
2号和4号有接触。
所以，需要做核酸检测的人是0号、3号、4号，总计3人需要进行核酸检测。

本题可以用并查集解题。关于并查集的实现可以看：
华为校招机试 - 发广播（20210310）_华为机试 发广播 伏城之外-CSDN博客

即将有接触的人进行合并操作，纳入到同一个连通分量中。比如matrix[i]][j] == 1，即 i 和 j 就处于同一个连通分量中，需要进行合并。
另外，本题的接触关系矩阵matrix是沿对角线对称的，因此只需要遍历对角线一边即可。
当遍历完所有接触关系后，就可以求解每一个连通分量中的节点数，即每个接触群体的人数，求解原理如下：
并查集底层的fa数组，fa数组索引代表每个节点，fa数组元素代表对应索引的节点的根节点，而同一个连通分量中的节点的根都是相同的，因此，我们需要对fa每一个数组索引找一下根，这里可以使用并查集的find操作（递归实现），最后统计同一个根下的节点数量，即为同一个接触群体的人数。

当每个接触群体人数求解出来后，我们只需要统计”确诊病例人员编号“对应的根（连通分量）下的人数即可。
最后的统计的总人数需要减去确诊病例的数量，因为题目说：
确诊病例自身不需要再做核酸检测

本题需要注意的是，有可能多个确诊病人在同一个连通分量重，此时需要注意避免重复统计。

`,a=[{input:`5
1,2
0,1,0,0,0
1,0,1,0,0
0,1,0,0,0
0,0,0,0,1
0,0,0,1,0`,output:"3",explanation:"确诊1、2号，1-0-2-3构成接触链，4-5构成接触链，需检测0、3、4共3人"},{input:`3
0
0,1,0
1,0,1
0,1,0`,output:"2",explanation:"确诊0号，0-1-2构成接触链，需检测1、2共2人"}],e=`**解题思路：**

本题是一道**并查集**问题。

**核心思路：**
- 有接触的人合并到同一个连通分量
- 统计确诊者所在连通分量的人数

**算法步骤：**
1. 遍历接触矩阵，有接触则并查集合并
2. 统计每个连通分量的人数
3. 找出所有确诊者所在的连通分量
4. 累加人数并减去确诊者数量

**时间复杂度**：O(N²)`,s={java:`import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = Integer.parseInt(sc.nextLine());

    int[] confirmed = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();

    int[][] matrix = new int[n][n];
    for (int i = 0; i < n; i++) {
      matrix[i] = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    }

    System.out.println(getResult(n, confirmed, matrix));
  }

  public static int getResult(int n, int[] confirmed, int[][] matrix) {
    UnionFindSet ufs = new UnionFindSet(n);

    for (int i = 0; i < n; i++) {
      for (int j = i; j < n; j++) {
        if (matrix[i][j] == 1) {
          // 有过接触的人进行合并
          ufs.union(i, j);
        }
      }
    }

    // 统计每个接触群体（连通分量）中的人数
    int[] cnts = new int[n];
    for (int i = 0; i < n; i++) {
      int fa = ufs.find(i);
      cnts[fa]++;
    }

    // 记录已统计过的感染群体
    HashSet<Integer> confirmed_fa = new HashSet<>();

    // 将有感染者的接触群体的人数统计出来
    int ans = 0;
    for (int i : confirmed) {
      int fa = ufs.find(i);

      // 如果该感染群体已统计过，则不再统计
      if (confirmed_fa.contains(fa)) continue;
      confirmed_fa.add(fa);

      ans += cnts[fa];
    }

    // 最终需要做核酸的人数，不包括已感染的人
    return ans - confirmed.length;
  }
}

// 并查集实现
class UnionFindSet {
  int[] fa;

  public UnionFindSet(int n) {
    this.fa = new int[n];
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
}`,python:`# 并查集实现
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


# 输入获取
n = int(input())
confirmed = list(map(int, input().split(",")))
matrix = [list(map(int, input().split(","))) for _ in range(n)]


# 算法入口
def getResult():
    ufs = UnionFindSet(n)

    for i in range(n):
        for j in range(i, n):
            if matrix[i][j] == 1:
                # 有过接触的人进行合并
                ufs.union(i, j)

    # 统计每个接触群体（连通分量）中的人数
    cnts = [0] * n
    for i in range(n):
        fa = ufs.find(i)
        cnts[fa] += 1

    # 记录已统计过的可能感染群体
    confirmed_fa = set()

    # 将有感染者的接触群体的人数统计出来
    ans = 0
    for i in confirmed:
        fa = ufs.find(i)

        # 已统计过的可能感染群体不再统计
        if fa in confirmed_fa:
            continue
        confirmed_fa.add(fa)

        ans += cnts[fa]

    # 最终需要做核酸的人数，不包括已感染的人
    return ans - len(confirmed)


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},d={id:"197",title:n,examType:"B",score:100,description:i,inputDesc:t,outputDesc:f,examples:a,solution:e,codes:s};export{s as codes,d as default,i as description,o as examType,a as examples,r as id,t as inputDesc,f as outputDesc,c as score,e as solution,n as title};
