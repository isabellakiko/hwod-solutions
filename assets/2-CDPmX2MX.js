const l="2",n="TLV解码",s="A",c=100,e=`TLV编码是按[Tag Length Value]格式进行编码的，一段码流中的信元用Tag标识，Tag在码流中唯一不重复，Length表示信元Value的长度，Value表示信元的值。
码流以某信元的Tag开头，Tag固定占一个字节，Length固定占两个字节，字节序为小端序。
现给定TLV格式编码的码流，以及需要解码的信元Tag，请输出该信元的Value。
输入码流的16进制字符中，不包括小写字母，且要求输出的16进制字符串中也不要包含小写字母；码流字符串的最大长度不超过50000个字节。`,a=`输入的第一行为一个字符串，表示待解码信元的Tag；
输入的第二行为一个字符串，表示待解码的16进制码流，字节之间用空格分隔。`,t="输出一个字符串，表示待解码信元以16进制表示的Value。",i=[{input:`31
32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC`,output:"32 33",explanation:"需要解析的信元的Tag是31，从码流的起始处开始匹配：第一个信元的Tag是32，信元长度为1（01 00，小端序表示为1）；第二个信元的Tag是90，其长度为2；第三个信元的Tag是30，其长度为3；第四个信元的Tag是31，其长度为2（02 00），所以返回长度后面的两个字节即可，即32 33。"}],r=`题目要求解析一段以 **TLV**（Tag, Length, Value）格式编码的码流，找到特定的 **Tag**，并输出该Tag对应的 **Value** 部分。

**TLV格式：**
1. **Tag**: 用一个字节表示，是信元的唯一标识符
2. **Length**: 用两个字节表示，采用小端序（低位字节在前）
3. **Value**: 信元的值，长度由 Length 决定

**关键点：**
- 小端序：\`01 00\` 表示长度 1，\`02 00\` 表示长度 2
- 遍历码流，逐个解析信元，直到找到匹配的 Tag`,g={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 输入待解码信元的Tag
        String tag = sc.nextLine();
        
        // 输入16进制码流
        String line = sc.nextLine();
        
        // 将16进制码流按空格分割成字符串数组
        String[] hexArray = line.split(" ");
        
        int index = 0;
        while (index < hexArray.length) {
            // 获取当前信元的长度
            int length = Integer.parseInt(hexArray[index + 2] + hexArray[index + 1], 16);
            
            // 如果当前信元的Tag与待解码信元的Tag相同
            if (hexArray[index].equals(tag)) {
                StringBuilder sb = new StringBuilder();
                
                // 将当前信元的Value拼接到StringBuilder中
                for (int i = index + 3; i < index + 3 + length; i++) {
                    sb.append(hexArray[i]).append(" ");
                }
                
                // 输出待解码信元的Value，转换为大写并去除首尾空格
                System.out.println(sb.toString().toUpperCase().trim());
                break;
            } else {
                // 跳过当前信元
                index += (2 + length + 1);
            }
        }
    }
}`,python:`# 定义一个函数，用于将给定的16进制字符串转换为整数
# length_str 是两个16进制字符拼接后的字符串（表示长度）
def get_length(length_str):
    return int(length_str, 16)  # 将16进制字符串转换为10进制整数

# 主函数
def main():
    # 从用户输入中获取目标Tag，并去除首尾空白字符
    tag = input().strip()

    # 从用户输入中获取码流数据，并去除首尾空白字符
    line = input().strip()

    # 将码流数据按空格分割，存入hex_array数组中，每个元素是一个16进制字符串
    hex_array = line.split(" ")

    index = 0  # 初始化索引，用于遍历 hex_array

    # 使用while循环遍历整个hex_array
    while index < len(hex_array):
        # 解析当前信元的 Length 字段
        # Length 字段由两个字节组成，先拼接hex_array[index+2]（高位）和hex_array[index+1]（低位）
        # 再调用get_length函数将其转换为十进制整数
        length = get_length(hex_array[index + 2] + hex_array[index + 1])

        # 如果当前信元的Tag与输入的Tag匹配
        if hex_array[index] == tag:
            sb = []  # 定义一个空列表，用于存储匹配Tag后的Value部分

            # 从index+3位置开始（即第一个Value字节），提取length个字节的Value
            for i in range(index + 3, index + 3 + length):
                sb.append(hex_array[i])  # 将每个字节加入sb列表

            # 输出提取的Value部分，使用空格连接，并将输出转换为大写，去掉首尾多余空格
            print(" ".join(sb).upper().strip())
            break  # 找到匹配的Tag后，结束循环
        else:
            # 如果当前Tag不匹配，则跳过当前信元
            # 跳过的字节数为：1 个 Tag + 2 个 Length + length 个 Value
            index += (2 + length + 1)

# 检查是否在直接运行脚本
if __name__ == "__main__":
    main()  # 调用主函数`,javascript:`// 引入 'readline' 模块，用于读取标准输入输出
const readline = require('readline');

// 创建接口实例，用于处理输入输出
const rl = readline.createInterface({
  input: process.stdin,   // 标准输入流
  output: process.stdout  // 标准输出流
});

// 首次监听 'line' 事件，获取用户输入的目标 Tag
rl.on('line', (tag) => {

  // 第二次监听 'line' 事件，获取码流数据
  rl.on('line', (line) => {
    // 将码流按空格分割，存入 hexArray 数组
    const hexArray = line.split(" ");
    
    let index = 0;  // 定义索引，用于遍历 hexArray

    // 使用循环遍历整个 hexArray
    while (index < hexArray.length) {
      // 解析 Length 字段。Length 由两个字节组成，先拼接后转为16进制整数
      const length = parseInt(hexArray[index + 2] + hexArray[index + 1], 16);

      // 如果当前的 Tag 和用户输入的 Tag 匹配
      if (hexArray[index] === tag) {
        const sb = [];  // 定义一个数组，用于存储 Value 部分
        
        // 将 Tag 后的 length 个字节的 Value 加入 sb 数组
        for (let i = index + 3; i < index + 3 + length; i++) {
          sb.push(hexArray[i]);
        }

        // 将 sb 数组中的 Value 转换为大写字符串并输出，去掉多余空格
        console.log(sb.join(" ").toUpperCase().trim());
        break;  // 找到目标 Tag 后，结束循环
      } else {
        // 如果 Tag 不匹配，跳过当前信元
        // 跳过的字节数为：1 个 Tag + 2 个 Length + length 个 Value
        index += (2 + length + 1);
      }
    }

    // 关闭 readline 接口，结束程序
    rl.close();
  });
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int main() {
    string tag;  // 定义一个字符串变量存储要查找的Tag
    cin >> tag;  // 从输入中读取用户提供的Tag值
    
    string tmp;  // 临时字符串变量，用于存储每次输入的16进制字节
    vector<string> vec;  // 定义一个字符串向量，用于存储码流中按空格分隔的所有16进制字符串

    // 使用循环从标准输入中读取码流数据，直到遇到换行符为止
    while (cin >> tmp) {
        vec.push_back(tmp);  // 将每个16进制字节字符串存入向量
        if (cin.get() == '\\n') break;  // 如果读取到换行符，停止输入
    }

    // 开始遍历向量vec，解析码流数据
    for (int i = 0; i < vec.size();) {
        string t = vec[i];  // 读取当前信元的Tag，即vec[i]

        // 解析Length字段（两个字节，小端序）
        // vec[i+1] 是低位字节，vec[i+2] 是高位字节
        // 计算方式为：低位 + 高位 * 16
        int len = stoi(vec[i + 1]) + 16 * stoi(vec[i + 2]);

        // 如果当前信元的Tag与目标Tag一致
        if (t == tag) {
            // 输出该Tag对应的Value部分
            // 从i + 3（第一个Value字节）开始，输出len个字节的Value
            for (int j = i + 3; j < i + 3 + len; j++) {
                cout << vec[j] << " ";  // 输出Value的每个字节，用空格分隔
            }
            cout << endl;  // 输出完毕后换行
            break;  // 找到匹配的Tag后，直接退出循环
        } else {
            // 如果当前Tag不匹配，则跳过该信元
            // 跳过Tag（1字节）+ Length（2字节）+ Value（len字节）
            i = i + 2 + len + 1;  // 移动i的位置，跳到下一个信元
        }
    }

    return 0;  // 程序结束
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LEN 50000  // 定义码流的最大长度

int main() {
    char tag[3];  // 存储要查找的信元Tag，2个字符+1个结尾字符
    scanf("%s", tag);  // 输入要查找的Tag值

    char stream[MAX_LEN];  // 存储整条码流的输入
    getchar();  // 吸收掉换行符

    fgets(stream, MAX_LEN, stdin);  // 读取整条码流字符串，空格分隔

    // 定义一个数组来存储分割后的16进制字符串
    char *vec[MAX_LEN];
    int vec_size = 0;

    // 使用 strtok 函数将码流按空格分割
    char *tmp = strtok(stream, " ");
    while (tmp != NULL) {
        vec[vec_size++] = tmp;  // 将分割出的部分存入数组
        tmp = strtok(NULL, " ");
    }

    // 遍历解析码流
    for (int i = 0; i < vec_size;) {
        char *t = vec[i];  // 当前的Tag
        // 将长度部分解析为整数（小端序处理），vec[i+1]是低位，vec[i+2]是高位
        int len = atoi(vec[i + 1]) + 16 * atoi(vec[i + 2]);

        // 如果当前Tag与目标Tag相同
        if (strcmp(t, tag) == 0) {
            // 输出该信元的Value部分
            for (int j = i + 3; j < i + 3 + len; j++) {
                printf("%s ", vec[j]);
            }
            printf("\\n");
            break;  // 找到后直接跳出循环
        } else {
            // 如果Tag不匹配，跳过当前信元，i += 2 (长度字节) + len (Value长度) + 1 (Tag字节)
            i = i + 2 + len + 1;
        }
    }

    return 0;
}`},h={id:"2",title:n,examType:"A",score:100,description:e,inputDesc:a,outputDesc:t,examples:i,solution:r,codes:g};export{g as codes,h as default,e as description,s as examType,i as examples,l as id,a as inputDesc,t as outputDesc,c as score,r as solution,n as title};
