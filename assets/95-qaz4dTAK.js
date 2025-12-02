const d="95",n="字符串变换最小字符串",a="A",c=100,s=`给定一个字符串s，最多只能进行一次变换，返回变换后能得到的最小字符串（按照字典序进行比较）。
变换规则：交换字符串中任意两个不同位置的字符。`,r=`一串小写字母组成的字符串s
s是都是小写字符组成
1<=s.length<=1000`,t="一串小写字母组成的字符串s",i=[{input:"abcdef",output:"abcdef",explanation:"abcdef已经是最小字符串，不需要交换。"},{input:"bcdefa",output:"acdefb",explanation:"a和b进行位置交换，可以得到最小字符串。"}],e=`**解题思路：**

本题是一道**贪心**问题。

**核心思路：**
- 将原字符串排序得到最小字典序
- 从左到右找第一个与排序后不同的位置
- 将该位置的字符与后面最靠右的目标字符交换

**算法步骤：**
1. 对字符串排序得到目标串
2. 若已相等，直接输出原串
3. 找第一个不匹配位置i
4. 在i之后找最靠右的sortedArr[i]字符进行交换

**时间复杂度**：O(N log N)`,o={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.nextLine();
    
    // 对字符串进行排序
    char[] sortedArr = s.toCharArray();
    Arrays.sort(sortedArr);

    // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
    if (new String(sortedArr).equals(s)) {
        System.out.println(s);
        return;
    }

    // 遍历原字符串
    StringBuilder sb = new StringBuilder(s);
    for (int i = 0; i < s.length(); i++) {
      // 如果当前字符与排序后的字符不相同，则进行交换
      if (s.charAt(i) != sortedArr[i]) {
        char tmp = sb.charAt(i);
        int swapIndex = -1;
        // 找到排序后的字符在原字符串中的位置
        for (int j = i + 1; j < s.length(); j++) {
          if (sb.charAt(j) == sortedArr[i]) {
            swapIndex = j;
          }
        }
        // 将原字符与排序后的字符交换
        sb.setCharAt(i, sortedArr[i]);
        sb.setCharAt(swapIndex, tmp);
        break;
      }
    }

    // 输出最小字符串
    System.out.println(sb.toString());
  }
}`,python:`s = input()

# 对字符串进行排序
sortedArr = sorted(s)

# 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
if ''.join(sortedArr) == s:
    print(s)
    exit()

# 遍历原字符串
sb = list(s)
for i in range(len(s)):
    # 如果当前字符与排序后的字符不相同，则进行交换
    if s[i] != sortedArr[i]:
        tmp = sb[i]
        swapIndex = -1
        # 找到排序后的字符在原字符串中的位置
        for j in range(i + 1, len(s)):
            if sb[j] == sortedArr[i]:
                swapIndex = j
        # 将原字符与排序后的字符交换
        sb[i] = sortedArr[i]
        sb[swapIndex] = tmp
        break

# 输出最小字符串
print(''.join(sb))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (s) => {
  // 对字符串进行排序
  const sortedArr = s.split('').sort();

  // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
  if (sortedArr.join('') === s) {
    console.log(s);
    rl.close();
    return;
  }

  // 遍历原字符串
  let sb = s.split('');
  for (let i = 0; i < s.length; i++) {
    // 如果当前字符与排序后的字符不相同，则进行交换
    if (s.charAt(i) !== sortedArr[i]) {
      const tmp = sb[i];
      let swapIndex = -1;
      // 找到排序后的字符在原字符串中的位置
      for (let j = i + 1; j < s.length; j++) {
        if (sb[j] === sortedArr[i]) {
          swapIndex = j;
        }
      }
      // 将原字符与排序后的字符交换
      sb[i] = sortedArr[i];
      sb[swapIndex] = tmp;
      break;
    }
  }

  // 输出最小字符串
  console.log(sb.join(''));
  rl.close();
});`,cpp:`#include <iostream>
#include <algorithm>
#include <string>

int main() {
    std::string s;
    std::cin >> s;

    // 对字符串进行排序
    std::string sortedArr = s;
    std::sort(sortedArr.begin(), sortedArr.end());

    // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
    if (sortedArr == s) {
        std::cout << s << std::endl;
        return 0;
    }

    // 遍历原字符串
    std::string sb = s;
    for (int i = 0; i < s.length(); i++) {
        // 如果当前字符与排序后的字符不相同，则进行交换
        if (s[i] != sortedArr[i]) {
            char tmp = sb[i];
            int swapIndex = -1;
            // 找到排序后的字符在原字符串中的位置
            for (int j = i + 1; j < s.length(); j++) {
                if (sb[j] == sortedArr[i]) {
                    swapIndex = j;
                }
            }
            // 将原字符与排序后的字符交换
            sb[i] = sortedArr[i];
            sb[swapIndex] = tmp;
            break;
        }
    }

    // 输出最小字符串
    std::cout << sb << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_STR_LEN 1000

// 定义比较函数，用于 qsort 函数
int cmp(const void *a, const void *b) {
    return *(char *)a - *(char *)b;
}

int main() {
    char s[MAX_STR_LEN], sortedArr[MAX_STR_LEN];
    scanf("%s", s);

    // 对字符串进行排序
    strcpy(sortedArr, s);
    qsort(sortedArr, strlen(sortedArr), sizeof(char), cmp);

    // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
    if (strcmp(sortedArr, s) == 0) {
        printf("%s\\n", s);
        return 0;
    }

    // 遍历原字符串
    for (int i = 0; i < strlen(s); i++) {
        // 如果当前字符与排序后的字符不相同，则进行交换
        if (s[i] != sortedArr[i]) {
            char tmp = s[i];
            int swapIndex = -1;
            // 找到排序后的字符在原字符串中的位置
            for (int j = i + 1; j < strlen(s); j++) {
                if (s[j] == sortedArr[i]) {
                    swapIndex = j;
                }
            }
            // 将原字符与排序后的字符交换
            s[i] = sortedArr[i];
            s[swapIndex] = tmp;
            break;
        }
    }

    // 输出最小字符串
    printf("%s\\n", s);

    return 0;
}`},p={id:"95",title:n,examType:"A",score:100,description:s,inputDesc:r,outputDesc:t,examples:i,solution:e,codes:o};export{o as codes,p as default,s as description,a as examType,i as examples,d as id,r as inputDesc,t as outputDesc,c as score,e as solution,n as title};
