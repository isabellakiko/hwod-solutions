const c="162",n="编码能力提升计划",o="A",l=200,t=`为了提升软件编码能力，小王制定了刷题计划，他选了题库中的n道题，编号从0到n-1，并计划在m天内按照题目编号顺序刷完所有的题目（注意，小王不能用多天完成同一题）。
在小王刷题计划中，小王需要用tme[i]的时间完成编号 i 的题目。
此外，小王还可以查看答案，可以省去该题的做题时间。为了真正达到刷题效果，小王每天最多直接看一次答案。
我们定义m天中做题时间最多的一天耗时为T（直接看答案的题目不计入做题总时间)。
请你帮小王求出最小的T是多少。
`,i=`第一行输入为time，time[i]的时间完成编号 i 的题目
第二行输入为m，m表示几天内完成所有题目，1 ≤ m ≤ 180
`,e=`最小耗时整数T

第一天完成前3题，第3题看答案;
第二天完成第4题和第5题，第5题看答案；
第三天完成第6和第7题，第7提看答案;
第四天完成第8题，直接看答案:
第五天完成第9题，直接看答案

本题要求的 T 即为每天最多要花费的做题时间，比如T=5，即表示每天最多有5个小时做题。另外，在每天花费T时间做题的情况下，要在m天中做完所有题目。
现在这种可能解T有多个，我们要找到这些可能解中最小的T。
这是一个典型的最大最小问题，我们可以用二分法解题。

二分法用于求解可能解T，首先需要确定T的两个边界范围（初始的二分范围）。
因此，T的取值范围是 [0, sum(time) - max(time)]
我们通过二分法，取中间值作为可能解 t，然后进行验证，该 t 是否可以保证在 m 天内完成 所有题目：
这样最终我们就能求得最小的T。

但是本题的难点不在于二分法，而在于如何验证 t 是否能在 m 天内完成所有题目？
我们以用例2为例来讲解：
首先 T 的初始取值范围是 [0, 30]，我们二分求得中间值 t = 15
下面即开始验证，每天只有15个时间单位做题目，是否可以再 m = 5 天内完成所有题目。

注意：此时我们有一次看答案机会，但是我们应该用这次机会看哪一题答案呢？
很简单，我们应该将这次宝贵的机会用在看耗时最长的题目上，而这些题目中耗时最长的是time[4]，因此我们看time[4]题目的答案，总耗时17 - 5 = 12。

这里，可能有人会有疑问，我们如果看time[5]答案，那么总耗时17 - 4 = 13，也可以不超时呀。我们可以假设，如果下一题time[6]耗时是3，那么会产生什么影响？
因此，看time[4]答案是更优策略。
第1天做到了time[6]，那么第2天从time[7]开始做。
因此，当t = 15时，只需要2天（< m）就能做完所有题目。所以 t = 15 是一个可能解，但不一定时最优解，我们应该尝试更小的 t。

接下来 T 的范围缩小为 [0, 14]，我们二分求得中间值 t = 7。
按照上面思路，继续验证 t 是否能满足 m 天内完成所有题目。
`,s=[{input:`5,4,5,3,4,5,3,4,5,3
5`,output:"9",explanation:"5天完成10题，每天可看一次答案，最大单日耗时最小化为9"},{input:`1,2,3
2`,output:"3",explanation:"2天完成，第一天1+2=3(或看答案)，第二天3"}],m=`**解题思路：**

本题是一道**二分答案**问题。

**核心思路：**
- 二分查找最小的每日最大耗时T
- 每天可看一次答案(跳过最耗时的题)
- 验证能否在m天内完成

**算法步骤：**
1. 二分范围[0, sum-max]
2. 验证：模拟每天做题，超时则用看答案机会
3. 看答案跳过当天最耗时的题
4. 统计需要的天数是否≤m

**时间复杂度**：O(NlogS)，S为总耗时`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  static int[] times;
  static int m;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    times = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    m = Integer.parseInt(sc.nextLine());

    System.out.println(getResult());
  }

  public static int getResult() {
    int sum = 0;
    int max = 0;
    for (int time : times) {
      sum += time;
      max = Math.max(time, max);
    }

    // T的初始取值范围
    int low = 0;
    int high = sum - max;

    // 二分
    while (low <= high) {
      // 取中间值尝试
      int mid = (low + high) >> 1;

      if (check(mid)) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }

  public static boolean check(int t) {
    // 今天总耗时
    int sum_cost = 0;
    // 今天耗时最多的题目的耗时
    int max_cost = 0;
    // 今天是否可以申请帮助
    boolean canHelp = true;

    // 第几天
    int day = 1;

    int i = 0;
    while (i < times.length) {
      sum_cost += times[i];
      max_cost = Math.max(max_cost, times[i]);

      if (sum_cost > t) {
        // 如果做完times[i]，总耗时超过了t
        if (canHelp) {
          // 如果可以申请帮助，那么就看耗时最长的题目的答案
          sum_cost -= max_cost;
          // 今天申请帮助的机会用完了
          canHelp = false;
          // 下面继续做下一题
          i++;
        } else {
          // 如果不能申请帮助，则今天做不了times[i]题目，只能放到明天做
          // 进入明天
          day++;
          // 重置总耗时，最大耗时题目，以及申请帮助机会
          sum_cost = 0;
          max_cost = 0;
          canHelp = true;
        }
      } else {
        // 如果做完times[i]，总耗时没有超过t，则继续做下面的题目
        i++;
      }
    }

    return day <= m;
  }
}`,python:`# 输入获取
times = list(map(int, input().split(",")))
m = int(input())


def check(t):
    # 今天总耗时
    sum_cost = 0
    # 今天耗时最多的题目的耗时
    max_cost = 0
    # 今天是否可以申请帮助
    canHelp = True

    # 第几天
    day = 1

    i = 0
    while i < len(times):
        sum_cost += times[i]
        max_cost = max(max_cost, times[i])

        if sum_cost > t:
            # 如果做完times[i]，总耗时超过了t
            if canHelp:
                # 如果可以申请帮助，那么就看耗时最长的题目的答案
                sum_cost -= max_cost
                # 今天申请帮助的机会用完了
                canHelp = False
                # 下面继续做下一题
                i += 1
            else:
                # 如果不能申请帮助，则今天做不了times[i]题目，只能放到明天做
                # 进入明天
                day += 1
                # 重置总耗时，最大耗时题目，以及申请帮助机会
                sum_cost = 0
                max_cost = 0
                canHelp = True
        else:
            # 如果做完times[i]，总耗时没有超过t，则继续做下面的题目
            i += 1

    return day <= m


# 算法入口
def getResult():
    # T的初始取值范围
    low = 0
    high = sum(times) - max(times)

    # 二分
    while low <= high:
        # 取中间值尝试
        mid = (low + high) >> 1

        if check(mid):
            high = mid - 1
        else:
            low = mid + 1

    return low


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},u={id:"162",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:e,examples:s,solution:m,codes:a};export{a as codes,u as default,t as description,o as examType,s as examples,c as id,i as inputDesc,e as outputDesc,l as score,m as solution,n as title};
