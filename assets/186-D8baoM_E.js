const l="186",n="字符串序列判定",S="B",o=100,t=`输入两个字符串 S 和 L ，都只包含英文小写字母。S长度 ≤ 100，L长度 ≤ 500,000。判定S是否是L的有效子串。
判定规则：S 中的每个字符在 L 中都能找到（可以不连续），且 S 在Ｌ中字符的前后顺序与 S 中顺序要保持一致。（例如，S = ”ace” 是 L= ”abcde” 的一个子序列且有效字符是a、c、e，而”aec”不是有效子序列，且有效字符只有a、e）
`,e=`输入两个字符串 S 和 L，都只包含英文小写字母。S长度 ≤ 100，L长度 ≤ 500,000。
先输入S，再输入L，每个字符串占一行。
`,i=`S 串最后一个有效字符在 L 中的位置。（首位从0开始计算，无有效字符返回-1）

ace abcde
fgh abcde

本题可以利用双指针来解决。
定义两个指针 i , j，分别指向S，L 字符串的索引0位置，
当 i ≥ S.length || J ≥ l.length 时结束

如果最后，i == S.length，则说明，在 L 字符串中找到了所有的 S 字符串字符。且 S 字符串最后一个字符在 L 中的位置就是 j - 1。否则，就返回-1。

用例1图示如下：


`,s=[{input:`ace
abcde`,output:"4",explanation:"a在位置0，c在位置2，e在位置4，最后有效字符e的位置是4"},{input:`fgh
abcde`,output:"-1",explanation:"f、g、h在L中都找不到，无有效字符"}],c=`**解题思路：**

本题是一道**双指针**问题（子序列判定）。

**核心思路：**
- 双指针分别指向S和L
- 按顺序在L中查找S的每个字符

**算法步骤：**
1. 初始化指针i指向S，j指向L
2. 若S[i]==L[j]，则i++
3. j++继续遍历L
4. 若i==S.length返回j-1，否则返回-1

**时间复杂度**：O(N)`,a={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String s = sc.nextLine();
    String l = sc.nextLine();

    System.out.println(getResult(s, l));
  }

  public static int getResult(String s, String l) {
    int i = 0;
    int j = 0;

    while (i < s.length() && j < l.length()) {
      if (s.charAt(i) == l.charAt(j)) {
        i++;
      }
      j++;
    }

    if (i == s.length()) return j - 1;
    else return -1;
  }
}`,python:`# 输入获取
s = input()
l = input()


# 算法入口
def getResult():
    i = 0
    j = 0

    while i < len(s) and j < len(l):
        if s[i] == l[j]:
            i += 1
        j += 1

    if i == len(s):
        return j - 1
    else:
        return -1


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},r={id:"186",title:n,examType:"B",score:100,description:t,inputDesc:e,outputDesc:i,examples:s,solution:c,codes:a};export{a as codes,r as default,t as description,S as examType,s as examples,l as id,e as inputDesc,i as outputDesc,o as score,c as solution,n as title};
