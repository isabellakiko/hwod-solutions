const r="87",n="计算最接近的数",a="A",f=100,i=`给定一个数组X和正整数K，请找出使表达式：
X[i] - X[i + 1] - ... - X[i + K - 1]
结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.
其中，数组中位数：长度为N的数组，按照元素的值大小升序排列后，下标为 N/2 元素的值
`,t="输入格式为[x1,x2,...,xn],k，其中x为数组，k为正整数。",e="返回满足条件的最大下标i。",o=[{input:"[1,2,3,4,5],2",output:"3",explanation:"中位数为3。k=2时各窗口：1-2=-1,2-3=-1,3-4=-1,4-5=-1。都等距于3，返回最大i=3。"},{input:"[5,2,8,3,1],3",output:"1",explanation:"排序后[1,2,3,5,8]，中位数为3。窗口0:5-2-8=-5,窗口1:2-8-3=-9,窗口2:8-3-1=4。|3-4|=1最接近。"},{input:"[1,1,1,1],2",output:"2",explanation:"中位数为1，所有窗口结果都是0，与中位数差距相同，返回最大i=2。"}],s=`**解题思路：**

本题是一道**滑动窗口**问题。

**算法步骤：**
1. 计算数组中位数（排序后N/2位置的值）
2. 初始化第一个长度为k的滑窗表达式结果
3. 滑窗右移时状态转移：new = old - x[i-1] + 2*x[i] - x[i+k-1]
4. 计算每个窗口结果与中位数的差距绝对值
5. 记录差距最小且索引最大的i

**时间复杂度**：O(N log N)`,d={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String line = sc.nextLine();

    int i = line.lastIndexOf(",");

    int[] x =
        Arrays.stream(line.substring(1, i - 1).split(",")).mapToInt(Integer::parseInt).toArray();
    int k = Integer.parseInt(line.substring(i + 1));

    System.out.println(getResult(x, k));
  }

  public static int getResult(int[] x, int k) {
    int n = x.length;

    // x数组的中位数
    int mid = Arrays.stream(x).sorted().toArray()[n / 2];

    // 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
    int window = x[0];
    for (int i = 1; i < k; i++) {
      window -= x[i];
    }

    // window和中位数的差距
    int minDiff = Math.abs(mid - window);
    // window滑窗起始索引
    int idx = 0;

    // 滑窗右移
    for (int i = 1; i <= n - k; i++) {
      // 右移一格后，新滑窗的表达式计算结果
      window += -x[i - 1] + 2 * x[i] - x[i + k - 1];

      // 新滑窗window值和中位数的差距
      int diff = Math.abs(mid - window);

      // 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
      if (diff <= minDiff) {
        minDiff = diff;
        idx = i;
      }
    }

    return idx;
  }
}`,python:`# 输入获取
tmp = input()

i = tmp.rfind(",")

x = list(map(int, tmp[1:i-1].split(",")))
k = int(tmp[i+1:])


# 核心代码
def getResult():
    n = len(x)

    # x数组的中位数
    mid = sorted(x)[n // 2]

    # 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
    window = x[0]
    for j in range(1, k):
        window -= x[j]

    # window和中位数的差距
    minDiff = abs(mid - window)
    # window滑窗起始索引
    idx = 0

    # 滑窗右移
    for i in range(1, n-k+1):
        # 右移一格后，新滑窗的表达式计算结果
        window += -x[i-1] + 2 * x[i] - x[i + k -1]

        # 新滑窗window值和中位数的差距
        diff = abs(mid - window)

        # 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
        if diff <= minDiff:
            minDiff = diff
            idx = i

    return idx


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const lastComma = line.lastIndexOf(',');
    const x = line.substring(1, lastComma - 1).split(',').map(Number);
    const k = parseInt(line.substring(lastComma + 1));
    
    const n = x.length;
    const sorted = [...x].sort((a, b) => a - b);
    const mid = sorted[Math.floor(n / 2)];
    
    let window = x[0];
    for (let i = 1; i < k; i++) {
        window -= x[i];
    }
    
    let minDiff = Math.abs(mid - window);
    let idx = 0;
    
    for (let i = 1; i <= n - k; i++) {
        window += -x[i - 1] + 2 * x[i] - x[i + k - 1];
        const diff = Math.abs(mid - window);
        if (diff <= minDiff) {
            minDiff = diff;
            idx = i;
        }
    }
    
    console.log(idx);
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <sstream>
#include <cmath>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    int lastComma = line.rfind(',');
    string arrStr = line.substr(1, lastComma - 2);
    int k = stoi(line.substr(lastComma + 1));
    
    vector<int> x;
    stringstream ss(arrStr);
    string token;
    while (getline(ss, token, ',')) {
        x.push_back(stoi(token));
    }
    
    int n = x.size();
    vector<int> sorted_x = x;
    sort(sorted_x.begin(), sorted_x.end());
    int mid = sorted_x[n / 2];
    
    int window = x[0];
    for (int i = 1; i < k; i++) {
        window -= x[i];
    }
    
    int minDiff = abs(mid - window);
    int idx = 0;
    
    for (int i = 1; i <= n - k; i++) {
        window += -x[i - 1] + 2 * x[i] - x[i + k - 1];
        int diff = abs(mid - window);
        if (diff <= minDiff) {
            minDiff = diff;
            idx = i;
        }
    }
    
    cout << idx << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int main() {
    char line[10000];
    fgets(line, sizeof(line), stdin);
    
    char* lastComma = strrchr(line, ',');
    int k = atoi(lastComma + 1);
    *lastComma = '\\0';
    
    int x[1000], n = 0;
    char* p = line + 1;
    while (*p && *p != ']') {
        x[n++] = atoi(p);
        while (*p && *p != ',' && *p != ']') p++;
        if (*p == ',') p++;
    }
    
    int sorted[1000];
    memcpy(sorted, x, n * sizeof(int));
    qsort(sorted, n, sizeof(int), cmp);
    int mid = sorted[n / 2];
    
    int window = x[0];
    for (int i = 1; i < k; i++) {
        window -= x[i];
    }
    
    int minDiff = abs(mid - window);
    int idx = 0;
    
    for (int i = 1; i <= n - k; i++) {
        window += -x[i - 1] + 2 * x[i] - x[i + k - 1];
        int diff = abs(mid - window);
        if (diff <= minDiff) {
            minDiff = diff;
            idx = i;
        }
    }
    
    printf("%d\\n", idx);
    return 0;
}`},l={id:"87",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:o,solution:s,codes:d};export{d as codes,l as default,i as description,a as examType,o as examples,r as id,t as inputDesc,e as outputDesc,f as score,s as solution,n as title};
