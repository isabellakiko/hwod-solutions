const r="78",n="最长的指定瑕疵度的元音子串",d="A",c=100,i=`开头和结尾都是元音字母（aeiouAEIOU）的字符串为元音字符串，其中混杂的非元音字母数量为其瑕疵度。比如:
“a” 、 “aa”是元音字符串，其瑕疵度都为0“aiur”不是元音字符串（结尾不是元音字符） “abira”是元音字符串，其瑕疵度为2
给定一个字符串，请找出指定瑕疵度的最长元音字符子串，并输出其长度，如果找不到满足条件的元音字符子串，输出0。
子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。
`,s=`首行输入是一个整数，表示预期的瑕疵度flaw，取值范围[0, 65535]。
接下来一行是一个仅由字符a-z和A-Z组成的字符串，字符串长度(0, 65535]。
`,t="输出为一个整数，代表满足条件的元音字符子串的长度。",e=[{input:`0
asdbuiodevauufgh`,output:"3",explanation:"瑕疵度为0的元音子串有a、uio、e、auu，最长是auu或uio，长度3。"},{input:`2
asdbuiodevauufgh`,output:"9",explanation:"瑕疵度为2的最长元音子串是uiodevau，长度9（d、v两个非元音）。"},{input:`1
abira`,output:"0",explanation:"abira瑕疵度为2，没有瑕疵度为1的元音子串。"}],a=`**解题思路：**

本题是一道**双指针**问题。

**算法步骤：**
1. 记录所有元音字母的下标到数组idxs
2. 用双指针l、r指向idxs的元素，代表元音子串的首尾
3. 瑕疵度 = idxs[r] - idxs[l] - (r - l)
4. 若瑕疵度>flaw，l右移；若<flaw，r右移
5. 若等于flaw，记录长度并r右移

**时间复杂度**：O(N)`,l={java:`import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int flaw = sc.nextInt();
    String s = sc.next();

    System.out.println(getResult(flaw, s));
  }

  public static int getResult(int flaw, String s) {
    char[] yuan = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
    HashSet<Character> set = new HashSet<>();
    for (char c : yuan) set.add(c);

    ArrayList<Integer> idxs = new ArrayList<>();
    for (int i = 0; i < s.length(); i++) {
      if (set.contains(s.charAt(i))) idxs.add(i);
    }

    int ans = 0;
    int n = idxs.size();

    int l = 0;
    int r = 0;

    while (r < n) {
      // 瑕疵度计算
      int diff = idxs.get(r) - idxs.get(l) - (r - l);

      if (diff > flaw) {
        l++;
      } else if (diff < flaw) {
        r++;
      } else {
        ans = Math.max(ans, idxs.get(r) - idxs.get(l) + 1);
        r++;
      }
    }

    return ans;
  }
}`,python:`# 输入获取
flaw = int(input())
s = input()


# 算法入口
def getResult():
    yuanSet = set(list("aeiouAEIOU"))

    idxs = []
    for i in range(len(s)):
        if s[i] in yuanSet:
            idxs.append(i)

    ans = 0

    l = 0
    r = 0

    while r < len(idxs):
        # 瑕疵度计算
        diff = idxs[r] - idxs[l] - (r - l)

        if diff > flaw:
            l += 1
        elif diff < flaw:
            r += 1
        else:
            ans = max(ans, idxs[r] - idxs[l] + 1)
            r += 1

    return ans


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const flaw = parseInt(lines[0]);
        const s = lines[1];
        
        const yuanSet = new Set('aeiouAEIOU'.split(''));
        const idxs = [];
        for (let i = 0; i < s.length; i++) {
            if (yuanSet.has(s[i])) idxs.push(i);
        }
        
        let ans = 0;
        let l = 0, r = 0;
        
        while (r < idxs.length) {
            const diff = idxs[r] - idxs[l] - (r - l);
            
            if (diff > flaw) {
                l++;
            } else if (diff < flaw) {
                r++;
            } else {
                ans = Math.max(ans, idxs[r] - idxs[l] + 1);
                r++;
            }
        }
        
        console.log(ans);
        rl.close();
    }
});`,cpp:`#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    int flaw;
    string s;
    cin >> flaw >> s;
    
    set<char> yuanSet({'a','e','i','o','u','A','E','I','O','U'});
    vector<int> idxs;
    
    for (int i = 0; i < s.length(); i++) {
        if (yuanSet.count(s[i])) idxs.push_back(i);
    }
    
    int ans = 0;
    int l = 0, r = 0;
    int n = idxs.size();
    
    while (r < n) {
        int diff = idxs[r] - idxs[l] - (r - l);
        
        if (diff > flaw) {
            l++;
        } else if (diff < flaw) {
            r++;
        } else {
            ans = max(ans, idxs[r] - idxs[l] + 1);
            r++;
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
           c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
}

int main() {
    int flaw;
    char s[65536];
    scanf("%d %s", &flaw, s);
    
    int idxs[65536];
    int n = 0;
    int len = strlen(s);
    
    for (int i = 0; i < len; i++) {
        if (isVowel(s[i])) idxs[n++] = i;
    }
    
    int ans = 0;
    int l = 0, r = 0;
    
    while (r < n) {
        int diff = idxs[r] - idxs[l] - (r - l);
        
        if (diff > flaw) {
            l++;
        } else if (diff < flaw) {
            r++;
        } else {
            int curLen = idxs[r] - idxs[l] + 1;
            if (curLen > ans) ans = curLen;
            r++;
        }
    }
    
    printf("%d\\n", ans);
    return 0;
}`},f={id:"78",title:n,examType:"A",score:100,description:i,inputDesc:s,outputDesc:t,examples:e,solution:a,codes:l};export{l as codes,f as default,i as description,d as examType,e as examples,r as id,s as inputDesc,t as outputDesc,c as score,a as solution,n as title};
