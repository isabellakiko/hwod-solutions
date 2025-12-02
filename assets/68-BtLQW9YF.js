const i="68",n="字符串摘要",u="A",o=100,e=`给定一个字符串的摘要算法，请输出给定字符串的摘要值
去除字符串中非字母的符号。如果出现连续字符(不区分大小写) ，则输出：该字符 (小写) + 连续出现的次数。如果是非连续的字符(不区分大小写)，则输出：该字符(小写) + 该字母之后字符串中出现的该字符的次数对按照以上方式表示后的字符串进行排序：字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前。
`,t=`一行字符串，长度为[1,200]
`,r="摘要字符串",c=[{input:"bAaAcBb",output:"a3b2b2c0",explanation:"b非连续后有2个b→b2；aAa连续3次→a3；c非连续后无c→c0；Bb连续→b2。按数字降序、字母升序排列。"},{input:"aabbcc",output:"a2b2c2",explanation:"aa连续→a2，bb连续→b2，cc连续→c2。数字相同按字母排序。"},{input:"ABCabc",output:"a1b1c1",explanation:"A非连续后有1个a→a1，B后有1个b→b1，C后有1个c→c1。"}],a=`**解题思路：**

本题是一道**字符串处理**问题。

**算法步骤：**
1. 去除非字母字符，转小写
2. 统计每个字母的总出现次数
3. 遍历字符串，判断连续/非连续
4. 连续：输出字母+连续次数
5. 非连续：输出字母+后续出现次数
6. 按数字降序、字母升序排列

**时间复杂度**：O(N log N)`,s={java:`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
  // 字母数字类
  static class Letter {
    char letter;
    int num;

    public Letter(char letter, int num) {
      this.letter = letter;
      this.num = num;
    }

    @Override
    public String toString() {
      return this.letter + "" + this.num;
    }
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(getResult(sc.nextLine()));
  }

  public static String getResult(String s) {
    // 不区分大小写
    s = s.toLowerCase();

    // 统计每个字母出现的次数
    int[] count = new int[128];

    // 去除字符串中的非字母
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      if (c >= 'a' && c <= 'z') {
        count[c]++;
        sb.append(c);
      }
    }

    // 加空格是为了避免后续的收尾操作，如果有疑问可以移除下面加空格操作
    s = sb + " ";

    // 记录连续字母和非连续字母
    ArrayList<Letter> ans = new ArrayList<>();

    // 上一个位置的字母
    char pre = s.charAt(0);
    // 该字母连续次数记为1
    int repeat = 1;
    // 后续该字母还有count[pre]-=1个
    count[pre]--;

    for (int i = 1; i < s.length(); i++) {
      // 当前位置的字母
      char cur = s.charAt(i);
      // 后续该字母还有count[cur]-=1个
      count[cur]--;

      if (cur == pre) {
        // 如果当前位置和上一个位置的字母相同，则产生连续
        // 连续次数+1
        repeat++;
      } else {
        // 如果当前位置和上一个位置的字母不同，则连续打断
        // 如果pre字母连续次数>1，则是真连续，那么就是pre+repeat,否则就是假连续,是pre+count[pre]
        ans.add(new Letter(pre, repeat > 1 ? repeat : count[pre]));
        // 更新pre为cur
        pre = cur;
        // 更新pre连续次数为1
        repeat = 1;
      }
    }

    // 字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前
    ans.sort((a, b) -> a.num != b.num ? b.num - a.num : a.letter - b.letter);

    StringBuilder res = new StringBuilder();
    for (Letter an : ans) {
      res.append(an.toString());
    }
    return res.toString();
  }
}`,python:`# 输入获取
s = input()


# 算法入口
def getResult():
    global s

    # 不区分大小写
    s = s.lower()

    # 统计每个字母出现的次数
    count = {}
    # 去除字符串中的非字母
    letters = []

    for c in s:
        if 'z' >= c >= 'a':
            count[c] = count.get(c, 0) + 1
            letters.append(c)

    # 加空格是为了避免后续的收尾操作，如果有疑问可以移除下面加空格操作
    s = "".join(letters) + " "
    count[' '] = 1

    # 记录连续字母和非连续字母
    ans = []

    # 上一个位置的字母
    pre = s[0]
    # 该字母连续次数记为1
    repeat = 1
    # 后续该字母还有count[pre]-=1个
    count[pre] -= 1

    for i in range(1, len(s)):
        # 当前位置的字母
        cur = s[i]
        # 后续该字母还有count[cur]-=1个
        count[cur] -= 1

        if cur == pre:
            # 如果当前位置和上一个位置的字母相同，则产生连续
            # 连续次数+1
            repeat += 1
        else:
            # 如果当前位置和上一个位置的字母不同，则连续打断
            # 如果pre字母连续次数>1，则是真连续，那么就是pre+repeat,否则就是假连续,是pre+count[pre]
            ans.append([pre, repeat if repeat > 1 else count[pre]])
            # 更新pre为cur
            pre = cur
            # 更新pre连续次数为1
            repeat = 1

    # 字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前
    ans.sort(key=lambda x: (-x[1], x[0]))

    return "".join(map(lambda x: x[0]+str(x[1]), ans))


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    let s = line.toLowerCase();
    const count = {};
    let letters = '';
    
    for (const c of s) {
        if (c >= 'a' && c <= 'z') {
            count[c] = (count[c] || 0) + 1;
            letters += c;
        }
    }
    
    s = letters + ' ';
    count[' '] = 1;
    
    const ans = [];
    let pre = s[0];
    let repeat = 1;
    count[pre]--;
    
    for (let i = 1; i < s.length; i++) {
        const cur = s[i];
        count[cur]--;
        
        if (cur === pre) {
            repeat++;
        } else {
            ans.push([pre, repeat > 1 ? repeat : count[pre]]);
            pre = cur;
            repeat = 1;
        }
    }
    
    ans.sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : a[0].charCodeAt(0) - b[0].charCodeAt(0));
    console.log(ans.map(x => x[0] + x[1]).join(''));
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    int count[128] = {0};
    string letters;
    
    for (char c : s) {
        c = tolower(c);
        if (c >= 'a' && c <= 'z') {
            count[(int)c]++;
            letters += c;
        }
    }
    
    s = letters + " ";
    count[' '] = 1;
    
    vector<pair<char, int>> ans;
    char pre = s[0];
    int repeat = 1;
    count[(int)pre]--;
    
    for (int i = 1; i < s.length(); i++) {
        char cur = s[i];
        count[(int)cur]--;
        
        if (cur == pre) {
            repeat++;
        } else {
            ans.push_back({pre, repeat > 1 ? repeat : count[(int)pre]});
            pre = cur;
            repeat = 1;
        }
    }
    
    sort(ans.begin(), ans.end(), [](const pair<char,int>& a, const pair<char,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    
    for (auto& p : ans) {
        cout << p.first << p.second;
    }
    cout << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int main() {
    char line[201];
    fgets(line, sizeof(line), stdin);
    
    int count[128] = {0};
    char letters[201];
    int len = 0;
    
    for (int i = 0; line[i]; i++) {
        char c = tolower(line[i]);
        if (c >= 'a' && c <= 'z') {
            count[(int)c]++;
            letters[len++] = c;
        }
    }
    letters[len] = ' ';
    letters[len + 1] = '\\0';
    count[' '] = 1;
    
    char ans_letter[201];
    int ans_num[201];
    int ans_len = 0;
    
    char pre = letters[0];
    int repeat = 1;
    count[(int)pre]--;
    
    for (int i = 1; letters[i]; i++) {
        char cur = letters[i];
        count[(int)cur]--;
        
        if (cur == pre) {
            repeat++;
        } else {
            ans_letter[ans_len] = pre;
            ans_num[ans_len] = repeat > 1 ? repeat : count[(int)pre];
            ans_len++;
            pre = cur;
            repeat = 1;
        }
    }
    
    // 简单冒泡排序
    for (int i = 0; i < ans_len - 1; i++) {
        for (int j = 0; j < ans_len - 1 - i; j++) {
            if (ans_num[j] < ans_num[j+1] || (ans_num[j] == ans_num[j+1] && ans_letter[j] > ans_letter[j+1])) {
                char tc = ans_letter[j]; ans_letter[j] = ans_letter[j+1]; ans_letter[j+1] = tc;
                int tn = ans_num[j]; ans_num[j] = ans_num[j+1]; ans_num[j+1] = tn;
            }
        }
    }
    
    for (int i = 0; i < ans_len; i++) {
        printf("%c%d", ans_letter[i], ans_num[i]);
    }
    printf("\\n");
    return 0;
}`},p={id:"68",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:r,examples:c,solution:a,codes:s};export{s as codes,p as default,e as description,u as examType,c as examples,i as id,t as inputDesc,r as outputDesc,o as score,a as solution,n as title};
