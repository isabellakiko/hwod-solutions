const o="146",n="不含101的数",c="A",u=200,r=`小明在学习二进制时，发现了一类不含 101的数，也就是：
将数字用二进制表示，不能出现 101 。 现在给定一个整数区间 [l,r] ，请问这个区间包含了多少个不含 101 的数？
`,t=`输入的唯一一行包含两个正整数 l， r（ 1 ≤ l ≤ r ≤ 10^9）。
`,e=`输出的唯一一行包含一个整数，表示在 [l,r] 区间内一共有几个不含 101 的数。

本题如果用暴力法求解，很简单
但是本题的1 ≤ l ≤ r ≤ 10^9，也就是说区间范围最大是 1 ~ 10^9，那么上面O(n)时间复杂度的算法会超时。
因此，我们需要找到一个性能更优的算法。
本题需要使用数位DP算法，具体逻辑原理请看
数位DP - 带3的数_伏城之外的博客-CSDN博客
数位DP - 带49的数_伏城之外的博客-CSDN博客
`,i=[{input:"1 10",output:"8",explanation:"1-10的二进制分别为1,10,11,100,101,110,111,1000,1001,1010，其中101和1010含101模式，故有8个不含101的数"},{input:"10 20",output:"7",explanation:"10-20中二进制不含101模式的数有7个"}],p=`**解题思路：**

本题是一道**数位DP**问题。

**核心思路：**
- 使用数位DP统计[1,R]内不含101的数减去[1,L-1]内的数量
- 记录前两位状态避免出现101模式
- 用记忆化搜索优化递归

**算法步骤：**
1. 将数字转为二进制数组
2. DFS遍历每一位，记录前两位(pre,prepre)
3. 若当前位=1且pre=0且prepre=1，则跳过(会形成101)
4. 用f[p][pre][prepre]记忆化已计算结果
5. 答案=digitSearch(R)-digitSearch(L-1)

**时间复杂度**：O(logN)`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int L = sc.nextInt();
    int R = sc.nextInt();
    int count = digitSearch(R) - digitSearch(L - 1);
    System.out.println(count);
  }

  public static int digitSearch(int num) {
    Integer[] arr =
        Arrays.stream(Integer.toBinaryString(num).split(""))
            .map(Integer::parseInt)
            .toArray(Integer[]::new);

    int[][][] f = new int[arr.length][2][2];

    return dfs(0, true, f, arr, 0, 0);
  }

  public static int dfs(int p, boolean limit, int[][][] f, Integer[] arr, int pre, int prepre) {
    if (p == arr.length) return 1;

    if (!limit && f[p][pre][prepre] != 0) return f[p][pre][prepre];

    int max = limit ? arr[p] : 1;
    int count = 0;

    for (int i = 0; i <= max; i++) {
      if (i == 1 && pre == 0 && prepre == 1) continue;
      count += dfs(p + 1, limit && i == max, f, arr, i, pre);
    }

    if (!limit) f[p][pre][prepre] = count;

    return count;
  }
}`,python:`# 算法实现
def dfs(p, limit, f, arr, pre, prepre):
    if p == len(arr):
        return 1

    if not limit and f[p][pre][prepre] > 0:
        return f[p][pre][prepre]

    maxV = arr[p] if limit else 1
    count = 0

    for i in range(maxV + 1):
        if i == 1 and pre == 0 and prepre == 1:
            continue
        count += dfs(p + 1, limit and i == maxV, f, arr, i, pre)

    if not limit:
        f[p][pre][prepre] = count

    return count


def digitSearch(num):
    arr = list(map(int, list(format(num, 'b'))))
    f = [[[0 for k in range(2)] for j in range(2)] for i in range(len(arr))]
    return dfs(0, True, f, arr, 0, 0)


# 输入获取
L, R = map(int, input().split())

# 算法调用
print(digitSearch(R) - digitSearch(L - 1))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [L, R] = line.split(" ").map(Number);
  const count = digitSearch(R) - digitSearch(L - 1);

  console.log(count);
});

function digitSearch(num) {
  const arr = num.toString(2).split("").map(Number);
  const f = new Array(arr.length)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => new Array(2)));

  return dfs(0, true, f, arr, 0, 0);
}

function dfs(p, limit, f, arr, pre, prepre) {
  if (p === arr.length) return 1;

  if (!limit && f[p][pre][prepre]) return f[p][pre][prepre];

  const max = limit ? arr[p] : 1;
  let count = 0;

  for (let i = 0; i <= max; i++) {
    if (i === 1 && pre === 0 && prepre === 1) continue;
    count += dfs(p + 1, limit && i === max, f, arr, i, pre);
  }

  if (!limit) f[p][pre][prepre] = count;

  return count;
}`,cpp:"",c:""},s={id:"146",title:n,examType:"A",score:200,description:r,inputDesc:t,outputDesc:e,examples:i,solution:p,codes:a};export{a as codes,s as default,r as description,c as examType,i as examples,o as id,t as inputDesc,e as outputDesc,u as score,p as solution,n as title};
