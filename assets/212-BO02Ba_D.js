const r="212",n="抢7游戏",c="B",C=200,t=`A、B两个人玩抢7游戏，游戏规则为：
A先报一个起始数字 X（10 ≤ 起始数字 ≤ 10000），B报下一个数字 Y （X - Y < 3），A再报一个数字 Z（Y - Z < 3），以此类推，直到其中一个抢到7，抢到7即为胜者；
在B赢得比赛的情况下，一共有多少种组合？
`,o=`起始数字 M
10 ≤ M ≤ 10000
如：
100
`,e=`B能赢得比赛的组合次数


下面模拟M为10~14时，B能够获胜的一些情况：

看完上图，我们可以发现：
抛开A首次叫的数字M，剩下的 M - 7 长度（上图中有颜色的），必须发生奇数次叫，才能保证B获胜。
原因是：奇数次叫中，第一次必然是B，由于是奇数次，因此最后一次也必然是B，比如
BAB
BABAB
都是奇数次。
因此我们只需要将整数 M - 7 划分为奇数块即可，且每块取值只能是1或2。

我们可以假设初始时，一共发生了M-7次叫（M-7可能不是奇数），即每块长度都是1，此时我们设
然后检查 oneCount + twoCount 的和（一共叫几次）：
之后，我们应该合并两个1为一个2，即：
此时就会产生一种新的叫声情况，将新的oneCount和twoCount带入前面逻辑，进行循环处理，知道oneCount < 0 停止。

本题的数量级很大，10 ≤ M ≤ 10000，因此满足要求的情况数量可能极端大，此时我们应该使用大数记录结果。

`,i=[{input:"10",output:"1",explanation:"M=10，M-7=3，只有B叫9-8-7一种情况B赢"},{input:"12",output:"3",explanation:"M=12，M-7=5，B赢的情况有3种组合"}],u=`**解题思路：**

本题是一道**组合数学**问题。

**核心思路：**
- 将M-7划分为1和2的组合
- 奇数块时B获胜

**算法步骤：**
1. 初始化oneCount=M-7，twoCount=0
2. 若oneCount+twoCount为奇数，计算排列数
3. 合并两个1为一个2，重复步骤2
4. 累加所有满足条件的排列数
5. 使用大数处理结果

**时间复杂度**：O(N)`,a={java:`import java.math.BigInteger;
import java.util.Scanner;

public class Main {
  static BigInteger[] factor;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();

    initFactor(m - 7);

    int oneCount = m - 7;
    int twoCount = 0;

    // 记录B赢的情况数
    BigInteger ans = new BigInteger("0");

    while (oneCount >= 0) {
      // 叫的次数为奇数时，才能B赢
      if ((oneCount + twoCount) % 2 != 0) {
        ans = ans.add(getPermutationCount(oneCount, twoCount));
      }

      // 合并两个1为一个2
      oneCount -= 2;
      twoCount += 1;
    }

    System.out.println(ans);
  }

  // 求解不重复的全排列数
  public static BigInteger getPermutationCount(int oneCount, int twoCount) {
    if (oneCount == 0 || twoCount == 0) { // 即 1 1 1 1 1 或 2 2 2 这种情况，此时只有一种排列
      return new BigInteger("1");
    } else {
      // 排列数去重，比如 1 1 1 2 2 的不重复排列数为 5! / 3! / 2! = 10
      return factor[oneCount + twoCount].divide(factor[oneCount].multiply(factor[twoCount]));
    }
  }

  // 阶乘
  public static void initFactor(int n) {
    factor = new BigInteger[n + 1];
    factor[0] = new BigInteger("1");
    for (int i = 1; i <= n; i++) {
      factor[i] = factor[i - 1].multiply(new BigInteger(i + ""));
    }
  }
}`,python:`import decimal  # 超大数运算内置库
from decimal import Decimal
decimal.setcontext(decimal.Context(prec=2500))  # 设置超大数精度

m = int(input())
factor = []


# 阶乘
def initFactor(n):
    factor.append(Decimal(1))

    for i in range(1, n+1):
        factor.append(Decimal(i) * factor[-1])


# 求解不重复的全排列数
def getPermutationCount(oneCount, twoCount):
    if oneCount == 0 or twoCount == 0:
        # 即 1 1 1 1 1 或 2 2 2 这种情况，此时只有一种排列
        return 1
    else:
        # 排列数去重，比如 1 1 1 2 2 的不重复排列数为 5! / 3! / 2! = 10
        return factor[oneCount + twoCount] / factor[oneCount] / factor[twoCount]


def getResult():
    initFactor(m - 7)

    oneCount = m - 7
    twoCount = 0

    # 记录B赢的情况数
    ans = Decimal(0)

    while oneCount >= 0:
        # 叫的次数为奇数时，才能B赢
        if (oneCount + twoCount) % 2 != 0:
            ans += getPermutationCount(oneCount, twoCount)

        # 合并两个1为一个2
        oneCount -= 2
        twoCount += 1

    return ans


print("{:.0f}".format(getResult()))`,javascript:"",cpp:"",c:""},s={id:"212",title:n,examType:"B",score:200,description:t,inputDesc:o,outputDesc:e,examples:i,solution:u,codes:a};export{a as codes,s as default,t as description,c as examType,i as examples,r as id,o as inputDesc,e as outputDesc,C as score,u as solution,n as title};
