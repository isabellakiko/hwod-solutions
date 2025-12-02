const o="103",n="最左侧冗余覆盖子串",h="A",c=100,t=`给定两个字符串s1和s2和正整数K，其中s1长度为n1，s2长度为n2，在s2中选一个子串，满足:
该子串长度为n1+k该子串中包含s1中全部字母，该子串每个字母出现次数不小于s1中对应的字母，
我们称s2以长度k冗余覆盖s1，给定s1，s2，k，求最左侧的s2以长度k冗余覆盖s1的子串的首个元素的下标，如果没有返回**-1**。`,s=`输入三行，第一行为s1，第二行为s2，第三行为k，s1和s2只包含小写字母
0 ≤ len(s1) ≤ 10000000 ≤ len(s2) ≤ 200000000 ≤ k ≤ 1000`,r="最左侧的s2以长度k冗余覆盖s1的子串首个元素下标，如果没有返回-1",i=[{input:`ab
aabcd
1`,output:"0",explanation:"子串长度=2+1=3，aab和abc都符合条件，aab在左侧，返回下标0"},{input:`abc
dfs
10`,output:"-1",explanation:"s2长度不足n1+k=13，无法覆盖s1，返回-1"}],e=`**解题思路：**

本题是一道**滑动窗口**问题。

**核心思路：**
- 窗口大小固定为 n1 + k
- 窗口内字符频次需覆盖s1的所有字符
- 找最左侧满足条件的窗口起始位置

**算法步骤：**
1. 统计s1中每个字符的出现次数
2. 维护固定大小为n1+k的滑动窗口
3. 窗口内字符计数，判断是否覆盖s1
4. 返回第一个满足条件的左边界

**时间复杂度**：O(N)`,a={java:`import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s1 = scanner.nextLine();
        String s2 = scanner.nextLine();
        int k = Integer.parseInt(scanner.nextLine().trim());

        // 调用查找函数并输出结果
        System.out.println(findRedundantCover(s1, s2, k));
    }

    /**
     * 查找满足条件的子串起始位置
     * @param s1 字符串 s1
     * @param s2 字符串 s2
     * @param k  冗余长度 k
     * @return 返回满足条件的子串的最左侧起始位置，如果没有返回 -1
     */
    public static int findRedundantCover(String s1, String s2, int k) {
        // 计算 s1 中每个字符的出现次数
        int[] s1Count = new int[26];
        for (char c : s1.toCharArray()) {
            s1Count[c - 'a']++;
        }

        // 初始化滑动窗口的左右边界、剩余需要匹配的 s1 字符数和窗口内字符计数数组
        int left = 0, right = 0;
        int s1CharsLeft = s1.length();
        int[] windowCount = new int[26];

        // 遍历 s2 字符串
        while (right < s2.length()) {
            // 将右边界字符加入窗口计数
            char rightChar = s2.charAt(right);
            windowCount[rightChar - 'a']++;

            // 如果窗口中的字符在 s1 中出现过，减少剩余需要匹配的字符数
            if (windowCount[rightChar - 'a'] <= s1Count[rightChar - 'a']) {
                s1CharsLeft--;
            }

            // 如果窗口长度大于 s1 长度 + k，需要移动左边界
            if (right - left + 1 > s1.length() + k) {
                char leftChar = s2.charAt(left);
                // 如果左边界字符在 s1 中出现过，增加剩余需要匹配的字符数
                if (windowCount[leftChar - 'a'] <= s1Count[leftChar - 'a']) {
                    s1CharsLeft++;
                }
                // 将左边界字符从窗口计数中移除
                windowCount[leftChar - 'a']--;
                left++;
            }

            // 如果剩余需要匹配的字符数为0，返回满足条件的子串起始位置
            if (s1CharsLeft == 0) {
                return left;
            }

            // 移动右边界
            right++;
        }

        // 如果遍历完 s2 仍未找到满足条件的子串，返回 -1
        return -1;
    }
}`,python:`def find_redundant_cover(s1, s2, k):
    """
    查找满足条件的子串起始位置
    :param s1: 字符串 s1
    :param s2: 字符串 s2
    :param k: 冗余长度 k
    :return: 返回满足条件的子串的最左侧起始位置，如果没有返回 -1
    """
    # 计算 s1 中每个字符的出现次数
    s1_count = [0] * 26  # 创建一个长度为26的数组，用于记录每个字母的出现次数
    for c in s1:
        s1_count[ord(c) - ord('a')] += 1  # 通过字符的ASCII码计算其在数组中的位置并递增计数

    # 初始化滑动窗口的左右边界、剩余需要匹配的 s1 字符数和窗口内字符计数数组
    left, right = 0, 0  # 滑动窗口的左右边界初始都为0
    s1_chars_left = len(s1)  # 剩余需要匹配的字符数为 s1 的长度
    window_count = [0] * 26  # 初始化滑动窗口中每个字母的出现次数数组

    # 开始遍历 s2 字符串
    while right < len(s2):
        # 将右边界字符加入窗口计数
        right_char = s2[right]  # 获取当前右边界字符
        window_count[ord(right_char) - ord('a')] += 1  # 增加该字符在窗口中的计数

        # 如果该字符在 s1 中存在且匹配的数量不超过 s1 中的数量，减少剩余需要匹配的字符数
        if window_count[ord(right_char) - ord('a')] <= s1_count[ord(right_char) - ord('a')]:
            s1_chars_left -= 1

        # 如果窗口的长度大于 s1 长度 + k，移动左边界
        if right - left + 1 > len(s1) + k:
            left_char = s2[left]  # 获取当前左边界字符
            # 如果左边界字符在 s1 中存在且数量不超过 s1 中的数量，增加剩余需要匹配的字符数
            if window_count[ord(left_char) - ord('a')] <= s1_count[ord(left_char) - ord('a')]:
                s1_chars_left += 1
            # 将左边界字符从窗口计数中移除
            window_count[ord(left_char) - ord('a')] -= 1
            left += 1  # 左边界右移

        # 如果剩余需要匹配的字符数为0，返回满足条件的子串起始位置
        if s1_chars_left == 0:
            return left

        # 移动右边界
        right += 1

    # 如果遍历完 s2 仍未找到满足条件的子串，返回 -1
    return -1

   
s1 = input()   # 读取字符串 s1
s2 = input()   # 读取字符串 s2
k = int(input().strip())  # 读取并将字符串转换为整数的 k

# 调用查找函数并输出结果
print(find_redundant_cover(s1, s2, k))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let s1, s2, k;
rl.on('line', (input) => {
  if (!s1) {
    s1 = input.trim();
  } else if (!s2) {
    s2 = input.trim();
  } else {
    k = parseInt(input.trim());
    console.log(findRedundantCover(s1, s2, k));
    rl.close();
  }
});

/**
 * 查找满足条件的子串起始位置
 * @param {string} s1
 * @param {string} s2
 * @param {number} k
 * @returns {number}
 */
function findRedundantCover(s1, s2, k) {
  // 计算s1中每个字符的出现次数
  const s1Count = new Array(26).fill(0);
  for (const c of s1) {
    s1Count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  // 初始化滑动窗口的左右边界、剩余需要匹配的s1字符数和窗口内字符计数数组
  let left = 0, right = 0, s1CharsLeft = s1.length;
  const windowCount = new Array(26).fill(0);

  // 遍历s2字符串
  while (right < s2.length) {
    // 将右边界字符加入窗口计数
    const rightChar = s2.charAt(right);
    windowCount[rightChar.charCodeAt(0) - 'a'.charCodeAt(0)]++;

    // 如果窗口中的字符在s1中出现过，减少剩余需要匹配的字符数
    if (windowCount[rightChar.charCodeAt(0) - 'a'.charCodeAt(0)] <= s1Count[rightChar.charCodeAt(0) - 'a'.charCodeAt(0)]) {
      s1CharsLeft--;
    }

    // 如果窗口长度大于s1长度+k，需要移动左边界
    if (right - left + 1 > s1.length + k) {
      const leftChar = s2.charAt(left);
      // 如果左边界字符在s1中出现过，增加剩余需要匹配的字符数
      if (windowCount[leftChar.charCodeAt(0) - 'a'.charCodeAt(0)] <= s1Count[leftChar.charCodeAt(0) - 'a'.charCodeAt(0)]) {
        s1CharsLeft++;
      }
      // 将左边界字符从窗口计数中移除
      windowCount[leftChar.charCodeAt(0) - 'a'.charCodeAt(0)]--;
      left++;
    }

    // 如果剩余需要匹配的字符数为0，返回满足条件的子串起始位置
    if (s1CharsLeft === 0) {
      return left;
    }

    // 移动右边界
    right++;
  }

  // 如果遍历完s2仍未找到满足条件的子串，返回-1
  return -1;
}`,cpp:`#include <iostream>
#include <string>
#include <vector>

using namespace std;

int findRedundantCover(const string &s1, const string &s2, int k);

int main() {
    
    string s1, s2;
    getline(cin, s1);  // 读取整行字符串 s1
    getline(cin, s2);  // 读取整行字符串 s2
    int k;
    cin >> k;  // 读取整数 k

    // 调用查找函数并输出结果
    cout << findRedundantCover(s1, s2, k) << endl;

    return 0;
}

int findRedundantCover(const string &s1, const string &s2, int k) {
    // 计算 s1 中每个字符的出现次数
    vector<int> s1Count(26, 0);  // 创建一个长度为26的数组，用于记录每个字母的出现次数
    for (char c : s1) {
        s1Count[c - 'a']++;  // 计算每个字符在 s1 中的出现次数
    }

    // 初始化滑动窗口的左右边界、剩余需要匹配的 s1 字符数和窗口内字符计数数组
    int left = 0, right = 0;
    int s1CharsLeft = s1.length();  // 剩余需要匹配的字符数
    vector<int> windowCount(26, 0);  // 初始化滑动窗口中每个字母的出现次数数组

    // 遍历 s2 字符串
    while (right < s2.length()) {
        // 将右边界字符加入窗口计数
        char rightChar = s2[right];
        windowCount[rightChar - 'a']++;

        // 如果该字符在 s1 中存在且匹配的数量不超过 s1 中的数量，减少剩余需要匹配的字符数
        if (windowCount[rightChar - 'a'] <= s1Count[rightChar - 'a']) {
            s1CharsLeft--;
        }

        // 如果窗口的长度大于 s1 长度 + k，移动左边界
        if (right - left + 1 > s1.length() + k) {
            char leftChar = s2[left];
            // 如果左边界字符在 s1 中存在且数量不超过 s1 中的数量，增加剩余需要匹配的字符数
            if (windowCount[leftChar - 'a'] <= s1Count[leftChar - 'a']) {
                s1CharsLeft++;
            }
            // 将左边界字符从窗口计数中移除
            windowCount[leftChar - 'a']--;
            left++;
        }

        // 如果剩余需要匹配的字符数为0，返回满足条件的子串起始位置
        if (s1CharsLeft == 0) {
            return left;
        }

        // 移动右边界
        right++;
    }

    // 如果遍历完 s2 仍未找到满足条件的子串，返回 -1
    return -1;
}`,c:`#include <stdio.h>
#include <string.h>

int findRedundantCover(const char *s1, const char *s2, int k);

int main() {
     
    char s1[1000], s2[1000];
    fgets(s1, 1000, stdin);  // 读取整行字符串 s1
    fgets(s2, 1000, stdin);  // 读取整行字符串 s2
    int k;
    scanf("%d", &k);  // 读取整数 k

    // 去除换行符
    s1[strcspn(s1, "\\n")] = '\\0';
    s2[strcspn(s2, "\\n")] = '\\0';

    // 调用查找函数并输出结果
    printf("%d\\n", findRedundantCover(s1, s2, k));

    return 0;
}

int findRedundantCover(const char *s1, const char *s2, int k) {
    // 计算 s1 中每个字符的出现次数
    int s1Count[26] = {0};  // 创建一个长度为26的数组，用于记录每个字母的出现次数
    for (int i = 0; s1[i] != '\\0'; i++) {
        s1Count[s1[i] - 'a']++;  // 计算每个字符在 s1 中的出现次数
    }

    // 初始化滑动窗口的左右边界、剩余需要匹配的 s1 字符数和窗口内字符计数数组
    int left = 0, right = 0;
    int s1CharsLeft = strlen(s1);  // 剩余需要匹配的字符数
    int windowCount[26] = {0};  // 初始化滑动窗口中每个字母的出现次数数组

    // 遍历 s2 字符串
    while (s2[right] != '\\0') {
        // 将右边界字符加入窗口计数
        char rightChar = s2[right];
        windowCount[rightChar - 'a']++;

        // 如果该字符在 s1 中存在且匹配的数量不超过 s1 中的数量，减少剩余需要匹配的字符数
        if (windowCount[rightChar - 'a'] <= s1Count[rightChar - 'a']) {
            s1CharsLeft--;
        }

        // 如果窗口的长度大于 s1 长度 + k，移动左边界
        if (right - left + 1 > strlen(s1) + k) {
            char leftChar = s2[left];
            // 如果左边界字符在 s1 中存在且数量不超过 s1 中的数量，增加剩余需要匹配的字符数
            if (windowCount[leftChar - 'a'] <= s1Count[leftChar - 'a']) {
                s1CharsLeft++;
            }
            // 将左边界字符从窗口计数中移除
            windowCount[leftChar - 'a']--;
            left++;
        }

        // 如果剩余需要匹配的字符数为0，返回满足条件的子串起始位置
        if (s1CharsLeft == 0) {
            return left;
        }

        // 移动右边界
        right++;
    }

    // 如果遍历完 s2 仍未找到满足条件的子串，返回 -1
    return -1;
}`},f={id:"103",title:n,examType:"A",score:100,description:t,inputDesc:s,outputDesc:r,examples:i,solution:e,codes:a};export{a as codes,f as default,t as description,h as examType,i as examples,o as id,s as inputDesc,r as outputDesc,c as score,e as solution,n as title};
