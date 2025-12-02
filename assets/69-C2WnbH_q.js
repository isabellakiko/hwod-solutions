const s="69",n="字符串重新排列、字符串重新排序",c="A",u=100,t=`给定一个字符串s，s包括以空格分隔的若干个单词，请对s进行如下处理后输出： 1、单词内部调整：对每个单词字母重新按字典序排序 2、单词间顺序调整： 1）统计每个单词出现的次数，并按次数降序排列 2）次数相同，按单词长度升序排列 3）次数和单词长度均相同，按字典升序排列
请输出处理后的字符串，每个单词以一个空格分隔。
`,r=`一行字符串，每个字符取值范围：[a-zA-z0-9]以及空格，字符串长度范围：[1，1000]
`,i="输出处理后的字符串，每个单词以一个空格分隔。",o=[{input:"This is an apple",output:"an is aelpp hiTs",explanation:"单词内部排序后：hiTs is an aelpp。按次数(都是1)、长度升序、字典序排列。"},{input:"the apple is on the apple tree",output:"aelpp aelpp eht eht is no eert",explanation:"apple和the各出现2次排前面，按长度和字典序排其他单词。"},{input:"aa bb aa bb cc",output:"aa aa bb bb cc",explanation:"aa和bb各2次，cc1次。按次数降序，同次数按长度和字典序。"}],e=`**解题思路：**

本题是一道**排序**问题。

**算法步骤：**
1. 对每个单词内部字母按字典序排序
2. 统计每个单词出现次数
3. 按多条件排序：次数降序 > 长度升序 > 字典序升序

**时间复杂度**：O(N log N × M)，N为单词数，M为平均单词长度`,a={java:`import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String[] arr = sc.nextLine().split(" ");
    System.out.println(getResult(arr));
  }

  public static String getResult(String[] arr) {
    arr =
        Arrays.stream(arr)
            .map(
                str -> {
                  char[] cArr = str.toCharArray();
                  Arrays.sort(cArr);
                  return new String(cArr);
                })
            .toArray(String[]::new);

    HashMap<String, Integer> count = new HashMap<>();
    for (String s : arr) {
      count.put(s, count.getOrDefault(s, 0) + 1);
    }

    Arrays.sort(
        arr,
        (a, b) ->
            !count.get(a).equals(count.get(b))
                ? count.get(b) - count.get(a)
                : a.length() != b.length() ? a.length() - b.length() : a.compareTo(b));

    StringJoiner sj = new StringJoiner(" ", "", "");
    for (String s : arr) {
      sj.add(s);
    }
    return sj.toString();
  }
}`,python:`# 输入获取
arr = input().split()


# 算法入口
def getResult(arr):
    for i in range(len(arr)):
        arr[i] = "".join(sorted(arr[i]))

    count = {}
    for c in arr:
        if count.get(c) is None:
            count[c] = 0
        count[c] += 1

    # arr.sort(key=lambda x: (-count[x], len(x), [ord(char) for char in x]))
    arr.sort(key=lambda x: (-count[x], len(x), x))

    # return " ".join(map(str, arr))
    return " ".join(arr)


# 算法调用
print(getResult(arr))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const arr = line.split(" ");
  console.log(getResult(arr));
});

function getResult(arr) {
  arr = arr.map((str) => [...str].sort().join(""));

  const count = arr.reduce((p, c) => {
    p[c] ? p[c]++ : (p[c] = 1);
    return p;
  }, {});

  arr.sort((a, b) =>
    count[a] !== count[b]
      ? count[b] - count[a]
      : a.length !== b.length
      ? a.length - b.length
      : a > b
      ? 1
      : -1
  );

  return arr.join(" ");
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <map>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    vector<string> arr;
    stringstream ss(line);
    string word;
    while (ss >> word) {
        sort(word.begin(), word.end());
        arr.push_back(word);
    }
    
    map<string, int> count;
    for (const string& s : arr) {
        count[s]++;
    }
    
    sort(arr.begin(), arr.end(), [&count](const string& a, const string& b) {
        if (count[a] != count[b]) return count[a] > count[b];
        if (a.length() != b.length()) return a.length() < b.length();
        return a < b;
    });
    
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i];
        if (i < arr.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char words[1001][1001];
int wordCount = 0;
int counts[1001];

int charCmp(const void* a, const void* b) {
    return *(char*)a - *(char*)b;
}

int wordCmp(const void* a, const void* b) {
    int ia = *(int*)a;
    int ib = *(int*)b;
    if (counts[ia] != counts[ib]) return counts[ib] - counts[ia];
    int la = strlen(words[ia]);
    int lb = strlen(words[ib]);
    if (la != lb) return la - lb;
    return strcmp(words[ia], words[ib]);
}

int main() {
    char line[10001];
    fgets(line, sizeof(line), stdin);
    
    char* token = strtok(line, " \\n");
    while (token) {
        strcpy(words[wordCount], token);
        qsort(words[wordCount], strlen(words[wordCount]), sizeof(char), charCmp);
        wordCount++;
        token = strtok(NULL, " \\n");
    }
    
    // 统计次数
    for (int i = 0; i < wordCount; i++) {
        counts[i] = 0;
        for (int j = 0; j < wordCount; j++) {
            if (strcmp(words[i], words[j]) == 0) counts[i]++;
        }
    }
    
    int indices[1001];
    for (int i = 0; i < wordCount; i++) indices[i] = i;
    qsort(indices, wordCount, sizeof(int), wordCmp);
    
    for (int i = 0; i < wordCount; i++) {
        printf("%s", words[indices[i]]);
        if (i < wordCount - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}`},l={id:"69",title:n,examType:"A",score:100,description:t,inputDesc:r,outputDesc:i,examples:o,solution:e,codes:a};export{a as codes,l as default,t as description,c as examType,o as examples,s as id,r as inputDesc,i as outputDesc,u as score,e as solution,n as title};
