const l="38",n="查找接口成功率最优时间段",o="A",d=100,e=`服务之间交换的接口成功率作为服务调用关键质量特性，某个时间段内的接口失败率使用一个数组表示，
数组中每个元素都是单位时间内失败率数值，数组中的数值为0~100的整数，
给定一个数值(minAverageLost)表示某个时间段内平均失败率容忍值，即平均失败率小于等于minAverageLost，
找出数组中最长时间段，如果未找到则直接返回NULL。`,t=`输入有两行内容，第一行为{minAverageLost}，第二行为{数组}，数组元素通过空格(” “)分隔，
minAverageLost及数组中元素取值范围为0~100的整数，数组元素的个数不会超过100个。`,a=`找出平均值小于等于minAverageLost的最长时间段，输出数组下标对，格式{beginIndex}-{endIndx}(下标从0开始)，
如果同时存在多个最长时间段，则输出多个下标对且下标对之间使用空格(” “)拼接，多个下标对按下标从小到大排序。
输入解释：minAverageLost=1，数组[0, 1, 2, 3, 4]
前3个元素的平均值为1，因此数组第一个至第三个数组下标，即0-2
输入解释：minAverageLost=2，数组[0, 0, 100, 2, 2, 99, 0, 2]
通过计算小于等于2的最长时间段为：
数组下标为0-1即[0, 0]，数组下标为3-4即[2, 2]，数组下标为6-7即[0, 2]，这三个部分都满足平均值小于等于2的要求，
因此输出0-1 3-4 6-7
解题思路如下：
首先，我们需要读取输入的数据，包括容忍的平均失败率和失败率数组。
然后，我们创建一个累积和数组，用于快速计算任意时间段的失败率总和。这个数组的每个元素都是从数组开始到当前位置的失败率的总和。
接下来，我们遍历所有可能的时间段，包括所有可能的开始和结束索引。对于每个时间段，我们计算其失败率总和，然后计算其平均失败率。我们可以通过查找累积和数组来快速计算失败率总和。
对于每个时间段，我们检查其平均失败率是否小于等于容忍的平均失败率。如果是，我们就找到了一个满足条件的时间段。
我们需要找到最长的满足条件的时间段。因此，我们需要跟踪找到的最长时间段的长度。如果我们找到一个比当前最长时间段更长的时间段，我们就更新最长时间段的长度，并清空结果列表，然后将新的时间段添加到结果列表中。如果我们找到一个和当前最长时间段一样长的时间段，我们就将它添加到结果列表中。
最后，我们检查结果列表。如果结果列表为空，说明我们没有找到任何满足条件的时间段，我们就输出"NULL"。否则，我们输出所有满足条件的时间段。如果有多个时间段，我们需要按照开始索引从小到大的顺序输出。
这个解题思路的关键是使用累积和数组来快速计算任意时间段的失败率总和，以及使用一个结果列表来跟踪所有满足条件的时间段。这样，我们可以在一次遍历中找到所有满足条件的时间段，并且可以快速找到最长的时间段。`,i=[{input:`1
0 1 2 3 4`,output:"0-2",explanation:`minAverageLost=1，数组[0,1,2,3,4]。
子数组[0,1,2]的平均值=(0+1+2)/3=1≤1，满足条件。
这是最长的满足条件的时间段，输出0-2。`},{input:`2
0 0 100 2 2 99 0 2`,output:"0-1 3-4 6-7",explanation:`minAverageLost=2，数组[0,0,100,2,2,99,0,2]。
满足平均值≤2的最长时间段：
- [0,0]长度2，平均值0
- [2,2]长度2，平均值2
- [0,2]长度2，平均值1
三个长度相同，按下标排序输出。`},{input:`0
1 2 3 4 5`,output:"NULL",explanation:"minAverageLost=0，但数组中没有任何元素≤0，无法找到满足条件的时间段。"}],r=`**解题思路：**

本题是一道**前缀和 + 枚举**问题。

**算法步骤：**

1. **前缀和预处理**：构建累积和数组，快速计算任意区间的和
2. **枚举所有区间**：遍历所有(start, end)组合
3. **判断条件**：sum ≤ length × minAverageLost（避免浮点运算）
4. **维护最长区间**：
   - 找到更长的区间：清空结果，记录新区间
   - 找到等长的区间：添加到结果
5. **输出结果**：无结果输出NULL，否则按下标排序输出

**时间复杂度**：O(n²)`,s={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // 容忍的平均失败率
    int toleratedAverageLoss = Integer.parseInt(scanner.nextLine());

    // 读取失败率数组
    Integer[] failureRates =
        Arrays.stream(scanner.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);

    int arrayLength = failureRates.length;

    // 创建一个累积和数组，用于快速计算任意时间段的失败率总和
    int[] cumulativeSum = new int[arrayLength];
    cumulativeSum[0] = failureRates[0];
    for (int i = 1; i < arrayLength; i++) cumulativeSum[i] = cumulativeSum[i - 1] + failureRates[i];

    // 存储满足条件的时间段的开始和结束索引
    ArrayList<Integer[]> validPeriods = new ArrayList<>();
    int maxLength = 0;
    for (int start = 0; start < arrayLength; start++) {
      for (int end = start; end < arrayLength; end++) {
        int sum = start == 0 ? cumulativeSum[end] : cumulativeSum[end] - cumulativeSum[start - 1];
        int length = end - start + 1;
        int toleratedLoss = length * toleratedAverageLoss;

        // 如果这个时间段的平均失败率小于等于容忍的平均失败率
        if (sum <= toleratedLoss) {
          // 如果这个时间段比之前找到的时间段更长，清空结果列表并添加这个时间段
          if (length > maxLength) {
            validPeriods = new ArrayList<>();
            validPeriods.add(new Integer[] {start, end});
            maxLength = length;
          } 
          // 如果这个时间段和之前找到的最长时间段一样长，添加这个时间段
          else if (length == maxLength) {
            validPeriods.add(new Integer[] {start, end});
          }
        }
      }
    }

    // 如果没有找到满足条件的时间段，输出"NULL"
    if (validPeriods.size() == 0) {
      System.out.println("NULL");
    } 
    // 否则，输出所有满足条件的时间段
    else {
      validPeriods.sort((a, b) -> a[0] - b[0]);

      StringJoiner sj = new StringJoiner(" ");
      for (Integer[] period : validPeriods) sj.add(period[0] + "-" + period[1]);
      System.out.println(sj.toString());
    }
  }
}`,python:`# 容忍的平均失败率
toleratedAverageLoss = int(input())

# 读取失败率数组
failureRates = list(map(int, input().split()))

arrayLength = len(failureRates)

# 创建一个累积和数组，用于快速计算任意时间段的失败率总和
cumulativeSum = [0] * arrayLength
cumulativeSum[0] = failureRates[0] 
for i in range(1, arrayLength):
    cumulativeSum[i] = cumulativeSum[i - 1] + failureRates[i]

# 存储满足条件的时间段的开始和结束索引
validPeriods = []
maxLength = 0
for start in range(arrayLength):
    for end in range(start, arrayLength):
        sum = cumulativeSum[end] if start == 0 else cumulativeSum[end] - cumulativeSum[start - 1]
        length = end - start + 1
        toleratedLoss = length * toleratedAverageLoss

        # 如果这个时间段的平均失败率小于等于容忍的平均失败率
        if sum <= toleratedLoss:
            # 如果这个时间段比之前找到的时间段更长，清空结果列表并添加这个时间段
            if length > maxLength:
                validPeriods = []
                validPeriods.append((start, end))
                maxLength = length
            # 如果这个时间段和之前找到的最长时间段一样长，添加这个时间段
            elif length == maxLength:
                validPeriods.append((start, end))

# 如果没有找到满足条件的时间段，输出"NULL"
if len(validPeriods) == 0:
    print("NULL")
# 否则，输出所有满足条件的时间段
else:
    validPeriods.sort()

    print(' '.join(f'{start}-{end}' for start, end in validPeriods))`,javascript:`const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 

readline.on('line', tolerated => {
 const toleratedAverageLoss = parseInt(tolerated);
  readline.on('line', rates => {a
    const failureRates = rates.split(' ').map(Number);
 
    const arrayLength = failureRates.length;

    // 创建一个累积和数组，用于快速计算任意时间段的失败率总和
    const cumulativeSum = new Array(arrayLength);
    cumulativeSum[0] = failureRates[0];
    for (let i = 1; i < arrayLength; i++) cumulativeSum[i] = cumulativeSum[i - 1] + failureRates[i];

    // 存储满足条件的时间段的开始和结束索引
    let validPeriods = [];
    let maxLength = 0;
    for (let start = 0; start < arrayLength; start++) {
      for (let end = start; end < arrayLength; end++) {
        const sum = start === 0 ? cumulativeSum[end] : cumulativeSum[end] - cumulativeSum[start - 1];
        const length = end - start + 1;
        const toleratedLoss = length * toleratedAverageLoss;

        // 如果这个时间段的平均失败率小于等于容忍的平均失败率
        if (sum <= toleratedLoss) {
          // 如果这个时间段比之前找到的时间段更长，清空结果列表并添加这个时间段
          if (length > maxLength) {
            validPeriods = [];
            validPeriods.push([start, end]);
            maxLength = length;
          } 
          // 如果这个时间段和之前找到的最长时间段一样长，添加这个时间段
          else if (length === maxLength) {
            validPeriods.push([start, end]);
          }
        }
      }
    }

    // 如果没有找到满足条件的时间段，输出"NULL"
    if (validPeriods.length === 0) {
      console.log("NULL");
    } 
    // 否则，输出所有满足条件的时间段
    else {
      validPeriods.sort((a, b) => a[0] - b[0]);

      console.log(validPeriods.map(period => period.join('-')).join(' '));
    }
  });
});`,cpp:`#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>

using namespace std;

int main() {
    // 容忍的平均失败率
    int toleratedAverageLoss;
    cin >> toleratedAverageLoss;

    // 读取失败率数组
    vector<int> failureRates;
    string line;
    getline(cin >> ws, line);
    istringstream iss(line);
    int num;
    while (iss >> num) {
        failureRates.push_back(num);
    }

    int arrayLength = failureRates.size();

    // 创建一个累积和数组，用于快速计算任意时间段的失败率总和
    vector<int> cumulativeSum(arrayLength);
    cumulativeSum[0] = failureRates[0];
    for (int i = 1; i < arrayLength; i++) cumulativeSum[i] = cumulativeSum[i - 1] + failureRates[i];

    // 存储满足条件的时间段的开始和结束索引
    vector<pair<int, int>> validPeriods;
    int maxLength = 0;
    for (int start = 0; start < arrayLength; start++) {
        for (int end = start; end < arrayLength; end++) {
            int sum = start == 0 ? cumulativeSum[end] : cumulativeSum[end] - cumulativeSum[start - 1];
            int length = end - start + 1;
            int toleratedLoss = length * toleratedAverageLoss;

            // 如果这个时间段的平均失败率小于等于容忍的平均失败率
            if (sum <= toleratedLoss) {
                // 如果这个时间段比之前找到的时间段更长，清空结果列表并添加这个时间段
                if (length > maxLength) {
                    validPeriods.clear();
                    validPeriods.push_back({start, end});
                    maxLength = length;
                } 
                // 如果这个时间段和之前找到的最长时间段一样长，添加这个时间段
                else if (length == maxLength) {
                    validPeriods.push_back({start, end});
                }
            }
        }
    }

    // 如果没有找到满足条件的时间段，输出"NULL"
    if (validPeriods.empty()) {
        cout << "NULL" << endl;
    } 
    // 否则，输出所有满足条件的时间段
    else {
        sort(validPeriods.begin(), validPeriods.end());

        for (auto& period : validPeriods) {
            cout << period.first << "-" << period.second << " ";
        }
        cout << endl;
    }

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // 容忍的平均失败率
    int toleratedAverageLoss;
    scanf("%d", &toleratedAverageLoss);

    // 读取失败率数组
    int failureRates[100];
    int arrayLength = 0;
    while (scanf("%d", &failureRates[arrayLength]) == 1) {
        arrayLength++;
    }

    // 创建一个累积和数组，用于快速计算任意时间段的失败率总和
    int cumulativeSum[100] = {0};
    cumulativeSum[0] = failureRates[0];
    for (int i = 1; i < arrayLength; i++) {
        cumulativeSum[i] = cumulativeSum[i - 1] + failureRates[i];
    }

    // 存储满足条件的时间段的开始和结束索引
    int validPeriods[100][2];
    int validPeriodCount = 0;
    int maxLength = 0;
    for (int start = 0; start < arrayLength; start++) {
        for (int end = start; end < arrayLength; end++) {
            int sum = start == 0 ? cumulativeSum[end] : cumulativeSum[end] - cumulativeSum[start - 1];
            int length = end - start + 1;
            int toleratedLoss = length * toleratedAverageLoss;

            // 如果这个时间段的平均失败率小于等于容忍的平均失败率
            if (sum <= toleratedLoss) {
                // 如果这个时间段比之前找到的时间段更长，清空结果列表并添加这个时间段
                if (length > maxLength) {
                    validPeriodCount = 0;
                    validPeriods[validPeriodCount][0] = start;
                    validPeriods[validPeriodCount][1] = end;
                    validPeriodCount++;
                    maxLength = length;
                } 
                // 如果这个时间段和之前找到的最长时间段一样长，添加这个时间段
                else if (length == maxLength) {
                    validPeriods[validPeriodCount][0] = start;
                    validPeriods[validPeriodCount][1] = end;
                    validPeriodCount++;
                }
            }
        }
    }

    // 如果没有找到满足条件的时间段，输出"NULL"
    if (validPeriodCount == 0) {
        printf("NULL\\n");
    } 
    // 否则，输出所有满足条件的时间段
    else {
        for (int i = 0; i < validPeriodCount; i++) {
            if (i > 0) printf(" ");
            printf("%d-%d", validPeriods[i][0], validPeriods[i][1]);
        }
        printf("\\n");
    }

    return 0;
}`},u={id:"38",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:a,examples:i,solution:r,codes:s};export{s as codes,u as default,e as description,o as examType,i as examples,l as id,t as inputDesc,a as outputDesc,d as score,r as solution,n as title};
