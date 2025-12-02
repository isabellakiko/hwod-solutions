const l="154",n="数字序列比大小",b="A",o=200,a=`A，B两个人玩一个数字比大小的游戏，在游戏前，两个人会拿到相同长度的两个数字序列，两个数字序列不相同的，且其中的数字是随机的。
A，B各自从数字序列中挑选出一个数字进行大小比较，赢的人得1分，输的人扣1分，相等则各自的分数不变。 用过的数字需要丢弃。
求A可能赢B的最大分数。
`,t=`输入数据的第1个数字表示数字序列的长度N，后面紧跟着两个长度为N的数字序列。
`,r=`A可能赢B的最大分数


输入数据第1个数字表示数字序列长度为3，后面紧跟着两个长度为3的数字序列。
序列A：4 8 10
序列B：3 6 4
A可以赢的最大分数是3。获得该分数的比大小过程可以是：
1）A：4 B：3
2）A：8 B：6
3）A：10 B：4

本题其实就是田忌赛马问题，解析可以参考我的这篇博客：
POJ - 2287 Tian Ji -- The Horse Racing_伏城之外的博客-CSDN博客
`,s=[{input:`3
4 8 10
3 6 4`,output:"3",explanation:"A用4赢3，8赢6，10赢4，全胜得3分"},{input:`4
1 3 5 7
2 4 6 8`,output:"-2",explanation:"A每个数都比B对应位置小，最优策略仍输2分"}],i=`**解题思路：**

本题是一道**贪心算法**问题（田忌赛马）。

**核心思路：**
- 双指针指向两队的最大最小值
- 能赢就赢，必输则用最小消耗对方最大
- 相等时优先用最小对最小或消耗对方最大

**算法步骤：**
1. 两数组排序
2. 双指针la,ra指向A的最小最大，lb,rb指向B的最小最大
3. 若A最大>B最大：A赢，ra--,rb--,得1分
4. 若A最大<B最大：用A最小消耗B最大，la++,rb--,扣1分
5. 相等时比较最小值决定策略

**时间复杂度**：O(NlogN)`,e={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = Integer.parseInt(sc.nextLine());
    int[] a = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    int[] b = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();

    System.out.println(getResult(n, a, b));
  }

  public static int getResult(int n, int[] a, int[] b) {
    Arrays.sort(a);
    Arrays.sort(b);

    int la = 0; // 指向田忌最慢的马
    int ra = n - 1; // 指向田忌最快的马

    int lb = 0; // 指向齐王最慢的马
    int rb = n - 1; // 指向齐王最快的马

    int ans = 0; // 记录田忌获得银币数

    while (la <= ra) {
      if (a[ra] > b[rb]) {
        // 田忌最快的马 比 齐王最快的马要快, 则直接比
        ans += 1;
        ra--;
        rb--;
      } else if (a[ra] < b[rb]) {
        // 田忌最快的马 比 齐王最快的马要慢, 则结果肯定输, 为了保留田忌最快的马, 我们应该用田忌最慢的马去消耗掉齐王最快的马
        ans -= 1;
        la++;
        rb--;
      } else {
        // 田忌最快的马 和 齐王最快的 速度相同, 此时如果平局的话，则会让田忌损失最快的马，因此我们应该找到田忌最慢的马, 即田忌必输的马来消耗掉齐王最快的马
        if (a[la] > b[lb]) {
          // 如果田忌最慢的马 比 齐王最慢的马 快, 则此时田忌最慢的马不是必输的马
          ans += 1;
          la++;
          lb++;
        } else {
          // 如果田忌最慢的马速度 <= 齐王最慢的马速度, 此时应该让田忌最慢的马 去消耗  齐王最快的马

          // 如果齐王最快的马速度 > 田忌最慢的马速度，则田忌失去银币
          // 如果齐王最快的马速度 == 田忌最慢的马速度，则田忌不失去银币
          if (b[rb] > a[la]) ans -= 1;
          la++;
          rb--;
        }
      }
    }

    return ans;
  }
}`,python:`# 输入获取
n = int(input())
a = list(map(int, input().split()))  # 田忌的马速度数组
b = list(map(int, input().split()))  # 齐王的马速度数组


# 算法入口
def getResult():
    a.sort()
    b.sort()

    la = 0  # 指向田忌最慢的马
    ra = n - 1  # 指向田忌最快的马

    lb = 0  # 指向齐王最慢的马
    rb = n - 1  # 指向齐王最快的马

    ans = 0  # 记录田忌获得银币数

    while la <= ra:
        if a[ra] > b[rb]:
            #  田忌最快的马 比 齐王最快的马要快, 则直接比
            ans += 1
            ra -= 1
            rb -= 1
        elif a[ra] < b[rb]:
            # 田忌最快的马 比 齐王最快的马要慢, 则结果肯定输, 为了保留田忌最快的马, 我们应该用田忌最慢的马去消耗掉齐王最快的马
            ans -= 1
            la += 1
            rb -= 1
        else:
            # 田忌最快的马 和 齐王最快的 速度相同, 此时如果平局的话，则会让田忌损失最快的马，因此我们应该找到田忌最慢的马, 即田忌必输的马来消耗掉齐王最快的马
            if a[la] > b[lb]:
                # 如果田忌最慢的马 比 齐王最慢的马 快, 则此时田忌最慢的马不是必输的马
                ans += 1
                la += 1
                lb += 1
            else:
                # 如果田忌最慢的马速度 <= 齐王最慢的马速度, 此时应该让田忌最慢的马 去消耗  齐王最快的马
                # 如果齐王最快的马速度 > 田忌最慢的马速度，则田忌失去银币
                # 如果齐王最快的马速度 == 田忌最慢的马速度，则田忌不失去银币
                if b[rb] > a[la]:
                    ans -= 1
                la += 1
                rb -= 1

    return ans


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},p={id:"154",title:n,examType:"A",score:200,description:a,inputDesc:t,outputDesc:r,examples:s,solution:i,codes:e};export{e as codes,p as default,a as description,b as examType,s as examples,l as id,t as inputDesc,r as outputDesc,o as score,i as solution,n as title};
