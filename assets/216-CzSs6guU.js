const l="216",n="服务中心选址",r="B",p=200,t=`一个快递公司希望在一条街道建立新的服务中心。公司统计了该街道中所有区域在地图上的位置，并希望能够以此为依据为新的服务中心选址：使服务中心到所有区域的距离的总和最小。
给你一个数组positions，其中positions[i] = [left, right] 表示第 i 个区域在街道上的位置，其中left代表区域的左侧的起点，right代表区域的右侧终点，假设服务中心的位置为location：
如果第 i 个区域的右侧终点right满足 right < location，则第 i 个区域到服务中心的距离为 location - right；如果第 i 个区域的左侧起点left 满足 left > location，则第 i 个区域到服务中心的距离为left - location；如果第 i 个区域的两侧left，right满足left <= location <= right，则第 i 个区域到服务中心的距离为0
选择最佳的服务中心位置为location，请返回最佳的服务中心位置到所有区域的距离总和的最小值。
`,i=`先输入区域数组positions的长度n（1 ≤ n ≤ 10^5）
接下来 n 行每行输入成对的left和right值，以空格隔开
-10^9 ＜left ≤ 10^9-10^9 ＜right ≤ 10^9
`,e=`输出为location


根据网友反馈进行分析得出，本题中各区域应该是有交集的。
我想了很久，如何求解某个点到有交集区域的最小距离和，但是没有什么好的办法，直到我死心准备用暴力法求解时，发现了一丝丝生机。下面是暴力法测试过程：
测试用例：含区域交集情况
11 -10 10 1 2 3 4 5 10 6 8 7 12 9 13 15 20 31 41 22 35 34 50

JavaScript暴力实现

可以发现，当服务中心选址10位置时，到各区间距离之和最小为78

Java暴力实现

可以发现，当服务中心选址10位置时，到各区间距离之和最小为78

Python暴力实现

可以发现，当服务中心选址10位置时，到各区间距离之和最小为78

上面暴力法过程中，我首先获得了所有区间中最左边的点min，和最右边的点max，并遍历这两个点之间每一个点作为服务中心地址 i ，并求每个服务中心地址到各区域的距离之和 dis，然后将它们成对打印出来，结果发现一个现象：

随着 服务中心位置 i 的变化，服务中心到各区域的距离之和 dis 呈现上图U型曲线。
即，一定存在一个 i ，其左边点 i-0.5 的，和其右边点 i+0.5 到各区域的距离和大于它。

因此，我想是否可以用二分法求解，即取min点和max点的中间点mid作为服务中心位置，：
这样一搞，我们最终就可以找到最低dis的mid点。

2023.04.12 上面的二分策略存在问题，本题要求解凹函数的极值，应该使用三分法求解。
关于三分法请看：https://blog.csdn.net/qfc_128220/article/details/130097676

2023.04.19 今天又有考友考到这题了，上面解法还是27%通过率。我已经emo了。
然后我又读了一遍题目，发现：
难道实际机试系统要求输出的是：服务中心的位置？
`,s=[],c="",o={java:`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
  static double[][] positions;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    positions = new double[n][2];
    for (int i = 0; i < n; i++) {
      positions[i][0] = sc.nextDouble();
      positions[i][1] = sc.nextDouble();
    }

    System.out.println(getResult());
  }

  public static int getResult() {
    ArrayList<Double> tmp = new ArrayList<>();
    for (double[] pos : positions) {
      tmp.add(pos[0]);
      tmp.add(pos[1]);
    }
    tmp.sort(Double::compareTo);

    double l = tmp.get(0);
    double r = tmp.get(tmp.size() - 1);
    double eps = 1e-5;

    while (r - l >= eps) {
      double k = (r - l) / 3;
      double ml = l + k;
      double mr = r - k;

      if (getDistance(ml) < getDistance(mr)) {
        r = mr;
      } else {
        l = ml;
      }
    }

    return (int) getDistance(l);
  }

  public static double getDistance(double t) {
    double dis = 0;
    for (double[] pos : positions) {
      double l = pos[0];
      double r = pos[1];
      if (r < t) dis += t - r;
      else if (t < l) dis += l - t;
    }
    return dis;
  }
}`,python:`import math

# 输入获取
n = int(input())
positions = [list(map(float, input().split())) for _ in range(n)]


# 算法入口
def getResult():
    tmp = []
    for pos in positions:
        tmp.extend(pos)
    tmp.sort()

    l = tmp[0]
    r = tmp[-1]
    eps = 1e-5

    while r - l >= eps:
        k = (r - l) / 3
        ml = l + k
        mr = r - k

        if getDistance(ml) < getDistance(mr):
            r = mr
        else:
            l = ml

    return int(getDistance(l))


def getDistance(t):
    dis = 0
    for l, r in positions:
        if r < t:
            dis += t - r
        elif t < l:
            dis += l - t
    return dis


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let n, positions;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    n = lines[0] - 0;
  }

  if (n && lines.length === n + 1) {
    positions = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(n, positions));
    lines.length = 0;
  }
});

function getResult() {
  const tmp = positions.flat(2).sort((a, b) => a - b);

  let l = tmp.at(0);
  let r = tmp.at(-1);
  const eps = 1e-5;

  while (r - l >= eps) {
    const k = (r - l) / 3;
    const ml = l + k;
    const mr = r - k;

    if (getDistance(ml) < getDistance(mr)) {
      r = mr;
    } else {
      l = ml;
    }
  }

  return Math.floor(getDistance(l));
}

function getDistance(t) {
  let dis = 0;
  for (let [l, r] of positions) {
    if (r < t) dis += t - r;
    else if (t < l) dis += l - t;
  }
  return dis;
}`,cpp:"",c:""},a={id:"216",title:n,examType:"B",score:200,description:t,inputDesc:i,outputDesc:e,examples:s,solution:"",codes:o};export{o as codes,a as default,t as description,r as examType,s as examples,l as id,i as inputDesc,e as outputDesc,p as score,c as solution,n as title};
