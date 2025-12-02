const m="10",n="内存资源分配",u="A",l=100,e=`有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。
分配规则如下：
分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用；需要按申请顺序分配，先申请的先分配，有可用内存分配则申请结果为true；没有可用则返回false。
注意：不考虑内存释放`,t=`输入为两行字符串
第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割
一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量资源列表不大于1024每个粒度的数量不大于4096
第二行为申请列表，申请的内存大小间用逗号分割
申请列表不大于100000
如: 64:2,128:1,32:4,1:128 50,36,64,128,127`,i=`输出为内存池分配结果
如true,true,true,false,false`,o=[{input:`64:2,128:1,32:4,1:128
50,36,64,128,127`,output:"true,true,true,false,false",explanation:`内存池资源包含：64K共2个、128K共1个、32K共4个、1K共128个。

针对 50,36,64,128,127 的内存申请序列：
- 申请50K：分配64K（最小满足条件的块），剩余64K×1
- 申请36K：分配64K，剩余无64K
- 申请64K：分配128K（64K已用完），剩余无128K
- 申请128K：失败（无>=128K的块）
- 申请127K：失败（无>=127K的块）

输出：true,true,true,false,false`},{input:`64:2,128:1,32:4,1:128
1,1,1,1,1,1`,output:"true,true,true,true,true,true",explanation:"申请6个1K内存，内存池有128个1K块，全部成功分配。"}],s=`**解题思路：**

本题是一道**贪心 + 模拟**问题。

**算法步骤：**

1. **解析内存池**：将 \`64:2,128:1,32:4\` 格式解析为内存块列表
2. **排序内存池**：按内存块大小升序排列（保证优先分配小的）
3. **处理每个申请**：
   - 在排序后的内存池中找第一个 >= 申请大小的块
   - 找到则分配（移除该块），返回 true
   - 找不到则返回 false
4. **输出结果**：用逗号连接所有申请结果

**关键点：**
- 必须先排序，确保优先分配最小的满足条件的块
- 内存一旦分配就不能再用（不考虑释放）
- 不能拆分使用（64K 块不能拆成两个 32K）`,r={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String memoryInfo = sc.next();
        String applyList = sc.next();
        
        // 解析内存池
        List<Integer> memoryList = new ArrayList<>();
        for (String info : memoryInfo.split(",")) {
            String[] parts = info.split(":");
            int size = Integer.parseInt(parts[0]);
            int count = Integer.parseInt(parts[1]);
            for (int i = 0; i < count; i++) {
                memoryList.add(size);
            }
        }
        
        // 排序（优先分配小的）
        Collections.sort(memoryList);
        
        // 处理申请
        StringBuilder result = new StringBuilder();
        for (String apply : applyList.split(",")) {
            int need = Integer.parseInt(apply);
            boolean found = false;
            for (int i = 0; i < memoryList.size(); i++) {
                if (memoryList.get(i) >= need) {
                    memoryList.remove(i);
                    found = true;
                    break;
                }
            }
            if (result.length() > 0) result.append(",");
            result.append(found);
        }
        
        System.out.println(result);
    }
}`,python:`memory_info = input()
apply_list = input()

# 解析内存池
memory = []
for item in memory_info.split(','):
    size, count = map(int, item.split(':'))
    memory.extend([size] * count)

# 排序（优先分配小的）
memory.sort()

# 处理申请
results = []
for need in map(int, apply_list.split(',')):
    found = False
    for i, m in enumerate(memory):
        if m >= need:
            memory.pop(i)
            found = True
            break
    results.append('true' if found else 'false')

print(','.join(results))`,javascript:`const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let lines = [];
rl.on('line', line => lines.push(line));
rl.on('close', () => {
  // 解析内存池
  const memory = [];
  for (const item of lines[0].split(',')) {
    const [size, count] = item.split(':').map(Number);
    for (let i = 0; i < count; i++) memory.push(size);
  }
  
  // 排序（优先分配小的）
  memory.sort((a, b) => a - b);
  
  // 处理申请
  const results = [];
  for (const need of lines[1].split(',').map(Number)) {
    let found = false;
    for (let i = 0; i < memory.length; i++) {
      if (memory[i] >= need) {
        memory.splice(i, 1);
        found = true;
        break;
      }
    }
    results.push(found ? 'true' : 'false');
  }
  
  console.log(results.join(','));
});`,cpp:`#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string memoryInfo, applyList;
    cin >> memoryInfo >> applyList;
    
    // 解析内存池
    vector<int> memory;
    stringstream ss(memoryInfo);
    string item;
    while (getline(ss, item, ',')) {
        int pos = item.find(':');
        int size = stoi(item.substr(0, pos));
        int count = stoi(item.substr(pos + 1));
        for (int i = 0; i < count; i++) memory.push_back(size);
    }
    
    // 排序（优先分配小的）
    sort(memory.begin(), memory.end());
    
    // 处理申请
    stringstream ss2(applyList);
    bool first = true;
    while (getline(ss2, item, ',')) {
        int need = stoi(item);
        bool found = false;
        for (size_t i = 0; i < memory.size(); i++) {
            if (memory[i] >= need) {
                memory.erase(memory.begin() + i);
                found = true;
                break;
            }
        }
        if (!first) cout << ",";
        cout << (found ? "true" : "false");
        first = false;
    }
    cout << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int main() {
    char memoryInfo[10000], applyList[10000];
    int memory[100000], memCount = 0;
    int results[100000], resCount = 0;
    
    scanf("%s %s", memoryInfo, applyList);
    
    // 解析内存池
    char *token = strtok(memoryInfo, ",");
    while (token) {
        char *colon = strchr(token, ':');
        int size = atoi(token);
        int count = atoi(colon + 1);
        for (int i = 0; i < count; i++) memory[memCount++] = size;
        token = strtok(NULL, ",");
    }
    
    // 排序（优先分配小的）
    qsort(memory, memCount, sizeof(int), cmp);
    
    // 处理申请
    token = strtok(applyList, ",");
    while (token) {
        int need = atoi(token);
        int found = 0;
        for (int i = 0; i < memCount; i++) {
            if (memory[i] >= need) {
                for (int j = i; j < memCount - 1; j++) memory[j] = memory[j + 1];
                memCount--;
                found = 1;
                break;
            }
        }
        results[resCount++] = found;
        token = strtok(NULL, ",");
    }
    
    // 输出结果
    for (int i = 0; i < resCount; i++) {
        printf("%s%s", results[i] ? "true" : "false", i < resCount - 1 ? "," : "\\n");
    }
    return 0;
}`},a={id:"10",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:o,solution:s,codes:r};export{r as codes,a as default,e as description,u as examType,o as examples,m as id,t as inputDesc,i as outputDesc,l as score,s as solution,n as title};
