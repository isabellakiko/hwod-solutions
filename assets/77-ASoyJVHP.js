const m="77",n="最短木板长度",l="A",s=100,t=`小明有 n 块木板，第 i ( 1 ≤ i ≤ n ) 块木板长度为 ai。 小明买了一块长度为 m 的木料，这块木料可以切割成任意块，拼接到已有的木板上，用来加长木板。 小明想让最短的模板尽量长。请问小明加长木板后，最短木板的长度可以为多少？
`,i=`输入的第一行包含两个正整数， n ( 1 ≤ n ≤ 10^3 ), m ( 1 ≤ m ≤ 10^6 )，n 表示木板数， m 表示木板长度。 输入的第二行包含 n 个正整数， a1, a2,…an ( 1 ≤ ai ≤ 10^6 )。
`,e="输出加长木板后，最短木板的长度最大可以为多少。",r=[{input:`5 3
4 5 3 5 5`,output:"5",explanation:"先将长度3的板补到4（消耗1），再将两块4的板补到5（消耗2），最终所有板都是5。"},{input:`3 10
1 1 1`,output:"4",explanation:"三块板都是1，材料10可以平均分给3块板，每块分到10/3=3，最短板长度1+3=4。"},{input:`4 5
2 3 4 5`,output:"4",explanation:"补足最短板2到3（消耗1），补足两块3到4（消耗2），剩余2不够补3块4到5，每块分2/3=0，最短板4。"}],a=`**解题思路：**

本题是一道**贪心+优先队列**问题。

**算法步骤：**
1. 统计每种长度木板的数量
2. 用优先队列按长度升序排列
3. 每次将最短板补足到第二短板的长度
4. 计算补足所需材料，判断是否足够
5. 若只剩一种长度，平均分配剩余材料

**时间复杂度**：O(N log N)`,o={java:`import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();
    int m = sc.nextInt();

    int[] a = new int[n];
    for (int i = 0; i < n; i++) {
      a[i] = sc.nextInt();
    }

    System.out.println(getResult(m, a));
  }

  public static int getResult(int m, int[] a) {
    // 统计每种长度板的数量，记录到woods中，key是板长度，val是板数量
    HashMap<Integer, Integer> woods = new HashMap<>();
    for (Integer ai : a) {
      if (woods.containsKey(ai)) {
        Integer val = woods.get(ai);
        woods.put(ai, ++val);
      } else {
        woods.put(ai, 1);
      }
    }

    // 将统计到的板，按板长度排优先级，长度越短优先级越高，这里使用优先队列来实现优先级
    PriorityQueue<Integer[]> pq = new PriorityQueue<>((b, c) -> b[0] - c[0]);
    for (Integer wood : woods.keySet()) {
      pq.offer(new Integer[] {wood, woods.get(wood)});
    }

    // 只要还有剩余的m长度，就将他补到最短板上
    while (m > 0) {
      // 如果只有一种板长度，那么就尝试将m平均分配到各个板上
      if (pq.size() == 1) {
        Integer[] info = pq.poll();
        int len = info[0];
        int count = info[1];
        return len + m / count;
      }

      // 如果有多种板长度
      // min1是最短板
      Integer[] min1 = pq.poll();
      // min2是第二最短板
      Integer[] min2 = pq.peek();

      // diff是最短板和第二最短板的差距
      int diff = min2[0] - min1[0];
      // 将所有最短板补足到第二短板的长度，所需要总长度total
      int total = diff * min1[1];

      // 如果m的长度不够补足所有最短板，那么说明此时最短板的长度就是题解
      if (total > m) {
        return min1[0] + m / min1[1];
      }
      // 如果m的长度刚好可以补足所有最短板，那么说明最短板可以全部升级到第二短板，且刚好用完m，因此第二短板的长度就是题解
      else if (total == m) {
        return min2[0];
      }
      // 如果m的长度足够长，能补足所有最短板到第二短板，还能有剩余，则将最短的数量加到第二短板的数量上，继续下轮循环
      else {
        m -= total;
        min2[1] += min1[1];
      }
    }

    return pq.peek()[0];
  }
}`,python:`# 输入获取
import math

n, m = map(int, input().split())
a = list(map(int, input().split()))


# 算法入口
def getResult(m, a):
    # 统计每种长度板的数量，记录到count中，属性是板长度，属性值是板数量
    count = {}
    for ai in a:
        if count.get(ai) is None:
            count[ai] = 1
        else:
            count[ai] += 1

    # 将统计到的板，按板长度升序
    arr = []
    for ai in count.keys():
        arr.append([int(ai), count[ai]])

    arr.sort(key=lambda x: x[0])

    # 只要还有剩余的m长度，就将他补到最短板上
    while m > 0:
        # 如果只有一种板长度，那么就尝试将m平均分配到各个板上
        if len(arr) == 1:
            lenV, count = arr[0]
            return lenV + math.floor(m / count)

        # 如果有多种板长度
        min1 = arr.pop(0) # min1是最短板
        min2 = arr[0] # min2是第二最短板

        # diff是最短板和第二最短板的差距
        diff = min2[0] - min1[0]

        # 将所有最短板补足到第二短板的长度，所需要总长度total
        total = diff * min1[1]

        # 如果m的长度不够补足所有最短板，那么说明此时最短板的长度就是题解
        if total > m:
            return min1[0] + math.floor(m / min1[1])
        # 如果m的长度刚好可以补足所有最短板，那么说明最短板可以全部升级到第二短板，且刚好用完m，因此第二短板的长度就是题解
        elif total == m:
            return min2[0]
        # 如果m的长度足够长，能补足所有最短板到第二短板，还能有剩余，则将最短的数量加到第二短板的数量上，继续下轮循环
        else:
            m -= total
            min2[1] += min1[1]

    return arr[0][0]


# 算法调用
print(getResult(m, a))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const [n, m] = lines[0].split(" ").map(Number);
    const a = lines[1].split(" ").map(Number);
    console.log(getResult(m, a));

    lines.length = 0;
  }
});

function getResult(m, a) {
  // 统计每种长度板的数量，记录到count中，属性是板长度，属性值是板数量
  const count = {};
  for (let ai of a) {
    count[ai] ? count[ai]++ : (count[ai] = 1);
  }

  // 将统计到的板，按板长度升序
  const arr = [];
  for (let ai in count) {
    arr.push([ai - 0, count[ai]]);
  }
  arr.sort((a, b) => a[0] - b[0]);

  // 只要还有剩余的m长度，就将他补到最短板上
  while (m > 0) {
    // 如果只有一种板长度，那么就尝试将m平均分配到各个板上
    if (arr.length === 1) {
      const [len, count] = arr[0];
      return len + Math.floor(m / count);
    }

    // 如果有多种板长度
    // min1是最短板
    let min1 = arr.shift();
    // min2是第二最短板
    let min2 = arr[0];

    // diff是最短板和第二最短板的差距
    let diff = min2[0] - min1[0];

    // 将所有最短板补足到第二短板的长度，所需要总长度total
    let total = diff * min1[1];

    // 如果m的长度不够补足所有最短板，那么说明此时最短板的长度就是题解
    if (total > m) {
      return min1[0] + Math.floor(m / min1[1]);
    }
    // 如果m的长度刚好可以补足所有最短板，那么说明最短板可以全部升级到第二短板，且刚好用完m，因此第二短板的长度就是题解
    else if (total === m) {
      return min2[0];
    }
    // 如果m的长度足够长，能补足所有最短板到第二短板，还能有剩余，则将最短的数量加到第二短板的数量上，继续下轮循环
    else {
      m -= total;
      min2[1] += min1[1];
    }
  }

  return arr[0][0];
}`,cpp:`#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    map<int, int> count;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        count[x]++;
    }
    
    vector<pair<int, int>> arr(count.begin(), count.end());
    
    while (m > 0) {
        if (arr.size() == 1) {
            cout << arr[0].first + m / arr[0].second << endl;
            return 0;
        }
        
        auto min1 = arr[0];
        arr.erase(arr.begin());
        auto& min2 = arr[0];
        
        int diff = min2.first - min1.first;
        int total = diff * min1.second;
        
        if (total > m) {
            cout << min1.first + m / min1.second << endl;
            return 0;
        } else if (total == m) {
            cout << min2.first << endl;
            return 0;
        } else {
            m -= total;
            min2.second += min1.second;
        }
    }
    
    cout << arr[0].first << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int len;
    int count;
} Wood;

int cmp(const void* a, const void* b) {
    return ((Wood*)a)->len - ((Wood*)b)->len;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    
    int a[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    
    // 排序后统计
    qsort(a, n, sizeof(int), cmp);
    
    Wood arr[1000];
    int arrLen = 0;
    
    for (int i = 0; i < n; i++) {
        if (arrLen == 0 || arr[arrLen-1].len != a[i]) {
            arr[arrLen].len = a[i];
            arr[arrLen].count = 1;
            arrLen++;
        } else {
            arr[arrLen-1].count++;
        }
    }
    
    int idx = 0;
    while (m > 0 && idx < arrLen) {
        if (idx == arrLen - 1) {
            printf("%d\\n", arr[idx].len + m / arr[idx].count);
            return 0;
        }
        
        int diff = arr[idx+1].len - arr[idx].len;
        int total = diff * arr[idx].count;
        
        if (total > m) {
            printf("%d\\n", arr[idx].len + m / arr[idx].count);
            return 0;
        } else if (total == m) {
            printf("%d\\n", arr[idx+1].len);
            return 0;
        } else {
            m -= total;
            arr[idx+1].count += arr[idx].count;
            idx++;
        }
    }
    
    printf("%d\\n", arr[idx].len);
    return 0;
}`},u={id:"77",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:e,examples:r,solution:a,codes:o};export{o as codes,u as default,t as description,l as examType,r as examples,m as id,i as inputDesc,e as outputDesc,s as score,a as solution,n as title};
