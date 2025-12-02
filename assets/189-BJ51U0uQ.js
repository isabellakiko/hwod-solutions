const p="189",n="提取字符串中的最长合法简单数学表达式",o="B",s=100,e=`提取字符串中的最长合法简单数学表达式，字符串长度最长的，并计算表达式的值。如果没有，则返回 0 。
简单数学表达式只能包含以下内容：
0-9数字，符号+-*
说明：
所有数字，计算结果都不超过long如果有多个长度一样的，请返回第一个表达式的结果数学表达式，必须是最长的，合法的操作符不能连续出现，如 +--+1 是不合法的
`,t=`字符串
`,a=`表达式值


注意！！！本题原题描述中没有 / 除号

因此，本题的合法表达式不需要考虑 '/' 号，也就不用考虑除0，以及除法是整除还是小数除的问题。
另外，本题的 +、-号仅作为运算符号，不作为正负号。因此 "+1"，"-1" 这种不能理解为合法的表达式。
本题可以分为两步求解：
关于1的求解，有两种思路：
其中正则匹配实现起来比较简单，用于匹配合法表达式的正则也不是很难写，对应正则解析如下：

对于python而言，为了更好地适配findall方法，我们可以对上面正则表达式中内层括号使用到非捕获组


关于2的求解
对于JS和Python而言，可以使用内置的eval函数计算字符串表达式的结果。
更常规的思路是利用栈结构：
找出最长合法表达式子串后，比如 "1-2*3+10+2"，我们需要注意表达式运算符优先级问题，即先乘，后加减，相同优先级的运算从左到右进行。

这里我的思路是将 合法表达式串 进行分块，比如上面表达式可以分为：
我们可以发现：
分块之后，我们只需要求各块结果之和即可。

具体逻辑实现如下：
扫描合法表达式串，如果当前扫描的字符c是：
这块实现的更详细解析，可以参考：
华为OD机试 - 符号运算（Java & JS & Python & C）_java 华为od机试,符号运算-CSDN博客

`,c=[{input:"1-2*3+10+2",output:"7",explanation:"整个字符串就是最长合法表达式，1-2*3+10+2=1-6+10+2=7"},{input:"abc1+2*3def",output:"7",explanation:"最长合法表达式为1+2*3，结果为7"}],r=`**解题思路：**

本题是一道**正则匹配+表达式求值**问题。

**核心思路：**
- 用正则提取所有合法表达式
- 找最长的计算其值

**算法步骤：**
1. 使用正则(\\d+[+*-])*\\d+匹配合法表达式
2. 找出最长的表达式串
3. 使用栈计算表达式值（处理运算符优先级）
4. 返回计算结果

**时间复杂度**：O(N)`,i={java:`import java.util.LinkedList;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.nextLine()));
  }

  public static long getResult(String s) {
    String maxLenExp = getMaxLenExp(s);

    if (maxLenExp.length() == 0) {
      return 0;
    } else {
      return calcExpStr(maxLenExp);
    }
  }

  public static String getMaxLenExp(String s) {
    Matcher matcher = Pattern.compile("((\\\\d+[+*-])*\\\\d+)").matcher(s);

    String maxLenExp = "";

    while (matcher.find()) {
      String exp = matcher.group(0);

      if (exp.length() > maxLenExp.length()) {
        maxLenExp = exp;
      }
    }

    return maxLenExp;
  }

  public static long calcExpStr(String exp) {
    // 这里在表达式结尾追加"+0"是为了避免后面收尾操作，不理解的话，可以去掉此步，测试下"1-2"
    exp += "+0";

    // 记录表达式中各块的操作数
    LinkedList<Long> stack = new LinkedList<>();
    // 各块操作数的"值"部分的缓存容器
    StringBuilder numStr = new StringBuilder();
    // 各块操作数的"系数"部分，默认为1
    long num_coef = 1;

    for (int i = 0; i < exp.length(); i++) {
      char c = exp.charAt(i);

      if (c >= '0' && c <= '9') {
        numStr.append(c);
        continue;
      }

      // 如果扫描到的字符c是运算符，那么该运算符打断了前面操作数的扫描，前面操作数 = 系数 * 值
      long num = num_coef * Long.parseLong(numStr.toString());
      stack.add(num);

      // 清空缓存容器，用于下一个操作数的”值“记录
      numStr = new StringBuilder();

      switch (c) {
        case '+':
          // 如果运算符是加法，则后一个操作数的系数为1
          num_coef = 1;
          break;
        case '-':
          // 如果运算符是减法，则后一个操作数的系数为-1
          num_coef = -1;
          break;
        case '*':
          // 如果运算符是乘法，则后一个操作数的系数为栈顶值，比如2*3，其中2可以当作3的系数
          num_coef = stack.removeLast();
          break;
      }
    }

    // 表达式分块后，每一块独立计算，所有块的和就是表达式的结果
    long res = 0;
    for (long num : stack) {
      res += num;
    }

    return res;
  }
}`,python:`# 输入获取
import re

s = input()


# 计算合法表达式的结果
def calcExpStr(exp):
    # 这里在表达式结尾追加"+0"是为了避免后面收尾操作，不理解的话，可以去掉此步，测试下"1-2"
    exp += '+0'

    # 记录表达式中各块的操作数
    stack = []
    # 各块操作数的"值"部分的缓存容器
    numStr = []
    # 各块操作数的"系数"部分，默认为1
    num_coef = 1

    for c in exp:
        if '9' >= c >= '0':
            numStr.append(c)
            continue

        # 如果扫描到的字符c是运算符，那么该运算符打断了前面操作数的扫描，前面操作数 = 系数 * 值
        num = num_coef * int("".join(numStr))
        stack.append(num)

        # 清空缓存容器，用于下一个操作数的”值“记录
        numStr.clear()

        if c == '+':
            # 如果运算符是加法，则后一个操作数的系数为1
            num_coef = 1
        elif c == '-':
            # 如果运算符是减法，则后一个操作数的系数为-1
            num_coef = -1
        elif c == '*':
            # 如果运算符是乘法，则后一个操作数的系数为栈顶值，比如2*3，其中2可以当作3的系数
            num_coef = stack.pop()

    # 表达式分块后，每一块独立计算，所有块的和就是表达式的结果
    return sum(stack)


# 获取最长合法表达式
def getMaxLenExp():
    lst = re.compile(r"((?:\\d+[+*-])*\\d+)").findall(s)

    maxLenExp = ""

    for exp in lst:
        if len(exp) > len(maxLenExp):
            maxLenExp = exp

    return maxLenExp


# 算法入口
def getResult():
    maxLenExp = getMaxLenExp()

    if len(maxLenExp) == 0:
        return 0
    else:
        return calcExpStr(maxLenExp)


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},u={id:"189",title:n,examType:"B",score:100,description:e,inputDesc:t,outputDesc:a,examples:c,solution:r,codes:i};export{i as codes,u as default,e as description,o as examType,c as examples,p as id,t as inputDesc,a as outputDesc,s as score,r as solution,n as title};
