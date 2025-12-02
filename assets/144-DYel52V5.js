const o="144",n="文本统计分析",u="A",a=200,i=`有一个文件，包含以一定规则写作的文本，请统计文件中包含的文本数量。
规则如下：
文本以”;”分隔，最后一条可以没有”;”，但空文本不能算语句，比如”COMMAND A; ;”只能算一条语句。注意，无字符/空白字符/制表符都算作”空”文本； 文本可以跨行，比如下面，是一条文本，而不是三条；
文本以”;”分隔，最后一条可以没有”;”，但空文本不能算语句，比如”COMMAND A; ;”只能算一条语句。注意，无字符/空白字符/制表符都算作”空”文本；
文本可以跨行，比如下面，是一条文本，而不是三条；
123
文本支持字符串，字符串为成对的单引号(')或者成对的双引号(“)，字符串可能出现用转义字符()处理的单双引号(“your input is””)和转义字符本身，比如
1
支持注释，可以出现在字符串之外的任意位置注释以”–“开头，到换行结束，比如：
123
注意字符串内的”–“，不是注释。`,t="文本文件",e=`包含的文本数量
输入
输出
题目要求编写一个程序来统计一个文本文件中包含的文本数量。这里的“文本”指的是符合一定规则的字符串序列。具体规则如下：
文本以分号(;)分隔，最后一条文本可以没有分号结尾。
如果一段文本只包含空白字符（如空格、制表符等），则不算作一条有效文本。例如，"COMMAND A; ;"中只有一条有效文本。"COMMAND A; B;"为两条有效文本。
文本可以跨越多行。也就是说，一个文本的内容可以分布在多个连续的行中，这些行合起来算作一条文本。
文本支持字符串，字符串可以用单引号(')或双引号(")包裹。字符串内部可能包含转义的引号（例如"Say \\"hello\\""）和转义字符本身（例如\\）。
在单引号和双引号的;,无法作为一条文本结束的标志.
支持注释，注释以连续的两个减号(--)开头，并且一直延续到当前行的末尾。注释只能出现在字符串之外的位置。在字符串内的减号不算作注释的开始。在注释后面的;,无法作为一条文本结束的标志。
单引号和双引号内的注释失效
备注：这里博主默认是注释【后面】的;，是无法作为文本结束的标志。但是有读者提出是不是默认带注释的那一行的分号（即那一行分号的【前面】和【后面】）都无法作为文本结束的标志？机考时如果不是100%通过率，可以试试：带注释的那一行的分号都无法作为文本结束的标志`,r=[{input:`COMMAND A;
COMMAND B;`,output:"2",explanation:"两条以分号结尾的语句"},{input:"COMMAND A; ;",output:"1",explanation:"第二个分号前只有空格，不算有效语句，只有1条"},{input:`SELECT -- comment
FROM;`,output:"1",explanation:"注释到行尾，SELECT和FROM合起来是一条跨行语句"}],c=`**解题思路：**

本题是一道**状态机模拟**问题。

**核心思路：**
- 用状态变量跟踪是否在字符串/注释内
- 分号作为语句分隔符，但字符串和注释内的分号无效

**算法步骤：**
1. 遍历每个字符，维护inString和inComment状态
2. 遇到--且不在字符串内，进入注释状态直到换行
3. 遇到引号，切换字符串状态，处理转义引号
4. 遇到分号且不在字符串内，若当前文本非空则计数+1
5. 最后一条语句可能没有分号，需额外处理

**时间复杂度**：O(N)`,s={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 创建Scanner对象用于获取用户输入
        Scanner scanner = new Scanner(System.in);
        // 使用StringBuilder来构建整个输入文本
        StringBuilder input = new StringBuilder();
        // 循环读取每一行输入直到没有新的输入
        while (scanner.hasNextLine()) {
            // 将读取的每一行追加到StringBuilder对象，并添加换行符
            input.append(scanner.nextLine()).append("\\n");
        }
        // 关闭Scanner对象
        scanner.close();
        // 输出文本统计结果
        System.out.println(countTexts(input.toString()));
    }

    // 统计文本中的文本数量
    private static int countTexts(String input) {
        // 初始化计数器
        int count = 0;
        // 标记是否在字符串内部
        boolean inString = false;
        // 标记是否在注释内部
        boolean inComment = false;
        // 记录字符串分隔符
        char stringDelimiter = 0;
        // 标记当前是否为空文本（即没有遇到非空白字符）
        boolean isEmpty = true;

        // 遍历输入文本的每个字符
        for (int i = 0; i < input.length(); i++) {
            // 当前字符
            char c = input.charAt(i);
            // 下一个字符（如果存在）
            char nextChar = (i + 1 < input.length()) ? input.charAt(i + 1) : '\\0';

            // 如果在注释中
            if (inComment) {
                // 如果遇到换行符，则注释结束
                if (c == '\\n') {
                    inComment = false;
                }
                continue;
            }

            // 如果遇到连续的两个减号，并且不在字符串内，则进入注释状态
            if (c == '-' && nextChar == '-' && !inString) {
                inComment = true;
                continue;
            }

            // 如果遇到单引号或双引号，并且不在字符串内，则进入字符串状态
            if ((c == '\\'' || c == '\\"') && !inString) {
                inString = true;
                stringDelimiter = c;
                isEmpty = false;
                continue;
            }

            // 如果在字符串内，并且遇到了相同的分隔符，则检查是否为转义
            if (c == stringDelimiter && inString) {
                if (nextChar == stringDelimiter) {
                    i++; // 跳过转义的引号
                } else {
                    inString = false; // 字符串结束
                }
                continue;
            }

            // 如果遇到分号，并且不在字符串内，则增加计数器
            if (c == ';' && !inString) {
                if (!isEmpty) {
                    count++;
                    isEmpty = true;
                }
                continue;
            }

            // 如果遇到非空白字符，并且不在字符串内，则标记为非空文本
            if (!Character.isWhitespace(c) && !inString) {
                isEmpty = false;
            }
        }

        // 如果最后一个文本没有闭合的分号，则增加计数器
        if (!isEmpty) {
            count++; // 最后一个文本没有闭合分号
        }

        return count;
    }
}`,python:`import sys

# 统计文本中的文本数量
def count_texts(input):
    # 初始化计数器
    count = 0
    # 标记是否在字符串内部
    in_string = False
    # 标记是否在注释内部
    in_comment = False
    # 记录字符串分隔符
    string_delimiter = ''
    # 标记当前是否为空文本（即没有遇到非空白字符）
    isEmpty = True

    # 遍历输入文本的每个字符
    for i, c in enumerate(input):
        # 下一个字符（如果存在）
        next_char = input[i + 1] if i + 1 < len(input) else '\\0'

        # 如果在注释中
        if in_comment:
            # 如果遇到换行符，则注释结束
            if c == '\\n':
                in_comment = False
            continue

        # 如果遇到连续的两个减号，并且不在字符串内，则进入注释状态
        if c == '-' and next_char == '-' and not in_string:
            in_comment = True
            i += 1  # 跳过下一个减号
            continue

        # 如果遇到单引号或双引号，并且不在字符串内，则进入字符串状态
        if (c == '\\'' or c == '\\"') and not in_string:
            in_string = True
            string_delimiter = c
            isEmpty = False
            continue

        # 如果在字符串内，并且遇到了相同的分隔符，则检查是否为转义
        if c == string_delimiter and in_string:
            if next_char == string_delimiter:
                i += 1  # 跳过转义的引号
            else:
                in_string = False  # 字符串结束
            continue

        # 如果遇到分号，并且不在字符串内，则增加计数器
        if c == ';' and not in_string:
            if not isEmpty:
                count += 1
                isEmpty = True
            continue

        # 如果遇到非空白字符，并且不在字符串内，则标记为非空文本
        if not c.isspace() and not in_string:
            isEmpty = False

    # 如果最后一个文本没有闭合的分号，则增加计数器
    if not isEmpty:
        count += 1  # 最后一个文本没有闭合分号

    return count

# 主函数
if __name__ == "__main__":
    # 使用字符串来构建整个输入文本
    input = sys.stdin.read()
    # 输出文本统计结果
    print(count_texts(input))`,javascript:"",cpp:`#include <iostream>
#include <string>

// 统计文本中的文本数量
int countTexts(const std::string& input) {
    // 初始化计数器
    int count = 0;
    // 标记是否在字符串内部
    bool inString = false;
    // 标记是否在注释内部
    bool inComment = false;
    // 记录字符串分隔符
    char stringDelimiter = 0;
    // 标记当前是否为空文本（即没有遇到非空白字符）
    bool isEmpty = true;

    // 遍历输入文本的每个字符
    for (size_t i = 0; i < input.length(); ++i) {
        // 当前字符
        char c = input[i];
        // 下一个字符（如果存在）
        char nextChar = (i + 1 < input.length()) ? input[i + 1] : '\\0';

        // 如果在注释中
        if (inComment) {
            // 如果遇到换行符，则注释结束
            if (c == '\\n') {
                inComment = false;
            }
            continue;
        }

        // 如果遇到连续的两个减号，并且不在字符串内，则进入注释状态
        if (c == '-' && nextChar == '-' && !inString) {
            inComment = true;
            i++; // 跳过下一个减号
            continue;
        }

        // 如果遇到单引号或双引号，并且不在字符串内，则进入字符串状态
        if ((c == '\\'' || c == '\\"') && !inString) {
            inString = true;
            stringDelimiter = c;
            isEmpty = false;
            continue;
        }

        // 如果在字符串内，并且遇到了相同的分隔符，则检查是否为转义
        if (c == stringDelimiter && inString) {
            if (nextChar == stringDelimiter) {
                i++; // 跳过转义的引号
            } else {
                inString = false; // 字符串结束
            }
            continue;
        }

        // 如果遇到分号，并且不在字符串内，则增加计数器
        if (c == ';' && !inString) {
            if (!isEmpty) {
                count++;
                isEmpty = true;
            }
            continue;
        }

        // 如果遇到非空白字符，并且不在字符串内，则标记为非空文本
        if (!isspace(c) && !inString) {
            isEmpty = false;
        }
    }

    // 如果最后一个文本没有闭合的分号，则增加计数器
    if (!isEmpty) {
        count++; // 最后一个文本没有闭合分号
    }

    return count;
}
// 主函数
int main() {
    // 创建字符串用于获取用户输入
    std::string input;
    // 获取用户输入直到EOF
    for (std::string line; std::getline(std::cin, line);) {
        // 将读取的每一行追加到input字符串，并添加换行符
        input += line + "\\n";
    }
    // 输出文本统计结果
    std::cout << countTexts(input) << std::endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <ctype.h>

// 定义最大输入长度
#define MAX_INPUT_LENGTH 10000

// 函数声明：统计文本中的文本数量
int countTexts(const char *input);

int main() {
    // 用来存储输入的字符数组
    char input[MAX_INPUT_LENGTH] = {0};
    // 临时字符串存储一行输入
    char temp[256];
 
 
    // 循环读取输入直到EOF（文件结束标志）
    while (fgets(temp, sizeof(temp), stdin) != NULL) {
        // 将临时字符串追加到输入数组中
        strcat(input, temp);
    }

    // 输出文本统计结果
    printf("%d\\n", countTexts(input));

    return 0;
}

// 实现统计文本数量的函数
int countTexts(const char *input) {
    // 初始化计数器
    int count = 0;
    // 标记是否在字符串内部
    bool inString = false;
    // 标记是否在注释内部
    bool inComment = false;
    // 记录字符串分隔符
    char stringDelimiter = 0;
    // 标记当前是否为空文本
    bool isEmpty = true;

    // 遍历输入文本的每个字符
    for (int i = 0; input[i] != '\\0'; i++) {
        char c = input[i];
        char nextChar = input[i + 1];

        // 处理注释
        if (inComment) {
            if (c == '\\n') {
                inComment = false;
            }
            continue;
        }

        // 进入注释状态
        if (c == '-' && nextChar == '-' && !inString) {
            inComment = true;
            i++; // 跳过下一个减号
            continue;
        }

        // 进入字符串状态
        if ((c == '\\'' || c == '\\"') && !inString) {
            inString = true;
            stringDelimiter = c;
            isEmpty = false;
            continue;
        }

        // 结束字符串状态
        if (c == stringDelimiter && inString) {
            if (nextChar == stringDelimiter) {
                i++; // 跳过转义的引号
            } else {
                inString = false;
            }
            continue;
        }

        // 处理分号，增加计数
        if (c == ';' && !inString) {
            if (!isEmpty) {
                count++;
                isEmpty = true;
            }
            continue;
        }

        // 处理非空白字符
        if (!isspace(c) && !inString) {
            isEmpty = false;
        }
    }

    // 处理没有闭合分号的最后一个文本
    if (!isEmpty) {
        count++;
    }

    return count;
}`},p={id:"144",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:r,solution:c,codes:s};export{s as codes,p as default,i as description,u as examType,r as examples,o as id,t as inputDesc,e as outputDesc,a as score,c as solution,n as title};
