// Binary Search Tree (BST)

/* Node: 부모자식 관계를 이룰 한요소 
value,left,right
*/
class treeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
/* BST */
class BST {
  constructor() {
    this.root = null;
  }
  insert(value, node) {
    // 첫노드 -> root
    if (node === undefined) {
      if (this.root === null) {
        this.root = new treeNode(value);
      }
      node = this.root;
    }
    if (value > node.value) {
      if (node.right) {
        //오른쪽 자식 존재
        this.insert(value, node.right);
      } else {
        // 오른쪽에 배치
        node.right = new treeNode(value);
        return this;
      }
    } else if (value < node.value) {
      if (node.left) {
        // 왼쪽 자식 존재
        this.insert(value, node.left);
      } else {
        // 왼쪽에 배치
        node.left = new treeNode(value);
        return this;
      }
    } else {
      return this;
    }
  }

  search(value) {
      var found=false; 
    // 그냥 true false 반환하기보다는 무엇을 반환하는지
    // 나타내 주는 변수에 담아서 반환하는 것이 좋다
//
    var currentNode = this.root;
    if (currentNode === null) {
      return false;
    } else {
      while (currentNode && !found) {
        if (currentNode.value === value) {
            found=true;
        } else if (currentNode.value < value) {
          currentNode = currentNode.right;
        } else if (currentNode.value > value) {
          currentNode = currentNode.left;
        }
      }
      return found;
    }
  }
}

/*트리생성
트리객체를 만든다
root node 를 생성하고 트리객체 root포인터로 가르킨다 
 */

var bst = new BST();

bst.insert(10);
bst.insert(5);
bst.insert(20);
bst.insert(7);
bst.insert(7);
bst.insert(4);

console.log(bst.search(7));
console.log(bst.search(8));
//    10
//   5   20
// 4  7
