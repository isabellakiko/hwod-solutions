const i="204",n="Excel单元格数值统计",c="B",a=200,e=`Excel工作表中对选定区域的数值进行统计的功能非常实用。
仿照Excel的这个功能，请对给定表格中选中区域中的单元格进行求和统计，并输出统计结果。
为简化计算，假设当前输入中每个单元格内容仅为数字或公式两种。
如果为数字，则是一个非负整数，形如3、77
如果为公式，则固定以=开头，且仅包含下面三种情况：
等于某单元格的值，例如=B12两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2单元格和数字的双目运算（仅为+或-），形如=B1+1、100-B2
注意：
公式内容都是合法的，例如不存在，=C+1、=C1-C2+B3,=5、=3+5不存在循环引用，例如A1=B1+C1、C1=A1+B2内容中不存在空格、括号
`,t=`第一行两个整数rows cols，表示给定表格区域的行数和列数，1<=rows<=20，1<=cols<=26。 接下来rows行，每行cols个以空格分隔的字符串，表示给定表格values的单元格内容。 最后一行输入的字符串，表示给定的选中区域，形如A1:C2。
`,s=`一个整数，表示给定选中区域各单元格中数字的累加总和，范围-2,147,483,648 ~ 2,147,483,647




本题逻辑不难，但是实现起来比较麻烦。
我的解题思路如下：
首先，要搞清楚Excel表格坐标和matrix输入矩阵的索引的对应关系，比如上面用例中，输入的matrix矩阵为：[ ["1", "=A1+C1", "3"] ]
其中“1”值，对应矩阵 martix[0][0]，而对应的Excel表格坐标是A1，其中A代表列号，1代表行号。
因此，我们容易得到Excel表格坐标和matrix输入矩阵的索引的对应关系：

解下来，我们需要弄清楚，如何将Excel坐标，如A1，B2，C3中的列号和行号解析出来，因为只有解析出来，才能方便处理，之后才能对应到matrix的索引。
这里我们使用了正则表达式的捕获组，正则为：/^(A-Z)(\\d+)$/


接下来，我们就可以实现根据Excel坐标，获取到matrix矩阵元素的逻辑了，我们定义一个方法getCell，入参Excel坐标，然后通过上面的正则解析出来对应列号、行号，然后再根据Excel列号、行号转化求得matrix矩阵的行索引、列索引，进而求得matrix矩阵对应索引的值。

此时，取得的值有两类：
1、非公式的值，比如1
2、公式，以=开头

对于非公式的值，直接将其转为数值后返回；
对于公式，又分为三种情况：
我们可以通过getCell方法获取到Excel坐标对应的值，然后再来运算
`,l=[{input:`1 3
1 =A1+C1 3
A1:C1`,output:"8",explanation:"A1=1，B1=A1+C1=1+3=4，C1=3，总和1+4+3=8"},{input:`2 2
1 2
=A1 =B1-A1
A1:B2`,output:"4",explanation:"A1=1,B1=2,A2=1,B2=1，总和1+2+1+1=5，错误应该是4"}],o=`**解题思路：**

本题是一道**递归求值模拟**问题。

**核心思路：**
- 解析单元格坐标与矩阵索引映射
- 递归计算公式单元格的值

**算法步骤：**
1. 解析选中区域坐标范围
2. 遍历区域内每个单元格
3. 若是数字直接取值，若是公式递归求值
4. 累加所有单元格值

**时间复杂度**：O(M*N)`,r={java:`import java.util.Scanner;

public class Main {
  static String[][] table; // 给定表格区域
  static int rows; // 给定表格区域的行数
  static int cols; // 给定表格区域的列数
  static String start; // 选中区域的左上角位置
  static String end; // 选中区域的右下角位置

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    rows = sc.nextInt();
    cols = sc.nextInt();

    table = new String[rows][cols];
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        table[i][j] = sc.next();
      }
    }

    String[] range = sc.next().split(":");
    start = range[0];
    end = range[1];

    System.out.println(getResult());
  }

  public static int getResult() {
    int[] s = getPos(start);
    int[] e = getPos(end);

    int r1 = s[0], c1 = s[1];
    int r2 = e[0], c2 = e[1];

    int ans = 0;
    for (int i = r1; i <= r2; i++) {
      for (int j = c1; j <= c2; j++) {
        ans += getCellVal(table[i][j]);
      }
    }

    return ans;
  }

  // 获取单元格的值
  public static int getCellVal(String cell) {
    /*
     * 单元格内容cell如果以'='开头，则必然是公式
     * */
    if (cell.charAt(0) == '=') {
      // fn是公式内容
      String fn = cell.substring(1);

      // 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      if (fn.contains("+")) {
        return operate(fn.split("\\\\+"), true);
      }
      // 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      else if (fn.contains("-")) {
        return operate(fn.split("-"), false);
      }
      // 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
      else {
        return getPosVal(getPos(fn));
      }
    }
    /*
     * 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
     * */
    else {
      return Integer.parseInt(cell);
    }
  }

  // 双目运算
  public static int operate(String[] ops, boolean isAdd) {
    int op1, op2;

    if (isPos(ops[0])) {
      // 如果操作数1是单元格
      op1 = getPosVal(getPos(ops[0]));
    } else {
      // 如果操作数1是数字
      op1 = Integer.parseInt(ops[0]);
    }

    if (isPos(ops[1])) {
      // 如果操作数2是单元格
      op2 = getPosVal(getPos(ops[1]));
    } else {
      // 如果操作数2是数字
      op2 = Integer.parseInt(ops[1]);
    }

    if (isAdd) {
      // 加法运算
      return op1 + op2;
    } else {
      // 减法运算
      return op1 - op2;
    }
  }

  // 解析单元格坐标  为  矩阵坐标
  public static int[] getPos(String pos) {
    int c = pos.charAt(0) - 65;
    int r = Integer.parseInt(pos.substring(1)) - 1;
    return new int[] {r, c};
  }

  // 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
  public static int getPosVal(int[] pos) {
    int r = pos[0], c = pos[1];
    int val = getCellVal(table[r][c]);
    table[r][c] = val + "";
    return val;
  }

  // 判断一个内容是否为单元格坐标
  public static boolean isPos(String str) {
    char c = str.charAt(0);
    return c <= 'Z' && c >= 'A';
  }
}`,python:`# 输入获取
rows, cols = list(map(int, input().split()))
table = [input().split() for _ in range(rows)]
start, end = input().split(":")


# 判断一个内容是否为单元格坐标
def isPos(pos):
    return "Z" >= pos[0] >= 'A'


# 解析单元格坐标  为  矩阵坐标
def getPos(pos):
    c = ord(pos[0]) - 65
    r = int(pos[1:]) - 1
    return r, c


# 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
def getPosVal(pos):
    r, c = pos
    table[r][c] = getCellVal(table[r][c])
    return table[r][c]


# 双目运算
def operate(ops, isAdd):
    op1 = 0
    op2 = 0

    if isPos(ops[0]):
        # 如果操作数1是单元格
        op1 = getPosVal(getPos(ops[0]))
    else:
        # 如果操作数1是数字
        op1 = int(ops[0])

    if isPos(ops[1]):
        op2 = getPosVal(getPos(ops[1]))
    else:
        op2 = int(ops[1])

    if isAdd:
        return op1 + op2
    else:
        return op1 - op2


# 获取单元格的值
def getCellVal(cell):
    cell = str(cell)
    # 单元格内容cell如果以'='开头，则必然是公式
    if cell[0] == "=":
        # fn是公式内容
        fn = cell[1:]

        # 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
        if fn.find("+") != -1:
            return operate(fn.split("+"), True)
        # 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
        elif fn.find("-") != -1:
            return operate(fn.split("-"), False)
        # 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
        else:
            return getPosVal(getPos(fn))
    # 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
    else:
        return int(cell)


# 算法入口
def getResult():
    r1, c1 = getPos(start)
    r2, c2 = getPos(end)

    ans = 0
    for i in range(r1, r2 + 1):
        for j in range(c1, c2 + 1):
            ans += getCellVal(table[i][j])

    return ans


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const { get } = require("http");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

let table, rows, cols, start, end;

rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    [rows, cols] = lines[0].split(" ").map(Number);
  }

  if (rows && lines.length === rows + 2) {
    lines.shift();
    [start, end] = lines.pop().split(":");
    table = lines.map((line) => line.split(" "));
    console.log(getResult());
    lines.length = 0;
  }
});

function getResult() {
  const [r1, c1] = getPos(start);
  const [r2, c2] = getPos(end);

  let ans = 0;
  for (let i = r1; i <= r2; i++) {
    for (let j = c1; j <= c2; j++) {
      ans += getCellVal(table[i][j]);
    }
  }

  return ans;
}

// 判断一个内容是否为单元格坐标
function isPos(s) {
  return s[0] <= "Z" && s[0] >= "A";
}

// 解析单元格坐标  为  矩阵坐标
function getPos(pos) {
  const c = pos[0].charCodeAt() - 65;
  const r = pos.slice(1) - 1;
  return [r, c];
}

// 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
function getPosVal(pos) {
  const [r, c] = pos;
  table[r][c] = getCellVal(table[r][c]);
  return table[r][c];
}

// 双目运算
function operate(ops, isAdd) {
  let op1, op2;

  if (isPos(ops[0])) {
    // 如果操作数1是单元格
    op1 = getPosVal(getPos(ops[0]));
  } else {
    // 如果操作数1是数字
    op1 = parseInt(ops[0]);
  }

  if (isPos(ops[1])) {
    // 如果操作数2是单元格
    op2 = getPosVal(getPos(ops[1]));
  } else {
    // 如果操作数2是数字
    op2 = parseInt(ops[1]);
  }

  if (isAdd) {
    // 加法运算
    return op1 + op2;
  } else {
    // 减法运算
    return op1 - op2;
  }
}

// 获取单元格的值
function getCellVal(cell) {
  /*
   * 单元格内容cell如果以'='开头，则必然是公式
   * */
  if (cell[0] == "=") {
    // fn是公式内容
    const fn = cell.slice(1);

    // 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
    if (fn.indexOf("+") != -1) {
      return operate(fn.split("+"), true);
    } else if (fn.indexOf("-") != -1) {
      // 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      return operate(fn.split("-"), false);
    } else {
      // 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
      return getPosVal(getPos(fn));
    }
  } else {
    /*
     * 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
     * */
    return parseInt(cell);
  }
}`,cpp:"",c:""},p={id:"204",title:n,examType:"B",score:200,description:e,inputDesc:t,outputDesc:s,examples:l,solution:o,codes:r};export{r as codes,p as default,e as description,c as examType,l as examples,i as id,t as inputDesc,s as outputDesc,a as score,o as solution,n as title};
