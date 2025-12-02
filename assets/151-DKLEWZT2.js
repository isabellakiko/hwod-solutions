const s="151",o="分奖金",l="A",c=200,n=`公司老板做了一笔大生意，想要给每位员工分配一些奖金，想通过游戏的方式来决定每个人分多少钱。 按照员工的工号顺序，每个人随机抽取一个数字。 按照工号的顺序往后排列，遇到第一个数字比自己数字大的，那么，前面的员工就可以获得“距离*数字差值”的奖金。 如果遇不到比自己数字大的，就给自己分配随机数数量的奖金。 例如，按照工号顺序的随机数字是：2,10,3。 那么第2个员工的数字10比第1个员工的数字2大， 所以，第1个员工可以获得1*（10-2）=8。第2个员工后面没有比他数字更大的员工， 所以，他获得他分配的随机数数量的奖金，就是10。 第3个员工是最后一个员工，后面也没有比他更大数字的员工，所以他得到的奖金是3。
请帮老板计算一下每位员工最终分到的奖金都是多少钱。
`,t=`第一行n表示员工数量（包含最后一个老板） 第二是每位员工分配的随机数字
`,r=`最终每位员工分到的奖金数量

注：随机数字不重复，员工数量（包含老板）范围1~10000，随机数范围1~100000


本题最简单的思路是双重for，但是时间复杂度是O(m^2)，而m取值1~10000，这个数量级非常有可能超时。
因此我们需要考虑更优的解法：
上面算法其实就是找每个数组元素的下一个更大值，因此可以参考
华为机试 - 找朋友_伏城之外的博客-CSDN博客_找朋友算法
的解题思路，利用栈结构通过O(n)时间，找出数组每一个元素的下一个更大值。
`,i=[{input:`3
2 10 3`,output:"8 10 3",explanation:"员工1：10比2大，距离1，奖金1*(10-2)=8；员工2后无更大数，奖金10；员工3是最后，奖金3"},{input:`5
1 5 3 4 2`,output:"4 5 1 4 2",explanation:"员工1：5比1大，1*(5-1)=4；员工2后无更大，得5；员工3：4比3大，1*(4-3)=1；员工4、5后无更大"}],e=`**解题思路：**

本题是一道**单调栈/下一个更大元素**问题。

**核心思路：**
- 找每个员工后面第一个比他数字大的员工
- 计算距离×数字差值作为奖金
- 找不到则奖金为自己的数字

**算法步骤：**
1. 遍历每个员工的数字
2. 向后查找第一个更大的数字
3. 找到则计算(距离)*(差值)，否则取自身数字
4. 可用单调栈优化到O(N)

**时间复杂度**：O(N²)暴力，O(N)单调栈`,a={java:`import java.util.ArrayList;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();

    int[] arr = new int[m];
    for (int i = 0; i < m; i++) {
      arr[i] = sc.nextInt();
    }

    System.out.println(getResult(arr, m));
  }

  public static String getResult(int[] arr, int m) {
    ArrayList<Integer> ans = new ArrayList<>();

    outer:
    for (int i = 0; i < m; i++) {
      for (int j = i + 1; j < m; j++) {
        if (arr[j] > arr[i]) {
          ans.add((j - i) * (arr[j] - arr[i]));
          continue outer;
        }
      }
      ans.add(arr[i]);
    }

    StringJoiner sj = new StringJoiner(" ");
    for (Integer an : ans) sj.add(an + "");
    return sj.toString();
  }
}`,python:`# 输入获取
m = int(input())
arr = list(map(int, input().split()))


# 算法入口
def getResult(arr, m):
    ans = []
    for i in range(m):
        flag = True
        for j in range(i+1, m):
            if arr[j] > arr[i]:
                flag = False
                ans.append((j-i) * (arr[j] - arr[i]))
                break

        if flag:
            ans.append(arr[i])

    return " ".join(map(str, ans))


# 算法调用
print(getResult(arr, m))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const m = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});

function getResult(arr, m) {
  const ans = [];

  outter: for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (arr[j] > arr[i]) {
        ans.push((j-i) * (arr[j] - arr[i])); // 距离 * 数字差值
        continue outter;
      }
    }
    ans.push(arr[i]);
  }

  return ans.join(" ");
}`,cpp:"",c:""},u={id:"151",title:"分奖金",examType:"A",score:200,description:n,inputDesc:t,outputDesc:r,examples:i,solution:e,codes:a};export{a as codes,u as default,n as description,l as examType,i as examples,s as id,t as inputDesc,r as outputDesc,c as score,e as solution,o as title};
