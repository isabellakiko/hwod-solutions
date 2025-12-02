const r="161",n="篮球游戏",a="A",o=200,e=`幼儿园里有一个放倒的圆桶，它是一个线性结构，允许在桶的右边将篮球放入，可以在桶的左边和右边将篮球取出。
每个篮球有单独的编号，老师可以连续放入一个或多个篮球，小朋友可以在桶左边或右边将篮球取出，当桶只有一个篮球的情况下，必须从左边取出。
如老师按顺序放入1、2、3、4、5 共有 5 个编号的篮球，那么小朋友可以依次取出编号为1、2、3、4、5 或者 3、1、2、4、5 编号的篮球，无法取出 5、1、3、2、4 编号的篮球。
其中 3、1、2、4、5 的取出场景为：
连续放入1、2、3号从右边取出3号 从左边取出1号 从左边取出2号放入4号从左边取出4号放入5号从左边取出5号
简答起见，我们以 L 表示左，R表示右，此时取出篮球的依次取出序列为“RLLLL”。
`,t=`每次输入包含一个测试用例：
第一行的数字作为老师依次放入的篮球编号第二行的数字作为要检查是否能够按照放入的顺序取出给定的篮球的编号，其中篮球的编号用逗号进行分隔。
其中篮球编号用逗号进行分隔。
`,i=`对于每个篮球的取出序列，如果确实可以获取，请打印出其按照左右方向的操作取出顺序，如果无法获取则打印“NO”。



本题可以使用双端队列dque来模拟圆桶。
假设
第一行给定放入顺序是inputs
第二行给定取出顺序是outputs
由于需要按照outputs顺序取出，因此我们定义一个index指向当前outputs要被取出的元素，
初始时index = 0

按照inputs顺序依次放入（篮球编号）到dque（圆桶）右边（addLast操作），每当放入一个后，则需要进行多次取出检查，即一次放入后，可以进行多次取出行为：
假设
圆桶左边篮球编号是left，则 left = dque.getFirst
圆桶右边篮球编号是right，则 right = dque.getLast
当前要取出的篮球编号是outputs[index]
优先检查 outputs[index] 编号的篮球是不是left 的原因是：题目说当桶只有一个篮球的情况下，必须从左边取出

最后，完成上面逻辑，检查圆桶中是否有剩余篮球

`,s=[{input:`1,2,3,4,5
3,1,2,4,5`,output:"RLLLL",explanation:"放入1,2,3后从右取3,左取1,左取2,放入4左取,放入5左取"},{input:`1,2,3
1,2,3`,output:"LLL",explanation:"按顺序从左边依次取出"}],u=`**解题思路：**

本题是一道**双端队列模拟**问题。

**核心思路：**
- 用双端队列模拟圆桶
- 每次放入后尝试从两端取出匹配的球
- 只有一个球时必须从左取

**算法步骤：**
1. 按输入顺序依次放入队列右端
2. 每次放入后循环检查能否取出
3. 优先检查左端(单球时必须从左取)
4. 记录取出方向序列

**时间复杂度**：O(N)`,p={java:`import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int[] inputs = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    int[] outputs = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();

    // 利用队列结构模拟圆桶
    LinkedList<Integer> queue = new LinkedList<>();

    // outputs[index]是要被取出的篮球的编号
    int index = 0;

    // 记录题解
    StringBuilder sb = new StringBuilder();

    for (int input : inputs) {
      // 按照放入顺序，从圆桶右边放入
      queue.addLast(input);

      // 然后开始尝试取出
      while (queue.size() > 0) {
        // 圆桶左边的篮球的编号
        int left = queue.getFirst();
        // 圆桶右边的篮球的编号
        int right = queue.getLast();

        if (left == outputs[index]) {
          // 优先比较圆桶左边的篮球是不是当前要取出的篮球，优先左边的原因是：当桶只有一个篮球的情况下，必须从左边取出
          sb.append("L");
          queue.removeFirst();
          index++;
        } else if (right == outputs[index]) {
          // 比较圆桶右边的篮球是不是当前要取出的篮球
          sb.append("R");
          queue.removeLast();
          index++;
        } else {
          // 如果圆桶左右两边都不是要取出的球，则本轮取出流程结束
          break;
        }
      }
    }

    // 最终如果圆桶空了，则说明所有球都取出了，否则按照给定要求无法取出所有球
    if (queue.size() != 0) {
      System.out.println("NO");
    } else {
      System.out.println(sb);
    }
  }
}`,python:`# 输入获取
ipts = list(map(int, input().split(",")))
opts = list(map(int, input().split(",")))


# 算法入口
def getResult():
    # 利用队列结构模拟圆桶
    queue = []
    # outputs[index]是要被取出的篮球的编号
    index = 0

    # 记录题解
    res = []

    for ipt in ipts:
        # 按照放入顺序，从圆桶右边放入
        queue.append(ipt)

        # 然后开始尝试取出
        while len(queue) > 0:
            # 圆桶左边的篮球的编号
            left = queue[0]
            # 圆桶右边的篮球的编号
            right = queue[-1]

            if left == opts[index]:
                # 优先比较圆桶左边的篮球是不是当前要取出的篮球，优先左边的原因是：当桶只有一个篮球的情况下，必须从左边取出
                res.append("L")
                queue.pop(0)
                index += 1
            elif right == opts[index]:
                # 比较圆桶右边的篮球是不是当前要取出的篮球
                res.append("R")
                queue.pop()
                index += 1
            else:
                # 如果圆桶左右两边都不是要取出的球，则本轮取出流程结束
                break

    # 最终如果圆桶空了，则说明所有球都取出了，否则按照给定要求无法取出所有球
    if len(queue) != 0:
        return "NO"
    else:
        return "".join(map(str, res))


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},d={id:"161",title:n,examType:"A",score:200,description:e,inputDesc:t,outputDesc:i,examples:s,solution:u,codes:p};export{p as codes,d as default,e as description,a as examType,s as examples,r as id,t as inputDesc,i as outputDesc,o as score,u as solution,n as title};
