const o="88",n="路灯照明问题",l="A",c=100,t=`在一条笔直的公路上安装了N个路灯，从位置0开始安装，路灯之间间距固定为100米。 每个路灯都有自己的照明半径，请计算第一个路灯和最后一个路灯之间，无法照明的区间的长度和。
`,e=`第一行为一个数N，表示路灯个数，1<=N<=100000 第二行为N个空格分隔的数，表示路灯的照明半径，1<=照明半径<=100000*100
`,r="第一个路灯和最后一个路灯之间，无法照明的区间的长度和。",s=[{input:`2
50 50`,output:"0",explanation:"路灯0在位置0，照明[-50,50]；路灯1在位置100，照明[50,150]。两区间刚好相接，无间隙。"},{input:`3
20 20 20`,output:"120",explanation:"路灯0照明[-20,20]，路灯1照明[80,120]，路灯2照明[180,220]。间隙：80-20=60，180-120=60，共120。"},{input:`2
150 150`,output:"0",explanation:"路灯0照明[-150,150]，路灯1照明[-50,250]。两区间完全重叠，无间隙。"}],i=`**解题思路：**

本题是一道**区间合并**问题。

**算法步骤：**
1. 将每个路灯的照明范围转化为区间[center-r, center+r]
2. 按起始位置升序排序区间
3. 遍历区间，判断与前一区间是否有交集
4. 有交集则合并，无交集则累加间隙
5. 返回间隙总和

**时间复杂度**：O(N log N)`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    int[][] ranges = new int[n][2];
    for (int i = 0; i < n; i++) {
      int center = i * 100;
      int r = sc.nextInt();
      ranges[i][0] = center - r;
      ranges[i][1] = center + r;
    }

    System.out.println(getResult(n, ranges));
  }

  public static int getResult(int n, int[][] ranges) {
    int ans = 0;

    // 按起始位置升序，起始位置相同，则继续按结束位置降序
    Arrays.sort(ranges, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);

    int t = ranges[0][1]; // 上一个区间的结束位置

    for (int i = 1; i < n; i++) {
      // 当前区间的【开始位置，结束位置】
      int s = ranges[i][0];
      int e = ranges[i][1];

      // 有交集
      if (t >= s) {
        // 合并后的新区间将变为下一轮的上一个区间，t为新区间的结束位置
        t = Math.max(e, t);
      } else {
        // 没有交集，则统计区间间隙 s - t
        ans += s - t;
        // 当前区间变为下一轮的上一个区间，更新t
        t = e;
      }
    }

    return ans;
  }
}`,python:`# 输入获取
n = int(input())
arr = list(map(int, input().split()))


# 算法入口
def getResult():
    rans = []

    for i in range(n):
        center = i * 100
        rans.append([center - arr[i], center + arr[i]])

    # 按起始位置升序，起始位置相同，则继续按结束位置降序
    rans.sort(key=lambda ran: (ran[0], -ran[1]))

    ans = 0

    t = rans[0][1]  # 上一个区间的结束位置
    for i in range(1, n):
        s, e = rans[i]  # 当前区间的【开始位置，结束位置】

        # 有交集
        if t >= s:
            # 合并后的新区间将变为下一轮的上一个区间，t为新区间的结束位置
            t = max(e, t)
        else:
            # 没有交集，则统计区间间隙 s - t
            ans += s - t
            #  当前区间变为下一轮的上一个区间，更新t
            t = e

    return ans


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const n = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);

    console.log(getResult(n, arr));

    lines.length = 0;
  }
});

function getResult(n, arr) {
  const ranges = [];

  for (let i = 0; i < n; i++) {
    const center = i * 100;
    ranges.push([center - arr[i], center + arr[i]]);
  }

  // 按起始位置升序，起始位置相同，则继续按结束位置降序
  ranges.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]));

  let ans = 0;

  let t = ranges[0][1]; // 上一个区间的结束位置
  for (let i = 1; i < n; i++) {
    const [s, e] = ranges[i]; // 当前区间的【开始位置，结束位置】

    // 有交集
    if (t >= s) {
      // 合并后的新区间将变为下一轮的上一个区间，t为新区间的结束位置
      t = Math.max(e, t);
    } else {
      // 没有交集，则统计区间间隙 s - t
      ans += s - t;
      // 当前区间变为下一轮的上一个区间，更新t
      t = e;
    }
  }

  return ans;
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<pair<long long, long long>> ranges(n);
    for (int i = 0; i < n; i++) {
        long long center = i * 100;
        long long r;
        cin >> r;
        ranges[i] = {center - r, center + r};
    }
    
    sort(ranges.begin(), ranges.end(), [](auto& a, auto& b) {
        return a.first != b.first ? a.first < b.first : a.second > b.second;
    });
    
    long long ans = 0;
    long long t = ranges[0].second;
    
    for (int i = 1; i < n; i++) {
        long long s = ranges[i].first;
        long long e = ranges[i].second;
        
        if (t >= s) {
            t = max(e, t);
        } else {
            ans += s - t;
            t = e;
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    long long start;
    long long end;
} Range;

int cmp(const void* a, const void* b) {
    Range* ra = (Range*)a;
    Range* rb = (Range*)b;
    if (ra->start != rb->start) return ra->start < rb->start ? -1 : 1;
    return rb->end < ra->end ? -1 : 1;
}

int main() {
    int n;
    scanf("%d", &n);
    
    Range ranges[n];
    for (int i = 0; i < n; i++) {
        long long center = i * 100;
        long long r;
        scanf("%lld", &r);
        ranges[i].start = center - r;
        ranges[i].end = center + r;
    }
    
    qsort(ranges, n, sizeof(Range), cmp);
    
    long long ans = 0;
    long long t = ranges[0].end;
    
    for (int i = 1; i < n; i++) {
        long long s = ranges[i].start;
        long long e = ranges[i].end;
        
        if (t >= s) {
            t = e > t ? e : t;
        } else {
            ans += s - t;
            t = e;
        }
    }
    
    printf("%lld\\n", ans);
    return 0;
}`},g={id:"88",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:r,examples:s,solution:i,codes:a};export{a as codes,g as default,t as description,l as examType,s as examples,o as id,e as inputDesc,r as outputDesc,c as score,i as solution,n as title};
