const a="24",n="找最小数",l="A",k=100,t="给一个正整数NUM1，计算出新正整数NUM2，NUM2为NUM1中移除N位数字后的结果，需要使得NUM2的值最小。",s="1.输入的第一行为一个字符串，字符串由0-9字符组成，记录正整数NUM1，NUM1长度小于32。 2.输入的第二行为需要移除的数字的个数，小于NUM1长度。",e="输出一个数字字符串，记录最小值NUM2。",c=[{input:`2615371
4`,output:"131",explanation:`从 2615371 中移除4位数字。
使用单调栈：
- 2 入栈 [2]
- 6>2, 6 入栈 [2,6]
- 1<6, 弹出6(k=3), 1<2, 弹出2(k=2), 1 入栈 [1]
- 5>1, 5 入栈 [1,5]
- 3<5, 弹出5(k=1), 3 入栈 [1,3]
- 7>3, 7 入栈 [1,3,7]
- 1<7, 弹出7(k=0), 1 入栈 [1,3,1]
结果：131`},{input:`10200
1`,output:"200",explanation:"移除1位数字，移除1得到 0200，去除前导零后为 200。"}],i=`**解题思路：**

本题是一道**单调栈**问题，类似于 LeetCode 402.移掉K位数字。

**核心思想：**
- 为了使结果最小，应尽量让高位数字小
- 使用单调递增栈：如果当前数字比栈顶小，就弹出栈顶（相当于移除这个大数字）

**算法步骤：**

1. 遍历数字的每一位
2. 若栈非空 且 k>0 且 栈顶>当前数字，则弹出栈顶，k--
3. 将当前数字入栈
4. 遍历完后若 k>0，从栈顶移除剩余 k 个数字
5. 去除前导零，若为空则返回"0"

**时间复杂度**：O(n)，每个数字最多入栈出栈各一次`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String num = sc.nextLine();
        int k = Integer.parseInt(sc.nextLine());
        
        StringBuilder stack = new StringBuilder();
        
        for (char c : num.toCharArray()) {
            while (stack.length() > 0 && k > 0 && stack.charAt(stack.length() - 1) > c) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }
            stack.append(c);
        }
        
        // 移除剩余的k个数字
        String result = stack.substring(0, stack.length() - k);
        
        // 去除前导零
        int i = 0;
        while (i < result.length() - 1 && result.charAt(i) == '0') {
            i++;
        }
        result = result.substring(i);
        
        System.out.println(result.isEmpty() ? "0" : result);
    }
}`,python:`num = input()
k = int(input())

stack = []

for c in num:
    while stack and k > 0 and stack[-1] > c:
        stack.pop()
        k -= 1
    stack.append(c)

# 移除剩余的k个数字
result = ''.join(stack[:len(stack) - k] if k > 0 else stack)

# 去除前导零
result = result.lstrip('0') or '0'

print(result)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const num = lines[0];
    let k = parseInt(lines[1]);
    
    const stack = [];
    
    for (const c of num) {
      while (stack.length > 0 && k > 0 && stack[stack.length - 1] > c) {
        stack.pop();
        k--;
      }
      stack.push(c);
    }
    
    // 移除剩余的k个数字
    let result = stack.slice(0, stack.length - k).join('');
    
    // 去除前导零
    result = result.replace(/^0+/, '') || '0';
    
    console.log(result);
    rl.close();
  }
});`,cpp:`#include <iostream>
#include <string>
#include <vector>

int main() {
    // 读取输入的正整数 NUM1 和需要移除的数字个数
    std::string num;
    int k;
    std::cin >> num >> k;

    // 使用一个 vector 作为栈来存储结果
    std::vector<char> stack;

    // 遍历输入的数字字符串
    for (char i : num) {
        // 当栈非空、k 大于 0 且栈顶元素大于当前数字时，弹出栈顶元素并减小 k
        while (!stack.empty() && k > 0 && stack.back() > i) {
            k--;
            stack.pop_back();
        }
        // 将当前数字压入栈中
        stack.push_back(i);
    }

    // 构建结果字符串，移除多余的 k 个数字
    std::string result(stack.begin(), stack.end() - k);
    // 删除结果字符串中的前导零
    result.erase(0, result.find_first_not_of('0'));
    // 如果结果为空，则输出 "0"
    if (result.empty()) {
        result = "0";
    }

    // 输出结果
    std::cout << result << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char num[32]; // 存储输入的正整数NUM1，长度小于32
    int k;        // 需要移除的数字个数
    scanf("%s %d", num, &k); // 读取NUM1和k

    char stack[32]; // 使用一个字符数组作为栈来存储结果
    int top = -1;   // 栈顶指针，初始为-1表示空栈

    // 遍历输入的数字字符串
    for (int i = 0; i < strlen(num); i++) {
        char current = num[i];
        // 当栈非空、k大于0且栈顶元素大于当前数字时，弹出栈顶元素并减小k
        while (top >= 0 && k > 0 && stack[top] > current) {
            top--;
            k--;
        }
        // 将当前数字压入栈中
        stack[++top] = current;
    }

    // 移除多余的k个数字
    top -= k;

    // 构建结果字符串
    char result[32];
    for (int i = 0; i <= top; i++) {
        result[i] = stack[i];
    }
    result[top + 1] = '\\0'; // 添加字符串结束符

    // 删除结果字符串中的前导零
    char *start = result;
    while (*start == '0') {
        start++;
    }
    if (*start == '\\0') { // 如果所有数字都被移除，输出"0"
        printf("0\\n");
    } else {
        printf("%s\\n", start); // 输出结果
    }

    return 0;
}`},u={id:"24",title:n,examType:"A",score:100,description:t,inputDesc:s,outputDesc:e,examples:c,solution:i,codes:r};export{r as codes,u as default,t as description,l as examType,c as examples,a as id,s as inputDesc,e as outputDesc,k as score,i as solution,n as title};
