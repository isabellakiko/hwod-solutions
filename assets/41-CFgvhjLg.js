const o="41",n="热点网站统计",l="A",a=100,e="企业路由器的统计页面，有一个功能需要动态统计公司访问最多的网页URL top N。请设计一个算法，可以高效动态统计Top N的页面。",i=`每一行都是一个URL或一个数字，如果是URL，代表一段时间内的网页访问； 如果是一个数字N，代表本次需要输出的Top N个URL。
输入约束：
1、总访问网页数量小于5000个，单网页访问次数小于65535次； 2、网页URL仅由字母，数字和点分隔符组成，且长度小于等于127字节； 3、数字是正整数，小于等于10且小于当前总访问网页数；`,t=`行输入要对应一行输出，输出按访问次数排序的前N个URL，用逗号分隔。
输出要求：
1、每次输出要统计之前所有输入，不仅是本次输入； 2、如果有访问次数相等的URL，按URL的字符串字典序升序排列，输出排序靠前的URL；`,s=[{input:`news.qq.com
news.sina.com.cn
news.qq.com
news.qq.com
game.163.com
game.163.com
3
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
3`,output:`news.qq.com,game.163.com,news.sina.com.cn
www.huawei.com,www.cctv.com,news.qq.com`,explanation:`第一次查询Top3时：news.qq.com(3次)、game.163.com(2次)、news.sina.com.cn(1次)。
第二次查询Top3时：www.huawei.com(7次)、www.cctv.com(5次)、news.qq.com(3次)。`},{input:`news.qq.com
1
www.cctv.com
www.huawei.com
www.huawei.com
2
3`,output:`news.qq.com
www.huawei.com,news.qq.com
www.huawei.com,news.qq.com,www.cctv.com`,explanation:`第一次查询Top1：news.qq.com(1次)。
第二次查询Top2：www.huawei.com(2次)、news.qq.com(1次)。
第三次查询Top3：www.huawei.com(2次)、news.qq.com(1次)、www.cctv.com(1次)，后两者次数相同按字典序。`}],r=`**解题思路：**

本题是一道**哈希表+排序**问题。

**核心思想：**
- 用哈希表统计每个URL的访问次数
- 遇到数字N时，对所有URL排序后输出Top N

**算法步骤：**

1. 逐行读取输入
2. 如果是URL，更新哈希表中该URL的计数
3. 如果是数字N：
   - 将哈希表转为列表
   - 按访问次数降序排序，次数相同按字典序升序
   - 输出前N个URL
4. 注意：统计是累积的，包含之前所有输入

**时间复杂度**：每次查询O(m log m)，m为不同URL数量`,c={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> lines = new ArrayList<>(); // 创建一个字符串列表，用于存储输入的每一行数据
        Map<String, Integer> cache = new HashMap<>(); // 创建一个哈希表，用于存储每个 URL 出现的次数
        while (scanner.hasNext()) { // 不断读取输入，直到没有下一行
            String line = scanner.nextLine(); // 读取一行数据
            lines.add(line); // 将该行数据添加到字符串列表中
            if (line.matches("^\\\\d+$")) { // 如果该行数据只包含数字，说明已经读取完了一个测试用例
                System.out.println(sortURL(lines, cache)); // 调用 sortURL 方法进行处理，并输出结果
                lines.clear(); // 清空字符串列表，为下一个测试用例做准备
            }
        }
    }

    public static String sortURL(List<String> lines, Map<String, Integer> cache) {
        int n = Integer.parseInt(lines.remove(lines.size() - 1)); // 从字符串列表中取出最后一个元素，即需要输出的 URL 数量
        for (String url : lines) { // 遍历字符串列表中的每一个 URL
            cache.put(url, cache.getOrDefault(url, 0) + 1); // 将该 URL 在哈希表中的计数加一
        }
        List<Map.Entry<String, Integer>> list = new ArrayList<>(cache.entrySet()); // 将哈希表中的每一项转换成一个键值对，并存入一个列表中
        list.sort((a, b) -> { // 对列表进行排序，按照计数从大到小排序，如果计数相同则按照字典序从小到大排序
            int res = b.getValue() - a.getValue();
            return res == 0 ? a.getKey().compareTo(b.getKey()) : res;
        });
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n && i < list.size(); i++) { // 取出前 n 个 URL，并将它们拼接成一个字符串
            sb.append(list.get(i).getKey()).append(",");
        }
        if (sb.length() > 0) { // 如果字符串不为空，则删除最后一个逗号
            sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString(); // 返回拼接好的字符串
    }
}`,python:`import sys
def sortURL(lines, cache):
    n = int(lines.pop())
 
    for url in lines:
        cache[url] = cache.get(url, 0) + 1
 
    arr = []
    for key in cache:
        arr.append({
            "count": cache[key],
            "url": key
        })
 
    return ",".join([ele["url"] for ele in sorted(arr, key=lambda x: (-x["count"], x["url"]))[:n]]) 
lines = []
cache = {}
for line in sys.stdin:
    lines.append(line.strip())
 
    if line.strip().isdigit():
        print(sortURL(lines, cache))
        lines = []`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
const cache = {};

rl.on('line', (line) => {
  lines.push(line);

  if (/^\\d+$/.test(line)) {
    console.log(sortURL(lines, cache));
    lines.length = 0;
  }
});

function sortURL(lines, cache) {
  const n = parseInt(lines.pop());
  for (const url of lines) {
    cache[url] = (cache[url] || 0) + 1;
  }
  const list = Object.entries(cache);
  list.sort((a, b) => {
    const res = b[1] - a[1];
    return res === 0 ? a[0].localeCompare(b[0]) : res;
  });
  let sb = '';
  for (let i = 0; i < n && i < list.length; i++) {
    sb += list[i][0] + ',';
  }
  if (sb.length > 0) {
    sb = sb.slice(0, -1);
  }
  return sb;
}`,cpp:`#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <regex>

using namespace std;

string sortURL(vector<string>& lines, map<string, int>& cache);

int main() {
    vector<string> lines; // 创建一个字符串列表，用于存储输入的每一行数据
    map<string, int> cache; // 创建一个哈希表，用于存储每个 URL 出现的次数
    string line;
    while (getline(cin, line)) { // 不断读取输入，直到没有下一行
        lines.push_back(line); // 将该行数据添加到字符串列表中
        if (regex_match(line, regex("^\\\\d+$"))) { // 如果该行数据只包含数字，说明已经读取完了一个测试用例
            cout << sortURL(lines, cache) << endl; // 调用 sortURL 方法进行处理，并输出结果
            lines.clear(); // 清空字符串列表，为下一个测试用例做准备
        }
    }
    return 0;
}

string sortURL(vector<string>& lines, map<string, int>& cache) {
    int n = stoi(lines.back()); // 从字符串列表中取出最后一个元素，即需要输出的 URL 数量
    lines.pop_back(); // 删除最后一个元素
    for (string url : lines) { // 遍历字符串列表中的每一个 URL
        cache[url]++; // 将该 URL 在哈希表中的计数加一
    }
    vector<pair<string, int>> list(cache.begin(), cache.end()); // 将哈希表中的每一项转换成一个键值对，并存入一个列表中
    sort(list.begin(), list.end(), [](const pair<string, int>& a, const pair<string, int>& b) { // 对列表进行排序，按照计数从大到小排序，如果计数相同则按照字典序从小到大排序
        if (a.second != b.second) {
            return a.second > b.second;
        } else {
            return a.first < b.first;
        }
    });
    string res;
    for (int i = 0; i < n && i < list.size(); i++) { // 取出前 n 个 URL，并将它们拼接成一个字符串
        res += list[i].first + ",";
    }
    if (!res.empty()) { // 如果字符串不为空，则删除最后一个逗号
        res.pop_back();
    }
    return res; // 返回拼接好的字符串
}`,c:`#include <stdio.h>   // 包含标准输入输出库，用于使用 printf 和 fgets
#include <stdlib.h>  // 包含标准库，用于使用 atoi 和 qsort
#include <string.h>  // 包含字符串处理库，用于使用 strcmp 和 strcpy
#include <ctype.h>   // 包含字符处理库，用于使用 isdigit

// 定义常量，最大 URL 长度为 128，最大 URL 记录数量为 5000
#define MAX_URL_LENGTH 128
#define MAX_URL_COUNT 5000

// 定义结构体，用于存储 URL 和该 URL 的访问计数
typedef struct {
    char url[MAX_URL_LENGTH]; // URL 字符串，最大长度为 128
    int count; // 该 URL 被访问的次数
} UrlCount;

// 自定义比较函数，用于 qsort 函数排序
// 按照 URL 访问次数从大到小排序，如果访问次数相同则按照字典序从小到大排序
int urlCompare(const void *a, const void *b) {
    UrlCount *url1 = (UrlCount *)a; // 将 void 指针转换为 UrlCount 指针
    UrlCount *url2 = (UrlCount *)b;
    
    // 如果两个 URL 的访问次数不相等，按照访问次数从大到小排序
    if (url1->count != url2->count) {
        return url2->count - url1->count; // 返回负值表示 url2 应该排在 url1 前面
    }
    
    // 如果访问次数相等，按照字典序排序
    return strcmp(url1->url, url2->url); // strcmp 返回值：负值表示 url1 小于 url2
}

// 排序并输出访问次数最多的 n 个 URL
void sortURLs(UrlCount urls[], int size, int n) {
    // 使用 qsort 对 URL 数组进行排序
    qsort(urls, size, sizeof(UrlCount), urlCompare);
    
    // 输出前 n 个 URL，按照排序后的顺序
    for (int i = 0; i < n && i < size; i++) {
        printf("%s", urls[i].url); // 输出当前 URL
        // 如果还未输出到第 n 个 URL 或最后一个 URL，继续打印逗号分隔
        if (i < n - 1 && i < size - 1) {
            printf(",");
        }
    }
    printf("\\n"); // 输出完毕后换行
}

int main() {
    UrlCount cache[MAX_URL_COUNT] = {0}; // 创建一个 URL 数组用于缓存，初始值为 0
    int urlCount = 0; // 当前缓存的 URL 数量，初始为 0
    char line[128]; // 用于存储每一行输入的字符串

 
    while (fgets(line, sizeof(line), stdin)) {
        line[strcspn(line, "\\n")] = 0; // 去掉字符串末尾的换行符
        
        // 判断输入行是否为数字（用于请求输出前 n 个 URL）
        if (isdigit(line[0])) { // 如果首字符是数字，则认为该行是请求输出的数字
            int n = atoi(line); // 将字符串转换为整数，表示请求输出的 URL 数量
            sortURLs(cache, urlCount, n); // 调用排序并输出函数，输出前 n 个 URL
        } else { // 否则认为该行是 URL
            int found = 0; // 标志变量，记录当前 URL 是否已经存在
            // 遍历当前已记录的 URL，检查是否已存在
            for (int i = 0; i < urlCount; i++) {
                if (strcmp(cache[i].url, line) == 0) { // 如果找到相同的 URL
                    cache[i].count++; // 计数器加 1
                    found = 1; // 标记为已找到
                    break; // 跳出循环
                }
            }
            // 如果未找到该 URL，说明是新 URL
            if (!found) {
                strcpy(cache[urlCount].url, line); // 将新的 URL 到缓存中
                cache[urlCount].count = 1; // 初始化该 URL 的访问计数为 1
                urlCount++; // 增加 URL 数量
            }
        }
    }
    return 0; // 程序结束
}`},u={id:"41",title:n,examType:"A",score:100,description:e,inputDesc:i,outputDesc:t,examples:s,solution:r,codes:c};export{c as codes,u as default,e as description,l as examType,s as examples,o as id,i as inputDesc,t as outputDesc,a as score,r as solution,n as title};
