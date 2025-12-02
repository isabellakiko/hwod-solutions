const a="222",n="贪心歌手",p="B",m=200,t=`一个歌手准备从A城去B城参加演出。
按照合同，他必须在 T 天内赶到歌手途经 N 座城市歌手不能往回走每两座城市之间需要的天数都可以提前获知。歌手在每座城市都可以在路边卖唱赚钱。 经过调研，歌手提前获知了每座城市卖唱的收入预期： 如果在一座城市第一天卖唱可以赚M，后续每天的收入会减少D（第二天赚的钱是 M - D，第三天是 M - 2D ...）。如果收入减少到 0 就不会再少了。歌手到达后的第二天才能开始卖唱。如果今天卖过唱，第二天才能出发。
贪心的歌手最多可以赚多少钱？
`,e=`第一行两个数字 T 和 N，中间用空格隔开。
T 代表总天数，0 < T < 1000N 代表路上经过 N 座城市，0 < N < 100
第二行 N+1 个数字，中间用空格隔开。代表每两座城市之间耗费的时间。
其总和 ≤ T。
接下来 N 行，每行两个数字 M 和 D，中间用空格隔开。代表每个城市的输入预期。
0 < M < 10000 < D < 100
`,i=`一个数字。代表歌手最多可以赚多少钱。以回车结束。

总共10天，路上经过2座城市。
路上共花 1+1+2=4 天
剩余6天最好的计划是在第一座城市待3天，在第二座城市待3天。
在第一座城市赚的钱：120 + 100 + 80 = 300
在第二座城市赚的钱：90 + 80 + 70 = 240
一共 300 + 240 = 540。

本题歌手必须从A到B，因此输入的第二行各个城市间的花费的路程时间之和roadCost是必须的，即可用于卖唱赚钱的时间 remain 为 T - roadCost。

我们需要规划 remain 时间，合理分配给各个城市，保证时间分配方案能够赚的钱最多。
按照题目意思，每个城市停留的第一天赚m钱，后面每天减少d，
每个城市停留Y天，那么这Y天中赚的钱是严格递减的，且最后一天（第Y天）赚的钱最少

假设歌手目前在X市
如果 x > y，则我们应该将前面赚 y 钱的时间，空闲出来，用于当天赚 x 元，这种替换逻辑，不会改变歌手的行程顺序
如果 x <= y，则X市就没有必要待下去了，因为继续待下去赚的钱只会比x少
上面逻辑中，在前面城市（前面时间）中找一个最小赚的钱，非常适合使用优先队列。因此我们可以使用优先队列记录已经赚的钱（按天），如果当天停留会超出remain限制，那么就取出优先队列中最小赚的钱，和当天停留可以赚的钱比较，如果当天停留可以赚更多钱，则弹出优先队列中最小赚的钱（含义是：将赚最少钱的那天时间空出来）。

`,s=[],o="",r={java:`import java.util.PriorityQueue;
import java.util.Scanner;

public class Main {
  static int t;
  static int n;
  static int roadCost;
  static int[][] mds;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    t = sc.nextInt();
    n = sc.nextInt();

    // roadCost是A~B城市必需的路程时间
    roadCost = 0;
    for (int i = 0; i < n + 1; i++) {
      roadCost += sc.nextInt();
    }

    mds = new int[n][2];
    for (int i = 0; i < n; i++) {
      mds[i][0] = sc.nextInt();
      mds[i][1] = sc.nextInt();
    }

    System.out.println(getResult());
  }

  public static int getResult() {
    // remain是刨去必要的路程时间后，剩余可以用于赚钱的时间
    int remain = t - roadCost;

    // 如果没有剩余时间可以用，则赚不到钱
    if (remain <= 0) {
      return 0;
    }

    // 优先队列（小顶堆）记录赚到的钱, 即堆顶是某天赚的最少的钱
    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> a - b);

    for (int[] md : mds) {
      // 第一天卖唱可以赚m，后续每天的收入会减少d
      int m = md[0];
      int d = md[1];

      // 只要在当前城市还有钱赚，那么就继续待
      while (m > 0) {
        // 只有remain天可以赚钱，超出的时间不能赚钱，因此需要比较超出的时间赚的钱m，和前面时间中赚的最少的钱pq.peek
        if (pq.size() >= remain) {
          // pq.peek只可能是某座城市停留的最后一天的赚的钱，因为每座城市都是停留的最后一天赚的钱最少
          if (m > pq.peek()) {
            // 如果当前城市当天赚的钱m，比前面天里面赚的最少的pq.peek多，那么就赚pq.peek钱的那天时间节约下来，给当天用
            pq.poll();
          } else {
            // 如果当前城市当天赚的钱m，比前面天里面赚的最少的pq.peek还少，则当前城市继续待下去赚的钱只会更少，因此没必要呆下去了
            break;
          }
        }

        // 如果所有城市停留时间没有超出remain天，或者当天是超出的时间，但是比前面赚的最少的一天的赚的更多，则赚m更优
        pq.add(m);

        //  每天收入减少d
        m -= d;
      }
    }

    return pq.stream().reduce(Integer::sum).orElse(0);
  }
}`,python:`import heapq

# 输入获取
t, n = map(int, input().split())
roadCost = sum(map(int, input().split()))
mds = [list(map(int, input().split())) for _ in range(n)]


# 算法入口
def getResult():
    # remain是刨去必要的路程时间后，剩余可以用于赚钱的时间
    remain = t - roadCost

    # 如果没有剩余时间可以用，则赚不到钱
    if remain <= 0:
        return 0

    # 优先队列（小顶堆）记录赚到的钱, 即堆顶是某天赚的最少的钱
    pq = []
    # 第一天卖唱可以赚m，后续每天的收入会减少d
    for m, d in mds:
        # 只要在当前城市还有钱赚，那么就继续待
        while m > 0:
            # 只有remain天可以赚钱，超出的时间不能赚钱，因此需要比较超出的时间赚的钱m，和前面时间中赚的最少的钱pq[0]
            if len(pq) >= remain:
                # pq[0]只可能是某座城市停留的最后一天的赚的钱，因为每座城市都是停留的最后一天赚的钱最少
                if m > pq[0]:
                    # 如果当前城市当天赚的钱m，比前面天里面赚的最少的pq[0]多，那么就赚pq[0]钱的那天时间节约下来，给当天用
                    heapq.heappop(pq)
                else:
                    # 如果当前城市当天赚的钱m，比前面天里面赚的最少的pq[0]还少，则当前城市继续待下去赚的钱只会更少，因此没必要呆下去了
                    break

            # 如果所有城市停留时间没有超出remain天，或者当天是超出的时间，但是比前面赚的最少的一天的赚的更多，则赚m更优
            heapq.heappush(pq, m)

            # 每天收入减少d
            m -= d

    return sum(pq)


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},c={id:"222",title:n,examType:"B",score:200,description:t,inputDesc:e,outputDesc:i,examples:s,solution:"",codes:r};export{r as codes,c as default,t as description,p as examType,s as examples,a as id,e as inputDesc,i as outputDesc,m as score,o as solution,n as title};
