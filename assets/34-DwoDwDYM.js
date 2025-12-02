const a="34",n="最小的调整次数特异性双端队列",s="A",d=100,e=`有一个特异性的双端队列，该队列可以从头部或尾部添加数据，但是只能从头部移出数据。
小A依次执行2n个指令往队列中添加数据和移出数据。其中n个指令是添加数据（可能从头部添加、也可能从尾部添加），依次添加1到n；n个指令是移出数据。
现在要求移除数据的顺序为1到n。
为了满足最后输出的要求，小A可以在任何时候调整队列中数据的顺序。
请问 小A 最少需要调整几次才能够满足移除数据的顺序正好是1到n。`,t=`第一行一个数据n，表示数据的范围。
接下来的2n行，其中有n行为添加数据，指令为：
head add x表示从头部添加数据 x，tail add x 表示从尾部添加数据x，
另外 n 行为移出数据指令，指令为：remove 的形式，表示移出1个数据；
1 ≤ n ≤ 3 * 10^5。
所有的数据均合法。`,i="一个整数，表示 小A 要调整的最小次数。",r=[{input:`5
head add 1
tail add 2
remove
head add 3
tail add 4
head add 5
remove
remove
remove
remove`,output:"1",explanation:`n=5，依次添加1-5并移除。
1. head add 1 → [1]
2. tail add 2 → [1,2]
3. remove → 移除1 ✓
4. head add 3 → [3,2] ← 从头部加，顺序乱了
5. tail add 4 → [3,2,4]
6. head add 5 → [5,3,2,4]
7. remove → 需要移除2，但队头是5，需调整1次
之后按序移除3,4,5。
总共调整1次。`},{input:`3
tail add 1
tail add 2
tail add 3
remove
remove
remove`,output:"0",explanation:"全部从尾部添加，顺序为[1,2,3]，依次移除1,2,3，无需调整。"}],o=`**解题思路：**

本题是一道**模拟**问题。

**核心观察：**
- 如果所有元素都从尾部添加，队列天然有序
- 如果在队列非空时从头部添加，会破坏顺序
- 每次remove前如果顺序被破坏，就需要调整一次

**算法步骤：**

1. 维护一个标志 in_order 表示当前队列是否有序
2. head add：如果队列非空且当前有序，则标记为无序
3. remove：如果当前无序，调整次数+1，并重置为有序
4. 返回调整次数

**时间复杂度**：O(n)`,u={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int number = scanner.nextInt();//数据的范围
        scanner.nextLine();

        Queue<Integer> queue = new LinkedList<>();//模拟双端队列
        boolean in_order = true;//是否按顺序删除
        int result = 0;//最小的调整顺序次数

        for (int i = 0; i < 2 * number; i++) {
            String input_str = scanner.nextLine();
            String[] operation = input_str.split(" ");
            if (operation[0].equals("head")) {//从头部添加元素
                if (!queue.isEmpty() && in_order) {//不按顺序删除
                    in_order = false;
                }
                queue.add(Integer.parseInt(operation[2]));
            } else if (operation[0].equals("tail")) {//从尾部添加元素
                queue.add(Integer.parseInt(operation[2]));
            } else {//删除元素
                if (queue.isEmpty()) {
                    continue;
                }
                if (!in_order) {//不按顺序删除
                    result++;
                    in_order = true;
                }
                queue.poll();
            }
        }

        System.out.println(result);//输出最小的调整顺序次数
    }
}`,python:`from collections import deque

number = int(input()) # 数据的范围

queue = deque() # 模拟双端队列
in_order = True # 是否按顺序删除
result = 0 # 最小的调整顺序次数

for i in range(2 * number):
    input_str = input()
    operation = input_str.split(" ")
    if operation[0] == "head": # 从头部添加元素
        if len(queue) != 0 and in_order: # 不按顺序删除
            in_order = False
        queue.appendleft(int(operation[2]))
    elif operation[0] == "tail": # 从尾部添加元素
        queue.append(int(operation[2]))
    else: # 删除元素
        if len(queue) == 0:
            continue
        if not in_order: # 不按顺序删除
            result += 1
            in_order = True
        queue.pop()

print(result) # 输出最小的调整顺序次数`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let number = 0;
let operations = [];

rl.on('line', (input) => {
  if (number === 0) {
    number = parseInt(input);
  } else {
    operations.push(input.split(" "));
    if (operations.length === 2 * number) {
      rl.close();
    }
  }
});

const queue = []; // 模拟双端队列
let in_order = true; // 是否按顺序删除
let result = 0; // 最小的调整顺序次数

rl.on('close', () => {
  for (let i = 0; i < 2 * number; i++) {
    const operation = operations[i];
     if (operation[0] === "head") { // 从头部添加元素
      if (queue.length !== 0 && in_order) { // 不按顺序删除
        in_order = false;
      }
      queue.unshift(parseInt(operation[2]));
    } else if (operation[0] === "tail") { // 从尾部添加元素
      queue.push(parseInt(operation[2]));
    } else { // 删除元素
      if (queue.length === 0) {
        continue;
      }
      if (!in_order) { // 不按顺序删除
        result += 1;
        in_order = true;
      }
      queue.pop();
    }
  }
  console.log(result); // 输出最小的调整顺序次数
});`,cpp:`#include <iostream>
#include <queue>
using namespace std;

int main() {
    int number;
    cin >> number;
    cin.ignore();

    queue<int> queue;
    bool in_order = true;
    int result = 0;

    for (int i = 0; i < 2 * number; i++) {
        string input_str;
        getline(cin, input_str);
        string operation[3];
        int j = 0;
        for (char c : input_str) {
            if (c == ' ') {
                j++;
            } else {
                operation[j] += c;
            }
        }
        if (operation[0] == "head") {
            if (!queue.empty() && in_order) {
                in_order = false;
            }
            queue.push(stoi(operation[2]));
        } else if (operation[0] == "tail") {
            queue.push(stoi(operation[2]));
        } else {
            if (queue.empty()) {
                continue;
            }
            if (!in_order) {
                result++;
                in_order = true;
            }
            queue.pop();
        }
    }

    cout << result << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 600000 // 定义队列的最大容量（2n）

int queue[MAX_SIZE]; // 模拟双端队列的数组
int front = 0; // 队列头部索引
int rear = -1; // 队列尾部索引
int size = 0; // 当前队列中的元素数量

int main() {
    int n;
    scanf("%d", &n); // 读取数据范围n

    int result = 0; // 记录最小的调整顺序次数
    int expected = 1; // 期望移除的下一个元素
    int in_order = 1; // 标记是否按顺序删除

    for (int i = 0; i < 2 * n; i++) {
        char operation[10];
        int x;

        scanf("%s", operation); // 读取操作类型

        if (operation[0] == 'r') { // 如果是 "remove" 操作
            if (queue[front] != expected) { // 如果移除的元素不是期望的
                in_order = 0; // 标记为不按顺序
            } else {
                expected++; // 移除的元素符合预期，更新下一个期望值
            }
            front = (front + 1) % MAX_SIZE; // 更新头部索引
            size--; // 减少队列中的元素数量
        } else { // 如果是 "head add" 或 "tail add" 操作
            scanf("%*s %d", &x); // 读取要添加的元素x

            if (operation[0] == 'h') { // 如果是 "head add"
                front = (front - 1 + MAX_SIZE) % MAX_SIZE; // 更新头部索引
                queue[front] = x; // 从头部添加元素
            } else { // 如果是 "tail add"
                rear = (rear + 1) % MAX_SIZE; // 更新尾部索引
                queue[rear] = x; // 从尾部添加元素
            }
            size++; // 增加队列中的元素数量
        }
        
        if (!in_order && size == 0) { // 如果当前不按顺序且队列为空
            result++; // 增加调整次数
            in_order = 1; // 重置为按顺序状态
        }
    }

    printf("%d\\n", result); // 输出最小的调整顺序次数

    return 0;
}`},p={id:"34",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:r,solution:o,codes:u};export{u as codes,p as default,e as description,s as examType,r as examples,a as id,t as inputDesc,i as outputDesc,d as score,o as solution,n as title};
