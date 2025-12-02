const r="109",u="猜字谜",l="A",d=100,n=`小王设计了一个简单的猜字谜游戏，游戏的谜面是一个错误的单词，比如nesw，玩家需要猜出谜底库中正确的单词。猜中的要求如下： 对于某个谜面和谜底单词，满足下面任一条件都表示猜中：
变换顺序以后一样的，比如通过变换w和e的顺序，“nwes”跟“news”是可以完全对应的；字母去重以后是一样的，比如“woood”和“wood”是一样的，它们去重后都是“wod”
请你写一个程序帮忙在谜底库中找到正确的谜底。谜面是多个单词，都需要找到对应的谜底，如果找不到的话，返回”not found”`,t='谜面单词列表，以“,”分隔谜底库单词列表，以","分隔',e="输出匹配到的谜底单词，以逗号分隔。找不到的输出not found",o=[{input:`bdni,wooood
bind,wrong,wood`,output:"bind,wood",explanation:"bdni排序去重后=bdni，bind排序去重后=bdni，匹配成功。wooood去重排序=dow，wood去重排序=dow，匹配成功"}],s=`**解题思路：**

本题是一道**字符串处理**问题。

**核心思路：**
- 猜中条件：变换顺序或去重后一样
- 对谜面和谜底进行去重+排序后比较

**算法步骤：**
1. 对谜面单词去重并排序
2. 对谜底库每个单词去重并排序
3. 比较处理后的字符串是否相等
4. 找不到匹配则输出not found

**时间复杂度**：O(M×N×L)`,i={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 读取谜面单词列表，以逗号分隔
        String[] puzzleWords = scanner.nextLine().split(",");
        // 读取谜底库单词列表，以逗号分隔
        String[] answerBank = scanner.nextLine().split(",");
        // 创建一个列表，用于存储匹配到的正确单词
        List<String> matchedAnswers = new ArrayList<>();

        // 遍历谜面单词列表
        for (String puzzleWord : puzzleWords) {
            // 去除谜面单词中的重复字母，TreeSet自动升序排序
            String puzzleWordNoDuplicate = String.join("", new TreeSet<>(Arrays.asList(puzzleWord.split(""))));
            // 标记是否匹配到对应的谜底
            boolean isFound = false;

            // 遍历谜底库单词列表
            for (String answer : answerBank) {
                // 去除谜底单词中的重复字母，TreeSet自动升序排序
                String answerNoDuplicate = String.join("", new TreeSet<>(Arrays.asList(answer.split(""))));

                // 如果去重后的谜面单词与谜底单词相同，则将谜底单词添加到结果列表中，并将 isFound 标记为 true
                if (puzzleWordNoDuplicate.equals(answerNoDuplicate)) {
                    matchedAnswers.add(answer);
                    isFound = true;
                }
            }

            // 如果没有找到匹配的单词，则将 "not found" 添加到结果列表中
            if (!isFound) {
                matchedAnswers.add("not found");
            }
        }

        // 输出匹配到的正确单词列表，以逗号分隔
        System.out.println(String.join(",", matchedAnswers));
    }
}`,python:`puzzle_words = input().split(",")
word_bank = input().split(",")

# 用于存储匹配到的正确单词列表
matched_words = []

# 遍历每个谜面
for puzzle_word in puzzle_words:
    # 将谜面中的字符去重并排序
    sorted_puzzle_word = "".join(sorted(set(puzzle_word)))
    # 标记是否找到匹配的谜底
    found = False

    # 遍历每个谜底
    for word in word_bank:
        # 将谜底中的字符去重并排序
        sorted_word = "".join(sorted(set(word)))

        # 判断谜底是否与谜面匹配
        if sorted_puzzle_word == sorted_word:
            # 将匹配到的谜底添加到结果列表中
            matched_words.append(word)
            # 标记为已找到匹配的谜底
            found = True

    # 如果没有找到匹配的谜底，将"not found"添加到结果列表中
    if not found:
        matched_words.append("not found")

# 输出匹配到的正确单词列表，以","分隔
print(",".join(matched_words))`,javascript:`// 导入 readline 模块，用于从标准输入读取数据
const readline = require('readline');

// 创建 readline 接口实例，用于处理输入输出
const rl = readline.createInterface({
  input: process.stdin, // 指定标准输入流
  output: process.stdout // 指定标准输出流
});

// 监听第一个输入行，即谜面单词列表
rl.on('line', (puzzleInput) => {
  // 监听第二个输入行，即谜底库单词列表
  rl.on('line', (answerBankInput) => {
    // 将谜面单词列表按照逗号分隔成数组
    const puzzles = puzzleInput.split(',');
    // 将谜底库单词列表按照逗号分隔成数组
    const answerBank = answerBankInput.split(',');
    // 用于存储匹配到的正确单词
    const matchedAnswers = [];

    // 遍历每一个谜面单词
    for (let puzzleIndex = 0; puzzleIndex < puzzles.length; puzzleIndex++) {
      // 对谜面单词进行排序并去重
      const sortedPuzzle = puzzles[puzzleIndex].split('') // 将单词分割成字符数组
        .sort() // 对字符数组进行排序
        .filter((char, index, array) => {
          // 通过过滤函数去重，保留第一次出现的字符
          return index === 0 || char !== array[index - 1];
        })
        .join(''); // 将处理后的字符数组重新组合成字符串

      let found = false; // 用于标记当前谜面是否找到匹配的正确单词

      // 遍历谜底库中的每一个单词
      for (let answerIndex = 0; answerIndex < answerBank.length; answerIndex++) {
        // 对谜底单词进行排序并去重，方法同上
        const sortedAnswer = answerBank[answerIndex].split('')
          .sort()
          .filter((char, index, array) => {
            return index === 0 || char !== array[index - 1];
          })
          .join('');

        // 如果处理后的谜面单词和谜底单词相同，则表示匹配成功
        if (sortedPuzzle === sortedAnswer) {
          // 将匹配到的谜底单词加入结果数组
          matchedAnswers.push(answerBank[answerIndex]);
          found = true; // 标记为已找到匹配
          break; // 一旦找到匹配的正确单词，跳出当前循环
        }
      }

      // 如果没有找到匹配的正确单词，加入"not found"标记
      if (!found) {
        matchedAnswers.push("not found");
      }
    }

    // 将匹配到的正确单词以逗号分隔的形式输出
    console.log(matchedAnswers.join(', '));
    rl.close(); // 关闭 readline 接口
  });
});`,cpp:`#include <iostream>
#include <algorithm>  
#include <vector>  
#include <string> 

using namespace std;

int main() {
    string input_puzzles, input_solutions;
    
 
    getline(cin, input_puzzles); // 读取第一行谜面单词列表
    getline(cin, input_solutions); // 读取第二行谜底单词列表

    vector<string> puzzles, solutions;
    string temp = "";
    
    // 将输入的谜面单词列表以“,”分隔并存储在puzzles向量中
    for (char c : input_puzzles) {
        if (c == ',') {
            puzzles.push_back(temp); // 遇到逗号，将temp中的单词加入puzzles
            temp = ""; // 重置temp
        } else {
            temp += c; // 将字符加入temp
        }
    }
    puzzles.push_back(temp); // 将最后一个单词加入puzzles

    temp = "";
    // 将输入的谜底库单词列表以“,”分隔并存储在solutions向量中
    for (char c : input_solutions) {
        if (c == ',') {
            solutions.push_back(temp); // 遇到逗号，将temp中的单词加入solutions
            temp = ""; // 重置temp
        } else {
            temp += c; // 将字符加入temp
        }
    }
    solutions.push_back(temp); // 将最后一个单词加入solutions

    vector<string> matched_solutions; // 用于存储匹配到的谜底单词
    // 遍历每个谜面单词
    for (string puzzle : puzzles) {
        string sorted_puzzle = puzzle;
        sort(sorted_puzzle.begin(), sorted_puzzle.end()); // 对谜面单词排序
        sorted_puzzle.erase(unique(sorted_puzzle.begin(), sorted_puzzle.end()), sorted_puzzle.end()); // 去重

        bool found = false; // 标记是否找到匹配的谜底单词

        // 遍历谜底库中的每个单词
        for (string solution : solutions) {
            string sorted_solution = solution;
            sort(sorted_solution.begin(), sorted_solution.end()); // 对谜底单词排序
            sorted_solution.erase(unique(sorted_solution.begin(), sorted_solution.end()), sorted_solution.end()); // 去重

            if (sorted_puzzle == sorted_solution) { // 如果排序去重后的结果相同
                matched_solutions.push_back(solution); // 将该谜底单词加入匹配结果中
                found = true; // 标记为找到匹配
                break; // 跳出当前循环
            }
        }

        if (!found) { // 如果未找到匹配的谜底单词
            matched_solutions.push_back("not found"); // 加入"not found"
        }
    }

    // 输出第一个匹配结果
    cout << matched_solutions[0];
    // 输出剩余的匹配结果，中间以逗号分隔
    for (int i = 1; i < matched_solutions.size(); i++) {
        cout << "," << matched_solutions[i];
    }

    return 0; // 程序结束
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 自定义比较函数，用于qsort中的字符排序
int compare(const void *a, const void *b) {
    return *(char *)a - *(char *)b;
}

// 去重函数，将字符串中的重复字符移除
void remove_duplicates(char *str) {
    int length = strlen(str);
    if (length < 2) return;

    int j = 0;
    for (int i = 1; i < length; i++) {
        if (str[i] != str[j]) {
            j++;
            str[j] = str[i];
        }
    }
    str[j + 1] = '\\0';
}

int main() {
    char input_puzzles[1000], input_solutions[1000];

    // 从标准输入读取谜面和谜底列表
    fgets(input_puzzles, sizeof(input_puzzles), stdin); // 读取第一行谜面单词列表
    fgets(input_solutions, sizeof(input_solutions), stdin); // 读取第二行谜底单词列表

    // 移除字符串末尾的换行符
    input_puzzles[strcspn(input_puzzles, "\\n")] = '\\0';
    input_solutions[strcspn(input_solutions, "\\n")] = '\\0';

    char *puzzles[1000];
    char *solutions[1000];
    int puzzle_count = 0, solution_count = 0;

    // 将谜面单词列表以“,”分隔并存储在puzzles数组中
    char *token = strtok(input_puzzles, ",");
    while (token != NULL) {
        puzzles[puzzle_count++] = strdup(token); // 将分隔出的单词到puzzles中
        token = strtok(NULL, ",");
    }

    // 将谜底库单词列表以“,”分隔并存储在solutions数组中
    token = strtok(input_solutions, ",");
    while (token != NULL) {
        solutions[solution_count++] = strdup(token); // 将分隔出的单词到solutions中
        token = strtok(NULL, ",");
    }

    char *matched_solutions[1000];
    int match_count = 0;

    // 遍历每个谜面单词
    for (int i = 0; i < puzzle_count; i++) {
        char sorted_puzzle[1000];
        strcpy(sorted_puzzle, puzzles[i]);
        qsort(sorted_puzzle, strlen(sorted_puzzle), sizeof(char), compare); // 对谜面单词排序
        remove_duplicates(sorted_puzzle); // 去重

        int found = 0; // 标记是否找到匹配的谜底单词

        // 遍历谜底库中的每个单词
        for (int j = 0; j < solution_count; j++) {
            char sorted_solution[1000];
            strcpy(sorted_solution, solutions[j]);
            qsort(sorted_solution, strlen(sorted_solution), sizeof(char), compare); // 对谜底单词排序
            remove_duplicates(sorted_solution); // 去重

            if (strcmp(sorted_puzzle, sorted_solution) == 0) { // 如果排序去重后的结果相同
                matched_solutions[match_count++] = solutions[j]; // 将该谜底单词加入匹配结果中
                found = 1; // 标记为找到匹配
                break; // 跳出当前循环
            }
        }

        if (!found) { // 如果未找到匹配的谜底单词
            matched_solutions[match_count++] = "not found"; // 加入"not found"
        }
    }

    // 输出第一个匹配结果
    printf("%s", matched_solutions[0]);
    // 输出剩余的匹配结果，中间以逗号分隔
    for (int i = 1; i < match_count; i++) {
        printf(",%s", matched_solutions[i]);
    }

    // 释放动态分配的内存
    for (int i = 0; i < puzzle_count; i++) {
        free(puzzles[i]);
    }
    for (int i = 0; i < solution_count; i++) {
        free(solutions[i]);
    }

    return 0;  
}`},p={id:"109",title:"猜字谜",examType:"A",score:100,description:n,inputDesc:t,outputDesc:e,examples:o,solution:s,codes:i};export{i as codes,p as default,n as description,l as examType,o as examples,r as id,t as inputDesc,e as outputDesc,d as score,s as solution,u as title};
