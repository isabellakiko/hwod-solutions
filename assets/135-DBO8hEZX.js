const l="135",n="矩阵匹配",c="A",s=200,i="从一个 N * M（N ≤ M）的矩阵中选出 N 个数，任意两个数字不能在同一行或同一列，求选出来的 N 个数中第 K 大的数字的最小值是多少。",t=`输入矩阵要求：1 ≤ K ≤ N ≤ M ≤ 150
输入格式：
N M K
N*M矩阵`,a=`N*M 的矩阵中可以选出 M! / N! 种组合数组，每个组合数组种第 K 大的数中的最小值。无需考虑重复数字，直接取字典排序结果即可。
注意：结果是第 K 大的数字的最小值
输入
输出
N*M的矩阵中可以选出 M！/ N！种组合数组，每个组合数组种第 K 大的数中的最小值； 上述输入中选出数组组合为： 1,3,6; 1,3,3; 1,4,8; 1,4,3; … 上述输入样例中选出的组合数组有24种，最小数组为1,3,3，则第2大的最小值为3`,r=[{input:`3 4 2
1 5 6 6
8 3 4 3
6 8 6 3`,output:"3",explanation:"选出3个数不同行不同列，如1,3,3组合，第2大的数最小为3"},{input:`2 3 1
1 2 3
4 5 6`,output:"4",explanation:"选2个数，第1大的数最小组合如1,4或2,4或3,4，最小值为4"}],m=`**解题思路：**

本题是一道**二分答案+二分图匹配**问题。

**核心思路：**
- 二分答案：枚举第K大数的可能值
- 验证：能否选出N个数使得至少N-K+1个数≤mid
- 用二分图匹配验证可行性

**算法步骤：**
1. 二分枚举第K大数的值mid
2. 将≤mid的格子作为可选边建立二分图
3. 求最大匹配数，若≥N-K+1则可行
4. 找到满足条件的最小mid

**时间复杂度**：O(NM×log(max)×NM)`,e={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
    static int[][] matrix;  // matrix 用于存储输入的矩阵
    static int[] match;  // match 数组用于存储匹配信息，match[j] = i 表示第j列与第i行匹配
    static boolean[] vis;  // vis 数组用于标记每一列在当前增广路中是否被访问过

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();  // 读取行数
        m = sc.nextInt();  // 读取列数
        k = sc.nextInt();  // 读取k值

        int min = 1, max = Integer.MIN_VALUE;  // 初始化二分查找的上下界
        matrix = new int[n][m];  // 初始化矩阵
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                matrix[i][j] = sc.nextInt();  // 读取矩阵元素
                max = Math.max(max, matrix[i][j]);  // 更新矩阵元素的最大值，作为二分查找的上界
            }
        }

        // 二分查找确定第K大的数的最小可能值
        while (min <= max) {
            int mid = (min + max) / 2;  // 取中间值
            if (check(mid)) {
                max = mid - 1;  // 如果当前中间值满足条件，则尝试寻找更小的值
            } else {
                min = mid + 1;  // 如果不满足条件，则尝试寻找更大的值
            }
        }
        System.out.println(min);  // 输出最终结果
    }

    // 检查当前值是否满足条件
    public static boolean check(int currentVal) {
        match = new int[m];  // 初始化匹配数组
        Arrays.fill(match, -1);  // 将所有列初始化为未匹配状态
        vis = new boolean[m];  // 初始化访问标记数组
        int smallerCount = 0;  // 统计满足条件的数量
        for (int i = 0; i < n; i++) {
            Arrays.fill(vis, false);  // 每次搜索前重置访问标记
            if (dfs(i, currentVal)) {
                smallerCount++;  // 如果找到增广路径，则计数增加
            }
        }
        return smallerCount >= n - k + 1;  // 检查是否有足够的小于等于currentVal的数
    }

    // 深度优先搜索寻找增广路径
    public static boolean dfs(int i, int currentVal) {
        for (int j = 0; j < m; j++) {
            // 检查列j是否未被访问过且第i行第j列的值小于等于currentVal
            if (!vis[j] && matrix[i][j] <= currentVal) {
                vis[j] = true;  // 标记列j为已访问
                // 如果列j未匹配或者列j的匹配行可以匹配到其他列
                if (match[j] == -1 || dfs(match[j], currentVal)) {
                    match[j] = i;  // 将列j与行i匹配
                    return true;  // 找到增广路径
                }
            }
        }
        return false;  // 没有找到增广路径
    }
}`,python:`import sys

def dfs(i, current_val):
    """
    深度优先搜索寻找增广路径
    :param i: 当前正在处理的行索引
    :param current_val: 当前考虑的值
    :return: 如果找到增广路径，返回True；否则返回False
    """
    for j in range(m):
        # 检查第j列是否未被访问过且第i行第j列的值小于等于current_val
        if not vis[j] and matrix[i][j] <= current_val:
            vis[j] = True  # 标记第j列为已访问
            # 如果第j列未匹配或其匹配的行可以找到其他匹配列
            if match[j] == -1 or dfs(match[j], current_val):
                match[j] = i  # 将第j列与第i行匹配
                return True
    return False

def check(current_val):
    """
    检查当前值是否满足条件
    :param current_val: 当前考虑的值
    :return: 如果满足条件，返回True；否则返回False
    """
    global match, vis
    match = [-1] * m  # 初始化匹配数组，所有列都标记为未匹配
    vis = [False] * m  # 初始化访问标记数组
    smaller_count = 0  # 统计满足条件的数量

    for i in range(n):
        vis = [False] * m  # 每次搜索前重置访问标记
        if dfs(i, current_val):
            smaller_count += 1  # 如果找到增广路径，则计数增加

    return smaller_count >= n - k + 1  # 检查是否有足够的小于等于current_val的数

# 读取输入
n, m, k = map(int, input().split())  # 读取行数、列数和k值

# 初始化矩阵
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))

# 初始化二分查找的上下界
min_val, max_val = 1, -sys.maxsize

# 更新矩阵元素的最大值，作为二分查找的上界
for row in matrix:
    max_val = max(max_val, max(row))

# 二分查找确定第K大的数的最小可能值
while min_val <= max_val:
    mid = (min_val + max_val) // 2
    if check(mid):
        max_val = mid - 1
    else:
        min_val = mid + 1

# 输出最终结果
print(min_val)`,javascript:"",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
vector<vector<int>> matrix;  // matrix 用于存储输入的矩阵
vector<int> match;  // match 数组用于存储匹配信息，match[j] = i 表示第j列与第i行匹配
vector<bool> vis;  // vis 数组用于标记每一列在当前增广路中是否被访问过

// 深度优先搜索寻找增广路径
bool dfs(int i, int currentVal) {
    for (int j = 0; j < m; j++) {
        // 检查列j是否未被访问过且第i行第j列的值小于等于currentVal
        if (!vis[j] && matrix[i][j] <= currentVal) {
            vis[j] = true;  // 标记列j为已访问
            // 如果列j未匹配或者列j的匹配行可以匹配到其他列
            if (match[j] == -1 || dfs(match[j], currentVal)) {
                match[j] = i;  // 将列j与行i匹配
                return true;  // 找到增广路径
            }
        }
    }
    return false;  // 没有找到增广路径
}

// 检查当前值是否满足条件
bool check(int currentVal) {
    match.assign(m, -1);  // 初始化匹配数组
    vis.assign(m, false);  // 初始化访问标记数组
    int smallerCount = 0;  // 统计满足条件的数量
    for (int i = 0; i < n; i++) {
        fill(vis.begin(), vis.end(), false);  // 每次搜索前重置访问标记
        if (dfs(i, currentVal)) {
            smallerCount++;  // 如果找到增广路径，则计数增加
        }
    }
    return smallerCount >= n - k + 1;  // 检查是否有足够的小于等于currentVal的数
}

int main() {
    cin >> n >> m >> k;  // 读取行数、列数和k值

    int min = 1, maxT = INT_MIN;  // 初始化二分查找的上下界
    matrix.assign(n, vector<int>(m));  // 初始化矩阵
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> matrix[i][j];  // 读取矩阵元素
            maxT = max(maxT, matrix[i][j]);  // 更新矩阵元素的最大值，作为二分查找的上界
        }
    }

    // 二分查找确定第K大的数的最小可能值
    while (min <= maxT) {
        int mid = (min + maxT) / 2;  // 取中间值
        if (check(mid)) {
            maxT = mid - 1;  // 如果当前中间值满足条件，则尝试寻找更小的值
        } else {
            min = mid + 1;  // 如果不满足条件，则尝试寻找更大的值
        }
    }
    cout << min << endl;  // 输出最终结果
    return 0;
}`,c:`#include <stdio.h>
#include <stdbool.h>
#include <limits.h>

#define MAX_N 200  
#define MAX_M 200  

int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
int matrix[MAX_N][MAX_M];  // matrix 用于存储输入的矩阵
int match[MAX_M];  // match 数组用于存储匹配信息
bool vis[MAX_M];  // vis 数组用于标记每一列在当前增广路中是否被访问过

bool dfs(int i, int current_val) {
    for (int j = 0; j < m; j++) {
        if (!vis[j] && matrix[i][j] <= current_val) {
            vis[j] = true;
            if (match[j] == -1 || dfs(match[j], current_val)) {
                match[j] = i;
                return true;
            }
        }
    }
    return false;
}

bool check(int current_val) {
    for (int j = 0; j < m; j++) {
        match[j] = -1;  // 初始化匹配数组
    }

    int smaller_count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            vis[j] = false;  // 初始化访问标记数组
        }
        if (dfs(i, current_val)) {
            smaller_count++;
        }
    }
    return smaller_count >= n - k + 1;
}

int main() {
    scanf("%d %d %d", &n, &m, &k);  // 读取行数、列数和k值

    // 初始化矩阵
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    // 初始化二分查找的上下界
    int min_val = 1, max_val = INT_MIN;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (matrix[i][j] > max_val) {
                max_val = matrix[i][j];  // 更新矩阵元素的最大值
            }
        }
    }

    // 二分查找确定第K大的数的最小可能值
    while (min_val <= max_val) {
        int mid = (min_val + max_val) / 2;
        if (check(mid)) {
            max_val = mid - 1;
        } else {
            min_val = mid + 1;
        }
    }

    // 输出最终结果
    printf("%d\\n", min_val);

    return 0;
}`},o={id:"135",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:a,examples:r,solution:m,codes:e};export{e as codes,o as default,i as description,c as examType,r as examples,l as id,t as inputDesc,a as outputDesc,s as score,m as solution,n as title};
