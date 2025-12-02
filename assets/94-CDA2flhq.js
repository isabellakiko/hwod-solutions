const i="94",n="增强的strstr",l="A",o=100,e=`C 语言有一个库函数： char *strstr(const char *haystack, const char *needle) ，实现在字符串 haystack 中查找第一次出现字符串 needle 的位置，如果未找到则返回 null。
现要求实现一个strstr的增强函数，可以使用带可选段的字符串来模糊查询，与strstr一样返回首次查找到的字符串位置。
可选段使用“[]”标识，表示该位置是可选段中任意一个字符即可满足匹配条件。比如“a[bc]”表示可以匹配“ab”或“ac”。
注意目标字符串中可选段可能出现多次。`,t="与strstr函数一样，输入参数是两个字符串指针，分别是源字符串和目标字符串。",r=`与strstr函数不同，返回的是源字符串中，匹配子字符串相对于源字符串地址的偏移（从0开始算），如果没有匹配返回-1。
补充说明：源字符串中必定不包含‘[]’；目标字符串中‘[]’必定成对出现，且不会出现嵌套。
输入的字符串长度在[1,100]之间。`,s=[{input:`abcd
b[cd]`,output:"1",explanation:"查找bc或bd，在abcd中bc位于偏移1处。"},{input:`hello world
w[oa]r`,output:"6",explanation:"查找wor或war，在hello world中wor位于偏移6处。"},{input:`abc
xyz`,output:"-1",explanation:"xyz不在abc中，返回-1。"}],a=`**解题思路：**

本题是一道**正则表达式匹配**问题。

**核心思路：**
- 目标字符串中的[abc]表示匹配a或b或c中的任一字符
- 这正是正则表达式的字符类语法
- 直接使用正则表达式匹配即可

**算法步骤：**
1. 将目标字符串作为正则表达式模式
2. 在源字符串中执行正则搜索
3. 返回首次匹配的起始位置，未找到返回-1

**时间复杂度**：O(N×M)`,c={java:`import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取源字符串和目标字符串
        String source = scanner.nextLine();
        String target = scanner.nextLine();

        // 将目标字符串中的可选段标记转换为正则表达式的可选字符
        target = target.replaceAll("\\\\[(.*?)\\\\]", "[$1]");

        // 编译目标字符串为正则表达式模式
        Pattern pattern = Pattern.compile(target);
        // 创建匹配器，用于在源字符串中查找匹配的子字符串
        Matcher matcher = pattern.matcher(source);

        // 如果找到匹配的子字符串，则输出匹配的子字符串在源字符串中的起始位置
        if (matcher.find()) {
            System.out.println(matcher.start());
        } else {
            // 如果没有找到匹配的子字符串，则输出-1
            System.out.println(-1);
        }
    }
}`,python:`import re

source = input()
target = input()

target = re.sub(r'\\[(.*?)\\]', r'[\\1]', target)

pattern = re.compile(target)
matcher = pattern.search(source)

if matcher:
    print(matcher.start())
else:
    print(-1)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (source) => {
  rl.on('line', (target) => {
    target = target.replace(/\\[(.*?)\\]/g, '[$1]');

    const pattern = new RegExp(target);
    const matcher = pattern.exec(source);

    if (matcher) {
      console.log(matcher.index);
    } else {
      console.log(-1);
    }

    rl.close();
  });
});`,cpp:`#include <iostream>
#include <regex>
using namespace std;

int main() {
    string source, target;
    getline(cin, source);
    getline(cin, target);

    // 将目标字符串中的可选段标记转换为正则表达式的可选字符
    regex reg("\\\\[(.*?)\\\\]");
    target = regex_replace(target, reg, "[$1]");

    // 编译目标字符串为正则表达式模式
    regex pattern(target);
    // 创建匹配器，用于在源字符串中查找匹配的子字符串
    smatch matcher;
    regex_search(source, matcher, pattern);

    // 如果找到匹配的子字符串，则输出匹配的子字符串在源字符串中的起始位置
    if (matcher.size() > 0) {
        cout << matcher.position() << endl;
    } else {
        // 如果没有找到匹配的子字符串，则输出-1
        cout << -1 << endl;
    }

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

#define MAX_LEVELS 100
#define MAX_CHARS  100

int main() {
    char src[1000], tar[1000];
    char levels[MAX_LEVELS][MAX_CHARS]; // 用于存储多层结构
    int levelsSize = 0; // 当前层的数量
    char buffer[MAX_CHARS]; // 临时存储当前层的字符集
    int bufferIndex = 0;
    int isOpen = 0;   // 标记是否在[]内

    // 输入src和tar字符串
    fgets(src, sizeof(src), stdin);
    fgets(tar, sizeof(tar), stdin);

    // 去掉换行符
    src[strcspn(src, "\\n")] = '\\0';
    tar[strcspn(tar, "\\n")] = '\\0';

    // 将tar字符串转化为多层结构levels
    for (int i = 0; i < strlen(tar); i++) {
        char c = tar[i];
        if (c == '[') {
            isOpen = 1; // 进入[]内
            bufferIndex = 0; // 重置缓冲区索引
        } else if (c == ']') {
            isOpen = 0; // 退出[]内
            buffer[bufferIndex] = '\\0';
            strcpy(levels[levelsSize++], buffer); // 将当前层加入levels
        } else {
            if (isOpen) {
                buffer[bufferIndex++] = c; // 在[]内，添加字符到当前层
            } else {
                buffer[0] = c;
                buffer[1] = '\\0';
                strcpy(levels[levelsSize++], buffer); // 在[]外，字符单独作为一层
            }
        }
    }

    // 滑动窗口匹配
    int srcLen = strlen(src);
    int result = -1; // 初始化结果为-1（未找到）
    for (int i = 0; i <= srcLen - levelsSize; i++) {
        int isFind = 1; // 标记是否找到匹配

        // 匹配levels中的每一层
        for (int j = 0; j < levelsSize; j++) {
            if (strchr(levels[j], src[i + j]) == NULL) {
                isFind = 0; // 如果不匹配，标记为未找到
                break;
            }
        }

        if (isFind) {
            result = i; // 找到匹配，记录起始索引
            break;
        }
    }

    // 输出结果
    printf("%d\\n", result);

    return 0;
}`},u={id:"94",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:r,examples:s,solution:a,codes:c};export{c as codes,u as default,e as description,l as examType,s as examples,i as id,t as inputDesc,r as outputDesc,o as score,a as solution,n as title};
