const c="8",n="免单统计",d="A",u=100,e=`华为商城举办了一个促销活动，如果某顾客是某一秒内最早时刻下单的顾客（可能是多个人），则可以获取免单。

请你编程计算有多少顾客可以获取免单。`,t=`- 第一行：顾客数量 n（0 < n < 50000）
- 接下来 n 行：每行表示一位顾客的下单时间

时间格式：\`yyyy-MM-dd HH:mm:ss.fff\`（年-月-日 时:分:秒.毫秒）

约束条件：
- 2000 < yyyy < 2020
- 0 < MM <= 12
- 0 < dd <= 28
- 0 <= HH <= 23
- 0 <= mm <= 59
- 0 <= ss <= 59
- 0 <= fff <= 999`,r="输出一个整数，表示有多少顾客可以获取免单",o=[{input:`3
2019-01-01 00:00:00.001
2019-01-01 00:00:00.002
2019-01-01 00:00:00.003`,output:"1",explanation:"三个订单都是同一秒（00:00:00）内下单，只有第一个订单（001毫秒）最早下单，可以免单。"},{input:`3
2019-01-01 08:59:00.123
2019-01-01 08:59:00.123
2018-12-28 10:08:00.999`,output:"3",explanation:"前两个订单是同一秒内同一时刻（123毫秒，都是最早）下单，都可免单。第三个订单是其所在秒内唯一的订单（也是最早），也可免单。共3人免单。"},{input:`5
2019-01-01 00:00:00.004
2019-01-01 00:00:00.004
2019-01-01 00:00:01.006
2019-01-01 00:00:01.006
2019-01-01 00:00:01.005`,output:"3",explanation:"前两个订单是00:00:00秒内同一时刻（004毫秒）下单，都可免单。第三、四个订单在00:00:01秒内下单，但006毫秒不是最早的。第五个订单是005毫秒，是00:00:01秒内最早的，可免单。共3人免单。"}],i=`**解题思路：**

本题是一道**分组统计**问题。

**核心思路：**
- 按秒分组（忽略毫秒），每一秒内只有毫秒最小的订单可以免单
- 同一秒内有多个相同毫秒的最早订单，都可以免单

**算法步骤：**
1. 使用TreeMap按时间排序
2. 提取秒级时间（前19个字符）进行分组
3. 每秒内只统计最早时间的订单数

**时间复杂度**：O(N log N)`,s={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());
        
        // TreeMap 自动按键排序
        TreeMap<String, Integer> orders = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            String time = sc.nextLine();
            orders.put(time, orders.getOrDefault(time, 0) + 1);
        }
        
        int count = 0;
        String prevSecond = "";
        
        for (String time : orders.keySet()) {
            String second = time.substring(0, 19);  // 提取秒级时间
            if (!second.equals(prevSecond)) {
                count += orders.get(time);  // 新的秒，当前是该秒最早的
                prevSecond = second;
            }
        }
        
        System.out.println(count);
    }
}`,python:`from collections import defaultdict

n = int(input())
orders = defaultdict(int)

for _ in range(n):
    time = input().strip()
    orders[time] += 1

# 按时间排序
sorted_times = sorted(orders.keys())

count = 0
prev_second = ""

for time in sorted_times:
    second = time[:19]  # 提取秒级时间
    if second != prev_second:
        count += orders[time]  # 新的秒，当前是该秒最早的
        prev_second = second

print(count)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  const n = parseInt(lines[0]);
  const orders = new Map();
  
  for (let i = 1; i <= n; i++) {
    const time = lines[i];
    orders.set(time, (orders.get(time) || 0) + 1);
  }
  
  // 按时间排序
  const sortedTimes = [...orders.keys()].sort();
  
  let count = 0;
  let prevSecond = '';
  
  for (const time of sortedTimes) {
    const second = time.substring(0, 19);
    if (second !== prevSecond) {
      count += orders.get(time);
      prevSecond = second;
    }
  }
  
  console.log(count);
});`,cpp:`#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    cin.ignore();
    
    map<string, int> orders;  // map 自动按键排序
    
    for (int i = 0; i < n; i++) {
        string time;
        getline(cin, time);
        orders[time]++;
    }
    
    int count = 0;
    string prevSecond = "";
    
    for (auto& p : orders) {
        string second = p.first.substr(0, 19);
        if (second != prevSecond) {
            count += p.second;
            prevSecond = second;
        }
    }
    
    cout << count << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char time[30];
    int count;
} Order;

int compare(const void* a, const void* b) {
    return strcmp(((Order*)a)->time, ((Order*)b)->time);
}

int main() {
    int n;
    scanf("%d", &n);
    getchar();
    
    Order orders[50000];
    int orderCount = 0;
    
    for (int i = 0; i < n; i++) {
        char time[30];
        fgets(time, sizeof(time), stdin);
        time[strcspn(time, "\\n")] = 0;
        
        // 查找是否已存在
        int found = -1;
        for (int j = 0; j < orderCount; j++) {
            if (strcmp(orders[j].time, time) == 0) {
                found = j;
                break;
            }
        }
        
        if (found >= 0) {
            orders[found].count++;
        } else {
            strcpy(orders[orderCount].time, time);
            orders[orderCount].count = 1;
            orderCount++;
        }
    }
    
    // 排序
    qsort(orders, orderCount, sizeof(Order), compare);
    
    int count = 0;
    char prevSecond[20] = "";
    
    for (int i = 0; i < orderCount; i++) {
        char second[20];
        strncpy(second, orders[i].time, 19);
        second[19] = '\\0';
        
        if (strcmp(second, prevSecond) != 0) {
            count += orders[i].count;
            strcpy(prevSecond, second);
        }
    }
    
    printf("%d\\n", count);
    return 0;
}`},p={id:"8",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:r,examples:o,solution:i,codes:s};export{s as codes,p as default,e as description,d as examType,o as examples,c as id,t as inputDesc,r as outputDesc,u as score,i as solution,n as title};
