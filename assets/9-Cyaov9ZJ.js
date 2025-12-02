const a="9",n="关联子串",o="A",f=100,t=`给定两个字符串 str1 和 str2，如果字符串 str1 中的字符，经过排列组合后的字符串中，只要有一个字符串是 str2 的子串，则认为 str1 是 str2 的**关联子串**。

若 str1 是 str2 的关联子串，请返回子串在 str2 的起始位置；若不是关联子串，则返回 -1。`,r=`输入一行，包含两个字符串 str1 和 str2，用空格分隔。
- 输入的字符串只包含小写字母
- 两个字符串的长度范围 [1, 100000]`,i=`- 若 str1 是 str2 的关联子串，返回子串在 str2 的起始位置（从 0 开始计数）
- 若不是关联子串，返回 -1
- 若 str2 中有多个 str1 的组合子串，返回最小的起始位置`,s=[{input:"abc efghicbaiii",output:"5",explanation:'str1="abc" 的排列组合包括：abc, acb, bac, bca, cab, cba。str2="efghicbaiii" 中包含 "cba"（位置5-7），所以返回起始位置 5。'},{input:"abc efghiccaiii",output:"-1",explanation:'str1="abc" 的所有排列组合（abc, acb, bac, bca, cab, cba）都不是 str2="efghiccaiii" 的子串，返回 -1。'}],e=`**解题思路：**

本题的关键是判断 str2 中是否存在一个长度为 len(str1) 的子串，使得该子串是 str1 的某个排列。

**核心观察**：
两个字符串互为排列 ⟺ 它们的字符频率（每个字符出现的次数）相同。

**算法：滑动窗口 + 字符频率统计**

1. 统计 str1 的字符频率
2. 在 str2 上使用长度为 len(str1) 的滑动窗口
3. 对每个窗口，统计其字符频率，与 str1 的频率比较
4. 如果相同，返回当前窗口的起始位置
5. 遍历完仍未找到，返回 -1

**优化**：滑动窗口移动时，可以增量更新频率数组（O(1) 更新），而不是每次重新统计（O(n) 统计）。

**时间复杂度**：O(n2 × 26) 或优化后 O(n2)`,c={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        String str1 = parts[0];
        String str2 = parts[1];
        
        int n1 = str1.length();
        int n2 = str2.length();
        
        if (n1 > n2) {
            System.out.println(-1);
            return;
        }
        
        // 统计 str1 的字符频率
        int[] freq1 = new int[26];
        for (char c : str1.toCharArray()) {
            freq1[c - 'a']++;
        }
        
        // 滑动窗口
        for (int i = 0; i <= n2 - n1; i++) {
            int[] freq2 = new int[26];
            for (int j = 0; j < n1; j++) {
                freq2[str2.charAt(i + j) - 'a']++;
            }
            if (Arrays.equals(freq1, freq2)) {
                System.out.println(i);
                return;
            }
        }
        
        System.out.println(-1);
    }
}`,python:`str1, str2 = input().split()
n1, n2 = len(str1), len(str2)

if n1 > n2:
    print(-1)
else:
    # 统计 str1 的字符频率
    freq1 = [0] * 26
    for c in str1:
        freq1[ord(c) - ord('a')] += 1
    
    # 滑动窗口
    result = -1
    for i in range(n2 - n1 + 1):
        freq2 = [0] * 26
        for j in range(n1):
            freq2[ord(str2[i + j]) - ord('a')] += 1
        if freq1 == freq2:
            result = i
            break
    
    print(result)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [str1, str2] = input.split(' ');
  const n1 = str1.length;
  const n2 = str2.length;
  
  if (n1 > n2) {
    console.log(-1);
    rl.close();
    return;
  }
  
  // 统计 str1 的字符频率
  const freq1 = new Array(26).fill(0);
  for (const c of str1) {
    freq1[c.charCodeAt(0) - 97]++;
  }
  
  // 滑动窗口
  for (let i = 0; i <= n2 - n1; i++) {
    const freq2 = new Array(26).fill(0);
    for (let j = 0; j < n1; j++) {
      freq2[str2.charCodeAt(i + j) - 97]++;
    }
    if (freq1.every((v, idx) => v === freq2[idx])) {
      console.log(i);
      rl.close();
      return;
    }
  }
  
  console.log(-1);
  rl.close();
});`,cpp:`#include <iostream>
#include <string>
#include <cstring>
using namespace std;

int main() {
    string str1, str2;
    cin >> str1 >> str2;
    
    int n1 = str1.length();
    int n2 = str2.length();
    
    if (n1 > n2) {
        cout << -1 << endl;
        return 0;
    }
    
    // 统计 str1 的字符频率
    int freq1[26] = {0};
    for (char c : str1) {
        freq1[c - 'a']++;
    }
    
    // 滑动窗口
    for (int i = 0; i <= n2 - n1; i++) {
        int freq2[26] = {0};
        for (int j = 0; j < n1; j++) {
            freq2[str2[i + j] - 'a']++;
        }
        if (memcmp(freq1, freq2, sizeof(freq1)) == 0) {
            cout << i << endl;
            return 0;
        }
    }
    
    cout << -1 << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char str1[100001], str2[100001];
    scanf("%s %s", str1, str2);
    
    int n1 = strlen(str1);
    int n2 = strlen(str2);
    
    if (n1 > n2) {
        printf("-1\\n");
        return 0;
    }
    
    // 统计 str1 的字符频率
    int freq1[26] = {0};
    for (int i = 0; i < n1; i++) {
        freq1[str1[i] - 'a']++;
    }
    
    // 滑动窗口
    for (int i = 0; i <= n2 - n1; i++) {
        int freq2[26] = {0};
        for (int j = 0; j < n1; j++) {
            freq2[str2[i + j] - 'a']++;
        }
        
        int match = 1;
        for (int k = 0; k < 26; k++) {
            if (freq1[k] != freq2[k]) {
                match = 0;
                break;
            }
        }
        
        if (match) {
            printf("%d\\n", i);
            return 0;
        }
    }
    
    printf("-1\\n");
    return 0;
}`},l={id:"9",title:n,examType:"A",score:100,description:t,inputDesc:r,outputDesc:i,examples:s,solution:e,codes:c};export{c as codes,l as default,t as description,o as examType,s as examples,a as id,r as inputDesc,i as outputDesc,f as score,e as solution,n as title};
