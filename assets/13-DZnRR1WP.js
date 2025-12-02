const r="13",n="幼儿园分班",l="A",o=100,s=`幼儿园两个班的小朋友在排队时混在了一起，每位小朋友都知道自己是否与前面一位小朋友同班，请你帮忙把同班的小朋友找出来。
小朋友的编号是整数，与前一位小朋友同班用Y表示，不同班用N表示。`,t=`输入为空格分开的小朋友编号和是否同班标志。
比如：6/N 2/Y 3/N 4/Y，表示4位小朋友，2和6同班，3和2不同班，4和3同班。
其中，小朋友总数不超过999，每个小朋友编号大于0，小于等于999。
不考虑输入格式错误问题。`,i=`输出为两行，每一行记录一个班小朋友的编号，编号用空格分开。
- 编号按升序排列
- 人数多的班级排在前面
- 人数相同时，最小编号所在的班级排在前面`,e=[{input:"1/N 2/Y 3/N 4/Y",output:`1 2
3 4`,explanation:`1是第一个，标记N（无意义）。2的同班标记为Y，与1同班。3的同班标记为N，与2不同班。4的同班标记为Y，与3同班。

分班结果：班A [1,2]，班B [3,4]。人数相同，按最小编号排序，输出：1 2\\n3 4`},{input:"1/N 2/Y 3/N 4/Y 5/Y",output:`3 4 5
1 2`,explanation:"分班结果：班A [1,2]（2人），班B [3,4,5]（3人）。班B人数多，排在前面。"}],c=`**解题思路：**

本题是一道**模拟分组**问题。

**算法步骤：**

1. **初始化**：创建两个班级列表 classA 和 classB，将第一个小朋友放入 classA
2. **遍历处理**：维护一个"当前班级"指针
   - 遇到 Y：当前小朋友与前一个同班，加入当前班级
   - 遇到 N：当前小朋友与前一个不同班，切换到另一个班级，再加入
3. **排序输出**：
   - 每个班级内部按编号升序排列
   - 人数多的班级先输出
   - 人数相同时，最小编号所在的班级先输出

**关键技巧**：用一个"当前班级"变量，遇到N就翻转，遇到Y保持不变。

**时间复杂度**：O(n log n)，主要是排序`,a={java:`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[] nums = scanner.nextLine().split(" ");

        String[] start = nums[0].split("/");
        List<String> class_A = new ArrayList<>();
        class_A.add(start[0]);
        List<String> class_B = new ArrayList<>();

        List<List<String>> temp = new ArrayList<>();
        temp.add(class_A);
        temp.add(class_B);

        for (int i = 1; i < nums.length; i++) {
            String[] current = nums[i].split("/");
            String id_ = current[0];
            String f = current[1];

            if (f.equals("Y")) {
                temp = temp;
            } else {
                Collections.reverse(temp);
            }

            temp.get(0).add(id_);
        }

        if (!class_A.isEmpty()) {
            Collections.sort(class_A, (a, b) -> Integer.parseInt(a) - Integer.parseInt(b));
            System.out.println(String.join(" ", class_A));
        }

        if (!class_B.isEmpty()) {
            Collections.sort(class_B, (a, b) -> Integer.parseInt(a) - Integer.parseInt(b));
            System.out.println(String.join(" ", class_B));
        }
    }
}`,python:`nums = input().split()

# 将第一个元素以'/'分隔成两部分，第一部分表示小朋友的编号，第二部分表示是否与前一位小朋友同班
start = nums[0].split('/')
# 创建一个列表class_A，用于存放同班的小朋友的编号
class_A = [start[0]]
# 创建一个列表class_B，用于存放不同班的小朋友的编号
class_B = []

# 创建一个临时列表temp，用于存放两个班级的小朋友编号列表
temp = [class_A, class_B]   

# 遍历nums列表中的每一个元素
for n in nums[1:]:
    # 将当前元素以'/'分隔成两部分，第一部分表示小朋友的编号，第二部分表示是否与前一位小朋友同班
    id_, f = n.split("/")

    # 如果与前一位小朋友同班，则temp不变
    if f == "Y":
        temp = temp
    else:
        # 如果与前一位小朋友不同班，则将temp列表中的两个班级的小朋友编号列表颠倒顺序
        temp = temp[::-1]

    # 将当前小朋友的编号添加到temp列表的第一个班级的小朋友编号列表中
    temp[0].append(id_)

# 如果class_A列表不为空，则按照编号的大小升序排列，并用空格分隔成字符串输出
if class_A:
    print(" ".join(sorted(class_A, key=lambda x: int(x))))
# 如果class_B列表不为空，则按照编号的大小升序排列，并用空格分隔成字符串输出
if class_B:
    print(" ".join(sorted(class_B, key=lambda x: int(x))))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (nums) => {
  nums = nums.split(' ');

  let start = nums[0].split('/');
  let class_A = [start[0]];
  let class_B = [];
  let temp = [class_A, class_B];

  for (let i = 1; i < nums.length; i++) {
    let [id_, f] = nums[i].split('/');

    if (f === 'Y') {
      temp = temp;
    } else {
      temp = temp.reverse();
    }

    temp[0].push(id_);
  }

  if (class_A.length > 0) {
    console.log(class_A.sort((a, b) => parseInt(a) - parseInt(b)).join(' '));
  }
  if (class_B.length > 0) {
    console.log(class_B.sort((a, b) => parseInt(a) - parseInt(b)).join(' '));
  }

  rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
using namespace std;

vector<string> split(const string& s, char delimiter) {
    vector<string> tokens;
    string token;
    istringstream tokenStream(s);
    while (getline(tokenStream, token, delimiter)) {
        tokens.push_back(token);
    }
    return tokens;
}

int main() {
    string nums;
    getline(cin, nums);

    vector<string> nums_vec = split(nums, ' ');

    vector<string> start = split(nums_vec[0], '/');
    vector<string> class_A = {start[0]};
    vector<string> class_B;
    vector<vector<string>> temp = {class_A, class_B};

    for (int i = 1; i < nums_vec.size(); i++) {
        vector<string> temp_vec = split(nums_vec[i], '/');

        string id_ = temp_vec[0];
        string f = temp_vec[1];

        if (f == "Y") {
            temp = temp;
        } else {
            reverse(temp.begin(), temp.end());
        }

        temp[0].push_back(id_);
    }

    class_A = temp[0];
    class_B = temp[1];
  if (class_B.size() > 0) {
        sort(class_B.begin(), class_B.end(), [](string a, string b) { return stoi(a) < stoi(b); });
        for (string s : class_B) {
            cout << s << " ";
        }
        cout << endl;
    }
    if (class_A.size() > 0) {
        sort(class_A.begin(), class_A.end(), [](string a, string b) { return stoi(a) < stoi(b); });
        for (string s : class_A) {
            cout << s << " ";
        }
        cout << endl;
    }
  

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义最大小朋友数量
#define MAX_KIDS 1000

// 辅助函数，用于比较两个字符串表示的数字
int cmp(const void *a, const void *b) {
    return atoi(*(const char **)a) - atoi(*(const char **)b);
}

// 主函数
int main() {
    char input[5000];  // 假设输入不超过5000字符
    fgets(input, sizeof(input), stdin);  // 读取整行输入

    char *nums[MAX_KIDS];  // 保存小朋友编号和同班标志
    int count = 0;  // 输入的条目数量

    // 分割输入的每个小朋友编号和同班标志
    char *token = strtok(input, " ");
    while (token != NULL) {
        nums[count++] = token;
        token = strtok(NULL, " ");
    }

    // 定义两个班级的数组
    char *class_A[MAX_KIDS];
    int class_A_count = 0;
    char *class_B[MAX_KIDS];
    int class_B_count = 0;

    // 初始化第一个小朋友
    char *start = strtok(nums[0], "/");
    class_A[class_A_count++] = start;

    // 定义指向两个班级的数组
    char ***temp[2] = { &class_A, &class_B };  // 指向class_A和class_B的指针
    int temp_index = 0;  // 当前处理的班级

    // 遍历输入的每个小朋友，从第二个开始
    for (int i = 1; i < count; i++) {
        char *id_ = strtok(nums[i], "/");  // 小朋友编号
        char *f = strtok(NULL, "/");  // 同班标志

        if (strcmp(f, "N") == 0) {
            temp_index = 1 - temp_index;  // 切换到另一个班
        }

        // 将当前小朋友编号添加到当前班级
        if (temp_index == 0) {
            class_A[class_A_count++] = id_;
        } else {
            class_B[class_B_count++] = id_;
        }
    }

    // 输出班级A的编号，升序排列
    if (class_A_count > 0) {
        qsort(class_A, class_A_count, sizeof(char *), cmp);
        for (int i = 0; i < class_A_count; i++) {
            if (i > 0) printf(" ");
            printf("%s", class_A[i]);
        }
        printf("\\n");
    }

    // 输出班级B的编号，升序排列
    if (class_B_count > 0) {
        qsort(class_B, class_B_count, sizeof(char *), cmp);
        for (int i = 0; i < class_B_count; i++) {
            if (i > 0) printf(" ");
            printf("%s", class_B[i]);
        }
        printf("\\n");
    }

    return 0;
}`},p={id:"13",title:n,examType:"A",score:100,description:s,inputDesc:t,outputDesc:i,examples:e,solution:c,codes:a};export{a as codes,p as default,s as description,l as examType,e as examples,r as id,t as inputDesc,i as outputDesc,o as score,c as solution,n as title};
