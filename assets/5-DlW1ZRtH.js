const f="5",n="不等式是否满足约束并输出最大差",l="A",o=100,t="给定一组不等式，判断是否成立并输出不等式的最大差（输出浮点数的整数部分）。\n\n**要求：**\n1. 不等式系数为 double 类型，是一个二维数组\n2. 不等式的变量为 int 类型，是一维数组\n3. 不等式的目标值为 double 类型，是一维数组\n4. 不等式约束为字符串数组，只能是：`>`, `>=`, `<`, `<=`, `=`\n\n**例如，不等式组：**\n```\na11*x1 + a12*x2 + a13*x3 + a14*x4 + a15*x5 <= b1\na21*x1 + a22*x2 + a23*x3 + a24*x4 + a25*x5 <= b2\na31*x1 + a32*x2 + a33*x3 + a34*x4 + a35*x5 <= b3\n```\n\n**最大差** = max{|左式1-b1|, |左式2-b2|, |左式3-b3|}，输出整数部分",i=`一行字符串，用分号分隔各部分：
- 第1-3部分：不等式系数（每行用逗号分隔）
- 第4部分：变量值（用逗号分隔）
- 第5部分：目标值（用逗号分隔）
- 第6部分：约束关系（用逗号分隔）`,s="`true` 或 `false` 表示所有不等式是否都满足约束，后跟空格和最大差的整数部分",r=[{input:"2.3,3,5.6,7.6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=",output:"false 458",explanation:`三个不等式：
- 2.3×1+3×3+5.6×2+7.6×7=2.3+9+11.2+53.2=75.7（缺少x5项，假设系数数组第一行只有4个元素）
实际计算：每行系数与变量做点积后减去目标值，判断是否满足约束。最大差的绝对值取整为458。`},{input:"2.36,3,6,7.1,6;1,30,8.6,2.5,21;0.3,69,5.3,6.6,7.8;1,13,2,17,5;340,67,300.6;<=,>=,<=",output:"false 758",explanation:"计算三个不等式的左式与目标值的差，判断约束是否满足。第二个不等式约束为>=，需要左式>=目标值。最大差的绝对值取整为758。"}],e="**解题思路：**\n\n1. **解析输入**：将输入按分号分割，分别解析出系数矩阵、变量数组、目标值数组和约束数组\n\n2. **计算差值**：对每个不等式，计算左式（系数与变量的点积）与目标值的差\n   - `diff[i] = sum(coefficients[i] * variables) - target[i]`\n\n3. **判断约束**：\n   - `<=`：差值应 <= 0\n   - `<`：差值应 < 0\n   - `>=`：差值应 >= 0\n   - `>`：差值应 > 0\n   - `=`：差值应 == 0\n\n4. **计算最大差**：取所有差值绝对值的最大值，输出其整数部分\n\n5. **输出结果**：所有约束都满足则输出 `true`，否则输出 `false`，后跟最大差",a={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String[] parts = line.split(";");
        
        // 解析系数矩阵（前3部分）
        double[][] matrix = new double[3][];
        for (int i = 0; i < 3; i++) {
            String[] nums = parts[i].split(",");
            matrix[i] = new double[nums.length];
            for (int j = 0; j < nums.length; j++) {
                matrix[i][j] = Double.parseDouble(nums[j]);
            }
        }
        
        // 解析变量
        String[] xStrs = parts[3].split(",");
        double[] x = new double[xStrs.length];
        for (int i = 0; i < xStrs.length; i++) {
            x[i] = Double.parseDouble(xStrs[i]);
        }
        
        // 解析目标值
        String[] bStrs = parts[4].split(",");
        double[] b = new double[bStrs.length];
        for (int i = 0; i < bStrs.length; i++) {
            b[i] = Double.parseDouble(bStrs[i]);
        }
        
        // 解析约束
        String[] constraints = parts[5].split(",");
        
        // 计算差值并判断约束
        double maxDiff = 0;
        boolean allSatisfied = true;
        
        for (int i = 0; i < 3; i++) {
            double sum = 0;
            for (int j = 0; j < matrix[i].length && j < x.length; j++) {
                sum += matrix[i][j] * x[j];
            }
            double diff = sum - b[i];
            maxDiff = Math.max(maxDiff, Math.abs(diff));
            
            if (!satisfies(diff, constraints[i])) {
                allSatisfied = false;
            }
        }
        
        System.out.println((allSatisfied ? "true" : "false") + " " + (int) maxDiff);
    }
    
    static boolean satisfies(double diff, String constraint) {
        switch (constraint) {
            case "<=": return diff <= 0;
            case "<": return diff < 0;
            case ">=": return diff >= 0;
            case ">": return diff > 0;
            case "=": return diff == 0;
            default: return false;
        }
    }
}`,python:`def satisfies(diff, constraint):
    if constraint == '<=':
        return diff <= 0
    elif constraint == '<':
        return diff < 0
    elif constraint == '>=':
        return diff >= 0
    elif constraint == '>':
        return diff > 0
    elif constraint == '=':
        return diff == 0
    return False

line = input().strip()
parts = line.split(';')

# 解析系数矩阵
matrix = []
for i in range(3):
    row = [float(x) for x in parts[i].split(',')]
    matrix.append(row)

# 解析变量、目标值、约束
x = [float(v) for v in parts[3].split(',')]
b = [float(v) for v in parts[4].split(',')]
constraints = parts[5].split(',')

# 计算差值并判断
max_diff = 0
all_satisfied = True

for i in range(3):
    total = sum(matrix[i][j] * x[j] for j in range(min(len(matrix[i]), len(x))))
    diff = total - b[i]
    max_diff = max(max_diff, abs(diff))
    
    if not satisfies(diff, constraints[i]):
        all_satisfied = False

print(f"{str(all_satisfied).lower()} {int(max_diff)}")`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function satisfies(diff, constraint) {
  switch (constraint) {
    case '<=': return diff <= 0;
    case '<': return diff < 0;
    case '>=': return diff >= 0;
    case '>': return diff > 0;
    case '=': return diff === 0;
    default: return false;
  }
}

rl.on('line', (line) => {
  const parts = line.split(';');
  
  // 解析系数矩阵
  const matrix = [];
  for (let i = 0; i < 3; i++) {
    matrix.push(parts[i].split(',').map(parseFloat));
  }
  
  // 解析变量、目标值、约束
  const x = parts[3].split(',').map(parseFloat);
  const b = parts[4].split(',').map(parseFloat);
  const constraints = parts[5].split(',');
  
  // 计算差值并判断
  let maxDiff = 0;
  let allSatisfied = true;
  
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < matrix[i].length && j < x.length; j++) {
      sum += matrix[i][j] * x[j];
    }
    const diff = sum - b[i];
    maxDiff = Math.max(maxDiff, Math.abs(diff));
    
    if (!satisfies(diff, constraints[i])) {
      allSatisfied = false;
    }
  }
  
  console.log(\`\${allSatisfied} \${Math.floor(maxDiff)}\`);
  rl.close();
});`,cpp:`#include <iostream>
#include <sstream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

bool satisfies(double diff, const string& constraint) {
    if (constraint == "<=") return diff <= 0;
    if (constraint == "<") return diff < 0;
    if (constraint == ">=") return diff >= 0;
    if (constraint == ">") return diff > 0;
    if (constraint == "=") return diff == 0;
    return false;
}

vector<double> parseDoubles(const string& s) {
    vector<double> result;
    stringstream ss(s);
    string item;
    while (getline(ss, item, ',')) {
        result.push_back(stod(item));
    }
    return result;
}

vector<string> parseStrings(const string& s) {
    vector<string> result;
    stringstream ss(s);
    string item;
    while (getline(ss, item, ',')) {
        result.push_back(item);
    }
    return result;
}

int main() {
    string line;
    getline(cin, line);
    
    vector<string> parts;
    stringstream ss(line);
    string part;
    while (getline(ss, part, ';')) {
        parts.push_back(part);
    }
    
    vector<vector<double>> matrix(3);
    for (int i = 0; i < 3; i++) {
        matrix[i] = parseDoubles(parts[i]);
    }
    
    vector<double> x = parseDoubles(parts[3]);
    vector<double> b = parseDoubles(parts[4]);
    vector<string> constraints = parseStrings(parts[5]);
    
    double maxDiff = 0;
    bool allSatisfied = true;
    
    for (int i = 0; i < 3; i++) {
        double sum = 0;
        for (size_t j = 0; j < matrix[i].size() && j < x.size(); j++) {
            sum += matrix[i][j] * x[j];
        }
        double diff = sum - b[i];
        maxDiff = max(maxDiff, fabs(diff));
        
        if (!satisfies(diff, constraints[i])) {
            allSatisfied = false;
        }
    }
    
    cout << (allSatisfied ? "true" : "false") << " " << (int)maxDiff << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int satisfies(double diff, const char* constraint) {
    if (strcmp(constraint, "<=") == 0) return diff <= 0;
    if (strcmp(constraint, "<") == 0) return diff < 0;
    if (strcmp(constraint, ">=") == 0) return diff >= 0;
    if (strcmp(constraint, ">") == 0) return diff > 0;
    if (strcmp(constraint, "=") == 0) return diff == 0;
    return 0;
}

int main() {
    char line[10000];
    fgets(line, sizeof(line), stdin);
    line[strcspn(line, "\\n")] = 0;
    
    double matrix[3][10];
    int matrixCols[3] = {0};
    double x[10], b[3];
    char constraints[3][10];
    int xLen = 0;
    
    char* parts[6];
    char* token = strtok(line, ";");
    for (int i = 0; i < 6 && token; i++) {
        parts[i] = token;
        token = strtok(NULL, ";");
    }
    
    // 解析系数矩阵
    for (int i = 0; i < 3; i++) {
        char temp[1000];
        strcpy(temp, parts[i]);
        char* num = strtok(temp, ",");
        int j = 0;
        while (num) {
            matrix[i][j++] = atof(num);
            num = strtok(NULL, ",");
        }
        matrixCols[i] = j;
    }
    
    // 解析变量
    char temp[1000];
    strcpy(temp, parts[3]);
    char* num = strtok(temp, ",");
    while (num) {
        x[xLen++] = atof(num);
        num = strtok(NULL, ",");
    }
    
    // 解析目标值
    strcpy(temp, parts[4]);
    num = strtok(temp, ",");
    for (int i = 0; num; i++) {
        b[i] = atof(num);
        num = strtok(NULL, ",");
    }
    
    // 解析约束
    strcpy(temp, parts[5]);
    num = strtok(temp, ",");
    for (int i = 0; num; i++) {
        strcpy(constraints[i], num);
        num = strtok(NULL, ",");
    }
    
    double maxDiff = 0;
    int allSatisfied = 1;
    
    for (int i = 0; i < 3; i++) {
        double sum = 0;
        int len = matrixCols[i] < xLen ? matrixCols[i] : xLen;
        for (int j = 0; j < len; j++) {
            sum += matrix[i][j] * x[j];
        }
        double diff = sum - b[i];
        if (fabs(diff) > maxDiff) maxDiff = fabs(diff);
        
        if (!satisfies(diff, constraints[i])) {
            allSatisfied = 0;
        }
    }
    
    printf("%s %d\\n", allSatisfied ? "true" : "false", (int)maxDiff);
    return 0;
}`},u={id:"5",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:s,examples:r,solution:e,codes:a};export{a as codes,u as default,t as description,l as examType,r as examples,f as id,i as inputDesc,s as outputDesc,o as score,e as solution,n as title};
