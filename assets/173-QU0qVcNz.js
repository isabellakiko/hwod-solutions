const a="173",n="空栈压数",u="A",c=200,t=`向一个空栈压入正整数，每当压入一个整数时，执行以下规则（设: 栈顶至栈底整数依次编号为 n1, n2, …, nx，其中n1 为最新压入的整数)
如果 n1 = n2，则 n1、n2全部出栈，压入新数据 m (m = 2*n1) 如果 n1 = n2 + … + ny( y的范围为[3,x]) ，则 n1, n2, …, ny 全部出栈，压入新数据 m (m = 2*n1)。 如果上述规则都不满足，则不做操作。
如果 n1 = n2，则 n1、n2全部出栈，压入新数据 m (m = 2*n1)
如果 n1 = n2 + … + ny( y的范围为[3,x]) ，则 n1, n2, …, ny 全部出栈，压入新数据 m (m = 2*n1)。
如果上述规则都不满足，则不做操作。
如：依次向栈压入 6、1、2、3，
当压入 2 时，栈顶至栈底依次为 [2,1,6]；当压入 3 时，3 = 2 + 1，3、2、1 全部出栈，重新入栈整数6，此时栈顶至栈底依次为 [6,6]；6 = 6，两个 6 全部出栈，压入 12，最终栈中只剩个元素 12。 向栈中输入一串数字，请输出应用此规则后栈中最终存留的数字。
使用单个空格隔开的正整数的字符串，如 “5 6 7 8”，左边的数字先入栈。
正整数大小为 [1, 2^31−1]。正整数个数为 [1,1000]。
最终栈中存留的元素值，元素值使用单个空格隔开，如 "8 7 6 5"，从左至右依次为栈顶至栈底的数字。`,s="",p="",e=[{input:"20 50 80 1 1",output:"160",explanation:"解释: 向栈压入 80 时，10+20+50=80，数据合并后入栈 160，压入两个 1 时，合并为 2，最终栈顶至栈底的数字为 2 和 160。"},{input:"10 20 50 85 1",output:"170",explanation:""}],i=`**解题思路：**

本题是一道**栈模拟**问题。

**核心思路：**
- 每次入栈后检查是否满足合并条件
- n1=n2则合并为2*n1
- n1=n2+...+ny则合并为2*n1

**算法步骤：**
1. 依次将数字入栈
2. 入栈后从栈顶向下累加，若等于当前数则合并
3. 合并后继续检查是否能再次合并
4. 最终输出栈中所有元素

**时间复杂度**：O(N²)`,r={java:`import java.util.LinkedList;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[] inputSequence = scanner.nextLine().split(" ");
        // 创建一个 LinkedList 对象用作数字栈
        LinkedList<Integer> numberStack = new LinkedList<>();

        // 遍历输入的数字序列
        for (String numberString : inputSequence) {
            // 将字符串转换为整数
            int currentNumber = Integer.parseInt(numberString);
            // 初始化部分和为当前数字
            int partialSum = currentNumber;

            // 从栈顶向栈底检查是否满足出栈条件
            for (int index = numberStack.size() - 1; index >= 0; index--) {
                // 从部分和中减去栈中的元素
                partialSum -= numberStack.get(index);

                // 如果满足出栈条件，清除子列表并更新当前数字
                if (partialSum == 0) {
                    // 清除子列表
                    numberStack.subList(index, numberStack.size()).clear();
                    // 更新当前数字
                    currentNumber *= 2;
                    // 更新部分和
                    partialSum = currentNumber;
                } else if (partialSum < 0) {
                    // 如果部分和小于0，跳出循环
                    break;
                }
            }

            // 将当前数字入栈
            numberStack.add(currentNumber);
        }

        // 输出栈中的元素，从栈顶到栈底
        // 创建一个 StringJoiner 对象，用于连接栈中的元素
        StringJoiner outputJoiner = new StringJoiner(" ");
        // 当栈不为空时，依次移除栈顶元素并添加到 StringJoiner 中
        while (!numberStack.isEmpty()) {
            outputJoiner.add(numberStack.removeLast().toString());
        }
        // 输出最终结果
        System.out.println(outputJoiner.toString());
    }
}`,python:`def main():
    # 读取用户输入并使用空格分隔
    input_sequence = input().split()
    # 创建一个列表用作数字栈
    number_stack = []

    # 遍历输入的数字序列
    for number_string in input_sequence:
        # 将字符串转换为整数
        current_number = int(number_string)
        # 初始化部分和为当前数字
        partial_sum = current_number

        # 从栈顶向栈底检查是否满足出栈条件
        index = len(number_stack) - 1
        while index >= 0:
            # 从部分和中减去栈中的元素
            partial_sum -= number_stack[index]

            # 如果满足出栈条件，清除子列表并更新当前数字
            if partial_sum == 0:
                # 清除子列表
                number_stack = number_stack[:index]
                # 更新当前数字
                current_number *= 2
                # 更新部分和
                partial_sum = current_number
            elif partial_sum < 0:
                # 如果部分和小于0，跳出循环
                break

            index -= 1

        # 将当前数字入栈
        number_stack.append(current_number)

    # 输出栈中的元素，从栈顶到栈底
    output = ' '.join(map(str, reversed(number_stack)))
    print(output)


if __name__ == "__main__":
    main()`,javascript:`const readline = require('readline');

// 创建一个 readline.Interface 实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 读取用户输入
rl.on('line', (input) => {
  const inputSequence = input.split(' ');
  // 创建一个数组用作数字栈
  const numberStack = [];

  // 遍历输入的数字序列
  for (const numberString of inputSequence) {
    // 将字符串转换为整数
    let currentNumber = parseInt(numberString, 10);
    // 初始化部分和为当前数字
    let partialSum = currentNumber;

    // 从栈顶向栈底检查是否满足出栈条件
    for (let index = numberStack.length - 1; index >= 0; index--) {
      // 从部分和中减去栈中的元素
      partialSum -= numberStack[index];

      // 如果满足出栈条件，清除子列表并更新当前数字
      if (partialSum === 0) {
        // 清除子列表
        numberStack.splice(index);
        // 更新当前数字
        currentNumber *= 2;
        // 更新部分和
        partialSum = currentNumber;
      } else if (partialSum < 0) {
        // 如果部分和小于0，跳出循环
        break;
      }
    }

    // 将当前数字入栈
    numberStack.push(currentNumber);
  }

  // 输出栈中的元素，从栈顶到栈底
  const output = numberStack.reverse().join(' ');
  console.log(output);

  // 关闭 readline.Interface 实例
  rl.close();
});`,cpp:`#include <iostream>

int main() {
    // 读取用户输入
    int input_sequence[1000];
    int input_size = 0;
    int temp;
    while (std::cin >> temp) {
        input_sequence[input_size++] = temp;
    }

    // 创建一个普通数组用作数字栈
    int number_stack[1000];
    int stack_size = 0;

    // 遍历输入的数字序列
    for (int i = 0; i < input_size; ++i) {
        int current_number = input_sequence[i];
        // 初始化部分和为当前数字
        int partial_sum = current_number;

        // 从栈顶向栈底检查是否满足出栈条件
        int index = stack_size - 1;
        while (index >= 0) {
            // 从部分和中减去栈中的元素
            partial_sum -= number_stack[index];

            // 如果满足出栈条件，清除子列表并更新当前数字
            if (partial_sum == 0) {
                // 清除子列表
                stack_size = index;
                // 更新当前数字
                current_number *= 2;
                // 更新部分和
                partial_sum = current_number;
            } else if (partial_sum < 0) {
                // 如果部分和小于0，跳出循环
                break;
            }

            index -= 1;
        }

        // 将当前数字入栈
        number_stack[stack_size++] = current_number;
    }

    // 输出栈中的元素，从栈顶到栈底
    for (int i = stack_size - 1; i >= 0; --i) {
        std::cout << number_stack[i];
        if (i > 0) {
            std::cout << " ";
        }
    }
    std::cout << std::endl;

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义一个栈结构体，用于存储整数
typedef struct {
    int *data;      // 栈中存储的数据
    int top;        // 栈顶索引
    int capacity;   // 栈的容量
} Stack;

// 初始化栈，分配内存并设置初始值
Stack* createStack(int capacity) {
    Stack *stack = (Stack*)malloc(sizeof(Stack));
    stack->data = (int*)malloc(capacity * sizeof(int));
    stack->top = -1;   // 初始化栈顶索引为-1，表示空栈
    stack->capacity = capacity;
    return stack;
}

// 判断栈是否为空
int isEmpty(Stack *stack) {
    return stack->top == -1;
}

// 向栈中压入元素
void push(Stack *stack, int value) {
    stack->data[++stack->top] = value;
}

// 从栈中弹出元素
int pop(Stack *stack) {
    return stack->data[stack->top--];
}

// 返回栈顶元素但不弹出
int peek(Stack *stack) {
    return stack->data[stack->top];
}

// 释放栈的内存
void freeStack(Stack *stack) {
    free(stack->data);
    free(stack);
}

// 主函数，负责处理输入输出和逻辑
int main() {
    char input[10000]; // 存储输入字符串
    fgets(input, sizeof(input), stdin); // 读取输入字符串

    // 初始化栈，容量设为1000
    Stack *stack = createStack(1000);

    // 解析输入的整数序列
    char *token = strtok(input, " ");
    while (token != NULL) {
        int currentNumber = atoi(token);  // 将当前字符串转换为整数
        int partialSum = currentNumber;   // 初始化部分和为当前数字

        // 从栈顶向栈底检查是否满足出栈条件
        for (int index = stack->top; index >= 0; index--) {
            partialSum -= stack->data[index]; // 从部分和中减去栈中的元素

            // 如果满足出栈条件，清除子列表并更新当前数字
            if (partialSum == 0) {
                stack->top = index - 1;  // 调整栈顶位置以清除子列表
                currentNumber *= 2;      // 更新当前数字为原数字的2倍
                partialSum = currentNumber; // 更新部分和
            } else if (partialSum < 0) {
                // 如果部分和小于0，跳出循环
                break;
            }
        }

        // 将当前数字压入栈中
        push(stack, currentNumber);

        // 获取下一个输入的整数
        token = strtok(NULL, " ");
    }

    // 输出栈中的元素，从栈顶到栈底
    int first = 1; // 用于控制输出格式
    while (!isEmpty(stack)) {
        if (!first) {
            printf(" "); // 在元素之间输出空格
        }
        printf("%d", pop(stack)); // 输出栈顶元素
        first = 0;
    }
    printf("\\n"); // 输出换行符

    // 释放栈的内存
    freeStack(stack);

    return 0;
}`},m={id:"173",title:n,examType:"A",score:200,description:t,inputDesc:"",outputDesc:"",examples:e,solution:i,codes:r};export{r as codes,m as default,t as description,u as examType,e as examples,a as id,s as inputDesc,p as outputDesc,c as score,i as solution,n as title};
