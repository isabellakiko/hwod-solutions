const d="51",n="英文输入法",c="A",a=100,e=`主管期望你来实现英文输入法单词联想功能。 需求如下：
依据用户输入的单词前缀，从已输入的英文语句中联想出用户想输入的单词，按字典序输出联想到的单词序列，如果联想不到，请输出用户输入的单词前缀。
注意：
英文单词联想时，区分大小写缩略形式如”don’t”，判定为两个单词，”don”和”t”输出的单词序列，不能有重复单词，且只能是英文单词，不能有标点符号`,t=`输入为两行。
首行输入一段由英文单词word和标点符号组成的语句str；
接下来一行为一个英文单词前缀pre。
0 < word.length() <= 200 < str.length <= 100000 < pre <= 20`,r="输出符合要求的单词序列或单词前缀，存在多个时，单词之间以单个空格分割",s=[{input:`I love you
He`,output:"He",explanation:"从用户已输入英文语句”I love you”中提炼出“I”、“love”、“you”三个单词，接下来用户输入“He”，从已输入信息中无法联想到任何符合要求的单词，因此输出用户输入的单词前缀。"},{input:`The furthest distance in the world, Is not between life and death, But when I stand in front of you, Yet you don’t know that I love you.
f`,output:"front furthest",explanation:"从用户已输入英文语句”The furthestdistance in the world, Is not between life and death, But when I stand in frontof you, Yet you dont know that I love you.”中提炼出的单词，符合“f”作为前缀的，有“furthest”和“front”，按字典序排序并在单词间添加空格后输出，结果为“front furthest”。"}],i=`**解题思路：**

本题是一道**字符串处理+排序**问题。

**算法步骤：**

1. 将输入语句中的非字母字符替换为空格
2. 按空格分割得到单词列表
3. 使用Set去重
4. 筛选以prefix为前缀的单词
5. 按字典序排序输出
6. 若无匹配则输出前缀本身

**注意事项：**
- 缩略形式如"don't"被分为"don"和"t"
- 区分大小写
- 输出不能有重复单词

**时间复杂度**：O(n log n)，n为单词数量`,o={java:`import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String sentence = br.readLine(); // 输入一段由英文单词word和标点符号组成的语句
        String prefix = br.readLine(); // 输入一个英文单词前缀
        sentence = sentence.replaceAll("[^a-zA-Z]", " "); // 将标点符号替换为空格
        Set<String> wordSet = new TreeSet<>(); // 存储单词的集合，自动去重且按照字典序排序
        String[] words = sentence.split("\\\\s+");
        for (String word : words) {
            wordSet.add(word);
        }
        StringBuilder ans = new StringBuilder();
        for (String s : wordSet) { // 遍历单词集合
            if (s.startsWith(prefix)) { // 如果单词以前缀开头
                ans.append(s).append(" "); // 将单词加入答案字符串
            }
        }
        if (ans.length() > 0) { // 如果答案字符串不为空
            System.out.println(ans.toString().trim()); // 输出单词序列
        } else {
            System.out.println(prefix); // 否则输出前缀
        }
    }
}`,python:`import string

sentence = input() # 输入一段由英文单词word和标点符号组成的语句
prefix = input() # 输入一个英文单词前缀
sentence = sentence.translate(str.maketrans(string.punctuation, ' ' * len(string.punctuation))) # 将标点符号替换为空格
word_set = set(sentence.split()) # 存储单词的集合，自动去重且按照字典序排序
ans = ''
for s in sorted(word_set): # 遍历单词集合
    if s.startswith(prefix): # 如果单词以前缀开头
        ans += s + ' ' # 将单词加入答案字符串
if ans: # 如果答案字符串不为空
    print(ans) # 输出单词序列
else:
    print(prefix) # 否则输出前缀`,javascript:`const readline = require('readline');
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (sentence) => {
  rl.on('line', (prefix) => {
  sentence = sentence.replace(/[^\\w\\s]/g, ' '); // 将标点符号替换为空格
    const wordSet = new Set(sentence.split(' ')); // 存储单词的集合，自动去重且按照字典序排序
    let ans = '';
    for (const word of Array.from(wordSet).sort()) { // 遍历单词集合
      if (word.startsWith(prefix)) { // 如果单词以前缀开头
        ans += word + ' '; // 将单词加入答案字符串
      }
    }
    if (ans) { // 如果答案字符串不为空
      console.log(ans); // 输出单词序列
    } else {
      console.log(prefix); // 否则输出前缀
    }
    rl.close();
  });
});`,cpp:`#include <iostream>
#include <algorithm>
#include <string>
#include <sstream>
#include <set>

using namespace std;

int main() {
    string sentence, prefix;
    getline(cin, sentence); // 输入一段由英文单词word和标点符号组成的语句
    getline(cin, prefix); // 输入一个英文单词前缀
    replace_if(sentence.begin(), sentence.end(), [](char c){return !isalpha(c);}, ' '); // 将标点符号替换为空格
    stringstream ss(sentence);
    set<string> word_set; // 存储单词的集合，自动去重且按照字典序排序
    string word;
    while (ss >> word) {
        word_set.insert(word);
    }
    string ans;
    for (auto s : word_set) { // 遍历单词集合
        if (s.substr(0, prefix.length()) == prefix) { // 如果单词以前缀开头
            ans += s + " "; // 将单词加入答案字符串
        }
    }
    if (ans.length() > 0) { // 如果答案字符串不为空
        cout << ans << endl; // 输出单词序列
    } else {
        cout << prefix << endl; // 否则输出前缀
    }
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

#define MAX_WORDS 1000
#define MAX_WORD_LENGTH 21
#define MAX_SENTENCE_LENGTH 10001

int compare(const void *a, const void *b) {
    return strcmp(*(const char **)a, *(const char **)b);
}

int main() {
    char sentence[MAX_SENTENCE_LENGTH], prefix[MAX_WORD_LENGTH];
    fgets(sentence, MAX_SENTENCE_LENGTH, stdin); // 输入一段由英文单词和标点符号组成的语句
    fgets(prefix, MAX_WORD_LENGTH, stdin);       // 输入一个英文单词前缀

    // 去除前缀字符串末尾的换行符
    size_t prefix_len = strlen(prefix);
    if (prefix[prefix_len - 1] == '\\n') {
        prefix[prefix_len - 1] = '\\0';
        prefix_len--;
    }

    // 将标点符号替换为空格
    for (int i = 0; sentence[i] != '\\0'; i++) {
        if (!isalpha(sentence[i])) {
            sentence[i] = ' ';
        }
    }

    // 存储单词的数组
    char *words[MAX_WORDS];
    int word_count = 0;
    char *word = strtok(sentence, " ");

    // 分割单词并存储
    while (word != NULL) {
        words[word_count] = (char *)malloc(strlen(word) + 1);
        strcpy(words[word_count], word);
        word_count++;
        word = strtok(NULL, " ");
    }

    // 对单词数组进行排序
    qsort(words, word_count, sizeof(char *), compare);

    // 输出结果
    int found = 0;
    for (int i = 0; i < word_count; i++) {
        if (strncmp(words[i], prefix, prefix_len) == 0) {
            printf("%s ", words[i]);
            found = 1;
        }
        free(words[i]); // 释放分配的内存
    }

    // 如果没有找到任何匹配的单词，输出前缀
    if (!found) {
        printf("%s", prefix);
    }

    return 0;
}`},l={id:"51",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:r,examples:s,solution:i,codes:o};export{o as codes,l as default,e as description,c as examType,s as examples,d as id,t as inputDesc,r as outputDesc,a as score,i as solution,n as title};
