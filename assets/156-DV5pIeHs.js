const p="156",n="最佳植树距离",m="A",l=200,i=`按照环保公司要求，小明需要在沙化严重的地区进行植树防沙工作，初步目标是种植一条直线的树带。由于有些区域目前不适合种植树木，所以只能在一些可以种植的点来种植树木。
在树苗有限的情况下，要达到最佳效果，就要尽量散开种植，不同树苗之间的最小间距要尽量大。给你一个适合种情树木的点坐标和一个树苗的数量，请帮小明选择一个最佳的最小种植间距。
例如，适合种植树木的位置分别为1,3,5,6,7,10,13 树苗数量是3，种植位置在1,7,13，树苗之间的间距都是6，均匀分开，就达到了散开种植的目的，最佳的最小种植间距是6
`,t=`第1行表示适合种树的坐标数量 第2行是适合种树的坐标位置 第3行是树苗的数量
例如：
7 1 5 3 6 10 7 13 3
`,s=`最佳的最小种植间距



本题是LeetCode - 1552 两球之间的磁力_伏城之外的博客-CSDN博客
的换皮题。题解请参考链接博客。
`,o=[{input:`7
1 5 3 6 10 7 13
3`,output:"6",explanation:"3棵树种在1,7,13位置，最小间距为6"},{input:`5
1 2 3 4 5
3`,output:"2",explanation:"3棵树种在1,3,5位置，最小间距为2"}],e=`**解题思路：**

本题是一道**二分答案**问题（LeetCode 1552变体）。

**核心思路：**
- 二分查找最大的最小间距
- 贪心验证该间距能否种下m棵树

**算法步骤：**
1. 对坐标排序
2. 二分范围[1, 最大坐标-最小坐标]
3. 对于mid间距，贪心验证能否种m棵树
4. 能种则尝试更大间距，否则缩小间距

**时间复杂度**：O(NlogN + NlogD)，D为坐标范围`,c={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    int[] positions = new int[n];
    for (int i = 0; i < n; i++) {
      positions[i] = sc.nextInt();
    }

    int m = sc.nextInt();

    System.out.println(getResult(n, positions, m));
  }

  public static int getResult(int n, int[] positions, int m) {
    Arrays.sort(positions);

    int min = 1, max = positions[n - 1] - positions[0];
    int ans = 0;

    while (min <= max) {
      int mid = (min + max) >> 1;

      if (check(positions, m, mid)) {
        ans = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    return ans;
  }

  public static boolean check(int[] positions, int m, int minDis) {
    int count = 1;

    int curPos = positions[0];
    for (int i = 1; i < positions.length; i++) {
      if (positions[i] - curPos >= minDis) {
        count++;
        curPos = positions[i];
      }
    }

    return count >= m;
  }
}`,python:`# 输入获取
n = int(input())
positions = list(map(int, input().split()))
m = int(input())


def check(minDis):
    count = 1
    curPos = positions[0]

    for i in range(1, n):
        if positions[i] - curPos >= minDis:
            count += 1
            curPos = positions[i]

    return count >= m


# 算法入口
def getResult():
    positions.sort()

    low = 1
    high = positions[-1] - positions[0]
    ans = 0

    while low <= high:
        mid = (low + high) >> 1

        if check(mid):
            ans = mid
            low = mid + 1
        else:
            high = mid - 1

    return ans


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const rl = require("readline").createInterface({
  input: process.stdin,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 3) {
    const n = lines[0] - 0;
    const positions = lines[1].split(" ").map(Number);
    const m = lines[2] - 0;

    console.log(getResult(n, positions, m));

    lines.length = 0;
  }
});

function getResult(n, positions, m) {
  positions.sort((a, b) => a - b);

  let min = 1;
  let max = positions[n - 1] - positions[0];
  let ans = 0;

  while (min <= max) {
    const mid = (min + max) >> 1;
    if (check(positions, m, mid)) {
      ans = mid;
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return ans;
}

function check(positions, m, minDis) {
  let count = 1;
  let curPos = positions[0];

  for (let i = 1; i < positions.length; i++) {
    if (positions[i] - curPos >= minDis) {
      count++;
      curPos = positions[i];
    }
  }

  return count >= m;
}`,cpp:"",c:""},a={id:"156",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:s,examples:o,solution:e,codes:c};export{c as codes,a as default,i as description,m as examType,o as examples,p as id,t as inputDesc,s as outputDesc,l as score,e as solution,n as title};
