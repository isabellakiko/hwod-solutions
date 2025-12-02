const s="91",n="出租车计费靠谱的车",l="A",a=100,i=`程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。
出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常。
比如：
23再多一块钱就变为25； 39再多一块钱变为50； 399再多一块钱变为500； 小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。
给出计费表的表面读数，返回实际产生的费用。`,t=`只有一行，数字N，表示里程表的读数。
(1<=N<=888888888)。`,e="一个数字，表示实际产生的费用。以回车结束。",r=[{input:"5",output:"4",explanation:"跳过4后，表面读数5实际是第4个数。"},{input:"17",output:"15",explanation:"1→1，7→6（大于4减1），实际=1×9+6=15。"},{input:"100",output:"81",explanation:"1→1，0→0，0→0，实际=1×81+0×9+0=81。"}],c=`**解题思路：**

本题是一道**进制转换**问题。

**核心思路：**
跳过数字4，相当于使用9进制（0-9跳过4只有9个数字）。
- 表面读数是特殊的9进制数
- 大于4的数字需要减1转换为真实9进制
- 再转换为10进制即为实际费用

**算法步骤：**
1. 遍历表面读数每一位
2. 若数字>4，则减1
3. 累计：result = result * 9 + digit

**时间复杂度**：O(log N)`,o={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line = scanner.nextLine();
        int correct = 0;
        for (char c : line.toCharArray()) {
            int digit = c - '0';
            if (digit > 4) {
                digit--;
            }
            correct = correct * 9 + digit;
        }
        System.out.println(correct);
    }
}`,python:`import sys

line = sys.stdin.readline().strip()
correct = 0
for c in line:
    digit = int(c)
    if digit > 4:
        digit -= 1
    correct = correct * 9 + digit
print(correct)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  let correct = 0;
  for (let i = 0; i < line.length; i++) {
    let digit = parseInt(line[i]);
    if (digit > 4) {
      digit--;
    }
    correct = correct * 9 + digit;
  }
  console.log(correct);
});`,cpp:`#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    // 读取输入的表面读数
    getline(cin, line);
    // 初始化实际产生的费用
    int correct = 0;
    // 遍历读数的每一位数字
    for (char c : line) {
        int digit = c - '0'; // 将字符转换为数字
        if (digit > 4) { // 如果数字大于4，则需要减1
            digit--;
        }
        correct = correct * 9 + digit; // 将每一位数字加入到实际产生的费用中
    }
    // 输出实际产生的费用
    cout << correct << endl;
    
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char line[10];  
    scanf("%s", line); // 读取输入的表面读数

    int correct = 0; // 初始化实际产生的费用
    int length = strlen(line); // 获取输入字符串的长度

    // 遍历读数的每一位数字
    for (int i = 0; i < length; i++) {
        int digit = line[i] - '0'; // 将字符转换为数字

        // 如果数字大于4，则需要减1，因为跳过了数字4
        if (digit > 4) {
            digit--;
        }

        correct = correct * 9 + digit; // 更新实际产生的费用
    }

    // 输出实际产生的费用
    printf("%d\\n", correct);
    
    return 0;
}`},d={id:"91",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:r,solution:c,codes:o};export{o as codes,d as default,i as description,l as examType,r as examples,s as id,t as inputDesc,e as outputDesc,a as score,c as solution,n as title};
