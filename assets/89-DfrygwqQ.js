const o="89",n="静态扫描",r="A",u=100,t=`静态扫描可以快速识别源代码的缺陷，静态扫描的结果以扫描报告作为输出：
1、文件扫描的成本和文件大小相关，如果文件大小为N，则扫描成本为N个金币
2、扫描报告的缓存成本和文件大小无关，每缓存一个报告需要M个金币
3、扫描报告缓存后，后继再碰到该文件则不需要扫描成本，直接获取缓存结果
给出源代码文件标识序列和文件大小序列，求解采用合理的缓存策略，最少需要的金币数。
`,i=`第一行为缓存一个报告金币数M，L<= M <= 100
第二行为文件标识序列：F1,F2,F3,....,Fn。
第三行为文件大小序列：S1,S2,S3,....,Sn。

备注：
1 <= N <= 100001 <= Fi <= 10001 <= Si <= 10
`,e="采用合理的缓存策略，需要的最少金币数。",s=[{input:`5
1 2 1 2 1
1 2 1 2 1`,output:"7",explanation:"文件1出现3次大小1，扫描成本3*1=3，缓存成本1+5=6，选3。文件2出现2次大小2，扫描成本2*2=4，缓存成本2+5=7，选4。共7。"},{input:`1
1 1 1
3 3 3`,output:"4",explanation:"文件1出现3次大小3，扫描成本3*3=9，缓存成本3+1=4。选缓存4。"},{input:`10
1 2 3
1 2 3`,output:"6",explanation:"每个文件只出现1次，缓存不划算。直接扫描成本1+2+3=6。"}],a=`**解题思路：**

本题是一道**贪心**问题。

**核心思路：**
对每个文件独立决策，比较两种策略的成本：
- 策略1：每次都重新扫描，成本 = 出现次数 × 文件大小
- 策略2：扫描一次+缓存，成本 = 文件大小 + 缓存费M

**算法步骤：**
1. 统计每个文件的出现次数和大小
2. 对每个文件选择成本更低的策略
3. 累加所有文件的最小成本

**时间复杂度**：O(N)`,c={java:`import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = Integer.parseInt(sc.nextLine());
    Integer[] f =
        Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
    Integer[] s =
        Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);

    System.out.println(getResult(m, f, s));
  }

  public static int getResult(int m, Integer[] f, Integer[] s) {
    // count用于保存每个文件出现的次数
    HashMap<Integer, Integer> count = new HashMap<>();
    // size用于保存文件的大小，即扫描成本
    HashMap<Integer, Integer> size = new HashMap<>();

    for (int i = 0; i < f.length; i++) {
      // k是文件标识
      Integer k = f[i];
      count.put(k, count.getOrDefault(k, 0) + 1);
      size.putIfAbsent(k, s[i]);
    }

    int ans = 0;
    for (Integer k : count.keySet()) {
      // 选择每次都重新扫描的成本  和  扫描一次+缓存的成本  中最小的
      ans += Math.min(count.get(k) * size.get(k), size.get(k) + m);
    }

    return ans;
  }
}`,python:`# 输入获取
m = int(input())
f = list(map(int, input().split()))
s = list(map(int, input().split()))


# 算法入口
def getResult(m, f, s):
    # count用于保存每个文件出现的次数
    count = {}
    # size用于保存文件的大小，即扫描成本
    size = {}

    for i in range(len(f)):
        # k是文件标识
        k = f[i]
        if count.get(k) is None:
            count[k] = 1
        else:
            count[k] += 1

        if size.get(k) is None:
            size[k] = s[i]

    ans = 0
    for k in count.keys():
        # 选择每次都重新扫描的成本  和  扫描一次+缓存的成本  中最小的
        ans += min(count[k] * size[k], size[k] + m)
    return ans


print(getResult(m, f, s))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let m, f, s;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 3) {
    m = lines[0] - 0;
    f = lines[1].split(" ").map(Number);
    s = lines[2].split(" ").map(Number);

    console.log(getResult(m, f, s));

    lines.length = 0;
  }
});

function getResult(m, f, s) {
  // count用于保存每个文件出现的次数
  const count = {};
  // size用于保存文件的大小，即扫描成本
  const size = {};
  for (let i = 0; i < f.length; i++) {
    // k是文件标识
    const k = f[i];
    count[k] ? count[k]++ : (count[k] = 1);
    if (!size[k]) {
      size[k] = s[i];
    }
  }

  let ans = 0;
  for (let k in count) {
    // 选择每次都重新扫描的成本  和  扫描一次+缓存的成本  中最小的
    ans += Math.min(count[k] * size[k], size[k] + m);
  }

  return ans;
}`,cpp:`#include <iostream>
#include <sstream>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int m;
    cin >> m;
    cin.ignore();
    
    string line1, line2;
    getline(cin, line1);
    getline(cin, line2);
    
    map<int, int> count, size;
    
    stringstream ss1(line1), ss2(line2);
    int fi, si;
    while (ss1 >> fi && ss2 >> si) {
        count[fi]++;
        if (size.find(fi) == size.end()) {
            size[fi] = si;
        }
    }
    
    int ans = 0;
    for (auto& p : count) {
        int k = p.first;
        ans += min(count[k] * size[k], size[k] + m);
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    int m;
    scanf("%d", &m);
    
    int f[10001], s[10001];
    int n = 0;
    
    while (scanf("%d", &f[n]) == 1) n++;
    for (int i = 0; i < n; i++) {
        scanf("%d", &s[i]);
    }
    
    int count[1001] = {0};
    int size[1001] = {0};
    int seen[1001] = {0};
    
    for (int i = 0; i < n; i++) {
        count[f[i]]++;
        if (!seen[f[i]]) {
            size[f[i]] = s[i];
            seen[f[i]] = 1;
        }
    }
    
    int ans = 0;
    for (int k = 1; k <= 1000; k++) {
        if (count[k] > 0) {
            int scan = count[k] * size[k];
            int cache = size[k] + m;
            ans += scan < cache ? scan : cache;
        }
    }
    
    printf("%d\\n", ans);
    return 0;
}`},l={id:"89",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:e,examples:s,solution:a,codes:c};export{c as codes,l as default,t as description,r as examType,s as examples,o as id,i as inputDesc,e as outputDesc,u as score,a as solution,n as title};
