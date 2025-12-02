const s="63",n="Linux发行版的数量",c="A",r=100,i=`Linux操作系统有多个发行版，distrowatch.com提供了各个发行版的资料。这些发行版互相存在关联，例如Ubuntu基于Debian开发，而Mint又基于Ubuntu开发，那么我们认为Mint同Debian也存在关联。
发行版集是一个或多个相关存在关联的操作系统发行版，集合内不包含没有关联的发行版。
给你一个 n * n 的矩阵 isConnected，其中 isConnected[i][j] = 1 表示第 i 个发行版和第 j 个发行版直接关联，而 isConnected[i][j] = 0 表示二者不直接相连。
返回最大的发行版集中发行版的数量。
`,t=`第一行输入发行版的总数量N，
之后每行表示各发行版间是否直接相关
`,e="输出最大的发行版集中发行版的数量",a=[{input:`4
1 1 0 0
1 1 1 0
0 1 1 0
0 0 0 1`,output:"3",explanation:"0-1相连，1-2相连，形成连通分量{0,1,2}；3单独形成{3}。最大连通分量有3个节点。"},{input:`3
1 0 0
0 1 0
0 0 1`,output:"1",explanation:"三个发行版互不相连，每个都是独立的发行版集，最大为1。"},{input:`3
1 1 1
1 1 1
1 1 1`,output:"3",explanation:"三个发行版全部互相关联，形成一个发行版集，包含3个发行版。"}],f=`**解题思路：**

本题是一道**并查集**问题，求最大连通分量的节点数。

**算法步骤：**
1. 初始化并查集，每个节点的父节点指向自己
2. 遍历矩阵，若isConnected[i][j]=1则合并i和j
3. 统计每个连通分量的节点数
4. 返回最大的节点数

**并查集核心操作：**
- find：路径压缩查找根节点
- union：合并两个集合

**时间复杂度**：O(N²α(N))，α为反阿克曼函数`,o={java:`import java.util.HashMap;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    int[][] matrix = new int[n][n];

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }

    System.out.println(getResult(matrix, n));
  }

  public static int getResult(int[][] matrix, int n) {
    UnionFindSet ufs = new UnionFindSet(n);

    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) { // j从i+1开始，是因为矩阵是对称的
        if (matrix[i][j] == 1) {
          ufs.union(i, j);
        }
      }
    }

    // connected的key代表某个连通分量的顶级父节点，value代表该连通分量下的节点个数
    HashMap<Integer, Integer> connected = new HashMap<>();

    for (int i = 0; i < n; i++) {
      Integer fa = ufs.find(ufs.fa[i]);
      connected.put(fa, connected.getOrDefault(fa, 0) + 1);
    }

    // 返回最大节点数
    return connected.values().stream().max((a, b) -> a - b).get();
  }
}

// 并查集实现
class UnionFindSet {
  int[] fa;
  int count;

  public UnionFindSet(int n) {
    this.count = n;
    this.fa = new int[n];
    for (int i = 0; i < n; i++) this.fa[i] = i;
  }

  public int find(int x) {
    if (x != this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }

  public void union(int x, int y) {
    int x_fa = this.find(x);
    int y_fa = this.find(y);

    if (x_fa != y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
}`,python:`# 并查集
class UnionFindSet:
    def __init__(self, n):
        self.fa = [idx for idx in range(n)]
        self.count = n

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
            self.count -= 1


n = int(input())

matrix = []
for i in range(n):
    matrix.append(list(map(int, input().split())))

ufs = UnionFindSet(n)

for i in range(n):
    for j in range(i + 1, n):  # 这里j从i+1开始，是因为矩阵是对称的
        if matrix[i][j] == 1:
            ufs.union(i, j)

# connected字典的属性代表某个连通分量的顶级父节点，属性值代表该连通分量下的节点个数
connected = {}

for i in range(n):
    fa = ufs.find(ufs.fa[i])
    connected[fa] = connected.get(fa, 0) + 1

# 返回最大节点数
print(max(connected.values()))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    n = lines[0] - 0;
  }

  if (n && lines.length === n + 1) {
    lines.shift();
    const matrix = lines.map((line) => line.split(" ").map(Number));
    console.log(getResult(matrix, n));
    lines.length = 0;
  }
});

function getResult(matrix, n) {
  const ufs = new UnionFindSet(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) { // 这里j从i+1开始，是因为矩阵是对称的
      if (matrix[i][j] === 1) {
        ufs.union(i, j);
      }
    }
  }

  // connected对象的属性代表某个连通分量的顶级父节点，属性值代表该连通分量下的节点个数
  const connected = {};

  for (let i = 0; i < n; i++) {
    const fa = ufs.find(ufs.fa[i]);
    connected[fa] ? connected[fa]++ : (connected[fa] = 1);
  }

  // 返回最大节点数
  return Math.max.apply(null, Object.values(connected));
}

// 并查集实现
class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, i) => i);
    this.count = n;
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
      this.count--;
    }
  }
}`,cpp:`#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class UnionFindSet {
public:
    vector<int> fa;
    int count;
    
    UnionFindSet(int n) {
        count = n;
        fa.resize(n);
        for (int i = 0; i < n; i++) fa[i] = i;
    }
    
    int find(int x) {
        if (x != fa[x]) {
            fa[x] = find(fa[x]);
        }
        return fa[x];
    }
    
    void unite(int x, int y) {
        int xFa = find(x);
        int yFa = find(y);
        if (xFa != yFa) {
            fa[yFa] = xFa;
            count--;
        }
    }
};

int main() {
    int n;
    cin >> n;
    
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    UnionFindSet ufs(n);
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (matrix[i][j] == 1) {
                ufs.unite(i, j);
            }
        }
    }
    
    unordered_map<int, int> connected;
    for (int i = 0; i < n; i++) {
        int fa = ufs.find(ufs.fa[i]);
        connected[fa]++;
    }
    
    int maxCount = 0;
    for (auto& p : connected) {
        maxCount = max(maxCount, p.second);
    }
    
    cout << maxCount << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int fa[200];

int find(int x) {
    if (x != fa[x]) {
        fa[x] = find(fa[x]);
    }
    return fa[x];
}

void unite(int x, int y) {
    int xFa = find(x);
    int yFa = find(y);
    if (xFa != yFa) {
        fa[yFa] = xFa;
    }
}

int main() {
    int n;
    scanf("%d", &n);
    
    int matrix[200][200];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    // 初始化并查集
    for (int i = 0; i < n; i++) fa[i] = i;
    
    // 合并
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (matrix[i][j] == 1) {
                unite(i, j);
            }
        }
    }
    
    // 统计每个连通分量的节点数
    int count[200] = {0};
    for (int i = 0; i < n; i++) {
        int root = find(fa[i]);
        count[root]++;
    }
    
    // 找最大值
    int maxCount = 0;
    for (int i = 0; i < n; i++) {
        if (count[i] > maxCount) maxCount = count[i];
    }
    
    printf("%d\\n", maxCount);
    return 0;
}`},u={id:"63",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:a,solution:f,codes:o};export{o as codes,u as default,i as description,c as examType,a as examples,s as id,t as inputDesc,e as outputDesc,r as score,f as solution,n as title};
