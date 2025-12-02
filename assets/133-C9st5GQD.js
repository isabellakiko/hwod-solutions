const d="133",n="特殊的加密算法",s="A",c=200,i=`有一种特殊的加密算法，明文为一段数字串，经过密码本查找转换，生成另一段密文数字串。
规则如下：
明文为一段数字串由 0~9 组成 密码本为数字 0~9 组成的二维数组 需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的，注意：对角线不相邻，同一个单元格的数字不能重复使用。 每一位明文对应密文即为密码本中找到的单元格所在的行和列序号（序号从0开始）组成的两个数宇。 如明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y，X和Y之间用空格隔开。
明文为一段数字串由 0~9 组成
密码本为数字 0~9 组成的二维数组
需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的，注意：对角线不相邻，同一个单元格的数字不能重复使用。
每一位明文对应密文即为密码本中找到的单元格所在的行和列序号（序号从0开始）组成的两个数宇。
如明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y，X和Y之间用空格隔开。
如果有多条密文，返回字符序最小的密文。
如果密码本无法匹配，返回"error"。
请你设计这个加密程序。
示例1：
密码本：
0 0 2
1 3 4
6 6 4
明文：“3”，密文：“1 1”
示例2：
密码本：
0 0 2
1 3 4
6 6 4
明文：“0 3”，密文：“0 1 1 1”
示例3：
密码本：
0 0 2 4
1 3 4 6
3 4 1 5
6 6 6 5
明文：“0 0 2 4”，密文：“0 0 0 1 0 2 0 3” 和 “0 0 0 1 0 2 1 2”，返回字典序最小的"0 0 0 1 0 2 0 3"
明文：“8 2 2 3”，密文：“error”，密码本中无法匹配`,t=`第一行输入 1 个正整数 N，代表明文的长度（1 ≤ N ≤ 200）
第二行输入 N 个明文组成的序列 Data[i]（0 ≤ Data[i] ≤ 9）
第三行输入 1 个正整数 M，代表密文的长度
接下来 M 行，每行 M 个数，代表密文矩阵`,e=`输出字典序最小密文，如果无法匹配，输出"error"
输入
输出
输入
输出
说明
找不到 0 5 的序列，返回error`,o=[{input:`1
3
3
0 0 2
1 3 4
6 6 4`,output:"1 1",explanation:"明文为3，在密码本中位置(1,1)找到3"},{input:`2
0 3
3
0 0 2
1 3 4
6 6 4`,output:"0 1 1 1",explanation:"明文0 3，找到相邻路径(0,1)->(1,1)，密文为0 1 1 1"},{input:`2
0 5
3
0 0 2
1 3 4
6 6 4`,output:"error",explanation:"密码本中找不到0和5相邻的路径"}],a=`**解题思路：**

本题是一道**DFS回溯+路径搜索**问题。

**核心思路：**
- 在密码本中找相邻路径匹配明文序列
- DFS遍历所有可能路径
- 返回字典序最小的密文

**算法步骤：**
1. 遍历密码本找明文首字符位置作为起点
2. DFS向四个方向搜索，匹配明文下一字符
3. 用visited数组避免重复访问同一格
4. 记录路径坐标，找到完整匹配时更新最小字典序结果
5. 回溯尝试所有路径

**时间复杂度**：O(M²×4^N)，M为密码本大小，N为明文长度`,r={java:`import java.util.*;

public class Main {
    static int n, m; // 分别用于存储明文的长度和密码本的尺寸
    static int[][] book; // 用于存储密码本，是一个二维数组
    static int[][] directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 表示四个搜索方向：右、下、左、上
    static String minPath = ""; // 用于存储找到的字典序最小的密文路径
    static boolean found = false; // 标记是否找到了至少一种加密方式

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        n = scanner.nextInt(); // 读取明文的长度
        int[] data = new int[n]; // 创建数组存储明文数字
        for (int i = 0; i < n; i++) {
            data[i] = scanner.nextInt(); // 读取每个明文数字
        }

        m = scanner.nextInt(); // 读取密码本的尺寸
        book = new int[m][m]; // 初始化密码本数组
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < m; j++) {
                book[i][j] = scanner.nextInt(); // 填充密码本内容
            }
        }

        boolean[][] visited = new boolean[m][m]; // 标记密码本中的数字是否已经被访问过
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < m; j++) {
                if (book[i][j] == data[0]) { // 从找到的第一个数字开始搜索
                    dfs(data, 0, i, j, visited, ""); // 使用深度优先搜索找到所有可能的加密路径
                }
            }
        }

        System.out.println(found ? minPath.trim() : "error"); // 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"
    }

    public static void dfs(int[] data, int index, int x, int y, boolean[][] visited, String path) {
        if (index == n) { // 如果已经处理完所有明文数字
            if (!found || path.compareTo(minPath) < 0) { // 如果找到的是第一种加密方式，或者字典序比之前的小
                minPath = path; // 更新最小字典序密文路径
            }
            found = true; // 标记找到了加密方式
            return;
        }

        if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
            // 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
            return;
        }

        visited[x][y] = true; // 标记当前位置已访问
        String newPath = path + x + " " + y + " "; // 更新路径字符串

        if (index == n - 1 || book[x][y] == data[index]) {
            dfs(data, index + 1, x, y, visited, newPath); // 继续搜索下一个明文数字
        }

        for (int[] dir : directions) { // 遍历四个方向
            int newX = x + dir[0];
            int newY = y + dir[1];
            dfs(data, index + 1, newX, newY, visited, newPath); // 在新方向上搜索下一个明文数字
        }

        visited[x][y] = false; // 回溯，撤销当前位置的访问标记
    }
}`,python:`import sys

# 读取输入
n = int(input())
data = list(map(int, input().split()))
m = int(input())
book = [list(map(int, input().split())) for _ in range(m)]

directions = [(0, 1), (1, 0), (-1, 0), (0, -1)]  # 四个搜索方向：右、下、左、上
min_path = None  # 存储找到的字典序最小的密文路径
found = False  # 标记是否找到至少一种加密方式

def dfs(data, index, x, y, visited, path):
    global min_path, found
    if index == len(data):  # 如果已经处理完所有明文数字
        if not found or path < min_path:  # 如果找到的是第一种加密方式，或者字典序比之前的小
            min_path = path  # 更新最小字典序密文路径
        found = True
        return

    if x < 0 or y < 0 or x >= m or y >= m or visited[x][y] or book[x][y] != data[index]:
        # 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
        return

    visited[x][y] = True  # 标记当前位置已访问
    new_path = path + f"{x} {y} "  # 更新路径字符串

    for dir in directions:  # 遍历四个方向
        newX, newY = x + dir[0], y + dir[1]
        dfs(data, index + 1, newX, newY, visited, new_path)  # 在新方向上搜索下一个明文数字

    visited[x][y] = False  # 回溯，撤销当前位置的访问标记

visited = [[False for _ in range(m)] for _ in range(m)]  # 标记密码本中的数字是否已经被访问过
for i in range(m):
    for j in range(m):
        if book[i][j] == data[0]:  # 从找到的第一个数字开始搜索
            dfs(data, 0, i, j, visited, "")  # 使用深度优先搜索找到所有可能的加密路径

print(min_path.strip() if found else "error")  # 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"`,javascript:"",cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 全局变量定义
static int n, m; // 分别用于存储明文的长度和密码本的尺寸
vector<vector<int>> book; // 用于存储密码本，是一个二维向量
vector<vector<int>> directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 表示四个搜索方向：右、下、左、上
string minPath = ""; // 用于存储找到的字典序最小的密文路径
bool found = false; // 标记是否找到了至少一种加密方式

// 深度优先搜索函数声明
void dfs(const vector<int>& data, int index, int x, int y, vector<vector<bool>>& visited, string path);

int main() {
    cin >> n; // 读取明文的长度
    vector<int> data(n); // 创建向量存储明文数字
    for (int i = 0; i < n; ++i) {
        cin >> data[i]; // 读取每个明文数字
    }

    cin >> m; // 读取密码本的尺寸
    book.resize(m, vector<int>(m)); // 初始化密码本向量
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < m; ++j) {
            cin >> book[i][j]; // 填充密码本内容
        }
    }

    vector<vector<bool>> visited(m, vector<bool>(m, false)); // 标记密码本中的数字是否已经被访问过
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < m; ++j) {
            if (book[i][j] == data[0]) { // 从找到的第一个数字开始搜索
                dfs(data, 0, i, j, visited, ""); // 使用深度优先搜索找到所有可能的加密路径
            }
        }
    }

    cout << (found ? minPath : "error") << endl; // 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"
    return 0;
}

void dfs(const vector<int>& data, int index, int x, int y, vector<vector<bool>>& visited, string path) {
    if (index == n) { // 如果已经处理完所有明文数字
        if (!found || path < minPath) { // 如果找到的是第一种加密方式，或者字典序比之前的小
            minPath = path; // 更新最小字典序密文路径
        }
        found = true; // 标记找到了加密方式
        return;
    }

    if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
        // 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
        return;
    }

    visited[x][y] = true; // 标记当前位置已访问
    string newPath = path + to_string(x) + " " + to_string(y) + " "; // 更新路径字符串

    // 遍历四个方向
    for (const auto& dir : directions) {
        int newX = x + dir[0];
        int newY = y + dir[1];
        dfs(data, index + 1, newX, newY, visited, newPath); // 在新方向上搜索下一个明文数字
    }

    visited[x][y] = false; // 回溯，撤销当前位置的访问标记
}`,c:`#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

#define MAX_SIZE 100 //  密码本的最大尺寸
#define PATH_LEN 1000 //  路径字符串的最大长度

int n, m; // 明文长度和密码本尺寸
int book[MAX_SIZE][MAX_SIZE]; // 密码本
int directions[4][2] = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 搜索方向：右、下、左、上
char minPath[PATH_LEN] = ""; // 最小字典序密文路径
bool found = false; // 是否找到至少一种加密方式

void dfs(int data[], int index, int x, int y, bool visited[MAX_SIZE][MAX_SIZE], char path[PATH_LEN]) {
    if (index == n) { // 处理完所有明文数字
        if (!found || strcmp(path, minPath) < 0) {
            strcpy(minPath, path); // 更新最小字典序密文路径
        }
        found = true;
        return;
    }

    if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
        return; // 坐标越界或位置已访问或数字不匹配
    }

    visited[x][y] = true;
    char newPath[PATH_LEN];
    strcpy(newPath, path); // 当前路径
    char temp[20]; // 临时字符串存储当前位置
    sprintf(temp, "%d %d ", x, y);
    strcat(newPath, temp); // 更新路径

    for (int i = 0; i < 4; i++) { // 遍历四个方向
        int newX = x + directions[i][0];
        int newY = y + directions[i][1];
        dfs(data, index + 1, newX, newY, visited, newPath);
    }

    visited[x][y] = false; // 回溯
}

int main() {
    scanf("%d", &n);
    int data[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &data[i]);
    }

    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &book[i][j]);
        }
    }

    bool visited[MAX_SIZE][MAX_SIZE] = {false};
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < m; j++) {
            if (book[i][j] == data[0]) {
                char path[PATH_LEN] = "";
                dfs(data, 0, i, j, visited, path);
            }
        }
    }

    if (found) {
        printf("%s\\n", minPath);
    } else {
        printf("error\\n");
    }

    return 0;
}`},f={id:"133",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:o,solution:a,codes:r};export{r as codes,f as default,i as description,s as examType,o as examples,d as id,t as inputDesc,e as outputDesc,c as score,a as solution,n as title};
