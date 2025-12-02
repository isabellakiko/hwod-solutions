const l="70",n="完美走位",u="A",s=100,t=`在第一人称射击游戏中，玩家通过键盘的A、S、D、W四个按键控制游戏人物分别向左、向后、向右、向前进行移动，从而完成走位。
假设玩家每按动一次键盘，游戏任务会向某个方向移动一步，如果玩家在操作一定次数的键盘并且各个方向的步数相同时，此时游戏任务必定会回到原点，则称此次走位为完美走位。
现给定玩家的走位（例如：ASDA），请通过更换其中一段连续走位的方式使得原走位能够变成一个完美走位。其中待更换的连续走位可以是相同长度的任何走位。
请返回待更换的连续走位的最小可能长度。
如果原走位本身是一个完美走位，则返回0。
`,i=`输入为由键盘字母表示的走位s，例如：ASDA
`,e="输出为待更换的连续走位的最小可能长度。",c=[{input:"WASD",output:"0",explanation:"W、A、S、D各1个，已经平衡，无需替换。"},{input:"WWWWAAAASSSS",output:"6",explanation:"需要各3个，W、A、S各超1个。最短替换子串是WAAAAS（6个字符）替换为DDD。"},{input:"WWAA",output:"2",explanation:"需要各1个，W和A各超1个。替换WA为SD即可，最短长度2。"}],o=`**解题思路：**

本题是一道**滑动窗口**问题，类似最小覆盖子串。

**算法步骤：**
1. 统计W、A、S、D各字母数量
2. 计算平衡状态每个字母应有的数量avg=len/4
3. 统计超出avg的字母及超出数量
4. 用滑动窗口找包含所有超出字母的最短子串

**时间复杂度**：O(N)`,a={java:`import java.util.HashMap;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.next()));
  }

  public static int getResult(String str) {
    // count用于记录W,A,S,D字母的数量
    HashMap<Character, Integer> count = new HashMap<>();

    for (int i = 0; i < str.length(); i++) {
      Character c = str.charAt(i);
      count.put(c, count.getOrDefault(c, 0) + 1);
    }

    // 平衡状态时，W,A,S,D应该都是avg数量
    int avg = str.length() / 4;

    // total用于记录多余字母个数
    int total = 0;

    // flag表示当前是否为平衡状态，默认是
    boolean flag = true;

    for (Character c : count.keySet()) {
      if (count.get(c) > avg) {
        // 如果有一个字母数量超标，则平衡打破
        flag = false;
        // 此时count记录每个字母超过avg的数量
        count.put(c, count.get(c) - avg);
        total += count.get(c);
      } else {
        count.put(c, 0); // 此时count统计的其实是多余字母，如果没有超过avg,则表示没有多余字母
      }
    }

    // 如果平衡，则输出0
    if (flag) return 0;

    int i = 0;
    int j = 0;
    int minLen = str.length() + 1;

    while (j < str.length()) {
      Character jc = str.charAt(j);

      if (count.get(jc) > 0) {
        total--;
      }
      count.put(jc, count.get(jc) - 1);

      while (total == 0) {
        minLen = Math.min(minLen, j - i + 1);

        Character ic = str.charAt(i);
        if (count.get(ic) >= 0) {
          total++;
        }
        count.put(ic, count.get(ic) + 1);

        i++;
      }
      j++;
    }
    return minLen;
  }
}`,python:`# 输入获取
s = input()


# 算法入口
def getResult(s):
    # 此时count记录统计W,A,S,D字母的数量
    count = {
        "W": 0,
        "A": 0,
        "S": 0,
        "D": 0
    }

    for c in s:
        count[c] += 1

    avg = len(s) / 4  # 平衡状态时，W,A,S,D应该都是avg数量
    total = 0  # total用于记录多余字母个数
    flag = True  # flag表示当前是否为平衡状态，默认是

    for c in count.keys():
        if count[c] > avg:
            flag = False  # 如果有一个字母数量超标，则平衡打破
            count[c] -= avg  # 此时count记录每个字母超过avg的数量
            total += count[c]
        else:
            count[c] = 0

    if flag:
        return 0  # 如果平衡，则输出0

    i = 0
    j = 0
    minLen = len(s) - 1

    while j < len(s):
        jc = s[j]

        if count[jc] > 0:
            total -= 1
        count[jc] -= 1

        while total == 0:
            minLen = min(minLen, j - i + 1)

            ic = s[i]
            if count[ic] >= 0:
                total += 1
            count[ic] += 1

            i += 1

        j += 1

    return minLen


print(getResult(s))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  console.log(getResult(line));
});

function getResult(str) {
  // 此时count记录统计W,A,S,D字母的数量
  const count = {
    W: 0,
    A: 0,
    S: 0,
    D: 0,
  };

  for (let c of str) count[c]++;

  // 平衡状态时，W,A,S,D应该都是avg数量
  const avg = str.length / 4;

  let total = 0; // total用于记录多余字母个数

  let flag = true; // flag表示当前是否为平衡状态，默认是
  for (let c in count) {
    if (count[c] > avg) {
      flag = false; // 如果有一个字母数量超标，则平衡打破
      count[c] -= avg; // 此时count记录每个字母超过avg的数量
      total += count[c];
    } else {
      delete count[c];
    }
  }

  if (flag) return 0; // 如果平衡，则输出0

  let i = 0;
  let j = 0;
  let minLen = str.length + 1;

  while (j < str.length) {
    const jc = str[j];

    if (count[jc]-- > 0) {
      total--;
    }

    while (total === 0) {
      minLen = Math.min(minLen, j - i + 1);

      const ic = str[i];
      if (count[ic]++ >= 0) {
        total++;
      }

      i++;
    }

    j++;
  }

  return minLen;
}`,cpp:`#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    map<char, int> count;
    count['W'] = count['A'] = count['S'] = count['D'] = 0;
    
    for (char c : s) count[c]++;
    
    int avg = s.length() / 4;
    int total = 0;
    bool flag = true;
    
    for (auto& p : count) {
        if (p.second > avg) {
            flag = false;
            p.second -= avg;
            total += p.second;
        } else {
            p.second = 0;
        }
    }
    
    if (flag) {
        cout << 0 << endl;
        return 0;
    }
    
    int i = 0, j = 0;
    int minLen = s.length() + 1;
    
    while (j < s.length()) {
        if (count[s[j]]-- > 0) total--;
        
        while (total == 0) {
            minLen = min(minLen, j - i + 1);
            if (count[s[i]]++ >= 0) total++;
            i++;
        }
        j++;
    }
    
    cout << minLen << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char s[100001];
    scanf("%s", s);
    int len = strlen(s);
    
    int count[128] = {0};
    for (int i = 0; i < len; i++) count[(int)s[i]]++;
    
    int avg = len / 4;
    int total = 0;
    int flag = 1;
    
    char keys[] = "WASD";
    for (int i = 0; i < 4; i++) {
        char c = keys[i];
        if (count[(int)c] > avg) {
            flag = 0;
            count[(int)c] -= avg;
            total += count[(int)c];
        } else {
            count[(int)c] = 0;
        }
    }
    
    if (flag) {
        printf("0\\n");
        return 0;
    }
    
    int i = 0, j = 0;
    int minLen = len + 1;
    
    while (j < len) {
        if (count[(int)s[j]]-- > 0) total--;
        
        while (total == 0) {
            if (j - i + 1 < minLen) minLen = j - i + 1;
            if (count[(int)s[i]]++ >= 0) total++;
            i++;
        }
        j++;
    }
    
    printf("%d\\n", minLen);
    return 0;
}`},r={id:"70",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:e,examples:c,solution:o,codes:a};export{a as codes,r as default,t as description,u as examType,c as examples,l as id,i as inputDesc,e as outputDesc,s as score,o as solution,n as title};
