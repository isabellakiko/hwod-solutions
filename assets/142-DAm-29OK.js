const r="142",o="转骰子",c="A",u=200,n=`骰子是一个立方体，每个面一个数字，初始为左1，右2，前3(观察者方向)，后4，上5，下6，用123456表示这个状态，放置在平面上，
可以向左翻转(用L表示向左翻转1次)，可以向右翻转(用R表示向右翻转1次)，可以向前翻转(用F表示向前翻转1次)，可以向后翻转(用B表示向后翻转1次)，可以逆时针旋转(用A表示逆时针旋转90度)，可以顺时针旋转(用C表示顺时针旋转90度)，
现从123456这个初始状态开始，根据输入的动作序列，计算得到最终的状态。
骰子的初始状态和初始状态转动后的状态如图所示。
`,t="输入一行，为只包含LRFBAC的字母序列，最大长度为50，字母可重复。",e="输出最终状态",a=[{input:"LR",output:"123456",explanation:"骰子先向左翻转，再向右翻转回来，故还是原来的状态123456"},{input:"FCR",output:"342156",explanation:"骰子向前翻转变为125643，再顺时针旋转变为521346，最后向右翻转变为342156"}],s=`**解题思路：**

本题是一道**模拟**问题。

**核心思路：**
- 用数组表示骰子6个面的状态[左,右,前,后,上,下]
- 每种操作对应4个面的循环交换

**算法步骤：**
1. 初始化状态为[1,2,3,4,5,6]
2. L左翻：左->上->右->下循环
3. R右翻：左->下->右->上循环
4. F前翻：前->上->后->下循环
5. B后翻：前->下->后->上循环
6. A逆时针：左->后->右->前循环
7. C顺时针：左->前->右->后循环

**时间复杂度**：O(N)，N为操作序列长度`,i={java:`import java.util.Scanner;

public class Main {

    /**
     * 通用的旋转方法，用于交换骰子上四个面的值。
     * 此方法用于实现骰子翻转的各个方向变化，通过传入四个索引，按顺序交换这四个面的位置。
     *
     * @param state 当前骰子的六个面数组，依次表示 左、右、前、后、上、下。
     * @param a     要交换的第一个面索引
     * @param b     要交换的第二个面索引
     * @param c     要交换的第三个面索引
     * @param d     要交换的第四个面索引
     */
    public static void rotate(int[] state, int a, int b, int c, int d) {
        int temp = state[a];  // 临时保存第一个面的值
        state[a] = state[b];  // 第二个面的值赋给第一个面
        state[b] = state[c];  // 第三个面的值赋给第二个面
        state[c] = state[d];  // 第四个面的值赋给第三个面
        state[d] = temp;      // 第一个面的值赋给第四个面
    }

    /**
     * 向左翻转 (L)：
     * 将上面的面变为左边，左面的面变为下面，下面的面变为右边，右面的面变为上面。
     * 通过左->上->右->下的顺序交换四个面的值。
     *
     */
    public static void turnL(int[] state) {
        rotate(state, 0, 4, 1, 5); // 左->上->右->下->左
    }

    /**
     * 向右翻转 (R)：
     * 将上面的面变为右边，右面的面变为下面，下面的面变为左边，左面的面变为上面。
     * 通过左->下->右->上的顺序交换四个面的值。
     *
     */
    public static void turnR(int[] state) {
        rotate(state, 0, 5, 1, 4); // 左->下->右->上->左
    }

    /**
     * 向前翻转 (F)：
     * 将上面的面变为前面，前面的面变为下面，下面的面变为后面，后面的面变为上面。
     * 通过前->上->后->下的顺序交换四个面的值。
     *
     */
    public static void turnF(int[] state) {
        rotate(state, 2, 4, 3, 5); // 前->上->后->下->前
    }

    /**
     * 向后翻转 (B)：
     * 将上面的面变为后面，后面的面变为下面，下面的面变为前面，前面的面变为上面。
     * 通过前->下->后->上的顺序交换四个面的值。
     */
    public static void turnB(int[] state) {
        rotate(state, 2, 5, 3, 4); // 前->下->后->上->前
    }

    /**
     * 逆时针旋转 (A)：
     * 将前面的面变为右边，右面的面变为后面，后面的面变为左边，左面的面变为前面。
     * 通过左->后->右->前的顺序交换四个面的值。
     */
    public static void turnA(int[] state) {
        rotate(state, 0, 3, 1, 2); // 左->后->右->前->左
    }

    /**
     * 顺时针旋转 (C)：
     * 将前面的面变为左边，左面的面变为后面，后面的面变为右边，右面的面变为前面。
     * 通过左->前->右->后的顺序交换四个面的值。
     *
     */
    public static void turnC(int[] state) {
        rotate(state, 0, 2, 1, 3); // 左->前->右->后->左
    }

    public static void main(String[] args) {
        // 创建一个扫描器对象，用于读取用户输入的指令序列
        Scanner scanner = new Scanner(System.in);
        String s = scanner.next();  // 从输入中读取一串动作指令

        // 初始状态：骰子各个面的编号，依次表示 左、右、前、后、上、下。
        int[] state = {1, 2, 3, 4, 5, 6};  // 初始状态: 左1，右2，前3，后4，上5，下6

        // 遍历输入的每一个字符，根据指令执行相应的操作
        for (char ch : s.toCharArray()) {
            switch (ch) {
                case 'L': turnL(state); break;  // 执行左翻转
                case 'R': turnR(state); break;  // 执行右翻转
                case 'F': turnF(state); break;  // 执行前翻转
                case 'B': turnB(state); break;  // 执行后翻转
                case 'A': turnA(state); break;  // 执行逆时针旋转
                case 'C': turnC(state); break;  // 执行顺时针旋转
            }
        }

        // 输出最终骰子的六个面状态，按照左、右、前、后、上、下的顺序
        for (int num : state) {
            System.out.print(num);
        }
    }
}`,python:`# 定义一个通用的旋转函数，用于交换骰子上四个面的值
def rotate(state, a, b, c, d):
    temp = state[a]  # 临时保存第一个面的值
    state[a] = state[b]  # 第二个面的值赋给第一个面
    state[b] = state[c]  # 第三个面的值赋给第二个面
    state[c] = state[d]  # 第四个面的值赋给第三个面
    state[d] = temp  # 第一个面的值赋给第四个面

# 定义向左翻转函数 (L)
def turnL(state):
    rotate(state, 0, 4, 1, 5)  # 左->上->右->下->左

# 定义向右翻转函数 (R)
def turnR(state):
    rotate(state, 0, 5, 1, 4)  # 左->下->右->上->左

# 定义向前翻转函数 (F)
def turnF(state):
    rotate(state, 2, 4, 3, 5)  # 前->上->后->下->前

# 定义向后翻转函数 (B)
def turnB(state):
    rotate(state, 2, 5, 3, 4)  # 前->下->后->上->前

# 定义逆时针旋转函数 (A)
def turnA(state):
    rotate(state, 0, 3, 1, 2)  # 左->后->右->前->左

# 定义顺时针旋转函数 (C)
def turnC(state):
    rotate(state, 0, 2, 1, 3)  # 左->前->右->后->左

# 主程序
if __name__ == "__main__":
    # 从输入中获取用户指令
    s = input()  # 用户输入一串动作指令

    # 初始状态：左1，右2，前3，后4，上5，下6
    state = [1, 2, 3, 4, 5, 6]

    # 遍历输入的每一个字符，根据指令执行相应的翻转或旋转操作
    for ch in s:
        if ch == 'L':
            turnL(state)
        elif ch == 'R':
            turnR(state)
        elif ch == 'F':
            turnF(state)
        elif ch == 'B':
            turnB(state)
        elif ch == 'A':
            turnA(state)
        elif ch == 'C':
            turnC(state)

    # 输出最终骰子的六个面状态
    print("".join(map(str, state)))`,javascript:`// 定义一个通用的旋转函数，用于交换骰子上四个面的值
function rotate(state, a, b, c, d) {
    let temp = state[a];  // 临时保存第一个面的值
    state[a] = state[b];  // 第二个面的值赋给第一个面
    state[b] = state[c];  // 第三个面的值赋给第二个面
    state[c] = state[d];  // 第四个面的值赋给第三个面
    state[d] = temp;      // 第一个面的值赋给第四个面
}

// 定义向左翻转函数 (L)
function turnL(state) {
    rotate(state, 0, 4, 1, 5);  // 左->上->右->下->左
}

// 定义向右翻转函数 (R)
function turnR(state) {
    rotate(state, 0, 5, 1, 4);  // 左->下->右->上->左
}

// 定义向前翻转函数 (F)
function turnF(state) {
    rotate(state, 2, 4, 3, 5);  // 前->上->后->下->前
}

// 定义向后翻转函数 (B)
function turnB(state) {
    rotate(state, 2, 5, 3, 4);  // 前->下->后->上->前
}

// 定义逆时针旋转函数 (A)
function turnA(state) {
    rotate(state, 0, 3, 1, 2);  // 左->后->右->前->左
}

// 定义顺时针旋转函数 (C)
function turnC(state) {
    rotate(state, 0, 2, 1, 3);  // 左->前->右->后->左
}

// 主程序
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on('line', s => {
    // 初始状态：左1，右2，前3，后4，上5，下6
    let state = [1, 2, 3, 4, 5, 6];

    // 遍历输入的每一个字符，根据指令执行相应的翻转或旋转操作
    for (let ch of s) {
        if (ch === 'L') turnL(state);
        else if (ch === 'R') turnR(state);
        else if (ch === 'F') turnF(state);
        else if (ch === 'B') turnB(state);
        else if (ch === 'A') turnA(state);
        else if (ch === 'C') turnC(state);
    }

    // 输出最终骰子的六个面状态
    console.log(state.join(''));

    readline.close();
});`,cpp:`#include <iostream>
#include <string>

using namespace std;

// 定义一个通用的旋转函数，用于交换骰子上四个面的值
void rotate(int state[], int a, int b, int c, int d) {
    int temp = state[a];  // 临时保存第一个面的值
    state[a] = state[b];  // 第二个面的值赋给第一个面
    state[b] = state[c];  // 第三个面的值赋给第二个面
    state[c] = state[d];  // 第四个面的值赋给第三个面
    state[d] = temp;      // 第一个面的值赋给第四个面
}

// 定义向左翻转函数 (L)
void turnL(int state[]) {
    rotate(state, 0, 4, 1, 5);  // 左->上->右->下->左
}

// 定义向右翻转函数 (R)
void turnR(int state[]) {
    rotate(state, 0, 5, 1, 4);  // 左->下->右->上->左
}

// 定义向前翻转函数 (F)
void turnF(int state[]) {
    rotate(state, 2, 4, 3, 5);  // 前->上->后->下->前
}

// 定义向后翻转函数 (B)
void turnB(int state[]) {
    rotate(state, 2, 5, 3, 4);  // 前->下->后->上->前
}

// 定义逆时针旋转函数 (A)
void turnA(int state[]) {
    rotate(state, 0, 3, 1, 2);  // 左->后->右->前->左
}

// 定义顺时针旋转函数 (C)
void turnC(int state[]) {
    rotate(state, 0, 2, 1, 3);  // 左->前->右->后->左
}

int main() {
    string s;
    cin >> s;  // 从输入中获取用户指令

    // 初始状态：左1，右2，前3，后4，上5，下6
    int state[6] = {1, 2, 3, 4, 5, 6};

    // 遍历输入的每一个字符，根据指令执行相应的翻转或旋转操作
    for (char ch : s) {
        if (ch == 'L') turnL(state);
        else if (ch == 'R') turnR(state);
        else if (ch == 'F') turnF(state);
        else if (ch == 'B') turnB(state);
        else if (ch == 'A') turnA(state);
        else if (ch == 'C') turnC(state);
    }

    // 输出最终骰子的六个面状态
    for (int i = 0; i < 6; ++i) {
        cout << state[i];
    }

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

// 定义一个通用的旋转函数，用于交换骰子上四个面的值
void rotate(int state[], int a, int b, int c, int d) {
    int temp = state[a];  // 临时保存第一个面的值
    state[a] = state[b];  // 第二个面的值赋给第一个面
    state[b] = state[c];  // 第三个面的值赋给第二个面
    state[c] = state[d];  // 第四个面的值赋给第三个面
    state[d] = temp;      // 第一个面的值赋给第四个面
}

// 定义向左翻转函数 (L)
void turnL(int state[]) {
    rotate(state, 0, 4, 1, 5);  // 左->上->右->下->左
}

// 定义向右翻转函数 (R)
void turnR(int state[]) {
    rotate(state, 0, 5, 1, 4);  // 左->下->右->上->左
}

// 定义向前翻转函数 (F)
void turnF(int state[]) {
    rotate(state, 2, 4, 3, 5);  // 前->上->后->下->前
}

// 定义向后翻转函数 (B)
void turnB(int state[]) {
    rotate(state, 2, 5, 3, 4);  // 前->下->后->上->前
}

// 定义逆时针旋转函数 (A)
void turnA(int state[]) {
    rotate(state, 0, 3, 1, 2);  // 左->后->右->前->左
}

// 定义顺时针旋转函数 (C)
void turnC(int state[]) {
    rotate(state, 0, 2, 1, 3);  // 左->前->右->后->左
}

int main() {
    char s[100];
    scanf("%s", s);  // 从输入中获取用户指令

    // 初始状态：左1，右2，前3，后4，上5，下6
    int state[6] = {1, 2, 3, 4, 5, 6};

    // 遍历输入的每一个字符，根据指令执行相应的翻转或旋转操作
    for (int i = 0; i < strlen(s); ++i) {
        if (s[i] == 'L') turnL(state);
        else if (s[i] == 'R') turnR(state);
        else if (s[i] == 'F') turnF(state);
        else if (s[i] == 'B') turnB(state);
        else if (s[i] == 'A') turnA(state);
        else if (s[i] == 'C') turnC(state);
    }

    // 输出最终骰子的六个面状态
    for (int i = 0; i < 6; ++i) {
        printf("%d", state[i]);
    }

    return 0;
}`},d={id:"142",title:"转骰子",examType:"A",score:200,description:n,inputDesc:t,outputDesc:e,examples:a,solution:s,codes:i};export{i as codes,d as default,n as description,c as examType,a as examples,r as id,t as inputDesc,e as outputDesc,u as score,s as solution,o as title};
