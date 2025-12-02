const a="149",n="仿LISP运算",o="A",c=200,t=`LISP 语言唯一的语法就是括号要配对。
形如 (OP P1 P2 …)，括号内元素由单个空格分割。
其中第一个元素 OP 为操作符，后续元素均为其参数，参数个数取决于操作符类型。
注意：
参数 P1, P2 也有可能是另外一个嵌套的 (OP P1 P2 …) ，当前 OP 类型为 add / sub / mul / div（全小写），分别代表整数的加减乘除法，简单起见，所有 OP 参数个数均为 2 。
举例：
输入：(mul 3 -7)输出：-21输入：(add 1 2) 输出：3输入：(sub (mul 2 4) (div 9 3)) 输出 ：5输入：(div 1 0) 输出：error
题目涉及数字均为整数，可能为负；
不考虑 32 位溢出翻转，计算过程中也不会发生 32 位溢出翻转，
除零错误时，输出 “error”，
除法遇除不尽，向下取整，即 3/2 = 1
`,e=`输入为长度不超过512的字符串，用例保证了无语法错误
`,r=`输出计算结果或者“error”

(div 12 (sub 45 45))

纯逻辑题，难点在于将括号中的片段截取出来，我的处理方案是，遍历输入的每一个字符，当遇到")"时，则在其前面必然存在一个“(”，找到其前面第一个“(”，然后截取“(”和")"之间的内容（从栈中截取走），进行计算，将结果回填如栈中。
`,i=[{input:"(add 1 2)",output:"3",explanation:"add操作：1+2=3"},{input:"(sub (mul 2 4) (div 9 3))",output:"5",explanation:"先算内层：mul 2 4=8，div 9 3=3，再算外层：sub 8 3=5"},{input:"(div 1 0)",output:"error",explanation:"除数为0，输出error"}],s=`**解题思路：**

本题是一道**栈模拟**问题。

**核心思路：**
- 用栈处理嵌套括号
- 遇到)时取出对应(之间的内容计算
- 将计算结果放回栈中

**算法步骤：**
1. 遍历字符串，遇到(记录位置并入栈
2. 遇到)时截取最近(到当前位置的内容
3. 解析操作符和两个参数进行计算
4. 除法除零返回error，否则结果入栈
5. 遍历结束后栈中内容即为答案

**时间复杂度**：O(N)`,p={java:`import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.nextLine()));
  }

  public static String getResult(String s) {
    LinkedList<Character> stack = new LinkedList<>();
    LinkedList<Integer> leftIdx = new LinkedList<>();

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);

      if (c == ')') {
        List<Character> fragment = stack.subList(leftIdx.removeLast(), stack.size());

        StringBuilder sb = new StringBuilder();
        for (int j = 1; j < fragment.size(); j++) sb.append(fragment.get(j));

        fragment.clear();

        String[] tmp = sb.toString().split(" ");

        String op = tmp[0];
        int p1 = Integer.parseInt(tmp[1]);
        int p2 = Integer.parseInt(tmp[2]);

        String res = operate(op, p1, p2);
        if ("error".equals(res)) {
          return "error";
        } else {
          for (int k = 0; k < res.length(); k++) stack.add(res.charAt(k));
        }
      } else if (c == '(') {
        leftIdx.add(stack.size());
        stack.add(c);
      } else {
        stack.add(c);
      }
    }

    StringBuilder ans = new StringBuilder();
    for (Character c : stack) ans.append(c);
    return ans.toString();
  }

  public static String operate(String op, int p1, int p2) {
    switch (op) {
      case "add":
        return p1 + p2 + "";
      case "sub":
        return p1 - p2 + "";
      case "mul":
        return p1 * p2 + "";
      case "div":
        return p2 == 0 ? "error" : (int) Math.floor(p1 / (p2 + 0.0)) + "";
      default:
        return "error";
    }
  }
}`,python:`import math

# 输入获取
s = input()


def operate(op, p1, p2):
    p1 = int(p1)
    p2 = int(p2)
    if op == "add":
        return str(p1 + p2)
    elif op == "sub":
        return str(p1 - p2)
    elif op == "mul":
        return str(p1 * p2)
    elif op == "div":
        if p2 == 0:
            return "error"
        else:
            return str(int(math.floor(p1 / p2)))
    else:
        return "error"


# 算法入口
def getResult():
    stack = []
    leftIdx = []

    for i in range(len(s)):
        if s[i] == ')':
            l = leftIdx.pop()
            fragment = stack[l:]
            del stack[l:]

            op, p1, p2 = "".join(fragment[1:]).split(" ")

            res = operate(op, p1, p2)

            if res == "error":
                return "error"
            else:
                stack.extend(list(res))
        elif s[i] == '(':
            leftIdx.append(len(stack))
            stack.append(s[i])
        else:
            stack.append(s[i])

    return "".join(stack)


# 调用算法
print(getResult())`,javascript:"",cpp:"",c:""},l={id:"149",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:r,examples:i,solution:s,codes:p};export{p as codes,l as default,t as description,o as examType,i as examples,a as id,e as inputDesc,r as outputDesc,c as score,s as solution,n as title};
