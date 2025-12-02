const l="130",n="最长子字符串的长度",u="A",r=200,t="给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出’l’、‘o’、‘x’ 字符都恰好出现了偶数次最长子字符串的长度。",e=`输入是一串小写的字母组成的字符串s。
1 <= s.length <= 5 x 10^5
s 只包含小写英文字母。`,i=`输出是一个整数
输入
输出
说明：最长子字符串之一是 “alolob”，它包含 ‘l’，'o’各 2 个，以及 0 个 ‘x’ 。
输入
输出
说明
最长子字符串是 “oxdolxl”，由于是首尾连接在一起的，所以最后一个 ‘x’ 和开头的 'l’是连接在一起的，此字符串包含 2 个 ‘l’ ，2个 ‘o’ ，2个 ‘x’ 。
输入
输出
说明
字符串 “bcbcbc” 本身就是最长的，因为 ‘l’、‘o’、‘x’ 都出现了 0 次。`,o=[{input:"alolobo",output:"6",explanation:"最长子字符串'alolob'，包含l出现2次，o出现2次，x出现0次，都是偶数"},{input:"looxdolx",output:"7",explanation:"环形字符串，'oxdolxl'(最后x连接开头l)，l/o/x各出现2次"},{input:"bcbcbc",output:"6",explanation:"整个字符串都满足条件，l/o/x都出现0次（偶数）"}],s=`**解题思路：**

本题是一道**环形字符串+枚举**问题。

**核心思路：**
- 字符串首尾相连成环
- 枚举每个起点，统计l/o/x出现次数
- 次数都为偶数时更新最大长度

**算法步骤：**
1. 外层循环枚举起点i
2. 内层循环扩展子串，用(i+j)%n处理环形
3. 统计l/o/x计数，都为偶数时更新答案

**时间复杂度**：O(N²)`,c={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.next();

        // 调用findLongestSubstringLength方法计算并返回结果
        int result = findLongestSubstringLength(s);
        // 打印结果
        System.out.println(result);
    }

    // 定义一个私有静态方法，用于找出满足条件的最长子字符串的长度
    private static int findLongestSubstringLength(String s) {
        // 获取输入字符串的长度
        int n = s.length();
        // 初始化最长子字符串长度为0
        int maxLength = 0;

        // 外层循环，从字符串的每一个字符开始检查
        for (int i = 0; i < n; i++) {
            // 初始化'l'、'o'和'x'的计数器
            int countL = 0, countO = 0, countX = 0;

            // 内层循环，从当前字符开始，遍历整个字符串
            for (int j = 0; j < n; j++) {
                // 计算当前字符的索引，处理环形字符串的情况
                int index = (i + j) % n;
                // 获取当前字符
                char ch = s.charAt(index);

                // 根据当前字符增加相应字符的计数
                if (ch == 'l') countL++;
                else if (ch == 'o') countO++;
                else if (ch == 'x') countX++;

                // 如果'l'、'o'和'x'出现的次数都是偶数
                if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                    // 更新最长子字符串的长度
                    maxLength = Math.max(maxLength, j + 1);
                }
            }
        }

        // 返回最长子字符串的长度
        return maxLength;
    }
}`,python:`# 定义一个函数，用于找出满足条件的最长子字符串的长度
def find_longest_substring_length(s):
    # 获取输入字符串的长度
    n = len(s)
    # 初始化最长子字符串长度为 0
    max_length = 0

    # 外层循环，从字符串的每一个字符开始检查
    for i in range(n):
        # 初始化 'l'、'o' 和 'x' 的计数器
        count_l = 0
        count_o = 0
        count_x = 0

        # 内层循环，从当前字符开始，遍历整个字符串
        for j in range(n):
            # 计算当前字符的索引，处理环形字符串的情况
            index = (i + j) % n
            # 获取当前字符
            ch = s[index]

            # 根据当前字符增加相应字符的计数
            if ch == 'l':
                count_l += 1
            elif ch == 'o':
                count_o += 1
            elif ch == 'x':
                count_x += 1

            # 如果 'l'、'o' 和 'x' 出现的次数都是偶数
            if count_l % 2 == 0 and count_o % 2 == 0 and count_x % 2 == 0:
                # 更新最长子字符串的长度
                max_length = max(max_length, j + 1)

    # 返回最长子字符串的长度
    return max_length

# 主函数
if __name__ == '__main__':
    # 从标准输入读取字符串
    s = input()
    # 调用 find_longest_substring_length 函数计算并返回结果
    result = find_longest_substring_length(s)
    # 打印结果
    print(result)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (s) => {
  const n = s.length;
  let maxLength = 0;

  for (let i = 0; i < n; i++) {
    let countL = 0, countO = 0, countX = 0;

    for (let j = 0; j < n; j++) {
      const index = (i + j) % n;
      const ch = s[index];

      if (ch === 'l') countL++;
      else if (ch === 'o') countO++;
      else if (ch === 'x') countX++;

      if (countL % 2 === 0 && countO % 2 === 0 && countX % 2 === 0) {
        maxLength = Math.max(maxLength, j + 1);
      }
    }
  }

  console.log(maxLength);
  rl.close();
});`,cpp:`#include <iostream>
#include <string>
#include <algorithm> // 用于std::max函数



// 定义一个函数，用于找出满足条件的最长子字符串的长度
int findLongestSubstringLength(const std::string &s) {
    // 获取输入字符串的长度
    int n = s.length();
    // 初始化最长子字符串长度为0
    int maxLength = 0;

    // 外层循环，从字符串的每一个字符开始检查
    for (int i = 0; i < n; i++) {
        // 初始化'l'、'o'和'x'的计数器
        int countL = 0, countO = 0, countX = 0;

        // 内层循环，从当前字符开始，遍历整个字符串
        for (int j = 0; j < n; j++) {
            // 计算当前字符的索引，处理环形字符串的情况
            int index = (i + j) % n;
            // 获取当前字符
            char ch = s[index];

            // 根据当前字符增加相应字符的计数
            if (ch == 'l') countL++;
            else if (ch == 'o') countO++;
            else if (ch == 'x') countX++;

            // 如果'l'、'o'和'x'出现的次数都是偶数
            if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                // 更新最长子字符串的长度
                maxLength = std::max(maxLength, j + 1);
            }
        }
    }

    // 返回最长子字符串的长度
    return maxLength;
}

// 主函数
int main() {
    std::string s;
    // 从标准输入读取字符串
    std::cin >> s;

    // 调用findLongestSubstringLength函数计算并返回结果
    int result = findLongestSubstringLength(s);
    // 打印结果
    std::cout << result << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h> // 用于strlen函数

// 定义一个函数，用于找出满足条件的最长子字符串的长度
int findLongestSubstringLength(const char *s) {
    // 获取输入字符串的长度
    int n = strlen(s);
    // 初始化最长子字符串长度为0
    int maxLength = 0;

    // 外层循环，从字符串的每一个字符开始检查
    for (int i = 0; i < n; i++) {
        // 初始化'l'、'o'和'x'的计数器
        int countL = 0, countO = 0, countX = 0;

        // 内层循环，从当前字符开始，遍历整个字符串
        for (int j = 0; j < n; j++) {
            // 计算当前字符的索引，处理环形字符串的情况
            int index = (i + j) % n;
            // 获取当前字符
            char ch = s[index];

            // 根据当前字符增加相应字符的计数
            if (ch == 'l') countL++;
            else if (ch == 'o') countO++;
            else if (ch == 'x') countX++;

            // 如果'l'、'o'和'x'出现的次数都是偶数
            if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                // 更新最长子字符串的长度
                int currentLength = j + 1;
                maxLength = (maxLength > currentLength) ? maxLength : currentLength;
            }
        }
    }

    // 返回最长子字符串的长度
    return maxLength;
}

// 主函数
int main() {
    char s[1001]; // 假设字符串长度不超过1000
    // 从标准输入读取字符串
    scanf("%s", s);

    // 调用findLongestSubstringLength函数计算并返回结果
    int result = findLongestSubstringLength(s);
    // 打印结果
    printf("%d\\n", result);

    return 0;
}`},a={id:"130",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:i,examples:o,solution:s,codes:c};export{c as codes,a as default,t as description,u as examType,o as examples,l as id,e as inputDesc,i as outputDesc,r as score,s as solution,n as title};
