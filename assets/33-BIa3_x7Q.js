const u="33",o="最大值",a="A",c=100,n=`给定一组整数（非负），重排顺序后输出一个最大的整数。
示例1
输入：[10,9]
输出：910
说明:输出结果可能非常大，所以你需要返回一个字符串而不是整数。`,t="数字组合",s="最大的整数",r=[{input:"10 9",output:"910",explanation:"将10和9拼接，910 > 109，所以9应该在10前面。"},{input:"3 30 34 5 9",output:"9534330",explanation:`按自定义规则排序：9 > 5 > 34 > 3 > 30
拼接结果：9534330`},{input:"0 0",output:"0",explanation:"全是0时，应返回单个0，而不是00。"}],e=`**解题思路：**

本题是一道**自定义排序**问题（LeetCode 179）。

**核心思想：**
- 比较两个数a和b时，比较 a+b 和 b+a 的字符串大小
- 如果 a+b > b+a，则a应排在b前面

**算法步骤：**

1. 将所有数字转为字符串
2. 使用自定义比较函数排序：比较 str(a)+str(b) 和 str(b)+str(a)
3. 将排序后的字符串拼接
4. 去除前导零（特殊情况：全0返回"0"）

**时间复杂度**：O(n log n)`,i={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 读取输入
        Scanner sc = new Scanner(System.in);
        String[] input = sc.nextLine().split(" ");  // 读取并拆分输入
        int[] nums = new int[input.length];
        
        // 将输入的字符串数组转换为整数数组
        for (int i = 0; i < input.length; i++) {
            nums[i] = Integer.parseInt(input[i]);
        }
        
       
        int n = nums.length;
        String[] ss = new String[n];
        
        // 将整数数组转换为字符串数组
        for (int i = 0; i < n; i++) {
            ss[i] = String.valueOf(nums[i]);
        }

        // 自定义排序规则，比较两个字符串拼接后的大小
        Arrays.sort(ss, (a, b) -> {
            String sa = a + b, sb = b + a;
            return sb.compareTo(sa);  // 按照拼接后的字符串从大到小排序
        });

        // 拼接排序后的字符串
        StringBuilder sb = new StringBuilder();
        for (String s : ss) {
            sb.append(s);
        }

        // 去除多余的前导零
        int len = sb.length();
        int k = 0;
        while (k < len - 1 && sb.charAt(k) == '0') {
            k++;
        }

        // 输出最终的结果字符串
        System.out.println(sb.substring(k));
    }
}`,python:`# 导入需要的模块
import functools

# 读取输入并分割
input_str = input().split()

# 将字符串数组转换为整数数组
nums = [int(i) for i in input_str]

# 将整数数组转换为字符串数组
str_nums = [str(num) for num in nums]

# 定义自定义排序规则，比较两个字符串拼接后的大小
def compare(a, b):
    if a + b > b + a:
        return -1
    elif a + b < b + a:
        return 1
    else:
        return 0

# 对字符串数组进行排序
str_nums.sort(key=functools.cmp_to_key(compare))

# 拼接排序后的字符串
result = ''.join(str_nums)

# 去除前导零，如果全是零，则只返回一个零
result = result.lstrip('0') or '0'

# 输出最终结果
print(result)`,javascript:`const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
 

  // 将后续的输入处理为整数数组
  const nums = line.split(" ").map(Number);

  // 将整数数组转换为字符串数组
  let str_nums = nums.map(num => num.toString());

  // 自定义排序规则，比较两个字符串拼接后的大小
  str_nums.sort((a, b) => (b + a).localeCompare(a + b));

  // 拼接排序后的字符串
  let result = str_nums.join("");

  // 去除前导零，如果全是零，则只返回一个零
  result = result.replace(/^0+/, "") || "0";

  // 输出最终结果
  console.log(result);
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

// 自定义比较函数，比较拼接后的字符串
bool compare(const string &a, const string &b) {
    return a + b > b + a;
}

int main() {
    // 读取输入
    string input;
    getline(cin, input);
    
    vector<string> nums;
    string temp = "";
    
    // 将输入的字符串分割为单独的数字
    for (char c : input) {
        if (c == ' ') {
            nums.push_back(temp);
            temp = "";
        } else {
            temp += c;
        }
    }
    nums.push_back(temp);
    
    // 对字符串数组进行排序
    sort(nums.begin(), nums.end(), compare);
    
    // 拼接排序后的字符串
    string result = "";
    for (const string &num : nums) {
        result += num;
    }
    
    // 去除前导零
    int k = 0;
    while (k < result.size() - 1 && result[k] == '0') {
        k++;
    }
    
    // 输出最终结果
    cout << result.substr(k) << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 自定义比较函数，比较拼接后的字符串
int compare(const void *a, const void *b) {
    char sa[40], sb[40];
    strcpy(sa, *(const char **)a);
    strcat(sa, *(const char **)b);
    strcpy(sb, *(const char **)b);
    strcat(sb, *(const char **)a);
    return strcmp(sb, sa);
}

int main() {
    char input[1000];
    char *nums[500];
    int n = 0;

    // 读取输入
    fgets(input, sizeof(input), stdin);

    // 使用 strtok 分割输入的字符串
    char *token = strtok(input, " \\n");
    while (token != NULL) {
        nums[n++] = token;
        token = strtok(NULL, " \\n");
    }

    // 使用 qsort 排序
    qsort(nums, n, sizeof(char *), compare);

    // 拼接排序后的字符串
    char result[1000] = "";
    for (int i = 0; i < n; i++) {
        strcat(result, nums[i]);
    }

    // 去除前导零
    int k = 0;
    while (result[k] == '0' && result[k + 1] != '\\0') {
        k++;
    }

    // 输出最终结果
    printf("%s\\n", result + k);

    return 0;
}`},l={id:"33",title:"最大值",examType:"A",score:100,description:n,inputDesc:t,outputDesc:s,examples:r,solution:e,codes:i};export{i as codes,l as default,n as description,a as examType,r as examples,u as id,t as inputDesc,s as outputDesc,c as score,e as solution,o as title};
