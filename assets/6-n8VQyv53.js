const s="6",n="优秀学员统计",d="A",p=100,i=`公司某部门软件教导团正在组织新员工每日打卡学习活动，他们开展这项学习活动已经一个月了，所以想统计下这个月优秀的打卡员工。每个员工会对应一个id，每天的打卡记录记录当天打卡员工的id集合，一共30天。

请你实现代码帮助统计出打卡次数 **top5** 的员工。如果打卡次数相同，将较早参与打卡的员工排在前面，如果开始参与打卡的时间还是一样，将id较小的员工排在前面。

**注意**：不考虑并列的情况，按规则返回前5名员工的id即可，如果当月打卡的员工少于5个，按规则排序返回所有有打卡记录的员工id。`,t=`- 第一行：新员工数量 N，表示新员工编号id为 0 到 N-1，N 的范围为 [1, 100]
- 第二行：30个整数，表示每天打卡的员工数量，每天至少有1名员工打卡
- 之后30行：每天打卡的员工id集合（id不会重复）`,e="按顺序输出打卡 top5 员工的id，用空格隔开",o=[{input:`11
4 4 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2
0 1 7 10
0 1 6 10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
10
6 10
7 10`,output:"10 0 1 7 6",explanation:"员工编号范围为0~10。id为10的员工连续打卡30天，排第一。id为0,1,6,7的员工都打卡2天。其中0,1,7在第一天就打卡，比id为6的员工早，排在前面。0,1,7按id升序排列，所以最终输出 10 0 1 7 6。"},{input:`7
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5
0 1 2 3 4 5`,output:"0 1 2 3 4",explanation:"员工编号范围为0~6。id为0,1,2,3,4,5的员工打卡次数相同（都是30次），最早开始打卡的时间也一样（都是第1天），所以按id升序返回前5个id：0 1 2 3 4。"},{input:`2
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
0 1
0 1`,output:"1 0",explanation:"只有两名员工参与打卡。id为1的员工打卡30次，id为0的员工打卡2次。按打卡次数排序，输出 1 0。"}],a=`**解题思路：**

这是一道排序问题，关键在于设计正确的排序规则。

**算法步骤：**

1. **统计打卡信息**：遍历30天的打卡记录，对每个员工记录：
   - 打卡次数
   - 首次打卡的日期（用于排序）

2. **设计排序规则**（优先级从高到低）：
   - 打卡次数多的排前面
   - 次数相同时，首次打卡日期早的排前面
   - 日期也相同时，id小的排前面

3. **输出结果**：取排序后的前5名（或全部，如果不足5人）

**关键点：**
- 使用 HashMap 或数组存储每个员工的统计信息
- 自定义比较器实现多级排序`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        int[] dayCount = new int[30];
        for (int i = 0; i < 30; i++) {
            dayCount[i] = sc.nextInt();
        }
        
        // 记录每个员工的 [打卡次数, 首次打卡日期]
        Map<Integer, int[]> info = new HashMap<>();
        
        for (int day = 0; day < 30; day++) {
            for (int j = 0; j < dayCount[day]; j++) {
                int id = sc.nextInt();
                if (info.containsKey(id)) {
                    info.get(id)[0]++;
                } else {
                    info.put(id, new int[]{1, day});
                }
            }
        }
        
        // 转为列表并排序
        List<int[]> list = new ArrayList<>();
        for (int id : info.keySet()) {
            int[] data = info.get(id);
            list.add(new int[]{id, data[0], data[1]});
        }
        
        // 排序：打卡次数降序 -> 首次打卡日期升序 -> id升序
        list.sort((a, b) -> {
            if (a[1] != b[1]) return b[1] - a[1];
            if (a[2] != b[2]) return a[2] - b[2];
            return a[0] - b[0];
        });
        
        // 输出前5名
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(5, list.size()); i++) {
            if (i > 0) sb.append(" ");
            sb.append(list.get(i)[0]);
        }
        System.out.println(sb);
    }
}`,python:`from functools import cmp_to_key

n = int(input())
day_count = list(map(int, input().split()))

# 记录每个员工的 {id: [打卡次数, 首次打卡日期]}
info = {}

for day in range(30):
    ids = list(map(int, input().split()))
    for emp_id in ids:
        if emp_id in info:
            info[emp_id][0] += 1
        else:
            info[emp_id] = [1, day]

# 转为列表 [[id, 次数, 首次日期], ...]
emp_list = [[emp_id, data[0], data[1]] for emp_id, data in info.items()]

# 排序：打卡次数降序 -> 首次打卡日期升序 -> id升序
def compare(a, b):
    if a[1] != b[1]:
        return b[1] - a[1]  # 次数降序
    if a[2] != b[2]:
        return a[2] - b[2]  # 日期升序
    return a[0] - b[0]      # id升序

emp_list.sort(key=cmp_to_key(compare))

# 输出前5名
result = [str(emp[0]) for emp in emp_list[:5]]
print(' '.join(result))`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  
  if (lines.length >= 32) {
    const n = parseInt(lines[0]);
    const dayCount = lines[1].split(' ').map(Number);
    
    // 记录每个员工的信息
    const info = new Map();
    
    for (let day = 0; day < 30; day++) {
      const ids = lines[day + 2].split(' ').map(Number);
      for (const id of ids) {
        if (info.has(id)) {
          info.get(id).count++;
        } else {
          info.set(id, { count: 1, firstDay: day });
        }
      }
    }
    
    // 转为数组并排序
    const arr = [];
    for (const [id, data] of info) {
      arr.push([parseInt(id), data.count, data.firstDay]);
    }
    
    arr.sort((a, b) => {
      if (a[1] !== b[1]) return b[1] - a[1];
      if (a[2] !== b[2]) return a[2] - b[2];
      return a[0] - b[0];
    });
    
    // 输出前5名
    const result = arr.slice(0, 5).map(item => item[0]);
    console.log(result.join(' '));
    rl.close();
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int dayCount[30];
    for (int i = 0; i < 30; i++) {
        cin >> dayCount[i];
    }
    
    // 记录每个员工的 [打卡次数, 首次打卡日期]
    map<int, pair<int, int>> info;
    
    for (int day = 0; day < 30; day++) {
        for (int j = 0; j < dayCount[day]; j++) {
            int id;
            cin >> id;
            if (info.count(id)) {
                info[id].first++;
            } else {
                info[id] = {1, day};
            }
        }
    }
    
    // 转为vector并排序
    vector<tuple<int, int, int>> arr;  // {id, count, firstDay}
    for (auto& p : info) {
        arr.push_back({p.first, p.second.first, p.second.second});
    }
    
    sort(arr.begin(), arr.end(), [](auto& a, auto& b) {
        if (get<1>(a) != get<1>(b)) return get<1>(a) > get<1>(b);
        if (get<2>(a) != get<2>(b)) return get<2>(a) < get<2>(b);
        return get<0>(a) < get<0>(b);
    });
    
    // 输出前5名
    for (int i = 0; i < min(5, (int)arr.size()); i++) {
        if (i > 0) cout << " ";
        cout << get<0>(arr[i]);
    }
    cout << endl;
    
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    int count;
    int firstDay;
} Employee;

int compare(const void* a, const void* b) {
    Employee* ea = (Employee*)a;
    Employee* eb = (Employee*)b;
    if (ea->count != eb->count) return eb->count - ea->count;
    if (ea->firstDay != eb->firstDay) return ea->firstDay - eb->firstDay;
    return ea->id - eb->id;
}

int main() {
    int n;
    scanf("%d", &n);
    
    int dayCount[30];
    for (int i = 0; i < 30; i++) {
        scanf("%d", &dayCount[i]);
    }
    
    Employee employees[100];
    int exists[100] = {0};
    int empCount = 0;
    
    for (int day = 0; day < 30; day++) {
        for (int j = 0; j < dayCount[day]; j++) {
            int id;
            scanf("%d", &id);
            
            if (exists[id]) {
                for (int k = 0; k < empCount; k++) {
                    if (employees[k].id == id) {
                        employees[k].count++;
                        break;
                    }
                }
            } else {
                employees[empCount].id = id;
                employees[empCount].count = 1;
                employees[empCount].firstDay = day;
                exists[id] = 1;
                empCount++;
            }
        }
    }
    
    qsort(employees, empCount, sizeof(Employee), compare);
    
    for (int i = 0; i < empCount && i < 5; i++) {
        if (i > 0) printf(" ");
        printf("%d", employees[i].id);
    }
    printf("\\n");
    
    return 0;
}`},u={id:"6",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:o,solution:a,codes:r};export{r as codes,u as default,i as description,d as examType,o as examples,s as id,t as inputDesc,e as outputDesc,p as score,a as solution,n as title};
