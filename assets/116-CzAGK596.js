const c="116",n="九宫格按键输入",p="A",m=200,e=`九宫格按键输入，输出显示内容，有英文和数字两个模式，默认是数字模式，数字模式直接输出数字，英文模式连续按同一个按键会依次出现这个按键上的字母，如果输入”/”或者其他字符，则循环中断。
字符对应关系如图：

要求输入一串按键，输出屏幕显示。
#用于切换模式，默认是数字模式，执行#后切换为英文模式；/表示延迟，例如在英文模式下，输入 22/222，显示为 bc；英文模式下，多次按同一键，例如输入 22222，显示为 b；`,t=`输入范围为数字 0~9 和字符’#’、’/’，输出屏幕显示，例如，
在数字模式下，输入 1234，显示 1234 在英文模式下，输入 1234，显示,adg
在数字模式下，输入 1234，显示 1234
在英文模式下，输入 1234，显示,adg`,i=`#用于切换模式，默认是数字模式，执行#后切换为英文模式；
/表示延迟，例如在英文模式下，输入 22/222，显示为 bc；
英文模式下，多次按同一键，例如输入 22222，显示为 b；`,r=[{input:"123",output:"123",explanation:"默认数字模式，直接输出数字"},{input:"#2222/22",output:"ab",explanation:"#进入英文模式，2222循环取余得a，/分隔后22得b"}],a=`**解题思路：**

本题是一道**模拟+状态机**问题。

**核心思路：**
- 维护当前模式（数字/英文）
- 数字模式直接输出数字
- 英文模式统计连续相同数字，取余映射字母

**按键映射：**
- 2→abc, 3→def, 4→ghi, 5→jkl
- 6→mno, 7→pqrs, 8→tuv, 9→wxyz

**特殊字符：**
- #：切换模式
- /：分隔连续输入

**时间复杂度**：O(N)`,s={java:`import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String input_str = reader.readLine();

        // 九宫格枚举信息
        Map<Character, String> char_map = new HashMap<>();
        char_map.put('0', " ");
        char_map.put('1', ",.");
        char_map.put('2', "abc");
        char_map.put('3', "def");
        char_map.put('4', "ghi");
        char_map.put('5', "jkl");
        char_map.put('6', "mno");
        char_map.put('7', "pqrs");
        char_map.put('8', "tuv");
        char_map.put('9', "wxyz");

        StringBuilder res = new StringBuilder();
        // 默认是数字模式
        int mode = 0;

        for (int i = 0; i < input_str.length(); i++) {
            char c = input_str.charAt(i);
            if (Character.isDigit(c)) { // 如果是数字
                if (mode == 0) { // 如果是数字模式，直接加入结果
                    res.append(c);
                } else if (mode == 1) { // 如果是字母模式
                    int j = i;
                    String tempstr = char_map.get(c);
                    while (j < input_str.length() && input_str.charAt(j) == c) { // 统计连续出现的数字个数
                        j++;
                    }
                    int index = (j - i - 1) % tempstr.length(); // 计算对应的字母下标
                    res.append(tempstr.charAt(index)); // 加入结果
                    i = j - 1; // 跳过已经处理的数字
                }
            } else if (c == '#') { // 如果是切换模式符号
                mode = (mode + 1) % 2; // 切换模式
            } else if (c == '/') { // 如果是延迟符号，不做处理
                // 延迟，不做处理
            } else { // 如果是其他字符，直接退出循环
                break;
            }
        }
        System.out.println(res.toString()); // 输出结果
    }
}`,python:`input_str = input().strip()

# 九宫格枚举信息
char_map = {
    '0': ' ',
    '1': ',.',
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
}

res = ""
# 默认是数字模式
mode = 0

i = 0
while i < len(input_str):
    c = input_str[i]
    if c.isdigit():  # 如果是数字
        if mode == 0:  # 如果是数字模式，直接加入结果
            res += c
        elif mode == 1:  # 如果是字母模式
            j = i
            tempstr = char_map[c]
            while j < len(input_str) and input_str[j] == c:  # 统计连续出现的数字个数
                j += 1
            index = (j - i - 1) % len(tempstr)  # 计算对应的字母下标
            res += tempstr[index]  # 加入结果
            i = j - 1  # 跳过已经处理的数字
    elif c == '#':  # 如果是切换模式符号
        mode = (mode + 1) % 2  # 切换模式
    elif c == '/':  # 如果是延迟符号，不做处理
        pass
    else:  # 如果是其他字符，直接退出循环
        break
    i += 1

print(res)  # 输出结果`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input_str) => {
  // 九宫格枚举信息
  const char_map = new Map();
  char_map.set('0', ' ');
  char_map.set('1', ',.');
  char_map.set('2', 'abc');
  char_map.set('3', 'def');
  char_map.set('4', 'ghi');
  char_map.set('5', 'jkl');
  char_map.set('6', 'mno');
  char_map.set('7', 'pqrs');
  char_map.set('8', 'tuv');
  char_map.set('9', 'wxyz');

  let res = '';
  // 默认是数字模式
  let mode = 0;

  for (let i = 0; i < input_str.length; i++) {
    const c = input_str.charAt(i);
    if (/\\d/.test(c)) { // 如果是数字
      if (mode === 0) { // 如果是数字模式，直接加入结果
        res += c;
      } else if (mode === 1) { // 如果是字母模式
        let j = i;
        const tempstr = char_map.get(c);
        while (j < input_str.length && input_str.charAt(j) === c) { // 统计连续出现的数字个数
          j++;
        }
        const index = (j - i - 1) % tempstr.length; // 计算对应的字母下标
        res += tempstr.charAt(index); // 加入结果
        i = j - 1; // 跳过已经处理的数字
      }
    } else if (c === '#') { // 如果是切换模式符号
      mode = (mode + 1) % 2; // 切换模式
    } else if (c === '/') { // 如果是延迟符号，不做处理
      // 延迟，不做处理
    } else { // 如果是其他字符，直接退出循环
      break;
    }
  }
  console.log(res); // 输出结果
});`,cpp:`#include<iostream>
#include<vector>
#include<algorithm>
#include<string.h>
#include<map>
using namespace std;
 
int main() {
    string input_str;
    cin >> input_str;
    
    // 九宫格枚举信息
    map<char, string> char_map;
    char_map['0'] = " ";
    char_map['1'] = ",.";
    char_map['2'] = "abc";
    char_map['3'] = "def";
    char_map['4'] = "ghi";
    char_map['5'] = "jkl";
    char_map['6'] = "mno";
    char_map['7'] = "pqrs";
    char_map['8'] = "tuv";
    char_map['9'] = "wxyz";
    
    string res;
    // 默认是数字模式
    int mode = 0;
    
    for (int i = 0; i < input_str.size(); i++) {
        char c = input_str[i];
        if (isdigit(c)) { // 如果是数字
            if (mode == 0) { // 如果是数字模式，直接加入结果
                res.push_back(c);
            } else if (mode == 1) { // 如果是字母模式
                int j = i;
                string tempstr = char_map[c];
                while (j < input_str.size() && input_str[j] == c) { // 统计连续出现的数字个数
                    j++;
                }
                int index = (j - i - 1) % tempstr.size(); // 计算对应的字母下标
                res.push_back(tempstr[index]); // 加入结果
                i = j - 1; // 跳过已经处理的数字
            }
        } else if (c == '#') { // 如果是切换模式符号
            mode = (mode + 1) % 2; // 切换模式
        } else if (c == '/') { // 如果是延迟符号，不做处理
            // 延迟，不做处理
        } else { // 如果是其他字符，直接退出循环
            break;
        }
    }
    cout << res << endl; // 输出结果
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <ctype.h>

// 定义映射的结构体，用于存储数字与对应字符的映射
typedef struct {
    char digit;
    char *letters;
} CharMap;

// 主函数
int main() {
    char input_str[100];  // 定义输入字符串
    scanf("%s", input_str);  // 读取用户输入
    
    // 九宫格枚举信息，字符映射表
    CharMap char_map[] = {
        {'0', " "},
        {'1', ",."},
        {'2', "abc"},
        {'3', "def"},
        {'4', "ghi"},
        {'5', "jkl"},
        {'6', "mno"},
        {'7', "pqrs"},
        {'8', "tuv"},
        {'9', "wxyz"}
    };

    char res[100];  // 存储结果字符串
    int res_index = 0;  // 结果字符串的当前索引
    int mode = 0;  // 模式，0表示数字模式，1表示字母模式
    int input_len = strlen(input_str);  // 获取输入字符串的长度
    
    // 遍历输入的每个字符
    for (int i = 0; i < input_len; i++) {
        char c = input_str[i];  // 当前字符

        // 判断当前字符是否为数字
        if (isdigit(c)) {
            if (mode == 0) {  // 数字模式，直接将字符加入结果
                res[res_index++] = c;
            } else if (mode == 1) {  // 字母模式
                int j = i;
                char *tempstr = NULL;  // 当前数字对应的字符集
                for (int k = 0; k < 10; k++) {
                    if (char_map[k].digit == c) {
                        tempstr = char_map[k].letters;  // 获取该数字对应的字符集
                        break;
                    }
                }
                // 统计连续相同数字的个数
                while (j < input_len && input_str[j] == c) {
                    j++;
                }
                int index = (j - i - 1) % strlen(tempstr);  // 计算字母的索引
                res[res_index++] = tempstr[index];  // 将对应的字母加入结果
                i = j - 1;  // 跳过已经处理的字符
            }
        } else if (c == '#') {  // 切换模式符号
            mode = (mode + 1) % 2;  // 切换模式
        } else if (c == '/') {  // 延迟符号，不做处理
            // 什么都不做，跳过该字符
        } else {  // 非法字符，直接退出循环
            break;
        }
    }
    
    res[res_index] = '\\0';  // 在结果字符串末尾加上结束符
    printf("%s\\n", res);  // 输出结果
    
    return 0;
}`},d={id:"116",title:n,examType:"A",score:200,description:e,inputDesc:t,outputDesc:i,examples:r,solution:a,codes:s};export{s as codes,d as default,e as description,p as examType,r as examples,c as id,t as inputDesc,i as outputDesc,m as score,a as solution,n as title};
