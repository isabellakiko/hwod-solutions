const c="7",n="光伏场地建设规划",u="A",a=100,i=`祖国西北部有一片大片荒地，其中零星的分布着一些湖泊、保护区、矿区；整体上常年光照良好，但是也有一些地区光照不太好。

某电力公司希望在这里建设多个光伏电站，生产清洁能源。对每平方公里的土地进行了发电评估，其中不能建设的区域发电量为 0kw，可以发电的区域根据光照、地形等给出了每平方公里年发电量 x 千瓦。

我们希望能够找到其中集中的**正方形区域**建设电站，能够获得良好的收益。`,t=`第一行输入四个整数：调研区域的行数 r、列数 c、电站边长 s（正方形）、最低发电量要求 min
之后 r 行为调研区域每平方公里的发电量`,r="输出满足条件的正方形区域有多少个（即边长为 s 的正方形，其区域内发电量总和 >= min）",s=[{input:`2 5 2 6
1 3 4 5 8
2 3 6 7 1`,output:"4",explanation:`调研区域为 2×5 的矩形，要建设边长为 2 的正方形电站，最低发电量要求为 6。

矩阵为：
1 3 4 5 8
2 3 6 7 1

所有 2×2 的正方形区域及其发电量：
- [1,3,2,3]=9 ✓
- [3,4,3,6]=16 ✓
- [4,5,6,7]=22 ✓
- [5,8,7,1]=21 ✓

全部 4 个区域都满足 >=6，所以输出 4。`},{input:`2 5 1 6
1 3 4 5 8
2 3 6 7 1`,output:"3",explanation:`电站边长为 1，相当于找单个格子发电量 >= 6 的数量。
矩阵中 >= 6 的格子有：8, 6, 7，共 3 个。`}],o=`**解题思路：**

本题是一道**二维前缀和**或**滑动窗口**问题。

**方法一：暴力枚举（适合小数据）**
1. 枚举所有可能的正方形左上角位置
2. 对每个位置，计算边长为 s 的正方形内所有元素之和
3. 如果和 >= min，计数器 +1

**方法二：二维前缀和（适合大数据）**
1. 预处理前缀和数组 \`prefix[i][j]\` 表示从 (0,0) 到 (i,j) 的矩形和
2. 任意子矩形的和可以 O(1) 计算：
   \`sum = prefix[i2][j2] - prefix[i1-1][j2] - prefix[i2][j1-1] + prefix[i1-1][j1-1]\`

**关键点：**
- 注意边界处理
- 正方形边长 s 可能大于矩阵某一维度，此时结果为 0`,e={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();  // 行数
        int c = sc.nextInt();  // 列数
        int s = sc.nextInt();  // 正方形边长
        int min = sc.nextInt(); // 最低发电量

        int[][] matrix = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }

        int count = 0;
        // 枚举所有边长为s的正方形
        for (int i = 0; i <= r - s; i++) {
            for (int j = 0; j <= c - s; j++) {
                int sum = 0;
                for (int x = i; x < i + s; x++) {
                    for (int y = j; y < j + s; y++) {
                        sum += matrix[x][y];
                    }
                }
                if (sum >= min) count++;
            }
        }

        System.out.println(count);
    }
}`,python:`r, c, s, min_power = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(r)]

count = 0
# 枚举所有边长为s的正方形
for i in range(r - s + 1):
    for j in range(c - s + 1):
        total = sum(matrix[x][y] for x in range(i, i + s) for y in range(j, j + s))
        if total >= min_power:
            count += 1

print(count)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  const [r, c, s, min] = lines[0].split(' ').map(Number);
  const matrix = lines.slice(1, r + 1).map(line => line.split(' ').map(Number));

  let count = 0;
  for (let i = 0; i <= r - s; i++) {
    for (let j = 0; j <= c - s; j++) {
      let sum = 0;
      for (let x = i; x < i + s; x++) {
        for (let y = j; y < j + s; y++) {
          sum += matrix[x][y];
        }
      }
      if (sum >= min) count++;
    }
  }

  console.log(count);
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c, s, minPower;
    cin >> r >> c >> s >> minPower;

    vector<vector<int>> matrix(r, vector<int>(c));
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> matrix[i][j];
        }
    }

    int count = 0;
    for (int i = 0; i <= r - s; i++) {
        for (int j = 0; j <= c - s; j++) {
            int sum = 0;
            for (int x = i; x < i + s; x++) {
                for (int y = j; y < j + s; y++) {
                    sum += matrix[x][y];
                }
            }
            if (sum >= minPower) count++;
        }
    }

    cout << count << endl;
    return 0;
}`,c:`#include <stdio.h>

int main() {
    int r, c, s, minPower;
    scanf("%d %d %d %d", &r, &c, &s, &minPower);

    int matrix[r][c];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    int count = 0;
    for (int i = 0; i <= r - s; i++) {
        for (int j = 0; j <= c - s; j++) {
            int sum = 0;
            for (int x = i; x < i + s; x++) {
                for (int y = j; y < j + s; y++) {
                    sum += matrix[x][y];
                }
            }
            if (sum >= minPower) count++;
        }
    }

    printf("%d\\n", count);
    return 0;
}`},m={id:"7",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:r,examples:s,solution:o,codes:e};export{e as codes,m as default,i as description,u as examType,s as examples,c as id,t as inputDesc,r as outputDesc,a as score,o as solution,n as title};
