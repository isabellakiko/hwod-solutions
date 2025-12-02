const a="165",n="字母组合过滤组合字符串",l="A",c=200,t=`每个数字关联多个字母，关联关系如下：
0 关联 “a”,”b”,”c”1 关联 “d”,”e”,”f”2 关联 “g”,”h”,”i”3 关联 “j”,”k”,”l”4 关联 “m”,”n”,”o”5 关联 “p”,”q”,”r”6 关联 “s”,”t”7 关联 “u”,”v”8 关联 “w”,”x”9 关联 “y”,”z”
输入一串数字后，通过数字和字母的对应关系可以得到多个字母字符串（要求按照数字的顺序组合字母字符串）；
屏蔽字符串：屏蔽字符串中的所有字母不能同时在输出的字符串出现，如屏蔽字符串是abc，则要求字符串中不能同时出现a,b,c，但是允许同时出现a,b或a,c或b,c等；
给定一个数字字符串和一个屏蔽字符串，输出所有可能的字符组合；
例如输入数字字符串78和屏蔽字符串ux，输出结果为uw，vw，vx；数字字符串78，可以得到如下字符串uw，ux，vw，vx；由于ux是屏蔽字符串，因此排除ux，最终的输出是uw，vw，vx;`,e=`第一行输入为一串数字字符串，数字字符串中的数字不允许重复，数字字符串的长度大于0，小于等于5；
第二行输入是屏蔽字符串，屏蔽字符串的长度一定小于数字字符串的长度，屏蔽字符串中字符不会重复；`,i=`输出可能的字符串组合
注：字符串之间使用逗号隔开，最后一个字符串后携带逗号`,s=[{input:`78
ux`,output:"uw,vw,vx,",explanation:"ux完全包含屏蔽字符串ux，因此剔除"},{input:`78
x`,output:"uw,vw,",explanation:""}],r=`这个题目的核心在于根据映射关系生成组合，然后剔除包含屏蔽字符串的组合。
数字与字母的映射关系：每个数字都映射到一组字母，例如数字0映射到字母’a’, ‘b’, ‘c’，数字1映射到’d’, ‘e’, ‘f’，以此类推。这个映射关系可以看作是类似于传统手机键盘上的数字与字母的对应关系。生成字母组合：用户输入一串不重复的数字字符串，题目要求按照数字的顺序生成所有可能的字母组合。例如，输入"78"，7对应’u’, ‘v’，8对应’w’, ‘x’，那么可以生成的组合是：uw, ux, vw, vx。屏蔽字符串的限制：屏蔽字符串中的所有字母不能同时出现在生成的字母组合中。也就是说，如果一个字母组合包含了屏蔽字符串中的所有字符，这个组合就需要被剔除。例如，如果屏蔽字符串是"ux"，那么组合中的ux会被剔除。`,d={java:`import java.util.HashSet;
import java.util.Scanner;

public class Main {
    static String[] map = {"abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 输入数字字符串
        char[] digits = sc.next().toCharArray();
        // 输入屏蔽字符串
        String filter = sc.next();

        // 根据数字字符串得到每个数字对应的字母字符串
        String[] letters = new String[digits.length];
        for (int i = 0; i < digits.length; i++) {
            letters[i] = map[digits[i] - '0'];
        }

        // 用于存储结果的字符串
        StringBuilder sb = new StringBuilder();
        // 开始进行深度优先搜索
        dfs(letters, 0, new StringBuilder(), sb, filter, new HashSet<>());

        // 输出结果
        System.out.println(sb.toString());
    }

    public static void dfs(
            String[] letters, int index, StringBuilder path, StringBuilder res, String filter, HashSet<Character> used) {
        if (index == letters.length) {
            // 过滤包含屏蔽字符串的路径
            if (!path.toString().contains(filter)) {
                res.append(path).append(",");
            }
            return;
        }

        // 对于每个数字，遍历其对应的字母字符串
        for (int i = 0; i < letters[index].length(); i++) {
            char c = letters[index].charAt(i);
            if (!used.contains(c)) {
                path.append(c);
                used.add(c);
                dfs(letters, index + 1, path, res, filter, used);
                path.deleteCharAt(path.length() - 1);
                used.remove(c);
            }
        }
    }
}`,python:`import sys

# 定义数字到字母的映射关系，map[0] 对应 'abc', map[1] 对应 'def'，依此类推
map = ["abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"]

# 深度优先搜索 (DFS) 递归函数
def dfs(letters, index, path, res, filter, used):
    # 如果当前索引等于字母组的长度，说明已经生成了一个完整的字母组合
    if index == len(letters):
        # 如果生成的组合不包含屏蔽字符串，则将其加入结果集
        if filter not in path:
            res.append(path + ",")
        return
    
    # 遍历当前索引位置对应的所有字母
    for i in range(len(letters[index])):
        c = letters[index][i]  # 当前字母
        # 如果当前字母尚未被使用
        if c not in used:
            path += c  # 将字母加入当前路径
            used.add(c)  # 标记字母为已使用
            # 递归调用下一层，处理下一个索引
            dfs(letters, index + 1, path, res, filter, used)
            path = path[:-1]  # 回溯，移除最后添加的字母
            used.remove(c)  # 取消字母的使用标记


digits = input().strip()  # 读取输入的数字字符串，并去除首尾空格
filter = input().strip()  # 读取输入的屏蔽字符串，并去除首尾空格

# 将输入的数字字符串转换为对应的字母组，如"78" -> ['uv', 'wx']
letters = [map[int(digit)] for digit in digits]

sb = ""  # 初始化一个空字符串，用于存储当前路径
res = []  # 结果列表，存储所有符合条件的字母组合
dfs(letters, 0, sb, res, filter, set())  # 调用DFS函数，开始递归搜索

# 输出结果，将结果列表中的元素连接成一个字符串并打印
print("".join(res))`,javascript:`const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义数字到字母的映射关系，类似于传统手机键盘上的字母排列
const map = ["abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"];

// 监听用户输入的第一行内容，即数字字符串
rl.on("line", (digits) => {
  // 监听用户输入的第二行内容，即屏蔽字符串
  rl.on("line", (filter) => {
    // 初始化一个数组，用于存储根据输入数字映射得到的字母组
    const letters = new Array(digits.length);
    for (let i = 0; i < digits.length; i++) {
      // 将每个数字转换成对应的字母组并存入数组
      letters[i] = map[parseInt(digits[i])];
    }

    const sb = []; // 存储最终的结果组合
    dfs(letters, 0, "", sb, filter, new Set()); // 调用DFS函数进行深度优先搜索

    // 输出结果，用逗号分隔各个字母组合
    console.log(sb.join(","));
    rl.close(); // 关闭读取接口
  });
});

// 深度优先搜索 (DFS) 递归函数
function dfs(letters, index, path, res, filter, used) {
  // 如果当前索引等于字母组的长度，说明已经生成了一个完整的字母组合
  if (index === letters.length) {
    // 如果生成的组合不包含屏蔽字符串，则将其加入结果集
    if (!path.includes(filter)) {
      res.push(path);
    }
    return;
  }

  // 遍历当前索引位置对应的所有字母
  for (let i = 0; i < letters[index].length; i++) {
    const c = letters[index][i];  // 当前字母
    // 如果当前字母尚未被使用
    if (!used.has(c)) {
      path += c;  // 将字母加入当前路径
      used.add(c);  // 标记字母为已使用
      // 递归调用下一层，处理下一个索引
      dfs(letters, index + 1, path, res, filter, used);
      path = path.slice(0, -1);  // 回溯，移除最后添加的字母
      used.delete(c);  // 取消字母的使用标记
    }
  }
}`,cpp:`#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

vector<string> map = {"abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"};

void dfs(
        vector<string>& letters, int index, string path, string& res, string& filter, unordered_set<char>& used) {
    if (index == letters.size()) {
        // 过滤包含屏蔽字符串的路径
        if (path.find(filter) == string::npos) {
            res += path + ",";
        }
        return;
    }

    // 对于每个数字，遍历其对应的字母字符串
    for (int i = 0; i < letters[index].length(); i++) {
        char c = letters[index][i];
        if (used.find(c) == used.end()) {
            path += c;
            used.insert(c);
            dfs(letters, index + 1, path, res, filter, used);
            path.pop_back();
            used.erase(c);
        }
    }
}

int main() {
    string digits;
    cin >> digits;
    string filter;
    cin >> filter;

    // 根据数字字符串得到每个数字对应的字母字符串
    vector<string> letters(digits.length());
    for (int i = 0; i < digits.length(); i++) {
        letters[i] = map[digits[i] - '0'];
    }

    // 用于存储结果的字符串
    string res = "";
    // 开始进行深度优先搜索
    unordered_set<char> used;
    dfs(letters, 0, "", res, filter, used);

    // 输出结果
    cout << res << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_LEN 100
#define RES_LEN 1000

// 定义一个常量映射数组，用于将数字映射到对应的字母字符串
const char *map[] = {"abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"};

// DFS函数声明
void dfs(char letters[][MAX_LEN], int num_digits, int index, char *path, int path_len, char *res, char *filter, int *used);

int main() {
    char digits[MAX_LEN];  // 用于存储输入的数字字符串
    char filter[MAX_LEN];  // 用于存储输入的屏蔽字符串

    // 输入数字字符串和屏蔽字符串
    scanf("%s", digits);
    scanf("%s", filter);

    int length = strlen(digits);
    char letters[length][MAX_LEN];  // 用于存储每个数字对应的字母字符串

    // 根据输入的数字字符串生成对应的字母字符串
    for (int i = 0; i < length; i++) {
        strcpy(letters[i], map[digits[i] - '0']);
    }

    char res[RES_LEN] = "";  // 用于存储结果的字符串
    char path[MAX_LEN] = "";  // 用于存储当前路径的字符串
    int used[128] = {0};  // 用于标记当前路径中已使用的字符

    // 开始进行深度优先搜索
    dfs(letters, length, 0, path, 0, res, filter, used);

    // 输出结果
    printf("%s\\n", res);

    return 0;
}

// DFS函数定义
void dfs(char letters[][MAX_LEN], int num_digits, int index, char *path, int path_len, char *res, char *filter, int *used) {
    // 如果当前索引等于字母组的长度，说明已经生成了一个完整的字母组合
    if (index == num_digits) {
        // 判断生成的路径是否包含屏蔽字符串
        if (strstr(path, filter) == NULL) {
            if (strlen(res) > 0) {
                strcat(res, ",");  // 添加逗号分隔符
            }
            strcat(res, path);
        }
        return;
    }

    // 遍历当前索引位置对应的所有字母
    for (int i = 0; letters[index][i] != '\\0'; i++) {
        char c = letters[index][i];  // 当前字母
        if (!used[(int)c]) {  // 如果当前字母尚未被使用
            path[path_len] = c;  // 将字母加入当前路径
            path[path_len + 1] = '\\0';
            used[(int)c] = 1;  // 标记字母为已使用
            // 递归调用下一层，处理下一个索引
            dfs(letters, num_digits, index + 1, path, path_len + 1, res, filter, used);
            // 回溯，移除最后添加的字母
            path[path_len] = '\\0';
            used[(int)c] = 0;  // 取消字母的使用标记
        }
    }
}`},p={id:"165",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:i,examples:s,solution:r,codes:d};export{d as codes,p as default,t as description,l as examType,s as examples,a as id,e as inputDesc,i as outputDesc,c as score,r as solution,n as title};
