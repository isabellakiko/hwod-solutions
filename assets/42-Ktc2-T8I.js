const r="42",n="环中最长子串字符成环找偶数O",u="A",c=100,t="给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出 ‘o’ 字符出现了偶数次最长子字符串的长度。",o=`输入是一串小写字母组成的字符串
1 <= s.length <= 5 x 10^5 s 只包含小写英文字母`,e="输出是一个整数",i=[{input:"alolobo",output:"6",explanation:`字符串有3个'o'（奇数），需要去掉1个字符。
最长子字符串之一是"alolob"，包含2个'o'，长度为6。`},{input:"looxdolx",output:"7",explanation:`字符串有3个'o'（奇数），长度8-1=7。
由于首尾相连成环，最长子串是"oxdolxl"，包含2个'o'。`},{input:"bcbcbc",output:"6",explanation:`字符串有0个'o'（偶数），整个字符串本身就满足条件。
输出长度6。`}],l=`**解题思路：**

本题是一道**数学+贪心**问题。

**核心观察：**
- 字符串首尾相连成环
- 找包含偶数个'o'的最长子串

**关键结论：**
- 如果'o'总数为偶数：整个字符串都满足条件，答案为len
- 如果'o'总数为奇数：最多去掉1个字符使'o'变偶数，答案为len-1

**为什么？**
- 环形结构中，任意长度为len-1的子串都能找到
- 去掉任意一个'o'，剩余'o'数变偶数

**时间复杂度**：O(n)`,s={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建一个Scanner对象，用于读取用户输入
        Scanner in = new Scanner(System.in);
        // 读取用户输入的字符串
        String input = in.nextLine();
        // 将输入的字符串转换为字符数组
        char[] chrs = input.toCharArray();
        // 获取字符串的长度
        int len = chrs.length;
        // 初始化'o'字符的计数器
        int num = 0;
        // 遍历字符数组，统计'o'字符的数量
        for (char chr : chrs) {
            if (chr == 'o') {
                num += 1;
            }
        }
        // 如果'o'字符出现的次数是偶数，则输出字符串的长度
        if (num % 2 == 0) {
            System.out.println(len);
        } else {
            // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
            System.out.println(len - 1);
        }
    }
}`,python:`# 读取用户输入的字符串
input_str = input("")
# 获取字符串的长度
len_str = len(input_str)
# 初始化'o'字符的计数器
num = 0
# 遍历字符串，统计'o'字符的数量
for chr in input_str:
    if chr == 'o':
        num += 1
# 如果'o'字符出现的次数是偶数，则输出字符串的长度
if num % 2 == 0:
    print(len_str)
else:
    # 如果'o'字符出现的次数是奇数，则输出字符串长度减1
    print(len_str - 1)`,javascript:`// 引入readline模块，用于读取用户输入
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// 询问用户输入字符串
readline.on('line', (input) => {
  // 获取字符串的长度
  const len = input.length;
  // 初始化'o'字符的计数器
  let num = 0;
  // 遍历字符串，统计'o'字符的数量
  for (let chr of input) {
    if (chr === 'o') {
      num += 1;
    }
  }
  // 如果'o'字符出现的次数是偶数，则输出字符串的长度
  if (num % 2 === 0) {
    console.log(len);
  } else {
    // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
    console.log(len - 1);
  }
  readline.close();
});`,cpp:`#include <iostream>
#include <string>
using namespace std;

int main() {
    // 创建一个字符串变量，用于存储用户输入
    string input;
    // 读取用户输入的字符串
    getline(cin, input);
    // 获取字符串的长度
    int len = input.size();
    // 初始化'o'字符的计数器
    int num = 0;
    // 遍历字符串，统计'o'字符的数量
    for (char chr : input) {
        if (chr == 'o') {
            num += 1;
        }
    }
    // 如果'o'字符出现的次数是偶数，则输出字符串的长度
    if (num % 2 == 0) {
        cout << len << endl;
    } else {
        // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
        cout << len - 1 << endl;
    }
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char input[500001]; // 创建一个字符数组，用于存储用户输入的字符串，最大长度500000
    scanf("%s", input); // 读取用户输入的字符串

    int len = strlen(input); // 获取字符串的长度
    int num = 0; // 初始化'o'字符的计数器

    // 遍历字符串，统计'o'字符的数量
    for (int i = 0; i < len; i++) {
        if (input[i] == 'o') {
            num++;
        }
    }

    // 如果'o'字符出现的次数是偶数，则输出字符串的长度
    if (num % 2 == 0) {
        printf("%d\\n", len);
    } else {
        // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
        printf("%d\\n", len - 1);
    }

    return 0;
}`},p={id:"42",title:n,examType:"A",score:100,description:t,inputDesc:o,outputDesc:e,examples:i,solution:l,codes:s};export{s as codes,p as default,t as description,u as examType,i as examples,r as id,o as inputDesc,e as outputDesc,c as score,l as solution,n as title};
