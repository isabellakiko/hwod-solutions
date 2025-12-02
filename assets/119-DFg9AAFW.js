const o="119",n="可以处理的最大任务数",r="A",T=200,t="在某个项目中有多个任务(用tasks数组表示)需要您进行处理，其中tasks[i]=[si,ei],你可以在si <= day <= ei中的任意一天处理该任务，请返回你可以处理的最大任务数",i="第一行为任务数量n，1 <=n<= 100000。后面n行表示各个任务的开始时间和终止时间，使用si,ei表示,1 <= si <= ei <= 100000",s=`输出为一个整数，表示可以处理的最大任务数。
输入
输出`,e=[{input:`3
1 1
1 2
1 3`,output:"3",explanation:"三个任务可在第1、2、3天分别完成"},{input:`3
1 1
1 1
1 1`,output:"1",explanation:"三个任务都只能在第1天完成，最多完成1个"}],a=`**解题思路：**

本题是一道**贪心+优先队列**问题。

**核心思路：**
- 每天只能处理一个任务
- 优先处理结束时间最早的任务
- 用优先队列维护当前可执行任务

**算法步骤：**
1. 按开始时间将任务分组
2. 遍历每一天，将当天开始的任务入队
3. 移除已过期任务（结束时间<当天）
4. 取结束时间最早的任务执行

**时间复杂度**：O(T×logN)，T为时间范围`,p={java:`import java.util.*;

class Main {
    // 定义一个Task类来存储每个任务的开始时间和结束时间
    static class Task {
        int startTime;  // 任务开始时间
        int endTime;    // 任务结束时间

        // Task类的构造函数，用于初始化任务的开始时间和结束时间
        Task(int startTime, int endTime) {
            this.startTime = startTime;
            this.endTime = endTime;
        }
    }

    // 创建一个List数组，用于存储所有的任务，每个时间点对应一个任务列表
    static List<Task>[] a = new List[100001];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // 读取任务的总数
        
        // 初始化任务列表数组
        for (int i = 0; i < 100001; i++) {
            a[i] = new ArrayList<>();
        }

        // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
        for (int i = 0; i < n; i++) { 
            int x = sc.nextInt(); // 任务开始时间
            int y = sc.nextInt(); // 任务结束时间
            a[x].add(new Task(x, y)); // 创建任务并添加到任务列表中
        }

         
        int ans = 0; // 用于记录能完成的任务数量
        // 创建一个优先队列，根据任务的结束时间进行排序，确保每次都处理结束时间最早的任务
        PriorityQueue<Task> pq = new PriorityQueue<>(Comparator.comparingInt(t -> t.endTime));

        // 遍历每个时间点
        for (int i = 0; i < 100001; i++) {
            // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
            while (!pq.isEmpty() && pq.peek().endTime < i) {
                pq.poll();
            }

            // 如果当前时间点有任务
            if (a[i] != null) {
                // 将当前时间点的所有任务加入优先队列
                for (Task task : a[i]) {
                    pq.add(task);
                }
            }

            // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
            if (!pq.isEmpty()) {
                ans++;
                pq.poll();
            }
        }

        // 输出能完成的任务数量
        System.out.println(ans);
    }
}`,python:`import heapq  # 导入heapq模块用于实现优先队列

# 定义一个Task类来存储每个任务的开始时间和结束时间
class Task:
    def __init__(self, startTime, endTime):
        self.startTime = startTime  # 任务开始时间
        self.endTime = endTime      # 任务结束时间

    def __lt__(self, other):
        # 定义小于操作，用于优先队列中比较Task对象，根据结束时间进行排序
        return self.endTime < other.endTime

# 创建一个列表，用于存储所有的任务，每个时间点对应一个任务列表
a = [[] for _ in range(100001)]

# 读取任务的总数
n = int(input())

# 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
for _ in range(n):
    x, y = map(int, input().split())  # 读取任务开始时间和结束时间
    a[x].append(Task(x, y))  # 创建任务并添加到任务列表中

ans = 0  # 用于记录能完成的任务数量
# 创建一个优先队列，根据任务的结束时间进行排序，确保每次都处理结束时间最早的任务
pq = []

# 遍历每个时间点
for i in range(100001):
    # 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
    while pq and pq[0].endTime < i:
        heapq.heappop(pq)

    # 如果当前时间点有任务
    for task in a[i]:
        # 将当前时间点的所有任务加入优先队列
        heapq.heappush(pq, task)

    # 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
    if pq:
        ans += 1
        heapq.heappop(pq)

# 输出能完成的任务数量
print(ans)`,javascript:"",cpp:`#include <iostream>
#include <vector>
#include <queue>
#include <functional>

using namespace std;
// 定义一个Task结构体来存储每个任务的开始时间和结束时间
struct Task {
    int startTime;  // 任务开始时间
    int endTime;    // 任务结束时间

    // Task结构体的构造函数，用于初始化任务的开始时间和结束时间
    Task(int start, int end) : startTime(start), endTime(end) {}
};

// 比较函数，用于优先队列根据任务的结束时间进行排序
struct compare {
    bool operator()(const Task& a, const Task& b) {
        return a.endTime > b.endTime;
    }
};

int main() {
    int n;
    cin >> n; // 读取任务的总数

    // 使用vector来动态存储任务列表，每个时间点对应一个任务列表
    vector<vector<Task>> tasks(100001);

    // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
    for (int i = 0; i < n; i++) {
        int startTime, endTime;
        cin >> startTime >> endTime;
        tasks[startTime].emplace_back(startTime, endTime);
    }

    priority_queue<Task, vector<Task>, compare> pq; // 创建一个优先队列

    int ans = 0; // 用于记录能完成的任务数量

    // 遍历每个时间点
    for (int i = 0; i < 100001; i++) {
        // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
        while (!pq.empty() && pq.top().endTime < i) {
            pq.pop();
        }

        // 将当前时间点的所有任务加入优先队列
        for (const auto& task : tasks[i]) {
            pq.push(task);
        }

        // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
        if (!pq.empty()) {
            ans++;
            pq.pop();
        }
    }

    cout << ans << endl; // 输出能完成的任务数量
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

// 定义任务结构体，用于存储每个任务的开始时间和结束时间
typedef struct {
    int startTime;  // 任务开始时间
    int endTime;    // 任务结束时间
} Task;

// 优先队列的比较函数，用于比较两个任务的结束时间
int cmp(const void *a, const void *b) {
    Task *taskA = (Task *)a;
    Task *taskB = (Task *)b;
    return taskA->endTime - taskB->endTime;
}

// 定义任务列表，每个时间点对应一个任务列表
Task *tasks[100001];
int taskCounts[100001] = {0}; // 存储每个时间点任务的数量

int main() {
    int n; // 任务总数
    scanf("%d", &n);

    // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
    for (int i = 0; i < n; i++) {
        int x, y; // 任务开始时间和结束时间
        scanf("%d %d", &x, &y);
        Task newTask = {x, y}; // 创建新任务
        tasks[x] = (Task *)realloc(tasks[x], (taskCounts[x] + 1) * sizeof(Task)); // 为新任务分配空间
        tasks[x][taskCounts[x]] = newTask; // 将新任务添加到列表中
        taskCounts[x]++; // 更新任务数量
    }

    int ans = 0; // 用于记录能完成的任务数量
    Task pq[100001]; // 创建一个优先队列
    int pqSize = 0; // 优先队列的大小

    // 遍历每个时间点
    for (int i = 0; i < 100001; i++) {
        // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
        while (pqSize > 0 && pq[0].endTime < i) {
            pq[0] = pq[--pqSize]; // 移除队列顶部的任务
            qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
        }

        // 如果当前时间点有任务
        if (taskCounts[i] > 0) {
            // 将当前时间点的所有任务加入优先队列
            for (int j = 0; j < taskCounts[i]; j++) {
                pq[pqSize++] = tasks[i][j];
                qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
            }
        }

        // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
        if (pqSize > 0) {
            ans++;
            pq[0] = pq[--pqSize]; // 移除队列顶部的任务
            qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
        }
    }

    // 输出能完成的任务数量
    printf("%d\\n", ans);

    return 0;
}`},c={id:"119",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:s,examples:e,solution:a,codes:p};export{p as codes,c as default,t as description,r as examType,e as examples,o as id,i as inputDesc,s as outputDesc,T as score,a as solution,n as title};
