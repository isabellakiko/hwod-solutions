const p="4",n="We Are A Team",c="A",s=100,t="总共有 n 个人在机房，每个人有一个标号（1<=标号<=n），他们分成了多个团队，需要你根据收到的 m 条消息判定指定的两个人是否在一个团队中，具体的：\n\n1. 消息构成为 `a b c`，整数 a、b 分别代表两个人的标号，整数 c 代表指令\n2. `c == 0` 代表 a 和 b 在一个团队内\n3. `c == 1` 代表需要判定 a 和 b 的关系，如果 a 和 b 是一个团队，输出一行 `we are a team`，如果不是，输出一行 `we are not a team`\n4. c 为其他值，或当前行 a 或 b 超出 1~n 的范围，输出 `da pian zi`",e=`第一行包含两个整数 n，m（1<=n,m<100000），分别表示有 n 个人和 m 条消息。
随后的 m 行，每行一条消息，消息格式为：a b c（1<=a,b<=n，0<=c<=1）`,a="1. c == 1 时，根据 a 和 b 是否在一个团队中输出一行字符串，在一个团队中输出 `we are a team`，不在一个团队中输出 `we are not a team`\n2. c 为其他值，或当前行 a 或 b 的标号小于 1 或者大于 n 时，输出字符串 `da pian zi`\n3. 如果第一行 n 和 m 的值超出约定的范围时，输出字符串 `Null`",i=[{input:`5 7
1 2 0
4 5 0
2 3 0
1 2 1
2 3 1
4 5 1
1 5 1`,output:`We are a team
We are a team
We are a team
We are not a team`,explanation:"前三条消息表示：1和2在同一团队、4和5在同一团队、2和3在同一团队。因此形成两个团队：团队1包含{1,2,3}，团队2包含{4,5}。后四条查询消息：1和2在团队1中、2和3在团队1中、4和5在团队2中，都输出'We are a team'；1和5分属不同团队，输出'We are not a team'。"},{input:`5 6
1 2 0
1 2 1
1 5 0
2 3 1
2 5 1
1 3 2`,output:`we are a team
we are not a team
we are a team
da pian zi`,explanation:"第1条消息将1和2合并为一个团队。第2条查询1和2，输出'we are a team'。第3条将1和5合并（此时团队包含{1,2,5}）。第4条查询2和3，3还未加入任何团队，输出'we are not a team'。第5条查询2和5，都在同一团队，输出'we are a team'。第6条指令c=2非法，输出'da pian zi'。"}],r=`**解题思路：**

本题是典型的**并查集（Union-Find）**问题，用于处理动态连通性查询。

**算法步骤：**

1. **初始化**：创建一个 parent 数组，每个人初始时自己是自己的父节点（即每人独立成一个团队）

2. **处理消息**：
   - 若 c == 0：执行合并操作（Union），将 a 和 b 所在的团队合并
   - 若 c == 1：执行查询操作（Find），判断 a 和 b 是否属于同一团队
   - 其他情况：输出 \`da pian zi\`

3. **路径压缩优化**：在查找根节点时，将沿途所有节点直接指向根节点，降低后续查询的时间复杂度

**关键点：**
- 并查集的 find 操作使用路径压缩
- 注意边界检查：人员标号需在 [1, n] 范围内
- 注意输出的大小写一致性`,o={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();

        // 检查输入范围
        if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
            System.out.println("Null");
            return;
        }

        // 初始化并查集
        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;

        // 处理每条消息
        for (int i = 0; i < m; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            int c = sc.nextInt();

            // 检查标号范围
            if (a < 1 || a > n || b < 1 || b > n) {
                System.out.println("da pian zi");
                continue;
            }

            if (c == 0) {
                // 合并团队
                int rootA = find(a, parent);
                int rootB = find(b, parent);
                if (rootA != rootB) {
                    parent[rootB] = rootA;
                }
            } else if (c == 1) {
                // 查询是否同一团队
                if (find(a, parent) == find(b, parent)) {
                    System.out.println("We are a team");
                } else {
                    System.out.println("We are not a team");
                }
            } else {
                System.out.println("da pian zi");
            }
        }
    }

    // 带路径压缩的查找
    public static int find(int x, int[] parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
}`,python:`import sys
sys.setrecursionlimit(100005)

def find(x, parent):
    """带路径压缩的查找"""
    if parent[x] != x:
        parent[x] = find(parent[x], parent)
    return parent[x]

# 读取输入
n, m = map(int, input().split())

# 检查输入范围
if n < 1 or n >= 100000 or m < 1 or m >= 100000:
    print("Null")
else:
    # 初始化并查集
    parent = list(range(n + 1))

    for _ in range(m):
        a, b, c = map(int, input().split())

        # 检查标号范围
        if a < 1 or a > n or b < 1 or b > n:
            print("da pian zi")
            continue

        if c == 0:
            # 合并团队
            root_a = find(a, parent)
            root_b = find(b, parent)
            if root_a != root_b:
                parent[root_b] = root_a
        elif c == 1:
            # 查询是否同一团队
            if find(a, parent) == find(b, parent):
                print("We are a team")
            else:
                print("We are not a team")
        else:
            print("da pian zi")`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function find(x, parent) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x], parent);
  }
  return parent[x];
}

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  const [n, m] = lines[0].split(' ').map(Number);

  if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
    console.log('Null');
    return;
  }

  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 1; i <= m; i++) {
    const [a, b, c] = lines[i].split(' ').map(Number);

    if (a < 1 || a > n || b < 1 || b > n) {
      console.log('da pian zi');
      continue;
    }

    if (c === 0) {
      const rootA = find(a, parent);
      const rootB = find(b, parent);
      if (rootA !== rootB) {
        parent[rootB] = rootA;
      }
    } else if (c === 1) {
      if (find(a, parent) === find(b, parent)) {
        console.log('We are a team');
      } else {
        console.log('We are not a team');
      }
    } else {
      console.log('da pian zi');
    }
  }
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

int main() {
    int n, m;
    cin >> n >> m;

    if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
        cout << "Null" << endl;
        return 0;
    }

    parent.resize(n + 1);
    for (int i = 0; i <= n; i++) parent[i] = i;

    for (int i = 0; i < m; i++) {
        int a, b, c;
        cin >> a >> b >> c;

        if (a < 1 || a > n || b < 1 || b > n) {
            cout << "da pian zi" << endl;
            continue;
        }

        if (c == 0) {
            int rootA = find(a);
            int rootB = find(b);
            if (rootA != rootB) {
                parent[rootB] = rootA;
            }
        } else if (c == 1) {
            if (find(a) == find(b)) {
                cout << "We are a team" << endl;
            } else {
                cout << "We are not a team" << endl;
            }
        } else {
            cout << "da pian zi" << endl;
        }
    }

    return 0;
}`,c:`#include <stdio.h>

int parent[100005];

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);

    if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
        printf("Null\\n");
        return 0;
    }

    for (int i = 0; i <= n; i++) parent[i] = i;

    for (int i = 0; i < m; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);

        if (a < 1 || a > n || b < 1 || b > n) {
            printf("da pian zi\\n");
            continue;
        }

        if (c == 0) {
            int rootA = find(a);
            int rootB = find(b);
            if (rootA != rootB) {
                parent[rootB] = rootA;
            }
        } else if (c == 1) {
            if (find(a) == find(b)) {
                printf("We are a team\\n");
            } else {
                printf("We are not a team\\n");
            }
        } else {
            printf("da pian zi\\n");
        }
    }

    return 0;
}`},f={id:"4",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:a,examples:i,solution:r,codes:o};export{o as codes,f as default,t as description,c as examType,i as examples,p as id,e as inputDesc,a as outputDesc,s as score,r as solution,n as title};
