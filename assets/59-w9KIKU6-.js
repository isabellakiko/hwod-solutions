const r="59",n="高矮个子排队",o="A",a=100,i=`现在有一队小朋友，他们高矮不同，我们以正整数数组表示这一队小朋友的身高，如数组{5,3,1,2,3}。
我们现在希望小朋友排队，以“高”“矮”“高”“矮”顺序排列，每一个“高”位置的小朋友要比相邻的位置高或者相等；每一个“矮”位置的小朋友要比相邻的位置矮或者相等；
要求小朋友们移动的距离和最小，第一个从“高”位开始排，输出最小移动距离即可。
例如，在示范小队{5,3,1,2,3}中，{5, 1, 3, 2, 3}是排序结果。
{5, 2, 3, 1, 3} 虽然也满足“高”“矮”“高”“矮”顺序排列，但小朋友们的移动距离大，所以不是最优结果。
移动距离的定义如下所示：
第二位小朋友移到第三位小朋友后面，移动距离为1，若移动到第四位小朋友后面，移动距离为2；`,t=`排序前的小朋友，以英文空格的正整数：
4 3 5 7 8
注：小朋友<100个`,s=`排序后的小朋友，以英文空格分割的正整数：4 3 7 5 8
备注：4（高）3（矮）7（高）5（矮）8（高）， 输出结果为最小移动距离，只有5和7交换了位置，移动距离都是1。`,e=[{input:"5 3 1 2 3",output:"5 1 3 2 3",explanation:`原序列：5(高) 3(矮) 1(高) 2(矮) 3(高)
位置0高、位置1矮：5>3符合
位置1矮、位置2高：3>1不符合，交换→5 1 3 2 3
后续位置都符合要求。`},{input:"4 3 5 7 8",output:"4 3 7 5 8",explanation:`位置2高、位置3矮：5<7不符合，交换5和7。
结果：4(高)3(矮)7(高)5(矮)8(高)`},{input:"1 1 1 1",output:"1 1 1 1",explanation:"所有相等，无需交换。相邻位置可以相等。"},{input:"xxx",output:"[]",explanation:"非法参数，返回空数组。"}],h=`**解题思路：**

本题是一道**贪心+相邻交换**问题。

**关键点：**
题目要求从"高"位开始，发现不符合就交换相邻元素。

**算法步骤：**

1. 遍历相邻元素对
2. 偶数位置应为"高"：期望heights[i] >= heights[i+1]
3. 奇数位置应为"矮"：期望heights[i] <= heights[i+1]
4. 不符合要求时交换相邻两个元素

**判断条件：**
\`(heights[i] > heights[j]) != (i % 2 == 0)\` 时需要交换

**时间复杂度**：O(N)`,g={java:`import java.util.*;   

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);   
        String s = sc.nextLine();   

        // 使用正则表达式检查输入字符串是否只包含数字和空格
        // 如果字符串中包含非法字符（非数字或空格），则输出"[]"并退出程序
        if (!s.matches("[0-9\\\\s]+")) {
            System.out.println("[]");
            return;
        }

        // 将输入字符串按空格分割，并将每个部分转换为整数，存储在数组heights中
        int[] heights = Arrays.stream(s.split(" ")).mapToInt(Integer::parseInt).toArray();

        // 初始化两个指针i和j，分别指向相邻的两个小朋友
        int i = 0, j = 1;

        // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
        while (j < heights.length) {
            // 判断当前两个相邻小朋友的身高是否满足要求
            // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
            // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
            if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
                // 交换heights[i]和heights[j]的值
                int tmp = heights[i];
                heights[i] = heights[j];
                heights[j] = tmp;
            }

            // 移动指针，检查下一个相邻的小朋友
            i++;
            j++;
        }

        // 使用StringJoiner将排序后的身高数组转换为字符串，并以空格分隔
        StringJoiner sj = new StringJoiner(" ");
        for (int h : heights) {  // 遍历heights数组中的每一个元素
            sj.add(String.valueOf(h));  // 将元素转换为字符串并添加到StringJoiner中
        }
        // 输出最终排序结果
        System.out.println(sj.toString());
    }
}`,python:`import re

s = input()
if not re.match(r"[0-9\\s]+", s):
    print("[]")
    exit()

heights = list(map(int, s.split()))

i = 0
j = 1

while j < len(heights):
    if heights[i] != heights[j] and (heights[i] > heights[j]) != (i % 2 == 0):
        heights[i], heights[j] = heights[j], heights[i]
        
    i += 1
    j += 1

result = " ".join(map(str, heights))
print(result)`,javascript:`const readline = require('readline');

 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 
rl.on('line', (s) => {
    // 使用正则表达式检查输入字符串是否只包含数字和空格
    // 如果字符串中包含非法字符（非数字或空格），则输出"[]"并退出程序
    if (!/^[0-9\\s]+$/.test(s)) {
        console.log("[]");
        rl.close();  // 关闭接口
        return;
    }

    // 将输入字符串按空格分割，并将每个部分转换为整数，存储在数组heights中
    let heights = s.split(' ').map(Number);

    // 初始化两个指针i和j，分别指向相邻的两个小朋友
    let i = 0, j = 1;

    // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
    while (j < heights.length) {
        // 判断当前两个相邻小朋友的身高是否满足要求
        // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
        // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
        if (heights[i] !== heights[j] && (heights[i] > heights[j]) !== (i % 2 === 0)) {
            // 交换heights[i]和heights[j]的值
            [heights[i], heights[j]] = [heights[j], heights[i]];
        }

        // 移动指针，检查下一个相邻的小朋友
        i++;
        j++;
    }

    // 将排序后的身高数组转换为字符串，并以空格分隔
    console.log(heights.join(' '));

    
});`,cpp:`#include <iostream>    // 包含输入输出流库
#include <sstream>     // 包含字符串流库，用于处理字符串
#include <string>      // 包含字符串库
#include <vector>      // 包含向量库，用于动态数组
using namespace std;

int main() {
    string s;
    // 从标准输入读取一行字符串，存储在变量s中
    getline(cin, s);

    // 检查输入字符串中是否包含非数字或空格的字符
    // 如果发现非法字符（非数字或空格），则输出"[]"并退出程序
    if (s.find_first_not_of("0123456789 ") != string::npos) {
        cout << "[]" << endl;
        return 0;
    }

    // 使用字符串流将字符串s按空格分割，并依次转化为整数存入向量heights中
    istringstream iss(s);
    vector<int> heights;  // 定义一个整型向量用于存储小朋友的身高
    int height;
    while (iss >> height) {  // 从字符串流中读取一个整数，并存入heights向量
        heights.push_back(height);
    }

    // 初始化两个索引i和j，分别指向相邻的两个小朋友
    int i = 0, j = 1;
    while (j < heights.size()) {  // 遍历向量，直到处理完所有元素
        // 检查当前两个相邻位置是否满足"高矮高矮"的排列要求
        // 如果heights[i] > heights[j] 且 i 是偶数，或者 heights[i] < heights[j] 且 i 是奇数
        // 则说明当前排列不符合要求，需要交换两个元素的位置
        if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
            // 交换 heights[i] 和 heights[j] 的值
            int tmp = heights[i];
            heights[i] = heights[j];
            heights[j] = tmp;
        }
        // 移动索引i和j，继续检查下一个相邻的元素对
        i++;
        j++;
    }

    // 将调整后的向量heights中的元素转换为字符串，准备输出
    string result;
    for (int h : heights) {  // 遍历向量中的每一个元素
        result += to_string(h) + " ";  // 将元素转换为字符串并拼接到result中，以空格分隔
    }
    result.pop_back();  // 移除最后一个多余的空格
    cout << result << endl;  // 输出最终的排列结果

    return 0;  // 程序结束
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// 函数声明
int is_valid_input(const char* s);
int* split_and_convert(const char* s, int* size);
void swap(int* a, int* b);

int main() {
    char s[1024];
    fgets(s, sizeof(s), stdin);  // 读取用户输入

    // 检查输入字符串是否只包含数字和空格
    if (!is_valid_input(s)) {
        printf("[]\\n");
        return 0;
    }

    int size;
    int* heights = split_and_convert(s, &size);  // 将输入字符串分割并转换为整数数组

    // 初始化两个指针i和j，分别指向相邻的两个小朋友
    int i = 0, j = 1;

    // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
    while (j < size) {
        // 判断当前两个相邻小朋友的身高是否满足要求
        // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
        // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
        if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
            // 交换heights[i]和heights[j]的值
            swap(&heights[i], &heights[j]);
        }

        // 移动指针，检查下一个相邻的小朋友
        i++;
        j++;
    }

    // 输出最终排序结果
    for (int k = 0; k < size; k++) {
        if (k > 0) {
            printf(" ");
        }
        printf("%d", heights[k]);
    }
    printf("\\n");

    free(heights);  // 释放动态分配的内存
    return 0;
}

// 检查输入字符串是否只包含数字和空格
int is_valid_input(const char* s) {
    while (*s) {
        if (!isdigit(*s) && !isspace(*s)) {
            return 0;  // 非法字符
        }
        s++;
    }
    return 1;
}

// 将输入字符串按空格分割并转换为整数数组
int* split_and_convert(const char* s, int* size) {
    int* heights = malloc(1024 * sizeof(int));  // 假设数组最大长度为1024
    *size = 0;

    char* token = strtok(strdup(s), " ");
    while (token != NULL) {
        heights[(*size)++] = atoi(token);
        token = strtok(NULL, " ");
    }
    return heights;
}

// 交换两个整数的值
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`},c={id:"59",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:s,examples:e,solution:h,codes:g};export{g as codes,c as default,i as description,o as examType,e as examples,r as id,t as inputDesc,s as outputDesc,a as score,h as solution,n as title};
