const r="221",n="贪吃的猴子",m="B",l=200,t=`一只贪吃的猴子，来到一个果园，发现许多串香蕉排成一行，每串香蕉上有若干根香蕉。每串香蕉的根数由数组numbers给出。
猴子获取香蕉，每次都只能从行的开头或者末尾获取，并且只能获取N次，求猴子最多能获取多少根香蕉。
`,s=`第一行为数组numbers的长度
第二行为数组numbers的值每个数字通过空格分开
第三行输入为N，表示获取的次数
`,e=`按照题目要求能获取的最大数值



本题我第一个思路是通过分支递归+缓存优化求解
但是经过测试，1 ≤ numbers.length ≤ 100000 数量级下，递归操作会StackOverflow，缓存cache数组占用的内存会超出限制。

后面思考了一下，无论我们怎么选，左边选择的，以及右边选择的，必然都是连续的，且是从头尾开始的连续，即不可出现下面情况：


因此，本题其实可以简化为，将n次分解为左边选择的个数，以及右边选择的个数。
以用例1画图示：
初始时，假设左边选择了0个，右边选择了n=3个，（黄色部分代表选择）：

之后，左边选择1个，右边选择2个

之后，左边选择2，右边选择1个

最后，左边选择3个，右边选择0个


上面图示逻辑，我们除了需要计算初始时的leftSum和rightSum外，之后的状态均可以基于前一个状态求解，如下图所示

更多细节请看下面代码和注释。

`,i=[],a="",u={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int len = Integer.parseInt(sc.nextLine());
    int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    int n = Integer.parseInt(sc.nextLine());

    System.out.println(getResult(len, nums, n));
  }

  public static int getResult(int len, int[] nums, int n) {
    // 初始时，左边选择0个，因此左边选择的香蕉数为 0
    int leftSum = 0;

    // 初始时，右边选择n个，因此右边选择的香蕉数为 nums[len-n] ~ nums[len - 1] 这个n个元素之和
    int rightSum = 0;
    for (int i = len - n; i < len; i++) {
      rightSum += nums[i];
    }

    // 如果选择数n == len，即全选，此时直接返回初始rightSum
    if (len == n) {
      return rightSum;
    }

    // 如果不是全选
    // sum记录当前选择结果
    int sum = leftSum + rightSum;
    // ans记录所有选择结果中最大的
    int ans = sum;

    // l指向左边将要获得的，即左边获得一个
    int l = 0;
    // r指向右边将要失去的，即右边失去一个
    int r = len - n;

    while (l < n) {
      sum += nums[l++] - nums[r++];
      ans = Math.max(ans, sum);
    }

    return ans;
  }
}`,python:`# 输入获取
length = int(input())
nums = list(map(int, input().split()))
n = int(input())


# 算法入口
def getResult():
    # 初始时，左边选择0个，因此左边选择的香蕉数为 0
    leftSum = 0
    # 初始时，右边选择n个，因此右边选择的香蕉数为 nums[len-n] ~ nums[len - 1] 这个n个元素之和
    rightSum = sum(nums[length - n:])

    # 如果选择数n == len，即全选，此时直接返回初始rightSum
    if length == n:
        return rightSum

    # 如果不是全选
    # sum记录当前选择结果
    sumV = leftSum + rightSum
    # ans记录所有选择结果中最大的
    ans = sumV

    # l指向左边将要获得的，即左边获得一个
    l = 0
    # r指向右边将要失去的，即右边失去一个
    r = length - n

    while l < n:
        sumV += nums[l] - nums[r]
        ans = max(ans, sumV)
        l += 1
        r += 1

    return ans


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},c={id:"221",title:n,examType:"B",score:200,description:t,inputDesc:s,outputDesc:e,examples:i,solution:"",codes:u};export{u as codes,c as default,t as description,m as examType,i as examples,r as id,s as inputDesc,e as outputDesc,l as score,a as solution,n as title};
