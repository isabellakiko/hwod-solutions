const p="3",n="VLAN资源池",l="A",a=100,t=`VLAN是一种对局域网设备进行逻辑划分的技术，为了标识不同的VLAN，引入VLAN ID(1-4094之间的整数)的概念。

定义一个VLAN ID的资源池(下称VLAN资源池)，资源池中连续的VLAN用\`开始VLAN-结束VLAN\`表示，不连续的用单个整数表示，所有的VLAN用英文逗号连接起来。

现在有一个VLAN资源池，业务需要从资源池中申请一个VLAN，需要你输出从VLAN资源池中移除申请的VLAN后的资源池。`,o=`第一行为字符串格式的VLAN资源池
第二行为业务要申请的VLAN，VLAN的取值范围为[1,4094]之间的整数`,e=`从输入VLAN资源池中移除申请的VLAN后字符串格式的VLAN资源池，输出要求满足题目描述中的格式，并且按照VLAN从小到大升序输出。

如果申请的VLAN不在原VLAN资源池内，输出原VLAN资源池升序排序后的字符串即可。`,r=[{input:`1-5
2`,output:"1,3-5",explanation:"原VLAN资源池中有VLAN 1、2、3、4、5，从资源池中移除2后，剩下VLAN 1、3、4、5，按照题目描述格式并升序后的结果为1,3-5"},{input:`20-21,15,18,30,5-10
15`,output:"5-10,18,20-21,30",explanation:"原VLAN资源池中有VLAN 5、6、7、8、9、10、15、18、20、21、30，从资源池中移除15后，资源池中剩下的VLAN为 5、6、7、8、9、10、18、20、21、30，按照题目描述格式并升序后的结果为5-10,18,20-21,30"},{input:`5,1-3
10`,output:"1-3,5",explanation:"原VLAN资源池中有VLAN 1、2、3、5，申请的VLAN 10不在原资源池中，将原资源池按照题目描述格式并按升序排序后输出的结果为1-3,5"}],i=`**解题思路：**

1. **解析VLAN资源池**：将输入字符串按逗号分割，对于每个部分：
   - 如果包含\`-\`，表示连续范围，解析起始和结束值，展开为所有VLAN
   - 否则是单个VLAN ID

2. **移除目标VLAN**：从解析后的VLAN集合中移除要申请的VLAN

3. **格式化输出**：将剩余的VLAN排序后，合并连续的VLAN为范围格式
   - 连续的VLAN用\`start-end\`表示
   - 不连续的用逗号分隔

**关键点：**
- 注意处理边界情况：VLAN不在池中、池为空等
- 输出必须升序排列
- 连续VLAN的范围表示要正确`,s={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        int destVlan = Integer.parseInt(sc.nextLine());

        // 解析VLAN资源池
        List<Integer> vlanPool = parseVlanPool(input);
        Collections.sort(vlanPool);

        // 移除申请的VLAN
        vlanPool.remove(Integer.valueOf(destVlan));

        // 格式化输出
        System.out.println(formatVlanPool(vlanPool));
    }

    private static List<Integer> parseVlanPool(String input) {
        List<Integer> pool = new ArrayList<>();
        String[] groups = input.split(",");
        for (String group : groups) {
            if (group.contains("-")) {
                String[] range = group.split("-");
                int start = Integer.parseInt(range[0]);
                int end = Integer.parseInt(range[1]);
                for (int i = start; i <= end; i++) {
                    pool.add(i);
                }
            } else {
                pool.add(Integer.parseInt(group));
            }
        }
        return pool;
    }

    private static String formatVlanPool(List<Integer> pool) {
        if (pool.isEmpty()) return "";
        
        StringBuilder result = new StringBuilder();
        int start = pool.get(0);
        int prev = start;

        for (int i = 1; i < pool.size(); i++) {
            if (pool.get(i) == prev + 1) {
                prev = pool.get(i);
            } else {
                appendRange(result, start, prev);
                result.append(",");
                start = pool.get(i);
                prev = start;
            }
        }
        appendRange(result, start, prev);
        return result.toString();
    }

    private static void appendRange(StringBuilder sb, int start, int end) {
        if (start == end) {
            sb.append(start);
        } else {
            sb.append(start).append("-").append(end);
        }
    }
}`,python:`def parse_vlan_pool(input_str):
    pool = []
    for group in input_str.split(','):
        if '-' in group:
            start, end = map(int, group.split('-'))
            pool.extend(range(start, end + 1))
        else:
            pool.append(int(group))
    return pool

def format_vlan_pool(pool):
    if not pool:
        return ""
    
    pool = sorted(pool)
    result = []
    start = prev = pool[0]
    
    for vlan in pool[1:]:
        if vlan == prev + 1:
            prev = vlan
        else:
            if start == prev:
                result.append(str(start))
            else:
                result.append(f"{start}-{prev}")
            start = prev = vlan
    
    # 处理最后一组
    if start == prev:
        result.append(str(start))
    else:
        result.append(f"{start}-{prev}")
    
    return ','.join(result)

# 主程序
vlan_input = input()
dest_vlan = int(input())

pool = parse_vlan_pool(vlan_input)
if dest_vlan in pool:
    pool.remove(dest_vlan)

print(format_vlan_pool(pool))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseVlanPool(input) {
  const pool = [];
  for (const group of input.split(',')) {
    if (group.includes('-')) {
      const [start, end] = group.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        pool.push(i);
      }
    } else {
      pool.push(Number(group));
    }
  }
  return pool;
}

function formatVlanPool(pool) {
  if (pool.length === 0) return '';
  
  pool.sort((a, b) => a - b);
  const result = [];
  let start = pool[0], prev = start;
  
  for (let i = 1; i < pool.length; i++) {
    if (pool[i] === prev + 1) {
      prev = pool[i];
    } else {
      result.push(start === prev ? String(start) : \`\${start}-\${prev}\`);
      start = prev = pool[i];
    }
  }
  result.push(start === prev ? String(start) : \`\${start}-\${prev}\`);
  return result.join(',');
}

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const pool = parseVlanPool(lines[0]);
    const destVlan = Number(lines[1]);
    const idx = pool.indexOf(destVlan);
    if (idx !== -1) pool.splice(idx, 1);
    console.log(formatVlanPool(pool));
    rl.close();
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

vector<int> parseVlanPool(const string& input) {
    vector<int> pool;
    stringstream ss(input);
    string group;
    while (getline(ss, group, ',')) {
        size_t pos = group.find('-');
        if (pos != string::npos) {
            int start = stoi(group.substr(0, pos));
            int end = stoi(group.substr(pos + 1));
            for (int i = start; i <= end; i++) {
                pool.push_back(i);
            }
        } else {
            pool.push_back(stoi(group));
        }
    }
    return pool;
}

string formatVlanPool(vector<int>& pool) {
    if (pool.empty()) return "";
    
    sort(pool.begin(), pool.end());
    string result;
    int start = pool[0], prev = start;
    
    for (size_t i = 1; i < pool.size(); i++) {
        if (pool[i] == prev + 1) {
            prev = pool[i];
        } else {
            if (!result.empty()) result += ",";
            result += (start == prev) ? to_string(start) : to_string(start) + "-" + to_string(prev);
            start = prev = pool[i];
        }
    }
    if (!result.empty()) result += ",";
    result += (start == prev) ? to_string(start) : to_string(start) + "-" + to_string(prev);
    return result;
}

int main() {
    string input;
    getline(cin, input);
    int destVlan;
    cin >> destVlan;
    
    vector<int> pool = parseVlanPool(input);
    pool.erase(remove(pool.begin(), pool.end(), destVlan), pool.end());
    cout << formatVlanPool(pool) << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_VLAN 4096

int pool[MAX_VLAN];
int poolSize = 0;

void parseVlanPool(char* input, int destVlan) {
    char* token = strtok(input, ",");
    while (token != NULL) {
        char* dash = strchr(token, '-');
        if (dash) {
            int start = atoi(token);
            int end = atoi(dash + 1);
            for (int i = start; i <= end; i++) {
                if (i != destVlan) pool[poolSize++] = i;
            }
        } else {
            int vlan = atoi(token);
            if (vlan != destVlan) pool[poolSize++] = vlan;
        }
        token = strtok(NULL, ",");
    }
}

int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

void formatVlanPool() {
    if (poolSize == 0) return;
    
    qsort(pool, poolSize, sizeof(int), compare);
    
    int start = pool[0], prev = start;
    int first = 1;
    
    for (int i = 1; i < poolSize; i++) {
        if (pool[i] == prev + 1) {
            prev = pool[i];
        } else {
            if (!first) printf(",");
            if (start == prev) printf("%d", start);
            else printf("%d-%d", start, prev);
            first = 0;
            start = prev = pool[i];
        }
    }
    if (!first) printf(",");
    if (start == prev) printf("%d", start);
    else printf("%d-%d", start, prev);
    printf("\\n");
}

int main() {
    char input[1000];
    int destVlan;
    
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\\n")] = 0;
    scanf("%d", &destVlan);
    
    parseVlanPool(input, destVlan);
    formatVlanPool();
    return 0;
}`},u={id:"3",title:n,examType:"A",score:100,description:t,inputDesc:o,outputDesc:e,examples:r,solution:i,codes:s};export{s as codes,u as default,t as description,l as examType,r as examples,p as id,o as inputDesc,e as outputDesc,a as score,i as solution,n as title};
