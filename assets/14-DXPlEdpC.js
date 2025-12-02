const o="14",n="单向链表中间节点",r="A",p=100,e=`给定一个单链表 L，请编写程序输出 L 中间结点保存的数据。
如果有两个中间结点，则输出第二个中间结点保存的数据。
例如：
给定 L 为 1→7→5，则输出应该为 7；给定 L 为 1→2→3→4，则输出应该为 3。`,s=`每个输入包含 1 个测试用例。每个测试用例:
第 1 行给出链表首结点的地址、结点总个数正整数 N (≤10^5)。
结点的地址是 5 位非负整数，NULL 地址用 -1 表示。
接下来有 N 行，每行格式为：Address Data Next
其中 Address 是结点地址，Data 是该结点保存的整数数据(0 ≤ Data ≤ 10^8)，Next 是下一结点的地址。`,a=`对每个测试用例，在一行中输出 L 中间结点保存的数据。
如果有两个中间结点，则输出第二个中间结点保存的数据。
（如果奇数个节点取中间，偶数个取偏右边的那个值）`,t=[{input:`00000 4
00000 5 11451
11451 7 12309
12309 6 33218
33218 3 -1`,output:"6",explanation:`链表为：5 -> 7 -> 6 -> 3，长度为 4（偶数）。
中间两个节点是 7 和 6，输出第二个中间结点的值：6。`},{input:`76892 3
76892 1 11451
11451 7 12309
12309 5 -1`,output:"7",explanation:`链表为：1 -> 7 -> 5，长度为 3（奇数）。
中间结点是 7，输出 7。`},{input:`00000 4
00000 1 12309
12309 2 33218
33218 3 44444
44444 4 -1`,output:"3",explanation:`链表为：1 -> 2 -> 3 -> 4，长度为 4（偶数）。
中间两个节点是 2 和 3，输出第二个中间结点的值：3。`}],d=`**解题思路：**

本题是一道**链表 + 快慢指针**问题。

**算法步骤：**

1. **建立链表**：使用 HashMap 存储节点信息，key 为地址，value 为 (data, next)
2. **快慢指针**：
   - 慢指针 slow 每次走 1 步
   - 快指针 fast 每次走 2 步
   - 当 fast 到达末尾时，slow 正好在中间
3. **输出结果**：输出 slow 指向节点的 data

**关键点：**
- 对于偶数长度链表，快慢指针法自动返回偏右的中间节点
- 注意处理节点地址为 -1（NULL）的情况
- 输入的节点顺序不一定是链表顺序，需要通过地址链接

**时间复杂度**：O(n)，只需一次遍历`,i={java:`import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 输入链表头节点地址和节点数
        String[] firstLine = sc.nextLine().split(" ");
        String headAddress = firstLine[0];
        int n = Integer.parseInt(firstLine[1]);

        // 创建 HashMap 存储每个节点的值和下一个节点的地址
        HashMap<String, String[]> nodeMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            String[] nodeData = sc.nextLine().split(" ");
            String address = nodeData[0];
            String value = nodeData[1];
            String nextAddress = nodeData[2];
            nodeMap.put(address, new String[]{value, nextAddress});
        }

        // 初始化慢指针和快指针，均指向头节点
        String slow = headAddress;
        String fast = headAddress;

        // 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
        while (fast != null && nodeMap.containsKey(fast)) {
            fast = nodeMap.get(fast)[1]; // 快指针走一步
            if (fast == null || !nodeMap.containsKey(fast)) {
                break; // 如果快指针到达链表末尾，结束
            }
            fast = nodeMap.get(fast)[1]; // 快指针再走一步
            slow = nodeMap.get(slow)[1]; // 慢指针走一步
        }

        // 输出慢指针指向的节点的值
        System.out.println(nodeMap.get(slow)[0]);
    }
}`,python:`# 使用字典模拟链表
node_map = {}

# 读取输入
head_address, n = input().split()
n = int(n)

# 读取每个节点的信息并存储在字典中
for _ in range(n):
    address, value, next_address = input().split()
    node_map[address] = (value, next_address)


# 初始化慢指针和快指针，均指向头节点
slow = head_address
fast = head_address

# 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
while fast != '-1' and fast in node_map:
    fast = node_map[fast][1]  # 快指针走一步
    if fast == '-1' or fast not in node_map:
        break  # 快指针到达链表末尾，结束循环
    fast = node_map[fast][1]  # 快指针再走一步
    slow = node_map[slow][1]  # 慢指针走一步

# 输出慢指针指向的节点的值
print(node_map[slow][0])`,javascript:`const readline = require('readline');

// 创建接口读取输入
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 保存链表数据的Map
let nodeMap = new Map();
let headAddress = '';
let n = 0;
let lineCount = 0;

// 读取输入的每一行
rl.on('line', (line) => {
    lineCount++;
    let data = line.split(' ');
    
    if (lineCount === 1) {
        // 读取头节点地址和节点数
        headAddress = data[0];
        n = parseInt(data[1]);
    } else {
        // 存储节点信息
        nodeMap.set(data[0], [data[1], data[2]]);
        if (lineCount - 1 === n) {
            rl.close(); // 读取完毕后关闭输入
        }
    }
});

// 处理逻辑
rl.on('close', () => {

    let slow = headAddress;
    let fast = headAddress;

    // 快指针每次走两步，慢指针每次走一步
    while (fast !== '-1' && nodeMap.has(fast)) {
        fast = nodeMap.get(fast)[1];
        if (fast === '-1' || !nodeMap.has(fast)) break;
        fast = nodeMap.get(fast)[1];
        slow = nodeMap.get(slow)[1];
    }

    // 输出慢指针指向的节点的值
    console.log(nodeMap.get(slow)[0]);
});`,cpp:`#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    int n;
    string headAddress;
    cin >> headAddress >> n;

    // 使用unordered_map存储每个节点的值和下一个节点的地址
    unordered_map<string, pair<string, string>> nodeMap;
    for (int i = 0; i < n; i++) {
        string address, value, nextAddress;
        cin >> address >> value >> nextAddress;
        nodeMap[address] = {value, nextAddress}; // 将数据存入哈希表
    }

    // 如果头节点不存在，直接退出
    if (nodeMap.find(headAddress) == nodeMap.end()) {
        return 0;
    }

    // 初始化慢指针和快指针，均指向头节点
    string slow = headAddress, fast = headAddress;

    // 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
    while (fast != "-1" && nodeMap.find(fast) != nodeMap.end()) {
        fast = nodeMap[fast].second; // 快指针走一步
        if (fast == "-1" || nodeMap.find(fast) == nodeMap.end()) {
            break; // 快指针到达链表末尾，退出循环
        }
        fast = nodeMap[fast].second; // 快指针再走一步
        slow = nodeMap[slow].second; // 慢指针走一步
    }

    // 输出慢指针指向的节点的值
    cout << nodeMap[slow].first << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

typedef struct {
    char addr[6];
    char data[12];
    char next[6];
} Node;

Node nodes[100001];
int n;

int findNode(char *addr) {
    for (int i = 0; i < n; i++) {
        if (strcmp(nodes[i].addr, addr) == 0) return i;
    }
    return -1;
}

int main() {
    char head[6];
    scanf("%s %d", head, &n);
    
    for (int i = 0; i < n; i++) {
        scanf("%s %s %s", nodes[i].addr, nodes[i].data, nodes[i].next);
    }
    
    char slow[6], fast[6];
    strcpy(slow, head);
    strcpy(fast, head);
    
    while (strcmp(fast, "-1") != 0) {
        int fi = findNode(fast);
        if (fi == -1) break;
        strcpy(fast, nodes[fi].next);
        if (strcmp(fast, "-1") == 0) break;
        
        fi = findNode(fast);
        if (fi == -1) break;
        strcpy(fast, nodes[fi].next);
        
        int si = findNode(slow);
        strcpy(slow, nodes[si].next);
    }
    
    int si = findNode(slow);
    printf("%s\\n", nodes[si].data);
    return 0;
}`},l={id:"14",title:n,examType:"A",score:100,description:e,inputDesc:s,outputDesc:a,examples:t,solution:d,codes:i};export{i as codes,l as default,e as description,r as examType,t as examples,o as id,s as inputDesc,a as outputDesc,p as score,d as solution,n as title};
