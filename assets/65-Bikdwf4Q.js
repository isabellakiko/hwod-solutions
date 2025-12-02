const f="65",a="判断一组不等式是否满足约束并输出最大差",o="A",l=100,n=`给定一组不等式，判断是否成立并输出不等式的最大差(输出浮点数的整数部分)
要求:
不等式系数为 double类型，是一个二维数组不等式的变量为 int类型，是一维数组;不等式的目标值为 double类型，是一维数组不等式约束为字符串数组，只能是:“>”,“>=”,“<”,“<=”,“=”，
例如，不等式组:
a11x1+a12x2+a13x3+a14x4+a15x5<=b1;
a21x1+a22x2+a23x3+a24x4+a25x5<=b2;
a31x1+a32x2+a33x3+a34x4+a35x5<=b3;
最大差 = max{(a11x1+a12x2+a13x3+a14x4+a15x5-b1),(a21x1+a22x2+a23x3+a24x4+ a25x5-b2),(a31x1+a32x2+a33x3+a34x4+a35x5-b3)},
类型为整数(输出浮点数的整数部分)
`,r=`a11,a12,a13,a14,a15,a21,a22,a23,a24,a25, a31,a32,a33,a34,a35,x1,x2,x3,x4,x5,b1,b2,b3,<=,<=,<=
1)不等式组系数(double类型):
a11,a12,a13,a14,a15
a21,a22,a23,a24,a25
a31,a32,a33,a34,a35
2)不等式变量(int类型):x1,x2,x3,x4,x5
3)不等式目标值(double类型):b1,b2,b3
4)不等式约束(字符串类型):<=,<=,<=
`,t="true或者false，最大差（取浮点数的整数部分，不是向下取整）",e=[{input:"2.3,3,5.6,7,6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,2,3,4,5;340,670,80.6;<=,<=,<=",output:"false 458",explanation:"计算三个不等式左边-右边的差值，判断是否满足<=约束，输出最大差的整数部分。"},{input:"1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;5,5,5;<=,<=,<=",output:"true 0",explanation:"三个差值都是1+1+1+1+1-5=0，满足<=0，输出true和最大差0。"},{input:"1,0,0,0,0;0,1,0,0,0;0,0,1,0,0;10,20,30,0,0;5,15,25;>,>,>",output:"true 5",explanation:"差值分别为5,5,5，都>0成立，最大差为5。"}],i=`**解题思路：**

本题是一道**模拟计算**问题。

**算法步骤：**
1. 解析输入，提取系数矩阵、变量、目标值、约束条件
2. 计算每个不等式的差值：左边表达式-目标值
3. 根据约束条件判断每个差值是否满足
4. 输出所有约束是否满足，以及最大差值的整数部分

**注意事项：**
- 最大差取整数部分，不是向下取整
- 需要正确处理各种比较运算符

**时间复杂度**：O(N×M)，N为不等式数，M为变量数`,s={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String[][] arr =
        Arrays.stream(sc.nextLine().split(";")).map(s -> s.split(",")).toArray(String[][]::new);

    double[] a1 = Arrays.stream(arr[0]).mapToDouble(Double::parseDouble).toArray();
    double[] a2 = Arrays.stream(arr[1]).mapToDouble(Double::parseDouble).toArray();
    double[] a3 = Arrays.stream(arr[2]).mapToDouble(Double::parseDouble).toArray();
    double[] x = Arrays.stream(arr[3]).mapToDouble(Double::parseDouble).toArray();
    double[] b = Arrays.stream(arr[4]).mapToDouble(Double::parseDouble).toArray();

    String[] y = arr[5];

    double diff1 = a1[0] * x[0] + a1[1] * x[1] + a1[2] * x[2] + a1[3] * x[3] + a1[4] * x[4] - b[0];
    double diff2 = a2[0] * x[0] + a2[1] * x[1] + a2[2] * x[2] + a2[3] * x[3] + a2[4] * x[4] - b[1];
    double diff3 = a3[0] * x[0] + a3[1] * x[1] + a3[2] * x[2] + a3[3] * x[3] + a3[4] * x[4] - b[2];

    boolean flag =
        compareWithZero(diff1, y[0])
            && compareWithZero(diff2, y[1])
            && compareWithZero(diff3, y[2]);

    double maxDiff = Math.max(Math.max(diff1, diff2), diff3);

    System.out.println(flag + " " + (int) maxDiff);
  }

  public static boolean compareWithZero(double val, String constraint) {
    boolean flag = false;

    switch (constraint) {
      case ">":
        flag = val > 0;
        break;
      case ">=":
        flag = val >= 0;
        break;
      case "<":
        flag = val < 0;
        break;
      case "<=":
        flag = val <= 0;
        break;
      case "=":
        flag = val == 0;
        break;
    }

    return flag;
  }
}`,python:`# 输入获取
arr = list(map(lambda s: s.split(","), input().split(";")))


def compareWithZero(val, constraint):
    if constraint == ">":
        return val > 0
    elif constraint == ">=":
        return val >= 0
    elif constraint == "<":
        return val < 0
    elif constraint == "<=":
        return val <= 0
    elif constraint == "=":
        return val == 0
    else:
        return False


# 算法入口
def getResult(arr):
    a11, a12, a13, a14, a15 = map(float, arr[0])
    a21, a22, a23, a24, a25 = map(float, arr[1])
    a31, a32, a33, a34, a35 = map(float, arr[2])
    x1, x2, x3, x4, x5 = map(float, arr[3])
    b1, b2, b3 = map(float, arr[4])
    y1, y2, y3 = arr[5]

    diff1 = a11 * x1 + a12 * x2 + a13 * x3 + a14 * x4 + a15 * x5 - b1
    diff2 = a21 * x1 + a22 * x2 + a23 * x3 + a24 * x4 + a25 * x5 - b2
    diff3 = a31 * x1 + a32 * x2 + a33 * x3 + a34 * x4 + a35 * x5 - b3

    flag = compareWithZero(diff1, y1) and compareWithZero(diff2, y2) and compareWithZero(diff3, y3)

    maxDiff = max(diff1, diff2, diff3)

    print(f"{flag} {int(maxDiff)}".lower())


# 算法调用
getResult(arr)`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const arr = line.split(";").map((str) => str.split(","));

  const [a11, a12, a13, a14, a15] = arr[0].map(Number);
  const [a21, a22, a23, a24, a25] = arr[1].map(Number);
  const [a31, a32, a33, a34, a35] = arr[2].map(Number);
  const [x1, x2, x3, x4, x5] = arr[3].map(Number);
  const [b1, b2, b3] = arr[4].map(Number);
  const [y1, y2, y3] = arr[5];

  let diff1 = a11 * x1 + a12 * x2 + a13 * x3 + a14 * x4 + a15 * x5 - b1;
  let diff2 = a21 * x1 + a22 * x2 + a23 * x3 + a24 * x4 + a25 * x5 - b2;
  let diff3 = a31 * x1 + a32 * x2 + a33 * x3 + a34 * x4 + a35 * x5 - b3;

  const flag =
    compareWithZero(diff1, y1) &&
    compareWithZero(diff2, y2) &&
    compareWithZero(diff3, y3);

  const maxDiff = Math.max(diff1, diff2, diff3);

  console.log(\`\${flag} \${parseInt(maxDiff)}\`);
});

function compareWithZero(val, constraint) {
  let flag;
  switch (constraint) {
    case ">":
      flag = val > 0;
      break;
    case ">=":
      flag = val >= 0;
      break;
    case "<":
      flag = val < 0;
      break;
    case "<=":
      flag = val <= 0;
      break;
    case "=":
      flag = val === 0;
      break;
  }
  return flag;
}`,cpp:`#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

bool compareWithZero(double val, const string& constraint) {
    if (constraint == ">") return val > 0;
    if (constraint == ">=") return val >= 0;
    if (constraint == "<") return val < 0;
    if (constraint == "<=") return val <= 0;
    if (constraint == "=") return val == 0;
    return false;
}

vector<string> split(const string& s, char delim) {
    vector<string> result;
    stringstream ss(s);
    string item;
    while (getline(ss, item, delim)) {
        result.push_back(item);
    }
    return result;
}

int main() {
    string line;
    getline(cin, line);
    
    vector<string> parts = split(line, ';');
    vector<double> a1, a2, a3, x, b;
    vector<string> y;
    
    for (auto& s : split(parts[0], ',')) a1.push_back(stod(s));
    for (auto& s : split(parts[1], ',')) a2.push_back(stod(s));
    for (auto& s : split(parts[2], ',')) a3.push_back(stod(s));
    for (auto& s : split(parts[3], ',')) x.push_back(stod(s));
    for (auto& s : split(parts[4], ',')) b.push_back(stod(s));
    y = split(parts[5], ',');
    
    double diff1 = a1[0]*x[0] + a1[1]*x[1] + a1[2]*x[2] + a1[3]*x[3] + a1[4]*x[4] - b[0];
    double diff2 = a2[0]*x[0] + a2[1]*x[1] + a2[2]*x[2] + a2[3]*x[3] + a2[4]*x[4] - b[1];
    double diff3 = a3[0]*x[0] + a3[1]*x[1] + a3[2]*x[2] + a3[3]*x[3] + a3[4]*x[4] - b[2];
    
    bool flag = compareWithZero(diff1, y[0]) && compareWithZero(diff2, y[1]) && compareWithZero(diff3, y[2]);
    double maxDiff = max({diff1, diff2, diff3});
    
    cout << (flag ? "true" : "false") << " " << (int)maxDiff << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int compareWithZero(double val, const char* constraint) {
    if (strcmp(constraint, ">") == 0) return val > 0;
    if (strcmp(constraint, ">=") == 0) return val >= 0;
    if (strcmp(constraint, "<") == 0) return val < 0;
    if (strcmp(constraint, "<=") == 0) return val <= 0;
    if (strcmp(constraint, "=") == 0) return val == 0;
    return 0;
}

int main() {
    char line[1024];
    fgets(line, sizeof(line), stdin);
    
    double a1[5], a2[5], a3[5], x[5], b[3];
    char y[3][10];
    
    char* parts[6];
    int idx = 0;
    char* token = strtok(line, ";");
    while (token && idx < 6) {
        parts[idx++] = token;
        token = strtok(NULL, ";");
    }
    
    sscanf(parts[0], "%lf,%lf,%lf,%lf,%lf", &a1[0], &a1[1], &a1[2], &a1[3], &a1[4]);
    sscanf(parts[1], "%lf,%lf,%lf,%lf,%lf", &a2[0], &a2[1], &a2[2], &a2[3], &a2[4]);
    sscanf(parts[2], "%lf,%lf,%lf,%lf,%lf", &a3[0], &a3[1], &a3[2], &a3[3], &a3[4]);
    sscanf(parts[3], "%lf,%lf,%lf,%lf,%lf", &x[0], &x[1], &x[2], &x[3], &x[4]);
    sscanf(parts[4], "%lf,%lf,%lf", &b[0], &b[1], &b[2]);
    sscanf(parts[5], "%[^,],%[^,],%s", y[0], y[1], y[2]);
    
    double diff1 = a1[0]*x[0] + a1[1]*x[1] + a1[2]*x[2] + a1[3]*x[3] + a1[4]*x[4] - b[0];
    double diff2 = a2[0]*x[0] + a2[1]*x[1] + a2[2]*x[2] + a2[3]*x[3] + a2[4]*x[4] - b[1];
    double diff3 = a3[0]*x[0] + a3[1]*x[1] + a3[2]*x[2] + a3[3]*x[3] + a3[4]*x[4] - b[2];
    
    int flag = compareWithZero(diff1, y[0]) && compareWithZero(diff2, y[1]) && compareWithZero(diff3, y[2]);
    double maxDiff = diff1;
    if (diff2 > maxDiff) maxDiff = diff2;
    if (diff3 > maxDiff) maxDiff = diff3;
    
    printf("%s %d\\n", flag ? "true" : "false", (int)maxDiff);
    return 0;
}`},x={id:"65",title:a,examType:"A",score:100,description:n,inputDesc:r,outputDesc:t,examples:e,solution:i,codes:s};export{s as codes,x as default,n as description,o as examType,e as examples,f as id,r as inputDesc,t as outputDesc,l as score,i as solution,a as title};
