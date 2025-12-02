const u="196",n="游戏分组",m="B",o=100,r=`部门准备举办一场王者荣耀表演赛，有 10 名游戏爱好者参与，分为两队，每队 5 人。
每位参与者都有一个评分，代表着他的游戏水平。为了表演赛尽可能精彩，我们需要把 10 名参赛者分为示例尽量相近的两队。
一队的实力可以表示为这一队 5 名队员的评分总和。
现在给你 10 名参与者的游戏水平评分，请你根据上述要求分队，最后输出这两组的实力差绝对值。
例：10 名参赛者的评分分别为：5 1 8 3 4 6 7 10 9 2，分组为（1 3 5 8 10）和（2 4 6 7 9），两组实力差最小，差值为1。有多种分法，但是实力差的绝对值最小为1。
`,s=`10个整数，表示10名参与者的游戏水平评分。范围在 [1, 10000] 之间。
`,e=`1个整数，表示分组后两组实力差绝对值的最小值。


本题和华为OD机试 - 篮球比赛（Java & JS & Python & C）-CSDN博客
类似。具体解析请参考上面博客。
`,t=[{input:"5 1 8 3 4 6 7 10 9 2",output:"1",explanation:"分为(1,3,5,8,10)和(2,4,6,7,9)两队，实力差为27-28=1"},{input:"1 2 3 4 5 6 7 8 9 10",output:"1",explanation:"分为(1,4,5,8,10)=28和(2,3,6,7,9)=27，实力差1"}],a=`**解题思路：**

本题是一道**DFS组合枚举**问题。

**核心思路：**
- 10选5的组合问题
- 求两队实力差最小值

**算法步骤：**
1. DFS枚举所有10选5的组合
2. 计算每个组合的实力和
3. 总和减去2倍组合和的绝对值即为实力差
4. 返回最小实力差

**时间复杂度**：O(C(10,5))=O(252)`,i={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] arr = new int[10];
    for (int i = 0; i < 10; i++) {
      arr[i] = sc.nextInt();
    }
 
    System.out.println(getResult(arr));
  }
 
  public static int getResult(int[] arr) {
    Arrays.sort(arr);
 
    ArrayList<Integer> res = new ArrayList<>();
    // dfs求10选5的去重组合，并将组合之和记录进res中，即res中记录的是所有可能性的5人小队实力值之和
    dfs(arr, 0, 0, 0, res);
 
    int sum = Arrays.stream(arr).reduce(Integer::sum).orElse(0);
    // 某队实力为subSum，则另一队实力为sum - subSum，则两队实力差为 abs((sum - subSum) - subSum)，先求最小实力差
    return res.stream().map(subSum -> Math.abs(sum - 2 * subSum)).min((a, b) -> a - b).orElse(0);
  }
 
  // 求解去重组合
  public static void dfs(int[] arr, int index, int level, int sum, ArrayList<Integer> res) {
    if (level == 5) {
      res.add(sum);
      return;
    }
 
    for (int i = index; i < 10; i++) {
      if (i > index && arr[i] == arr[i - 1]) continue; // arr已经升序，这里进行树层去重
      dfs(arr, i + 1, level + 1, sum + arr[i], res);
    }
  }
}`,python:`# 输入获取
arr = list(map(int, input().split()))
 
 
# 求解去重组合
def dfs(arr, index, level, sumV, res):
    if level == 5:
        res.append(sumV)
        return
 
    for i in range(index, 10):
        if i > index and arr[i] == arr[i - 1]: # arr已经升序，这里进行树层去重
            continue
        dfs(arr, i + 1, level + 1, sumV + arr[i], res)
 
 
# 算法入口
def getResult(arr):
    arr.sort()
 
    res = []
    # dfs求10选5的去重组合，并将组合之和记录进res中，即res中记录的是所有可能性的5人小队实力值之和
    dfs(arr, 0, 0, 0, res)
 
    sumV = sum(arr)
    #  某队实力为subSum，则另一队实力为sum - subSum，则两队实力差为 abs((sum - subSum) - subSum)，先求最小实力差
    return min(map(lambda subSum: abs(sumV - 2 * subSum), res))
 
 
# 算法调用
print(getResult(arr))`,javascript:`const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const arr = (await readline()).split(" ").map(Number);

  arr.sort((a, b) => a - b);

  const res = [];
  // dfs求10选5的去重组合，并将组合之和记录进res中，即res中记录的是所有可能性的5人小队实力值之和
  dfs(arr, 0, 0, 0, res);

  const sum = arr.reduce((p, c) => p + c);

  // 某队实力为subSum，则另一队实力为sum - subSum，则两队实力差为 abs((sum - subSum) - subSum)，先求最小实力差
  const ans = res
    .map((subSum) => Math.abs(sum - 2 * subSum))
    .sort((a, b) => a - b)[0];

  console.log(ans);
})();

// 求解去重组合
function dfs(arr, index, level, sum, res) {
  if (level === 5) {
    return res.push(sum);
  }

  for (let i = index; i < 10; i++) {
    if (i > index && arr[i] == arr[i - 1]) continue; // arr已经升序，这里进行树层去重
    dfs(arr, i + 1, level + 1, sum + arr[i], res);
  }
}`,cpp:"",c:""},c={id:"196",title:n,examType:"B",score:100,description:r,inputDesc:s,outputDesc:e,examples:t,solution:a,codes:i};export{i as codes,c as default,r as description,m as examType,t as examples,u as id,s as inputDesc,e as outputDesc,o as score,a as solution,n as title};
