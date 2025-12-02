const c="79",n="机房布局",l="A",o=100,i=`小明正在规划一个大型数据中心机房，为了使得机柜上的机器都能正常满负荷工作，需要确保在每个机柜边上至少要有一个电箱。 为了简化题目，假设这个机房是一整排，M表示机柜，I表示间隔，请你返回这整排机柜，至少需要多少个电箱。 如果无解请返回 -1 。
`,s="一个只包含M（机柜）和I（间隔）的字符串，长度范围[1, 10000]。",t="输出最少需要多少个电箱，如果无解返回-1。",e=[{input:"MIMI",output:"1",explanation:"在第2个位置放电箱，可以同时服务左右两个机柜。"},{input:"MMI",output:"-1",explanation:"第一个M左边没有间隔，右边也是M，无法放电箱，返回-1。"},{input:"IMIMI",output:"1",explanation:"在中间的I位置放一个电箱即可服务两个机柜。"}],a=`**解题思路：**

本题是一道**贪心**问题。

**算法步骤：**
1. 从左向右遍历字符串
2. 遇到机柜M时，优先在其右侧放电箱
3. 右侧放电箱后，跳过下一个位置（该机柜已被覆盖）
4. 若右侧无法放，尝试左侧
5. 若左右都无法放，返回-1

**时间复杂度**：O(N)`,r={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String str = sc.next();

    System.out.println(getResult(str));
  }

  public static int getResult(String str) {
    int n = str.length();

    // ans记录用了几个电箱
    int ans = 0;

    for (int i = 0; i < n; i++) {
      // 如果当前是机柜
      if (str.charAt(i) == 'M') {
        // 则优先将电箱放到该机柜的右边，如果机柜右边有间隔I的话
        if (i + 1 < n && str.charAt(i + 1) == 'I') {
          ans++;
          // 如果放成功了，即当前第 i 个位置是机柜，第i+1个位置是 电箱，那么第i+2个位置无论是机柜还是间隔都无所谓，下次我们直接从第i+3位置开始判断
          i += 2; // 这里 i += 2结合下轮for循环的i++，就是i += 3
        }
        // 如果当前第i位置的机柜右边无法放入电箱，则只能将电箱放到其左边第i-1位置，但是第i-1位置必须是间隔I
        else if (i - 1 >= 0 && str.charAt(i - 1) == 'I') {
          ans++;
        }
        // 如果当前机柜左右都无法放入电箱，则返回-1
        else {
          ans = -1;
          break;
        }
      }
    }

    return ans;
  }
}`,python:`# 输入获取
s = input()


# 算法入口
def getResult(s):
    n = len(s)

    # ans记录用了几个电箱
    ans = 0
    i = 0
    while i < n:
        # 如果当前是机柜
        if s[i] == 'M':
            # 则优先将电箱放到该机柜的右边，如果机柜右边有间隔I的话
            if i + 1 < n and s[i + 1] == 'I':
                ans += 1
                # 如果放成功了，即当前第 i 个位置是机柜，第i+1个位置是 电箱，那么第i+2个位置无论是机柜还是间隔都无所谓，下次我们直接从第i+3位置开始判断
                i += 2  # 这里 i += 2结合后面的i +=1 ，就是i += 3
            #  如果当前第i位置的机柜右边无法放入电箱，则只能将电箱放到其左边第i-1位置，但是第i-1位置必须是间隔I
            elif i - 1 >= 0 and s[i - 1] == 'I':
                ans += 1
            # 如果当前机柜左右都无法放入电箱，则返回-1
            else:
                ans = -1
                break
        i += 1

    return ans


# 算法调用
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
  const n = str.length;

  // ans记录用了几个电箱
  let ans = 0;
  for (let i = 0; i < n; i++) {
    // 如果当前是机柜
    if (str[i] == "M") {
      // 则优先将电箱放到该机柜的右边，如果机柜右边有间隔I的话
      if (i + 1 < n && str[i + 1] == "I") {
        ans++;
        // 如果放成功了，即当前第 i 个位置是机柜，第i+1个位置是 电箱，那么第i+2个位置无论是机柜还是间隔都无所谓，下次我们直接从第i+3位置开始判断
        i += 2; // 这里 i += 2结合下轮for循环的i++，就是i += 3
      }
      // 如果当前第i位置的机柜右边无法放入电箱，则只能将电箱放到其左边第i-1位置，但是第i-1位置必须是间隔I
      else if (i - 1 >= 0 && str[i - 1] == "I") {
        ans++;
      }
      // 如果当前机柜左右都无法放入电箱，则返回-1
      else {
        ans = -1;
        break;
      }
    }
  }

  return ans;
}`,cpp:`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    int n = s.length();
    int ans = 0;
    
    for (int i = 0; i < n; i++) {
        if (s[i] == 'M') {
            if (i + 1 < n && s[i + 1] == 'I') {
                ans++;
                i += 2;
            } else if (i - 1 >= 0 && s[i - 1] == 'I') {
                ans++;
            } else {
                ans = -1;
                break;
            }
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char s[10001];
    scanf("%s", s);
    
    int n = strlen(s);
    int ans = 0;
    
    for (int i = 0; i < n; i++) {
        if (s[i] == 'M') {
            if (i + 1 < n && s[i + 1] == 'I') {
                ans++;
                i += 2;
            } else if (i - 1 >= 0 && s[i - 1] == 'I') {
                ans++;
            } else {
                ans = -1;
                break;
            }
        }
    }
    
    printf("%d\\n", ans);
    return 0;
}`},u={id:"79",title:n,examType:"A",score:100,description:i,inputDesc:s,outputDesc:t,examples:e,solution:a,codes:r};export{r as codes,u as default,i as description,l as examType,e as examples,c as id,s as inputDesc,t as outputDesc,o as score,a as solution,n as title};
