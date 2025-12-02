const c="134",n="电脑病毒感染",m="A",r=200,i=`一个局域网内有很多台电脑，分别标注为 0 ~ N-1 的数字。相连接的电脑距离不一样，所以感染时间不一样，感染时间用 t 表示。
其中网络内一台电脑被病毒感染，求其感染网络内所有的电脑最少需要多长时间。如果最后有电脑不会感染，则返回-1。
给定一个数组 times 表示一台电脑把相邻电脑感染所用的时间。
如图：path[i] = {i, j, t} 表示：电脑 i->j，电脑 i 上的病毒感染 j，需要时间 t。`,t=`第一行输入一个整数N ，表示局域网内电脑个数 N ，1 ≤ N ≤ 200 ;
第二行输入一个整数M ,表示有 M 条网络连接；
接下来M行 ,每行输入为 i , j , t 。表示电脑 i 感染电脑j 需要时间 t 。（1 ≤ i , j ≤ N）
最后一行为病毒所在的电脑编号。`,e="输出最少需要多少时间才能感染全部电脑，如果不存在输出 -1",s=[{input:`4
4
1 2 2
2 3 3
3 4 1
1 4 7
1`,output:"6",explanation:"从电脑1开始感染，1->2需2秒，2->3需3秒，3->4需1秒，共6秒感染全部"},{input:`3
2
1 2 5
2 3 3
1`,output:"8",explanation:"1->2需5秒，2->3需3秒，感染全部需8秒"},{input:`3
1
1 2 5
1`,output:"-1",explanation:"电脑3无法被感染，返回-1"}],o=`**解题思路：**

本题是一道**单源最短路径(Bellman-Ford)**问题。

**核心思路：**
- 求从病毒源到所有电脑的最短感染时间
- 所有电脑都被感染的时间=最大的最短路径

**算法步骤：**
1. 初始化距离数组，源点为0，其余为无穷大
2. 进行N-1轮松弛操作，遍历所有边更新最短距离
3. 找出所有距离中的最大值
4. 若存在无穷大距离，返回-1

**时间复杂度**：O(V×E)，V为顶点数，E为边数`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt(); // 电脑的数量
        int connections = sc.nextInt(); // 网络连接的数量
        int[][] times = new int[connections][3]; // 存储每个连接和对应的感染时间
        for (int i = 0; i < connections; i++) {
            // 读取每个连接的信息，将电脑编号减1转换为从0开始的索引
            times[i][0] = sc.nextInt() - 1; // 感染源电脑编号
            times[i][1] = sc.nextInt() - 1; // 被感染电脑编号
            times[i][2] = sc.nextInt(); // 感染所需时间
        }
        int initial = sc.nextInt() - 1; // 初始被感染的电脑编号，转换为从0开始的索引
        sc.close(); // 关闭输入流

        // 输出感染所有电脑所需的最少时间
        System.out.println(networkDelayTime(times, N, initial));
    }

    // 计算感染所有电脑所需的最少时间的函数
    public static int networkDelayTime(int[][] times, int N, int K) {
        final int INF = Integer.MAX_VALUE / 2; // 定义无穷大的值，用于初始化距离数组
        int[] dist = new int[N]; // 存储从源电脑到其他所有电脑的最短感染时间
        Arrays.fill(dist, INF); // 初始化所有感染时间为无穷大
        dist[K] = 0; // 源电脑的感染时间为0

        // 使用Bellman-Ford算法更新所有电脑的最短感染时间
        for (int i = 0; i < N; i++) {
            for (int[] time : times) {
                int u = time[0], v = time[1], w = time[2];
                // 如果可以通过电脑u感染到电脑v，并且时间更短，则更新电脑v的感染时间
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        // 找出所有电脑中最长的感染时间
        int maxWait = 0;
        for (int i = 0; i < N; i++) {
            // 如果有电脑的感染时间仍为无穷大，表示该电脑不可被感染，返回-1
            if (dist[i] == INF) return -1;
            // 更新最长的感染时间
            maxWait = Math.max(maxWait, dist[i]);
        }

        // 返回感染所有电脑所需的最少时间
        return maxWait;
    }
}`,python:`import sys

# 计算感染所有电脑所需的最少时间的函数
def network_delay_time(times, N, K):
    INF = float('inf')  # 定义无穷大的值，用于初始化距离数组
    dist = [INF] * N  # 存储从源电脑到其他所有电脑的最短感染时间
    dist[K] = 0  # 源电脑的感染时间为0

    # 使用Bellman-Ford算法更新所有电脑的最短感染时间
    for _ in range(N):
        for u, v, w in times:
            # 如果可以通过电脑u感染到电脑v，并且时间更短，则更新电脑v的感染时间
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # 找出所有电脑中最长的感染时间
    max_wait = max(dist)
    # 如果有电脑的感染时间仍为无穷大，表示该电脑不可被感染，返回-1
    return max_wait if max_wait < INF else -1

 
N = int(input())
connections = int(input()) # 电脑的数量和网络连接的数量
times = []  # 存储每个连接和对应的感染时间
for _ in range(connections):
    # 读取每个连接的信息，将电脑编号减1转换为从0开始的索引
    u, v, w = map(int, input().split())
    times.append((u - 1, v - 1, w))  # 感染源电脑编号，被感染电脑编号，感染所需时间
initial = int(input()) - 1  # 初始被感染的电脑编号，转换为从0开始的索引

# 输出感染所有电脑所需的最少时间
print(network_delay_time(times, N, initial))`,javascript:"",cpp:`#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>

using namespace std;
// 计算感染所有电脑所需的最少时间的函数
int networkDelayTime(vector<vector<int>>& times, int N, int K) {
    const int INF = INT_MAX / 2; // 定义无穷大的值，用于初始化距离数组
    vector<int> dist(N, INF); // 存储从源电脑到其他所有电脑的最短感染时间
    dist[K] = 0; // 源电脑的感染时间为0

    // 使用Bellman-Ford算法更新所有电脑的最短感染时间
    for (int i = 0; i < N; ++i) {
        for (const auto& time : times) {
            int u = time[0], v = time[1], w = time[2];
            // 如果可以通过电脑u感染到电脑v，并且时间更短，则更新电脑v的感染时间
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // 找出所有电脑中最长的感染时间
    int maxWait = 0;
    for (int i = 0; i < N; ++i) {
        // 如果有电脑的感染时间仍为无穷大，表示该电脑不可被感染，返回-1
        if (dist[i] == INF) return -1;
        // 更新最长的感染时间
        maxWait = max(maxWait, dist[i]);
    }

    // 返回感染所有电脑所需的最少时间
    return maxWait;
}

int main() {
    int N, connections;
    cin >> N >> connections; // 电脑的数量和网络连接的数量
    vector<vector<int>> times(connections, vector<int>(3)); // 存储每个连接和对应的感染时间
    for (int i = 0; i < connections; ++i) {
        // 读取每个连接的信息，将电脑编号减1转换为从0开始的索引
        cin >> times[i][0] >> times[i][1] >> times[i][2];
        times[i][0]--; // 感染源电脑编号
        times[i][1]--; // 被感染电脑编号
    }
    int initial;
    cin >> initial; // 初始被感染的电脑编号，转换为从0开始的索引
    initial--;

    // 输出感染所有电脑所需的最少时间
    cout << networkDelayTime(times, N, initial) << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <limits.h> // 引入INT_MAX

#define INF (INT_MAX / 2) // 定义无穷大的值

// 计算感染所有电脑所需的最少时间
int networkDelayTime(int times[][3], int connections, int N, int K) {
    int dist[N]; // 存储从源电脑到其他所有电脑的最短感染时间
    for (int i = 0; i < N; i++) {
        dist[i] = INF; // 初始化所有感染时间为无穷大
    }
    dist[K] = 0; // 源电脑的感染时间设为0

    // 使用Bellman-Ford算法更新所有电脑的最短感染时间
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < connections; j++) {
            int u = times[j][0], v = times[j][1], w = times[j][2];
            // 如果可以通过电脑u感染到电脑v，并且时间更短，则更新电脑v的感染时间
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // 找出所有电脑中最长的感染时间
    int maxWait = 0;
    for (int i = 0; i < N; i++) {
        // 如果有电脑的感染时间仍为无穷大，表示该电脑不可被感染，返回-1
        if (dist[i] == INF) return -1;
        // 更新最长的感染时间
        if (dist[i] > maxWait) {
            maxWait = dist[i];
        }
    }

    // 返回感染所有电脑所需的最少时间
    return maxWait;
}

int main() {
    int N, connections; // 电脑的数量和网络连接的数量
    scanf("%d", &N );
    scanf("%d",  &connections);

    int times[connections][3]; // 存储每个连接和对应的感染时间

    // 读取网络连接信息
    for (int i = 0; i < connections; i++) {
        scanf("%d %d %d", &times[i][0], &times[i][1], &times[i][2]);
        times[i][0]--; // 将电脑编号转换为从0开始的索引
        times[i][1]--;
    }

    int initial; // 初始被感染的电脑编号
    scanf("%d", &initial);
    initial--; // 转换为从0开始的索引

    // 输出感染所有电脑所需的最少时间
    printf("%d\\n", networkDelayTime(times, connections, N, initial));

    return 0;
}`},d={id:"134",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:s,solution:o,codes:a};export{a as codes,d as default,i as description,m as examType,s as examples,c as id,t as inputDesc,e as outputDesc,r as score,o as solution,n as title};
