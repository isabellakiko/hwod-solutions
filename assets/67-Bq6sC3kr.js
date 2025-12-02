const r="67",n="堆栈中的剩余数字",c="A",o=100,t=`向一个空栈中依次存入正整数，假设入栈元素 n(1<=n<=2^31-1)按顺序依次为 nx…n4、 n3、n2、 n1, 每当元素入栈时，如果 n1=n2+…+ny(y 的范围[2,x]， 1<=x<=1000)，则 n1~ny 全部元素出栈，重新入栈新元素 m(m=2*n1)。
如：依次向栈存入 6、 1、 2、 3, 当存入 6、 1、 2 时，栈底至栈顶依次为[6、 1、 2]；当存入 3时， 3=2+1， 3、 2、 1 全部出栈，重新入栈元素 6(6=2*3)，此时栈中有元素 6；
因为 6=6，所以两个 6 全部出栈，存入 12，最终栈中只剩一个元素 12。
`,i=`使用单个空格隔开的正整数的字符串，如”5 6 7 8″， 左边的数字先入栈，输入的正整数个数为 x， 1<=x<=1000。
`,s="最终栈中存留的元素值，元素值使用空格隔开，栈顶数字在左边。",e=[{input:"6 1 2 3",output:"12",explanation:"入栈6,1,2后栈为[6,1,2]；入栈3时3=2+1，弹出3,2,1入栈6；此时栈顶6=栈底6，弹出入栈12。"},{input:"1 2 3 4",output:"4 3 2 1",explanation:"没有满足条件的情况，所有元素都留在栈中，栈顶4在左边。"},{input:"5 10 20 15",output:"30 20",explanation:"入栈5,10,20后；入栈15时15=10+5，弹出入栈30。最终栈为[20,30]，输出30 20。"}],u=`**解题思路：**

本题是一道**栈模拟**问题。

**算法步骤：**
1. 每次入栈前，检查新元素是否等于栈中若干连续栈顶元素之和
2. 若相等，弹出这些元素，入栈新元素的2倍
3. 入栈2倍元素时需递归检查
4. 最后输出栈中元素（栈顶在左）

**时间复杂度**：O(N²)`,a={java:`import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    System.out.println(getResult(nums));
  }

  public static String getResult(int[] nums) {
    LinkedList<Integer> stack = new LinkedList<>();
    stack.add(nums[0]);

    for (int i = 1; i < nums.length; i++) {
      push(nums[i], stack);
    }

    StringJoiner sj = new StringJoiner(" ");
    while (stack.size() > 0) {
      sj.add(stack.removeLast() + "");
    }
    return sj.toString();
  }

  public static void push(int num, LinkedList<Integer> stack) {
    int sum = num;

    for (int i = stack.size() - 1; i >= 0; i--) {
      sum -= stack.get(i);

      if (sum == 0) {
        stack.subList(i, stack.size()).clear();
        push(num * 2, stack);
        return;
      } else if (sum < 0) {
        break;
      }
    }

    stack.add(num);
  }
}`,python:`# 输入获取
nums = list(map(int, input().split()))


def push(num, stack):
    total = num

    for i in range(len(stack)-1, -1, -1):
        total -= stack[i]

        if total == 0:
            del stack[i:]
            push(num * 2, stack)
            return
        elif total < 0:
            break

    stack.append(num)


# 算法入口
def getResult():
    stack = [nums[0]]

    for i in range(1, len(nums)):
        push(nums[i], stack)

    stack.reverse()

    return " ".join(map(str, stack))


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const nums = line.split(' ').map(Number);
    const stack = [nums[0]];
    
    function push(num) {
        let sum = num;
        for (let i = stack.length - 1; i >= 0; i--) {
            sum -= stack[i];
            if (sum === 0) {
                stack.splice(i);
                push(num * 2);
                return;
            } else if (sum < 0) {
                break;
            }
        }
        stack.push(num);
    }
    
    for (let i = 1; i < nums.length; i++) {
        push(nums[i]);
    }
    
    console.log(stack.reverse().join(' '));
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

vector<int> stack_v;

void push(int num) {
    int sum = num;
    for (int i = stack_v.size() - 1; i >= 0; i--) {
        sum -= stack_v[i];
        if (sum == 0) {
            stack_v.erase(stack_v.begin() + i, stack_v.end());
            push(num * 2);
            return;
        } else if (sum < 0) {
            break;
        }
    }
    stack_v.push_back(num);
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    int num;
    vector<int> nums;
    while (ss >> num) {
        nums.push_back(num);
    }
    
    stack_v.push_back(nums[0]);
    for (int i = 1; i < nums.size(); i++) {
        push(nums[i]);
    }
    
    for (int i = stack_v.size() - 1; i >= 0; i--) {
        cout << stack_v[i];
        if (i > 0) cout << " ";
    }
    cout << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int stack[1001];
int top = 0;

void push(int num) {
    int sum = num;
    for (int i = top - 1; i >= 0; i--) {
        sum -= stack[i];
        if (sum == 0) {
            top = i;
            push(num * 2);
            return;
        } else if (sum < 0) {
            break;
        }
    }
    stack[top++] = num;
}

int main() {
    char line[10000];
    fgets(line, sizeof(line), stdin);
    
    int nums[1001];
    int n = 0;
    char* token = strtok(line, " \\n");
    while (token) {
        nums[n++] = atoi(token);
        token = strtok(NULL, " \\n");
    }
    
    stack[top++] = nums[0];
    for (int i = 1; i < n; i++) {
        push(nums[i]);
    }
    
    for (int i = top - 1; i >= 0; i--) {
        printf("%d", stack[i]);
        if (i > 0) printf(" ");
    }
    printf("\\n");
    return 0;
}`},m={id:"67",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:s,examples:e,solution:u,codes:a};export{a as codes,m as default,t as description,c as examType,e as examples,r as id,i as inputDesc,s as outputDesc,o as score,u as solution,n as title};
