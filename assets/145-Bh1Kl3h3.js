const k="145",n="项目排期",o="A",c=200,i="项目组共有N个开发人员，项目经理接到了M个独立的需求，每个需求的工作量不同，且每个需求只能由一个开发人员独立完成，不能多人合作。假定各个需求直接无任何先后依赖关系，请设计算法帮助项目经理进行工作安排，使整个项目能用最少的时间交付。",t=`第一行输入为M个需求的工作量，单位为天，用逗号隔开。
例如：X1 X2 X3 … Xm 。表示共有M个需求，每个需求的工作量分别为X1天，X2天…Xm天。
其中0<M<30；0<Xm<200
第二行输入为项目组人员数量N`,r=`最快完成所有工作的天数
输入：
输出：
说明：
共有两位员工，其中一位分配需求 6 2 7 7 3 2 1共需要28天完成，另一位分配需求 9 3 11 4 共需要27天完成，故完成所有工作至少需要28天。`,e=[{input:`6 2 7 7 3 2 1 9 3 11 4
2`,output:"28",explanation:"2人分配任务，一人分配6 2 7 7 3 2 1共28天，另一人9 3 11 4共27天，最少需28天"},{input:`3 5 2 8
2`,output:"10",explanation:"2人分配，一人3+5+2=10天，另一人8天，最少需10天"}],s=`**解题思路：**

本题是一道**二分答案+回溯验证**问题。

**核心思路：**
- 二分查找最短完成时间
- 用回溯法验证能否在限定时间内分配完所有任务

**算法步骤：**
1. 任务按工作量降序排序（优先分配大任务）
2. 二分搜索范围[最大单任务, 总工作量]
3. 对每个mid值，用回溯法尝试分配任务给N个人
4. 若能在mid天内完成则缩小上界，否则增大下界
5. 返回最终的最短时间

**时间复杂度**：O(logS × N^M)，S为总工作量，N为人数，M为任务数`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 使用Scanner读取输入
        Scanner scanner = new Scanner(System.in);
        // 读取第一行输入，即需求的工作量，并以空格分隔
        String[] workloads = scanner.nextLine().split(" ");
        // 读取第二行输入，即项目组人员数量
        int N = Integer.parseInt(scanner.nextLine());
        // 创建一个数组来存放每个需求的工作量
        int[] tasks = new int[workloads.length];
        
        // 将输入的工作量转换为整数并存入数组
        for (int i = 0; i < workloads.length; i++) {
            tasks[i] = Integer.parseInt(workloads[i]);
        }
        
        // 输出最快完成所有工作的天数
        System.out.println(minimumTimeRequired(tasks, N));
    }
    
    // 计算完成所有任务所需的最少天数
    public static int minimumTimeRequired(int[] tasks, int k) {
        // 将任务按工作量升序排序
        Arrays.sort(tasks);
        // 将排序后的数组反转，使之成为降序
        int low = 0, high = tasks.length - 1;
        while (low < high) {
            int temp = tasks[low];
            tasks[low] = tasks[high];
            tasks[high] = temp;
            low++;
            high--;
        }
        
        // 使用二分查找确定完成所有任务的最短时间
        int l = tasks[0], r = Arrays.stream(tasks).sum();
        while (l < r) {
            int mid = (l + r) / 2;
            // 检查当前时间限制是否足够完成所有任务
            if (canFinish(tasks, k, mid)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        
        // 返回最短完成时间
        return l;
    }
    
    // 检查是否可以在给定的时间限制内完成所有任务
    private static boolean canFinish(int[] tasks, int k, int limit) {
        // 创建一个数组来记录每个员工的工作量
        int[] workers = new int[k];
        // 使用回溯法检查是否可以完成
        return backtrack(tasks, workers, 0, limit);
    }
    
    // 回溯法
    private static boolean backtrack(int[] tasks, int[] workers, int index, int limit) {
        // 如果所有任务都已分配，则返回true
        if (index >= tasks.length) {
            return true;
        }
        
        // 获取当前任务的工作量
        int current = tasks[index];
        // 尝试将当前任务分配给每个员工
        for (int i = 0; i < workers.length; i++) {
            // 如果当前员工可以在时间限制内完成这项任务
            if (workers[i] + current <= limit) {
                // 分配任务给当前员工
                workers[i] += current;
                // 继续尝试分配下一个任务
                if (backtrack(tasks, workers, index + 1, limit)) {
                    return true;
                }
                // 回溯，取消当前的任务分配
                workers[i] -= current;
            }
            
            // 如果当前员工没有任务或者加上当前任务刚好达到时间限制，则不需要尝试其他员工
            if (workers[i] == 0 || workers[i] + current == limit) {
                break;
            }
        }
        
        // 如果无法分配当前任务，则返回false
        return false;
    }
}`,python:`# Python版本代码
from itertools import combinations

def minimumTimeRequired(tasks, k):
    # 将任务按工作量降序排序
    tasks.sort(reverse=True)
    
    # 使用二分查找确定完成所有任务的最短时间
    l, r = tasks[0], sum(tasks)
    while l < r:
        mid = (l + r) // 2
        # 检查当前时间限制是否足够完成所有任务
        if canFinish(tasks, k, mid):
            r = mid
        else:
            l = mid + 1
    
    # 返回最短完成时间
    return l

def canFinish(tasks, k, limit):
    # 创建一个数组来记录每个员工的工作量
    workers = [0] * k
    # 使用回溯法检查是否可以完成
    return backtrack(tasks, workers, 0, limit)

def backtrack(tasks, workers, index, limit):
    # 如果所有任务都已分配，则返回True
    if index >= len(tasks):
        return True
    
    # 获取当前任务的工作量
    current = tasks[index]
    # 尝试将当前任务分配给每个员工
    for i in range(len(workers)):
        # 如果当前员工可以在时间限制内完成这项任务
        if workers[i] + current <= limit:
            # 分配任务给当前员工
            workers[i] += current
            # 继续尝试分配下一个任务
            if backtrack(tasks, workers, index + 1, limit):
                return True
            # 回溯，取消当前的任务分配
            workers[i] -= current
        
        # 如果当前员工没有任务或者加上当前任务刚好达到时间限制，则不需要尝试其他员工
        if workers[i] == 0 or workers[i] + current == limit:
            break
    
    # 如果无法分配当前任务，则返回False
    return False

if __name__ == "__main__":
    # 使用input读取输入
    tasks = list(map(int, input().split()))
    N = int(input())
    
    # 输出最快完成所有工作的天数
    print(minimumTimeRequired(tasks, N))`,javascript:"",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <sstream> 
using namespace std;
// 回溯法
bool backtrack(vector<int>& tasks, vector<int>& workers, int index, int limit) {
    // 如果所有任务都已分配，则返回true
    if (index >= tasks.size()) {
        return true;
    }
    
    // 获取当前任务的工作量
    int current = tasks[index];
    // 尝试将当前任务分配给每个员工
    for (int i = 0; i < workers.size(); i++) {
        // 如果当前员工可以在时间限制内完成这项任务
        if (workers[i] + current <= limit) {
            // 分配任务给当前员工
            workers[i] += current;
            // 继续尝试分配下一个任务
            if (backtrack(tasks, workers, index + 1, limit)) {
                return true;
            }
            // 回溯，取消当前的任务分配
            workers[i] -= current;
        }
        
        // 如果当前员工没有任务或者加上当前任务刚好达到时间限制，则不需要尝试其他员工
        if (workers[i] == 0 || workers[i] + current == limit) {
            break;
        }
    }
    
    // 如果无法分配当前任务，则返回false
    return false;
}
// 检查是否可以在给定的时间限制内完成所有任务
bool canFinish(vector<int>& tasks, int k, int limit) {
    // 创建一个数组来记录每个员工的工作量
    vector<int> workers(k, 0);
    // 使用回溯法检查是否可以完成
    return backtrack(tasks, workers, 0, limit);
}
// 计算完成所有任务所需的最少天数
int minimumTimeRequired(vector<int>& tasks, int k) {
    // 将任务按工作量降序排序
    sort(tasks.begin(), tasks.end(), greater<int>());
    
    // 使用二分查找确定完成所有任务的最短时间
    int l = tasks[0], r = accumulate(tasks.begin(), tasks.end(), 0);
    while (l < r) {
        int mid = (l + r) / 2;
        // 检查当前时间限制是否足够完成所有任务
        if (canFinish(tasks, k, mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    
    // 返回最短完成时间
    return l;
}




int main() {
    // 使用cin读取输入
    vector<int> tasks;
    string input;
    getline(cin, input);
    istringstream iss(input);
    int value;
    while (iss >> value) {
        tasks.push_back(value);
    }
    int N;
    cin >> N;
    
    // 输出最快完成所有工作的天数
    cout << minimumTimeRequired(tasks, N) << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 30 // 定义最大任务数量的常量，用于设置任务数组的最大长度

// 用于qsort函数的比较函数，实现降序排序
int compare(const void *a, const void *b) {
    // 将void指针转换为int指针，并解引用获取值进行比较
    return (*(int*)b - *(int*)a);
}

// 回溯法分配任务
int backtrack(int *tasks, int *workers, int index, int limit, int k, int taskSize) {
    // 检查是否所有任务都已分配
    if (index >= taskSize) {
        return 1; // 如果是，返回1表示成功
    }

    // 获取当前要分配的任务
    int current = tasks[index];
    // 遍历所有员工
    for (int i = 0; i < k; i++) {
        // 检查当前员工是否可以在时间限制内完成这个任务
        if (workers[i] + current <= limit) {
            // 如果可以，分配任务并递归尝试分配下一个任务
            workers[i] += current;
            if (backtrack(tasks, workers, index + 1, limit, k, taskSize)) {
                return 1;
            }
            // 如果不成功，回溯，即撤销这次任务分配
            workers[i] -= current;
        }

        // 如果当前员工没有任务或者加上当前任务刚好达到时间限制，则不需要尝试其他员工
        if (workers[i] == 0 || workers[i] + current == limit) {
            break;
        }
    }

    // 如果无法分配当前任务，返回0表示失败
    return 0;
}

// 检查是否能在指定时间内完成所有任务
int canFinish(int *tasks, int k, int limit, int taskSize) {
    // 初始化一个记录员工当前任务量的数组
    int workers[MAX_TASKS] = {0};
    // 调用回溯法尝试分配任务
    return backtrack(tasks, workers, 0, limit, k, taskSize);
}

// 计算完成所有任务的最短时间
int minimumTimeRequired(int *tasks, int k, int taskSize) {
    // 先对任务进行降序排序
    qsort(tasks, taskSize, sizeof(int), compare);

    // 二分查找的左右边界，左边界为最大单个任务时间，右边界为所有任务时间总和
    int l = tasks[0], r = 0;
    for (int i = 0; i < taskSize; i++) {
        r += tasks[i];
    }

    // 二分查找最短完成时间
    while (l < r) {
        int mid = l + (r - l) / 2;
        // 检查是否能在mid时间内完成所有任务
        if (canFinish(tasks, k, mid, taskSize)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    // 返回最短完成时间
    return l;
}

int main() {
    // 存储任务的数组和任务数量
    int tasks[MAX_TASKS], taskSize = 0;
    // 读取一行输入作为任务工作量
    char input[200];
    fgets(input, 200, stdin);
    // 使用strtok分割字符串，将分割后的数字转换为int存入任务数组
    char *token = strtok(input, " ");
    while (token != NULL) {
        tasks[taskSize++] = atoi(token);
        token = strtok(NULL, " ");
    }

    // 读取员工数量
    int N;
    scanf("%d", &N);

    // 计算并输出完成所有任务的最短时间
    printf("%d\\n", minimumTimeRequired(tasks, N, taskSize));
    return 0;
}`},l={id:"145",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:r,examples:e,solution:s,codes:a};export{a as codes,l as default,i as description,o as examType,e as examples,k as id,t as inputDesc,r as outputDesc,c as score,s as solution,n as title};
