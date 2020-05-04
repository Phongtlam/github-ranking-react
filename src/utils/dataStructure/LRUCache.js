class LRUCache {
  constructor(capacity, invalidationTimer = 0) {
    this.invalidationTimer = invalidationTimer;
    this.initialCapacity = capacity;
    this.capacity = capacity;
    this.hash = {};
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.invalidateCache();
  }

  invalidateCache() {
    if (!this.invalidationTimer) return;
    setInterval(() => {
      this.capacity = this.initialCapacity;
      this.hash = {};
      this.head = new Node();
      this.tail = new Node();
      this.head.next = this.tail;
      this.tail.prev = this.head;
    }, this.invalidationTimer);
  }

  get(key) {
    let node = this.hash[key];
    if (node) {
      this.pushToTail(node);
      return node.val;
    }
    return null;
  }

  put(key, val) {
    let node = this.hash[key];
    if (node) {
      node.val = val;
    } else {
      this.hash[key] = new Node(key, val);
      this.capacity--;
    }
    this.pushToTail(this.hash[key]);
    if (this.capacity < 0) {
      this.removeHead();
      this.capacity++;
    }
  }

  removeHead() {
    let rNode = this.head.next;
    delete this.hash[rNode.key];
    this.head.next = this.head.next.next;
    this.head.next.prev = this.head;
  }

  pushToTail(node) {
    if (this.tail.prev === node) return;
    if (node.next && node.prev) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }
    let pTail = this.tail.prev;
    node.next = this.tail;
    this.tail.prev = node;
    pTail.next = node;
    node.prev = pTail;
  }
}

function Node(key, val) {
  this.val = val;
  this.key = key;
  this.next = this.prev = null;
}

export default LRUCache;
