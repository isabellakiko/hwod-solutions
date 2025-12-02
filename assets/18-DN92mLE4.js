const c="18",n="字符统计及重排",s="A",a=100,t=`给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，
并按照字母出现次数从大到小的顺序。输出各个字母及其出现次数。
如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。`,i="输入一行，为一个仅包含字母的字符串。",r=`按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；
字母和次数间用英文冒号分隔。`,e=[{input:"xyxyXX",output:"x:2;y:2;X:2;",explanation:"无"},{input:"abababb",output:"b:4;a:3;",explanation:"b的出现个数比a多，故b排在a之前"}],o=`**解题思路：**

本题是一道**字符统计与排序**问题。

**算法步骤：**

1. **统计频次**：用数组 count[256] 统计每个字符的出现次数
2. **找最大次数**：获取出现次数最多的字符的次数 max_count
3. **按次数降序输出**：从 max_count 到 1 遍历
   - 对于每个次数 i，先遍历小写字母 a-z
   - 再遍历大写字母 A-Z
   - 满足 count[ch] == i 则输出

**排序规则：**
- 主排序：按出现次数降序
- 次排序：次数相同时，小写字母在前，大写字母在后
- 同为小写或大写时，按字母自然顺序（a<b<c... 或 A<B<C...）

**时间复杂度**：O(n + 52*max_count)`,u={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine(); //读入字符串

        int[] count = new int[256]; //用一个数组记录每个字符出现的次数
        for (char ch : str.toCharArray()) {
            count[ch]++;
        }

        int max_count = Arrays.stream(count).max().getAsInt(); //获取出现次数最多的字符的出现次数
        StringBuilder result = new StringBuilder();
        for (int i = max_count; i > 0; i--) { //从出现次数最多的开始遍历
            for (int j = 'a'; j <= 'z'; j++) { //先输出小写字母
                if (count[j] == i) {
                    result.append((char)j);
                    result.append(":");
                    result.append(i);
                    result.append(";");
                }
            }
            for (int j = 'A'; j <= 'Z'; j++) { //再输出大写字母
                if (count[j] == i) {
                    result.append((char)j);
                    result.append(":");
                    result.append(i);
                    result.append(";");
                }
            }
        }
        System.out.println(result.toString());
    }
}`,python:`import sys

str1 = input() #读入字符串

count = [0] * 256 #用一个数组记录每个字符出现的次数
for ch in str1:
    count[ord(ch)] += 1

max_count = max(count) #获取出现次数最多的字符的出现次数
result = ""
for i in range(max_count, 0, -1): #从出现次数最多的开始遍历
    for j in range(ord('a'), ord('z')+1): #先输出小写字母
        if count[j] == i:
            result += chr(j)
            result += ":"
            result += str(i)
            result += ";"
    for j in range(ord('A'), ord('Z')+1): #再输出大写字母
        if count[j] == i:
            result += chr(j)
            result += ":"
            result += str(i)
            result += ";"

print(result)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  let str = input.trim();
  let count = new Array(256).fill(0);
  for (let i = 0; i < str.length; i++) {
    let ch = str.charCodeAt(i);
    count[ch]++;
  }
  let max_count = Math.max(...count);
  let result = '';
  for (let i = max_count; i > 0; i--) {
    for (let j = 97; j <= 122; j++) {
      if (count[j] === i) {
        result += String.fromCharCode(j) + ':' + i + ';';
      }
    }
    for (let j = 65; j <= 90; j++) {
      if (count[j] === i) {
        result += String.fromCharCode(j) + ':' + i + ';';
      }
    }
  }
  console.log(result);
});`,cpp:`#include <bits/stdc++.h>
using namespace std;

int main()
{
    string str;
    getline(cin, str); //读入字符串

    vector<int> count(256, 0); //用一个容器记录每个字符出现的次数
    for (char ch : str) {
        count[ch]++;
    }

    int max_count = *max_element(count.begin(), count.end()); //获取出现次数最多的字符的出现次数
    string result;
    for (int i = max_count; i > 0; i--) { //从出现次数最多的开始遍历
        for (int j = 'a'; j <= 'z'; j++) { //先输出小写字母
            if (count[j] == i) {
                result.push_back(j);
                result.append(":");
                result.append(to_string(i));
                result.append(";");
            }
        }
        for (int j = 'A'; j <= 'Z'; j++) { //再输出大写字母
            if (count[j] == i) {
                result.push_back(j);
                result.append(":");
                result.append(to_string(i));
                result.append(";");
            }
        }
    }
    cout << result << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char str[1000];  // 定义字符串，最大长度为1000
    fgets(str, 1000, stdin);  // 从输入中读取一行字符串

    int count[256] = {0};  // 定义一个数组，记录每个字符出现的次数，初始化为0

    // 遍历输入的字符串，统计每个字符出现的次数
    for (int i = 0; i < strlen(str); i++) {
        count[(unsigned char)str[i]]++;
    }

    // 找到出现次数最多的字符的出现次数
    int max_count = 0;
    for (int i = 0; i < 256; i++) {
        if (count[i] > max_count) {
            max_count = count[i];
        }
    }

    // 输出结果，按照出现次数从大到小的顺序
    for (int i = max_count; i > 0; i--) {
        // 输出小写字母
        for (int j = 'a'; j <= 'z'; j++) {
            if (count[j] == i) {
                printf("%c:%d;", j, i);  // 输出字符及其出现次数
            }
        }

        // 输出大写字母
        for (int j = 'A'; j <= 'Z'; j++) {
            if (count[j] == i) {
                printf("%c:%d;", j, i);  // 输出字符及其出现次数
            }
        }
    }

    printf("\\n");  // 输出换行符，表示结束
    return 0;
}`},l={id:"18",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:r,examples:e,solution:o,codes:u};export{u as codes,l as default,t as description,s as examType,e as examples,c as id,i as inputDesc,r as outputDesc,a as score,o as solution,n as title};
