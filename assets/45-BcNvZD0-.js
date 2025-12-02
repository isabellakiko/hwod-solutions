const s="45",n="磁盘容量排序",p="A",l=100,t=`磁盘的容量单位常用的有 M，G，T 这三个等级，它们之间的换算关系为：
1T = 1024G1G = 1024M
现在给定 n 块磁盘的容量，请对它们按从小到大的顺序进行稳定排序。
例如给定5块盘的容量：
1T，20M，3G，10G6T，3M12G9M
排序后的结果为：
20M，3G，3M12G9M，1T，10G6T
注意单位可以重复出现，上述 3M12G9M 表示的容量即为：3M+12G+9M，和 12M12G 相等。`,i=`输入第一行包含一个整数 n，表示磁盘的个数
2 ≤ n ≤ 100
接下的 n 行，每行一个字符串（长度大于2，小于30），表示磁盘的容量，由一个或多个格式为mv的子串组成，其中 m 表示容量大小，v 表示容量单位，例如：20M，1T，30G，10G6T，3M12G9M。
磁盘容量 m 的范围为 1 到 1024 的正整数容量单位 v 的范围只包含题目中提到的 M，G，T 三种，换算关系如题目描述`,a="输出 n 行，表示 n 块磁盘容量排序后的结果。",c=[{input:`3
1G
1024M
3M`,output:`3M
1G
1024M`,explanation:`3M最小，1G=1024M，两者容量相等。
稳定排序保留原相对位置，故1G在1024M之前。`},{input:`3
2G4M
3M2G
1T`,output:`3M2G
2G4M
1T`,explanation:`3M2G = 3+2048 = 2051M
2G4M = 2048+4 = 2052M
1T = 1048576M
从小到大：3M2G < 2G4M < 1T`},{input:`5
1T
20M
3G
10G6T
3M12G9M`,output:`20M
3G
3M12G9M
1T
10G6T`,explanation:`换算后：20M, 3072M, 12300M, 1048576M, 6301696M
从小到大排序。`}],e=`**解题思路：**

本题是一道**字符串解析+排序**问题。

**换算规则：**
- 1T = 1024G = 1024×1024M
- 1G = 1024M
- 统一转换为M单位比较

**算法步骤：**

1. 解析每个容量字符串，提取数字和单位
2. 将所有单位转换为M，累加得到总容量
3. 使用稳定排序（相同容量保持原顺序）
4. 输出排序后的原始字符串

**解析技巧：**
- 双指针遍历字符串
- 遇到M/G/T时截取前面的数字

**时间复杂度**：O(n log n)`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = Integer.parseInt(scanner.nextLine());
 
        List<Map.Entry<Integer, String>> res = new ArrayList<>();

        // 处理n行磁盘容量
        for (int i = 0; i < n; i++) {
            String capacity = scanner.nextLine();
            int sum = 0;
            int left = 0;
            int right = 1;

            // 将磁盘容量转化为数值
            while (right < capacity.length()) {
                if (capacity.charAt(right) == 'M' || capacity.charAt(right) == 'G' || capacity.charAt(right) == 'T') {
                    int val = Integer.parseInt(capacity.substring(left, right));
                    switch (capacity.charAt(right)) {
                        case 'M':
                            sum += val;
                            break;
                        case 'G':
                            sum += val * 1024;
                            break;
                        case 'T':
                            sum += val * 1024 * 1024;
                            break;
                    }
                    left = right + 1;  // 更新左指针
                }
                right++;  // 移动右指针
            }

            // 存储容量及其原始字符串
            res.add(new AbstractMap.SimpleEntry<>(sum, capacity));
        }

        // 排序后输出结果
        res.sort(Comparator.comparingInt(Map.Entry::getKey));  // 对容量值进行排序
        for (Map.Entry<Integer, String> ele : res) {
            System.out.println(ele.getValue());  // 输出原始字符串
        }
    }
}`,python:`import sys

# 读取磁盘数量
n = int(input())

# 存储处理后的磁盘容量及其原始字符串
res = []

# 处理n行磁盘容量
for _ in range(n):
    capacity = input()
    sum = 0
    left = 0
    right = 1

    # 将磁盘容量转化为数值
    while right < len(capacity):
        if capacity[right] in ['M', 'G', 'T']:
            val = int(capacity[left:right])
            if capacity[right] == 'M':
                sum += val  # M为基本单位
            elif capacity[right] == 'G':
                sum += val * 1024  # 1G = 1024M
            elif capacity[right] == 'T':
                sum += val * 1024 * 1024  # 1T = 1024G = 1024*1024M
            left = right + 1  # 更新左指针
        right += 1  # 移动右指针

    # 存储容量及其原始字符串
    res.append((sum, capacity))

# 按容量排序后输出
res.sort(key=lambda x: x[0])
for _, capacity in res:
    print(capacity)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
    if (input.length === parseInt(input[0], 10) + 1) {
        rl.close();
    }
});

rl.on('close', function () {
    const n = parseInt(input[0], 10);  // 读取磁盘数量
    let res = [];

    // 处理每一行磁盘容量
    for (let i = 1; i <= n; i++) {
        const capacity = input[i];
        let sum = 0;
        let left = 0;

        // 将磁盘容量转换为数值
        for (let right = 1; right < capacity.length; right++) {
            if (['M', 'G', 'T'].includes(capacity[right])) {
                const val = parseInt(capacity.slice(left, right), 10);
                switch (capacity[right]) {
                    case 'M':
                        sum += val;
                        break;
                    case 'G':
                        sum += val * 1024;
                        break;
                    case 'T':
                        sum += val * 1024 * 1024;
                        break;
                }
                left = right + 1;
            }
        }

        // 存储容量及其原始字符串
        res.push({ sum, capacity });
    }

    // 按容量排序后输出
    res.sort((a, b) => a.sum - b.sum);
    res.forEach(ele => console.log(ele.capacity));
});`,cpp:`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// 定义一个存储容量值和原始字符串的结构体
struct Capacity {
    int sum;
    string original;
};

int main() {
    int n;
    cin >> n;  // 读取磁盘数量
    cin.ignore();  // 忽略换行符

    vector<Capacity> res;

    // 处理n行磁盘容量
    for (int i = 0; i < n; ++i) {
        string capacity;
        getline(cin, capacity);
        int sum = 0;
        int left = 0;

        // 将磁盘容量转换为数值
        for (int right = 1; right < capacity.size(); ++right) {
            if (capacity[right] == 'M' || capacity[right] == 'G' || capacity[right] == 'T') {
                int val = stoi(capacity.substr(left, right - left));
                if (capacity[right] == 'M') {
                    sum += val;
                } else if (capacity[right] == 'G') {
                    sum += val * 1024;
                } else if (capacity[right] == 'T') {
                    sum += val * 1024 * 1024;
                }
                left = right + 1;
            }
        }

        // 存储容量及其原始字符串
        res.push_back({sum, capacity});
    }

    // 按容量排序后输出
    sort(res.begin(), res.end(), [](const Capacity &a, const Capacity &b) {
        return a.sum < b.sum;
    });

    for (const auto &ele : res) {
        cout << ele.original << endl;
    }

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_LENGTH 100

// 定义一个结构体存储容量值和原始字符串
typedef struct {
    int sum;
    char original[MAX_LENGTH];
} Capacity;

// 比较函数，用于qsort排序
int compare(const void *a, const void *b) {
    return ((Capacity *)a)->sum - ((Capacity *)b)->sum;
}

int main() {
    int n;
    scanf("%d", &n);  // 读取磁盘数量
    getchar();  // 消费换行符

    Capacity res[n];  // 定义结构体数组存储结果

    // 处理n行磁盘容量
    for (int i = 0; i < n; i++) {
        char capacity[MAX_LENGTH];
        fgets(capacity, MAX_LENGTH, stdin);

        // 移除换行符
        capacity[strcspn(capacity, "\\n")] = 0;

        int sum = 0;
        int left = 0;

        // 将磁盘容量转换为数值
        for (int right = 1; right < strlen(capacity); right++) {
            if (capacity[right] == 'M' || capacity[right] == 'G' || capacity[right] == 'T') {
                char temp[10];
                strncpy(temp, &capacity[left], right - left);
                temp[right - left] = '\\0';
                int val = atoi(temp);
                
                if (capacity[right] == 'M') {
                    sum += val;
                } else if (capacity[right] == 'G') {
                    sum += val * 1024;
                } else if (capacity[right] == 'T') {
                    sum += val * 1024 * 1024;
                }
                left = right + 1;
            }
        }

        // 存储容量及其原始字符串
        res[i].sum = sum;
        strcpy(res[i].original, capacity);
    }

    // 使用qsort进行排序
    qsort(res, n, sizeof(Capacity), compare);

    // 输出排序后的结果
    for (int i = 0; i < n; i++) {
        printf("%s\\n", res[i].original);
    }

    return 0;
}`},o={id:"45",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:a,examples:c,solution:e,codes:r};export{r as codes,o as default,t as description,p as examType,c as examples,s as id,i as inputDesc,a as outputDesc,l as score,e as solution,n as title};
