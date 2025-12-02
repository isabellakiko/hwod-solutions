const c="71",n="工号不够用了怎么办？",s="A",p=100,t=`3020年，空间通信集团的员工人数突破20亿人，即将遇到现有工号不够用的窘境。现在，请你负责调研新工号系统。继承历史传统，新的工号系统由小写英文字母（a-z）和数字（0-9）两部分构成。新工号由一段英文字母开头，之后跟随一段数字，比如”aaahw0001″,”a12345″,”abcd1″,”a00″。注意新工号不能全为字母或者数字,允许数字部分有前导0或者全为0。但是过长的工号会增加同事们的记忆成本，现在给出新工号至少需要分配的人数X和新工号中字母的长度Y，求新工号中数字的最短长度Z。
`,e=`一行两个非负整数 X Y，用数字用单个空格分隔。0< X <=2^50 – 10< Y <=5
`,i="输出数字部分的最短长度Z。",o=[{input:"260 1",output:"1",explanation:"26^1 * 10^1 = 260，刚好满足需求，数字长度为1。"},{input:"27 1",output:"1",explanation:"26^1 * 10^1 = 260 >= 27，数字部分最少1位。"},{input:"2600000000 1",output:"8",explanation:"需要26亿个工号，1个字母时需要log10(2600000000/26) = log10(10^8) = 8位数字。"}],a=`**解题思路：**

本题是一道**数学**问题。

**算法步骤：**
1. 小写字母有26种，数字有10种
2. Y个字母+Z个数字的组合数为：26^Y × 10^Z
3. 需要满足：26^Y × 10^Z >= X
4. 求解：Z = ceil(log10(X / 26^Y))
5. 注意Z最小为1（题目要求数字部分不能为空）

**时间复杂度**：O(1)`,l={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    long x = sc.nextLong();
    int y = sc.nextInt();

    System.out.println((long) Math.max(1, Math.ceil(Math.log10(x / Math.pow(26, y)))));
  }
}`,python:`# 输入获取
import math

x, y = map(int, input().split())


# 算法入口
def getResult(x, y):
    print(max(1, math.ceil(math.log10(x / math.pow(26, y)))))


# 算法调用
getResult(x, y)`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [x, y] = line.split(" ").map(Number);

  console.log(Math.max(1, Math.ceil(Math.log10(x / Math.pow(26, y)))));
});`,cpp:`#include <iostream>
#include <cmath>
using namespace std;

int main() {
    long long x;
    int y;
    cin >> x >> y;
    
    double result = log10((double)x / pow(26, y));
    int z = (int)ceil(result);
    if (z < 1) z = 1;
    
    cout << z << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <math.h>

int main() {
    long long x;
    int y;
    scanf("%lld %d", &x, &y);
    
    double result = log10((double)x / pow(26, y));
    int z = (int)ceil(result);
    if (z < 1) z = 1;
    
    printf("%d\\n", z);
    return 0;
}`},u={id:"71",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:i,examples:o,solution:a,codes:l};export{l as codes,u as default,t as description,s as examType,o as examples,c as id,e as inputDesc,i as outputDesc,p as score,a as solution,n as title};
