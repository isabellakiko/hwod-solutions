const o="164",n="运输时间",c="A",p=200,t=`M（1 ≤ M ≤ 20）辆车需要在一条不能超车的单行道到达终点，起点到终点的距离为 N（1 ≤ N ≤ 400）。
速度快的车追上前车后，只能以前车的速度继续行驶，求最后一辆车到达目的地花费的时间。

注：每辆车固定间隔 1 小时出发，比如第一辆车 0 时出发，第二辆车 1 时出发，依次类推
`,i=`第一行两个数字：M N，分别代表车辆数和到终点的距离，以空格分隔
接下来 M 行，每行一个数字 S，代表每辆车的速度。0 < S < 30
`,e=`最后一辆车到达目的地花费的时间


本题需要注意的是：速度快的车追上前车后，是可以和前车并行的。即本题的：
一条不能超车的单行道
指的应该是"单向"车道，即可能有多条单向车道，支持多辆车并行。

因此本题的解题就很简单了，由于后车不能超过前车，因此：

本题要求输出的是：到达目的地花费的时间 = 到达时刻 - 出发时刻

另外，需要注意，本题输出可能是小数，但是本题并没有说保留几位有效小数，我这边默认保留3位有效小数，四舍五入，实际考试时视情况改动。

`,a=[{input:`3 100
10
20
5`,output:"20",explanation:"3辆车距离100。车1速度10需10h到达，车2速度20需6h(1时出发7时到)，车3速度5需21h(2时出发23时到)但被车1阻碍。最后一辆花费20小时"},{input:`2 10
5
10`,output:"2",explanation:"车1需2h，车2需1h但1时出发会在2时到达，两车同时到达，最后一辆花费2小时"}],r=`**解题思路：**

本题是一道**模拟**问题。

**核心思路：**
- 后车不能超过前车
- 后车到达时刻=max(自身到达时刻,前车到达时刻)
- 花费时间=到达时刻-出发时刻

**算法步骤：**
1. 依次计算每辆车的到达时刻
2. 当前车到达时刻=max(前车到达时刻, 距离/速度+出发时刻)
3. 最后一辆车花费时间=到达时刻-(m-1)

**时间复杂度**：O(M)`,s={java:`import java.text.NumberFormat;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();
    int n = sc.nextInt();

    // 记录前车到达终点的时刻，本题后车不可能比前车更早到达，因此如果后车到达时刻 < 前车到达时刻arrived，则后车也是按照前车arrived时刻达到
    double arrived = 0;

    for (int i = 0; i < m; i++) {
      // 当前车的速度
      double speed = sc.nextDouble();
      // 当前车到达终点的时刻
      // * 当前车如果比前车更早到达，则被前车阻碍，按前车到达时间算
      // * 当前车如果比前车更晚到达，则不被前车阻碍，按后车到达时间算
      arrived = Math.max(arrived, n / speed + i); // n*1.0/speed是行驶花费时间； i是第i辆车的出发时间
    }

    // 到达时刻 - 出发时刻 = 路上花费的时间
    double cost = arrived - (m - 1);

    // 格式化打印小数
    NumberFormat nf = NumberFormat.getInstance();
    nf.setMinimumFractionDigits(0); // 没有小数位则不保留
    nf.setMaximumFractionDigits(3); // 有小数位则至多保留3位

    System.out.println(nf.format(cost));
  }
}`,python:`# 输入获取
m, n = map(int, input().split())

# 记录前车到达终点的时刻，本题后车不可能比前车更早到达，因此如果后车到达时刻 < 前车到达时刻arrived，则后车也是按照前车arrived时刻达到
arrived = 0

for i in range(m):
    # 当前车的速度
    speed = int(input())
    # 当前车到达终点的时刻
    # * 当前车如果比前车更早到达，则被前车阻碍，按前车到达时间算
    # * 当前车如果比前车更晚到达，则不被前车阻碍，按后车到达时间算
    arrived = max(arrived, n / speed + i)  # n*1.0/speed是行驶花费时间； i是第i辆车的出发时间

# 到达时刻 - 出发时刻 = 路上花费的时间
cost = arrived - (m - 1)

print("{:g}".format(round(cost, 3)))  # 如果有小数位则至多保留3位，:g 用于去除无效小数位`,javascript:"",cpp:"",c:""},m={id:"164",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:e,examples:a,solution:r,codes:s};export{s as codes,m as default,t as description,c as examType,a as examples,o as id,i as inputDesc,e as outputDesc,p as score,r as solution,n as title};
