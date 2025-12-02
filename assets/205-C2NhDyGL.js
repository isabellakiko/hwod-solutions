const a="205",n="二维伞的雨滴效应",d="B",s=200,t=`普通的伞在二维平面世界中，左右两侧均有一条边，而两侧伞边最下面各有一个伞坠子，雨滴落到伞面，逐步流到伞坠处，会将伞坠的信息携带并落到地面，随着日积月累，地面会呈现伞坠的信息。
1、为了模拟伞状雨滴效应，用二叉树来模拟二维平面伞（如下图所示），现在输入一串正整数数组序列（不含0，数组成员至少是1个），若此数组序列是二叉搜索树的前序遍历的结果，那么请输出一个返回值1，否则输出0。
2、同时请将此序列构成的伞状效应携带到地面的数字信息输出来(左边伞坠信息，右边伞坠信息，详细参考示例图地面上数字)，若此树不存在左或右扇坠，则对应位置返回0。同时若非二叉排序树那么左右伞坠信息也返回0。


`,r=`一个通过空格分割的整数序列字符串，数组不含0，数组成员至少1个，输入的数组的任意两个数字都互不相同，最多1000个正整数，正整数值范围1~65535
`,e=`输出如下三个值，以空格分隔：是否二叉排序树，左侧地面呈现的伞坠数字值，右侧地面呈现的伞坠数字值。
若是二叉排序树，则输出1，否则输出0（其左右伞坠值也直接赋值0）。
若不存存在左侧或者右侧伞坠值，那么对应伞坠值直接赋值0。


本题解题前需要先了解几个概念：

什么是二叉搜索树？
二叉搜索树，也叫二叉排序树，它具有如下特点：

什么是前序遍历？
二叉树的遍历方式有：前序遍历、中序遍历、后序遍历，这里的”前、中、后“指的是二叉树根节点的遍历顺序，
下面举个例子帮助理解，

上图二叉树的

上图二叉树的

知道上面概念后，我们再来看本题：
给定一个二叉树的前序遍历的结果序列，判断该二叉树是否为二叉搜索树？
我们知道前序遍历是：根左右，因此给定序列的第一个元素必然是根节点值。
假设根节点对应的序列索引范围是[start, end]，那么根节点索引位置就是start。

而二叉搜索树的特点是：
因此，我们从start+1位置开始判断，如果satrt+1位置的元素值 < 根节点的元素值（start位置），那么start+1位置的元素就是根节点的左子树节点，按此逻辑，依次往后判断。
假设在 i 位置，发现 i 位置的元素 ≮ 根节点的元素值（start位置），则当前根节点的左子树索引范围是[satrt + 1, i - 1]
之后，我们从 i 位置开始判断，如果 i 位置的元素值 ＞ 根节点的元素值（start位置），那么 i 位置的元素就是 根节点的右子树节点，按此逻辑，依次完后判断。
如果当前序列满足二叉搜索树前序遍历，那么最终，当前根节点的右子树索引范围必须是[i, end]，
如果右子树索引范围的结束位置达不到end，则不合法。

按照上面逻辑，我们可以得到根节点、根的左子树、根的右子树。
之后，我们可以继续按上面逻辑递归的判断：根的左子树[satrt + 1, i - 1]、根的右子树[i, end]，他们对应索引范围的子序列，是否满足二叉搜索树前序遍历的特点（根节点的值 大于 其左子树的所有节点的值、根节点的值 小于 其右子树的所有节点的值）

以上逻辑，是判断一个序列是否为二叉搜索树的前序遍历结果。但是本题还需要我们求解出：左边伞坠信息，右边伞坠信息
这里思维上最简单的做法是，根据前面判断二叉搜索树前序遍历序列的逻辑，生成一颗二叉搜索树，还原出二叉搜索树后

求解左边伞缀的逻辑：

求解右边伞缀的逻辑和上面差不多，大家可以自行推导。
`,i=[{input:"8 6 5 7 10 8 11 9",output:"1 5 11",explanation:"是二叉搜索树，左伞坠5，右伞坠11"},{input:"5 4 3",output:"0 0 0",explanation:"不是二叉搜索树(前序遍历应左<根<右)，返回0 0 0"}],o=`**解题思路：**

本题是一道**二叉搜索树验证**问题。

**核心思路：**
- 验证序列是否为BST前序遍历
- 若是，构建BST并找左右伞坠

**算法步骤：**
1. 递归验证前序遍历合法性
2. 同时根据前序遍历构建BST
3. 递归找最左下节点(左伞坠)
4. 递归找最右下节点(右伞坠)

**时间复杂度**：O(N)`,l={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  // 二叉树的节点类定义
  static class Node {
    int val; // 节点值
    Node left_child; // 当前节点的左子节点
    Node right_child; // 当前节点的右子节点

    public Node(int val) {
      this.val = val;
    }
  }

  // 二叉搜索树前序遍历的结果序列
  static int[] preOrder;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    preOrder = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    System.out.println(getResult());
  }

  public static String getResult() {
    // 二叉搜索树的根节点root
    Node root = new Node(preOrder[0]);

    if (isValid(root, 0, preOrder.length - 1)) {
      return 1 + " " + getFarLeftBottomVal(root, 0) + " " + getFarRightBottomVal(root, 0);
    } else {
      return "0 0 0";
    }
  }

  /**
   * 判断preOrder数组是否为合法的二叉搜索树前序遍历结果序列，如果是，则根绝preOrder还原出对应二叉搜索树
   *
   * @param root 二叉搜索树的节点，每个二叉搜索树节点都对应preOrder序列中的一段子序列
   * @param start 该子序列在preOrder中的范围的起始位置
   * @param end 该子序列在preOrder中的范围的结束位置
   * @return preOrder数组是否为合法的二叉搜索树前序遍历结果
   */
  public static boolean isValid(Node root, int start, int end) {
    // 如果当前节点对应的序列范围长度为1，则当前节点为叶子节点，无法继续递归，需要结束递归，而单个节点本身就是前序遍历结果，因此返回true
    if (start == end) return true;

    // 前序遍历即：根左右，因此start位置是当前序列对应的子树的根节点位置，当前子树的左子子树从start+1位置开始判断
    int i = start + 1;
    // 二叉搜索树的特点是：当前节点的左子节点值 < 当前节点的值
    while (i <= end && preOrder[i] < root.val) {
      i++;
    }

    // i 最终指向左右子树的分界位置
    int j = i;
    // 二叉搜索树的特点是：当前节点的右子节点值 > 当前节点的值
    while (j <= end && preOrder[j] > root.val) {
      j++;
    }

    // j 最终指向右子树的终点位置的后一个位置，而右子树的终点位置必须在end，因此合法的二叉搜索树前序遍历结果 j > end
    if (j <= end) return false;

    // i 最终指向左右子树的分界位置
    // 如果 i > start + 1，则存在左子树
    if (i > start + 1) {
      // 创建当前节点的左子树节点
      root.left_child = new Node(preOrder[start + 1]);

      // 递归判断左子树对应的序列范围是否为前序遍历结果
      if (!isValid(root.left_child, start + 1, i - 1)) {
        // 若不是，则preOrder无法还原出二叉搜索树
        return false;
      }
    }

    // i 最终指向左右子树的分界位置
    // 如果 i <= end，则存在右子树
    if (i <= end) {
      // 创建当前节点的右子树节点
      root.right_child = new Node(preOrder[i]);

      // 如果右子树对应的序列是合法的前序遍历结果，结合前面左子树对应的序列也是合法的前序遍历结果，则preOrder整体就是合法的前序遍历结果
      return isValid(root.right_child, i, end);
    }

    return true;
  }

  // 递归查找二叉树的左缀点，即二叉树最后一层中，最靠左的点
  public static int getFarLeftBottomVal(Node root, int level) {
    // 如果当前节点存在左子节点，则递归查找其左子节点
    if (root.left_child != null) {
      return getFarLeftBottomVal(root.left_child, level + 1);
    }

    // 如果当前节点没有左子节点，则检查当前节点处于哪一层
    if (level > 0) {
      if (root.right_child != null) {
        // 如果当前节点不处于第0层，且存在右子节点，则递归查找其右子节点
        return getFarLeftBottomVal(root.right_child, level + 1);
      } else {
        // 如果当前节点不处于第0层，且不存在右子节点，则当前节点即为左缀点
        return root.val;
      }
    } else {
      // 如果当前节点处于第0层，且没有左子节点，则没有左缀点，按题目要求返回0
      return 0;
    }
  }

  // 递归查找二叉树的右缀点，即二叉树最后一层中，最靠右的点
  public static int getFarRightBottomVal(Node root, int level) {
    if (root.right_child != null) {
      return getFarRightBottomVal(root.right_child, level + 1);
    }

    if (level > 0) {
      if (root.left_child != null) {
        return getFarRightBottomVal(root.left_child, level + 1);
      } else {
        return root.val;
      }
    } else {
      return 0;
    }
  }
}`,python:`# 输入获取
preOrder = list(map(int, input().split()))  # 二叉搜索树前序遍历的结果序列


# 二叉树的节点类定义
class Node:
    def __init__(self, val):
        self.val = val  # 节点值
        self.left_child = None  # 当前节点的左子节点
        self.right_child = None  # 当前节点的右子节点


def isValid(root, start, end):
    """
    判断preOrder数组是否为合法的二叉搜索树前序遍历结果序列，如果是，则根绝preOrder还原出对应二叉搜索树
    :param root: 二叉搜索树的节点，每个二叉搜索树节点都对应preOrder序列中的一段子序列
    :param start: 该子序列在preOrder中的范围的起始位置
    :param end: 该子序列在preOrder中的范围的结束位置
    :return: preOrder数组是否为合法的二叉搜索树前序遍历结果
    """

    # 如果当前节点对应的序列范围长度为1，则当前节点为叶子节点，无法继续递归，需要结束递归，而单个节点本身就是前序遍历结果，因此返回true
    if start == end:
        return True

    # 前序遍历即：根左右，因此start位置是当前序列对应的子树的根节点位置，当前子树的左子子树从start+1位置开始判断
    i = start + 1
    # 二叉搜索树的特点是：当前节点的左子节点值 < 当前节点的值
    while i <= end and preOrder[i] < root.val:
        i += 1

    # i 最终指向左右子树的分界位置
    j = i
    # 二叉搜索树的特点是：当前节点的右子节点值 > 当前节点的值
    while j <= end and preOrder[j] > root.val:
        j += 1

    # j 最终指向右子树的终点位置的后一个位置，而右子树的终点位置必须在end，因此合法的二叉搜索树前序遍历结果 j > end
    if j <= end:
        return False

    # i 最终指向左右子树的分界位置
    # 如果 i > start + 1，则存在左子树
    if i > start + 1:
        # 创建当前节点的左子树节点
        root.left_child = Node(preOrder[start + 1])

        # 递归判断左子树对应的序列范围是否为前序遍历结果
        if not isValid(root.left_child, start + 1, i - 1):
            # 若不是，则preOrder无法还原出二叉搜索树
            return False

    # i 最终指向左右子树的分界位置
    # 如果 i <= end，则存在右子树
    if i <= end:
        # 创建当前节点的右子树节点
        root.right_child = Node(preOrder[i])
        # 如果右子树对应的序列是合法的前序遍历结果，结合前面左子树对应的序列也是合法的前序遍历结果，则preOrder整体就是合法的前序遍历结果
        return isValid(root.right_child, i, end)

    return True


# 递归查找二叉树的左缀点，即二叉树最后一层中，最靠左的点
def getFarLeftBottomVal(root, level):
    # 如果当前节点存在左子节点，则递归查找其左子节点
    if root.left_child is not None:
        return getFarLeftBottomVal(root.left_child, level + 1)

    # 如果当前节点没有左子节点，则检查当前节点处于哪一层
    if level > 0:
        if root.right_child is not None:
            # 如果当前节点不处于第0层，且存在右子节点，则递归查找其右子节点
            return getFarLeftBottomVal(root.right_child, level + 1)
        else:
            # 如果当前节点不处于第0层，且不存在右子节点，则当前节点即为左缀点
            return root.val
    else:
        # 如果当前节点处于第0层，且没有左子节点，则没有左缀点，按题目要求返回0
        return 0


# 递归查找二叉树的右缀点，即二叉树最后一层中，最靠右的点
def getFarRightBottomVal(root, level):
    if root.right_child is not None:
        return getFarRightBottomVal(root.right_child, level + 1)

    if level > 0:
        if root.left_child is not None:
            return getFarRightBottomVal(root.left_child, level + 1)
        else:
            return root.val
    else:
        return 0


# 核心代码
def getResult():
    # 二叉搜索树的根节点root
    root = Node(preOrder[0])

    if isValid(root, 0, len(preOrder) - 1):
        return f"1 {getFarLeftBottomVal(root, 0)} {getFarRightBottomVal(root, 0)}"
    else:
        return "0 0 0"


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},p={id:"205",title:n,examType:"B",score:200,description:t,inputDesc:r,outputDesc:e,examples:i,solution:o,codes:l};export{l as codes,p as default,t as description,d as examType,i as examples,a as id,r as inputDesc,e as outputDesc,s as score,o as solution,n as title};
