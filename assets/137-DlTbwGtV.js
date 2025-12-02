const a="137",n="观看文艺汇演问题",d="A",m=200,t=`为了庆祝中国共产党成立100周年，某公园将举行多场文艺表演，很多演出都是同时进行，一个人只能同时观看一场演出，且不能迟到早退，由于演出分布在不同的演出场地，所以连续观看的演出最少有15分钟的时间间隔，
小明是一个狂热的文艺迷，想观看尽可能多的演出， 现给出演出时间表，请帮小明计算他最多能观看几场演出。`,e=`第一行为一个数 N，表示演出场数
1 ≤ N ≤ 1000
接下来 N 行，每行有被空格分割的整数，第一个整数 T 表示演出的开始时间，第二个整数 L 表示演出的持续时间
T 和 L 的单位为分钟0 ≤ T ≤ 14400 < L ≤ 180`,i="输出最多能观看的演出场数。",s=[{input:`2
720 120
840 120`,output:"2",explanation:"演出1从720分钟开始持续120分钟到840，演出2从840开始，间隔0分钟<15，但刚好衔接可以都看"},{input:`3
720 60
800 60
900 60`,output:"3",explanation:"三场演出间隔都>=15分钟，可以全部观看"}],r=`**解题思路：**

本题是一道**贪心+区间调度**问题。

**核心思路：**
- 按结束时间排序，优先选择结束早的演出
- 下一场演出开始时间与上一场结束时间间隔>=15分钟才能观看

**算法步骤：**
1. 读取所有演出，计算结束时间=开始时间+持续时间
2. 按结束时间升序排序
3. 贪心选择：若当前演出开始时间-上次结束时间>=15，则观看
4. 统计可观看的演出数量

**时间复杂度**：O(NlogN)`,o={java:`import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        
        // 输入演出场数
        int n = in.nextInt();

        // 创建一个列表来存储演出时间表
        List<List<Integer>> schedule = new ArrayList<>();
        
        // 循环读取每个演出的开始时间和持续时间，并将其添加到演出时间表中
        for (int i = 0; i < n; i++) {
            int startTime = in.nextInt();
            int endTime = startTime + in.nextInt();
            schedule.add(List.of(startTime, endTime));
        }
        
        // 将演出时间表按照结束时间进行排序
        schedule.sort(Comparator.comparingInt(a -> a.get(1)));

        // 获取第一个演出的结束时间和初始化观看的演出场数
        int firstEndTime = schedule.get(0).get(1);
        int numShows = 1;

        // 遍历演出时间表中的每个演出时间段
        for (List<Integer> interval : schedule) {
            int startTime = interval.get(0);
            int endTime = interval.get(1);

            // 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
            if (startTime - firstEndTime >= 15) {
                numShows++;
                firstEndTime = endTime;
            }
        }

        // 输出最多能观看的演出场数
        System.out.println(numShows);
    }
}`,python:`import sys

# 输入演出场数
n = int(input())

# 创建一个列表来存储演出时间表
schedule = []

# 循环读取每个演出的开始时间和持续时间，并将其添加到演出时间表中
for i in range(n):
    time = input()
    startTime = int(time.split()[0])
    endTime = startTime + int(time.split()[1])
    schedule.append([startTime, endTime])

# 将演出时间表按照结束时间进行排序
schedule.sort(key=lambda x: x[1])

# 获取第一个演出的结束时间和初始化观看的演出场数
firstEndTime = schedule[0][1]
numShows = 1

# 遍历演出时间表中的每个演出时间段
for interval in schedule:
    startTime = interval[0]
    endTime = interval[1]

    # 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
    if startTime - firstEndTime >= 15:
        numShows += 1
        firstEndTime = endTime

# 输出最多能观看的演出场数
print(numShows)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let n;
  let schedule = [];
 

rl.on('line', (input) => {
  if (!n) {
    n = parseInt(input);
  } else {
    let [start, end] = input.split(' ').map(Number);
    schedule.push([start, start + end]);
    if (schedule.length === n) {
          // 将演出时间表按照结束时间进行排序
      schedule.sort((a, b) => a[1] - b[1]);

      // 获取第一个演出的结束时间和初始化观看的演出场数
      let firstEndTime = schedule[0][1];
      let numShows = 1;

      // 遍历演出时间表中的每个演出时间段
      for (let i = 1; i < n; i++) {
        const [startTime, endTime] = schedule[i];

        // 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
        if (startTime - firstEndTime >= 15) {
          numShows++;
          firstEndTime = endTime;
        }
      }
    console.log(numShows);
    }
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    // 读取演出场次的数量
    cin >> n;

    // 定义一个二维向量，用于存储每场演出的开始时间和结束时间
    vector<vector<int>> schedule;

    // 读取每场演出的开始时间和持续时间，并计算结束时间
    for (int i = 0; i < n; i++) {
        int startTime, duration;
        // 读取每场演出的开始时间和持续时间
        cin >> startTime >> duration;
        // 计算演出的结束时间
        int endTime = startTime + duration;
        // 将开始时间和结束时间存入schedule向量中
        schedule.push_back({startTime, endTime});
    }

    // 对所有演出按照结束时间进行排序，确保优先选择结束时间较早的演出
    sort(schedule.begin(), schedule.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[1] < b[1];
    });

    // 记录第一场选择的演出的结束时间
    int firstEndTime = schedule[0][1];
    // 记录小明可以观看的演出场次，初始为1（选择了第一场）
    int numShows = 1;

    // 遍历每一场演出，判断能否在当前时间后观看
    for (const vector<int>& interval : schedule) {
        int startTime = interval[0];  // 当前演出的开始时间
        int endTime = interval[1];    // 当前演出的结束时间

        // 如果当前演出的开始时间与上一个观看的演出结束时间之间有至少15分钟的间隔
        if (startTime - firstEndTime >= 15) {
            numShows++;  // 小明可以观看这场演出，增加计数
            firstEndTime = endTime;  // 更新为当前演出的结束时间，作为下次判断的依据
        }
    }

    // 输出小明最多可以观看的演出场次
    cout << numShows << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

#define MAX_N 1000

// 定义一个结构体，用于存储每场演出的开始时间和结束时间
typedef struct {
    int startTime;  // 演出的开始时间
    int endTime;    // 演出的结束时间
} Show;

// 比较函数，用于qsort对演出按结束时间进行排序
int compare(const void *a, const void *b) {
    Show *showA = (Show *)a;
    Show *showB = (Show *)b;
    return showA->endTime - showB->endTime;  // 按结束时间升序排列
}

int main() {
    int n;
    // 读取演出场次的数量
    scanf("%d", &n);

    // 定义一个数组，用于存储每场演出的开始时间和结束时间
    Show schedule[MAX_N];

    // 读取每场演出的开始时间和持续时间，并计算结束时间
    for (int i = 0; i < n; i++) {
        int startTime, duration;
        // 读取每场演出的开始时间和持续时间
        scanf("%d %d", &startTime, &duration);
        // 计算演出的结束时间，并存储在结构体数组中
        schedule[i].startTime = startTime;
        schedule[i].endTime = startTime + duration;
    }

    // 使用qsort函数对所有演出按照结束时间进行排序
    qsort(schedule, n, sizeof(Show), compare);

    // 记录第一场选择的演出的结束时间
    int firstEndTime = schedule[0].endTime;
    // 记录小明可以观看的演出场次，初始为1（选择了第一场）
    int numShows = 1;

    // 遍历剩下的每一场演出，判断能否在当前时间后观看
    for (int i = 1; i < n; i++) {
        int startTime = schedule[i].startTime;  // 当前演出的开始时间
        int endTime = schedule[i].endTime;      // 当前演出的结束时间

        // 如果当前演出的开始时间与上一个观看的演出结束时间之间有至少15分钟的间隔
        if (startTime - firstEndTime >= 15) {
            numShows++;  // 小明可以观看这场演出，增加计数
            firstEndTime = endTime;  // 更新为当前演出的结束时间，作为下次判断的依据
        }
    }

    // 输出小明最多可以观看的演出场次
    printf("%d\\n", numShows);

    return 0;
}`},u={id:"137",title:n,examType:"A",score:200,description:t,inputDesc:e,outputDesc:i,examples:s,solution:r,codes:o};export{o as codes,u as default,t as description,d as examType,s as examples,a as id,e as inputDesc,i as outputDesc,m as score,r as solution,n as title};
