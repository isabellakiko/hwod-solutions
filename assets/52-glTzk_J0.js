const l="52",n="螺旋数字矩阵",a="A",s=100,t=`疫情期间，小明隔离在家，百无聊赖，在纸上写数字玩。他发明了一种写法： 给出数字个数n和行数m（0 < n ≤ 999，0 < m ≤ 999），从左上角的1开始，按照顺时针螺旋向内写方式，依次写出2,3…n，最终形成一个m行矩阵。 小明对这个矩阵有些要求：
每行数字的个数一样多列的数量尽可能少填充数字时优先填充外部数字不够时，使用单个*号占位`,i="输入一行，两个整数，空格隔开，依次表示n、m",o=`符合要求的唯一矩阵
输入：
输出：
说明：
9个数字写成4行，最少需要3列
输入：
3 5 输出：
说明：
3个数字写5行，只有一列，数字不够用*号填充
输入：
输出：`,m=[{input:"9 4",output:`1 2 3
8 9 4
7 * 5
6 * *`,explanation:`9个数字写成4行，最少需要3列。
按顺时针螺旋填充：1→2→3→4→5→6→7→8→9。
剩余位置用*填充。`},{input:"3 5",output:`1
2
3
*
*`,explanation:`3个数字写5行，只有1列。
数字不够用*号填充。`},{input:"12 3",output:`1 2 3 4
10 11 12 5
9 8 7 6`,explanation:`12个数字写3行，需要4列。
按顺时针螺旋填充正好填满。`}],r=`**解题思路：**

本题是一道**螺旋矩阵模拟**问题。

**算法步骤：**

1. 计算列数：cols = ceil(n / m)
2. 创建m×cols的矩阵，初始化为0
3. 定义四个边界：top, bottom, left, right
4. 按顺时针螺旋顺序填充1到n：
   - 从左到右填充top行，top++
   - 从上到下填充right列，right--
   - 从右到左填充bottom行，bottom--
   - 从下到上填充left列，left++
5. 输出矩阵，0的位置输出*

**时间复杂度**：O(m × cols)`,e={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt(); // 读取要填充的数字个数n
        int m = scanner.nextInt(); // 读取矩阵的行数m
        scanner.close(); // 输入完毕后关闭scanner

        int cols = (int) Math.ceil(n / (double) m); // 计算矩阵的列数
        int[][] matrix = new int[m][cols]; // 创建一个整型矩阵，默认初始化为0

        int num = 1; // 用于填充的数字从1开始
        int top = 0, bottom = m - 1, left = 0, right = cols - 1;
        while (num <= n) {
            for (int i = left; i <= right && num <= n; i++) { // 从左到右填充上边界
                matrix[top][i] = num++;
            }
            top++; // 上边界下移
            for (int i = top; i <= bottom && num <= n; i++) { // 从上到下填充右边界
                matrix[i][right] = num++;
            }
            right--; // 右边界左移
            for (int i = right; i >= left && num <= n; i--) { // 从右到左填充下边界
                matrix[bottom][i] = num++;
            }
            bottom--; // 下边界上移
            for (int i = bottom; i >= top && num <= n; i--) { // 从下到上填充左边界
                matrix[i][left] = num++;
            }
            left++; // 左边界右移
        }

        for (int i = 0; i < m; i++) { // 遍历矩阵的每一行
            for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                if (matrix[i][j] == 0) { // 如果当前位置是0，则输出'*'
                    System.out.print('*');
                } else { // 否则输出当前位置的数字
                    System.out.print(matrix[i][j]);
                }
                if (j < cols - 1) { // 在同一行的数字之间打印空格
                    System.out.print(" ");
                }
            }
            System.out.println(); // 每打印完一行后换行
        }
    }
}`,python:`import math

n, m = map(int, input().split()) # 读取要填充的数字个数n和矩阵的行数m
cols = math.ceil(n / m) # 计算矩阵的列数
matrix = [[0 for _ in range(cols)] for _ in range(m)] # 创建一个整型矩阵，默认初始化为0

num = 1 # 用于填充的数字从1开始
top, bottom, left, right = 0, m - 1, 0, cols - 1
while num <= n:
    for i in range(left, right + 1): # 从左到右填充上边界
        if num <= n:
            matrix[top][i] = num
            num += 1
    top += 1 # 上边界下移
    for i in range(top, bottom + 1): # 从上到下填充右边界
        if num <= n:
            matrix[i][right] = num
            num += 1
    right -= 1 # 右边界左移
    for i in range(right, left - 1, -1): # 从右到左填充下边界
        if num <= n:
            matrix[bottom][i] = num
            num += 1
    bottom -= 1 # 下边界上移
    for i in range(bottom, top - 1, -1): # 从下到上填充左边界
        if num <= n:
            matrix[i][left] = num
            num += 1
    left += 1 # 左边界右移

for row in matrix: # 遍历矩阵的每一行
    print(' '.join('*' if val == 0 else str(val) for val in row)) # 如果当前位置是0，则输出'*'，否则输出当前位置的数字`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const [n, m] = line.split(' ').map(Number); // 读取数字个数n和行数m
    const cols = Math.ceil(n / m); // 计算列数
    const matrix = Array.from({ length: m }, () => Array(cols).fill(0)); // 创建矩阵

    let num = 1; // 从1开始填充
    let top = 0, bottom = m - 1, left = 0, right = cols - 1;
    
    while (num <= n) {
        for (let i = left; i <= right && num <= n; i++) { // 从左到右填充上边界
            matrix[top][i] = num++;
        }
        top++;
        for (let i = top; i <= bottom && num <= n; i++) { // 从上到下填充右边界
            matrix[i][right] = num++;
        }
        right--;
        for (let i = right; i >= left && num <= n; i--) { // 从右到左填充下边界
            matrix[bottom][i] = num++;
        }
        bottom--;
        for (let i = bottom; i >= top && num <= n; i--) { // 从下到上填充左边界
            matrix[i][left] = num++;
        }
        left++;
    }

    // 输出矩阵
    for (let i = 0; i < m; i++) {
        const row = matrix[i].map(val => val === 0 ? '*' : val.toString());
        console.log(row.join(' '));
    }
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <cmath>

int main() {
    int n, m;
    std::cin >> n >> m; // 读取要填充的数字个数n和矩阵的行数m

    int cols = std::ceil(static_cast<double>(n) / m); // 计算矩阵的列数
    std::vector<std::vector<int>> matrix(m, std::vector<int>(cols, 0)); // 创建一个整型矩阵，默认初始化为0

    int num = 1; // 用于填充的数字从1开始
    int top = 0, bottom = m - 1, left = 0, right = cols - 1;
    while (num <= n) {
        for (int i = left; i <= right && num <= n; i++) { // 从左到右填充上边界
            matrix[top][i] = num++;
        }
        top++; // 上边界下移
        for (int i = top; i <= bottom && num <= n; i++) { // 从上到下填充右边界
            matrix[i][right] = num++;
        }
        right--; // 右边界左移
        for (int i = right; i >= left && num <= n; i--) { // 从右到左填充下边界
            matrix[bottom][i] = num++;
        }
        bottom--; // 下边界上移
        for (int i = bottom; i >= top && num <= n; i--) { // 从下到上填充左边界
            matrix[i][left] = num++;
        }
        left++; // 左边界右移
    }

    for (int i = 0; i < m; i++) { // 遍历矩阵的每一行
        for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
            if (matrix[i][j] == 0) { // 如果当前位置是0，则输出'*'
                std::cout << '*';
            } else { // 否则输出当前位置的数字
                std::cout << matrix[i][j];
            }
            if (j < cols - 1) { // 在同一行的数字之间打印空格
                std::cout << " ";
            }
        }
        std::cout << std::endl; // 每打印完一行后换行
    }

    return 0;
}`,c:`#include <stdio.h>
#include <math.h>

int main() {
    int n, m;
    scanf("%d %d", &n, &m); // 读取要填充的数字个数n和矩阵的行数m

    int cols = (int)ceil((double)n / m); // 计算矩阵的列数
    int matrix[m][cols]; // 创建一个整型矩阵，默认初始化为0
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }

    int num = 1; // 用于填充的数字从1开始
    int top = 0, bottom = m - 1, left = 0, right = cols - 1;
    while (num <= n) {
        for (int i = left; i <= right && num <= n; i++) { // 从左到右填充上边界
            matrix[top][i] = num++;
        }
        top++; // 上边界下移
        for (int i = top; i <= bottom && num <= n; i++) { // 从上到下填充右边界
            matrix[i][right] = num++;
        }
        right--; // 右边界左移
        for (int i = right; i >= left && num <= n; i--) { // 从右到左填充下边界
            matrix[bottom][i] = num++;
        }
        bottom--; // 下边界上移
        for (int i = bottom; i >= top && num <= n; i--) { // 从下到上填充左边界
            matrix[i][left] = num++;
        }
        left++; // 左边界右移
    }

    for (int i = 0; i < m; i++) { // 遍历矩阵的每一行
        for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
            if (matrix[i][j] == 0) { // 如果当前位置是0，则输出'*'
                printf("* ");
            } else { // 否则输出当前位置的数字
                printf("%d ", matrix[i][j]);
            }
        }
        printf("\\n"); // 每打印完一行后换行
    }

    return 0;
}`},u={id:"52",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:o,examples:m,solution:r,codes:e};export{e as codes,u as default,t as description,a as examType,m as examples,l as id,i as inputDesc,o as outputDesc,s as score,r as solution,n as title};
