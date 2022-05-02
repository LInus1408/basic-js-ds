const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    let node = this.node;
    if (node === null) {
      this.node = new Node(data);
      return;
    } else {
      function insertNode(node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return insertNode(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return insertNode(node.right);
          }
        } else {
          return null;
        }
      };
      return insertNode(node);
    }
  }

  has(data) {
    let value = this.node;
    while (value) {
      if (data === value.data) {
        return true;
      }
      if (data < value.data) {
        value = value.left;
      } else {
        value = value.right;
      }
    }
    return false;
  }

  find(data) {

    function getNode(node, value) {

      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }
      if(node.data <= value) {
        return getNode(node.right, value)
      } else {
        return getNode(node.left, value)
      }
    }
    return getNode(this.node, data);
  }

  remove(data) {
    function removeValue(node, data) {

      if (data == node.data) {
        if (node.left == null && node.right == null) {
          return null;
        }
        if (node.left == null) {
          return node.right;
        }
        if (node.right == null) {
          return node.left;
        }
        let nextNode = node.right;

        while (nextNode.left !== null) {
          nextNode = nextNode.left;
        }
        node.data = nextNode.data;
        node.right = removeValue(node.right, nextNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeValue(node.left, data);
        return node;
      } else {
        node.right = removeValue(node.right, data);
        return node;
      }
    }
    this.node = removeValue(this.node, data);
  }

  min() {


    let node = this.node;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.node;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};