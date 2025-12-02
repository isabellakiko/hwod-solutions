const r="20",n="恢复数字序列",o="A",u=100,t=`对于一个连续正整数组成的序列，可以将其拼接成一个字符串，再将字符串里的部分字符打乱顺序。如序列8 9 10 11 12，拼接成的字符串为89101112，打乱一部分字符后得到90811211，原来的正整数10就被拆成了0和1。
现给定一个按如上规则得到的打乱字符的字符串，请将其还原成连续正整数序列，并输出序列中最小的数字。`,i="输入一行，为打乱字符的字符串和正整数序列的长度，两者间用空格分隔，字符串长度不超过200，正整数不超过1000，保证输入可以还原成唯一序列。",e="输出一个数字，为序列中最小的数字。",s=[{input:"19801211 5",output:"8",explanation:`原序列为 8,9,10,11,12，拼接后为 89101112。
打乱后得到 19801211（字符相同，只是顺序打乱）。
序列长度为5，最小数字是8。`},{input:"432111111111 4",output:"111",explanation:`原序列为 111,112,113,114，拼接后为 111112113114。
打乱后得到 432111111111。
序列长度为4，最小数字是111。`}],c=`**解题思路：**

本题是一道**枚举 + 字符频次匹配**问题。

**核心思想：**
- 原序列是连续的K个正整数
- 打乱后字符的频次不变
- 枚举起始数字i，检查 [i, i+K-1] 这K个数的字符频次是否与输入匹配

**算法步骤：**

1. 统计输入字符串中每个字符的出现次数，存入 base
2. 从 i=1 开始枚举起始数字
3. 对于每个 i，计算序列 [i, i+K-1] 拼接后的字符频次 count
4. 比较 count 和 base，若完全一致，则 i 就是答案
5. 若不一致，i++ 继续尝试

**时间复杂度**：O(1000 * K * log(i+K))，最多枚举1000个起始点`,a={java:`import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建一个Scanner对象，用于读取输入
        Scanner sc = new Scanner(System.in);

        // 读取输入的打乱字符的字符串
        String s = sc.next();
        // 读取输入的正整数序列的长度
        int k = sc.nextInt();

        // 创建一个HashMap，用于统计打乱字符的字符串中各字符的数量
        HashMap<Character, Integer> base = new HashMap<>();
        // 遍历打乱字符的字符串
        for (int i = 0; i < s.length(); i++) {
            // 获取字符串中的字符
            char c = s.charAt(i);
            // 将字符及其数量存入HashMap
            base.put(c, base.getOrDefault(c, 0) + 1);
        }

        // 初始化滑动窗口的起始位置
        int i = 1;
        // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
        while (i <= 1000 - k + 1) {
            // 创建一个HashMap，用于计算滑动窗口内各字符的数量
            HashMap<Character, Integer> count = new HashMap<>();
            // 遍历滑动窗口内的正整数
            for (int j = i; j < i + k; j++) {
                // 将正整数转换为字符串
                String num = String.valueOf(j);
                // 遍历正整数字符串中的字符
                for (int m = 0; m < num.length(); m++) {
                    // 获取正整数字符串中的字符
                    char c = num.charAt(m);
                    // 将字符及其数量存入HashMap
                    count.put(c, count.getOrDefault(c, 0) + 1);
                }
            }

            // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
            boolean isMatch = true;
            // 遍历打乱字符的字符串中的字符
            for (Character c : base.keySet()) {
                // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
                if (!count.containsKey(c) || count.get(c) - base.get(c) != 0) {
                    isMatch = false;
                    break;
                }
            }

            // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
            if (isMatch) {
                System.out.println(i);
                return;
            }

            // 更新滑动窗口的起始位置
            i++;
        }
    }
}`,python:`import sys
from collections import defaultdict

# 读取输入的打乱字符的字符串和正整数序列的长度
s, k = input().strip().split()
k = int(k)

# 创建一个字典，用于统计打乱字符的字符串中各字符的数量
base = defaultdict(int)
for c in s:
    base[c] += 1

# 初始化滑动窗口的起始位置
i = 1
# 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
while i <= 1000 - k + 1:
    # 创建一个字典，用于计算滑动窗口内各字符的数量
    count = defaultdict(int)
    # 遍历滑动窗口内的正整数
    for j in range(i, i + k):
        # 将正整数转换为字符串
        num = str(j)
        # 遍历正整数字符串中的字符
        for c in num:
            # 将字符及其数量存入字典
            count[c] += 1

    # 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
    is_match = True
    # 遍历打乱字符的字符串中的字符
    for c in base:
        # 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将is_match设为False并跳出循环
        if count[c] != base[c]:
            is_match = False
            break

    # 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并退出循环
    if is_match:
        print(i)
        break

    # 更新滑动窗口的起始位置
    i += 1`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  // 输入打乱字符的字符串和正整数序列的长度
  const s = input.split(' ')[0];
  const k = parseInt(input.split(' ')[1]);

  // 创建一个Map，用于统计打乱字符的字符串中各字符的数量
  const base = new Map();
  for (const c of s) {
    base.set(c, (base.get(c) || 0) + 1);
  }

  // 初始化滑动窗口的起始位置
  let i = 1;
  // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
  while (i <= 1000 - k + 1) {
    // 创建一个Map，用于计算滑动窗口内各字符的数量
    const count = new Map();
    // 遍历滑动窗口内的正整数
    for (let j = i; j < i + k; j++) {
      // 将正整数转换为字符串
      const num = String(j);
      // 遍历正整数字符串中的字符
      for (const c of num) {
        // 将字符及其数量存入Map
        count.set(c, (count.get(c) || 0) + 1);
      }
    }

    // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
    let isMatch = true;
    // 遍历打乱字符的字符串中的字符
    for (const c of base.keys()) {
      // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
      if (!count.has(c) || count.get(c) - base.get(c) !== 0) {
        isMatch = false;
        break;
      }
    }

    // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
    if (isMatch) {
      console.log(i);
      return;
    }

    // 更新滑动窗口的起始位置
    i++;
  }
});`,cpp:`#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    // 创建一个字符串变量，用于读取输入的打乱字符的字符串
    std::string s;
    // 创建一个整数变量，用于读取输入的正整数序列的长度
    int k;

    // 读取输入
    std::cin >> s >> k;

    // 创建一个unordered_map，用于统计打乱字符的字符串中各字符的数量
    std::unordered_map<char, int> base;
    // 遍历打乱字符的字符串
    for (char c : s) {
        // 将字符及其数量存入unordered_map
        base[c]++;
    }

    // 初始化滑动窗口的起始位置
    int i = 1;
    // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
    while (i <= 1000 - k + 1) {
        // 创建一个unordered_map，用于计算滑动窗口内各字符的数量
        std::unordered_map<char, int> count;
        // 遍历滑动窗口内的正整数
        for (int j = i; j < i + k; j++) {
            // 将正整数转换为字符串
            std::string num = std::to_string(j);
            // 遍历正整数字符串中的字符
            for (char c : num) {
                // 将字符及其数量存入unordered_map
                count[c]++;
            }
        }

        // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
        bool isMatch = true;
        // 遍历打乱字符的字符串中的字符
        for (const auto& p : base) {
            char c = p.first;
            // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
            if (count[c] != base[c]) {
                isMatch = false;
                break;
            }
        }

        // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
        if (isMatch) {
            std::cout << i << std::endl;
            return 0;
        }

        // 更新滑动窗口的起始位置
        i++;
    }

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char s[201]; // 输入的打乱字符的字符串，长度不超过200
    int k;       // 正整数序列的长度

    // 读取输入
    scanf("%s %d", s, &k);

    int base[10] = {0}; // 用于统计打乱字符的字符串中各数字字符的数量

    // 遍历打乱字符的字符串，统计各字符的数量
    for (int i = 0; i < strlen(s); i++) {
        base[s[i] - '0']++; // 将字符数字转为整型进行统计
    }

    // 初始化滑动窗口的起始位置
    int i = 1;
    
    // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
    while (i <= 1000 - k + 1) {
        int count[10] = {0}; // 用于计算滑动窗口内各字符的数量

        // 遍历滑动窗口内的正整数
        for (int j = i; j < i + k; j++) {
            char num[6];
            sprintf(num, "%d", j); // 将正整数转换为字符串
            
            // 遍历正整数字符串中的字符，统计各字符数量
            for (int x = 0; x < strlen(num); x++) {
                count[num[x] - '0']++; // 将字符数字转为整型进行统计
            }
        }

        // 判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
        bool isMatch = true;
        for (int c = 0; c < 10; c++) {
            if (count[c] != base[c]) {
                isMatch = false;
                break;
            }
        }

        // 如果滑动窗口内各字符数量一致，输出滑动窗口的起始位置并退出程序
        if (isMatch) {
            printf("%d\\n", i);
            return 0;
        }

        // 更新滑动窗口的起始位置
        i++;
    }

    return 0;
}`},p={id:"20",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:e,examples:s,solution:c,codes:a};export{a as codes,p as default,t as description,o as examType,s as examples,r as id,i as inputDesc,e as outputDesc,u as score,c as solution,n as title};
