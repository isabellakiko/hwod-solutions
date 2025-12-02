const u="138",n="解压报文压缩报文还原",a="A",p=200,t=`为了提升数据传输的效率，会对传输的报文进行压缩处理。
输入一个压缩后的报文，请返回它解压后的原始报文。
压缩规则：n[str]，表示方括号内部的 str 正好重复 n 次。
注意 n 为正整数（0 < n <= 100），str只包含小写英文字母，不考虑异常情况。`,r=`输入压缩后的报文：
1）不考虑无效的输入，报文没有额外的空格，方括号总是符合格式要求的；
2）原始报文不包含数字，所有的数字只表示重复的次数 n ，例如不会出现像 5b 或 3[8] 的输入；`,s=`解压后的原始报文
注：原始报文长度不会超过1000，不考虑异常的情况`,e=[{input:"[k]2[mn]",output:"kkkmnmn",explanation:"k 重复3次，mn 重复2次，最终得到 kkkmnmn"},{input:"[m2[c]]",output:"mccmccmcc",explanation:"m2[c] 解压缩后为 mcc，重复三次为 mccmccmcc"}],c=`**解题思路：**

本题是一道**栈模拟**问题，类似LeetCode 394字符串解码。

**核心思路：**
- 用栈处理嵌套的压缩结构
- 遇到[入栈保存当前状态，遇到]出栈并重复字符串

**算法步骤：**
1. 遍历字符串，字母累加到当前字符串
2. 数字累加到当前重复次数
3. 遇到[：将当前字符串和次数入栈，重置
4. 遇到]：出栈，将当前字符串重复n次拼接到上层
5. 遍历结束返回结果

**时间复杂度**：O(N×M)，N为压缩串长度，M为最大重复次数`,i={java:`import java.util.Scanner;
import java.util.Stack;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String compressed_string = scanner.next();

        Stack<List<String>> stack = new Stack<>();
        stack.push(new ArrayList<>(List.of("", "1", ""))); // 使用栈来存储解压后的字符串和重复次数

        String current_str = ""; // 当前字符
        String current_num = ""; // 当前重复次数

        for (char c : compressed_string.toCharArray()) {
            if (Character.isLetter(c)) { // 如果是字母
                current_str += c;
            } else if (Character.isDigit(c)) { // 如果是数字
                current_num += c;
            } else if (c == '[') { // 如果是左括号
                stack.push(new ArrayList<>(List.of(current_str, current_num, ""))); // 将当前字符和重复次数入栈
                current_str = current_num = ""; // 重置当前字符和重复次数
            } else { // 如果是右括号
                List<String> prev = stack.pop();
                String prev_str = prev.get(0);
                int times = Integer.parseInt(prev.get(1));
                String prev_result = prev.get(2);

                String repeated_str = "";
                for (int i = 0; i < times; i++) {
                    repeated_str += prev_result + current_str;
                }

                stack.peek().set(2, stack.peek().get(2) + prev_str + repeated_str); // 更新栈顶元素的结果
                current_str = ""; // 重置当前字符
            }
        }

        String result = stack.peek().get(2) + current_str; // 返回最终的结果
        System.out.println(result);
    }
}`,python:`compressed_string = input()
stack = [['', 1, '']]  # 使用栈来存储解压后的字符串和重复次数
current_str = ''  # 当前字符
current_num = ''  # 当前重复次数
for c in compressed_string:
    if c.isalpha():  # 如果是字母
        current_str += c
    elif c.isdigit():  # 如果是数字
        current_num += c
    elif c == '[':  # 如果是左括号
        stack.append([current_str, int(current_num), ''])  # 将当前字符和重复次数入栈
        current_str = current_num = ''  # 重置当前字符和重复次数
    else:  # 如果是右括号
        prev_str, times, prev_result = stack.pop()  # 弹出栈顶元素
        stack[-1][-1] += prev_str + times * (prev_result + current_str)  # 更新栈顶元素的结果
        current_str = ''  # 重置当前字符
result = stack.pop()[-1] + current_str  # 返回最终的结果
print(result)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let compressed_string = "";

rl.on("line", (input) => {
  compressed_string = input;

  const stack = [];
  stack.push(["", "1", ""]); // 使用数组来模拟栈，存储解压后的字符串和重复次数

  let current_str = ""; // 当前字符
  let current_num = ""; // 当前重复次数

  for (const c of compressed_string) {
    if (/[a-zA-Z]/.test(c)) { // 如果是字母
      current_str += c;
    } else if (/[0-9]/.test(c)) { // 如果是数字
      current_num += c;
    } else if (c === '[') { // 如果是左括号
      stack.push([current_str, current_num, ""]); // 将当前字符和重复次数入栈
      current_str = current_num = ""; // 重置当前字符和重复次数
    } else { // 如果是右括号
      const prev = stack.pop();
      const prev_str = prev[0];
      const times = parseInt(prev[1]);
      const prev_result = prev[2];

      let repeated_str = "";
      for (let i = 0; i < times; i++) {
        repeated_str += prev_result + current_str;
      }

      stack[stack.length - 1][2] += prev_str + repeated_str; // 更新栈顶元素的结果
      current_str = ""; // 重置当前字符
    }
  }

  const result = stack[stack.length - 1][2] + current_str; // 返回最终的结果
  console.log(result);

  rl.close();
});`,cpp:`#include <iostream>
#include <stack>
#include <string>
#include <vector>

int main() {
    std::string compressed_string;
    std::cin >> compressed_string;

    std::stack<std::vector<std::string>> stack;
    stack.push({"", "1", ""}); // 使用栈来存储解压后的字符串和重复次数

    std::string current_str = ""; // 当前字符
    std::string current_num = ""; // 当前重复次数

    for (char c : compressed_string) {
        if (isalpha(c)) { // 如果是字母
            current_str += c;
        } else if (isdigit(c)) { // 如果是数字
            current_num += c;
        } else if (c == '[') { // 如果是左括号
            stack.push({current_str, current_num, ""}); // 将当前字符和重复次数入栈
            current_str = current_num = ""; // 重置当前字符和重复次数
        } else { // 如果是右括号
            std::vector<std::string> prev = stack.top();
            stack.pop();
            std::string prev_str = prev[0];
            int times = std::stoi(prev[1]);
            std::string prev_result = prev[2];

            std::string repeated_str = "";
            for (int i = 0; i < times; i++) {
                repeated_str += prev_result + current_str;
            }

            stack.top()[2] += prev_str + repeated_str; // 更新栈顶元素的结果
            current_str = ""; // 重置当前字符
        }
    }

    std::string result = stack.top()[2] + current_str; // 返回最终的结果
    std::cout << result << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX 1000 // 栈的最大长度
#define MAX_STR_LEN 1000 // 每个字符串的最大长度

// 模拟栈的结构
typedef struct {
    char str[MAX][MAX_STR_LEN]; // 字符串
    int num[MAX];               // 重复次数
    char result[MAX][MAX_STR_LEN]; // 解压后的字符串
    int top;                    // 栈顶指针
} Stack;

// 初始化栈
void initStack(Stack *stack) {
    stack->top = -1;
}

// 压栈
void push(Stack *stack, const char *str, const char *num, const char *result) {
    if (stack->top + 1 < MAX) {
        stack->top++;
        strcpy(stack->str[stack->top], str);
        stack->num[stack->top] = atoi(num); // 将字符串数字转换为整数
        strcpy(stack->result[stack->top], result);
    }
}

// 出栈
void pop(Stack *stack, char *str, int *num, char *result) {
    if (stack->top >= 0) {
        strcpy(str, stack->str[stack->top]);
        *num = stack->num[stack->top];
        strcpy(result, stack->result[stack->top]);
        stack->top--;
    }
}

int main() {
    char compressed_string[MAX_STR_LEN];
 
    scanf("%s", compressed_string);

    Stack stack;
    initStack(&stack);
    push(&stack, "", "1", ""); // 初始化栈，使用空字符串和默认重复次数1

    char current_str[MAX_STR_LEN] = ""; // 当前的解压字符串
    char current_num[MAX_STR_LEN] = ""; // 当前的重复次数

    for (int i = 0; i < strlen(compressed_string); i++) {
        char c = compressed_string[i];

        if (isalpha(c)) { // 如果是字母
            int len = strlen(current_str);
            current_str[len] = c;
            current_str[len + 1] = '\\0';
        } else if (isdigit(c)) { // 如果是数字
            int len = strlen(current_num);
            current_num[len] = c;
            current_num[len + 1] = '\\0';
        } else if (c == '[') { // 如果是左括号
            push(&stack, current_str, current_num, ""); // 将当前字符串和重复次数压栈
            strcpy(current_str, ""); // 重置当前字符串
            strcpy(current_num, ""); // 重置当前次数
        } else if (c == ']') { // 如果是右括号
            char prev_str[MAX_STR_LEN];
            int times;
            char prev_result[MAX_STR_LEN];

            pop(&stack, prev_str, &times, prev_result); // 弹出栈顶元素

            char repeated_str[MAX_STR_LEN] = "";
            for (int j = 0; j < times; j++) { // 根据次数生成重复的字符串
                strcat(repeated_str, prev_result);
                strcat(repeated_str, current_str);
            }

            strcpy(current_str, prev_str); // 拼接上先前的字符串
            strcat(current_str, repeated_str); // 拼接重复的结果
        }
    }

    printf("%s\\n", current_str);

    return 0;
}`},_={id:"138",title:n,examType:"A",score:200,description:t,inputDesc:r,outputDesc:s,examples:e,solution:c,codes:i};export{i as codes,_ as default,t as description,a as examType,e as examples,u as id,r as inputDesc,s as outputDesc,p as score,c as solution,n as title};
