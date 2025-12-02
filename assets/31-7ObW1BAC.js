const a="31",n="新工号中数字的最短长度",m="A",u=100,e=`3020年，空间通信集团的员工人数突破20亿人，即将遇到现有工号不够用的窘境。
现在，请你负责调研新工号系统。继承历史传统，新的工号系统由小写英文字母（a-z）和数字（0-9）两部分构成。
新工号由一段英文字母开头，之后跟随一段数字，比如”aaahw0001″,”a12345″,”abcd1″,”a00″。
注意新工号不能全为字母或者数字,允许数字部分有前导0或者全为0。
但是过长的工号会增加同事们的记忆成本，现在给出新工号至少需要分配的人数X和新工号中字母的长度Y，求新工号中数字的最短长度Z。`,t=`一行两个非负整数 X Y，用数字用单个空格分隔。
0< X <=2^50 – 1
0< Y <=5`,l="输出新工号中数字的最短长度Z",o=[{input:"260 1",output:"1",explanation:`X=260人，Y=1个字母。
26^1 × 10^Z ≥ 260
26 × 10^Z ≥ 260 → 10^Z ≥ 10
所以Z=1即可满足。`},{input:"2600000 2",output:"4",explanation:`X=2600000人，Y=2个字母。
26^2 × 10^Z ≥ 2600000
676 × 10^Z ≥ 2600000 → 10^Z ≥ 3846.15
10^3=1000 < 3846.15，10^4=10000 > 3846.15
所以Z=4。`},{input:"1 1",output:"1",explanation:"X=1人，Y=1个字母。虽然1个工号就够用，但数字长度不能为0，最少为1。"}],i=`**解题思路：**

本题是一道**数学计算**问题。

**分析：**
- 工号由字母部分（长度Y）+ 数字部分（长度Z）组成
- 字母部分有 26^Y 种组合
- 数字部分有 10^Z 种组合（允许前导0）
- 总工号数 = 26^Y × 10^Z

**公式推导：**
需要满足：26^Y × 10^Z ≥ X

即：10^Z ≥ X / 26^Y

取对数：Z ≥ log₁₀(X / 26^Y)

向上取整：Z = ⌈log₁₀(X / 26^Y)⌉

**注意：** Z最小为1（数字部分不能为空）

**时间复杂度**：O(1)`,p={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long num_people = scanner.nextLong();
        long len_letter = scanner.nextLong();
        long min_len_num = Math.max(1L, (long) Math.ceil(Math.log10(num_people / Math.pow(26, len_letter))));
        System.out.println(min_len_num);
        scanner.close();
    }
}`,python:`import math

num_people, len_letter = map(int, input().split())
min_len_num = max(1, math.ceil(math.log10(num_people / pow(26, len_letter))))
print(min_len_num)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [num_people, len_letter] = input.split(' ').map(Number);
  const min_len_num = Math.max(1, Math.ceil(Math.log10(num_people / Math.pow(26, len_letter))));
  console.log(min_len_num);
});`,cpp:`#include <iostream>
#include <cmath>
using namespace std;

int main() {
    long long num_people, len_letter;
    cin >> num_people >> len_letter;
    long long min_len_num = max(1LL, (long long) ceil(log10(num_people / pow(26, len_letter))));
    cout << min_len_num << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <math.h>

int main() {
    long long num_people, len_letter;
    
    scanf("%lld %lld", &num_people, &len_letter);
    
    long long min_len_num = (long long) fmax(1.0, ceil(log10(num_people / pow(26, len_letter))));
    
    printf("%lld\\n", min_len_num);
    
    return 0;
}`},c={id:"31",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:l,examples:o,solution:i,codes:p};export{p as codes,c as default,e as description,m as examType,o as examples,a as id,t as inputDesc,l as outputDesc,u as score,i as solution,n as title};
