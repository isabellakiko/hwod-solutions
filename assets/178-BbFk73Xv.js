const o="178",n="万能字符单词拼写",d="A",e=100,t=`有一个字符串数组 words 和一个字符串 chars。
假如可以用 chars 中的字母拼写出 words 中的某个“单词”（字符串），那么我们就认为你掌握了这个单词。
words 的字符仅由 a-z 英文小写字母组成，例如 "abc"
chars 由 a-z 英文小写字母和 "?" 组成。其中英文 "?" 表示万能字符，能够在拼写时当作任意一个英文字母。例如："?" 可以当作 "a" 等字母。
注意：每次拼写时，chars 中的每个字母和万能字符都只能使用一次。
输出词汇表 words 中你掌握的所有单词的个数。没有掌握任何单词，则输出0。
`,r=`第一行：输入数组 words 的个数，记作N。
第二行 ~ 第N+1行：依次输入数组words的每个字符串元素
第N+2行：输入字符串chars
`,c=`输出一个整数，表示词汇表 words 中你掌握的单词个数



本题可以分别统计出chars和word中各字符的数量，然后遍历word每个字符c，比较word和chars中统计的c字符数量，如果word的c数量超过了chars的c数量，那么就就将超出数量计入diff中。
最终比较diff和chars中万能字符‘?’的数量，如果chars中万能字符‘?’的数量 >= diff，那么说明chars可以使用万能字符补足不同部分，即可以学会word。

`,s=[{input:`4
cat
bt
hat
tree
atach??`,output:"3",explanation:"chars有a,t,a,c,h和2个?，可拼写cat、bt、hat共3个单词"},{input:`3
hello
world
test
he?lo`,output:"1",explanation:"chars有h,e,l,o和1个?，只能拼写hello"}],i=`**解题思路：**

本题是一道**字符统计**问题。

**核心思路：**
- 统计chars和word中各字符数量
- ?作为万能字符可补足差额

**算法步骤：**
1. 统计chars中各字符和?的数量
2. 对每个word，统计其字符数量
3. 计算word相比chars缺少的字符总数diff
4. 若diff<=?数量，则该word可被拼写

**时间复杂度**：O(N*L)，L为单词平均长度`,a={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();

    String[] words = new String[n];
    for (int i = 0; i < n; i++) {
      words[i] = sc.next();
    }

    String chars = sc.next();

    System.out.println(getResult(words, n, chars));
  }

  public static int getResult(String[] words, int n, String chars) {
    int ans = 0;

    // 统计chars字符串中各字符的数量
    int[] cnt_chars = charStatistic(chars);

    for (int i = 0; i < n; i++) {
      int diff = 0;

      // 统计word字符串中各字符的数量
      int[] cnt_word = charStatistic(words[i]);

      for (int j = 0; j < 128; j++) {
        // 记录word的某字符超过chars的对应字符出现的数量
        diff += Math.max(cnt_word[j] - cnt_chars[j], 0);
      }

      if (diff <= cnt_chars['?']) {
        ans++;
        // System.out.println(words[i]);
      }
    }

    return ans;
  }

  public static int[] charStatistic(String s) {
    int[] cnts = new int[128];

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      cnts[c] += 1;
    }

    return cnts;
  }
}`,python:`# 输入获取
n = int(input())

words = []
for i in range(n):
    words.append(input())

chars = input()


def charStatistic(s):
    cnts = [0] * 128

    for c in s:
        cnts[ord(c)] += 1

    return cnts


# 算法入口
def getResult():
    ans = 0

    # 统计chars字符串中各字符的数量
    cnt_chars = charStatistic(chars)

    for word in words:
        diff = 0

        # 统计word字符串中各字符的数量
        cnt_word = charStatistic(word)

        for j in range(128):
            # 记录word的某字符超过chars的对应字符出现的数量
            diff += max(cnt_word[j] - cnt_chars[j], 0)

        if diff <= cnt_chars[ord('?')]:
            ans += 1
            # print(word)

    return ans


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},h={id:"178",title:n,examType:"A",score:100,description:t,inputDesc:r,outputDesc:c,examples:s,solution:i,codes:a};export{a as codes,h as default,t as description,d as examType,s as examples,o as id,r as inputDesc,c as outputDesc,e as score,i as solution,n as title};
