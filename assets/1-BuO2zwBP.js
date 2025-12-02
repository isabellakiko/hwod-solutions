const c="1",n="IPv4地址转换成整数",l="A",u=100,i=`存在一种虚拟IPv4地址，由4小节组成，每节的范围为0~255，以#号间隔，虚拟IPv4地址可以转换为一个32位的整数，例如：
- 128#0#255#255，转换为32位整数的结果为2147549183（0x8000FFFF）
- 1#0#0#0，转换为32位整数的结果为16777216（0x01000000）

现以字符串形式给出一个虚拟IPv4地址，限制第1小节的范围为1~128，即每一节范围分别为(1~128)#(0~255)#(0~255)#(0~255)，要求每个IPv4地址只能对应到唯一的整数上。如果是非法IPv4，返回invalid IP`,t="输入一行，虚拟IPv4地址格式字符串",e="输出一行，按照要求输出整型或者特定字符",s=[{input:"100#101#1#5",output:"1684340997",explanation:""},{input:"1#2#3",output:"invalid IP",explanation:""}],o=`虚拟IPv4地址由四个小节组成，每个小节用\`#\`号分隔。每个小节代表一个整数，范围从0到255，但题目中特别指出第一小节的范围应为1到128。地址的正确形式应该是四部分，例如 \`1#2#3#4\`。如果格式不正确或数值不在指定范围内，则视为非法IPv4，输出"invalid IP"。

**解题注意事项：**

1. **异常处理**：
   - 确保输入的每一部分（小节）都是数字
   - 确保没有空的小节，例如\`1##3#4\`
   - 处理任何非数字字符，例如\`a#b#c#d\`
   - 检查是否每个部分都严格为数字，并且没有前导零（除了单独的0），例如\`01#01#01#01\`应被视为非法

2. **范围验证**：
   - 第一小节必须在1到128之间
   - 其余三小节必须在0到255之间
   - 任何超出这些范围的值都应该导致输出"invalid IP"

3. **格式正确性**：
   - 确保地址严格由四个数字小节组成，多于或少于四部分都应视为无效`,r={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String input = sc.nextLine();
    String[] ipSections = input.split("#"); // 将输入的字符串按照"#"分割成4个小节
    
    if (ipSections.length != 4) { // 如果分割后的小节数量不等于4，则说明输入的IPv4地址格式不正确
      System.out.println("invalid IP");
      return; // 结束程序
    }

    for (String section : ipSections) {
      if (!isNumeric(section)) { // 检查是否每部分都是数字
        System.out.println("invalid IP");
        return; // 结束程序
      }
      if (section.length() == 0) { // 检查是否有空字符
        System.out.println("invalid IP");
        return; // 结束程序
      }
      // 检查前导零的情况
      if (section.length() > 1 && section.charAt(0) == '0') {
        System.out.println("invalid IP");
        return; // 结束程序
      }
    }
    
    int firstSection = Integer.parseInt(ipSections[0]); // 将第一个小节转换为整数
    if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内
      System.out.println("invalid IP");
      return; // 结束程序
    }
    
    for (int i = 1; i < 4; i++) { // 遍历后面的3个小节
      int sectionValue = Integer.parseInt(ipSections[i]); // 将当前小节转换为整数
      if (sectionValue < 0 || sectionValue > 255) { // 如果当前小节的值不在0~255的范围内
        System.out.println("invalid IP");
        return; // 结束程序
      }
    }
    
    long ipValue = 0; // 用于计算32位整数值
    for (int i = 0; i < 4; i++) {
      ipValue = ipValue * 256 + Integer.parseInt(ipSections[i]); // 每个小节对应一个字节
    }
    
    System.out.println(ipValue); // 输出最终计算得到的32位整数
  }

  // 判断字符串是否为数字
  public static boolean isNumeric(String str) {
    for (int i = 0; i < str.length(); i++) {
      if (!Character.isDigit(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }
}`,python:`def is_numeric(s):
    return s.isdigit()

input_str = input()
ip_sections = input_str.split("#")

if len(ip_sections) != 4:
    print("invalid IP")
else:
    valid = True
    for section in ip_sections:
        if len(section) == 0 or not is_numeric(section):
            valid = False
            break
        if len(section) > 1 and section[0] == '0':
            valid = False
            break
    
    if not valid:
        print("invalid IP")
    else:
        first_section = int(ip_sections[0])
        if first_section < 1 or first_section > 128:
            print("invalid IP")
        else:
            for i in range(1, 4):
                section_value = int(ip_sections[i])
                if section_value < 0 or section_value > 255:
                    print("invalid IP")
                    break
            else:
                ip_value = 0
                for i in range(4):
                    ip_value = ip_value * 256 + int(ip_sections[i])
                print(ip_value)`,javascript:`const readline = require('readline');

function isNumeric(str) {
  for (let i = 0; i < str.length; i++) {
    if (!/\\d/.test(str[i])) {
      return false;
    }
  }
  return true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (input) {
  const ipSections = input.split('#');

  if (ipSections.length !== 4) {
    console.log("invalid IP");
    rl.close();
    return;
  }

  for (const section of ipSections) {
    if (section.length === 0 || !isNumeric(section)) {
      console.log("invalid IP");
      rl.close();
      return;
    }
    if (section.length > 1 && section[0] === '0') {
      console.log("invalid IP");
      rl.close();
      return;
    }
  }

  const firstSection = parseInt(ipSections[0], 10);
  if (firstSection < 1 || firstSection > 128) {
    console.log("invalid IP");
    rl.close();
    return;
  }

  for (let i = 1; i < 4; i++) {
    const sectionValue = parseInt(ipSections[i], 10);
    if (sectionValue < 0 || sectionValue > 255) {
      console.log("invalid IP");
      rl.close();
      return;
    }
  }

  let ipValue = 0;
  for (let i = 0; i < 4; i++) {
    ipValue = ipValue * 256 + parseInt(ipSections[i], 10);
  }

  console.log(ipValue);
  rl.close();
});`,cpp:`#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

bool isNumeric(const string& str) {
    for (char c : str) {
        if (!isdigit(c)) {
            return false;
        }
    }
    return true;
}

int main() {
    string input;
    getline(cin, input);

    stringstream ss(input);
    vector<string> ipSections;
    string section;
    while (getline(ss, section, '#')) {
        ipSections.push_back(section);
    }

    if (ipSections.size() != 4) {
        cout << "invalid IP" << endl;
        return 0;
    }

    for (const string& section : ipSections) {
        if (section.empty() || !isNumeric(section)) {
            cout << "invalid IP" << endl;
            return 0;
        }
        if (section.length() > 1 && section[0] == '0') {
            cout << "invalid IP" << endl;
            return 0;
        }
    }

    int firstSection = stoi(ipSections[0]);
    if (firstSection < 1 || firstSection > 128) {
        cout << "invalid IP" << endl;
        return 0;
    }

    for (int i = 1; i < 4; i++) {
        int sectionValue = stoi(ipSections[i]);
        if (sectionValue < 0 || sectionValue > 255) {
            cout << "invalid IP" << endl;
            return 0;
        }
    }

    long ipValue = 0;
    for (int i = 0; i < 4; i++) {
        ipValue = ipValue * 256 + stoi(ipSections[i]);
    }

    cout << ipValue << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int is_numeric(const char* str) {
    for (int i = 0; str[i] != '\\0'; i++) {
        if (!isdigit(str[i])) {
            return 0;
        }
    }
    return 1;
}

int main() {
    char input[256];
    fgets(input, sizeof(input), stdin);

    char* ipSections[4];
    char* token = strtok(input, "#");
    int sectionCount = 0;

    while (token != NULL && sectionCount < 4) {
        ipSections[sectionCount++] = token;
        token = strtok(NULL, "#");
    }

    if (sectionCount != 4) {
        printf("invalid IP\\n");
        return 0;
    }

    for (int i = 0; i < 4; i++) {
        char* section = ipSections[i];
        section[strcspn(section, "\\n")] = '\\0';

        if (strlen(section) == 0 || !is_numeric(section)) {
            printf("invalid IP\\n");
            return 0;
        }
        if (strlen(section) > 1 && section[0] == '0') {
            printf("invalid IP\\n");
            return 0;
        }
    }

    int firstSection = atoi(ipSections[0]);
    if (firstSection < 1 || firstSection > 128) {
        printf("invalid IP\\n");
        return 0;
    }

    for (int i = 1; i < 4; i++) {
        int sectionValue = atoi(ipSections[i]);
        if (sectionValue < 0 || sectionValue > 255) {
            printf("invalid IP\\n");
            return 0;
        }
    }

    long ipValue = 0;
    for (int i = 0; i < 4; i++) {
        ipValue = ipValue * 256 + atoi(ipSections[i]);
    }

    printf("%ld\\n", ipValue);
    return 0;
}`},a={id:"1",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:s,solution:o,codes:r};export{r as codes,a as default,i as description,l as examType,s as examples,c as id,t as inputDesc,e as outputDesc,u as score,o as solution,n as title};
