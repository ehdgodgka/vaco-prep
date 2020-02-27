// Singly Linked Lists
//piece of data -val
//reference to next node -next
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  printall() {
    var printall = "list: ";
    var pNow = this.head;
    while (pNow !== null) {
      if (pNow !== this.head) {
        printall += '→';
      }
      if(pNow===this.head){
          if(pNow===this.tail){
            printall+='(■  '+ pNow.val+'   ■)';
           }else{
            printall+='(■  ' + pNow.val + ')';
           }
      }
      if(pNow!==this.head&&pNow===this.tail){
        printall+='('+ pNow.val+'   ■)';
       }
    if(!(pNow===this.head||pNow===this.tail)){
        printall += '(' + pNow.val + ')';
      }
      var pNext = pNow.next;
      pNow = pNext;
    }
    var div_SLL = document.querySelector('.SLL');
    div_SLL.textContent = printall;
  }
  push(val) {
    var node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    this.printall();
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;

    var popP = this.head;
    var newTail = null;
    while (popP.next !== null) {
      newTail = popP;
      popP = popP.next;
    }
    // 찾았다
    if (newTail === null) {
      //1개만 들어있는 경우
      this.head = null;
      this.tail = null;
      this.length = 0;
      return undefined;
    }
    this.tail = newTail;
    newTail.next = null;
    this.length--;
    this.printall();
    return this;
  }

  shift() {
    // 맨 앞의 아이템을 삭제합니다.
    if (this.length === 0) return undefined;
    var newHead = this.head.next;
    this.head = newHead;
    this.length--;
    if(this.length===0) this.tail=null;
    this.printall();
    return this;
  }

  unshift(val){
    var newHead=new Node(val);
    if(this.length===0){
        this.head=newHead;
        this.tail=this.head;
    }else{
        newHead.next=this.head;
        this.head=newHead;
    }
    this.length++
    this.printall();
    return this;
  }
}
// var first=new Node('Hi');
// first.next=new Node('There');
// first.next.next=new Node('I am Soojin');
var list = new SinglyLinkedList();
// list.push('Hello');
// list.push('I am ');
// list.push('Soo');
// list.push('Jin');
