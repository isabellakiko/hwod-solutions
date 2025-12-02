const c="56",n="运维日志排序",l="A",a=100,t=`[运维工程师]采集到某产品线网运行一天产生的日志n条，现需根据日志时间先后顺序对日志进行排序，日志时间格式为H:M:S.N。
H表示小时(0~23)M表示分钟(0~59)S表示秒(0~59)N表示毫秒(0~999)
时间可能并没有补全，也就是说，01:01:01.001也可能表示为1:1:1.1。`,o="第一行输入一个整数n表示日志条数，1<=n<=100000，接下来n行输入n个时间。",e="按时间升序排序之后的时间，如果有两个时间表示的时间相同，则保持输入顺序。",i=[{input:`2
0:41:8.9
0:1:09.211`,output:`0:1:09.211
0:41:8.9`,explanation:`0:1:09.211 = 69.211秒
0:41:8.9 = 2468.9秒
按时间升序排列。`},{input:`3
0:41:08.023
0:1:09.211
0:01:22.0`,output:`0:1:09.211
0:01:22.0
0:41:08.023`,explanation:`三个时间分别为69.211秒、82.0秒、2468.023秒。
按升序排列。`},{input:`2
0:41:08.023
0:41:08.23`,output:`0:41:08.023
0:41:08.23`,explanation:`两个时间：2468.023秒和2468.23秒。
23毫秒 < 230毫秒，但表示形式相同时保持原顺序。`}],r=`**解题思路：**

本题是一道**字符串解析+排序**问题。

**算法步骤：**

1. 解析时间字符串H:M:S.N，提取小时、分钟、秒、毫秒
2. 将时间转换为统一的毫秒数便于比较
3. 使用稳定排序按毫秒数升序排列
4. 输出排序后的原始时间字符串

**注意事项：**
- 时间格式不一定补全（如1:1:1.1）
- 相同时间需保持原顺序（稳定排序）

**时间复杂度**：O(N log N)`,s={java:`import java.util.*;
import java.util.regex.*;

public class Main {
    
    /* 将时间字符串转换为毫秒数 */
public static int convertToMillisecond(String timeStr) {
    Pattern pattern = Pattern.compile("(\\\\d+):(\\\\d+):(\\\\d+).(\\\\d+)");
    Matcher matcher = pattern.matcher(timeStr);
    return matcher.find() ? ((Integer.parseInt(matcher.group(1)) * 60 + Integer.parseInt(matcher.group(2))) * 60 + Integer.parseInt(matcher.group(3))) * 1000 + Integer.parseInt(matcher.group(4)) : 0;
}
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> logs = new ArrayList<>();
        int n = scanner.nextInt();
        scanner.nextLine(); // 忽略换行符
        for (int i = 0; i < n; i++) {
            String log = scanner.nextLine();
            logs.add(log);
        }
        /* 日志排序 */
        Collections.sort(logs, new Comparator<String>() {
            public int compare(String log1, String log2) {
                int time1 = convertToMillisecond(log1);
                int time2 = convertToMillisecond(log2);
                return time1 - time2;
            }
        });
        for (String log : logs) {
            System.out.println(log);
        }
    }
}`,python:`import re

def convertToMillisecond(timeStr):
    hour, minute, second, millisecond = map(int, re.findall(r'\\d+', timeStr))
    return hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000 + millisecond
logs = []
n = int(input())

for i in range(n):
    log = input()
    logs.append(log)

# 日志排序
logs.sort(key=lambda log: convertToMillisecond(log))

for log in logs:
    print(log)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const logs = [];
let n;

rl.on('line', (input) => {
  if (!n) {
    n = parseInt(input);
  } else {
    logs.push(input);
  }

  if (logs.length === n) {
    /* 日志排序 */
    logs.sort((log1, log2) => {
      const time1 = convertToMillisecond(log1);
      const time2 = convertToMillisecond(log2);
      return time1 < time2 ? -1 : 1;
    });

    for (const log of logs) {
      console.log(log);
    }

    rl.close();
  }
});

function convertToMillisecond(timeStr) {
  const match = timeStr.match(/(\\d+):(\\d+):(\\d+).(\\d+)/);
  return (parseInt(match[1]) * 3600000) + (parseInt(match[2]) * 60000) + (parseInt(match[3]) * 1000) + parseInt(match[4]);
}`,cpp:`#include <iostream>
#include <vector>
#include <regex>
#include <algorithm>

using namespace std;

int convertToMillisecond(string timeStr) {
    regex pattern("(\\\\d+):(\\\\d+):(\\\\d+).(\\\\d+)");
    smatch matcher;
    return regex_search(timeStr, matcher, pattern) ? ((stoi(matcher[1]) * 60 + stoi(matcher[2])) * 60 + stoi(matcher[3])) * 1000 + stoi(matcher[4]) : 0;
}
int main() {
    vector<string> logs;
    int n;
    cin >> n;
    cin.ignore(); // 忽略换行符
    for (int i = 0; i < n; i++) {
        string log;
        getline(cin, log);
        logs.push_back(log);
    }
    /* 日志排序 */
    sort(logs.begin(), logs.end(), [](const string& log1, const string& log2) {
        int time1 = convertToMillisecond(log1);
        int time2 = convertToMillisecond(log2);
        return time1 < time2;
    });
    for (const string& log : logs) {
        cout << log << endl;
    }
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 将时间字符串转换为毫秒数 */
int convertToMillisecond(const char *timeStr) {
    int hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
    sscanf(timeStr, "%d:%d:%d.%d", &hours, &minutes, &seconds, &milliseconds);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
}

/* 比较函数，用于qsort */
int compare(const void *a, const void *b) {
    const char **log1 = (const char **)a;
    const char **log2 = (const char **)b;
    
    int time1 = convertToMillisecond(*log1);
    int time2 = convertToMillisecond(*log2);
    
    return time1 - time2;
}

int main() {
    int n;
    scanf("%d", &n);
    getchar(); // 忽略换行符

    char **logs = (char **)malloc(n * sizeof(char *));
    for (int i = 0; i < n; i++) {
        logs[i] = (char *)malloc(50 * sizeof(char)); // 假设每个时间字符串长度不超过50
        fgets(logs[i], 50, stdin);
        
        // 去除fgets输入中的换行符
        logs[i][strcspn(logs[i], "\\n")] = '\\0';
    }

    /* 对日志进行排序 */
    qsort(logs, n, sizeof(char *), compare);

    /* 输出排序后的日志 */
    for (int i = 0; i < n; i++) {
        printf("%s\\n", logs[i]);
        free(logs[i]); // 释放每个日志字符串的内存
    }
    free(logs); // 释放日志指针数组的内存

    return 0;
}`},g={id:"56",title:n,examType:"A",score:100,description:t,inputDesc:o,outputDesc:e,examples:i,solution:r,codes:s};export{s as codes,g as default,t as description,l as examType,i as examples,c as id,o as inputDesc,e as outputDesc,a as score,r as solution,n as title};
