const o="192",n="最大数字",a="B",i=100,e=`给定一个由纯数字组成以字符串表示的数值，现要求字符串中的每个数字最多只能出现2次，超过的需要进行删除；
删除某个重复的数字后，其它数字相对位置保持不变。
如”34533″，数字3重复超过2次，需要删除其中一个3，删除第一个3后获得最大数值”4533″
请返回经过删除操作后的最大的数值，以字符串表示。
`,t=`第一行为一个纯数字组成的字符串，长度范围：[1,100000]
`,s=`输出经过删除操作后的最大的数值

本题最优解题思路是利用栈结构。

首先，我们需要定义两个map，分别是unused和reserve，其中：
然后对他们进行初始化，初始时unused就是统计输入字符串中各数字字符的出现次数，而reserve每个数字字符的个数都初始化为0。

接下来，遍历出输入字符串的每个字符c：
如果此时stack栈顶没有元素，则将遍历的c直接压入栈，然后unused[c]--，reserve[c]++
如果此时stack栈顶有元素，假设为top，则：
`,c=[{input:"34533",output:"4533",explanation:"3出现3次超过2次，删除第一个3得到最大数值4533"},{input:"5445795045",output:"9795545",explanation:"4和5各出现超过2次，保留使数值最大的组合"}],r=`**解题思路：**

本题是一道**单调栈**问题。

**核心思路：**
- 每个数字最多保留2个
- 贪心地让高位尽可能大

**算法步骤：**
1. 统计各数字的可用数量和已保留数量
2. 遍历数字，若已保留2个则跳过
3. 若当前数字大于栈顶且栈顶还有可用，则弹出栈顶
4. 将当前数字入栈

**时间复杂度**：O(N)`,u={java:`import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String str = sc.next();

    System.out.println(getResult(str));
  }

  public static String getResult(String str) {
    // 每个数字字符的可用个数
    HashMap<Character, Integer> unused = new HashMap<>();
    // 每个数字字符的保留个数
    HashMap<Character, Integer> reserve = new HashMap<>();

    // 初始时，每个数字有多少个，就可用多少个，由于还未使用，因此保留个数为0
    for (int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);
      unused.put(c, unused.getOrDefault(c, 0) + 1);
      reserve.putIfAbsent(c, 0);
    }

    // 定义一个栈
    LinkedList<Character> stack = new LinkedList<>();

    // 遍历输入字符串的每个数字字符c
    for (int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);

      // 如果该字符已经保留了2个了，则后续再出现该数字字符可以不保留
      if (reserve.get(c) == 2) {
        // 则可用c数字个数--
        unused.put(c, unused.get(c) - 1);
        continue;
      }

      // 比较当前数字c和栈顶数字top，如果c>top，那么需要考虑将栈顶数字弹出
      while (stack.size() > 0) {
        char top = stack.getLast();

        // 如果栈顶数字被弹出后，已保留的top字符数量和未使用的top字符数量之和大于等于2，则可以弹出，否则不可以
        if (top < c && unused.get(top) + reserve.get(top) - 1 >= 2) {
          stack.removeLast();
          reserve.put(top, reserve.get(top) - 1);
        } else {
          break;
        }
      }

      // 选择保留当前遍历的数字c
      stack.add(c);
      // 则可用c数字个数--
      unused.put(c, unused.get(c) - 1);
      // 已保留c数字个数++
      reserve.put(c, reserve.get(c) + 1);
    }

    StringBuilder sb = new StringBuilder();
    for (Character c : stack) {
      sb.append(c);
    }
    return sb.toString();
  }
}`,python:`# 输入获取
s = input()


# 算法入口
def getResult(s):
    # 每个数字字符的可用个数
    unused = {}
    # 每个数字字符的保留个数
    reserve = {}

    # 初始时，每个数字有多少个，就可用多少个，由于还未使用，因此保留个数为0
    for c in s:
        if unused.get(c) is None:
            unused[c] = 0

        if reserve.get(c) is None:
            reserve[c] = 0

        unused[c] += 1

    # 定义一个栈
    stack = []

    # 遍历输入字符串的每个数字字符c
    for c in s:
        # 如果该字符已经保留了2个了，则后续再出现该数字字符可以不保留
        if reserve[c] == 2:
            # 则可用c数字个数--
            unused[c] -= 1
            continue

        # 比较当前数字c和栈顶数字top，如果c>top，那么需要考虑将栈顶数字弹出
        while len(stack) > 0:
            top = stack[-1]

            # 如果栈顶数字被弹出后，已保留的top字符数量和未使用的top字符数量之和大于等于2，则可以弹出，否则不可以
            if top < c and unused[top] + reserve[top] - 1 >= 2:
                stack.pop()
                reserve[top] -= 1
            else:
                break

        # 选择保留当前遍历的数字c
        stack.append(c)
        # 则可用c数字个数--
        unused[c] -= 1
        # 已保留c数字个数++
        reserve[c] += 1

    return "".join(stack)


# 算法调用
print(getResult(s))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  console.log(getResult(line));
});

function getResult(str) {
  // 每个数字字符的可用个数
  const unused = {};
  // 每个数字字符的保留个数
  const reserve = {};

  // 初始时，每个数字有多少个，就可用多少个，由于还未使用，因此保留个数为0
  for (let c of str) {
    unused[c] ? unused[c]++ : (unused[c] = 1);
    reserve[c] = 0;
  }

  // 定义一个栈
  const stack = [];

  // 遍历输入字符串的每个数字字符c
  for (let c of str) {
    // 如果该字符已经保留了2个了，则后续再出现该数字字符可以不保留
    if (reserve[c] == 2) {
      // 则可用c数字个数--
      unused[c]--;
      continue;
    }

    // 比较当前数字c和栈顶数字top，如果c>top，那么需要考虑将栈顶数字弹出
    while (stack.length) {
      const top = stack.at(-1);

      // 如果栈顶数字被弹出后，已保留的top字符数量和未使用的top字符数量之和大于等于2，则可以弹出，否则不可以
      if (top < c && unused[top] + reserve[top] - 1 >= 2) {
        stack.pop();
        reserve[top]--;
      } else {
        break;
      }
    }

    // 选择保留当前遍历的数字c
    stack.push(c);
    // 则可用c数字个数--
    unused[c]--;
    // 已保留c数字个数++
    reserve[c]++;
  }

  return stack.join("");
}
;`,cpp:"",c:""},p={id:"192",title:n,examType:"B",score:100,description:e,inputDesc:t,outputDesc:s,examples:c,solution:r,codes:u};export{u as codes,p as default,e as description,a as examType,c as examples,o as id,t as inputDesc,s as outputDesc,i as score,r as solution,n as title};
