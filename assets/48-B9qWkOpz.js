const a="48",n="简易压缩算法一种字符串压缩表示的解压",o="A",u=100,e=`有一种简易压缩算法：针对全部为小写英文字母组成的字符串， 将其中连续超过两个相同字母的部分压缩为连续个数加该字母 其他部分保持原样不变.
例如字符串aaabbccccd 经过压缩变成字符串 3abb4cd
请您编写解压函数,根据输入的字符串,判断其是否为合法压缩过的字符串
若输入合法则输出解压缩后的字符串否则输出字符串!error来报告错误`,r=`输入一行，为一个 ASCII 字符串
长度不超过100字符
用例保证输出的字符串长度也不会超过100字符串`,t=`若判断输入为合法的经过压缩后的字符串
则输出压缩前的字符串
若输入不合法 则输出字符串!error`,s=[{input:"4dff",output:"ddddff",explanation:`4d扩展为4个d，ff保持不变。
解压后的字符串为ddddff。`},{input:"2dff",output:"!error",explanation:`数字2表示2个d，但2个相同字母不需要压缩。
压缩规则是连续超过2个才压缩，故输入不合法。`},{input:"4d@A",output:"!error",explanation:`压缩后的字符串只包含小写字母和数字。
出现特殊字符@和大写字母A，输入不合法。`},{input:"3abb4cd",output:"aaabbccccd",explanation:`3a→aaa，bb保持，4c→cccc，d保持。
解压结果：aaabbccccd。`}],i=`题目要求我们编写一个函数来判断一个字符串是否是经过合法压缩后的字符串，并且能够解压缩这个字符串。如果字符串不合法，则返回!error。
连续超过两个相同的字母，将它们压缩为数字 + 字母的形式。例如，aaa压缩为3a，cccc压缩为4c。字符串中的其他部分保持原样。
字符串中只允许包含小写字母和数字，不允许出现其他字符。数字必须大于2，因为两个或更少个相同字母不应该压缩。数字后面必须跟随一个小写字母，且该数字应扩展为对应数量的字母。`,c={java:`import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取输入字符串
        String s = scanner.nextLine();
        
        // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
        String pat = "[^0-9a-z]";
        
        // 用于存储数字部分的字符串
        String num = "";
        
        // 用于存储最终解压缩的结果
        String res = "";
        
        // 编译正则表达式
        Pattern pattern = Pattern.compile(pat);
        Matcher matcher = pattern.matcher(s);
        
        // 如果找到非法字符，则直接输出 "!error"
        if (matcher.find()) {
            res = "!error";
        } else {
            // 遍历输入字符串的每一个字符
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                
                // 如果当前字符是数字，则将其追加到 num 中
                if (Character.isDigit(c)) {
                    num += c;
                } 
                // 如果 num 不为空，表示之前有数字，需要进行解压操作
                else if (!num.equals("")) {
                    // 判断数字是否小于等于2，如果是则输入不合法
                    if (Integer.parseInt(num) <= 2) {
                        res = "!error";
                        break;
                    } else {
                        // 将对应数量的字母添加到结果中
                        for (int j = 0; j < Integer.parseInt(num); j++) {
                            res += c;
                        }
                        // 重置 num 为空
                        num = "";
                    }
                } 
                // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
                else {
                    res += c;
                }
            }
        }
        
        // 输出最终结果
        System.out.println(res);
    }
}`,python:`import re

# 读取输入字符串
s = input()

# 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
pat = "[^0-9a-z]"

# 用于存储数字部分的字符串
num = ""

# 用于存储最终解压缩的结果
res = ""

# 编译正则表达式并查找非法字符
pattern = re.compile(pat)
matcher = pattern.search(s)

# 如果找到非法字符，则直接输出 "!error"
if matcher:
    res = "!error"
else:
    # 遍历输入字符串的每一个字符
    for i in range(len(s)):
        c = s[i]
        
        # 如果当前字符是数字，则将其追加到 num 中
        if c.isdigit():
            num += c
        # 如果 num 不为空，表示之前有数字，需要进行解压操作
        elif num != "":
            # 判断数字是否小于等于2，如果是则输入不合法
            if int(num) <= 2:
                res = "!error"
                break
            else:
                # 将对应数量的字母添加到结果中
                for j in range(int(num)):
                    res += c
                # 重置 num 为空
                num = ""
        # 如果当前字符是字母，且前面没有数字，则直接添加到结果中
        else:
            res += c

# 输出最终结果
print(res)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (s) => {
  // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
  const pat = '[^0-9a-z]';
  
  // 用于存储数字部分的字符串
  let num = "";
  
  // 用于存储最终解压缩的结果
  let res = "";

  // 如果字符串包含非法字符，则输出 "!error"
  if (s.match(pat) !== null) {
    res = "!error";
  } else {
    // 遍历输入字符串的每一个字符
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      
      // 如果当前字符是数字，则将其追加到 num 中
      if (c.match(/[0-9]/)) {
        num += c;
      } 
      // 如果 num 不为空，表示之前有数字，需要进行解压操作
      else if (num !== "") {
        // 判断数字是否小于等于2，如果是则输入不合法
        if (parseInt(num) <= 2) {
          res = "!error";
          break;
        } else {
          // 将对应数量的字母添加到结果中
          res += c.repeat(parseInt(num));
          // 重置 num 为空
          num = "";
        }
      } 
      // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
      else {
        res += c;
      }
    }
  }
  
  // 输出最终结果
  console.log(res);
  rl.close();
});`,cpp:`#include <iostream>
#include <regex>
using namespace std;

int main() {
    // 读取输入字符串
    string s;
    cin >> s;

    // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
    string pat = "[^0-9a-z]";
    
    // 用于存储数字部分的字符串
    string num = "";
    
    // 用于存储最终解压缩的结果
    string res = "";
    
    // 如果字符串包含非法字符，则输出 "!error"
    if (regex_search(s, regex(pat))) {
        res = "!error";
    } else {
        // 遍历输入字符串的每一个字符
        for (char c : s) {
            // 如果当前字符是数字，则将其追加到 num 中
            if (isdigit(c)) {
                num += c;
            } 
            // 如果 num 不为空，表示之前有数字，需要进行解压操作
            else if (num != "") {
                // 判断数字是否小于等于2，如果是则输入不合法
                if (stoi(num) <= 2) {
                    res = "!error";
                    break;
                } else {
                    // 将对应数量的字母添加到结果中
                    res += string(stoi(num), c);
                    // 重置 num 为空
                    num = "";
                }
            } 
            // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
            else {
                res += c;
            }
        }
    }

    // 输出最终结果
    cout << res << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义一个函数，用于检查字符串中是否包含非法字符
bool contains_invalid_characters(const char *s) {
    while (*s) {
        // 如果字符不是数字或小写字母，则认为是非法字符
        if (!isdigit(*s) && !islower(*s)) {
            return true;
        }
        s++;
    }
    return false;
}

int main() {
    // 定义存储输入字符串的数组
    char s[1000];
    
    // 读取输入字符串
    scanf("%s", s);

    // 用于存储数字部分的字符串
    char num[100] = "";
    
    // 用于存储最终解压缩的结果
    char res[1000] = "";
    
    // 如果字符串包含非法字符，则输出 "!error"
    if (contains_invalid_characters(s)) {
        strcpy(res, "!error");
    } else {
        // 遍历输入字符串的每一个字符
        for (int i = 0; s[i] != '\\0'; i++) {
            char c = s[i];
            
            // 如果当前字符是数字，则将其追加到 num 中
            if (isdigit(c)) {
                strncat(num, &c, 1);
            } 
            // 如果 num 不为空，表示之前有数字，需要进行解压操作
            else if (strlen(num) > 0) {
                // 判断数字是否小于等于2，如果是则输入不合法
                int repeat_count = atoi(num);
                if (repeat_count <= 2) {
                    strcpy(res, "!error");
                    break;
                } else {
                    // 将对应数量的字母添加到结果中
                    for (int j = 0; j < repeat_count; j++) {
                        strncat(res, &c, 1);
                    }
                    // 重置 num 为空
                    num[0] = '\\0';
                }
            } 
            // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
            else {
                strncat(res, &c, 1);
            }
        }
    }

    // 输出最终结果
    printf("%s\\n", res);
    return 0;
}`},l={id:"48",title:n,examType:"A",score:100,description:e,inputDesc:r,outputDesc:t,examples:s,solution:i,codes:c};export{c as codes,l as default,e as description,o as examType,s as examples,a as id,r as inputDesc,t as outputDesc,u as score,i as solution,n as title};
