class Heap
{
  constructor(comparator)
  {
    this.heap = [];
    this.comparator = comparator;
  }

  size()
  {
    return this.heap.length;
  }

  percUp(i)
  {
    let parent = this.parent(i);
    if (parent == undefined)
      return false;

    let left = this.leftChild(parent);
    let right = this.rightChild(parent);

    let smallest = parent;
    if (left && this.comparator(this.heap[left], this.heap[parent]) < 0)
      smallest = left;
    if (right && this.comparator(this.heap[right], this.heap[smallest]) < 0)
      smallest = right;
    if (smallest != parent)
    {
      this.swap(parent, smallest);
      this.percUp(parent);
    }
  }

  percDown(i)
  {
    let left = this.leftChild(i);
    let right = this.rightChild(i);
    let smallest = i;
    if (left && this.comparator(this.heap[left], this.heap[i]) < 0)
      smallest = left;
    if (right && this.comparator(this.heap[right], this.heap[smallest]) < 0)
      smallest = right;
    if (smallest != i)
    {
      this.swap(i, smallest);
      this.percDown(smallest);
    }
  }

  swap(i, j)
  {
    let tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  promote(node)
  {
    let pos = undefined;
    for (let i = 0; i < this.heap.length; i++)
      if (node === this.heap[i])
        pos = i;

    if (pos === undefined)
      return false;

    this.percUp(pos);
  }

  insert(item)
  {
    this.heap.push(item);
    if (this.heap.length > 1) this.percUp(this.heap.length - 1);
  }

  peek()
  {
    return this.heap[0];
  }

  pop()
  {
    if (this.heap.length === 0)
      return false;
    this.swap(0, this.heap.length - 1);
    let min = this.heap[this.heap.length - 1];
    this.heap = this.heap.slice(0, this.heap.length - 1);
    this.percDown(0);
    return min;
  }

  isLeft(i) { return i % 2 !== 0; }

  isRight(i) { return i % 2 === 0; }

  leftChild(i)
  {
    let childInd = 2 * i + 1;
    if (childInd >= this.heap.length)
      return false;
    return childInd;
  }

  rightChild(i)
  {
    let childInd = 2 * i + 2;
    if (childInd >= this.heap.length)
      return false;
    return childInd;
  }

  parent(i)
  {
    if (i == 0) return undefined;
    return Math.floor((i - 1) / 2)
  }
}
