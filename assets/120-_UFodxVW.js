const u="120",n="字符串拼接",g="A",a=200,t=`给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，
要求相同的字符不能相邻，计算出给定的字符列表能拼接出多少种满足条件的字符串，
输入非法或者无法拼接出满足条件的字符串则返回0。`,i='给定的字符列表和结果字符串长度，中间使用空格(" ")拼接',e=`满足条件的字符串个数
输入
输出
说明
只能构成ab,ba。
输入
输出
说明
可以构成：ab ac ba bc ca cb 。`,s=[{input:"ab 2",output:"2",explanation:"可构成ab、ba两种，相邻不同"},{input:"abc 2",output:"6",explanation:"可构成ab、ac、ba、bc、ca、cb共6种"}],r=`**解题思路：**

本题是一道**回溯+剪枝**问题。

**核心思路：**
- 从M个字符中选N个排列
- 相邻字符不能相同
- 用used数组标记已使用字符

**剪枝条件：**
- 当前字符已被使用
- 当前字符与上一个相同
- 相同字符去重（排序后跳过）

**算法步骤：**
1. 遍历所有字符
2. 检查是否可用（未用且与前一个不同）
3. 标记使用，递归下一层
4. 回溯，取消标记

**时间复杂度**：O(M!/(M-N)!)`,c={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 创建一个Scanner对象来读取用户的输入
        Scanner sc = new Scanner(System.in);
        // 读取用户输入的字符串
        String input = sc.nextLine();
        // 将输入的字符串按空格分割为两部分，分别为字符串和长度
        String[] parts = input.split(" ");
        String str = parts[0]; // 获取输入的字符串
        int length = Integer.parseInt(parts[1]); // 将输入的长度部分转换为整数

        // 调用countDistinctStrings方法计算满足条件的不同字符串的数量
        int count = countDistinctStrings(str, length);
        // 输出计算结果
        System.out.println(count);
    }

    // 计算满足条件的不同字符串的数量
    public static int countDistinctStrings(String str, int length) {
        // 创建一个HashSet来存储不同的字符串
        HashSet<String> set = new HashSet<>();
        // 创建一个boolean数组来标记字符串中的字符是否已经被使用
        boolean[] used = new boolean[str.length()];
        // 调用generateDistinctStrings方法生成满足条件的不同字符串
        generateDistinctStrings(str, length, "", set, used);
        // 打印生成的所有不同的字符串
        // for(String str1 : set){
           // System.out.println(str1);
        // }
        // 返回不同字符串的数量
        return set.size();
    }

    // 递归生成满足条件的不同字符串
    public static void generateDistinctStrings(String str, int length, String current, HashSet<String> set, boolean[] used) {
        // 当生成的字符串长度等于指定长度时，将其加入到HashSet中
        if (current.length() == length) {
            set.add(current);
            return;
        }

        // 遍历字符串中的字符
        for (int i = 0; i < str.length(); i++) {
            // 判断字符是否已经被使用，或者当前字符与前一个字符相同
            if (used[i] || (current.length() > 0 && current.charAt(current.length() - 1) == str.charAt(i))) {
                continue; // 如果字符已被使用或与前一个字符相同，则跳过当前字符
            }
            used[i] = true; // 标记当前字符为已使用
            // 递归调用生成下一个字符
            generateDistinctStrings(str, length, current + str.charAt(i), set, used);
            used[i] = false; // 取消标记当前字符的使用状态，以便下一次遍历
        }
    }
}`,python:`# 导入所需的模块
from collections import defaultdict

# 递归生成满足条件的不同字符串
def generate_distinct_strings(s, length, current, result, used):
    # 当生成的字符串长度等于指定长度时，将其加入到结果集中
    if len(current) == length:
        result.add(current)
        return

    # 遍历字符串中的字符
    for i in range(len(s)):
        # 判断字符是否已经被使用，或者当前字符与前一个字符相同
        if used[i] or (len(current) > 0 and current[-1] == s[i]):
            continue  # 如果字符已被使用或与前一个字符相同，则跳过当前字符
        used[i] = True  # 标记当前字符为已使用
        # 递归调用生成下一个字符
        generate_distinct_strings(s, length, current + s[i], result, used)
        used[i] = False  # 取消标记当前字符的使用状态，以便下一次遍历

# 计算满足条件的不同字符串的数量
def count_distinct_strings(s, length):
    # 创建一个集合来存储不同的字符串
    distinct_strings = set()
    # 创建一个列表来标记字符串中的字符是否已经被使用
    used = [False] * len(s)
    # 调用generate_distinct_strings方法生成满足条件的不同字符串
    generate_distinct_strings(s, length, "", distinct_strings, used)
    # 打印生成的所有不同的字符串
    # for string in distinct_strings:
       # print(string)
    # 返回不同字符串的数量
    return len(distinct_strings)

# 读取用户输入的字符串
input_str = input()
# 将输入的字符串按空格分割为两部分，分别为字符串和长度
parts = input_str.split(" ")
s = parts[0]  # 获取输入的字符串
length = int(parts[1])  # 将输入的长度部分转换为整数

# 调用count_distinct_strings方法计算满足条件的不同字符串的数量
count = count_distinct_strings(s, length)
# 输出计算结果
print(count)`,javascript:"",cpp:`#include <iostream>
#include <unordered_set>
#include <vector>
#include <sstream>

using namespace std;

// 递归生成满足条件的不同字符串
void generateDistinctStrings(string s, int length, string current, unordered_set<string>& result, vector<bool>& used) {
    // 当生成的字符串长度等于指定长度时，将其加入到结果集中
    if (current.length() == length) {
        result.insert(current);
        return;
    }

    // 遍历字符串中的字符
    for (int i = 0; i < s.length(); i++) {
        // 判断字符是否已经被使用，或者当前字符与前一个字符相同
        if (used[i] || (current.length() > 0 && current.back() == s[i])) {
            continue;  // 如果字符已被使用或与前一个字符相同，则跳过当前字符
        }
        used[i] = true;  // 标记当前字符为已使用
        // 递归调用生成下一个字符
        generateDistinctStrings(s, length, current + s[i], result, used);
        used[i] = false;  // 取消标记当前字符的使用状态，以便下一次遍历
    }
}

// 计算满足条件的不同字符串的数量
int countDistinctStrings(string s, int length) {
    // 创建一个集合来存储不同的字符串
    unordered_set<string> distinctStrings;
    // 创建一个列表来标记字符串中的字符是否已经被使用
    vector<bool> used(s.length(), false);
    // 调用generateDistinctStrings方法生成满足条件的不同字符串
    generateDistinctStrings(s, length, "", distinctStrings, used);
    // 打印生成的所有不同的字符串
    // for (auto& str : distinctStrings) {
       // cout << str << endl;
    // }
    // 返回不同字符串的数量
    return distinctStrings.size();
}

int main() {
    string input;
    getline(cin, input);
    // 将输入的字符串按空格分割为两部分，分别为字符串和长度
    string str;
    int length;
    istringstream iss(input);
    iss >> str >> length;

    // 调用countDistinctStrings方法计算满足条件的不同字符串的数量
    int count = countDistinctStrings(str, length);
    // 输出计算结果
    cout <<  count << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 31

char inputString[MAX_SIZE];  // 存储输入的字符串
int stringLength;            // 存储输入字符串的长度
int targetLength;            // 目标排列的长度
int validCount = 0;          // 符合条件的排列个数

// 比较函数，用于qsort
int compare(const void *a, const void *b) {
    return (*(char *)a - *(char *)b);
}

void generateDistinctStrings(int lastUsedIndex, int currentLength, int usedFlags[]) {
    if (currentLength == targetLength) {
        validCount++;
        return;
    }

    for (int i = 0; i < stringLength; i++) {
        if (usedFlags[i]) continue;
        if (lastUsedIndex >= 0 && inputString[i] == inputString[lastUsedIndex]) continue;
        // 优化的树层去重逻辑
        if (i > 0 && inputString[i] == inputString[i - 1] && !usedFlags[i - 1]) continue;

        usedFlags[i] = 1;
        generateDistinctStrings(i, currentLength + 1, usedFlags);
        usedFlags[i] = 0;
    }
}

int main() {
    scanf("%s %d", inputString, &targetLength);
    stringLength = strlen(inputString);

    // 对输入字符串排序
    qsort(inputString, stringLength, sizeof(char), compare);

    int usedFlags[MAX_SIZE] = {0};
    generateDistinctStrings(-1, 0, usedFlags);

    printf("%d\\n", validCount);

    return 0;
}`},o={id:"120",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:e,examples:s,solution:r,codes:c};export{c as codes,o as default,t as description,g as examType,s as examples,u as id,i as inputDesc,e as outputDesc,a as score,r as solution,n as title};
