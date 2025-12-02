const g="74",n="整数编码",l="A",u=100,t=`实现一种整数编码方法，使得待编码的数字越小，编码后所占用的字节数越小。
编码规则如下:
编码时7位一组，每个字节的低7位用于存储待编码数字的补码字节的最高位表示后续是否还有字节，置1表示后面还有更多的字节，置0表示当前字节为最后一个字节。采用小端序编码，低位和低字节放在低地址上。编码结果按16进制数的字符格式输出，小写字母需转换为大写字母
`,e=`输入的为一个字符串表示的非负整数
`,i="输出一个字符串，表示整数编码的16进制码流（大写字母）。",s=[{input:"100",output:"64",explanation:"100二进制为1100100，只需1个字节，最高位置0，结果为01100100=64。"},{input:"1000",output:"E807",explanation:"1000二进制为1111101000，需2个字节。低7位1101000加最高位1得E8，高位0000111得07。小端序E807。"},{input:"0",output:"00",explanation:"0编码为单字节00。"}],r=`**解题思路：**

本题是一道**进制转换**问题（VLQ编码）。

**算法步骤：**
1. 将数字转为二进制字符串
2. 从低位开始，每7位一组
3. 如果后面还有更多组，最高位置1，否则置0
4. 每组转为2位16进制字符串（大写）
5. 小端序输出（低字节在前）

**时间复杂度**：O(log N)`,a={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.nextLong()));
  }

  public static String getResult(long num) {
    String bin = Long.toBinaryString(num);

    StringBuilder ans = new StringBuilder();

    int end = bin.length();
    while (end - 7 > 0) {
      ans.append(getHexString("1" + bin.substring(end - 7, end)));
      end -= 7;
    }

    if (end >= 0) {
      ans.append(getHexString(bin.substring(0, end)));
    }

    return ans.toString();
  }

  public static String getHexString(String binStr) {
    String hexStr = Integer.toHexString(Integer.parseInt(binStr, 2));
    if (hexStr.length() == 1) hexStr = "0" + hexStr;
    return hexStr.toUpperCase();
  }
}`,python:`# 输入获取
num = int(input())


def getHexString(binStr):
    # bin函数可以将十进制数转为16进制字符串，但是开头会带0x,因此下面做了字符串截取操作
    hexStr = hex(int(binStr, 2))[2:]
    if len(hexStr) == 1:
        hexStr = "0" + hexStr
    return hexStr.upper()


# 算法入口
def getResult():
    # bin函数可以将十进制数转为二进制字符串，但是开头会带0b,因此下面做了字符串截取操作
    binStr = bin(num)[2:]

    ans = []

    end = len(binStr)
    while end - 7 > 0:
        ans.append(getHexString("1" + binStr[end-7:end]))
        end -= 7

    if end >= 0:
        ans.append(getHexString(binStr[:end]))

    return "".join(ans)


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const num = BigInt(line);
    let bin = num.toString(2);
    
    let ans = '';
    let end = bin.length;
    
    while (end - 7 > 0) {
        const segment = '1' + bin.substring(end - 7, end);
        ans += parseInt(segment, 2).toString(16).toUpperCase().padStart(2, '0');
        end -= 7;
    }
    
    if (end >= 0) {
        const segment = bin.substring(0, end) || '0';
        ans += parseInt(segment, 2).toString(16).toUpperCase().padStart(2, '0');
    }
    
    console.log(ans);
    rl.close();
});`,cpp:`#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string getHexString(string binStr) {
    int val = stoi(binStr, nullptr, 2);
    char hex[3];
    sprintf(hex, "%02X", val);
    return string(hex);
}

int main() {
    unsigned long long num;
    cin >> num;
    
    string bin;
    if (num == 0) bin = "0";
    else {
        unsigned long long tmp = num;
        while (tmp > 0) {
            bin = char('0' + tmp % 2) + bin;
            tmp /= 2;
        }
    }
    
    string ans;
    int end = bin.length();
    
    while (end - 7 > 0) {
        ans += getHexString("1" + bin.substr(end - 7, 7));
        end -= 7;
    }
    
    if (end >= 0) {
        ans += getHexString(bin.substr(0, end));
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    unsigned long long num;
    scanf("%llu", &num);
    
    char bin[65];
    int binLen = 0;
    
    if (num == 0) {
        bin[0] = '0';
        binLen = 1;
    } else {
        unsigned long long tmp = num;
        while (tmp > 0) {
            bin[binLen++] = '0' + tmp % 2;
            tmp /= 2;
        }
        // 反转
        for (int i = 0; i < binLen / 2; i++) {
            char t = bin[i];
            bin[i] = bin[binLen - 1 - i];
            bin[binLen - 1 - i] = t;
        }
    }
    bin[binLen] = '\\0';
    
    char ans[100];
    int ansLen = 0;
    int end = binLen;
    
    while (end - 7 > 0) {
        char segment[9] = "1";
        strncat(segment, bin + end - 7, 7);
        int val = strtol(segment, NULL, 2);
        sprintf(ans + ansLen, "%02X", val);
        ansLen += 2;
        end -= 7;
    }
    
    if (end >= 0) {
        char segment[9] = {0};
        strncpy(segment, bin, end);
        int val = strtol(segment, NULL, 2);
        sprintf(ans + ansLen, "%02X", val);
    }
    
    printf("%s\\n", ans);
    return 0;
}`},o={id:"74",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:i,examples:s,solution:r,codes:a};export{a as codes,o as default,t as description,l as examType,s as examples,g as id,e as inputDesc,i as outputDesc,u as score,r as solution,n as title};
