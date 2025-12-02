const c="81",n="求字符串中所有整数的最小和",l="A",r=100,e=`输入字符串s，输出s中包含所有整数的最小和。
说明：
字符串s，只包含 a-z A-Z ± ； 合法的整数包括
1） 正整数 一个或者多个0-9组成，如 0 2 3 002 102 2）负整数 负号 – 开头，数字部分由一个或者多个0-9组成，如 -0 -012 -23 -00023
`,t=`包含数字的字符串
`,i="输出所有整数的最小和。",a=[{input:"bb1234aa",output:"10",explanation:"正整数单个数字相加：1+2+3+4=10。"},{input:"bb12-34aa",output:"-31",explanation:"正数1+2=3，负数-34，总和3-34=-31。"},{input:"-12a-34",output:"-46",explanation:"两个负数-12和-34，总和-12+(-34)=-46。"}],s=`**解题思路：**

本题是一道**字符串处理**问题。

**核心思路：**
- 正整数：拆成单个数字相加（使和最小）
- 负整数：保持完整（负数越大绝对值，和越小）

**算法步骤：**
1. 遇到负号，标记进入负数模式
2. 负数模式下，数字拼接成完整负数
3. 非负数模式下，数字单独相加
4. 遇到非数字字符，结算当前负数

**时间复杂度**：O(N)`,g={java:`import java.math.BigInteger;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.nextLine()));
  }

  public static String getResult(String s) {
    boolean isNegative = false;
    StringBuilder negative = new StringBuilder();

    //    int ans = 0;
    BigInteger ans = new BigInteger("0");

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);

      if (c >= '0' && c <= '9') {
        if (isNegative) {
          negative.append(c);
        } else {
          //          ans += Integer.parseInt(c + "");
          ans = ans.add(new BigInteger(c + ""));
        }
      } else {
        if (isNegative && negative.length() > 0) {
          //          ans -= Integer.parseInt(negative.toString());
          ans = ans.subtract(new BigInteger(negative.toString()));
          negative = new StringBuilder();
        }

        isNegative = c == '-';
      }
    }

    if (negative.length() > 0) {
      //      ans -= Integer.parseInt(negative.toString());
      ans = ans.subtract(new BigInteger(negative.toString()));
    }

    return ans.toString();
  }
}`,python:`# 输入获取
s = input()


# 算法入口
def getResult():
    isNegative = False
    negative = []

    ans = 0
    for c in s:
        if '0' <= c <= '9':
            if isNegative:
                negative.append(c)
            else:
                ans += int(c)
        else:
            if isNegative and len(negative) > 0:
                ans -= int("".join(negative))
                negative.clear()
            isNegative = c == '-'

    if len(negative) > 0:
        ans -= int("".join(negative))

    return ans


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    let isNegative = false;
    let negative = '';
    let ans = BigInt(0);
    
    for (let c of line) {
        if (c >= '0' && c <= '9') {
            if (isNegative) {
                negative += c;
            } else {
                ans += BigInt(c);
            }
        } else {
            if (isNegative && negative.length > 0) {
                ans -= BigInt(negative);
                negative = '';
            }
            isNegative = c === '-';
        }
    }
    
    if (negative.length > 0) {
        ans -= BigInt(negative);
    }
    
    console.log(ans.toString());
    rl.close();
});`,cpp:`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    bool isNegative = false;
    string negative;
    long long ans = 0;
    
    for (char c : s) {
        if (c >= '0' && c <= '9') {
            if (isNegative) {
                negative += c;
            } else {
                ans += c - '0';
            }
        } else {
            if (isNegative && !negative.empty()) {
                ans -= stoll(negative);
                negative.clear();
            }
            isNegative = c == '-';
        }
    }
    
    if (!negative.empty()) {
        ans -= stoll(negative);
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char s[10001];
    fgets(s, sizeof(s), stdin);
    
    int isNegative = 0;
    char negative[100];
    int negLen = 0;
    long long ans = 0;
    
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c >= '0' && c <= '9') {
            if (isNegative) {
                negative[negLen++] = c;
            } else {
                ans += c - '0';
            }
        } else {
            if (isNegative && negLen > 0) {
                negative[negLen] = '\\0';
                ans -= atoll(negative);
                negLen = 0;
            }
            isNegative = c == '-';
        }
    }
    
    if (negLen > 0) {
        negative[negLen] = '\\0';
        ans -= atoll(negative);
    }
    
    printf("%lld\\n", ans);
    return 0;
}`},o={id:"81",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:a,solution:s,codes:g};export{g as codes,o as default,e as description,l as examType,a as examples,c as id,t as inputDesc,i as outputDesc,r as score,s as solution,n as title};
