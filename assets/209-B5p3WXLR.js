const l="209",n="士兵过河",r="B",o=200,i=`一支N个士兵的军队正在趁夜色逃亡，途中遇到一条湍急的大河。 敌军在T的时长后到达河面，没到过对岸的士兵都会被消灭。 现在军队只找到了1只小船，这船最多能同时坐上2个士兵。
当1个士兵划船过河，用时为 a[i]；0 <= i < N当2个士兵坐船同时划船过河时，用时为max(a[j],a[i])两士兵中用时最长的。当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。如果士兵下河游泳，则会被湍急水流直接带走，算作死亡。
请帮忙给出一种解决方案，保证存活的士兵最多，且过河用时最短。
`,t=`第一行：N 表示士兵数(0<N<1,000,000) 第二行：T 表示敌军到达时长(0 < T < 100,000,000) 第三行：a[0] a[1] … a[i]… a[N- 1] a[i]表示每个士兵的过河时长。 (10 < a[i]< 100; 0<= i< N）
`,e=`第一行：”最多存活士兵数” “最短用时”

1）两个士兵的同时划船时，如果划速不同则会导致船原地转圈圈；所以为保持两个士兵划速相同，则需要向划的慢的士兵看齐。 2）两个士兵坐船时，重量增加吃水加深，水的阻力增大；同样的力量划船速度会变慢； 3）由于河水湍急大量的力用来抵消水流的阻力，所以2）中过河用时不是a[i] *2， 而是a[i] * 10。

可以达到或小于171的一种方案： 第一步：a[1] a[2] 过桥用时：13 第二步：a[1] 带火把返回用时：12 第三步：a[0] a[5] 过桥用时：35 第四步：a[2] 带火把返回用时：13 第五步：a[1] a[2] 过桥用时：13 第六步：a[1] 带火把返回用时：12 第七步：a[4] a[6] 过桥用时：20 第八步：a[2] 带火把返回用时：13 第九步：a[1] a[3] 过桥用时：15 第十步：a[1] 带火把返回用时：12 第十一步：a[1] a[2] 过桥用时：13
所以输出为：
7 171

本题是 POJ - 1700 Crossing River_伏城之外的博客-CSDN博客 的变种题。
建议大家先搞定这题，然后再来看本题。

本题在前面这题的基础上，多了一个过河时间限制，以及要求最多存活士兵（即在限制时间内过最多的人）

对于贪心解法，可以结合二分法来求解本题。
即在0~N中尝试找到成功过河的人数，其中0指的是成功过河的人数为0个，N指的是成功过河的人数为N个。
将二分法找到的可能人数mid带入上面POJ-1700的逻辑中，计算出mid个人都过河所需的最短时间need，将need和本题过河时间限制limit进行比较：

对于动态规划解法，由于是从0人过河递推到N人过河，因此不需要二分尝试过河人数，而是可以直接基于dp[i]来实时比较T，如果超过了T，则说明只能过河 i 人，耗时dp[i-1]

另外，本题中说：
当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。
假设x士兵划船用时为a[x]，y士兵划船用时为a[y]，a[x] < a[y]
这句话的意思是：如果x,y一起划船，有两种过河时间，分别是：
如果a[y] > a[x] * 10，我们应该选择a[x] * 10，即让较快的士兵单独划船过河，这样耗时更短。

但是，本题中又说：
(10 < a[i]< 100; 0<= i< N）
即
那么必然：100 < a[x] * 10 < 1000
即必然 a[x] * 10 > a[y]
因此，我们不需要考虑上面那种两个士兵坐船，一个士兵划船的情况。
`,s=[{input:`7
171
12 13 15 20 35 24 17`,output:"7 171",explanation:"全部7人可在171时间内过河"},{input:`3
20
11 12 13`,output:"2 12",explanation:"时间20只够2人过河，最短用时12"}],a=`**解题思路：**

本题是一道**二分+贪心过河**问题（POJ-1700变种）。

**核心思路：**
- 二分搜索能过河的人数
- 贪心计算n人过河最短时间

**算法步骤：**
1. 排序过河时间
2. 二分搜索可过河人数
3. 贪心策略：最快两人送最慢两人
4. 返回最多人数和最短时间

**时间复杂度**：O(N*logN)`,m={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();
    int t = sc.nextInt();

    int[] times = new int[n];

    for (int i = 0; i < n; i++) {
      times[i] = sc.nextInt();
    }

    System.out.println(getResult(n, t, times));
  }

  /**
   * @param n 士兵数
   * @param limit 过河时间上限
   * @param times 数组，元素表示每个士兵的过河时长
   * @return ”最多存活士兵数” “最短用时”
   */
  public static String getResult(int n, int limit, int[] times) {
    // 过河时间升序
    Arrays.sort(times);

    // 最少成功过河人数
    int min = 0;
    // 最多成功过河人数
    int max = n;

    // 记录题解
    String ans = "";

    // 二分法取可能成功的过河人数
    while (min <= max) {
      // mid是过河人数
      int mid = (min + max) / 2;
      // 计算mid个人过河所需的最短时间need
      int need = getMinCrossRiverTime(mid, Arrays.copyOfRange(times, 0, mid));

      // 如果need超过了过河时间上限limit，那么说明能成功过河的人没这么多
      if (need > limit) {
        max = mid - 1;
      } else if (need < limit) {
        // 如果need小于过河时间上限limit，那么说明mid个最快的人可以在limit时间内成功过河
        ans = mid + " " + need;
        // 但是可能还可以过更多人
        min = mid + 1;
      } else {
        // 如果need == limit，那么说明过河人数刚好可以在limit时间内成功过河，此时可以直接返回
        ans = mid + " " + need;
        break;
      }
    }

    return ans;
  }

  // 计算将n个人运到河对岸所需要花费的最少时间
  public static int getMinCrossRiverTime(int n, int[] t) {
    int cost = 0;

    while (n > 0) {
      if (n == 1) {
        cost += t[0];
        break;
      } else if (n == 2) {
        cost += t[1];
        break;
      } else if (n == 3) {
        cost += t[1] + t[0] + t[2];
        break;
      } else {
        cost += Math.min(t[n - 1] + t[0] + t[n - 2] + t[0], t[1] + t[0] + t[n - 1] + t[1]);
        n -= 2;
      }
    }

    return cost;
  }
}`,python:`# 输入获取
n = int(input())
t = int(input())
times = list(map(int, input().split()))


# 计算n个人运到河对岸所需要花费的最少时间
def getMinCrossRiverTime(n, t):
    cost = 0

    while n > 0:
        if n == 1:
            cost += t[0]
            break
        elif n == 2:
            cost += t[1]
            break
        elif n == 3:
            cost += t[1] + t[0] + t[2]
            break
        else:
            cost += min(t[n - 1] + t[0] + t[n - 2] + t[0], t[1] + t[0] + t[n - 1] + t[1])
            n -= 2

    return cost


# 算法入口
def getResult(n, limit, times):
    """
    :param n: 士兵数
    :param limit: 过河时间上限
    :param times: 数组，元素表示每个士兵的过河时长
    :return: ”最多存活士兵数” “最短用时”
    """
    times.sort()

    # 最少成功过河人数
    low = 0
    # 最多成功过河人数
    high = n

    # 记录题解
    ans = ""

    # 二分法取可能成功的过河人数
    while low <= high:
        # mid是过河人数
        mid = (low + high) // 2
        # 计算mid个人过河所需的最短时间need
        need = getMinCrossRiverTime(mid, times[:mid])

        # 如果need超过了过河时间上限limit，那么说明能成功过河的人没这么多
        if need > limit:
            high = mid - 1
        elif need < limit:
            # 如果need小于过河时间上限limit，那么说明mid个最快的人可以在limit时间内成功过河
            ans = f"{mid} {need}"
            # 但是可能还可以过更多人
            low = mid + 1
        else:
            # 如果need == limit，那么说明过河人数刚好可以在limit时间内成功过河，此时可以直接返回
            ans = f"{mid} {need}"
            break

    return ans


# 算法调用
print(getResult(n, t, times))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 3) {
    const N = lines[0] - 0;
    const T = lines[1] - 0;
    const times = lines[2].split(" ").map(Number);
    console.log(getResult(N, T, times));
    lines.length = 0;
  }
});

/**
 *
 * @param {*} n 士兵数
 * @param {*} limit 过河时间上限
 * @param {*} times 数组，元素表示每个士兵的过河时长
 * @return {*} ”最多存活士兵数” “最短用时”
 */
function getResult(n, limit, times) {
  // 过河时间升序
  times.sort((a, b) => a - b);

  // 最少成功过河人数
  let min = 0;
  // 最多成功过河人数
  let max = n;

  // 记录题解
  let ans = "";

  // 二分法取可能成功的过河人数
  while (min <= max) {
    // mid是过河人数
    const mid = Math.floor((min + max) / 2);
    // 计算mid个人过河所需的最短时间need
    const need = getMinCrossRiverTime(mid, times.slice(0, mid));

    // 如果need超过了过河时间上限limit，那么说明能成功过河的人没这么多
    if (need > limit) {
      max = mid - 1;
    } else if (need < limit) {
      // 如果need小于过河时间上限limit，那么说明mid个最快的人可以在limit时间内成功过河
      ans = \`\${mid} \${need}\`;
      // 但是可能还可以过更多人
      min = mid + 1;
    } else {
      // 如果need == limit，那么说明过河人数刚好可以在limit时间内成功过河，此时可以直接返回
      ans = \`\${mid} \${need}\`;
      break;
    }
  }

  return ans;
}

// 计算n个人运到河对岸所需要花费的最少时间
function getMinCrossRiverTime(n, t) {
  let cost = 0;

  while (n > 0) {
    if (n == 1) {
      cost += t[0];
      break;
    } else if (n == 2) {
      cost += t[1];
      break;
    } else if (n == 3) {
      cost += t[1] + t[0] + t[2];
      break;
    } else {
      cost += Math.min(
        t[n - 1] + t[0] + t[n - 2] + t[0],
        t[1] + t[0] + t[n - 1] + t[1]
      );
      n -= 2;
    }
  }

  return cost;
}`,cpp:"",c:""},d={id:"209",title:n,examType:"B",score:200,description:i,inputDesc:t,outputDesc:e,examples:s,solution:a,codes:m};export{m as codes,d as default,i as description,r as examType,s as examples,l as id,t as inputDesc,e as outputDesc,o as score,a as solution,n as title};
