const c="122",n="寻找符合要求的最长子串",x="A",s=200,e=`给定一个字符串s，找出这样一个子串：
该子串中任意一个字符最多出现2次该子串不包含指定某个字符
请你找出满足该条件的最长子串的长度`,t=`第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]
第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]`,r=`第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]
第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]`,a=[{input:`D
ABC123`,output:"6",explanation:"整个字符串不含D，且每个字符最多出现1次，满足条件"},{input:`D
ABACA123D`,output:"7",explanation:"最长子串为ACA123（或ABACA12），长度7，不含D且每字符最多2次"}],h=`**解题思路：**

本题是一道**滑动窗口**问题。

**核心思路：**
- 维护窗口内每个字符出现次数≤2
- 遇到排除字符时重置窗口
- 记录最大窗口长度

**算法步骤：**
1. 右指针扩展窗口
2. 遇到排除字符：更新答案，左指针跳过
3. 字符出现>2次：左指针收缩至该字符首次出现位置+1
4. 记录窗口下标，取余更新

**时间复杂度**：O(N)`,i={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 输入exclude和s
        String exclude = scanner.next();
        String s = scanner.next();

        // 获取要排除的字符
        char excludeChar = exclude.charAt(0);

        // 存储每个字符出现的下标
        Map<Character, List<Integer>> charIndexMap = new HashMap<>();

        // 定义左右指针
        int left = 0, right = 0;

        // 定义最长子串长度
        int maxLength = 0;

        // 遍历字符串
        while (right < s.length()) {
            char currentChar = s.charAt(right);

            // 如果当前字符是要排除的字符
            if (excludeChar == currentChar) {
                // 如果左右指针不在同一位置，说明存在符合条件的子串
                if (right > left) {
                    maxLength = Math.max(maxLength, right - left);
                }
                // 将左右指针都移动到下一个位置
                right++;
                left = right;
            } else {
                // 如果当前字符不是要排除的字符
                // 先将当前字符在map中初始化
                charIndexMap.computeIfAbsent(currentChar, k -> new ArrayList<>());
                List<Integer> charIndexes = charIndexMap.get(currentChar);
                // 如果当前字符的出现次数已经超过2次
                if (charIndexes.size() == 2) {
                    // 更新最长子串长度
                    maxLength = Math.max(maxLength, right - left);
                    // 将左指针移动到当前字符上一次出现的位置的下一个位置
                    left = charIndexes.get(0) + 1;
                    // 删除当前字符在map中的第一个下标
                    charIndexes.remove(0);
                }
                // 将当前字符的下标加入map中
                charIndexes.add(right);
                // 右指针向后移动
                right++;
            }
        }

        // 检查最后一个子串是否符合条件
        maxLength = Math.max(maxLength, right - left);

        // 输出最长子串长度
        System.out.println(maxLength);
    }
}`,python:`from collections import defaultdict

# 输入exclude和s
exclude = input()
s = input()
# 获取要排除的字符
excludeChar = exclude[0]

# 存储每个字符出现的下标
charIndexMap = defaultdict(list)

# 定义左右指针
left = 0
right = 0

# 定义最长子串长度
maxLength = 0

# 遍历字符串
while right < len(s):
    currentChar = s[right]

    # 如果当前字符是要排除的字符
    if excludeChar == currentChar:
        # 如果左右指针不在同一位置，说明存在符合条件的子串
        if right > left:
            maxLength = max(maxLength, right - left)
        # 将左右指针都移动到下一个位置
        right += 1
        left = right
    else:
        # 如果当前字符不是要排除的字符
        # 先将当前字符在map中初始化
        charIndexMap[currentChar]
        charIndexes = charIndexMap[currentChar]
        # 如果当前字符的出现次数已经超过2次
        if len(charIndexes) == 2:
            # 更新最长子串长度
            maxLength = max(maxLength, right - left)
            # 将左指针移动到当前字符上一次出现的位置的下一个位置
            left = charIndexes[0] + 1
            # 删除当前字符在map中的第一个下标
            charIndexes.pop(0)
        # 将当前字符的下标加入map中
        charIndexes.append(right)
        # 右指针向后移动
        right += 1

# 检查最后一个子串是否符合条件
maxLength = max(maxLength, right - left)

# 输出最长子串长度
print(maxLength)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let exclude = '';
let s = '';

rl.on('line', (input) => {
  if (!exclude) {
    exclude = input;
  } else {
    s = input;

    // 获取要排除的字符
    const excludeChar = exclude[0];

    // 存储每个字符出现的下标
    const charIndexMap = {};

    // 定义左右指针
    let left = 0;
    let right = 0;

    // 定义最长子串长度
    let maxLength = 0;

    // 遍历字符串
    while (right < s.length) {
      const currentChar = s[right];

      // 如果当前字符是要排除的字符
      if (excludeChar === currentChar) {
        // 如果左右指针不在同一位置，说明存在符合条件的子串
        if (right > left) {
          maxLength = Math.max(maxLength, right - left);
        }
        // 将左右指针都移动到下一个位置
        right++;
        left = right;
      } else {
        // 如果当前字符不是要排除的字符
        // 先将当前字符在map中初始化
        charIndexMap[currentChar] = charIndexMap[currentChar] || [];
        const charIndexes = charIndexMap[currentChar];
        // 如果当前字符的出现次数已经超过2次
        if (charIndexes.length === 2) {
          // 更新最长子串长度
          maxLength = Math.max(maxLength, right - left);
          // 将左指针移动到当前字符上一次出现的位置的下一个位置
          left = charIndexes[0] + 1;
          // 删除当前字符在map中的第一个下标
          charIndexes.shift();
        }
        // 将当前字符的下标加入map中
        charIndexes.push(right);
        // 右指针向后移动
        right++;
      }
    }

    // 检查最后一个子串是否符合条件
    maxLength = Math.max(maxLength, right - left);

    // 输出最长子串长度
    console.log(maxLength);

    rl.close();
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    // 输入exclude和s
    string exclude, s;
    cin >> exclude >> s;
    // 获取要排除的字符
    char excludeChar = exclude[0];

    // 存储每个字符出现的下标
    unordered_map<char, vector<int>> charIndexMap;

    // 定义左右指针
    int left = 0, right = 0;

    // 定义最长子串长度
    int maxLength = 0;

    // 遍历字符串
    while (right < s.length()) {
        char currentChar = s[right];

        // 如果当前字符是要排除的字符
        if (excludeChar == currentChar) {
            // 如果左右指针不在同一位置，说明存在符合条件的子串
            if (right > left) {
                maxLength = max(maxLength, right - left);
            }
            // 将左右指针都移动到下一个位置
            right++;
            left = right;
        } else {
            // 如果当前字符不是要排除的字符
            // 先将当前字符在map中初始化
            charIndexMap[currentChar];
            vector<int>& charIndexes = charIndexMap[currentChar];
            // 如果当前字符的出现次数已经超过2次
            if (charIndexes.size() == 2) {
                // 更新最长子串长度
                maxLength = max(maxLength, right - left);
                // 将左指针移动到当前字符上一次出现的位置的下一个位置
                left = charIndexes[0] + 1;
                // 删除当前字符在map中的第一个下标
                charIndexes.erase(charIndexes.begin());
            }
            // 将当前字符的下标加入map中
            charIndexes.push_back(right);
            // 右指针向后移动
            right++;
        }
    }

    // 检查最后一个子串是否符合条件
    maxLength = max(maxLength, right - left);

    // 输出最长子串长度
    cout << maxLength << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 10000

// 用于存储每个字符的出现下标
int charIndexMap[128][3];

int main() {
    char excludeChar;
    char s[MAX_LENGTH + 1];

    // 读取排除字符和字符串
    scanf("%c", &excludeChar);
    scanf("%s", s);

    // 初始化存储字符下标的数组
    for (int i = 0; i < 128; i++) {
        charIndexMap[i][0] = charIndexMap[i][1] = -1;
    }

    int left = 0, right = 0;
    int maxLength = 0;
    int length = strlen(s);

    // 遍历字符串
    while (right < length) {
        char currentChar = s[right];

        // 如果当前字符是要排除的字符
        if (currentChar == excludeChar) {
            if (right > left) {
                maxLength = right - left > maxLength ? right - left : maxLength;
            }
            right++;
            left = right;
        } else {
            // 如果当前字符不是要排除的字符
            int* charIndexes = charIndexMap[currentChar];

            // 如果当前字符的出现次数已经超过2次
            if (charIndexes[1] != -1) {
                maxLength = right - left > maxLength ? right - left : maxLength;
                left = charIndexes[0] + 1;
                charIndexes[0] = charIndexes[1];
                charIndexes[1] = -1;
            }

            // 将当前字符的下标加入到数组中
            if (charIndexes[0] == -1) {
                charIndexes[0] = right;
            } else {
                charIndexes[1] = right;
            }

            // 右指针向后移动
            right++;
        }
    }

    // 检查最后一个子串是否符合条件
    maxLength = right - left > maxLength ? right - left : maxLength;

    // 输出最长子串长度
    printf("%d\\n", maxLength);

    return 0;
}`},g={id:"122",title:n,examType:"A",score:200,description:e,inputDesc:t,outputDesc:r,examples:a,solution:h,codes:i};export{i as codes,g as default,e as description,x as examType,a as examples,c as id,t as inputDesc,r as outputDesc,s as score,h as solution,n as title};
