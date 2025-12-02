const c="220",n="计算误码率",u="B",p=200,i=`误码率是最常用的数据通信传输质量指标。它可以理解为“在多少位数据中出现一位差错”。
移动通信网络中的误码率主要是指比特误码率，其计算公式如下: 比特误码率=错误比特数/传输总比特数，
为了简单，我们使用字符串来标识通信的信息，一个字符错误了，就认为出现了一个误码
输入一个标准的字符串，和一个传输后的字符串，计算误码率
字符串会被压缩， 例:“2A3B4D5X1Z”表示"AABBBDDDDXXXXXZ" 用例会保证两个输入字符串解压后长度一致，解压前的长度不一定一致
每个生成后的字符串长度<100000000。
`,t=`两行，分别为两种字符串的压缩形式。
每行字符串 (压缩后的) 长度<100000
`,e=`一行，错误的字等数量/展开后的总长度

注意：展开后的字符串不含数字


本题最简单的做法就是将压缩字符串解压，然后利用一次for循环，对比两个等长的压缩字符串，看有多少个位置的字符不相同。
但是本题解压后的字符串，最大长度为1 0000 0000，这个数量级对于O(n)时间复杂度来说也会超时。
另外，解压后的字符串，内存会占到 1 0000 0000 * 1 byte ≈ 96M, 两个字符串就是将近200M，这种方案在内存上也是不友好的。

因此，我们不应该优先考虑上面方案，而是应该考虑基于压缩字符串找不同字符数量。

我的解题思路如下：
定义两个变量diff和same，分别用于记录输入的两个字符串中不同字符的数量，以及相同字符的数量。
以用例1举例：

我们可以比较s1,s2的头部压缩字符串，其中，
压缩字符串由两部分组成：压缩次数num + 压缩字符c
当前s1,s2的头部压缩字符串是不等长的，因此我们应该取二者最小长度作为比对长度，即
compareCount = min(num1, num2)
之后，继续检查num1, num2的大小关系，如果二者不等的话：
然后，s1，s2变为了

然后继续，按照上面逻辑处理，直到s1或s2为空。

当然，为了避免频繁的字符串操作，我们可以将s1,s2解析为灵活度更高的链表，链表节点元素即为压缩字符串转化的对象，类似于下面这种
{ num: 3, c: 'A' }
`,s=[],m="",r={java:`import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  static class ZipStr {
    int num;
    char c;

    public ZipStr(int num, char c) {
      this.num = num;
      this.c = c;
    }
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String s1 = sc.nextLine();
    String s2 = sc.nextLine();

    System.out.println(getResult(s1, s2));
  }

  public static String getResult(String s1, String s2) {
    LinkedList<ZipStr> link1 = getZipStrLink(s1);
    LinkedList<ZipStr> link2 = getZipStrLink(s2);

    int diff = 0;
    int same = 0;

    while (link1.size() > 0) {
      ZipStr zipStr1 = link1.removeFirst();
      ZipStr zipStr2 = link2.removeFirst();

      int compareCount = Math.min(zipStr1.num, zipStr2.num);

      if (zipStr1.c != zipStr2.c) {
        diff += compareCount;
      } else {
        same += compareCount;
      }

      if (zipStr1.num > compareCount) {
        zipStr1.num -= compareCount;
        link1.addFirst(zipStr1);
        continue;
      }

      if (zipStr2.num > compareCount) {
        zipStr2.num -= compareCount;
        link2.addFirst(zipStr2);
      }
    }

    return diff + "/" + (diff + same);
  }

  public static LinkedList<ZipStr> getZipStrLink(String s) {
    LinkedList<ZipStr> link = new LinkedList<>();

    StringBuilder num = new StringBuilder();

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);

      if (c >= '0' && c <= '9') {
        num.append(c);
      } else {
        link.add(new ZipStr(Integer.parseInt(num.toString()), c));
        num = new StringBuilder();
      }
    }

    return link;
  }
}`,python:`# 输入获取
s1 = input()
s2 = input()


def getZipStrLink(s):
    link = []

    num = []

    for i in range(len(s)):
        c = s[i]

        if c.isdigit():
            num.append(c)
        else:
            link.append([int("".join(num)), c])
            num.clear()

    return link


# 算法入口
def getResult():
    link1 = getZipStrLink(s1)
    link2 = getZipStrLink(s2)

    diff = 0
    same = 0

    while len(link1) > 0:
        num1, c1 = link1.pop(0)
        num2, c2 = link2.pop(0)

        compareCount = min(num1, num2)

        if c1 != c2:
            diff += compareCount
        else:
            same += compareCount

        if num1 > num2:
            link1.insert(0, [num1 - num2, c1])
        elif num1 < num2:
            link2.insert(0, [num2 - num1, c2])

    return f"{diff}/{diff + same}"


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},o={id:"220",title:n,examType:"B",score:200,description:i,inputDesc:t,outputDesc:e,examples:s,solution:"",codes:r};export{r as codes,o as default,i as description,u as examType,s as examples,c as id,t as inputDesc,e as outputDesc,p as score,m as solution,n as title};
