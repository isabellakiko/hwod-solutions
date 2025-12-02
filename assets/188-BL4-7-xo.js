const c="188",n="拼接URL",f="B",a=100,t=`给定一个url前缀和url后缀,通过,分割 需要将其连接为一个完整的url
如果前缀结尾和后缀开头都没有/，需要自动补上/连接符如果前缀结尾和后缀开头都为/，需要自动去重
约束：不用考虑前后缀URL不合法情况
`,i="url前缀(一个长度小于100的字符串)，url后缀(一个长度小于100的字符串)",r=`拼接后的url


逻辑题，可以直接看代码实现了解逻辑。
20230813 本题Java解法中split函数比较难搞，对于下面情况按照","分割出来的字符串数组分别是：
我们需要注意处理下。
JS和Python的split函数就要规矩的多，上面三种输入情况，都会返回一个长度为2的字符串数组。
更新解法使用了正则表达式，其中
prefix前缀，需要将其结尾的多个/去除，使用正则 /+$ 来匹配结尾的多个/
suffix后缀，需要将其开头的多个/去除，使用正则 ^/+ 来匹配开头的多个/
最后拼接 prefix + "/" + suffix 即可

对于python而言，有更简单的lstrip和rstrip方法，实现同样效果。
`,s=[{input:"/acm,/contest",output:"/acm/contest",explanation:"前缀无/结尾，后缀无/开头，自动补上/"},{input:"/acm/,/contest",output:"/acm/contest",explanation:"前缀有/结尾，后缀有/开头，去重为一个/"}],e=`**解题思路：**

本题是一道**字符串处理**问题。

**核心思路：**
- 去除前缀结尾的/
- 去除后缀开头的/
- 用/连接

**算法步骤：**
1. 使用正则/+$去除前缀结尾的多个/
2. 使用正则^/+去除后缀开头的多个/
3. 返回prefix + "/" + suffix

**时间复杂度**：O(N)`,p={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String s = sc.nextLine();

    String[] arr = s.split(",");

    String prefix = arr.length > 0 && arr[0].length() > 0 ? arr[0] : "/";
    String suffix = arr.length > 1 && arr[1].length() > 0 ? arr[1] : "/";

    System.out.println(getResult(prefix, suffix));
  }

  public static String getResult(String prefix, String suffix) {
    prefix = prefix.replaceAll("/+$", "");
    suffix = suffix.replaceAll("^/+", "");
    return prefix + "/" + suffix;
  }
}`,python:`# 输入获取
prefix, suffix = input().split(",")

prefix = prefix.rstrip("/")
suffix = suffix.lstrip("/")

print(prefix + "/" + suffix)`,javascript:"",cpp:"",c:""},u={id:"188",title:n,examType:"B",score:100,description:t,inputDesc:i,outputDesc:r,examples:s,solution:e,codes:p};export{p as codes,u as default,t as description,f as examType,s as examples,c as id,i as inputDesc,r as outputDesc,a as score,e as solution,n as title};
