const p="148",n="任务最优调度",k="A",l=200,t=`给定一个正整数数组表示待系统执行的任务列表，数组的每一个元素代表一个任务，元素的值表示该任务的类型。
请计算执行完所有任务所需的最短时间。
任务执行规则如下:
任务可以按任意顺序执行，且每个任务执行耗时间均为1个时间单位。两个同类型的任务之间必须有长度为N个单位的冷却时间，比如N为2时，在时间K执行了类型3的任务，那么K+1和K+2两个时间不能执行类型3任务。系统在任何一个单位时间内都可以执行一个任务，或者等待状态。
说明：数组最大长度为1000，数组最大值1000。
`,s=`第一行记录一个用半角逗号分隔的数组，数组长度不超过1000，数组元素的值不超过1000，第二行记录任务冷却时间，N为正整数，N<=100。
`,e=`输出为执行完所有任务所需的最短时间。


本题考察贪心算法。

我的解题思路如下：
首先，我们统计出各种任务的数量，并找出数量最多的任务，比如题目用例中：
其中任务2的数量最多，有3个，我们假设k=3，那么完成所有任务所需时间至少为：
(k - 1) * (n + 1) + 1
画图示意如下：

其中n为冷却时间，k为最多任务的数量。
如果其他任务数量较少的话，可以直接在任务2的冷却时间中运行。比如题目用例运行图如下：

此时，总用时仍然为 (k - 1) * (n + 1) + 1。

理解了上面公式后，我们可以继续看下几种特殊情况：
1、数量最多的任务有多个，比如用例
2,2,2,3,3,3
2
此时画图示意如下：

此时至少用时为： (k - 1) * (n + 1) + 2

再比如用例
2,2,2,3,3,3,4,4,4
2

此时至少用时为： (k - 1) * (n + 1) + 3

可以发现，如果数量最多的任务有多个，假设为p个，则此时至少用时公式应该为：
(k - 1) * (n + 1) + p

另外，还有一种特殊情况，如下用例
2,2,2,3,3,3,4,4,4,5,5,5
2
此时任务5有两种执行策略：
策略一如下：

策略二如下：

很明显策略一更加省时。 因为策略一少了任务5的冷却时间。
可以发现，此时策略一的用时就是：总任务数量（每个任务执行耗时间均为1个时间单位）

因此：
即取二者较大值。
`,a=[{input:`2,2,2,3,3,3,4
2`,output:"9",explanation:"任务2和3各3个，冷却时间2。排列如2-3-4-2-3-idle-2-3-idle，共9个时间单位"},{input:`1,1,1,1
2`,output:"10",explanation:"4个相同任务，冷却2。排列1-idle-idle-1-idle-idle-1-idle-idle-1，共10单位"}],i=`**解题思路：**

本题是一道**贪心算法**问题（LeetCode 621变体）。

**核心思路：**
- 找出数量最多的任务数k
- 统计数量为k的任务种类数p
- 答案为max((k-1)*(n+1)+p, 总任务数)

**算法步骤：**
1. 统计各类型任务的数量
2. 找出最大数量k和数量为k的任务种类p
3. 计算公式结果(k-1)*(n+1)+p
4. 返回公式结果与总任务数的较大值

**时间复杂度**：O(N)`,c={java:`import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
  // 输入获取
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int[] tasks = Arrays.stream(sc.next().split(",")).mapToInt(Integer::parseInt).toArray();
    int n = sc.nextInt();

    System.out.println(getResult(tasks, n));
  }

  // 算法入口
  public static int getResult(int[] tasks, int n) {
    HashMap<Integer, Integer> cnts = new HashMap<>();

    for (int task : tasks) {
      cnts.put(task, cnts.getOrDefault(task, 0) + 1);
    }

    // k表示:最多任务的数量
    // 比如2,2,2,3， 其中任务2数量最多，有3个，则k = 3
    int k = cnts.values().stream().max((a, b) -> a - b).orElse(0);

    // p表示:数量为k的任务个数
    // 比如2,2,2,3,3,3,4， 其中数量为3的任务有2个，分别是任务2，任务3，则p=2
    int p = 0;
    for (Integer task : cnts.keySet()) {
      if (cnts.get(task) == k) p++;
    }

    return Math.max((k - 1) * (n + 1) + p, tasks.length);
  }
}`,python:`# 输入获取
tasks = list(map(int, input().split(",")))
n = int(input())


# 算法入口
def getResult():
    cnts = {}

    for task in tasks:
        cnts[task] = cnts.get(task, 0) + 1

    # k表示: 最多任务的数量
    # 比如2, 2, 2, 3， 其中任务2数量最多，有3个，则k = 3
    k = max(cnts.values())

    # p表示: 数量为k的任务个数
    # 比如2, 2, 2, 3, 3, 3, 4， 其中数量为3的任务有2个，分别是任务2，任务3，则p = 2
    p = 0
    for task in cnts:
        if cnts[task] == k:
            p += 1

    return max((k - 1) * (n + 1) + p, len(tasks))


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const tasks = lines[0].split(",").map(Number);
    const n = lines[1] - 0;

    console.log(getResult(tasks, n));

    lines.length = 0;
  }
});

function getResult(tasks, n) {
  const cnts = {};

  for (let task of tasks) {
    cnts[task] ? cnts[task]++ : (cnts[task] = 1);
  }

  // k表示:最多任务的数量
  // 比如2,2,2,3， 其中任务2数量最多，有3个，则k = 3
  const k = Math.max(...Object.values(cnts));

  // p表示:数量为k的任务个数
  // 比如2,2,2,3,3,3,4， 其中数量为3的任务有2个，分别是任务2，任务3，则p=2
  let p = 0;

  for (let task in cnts) {
    if (cnts[task] == k) p++;
  }

  return Math.max((k - 1) * (n + 1) + p, tasks.length);
}`,cpp:"",c:""},o={id:"148",title:n,examType:"A",score:200,description:t,inputDesc:s,outputDesc:e,examples:a,solution:i,codes:c};export{c as codes,o as default,t as description,k as examType,a as examples,p as id,s as inputDesc,e as outputDesc,l as score,i as solution,n as title};
