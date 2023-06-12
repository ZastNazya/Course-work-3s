import React, { useRef, useEffect, useState } from 'react';
import './a.css'

class Node {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1;
   }
}

class AVLTree {
   constructor() {
      this.root = null;
   }

   getHeight(node) {
      if (node === null) return 0;
      return node.height;
   }

   getBalanceFactor(node) {
      if (node === null) return 0;
      return this.getHeight(node.left) - this.getHeight(node.right);
   }

   rotateRight(y) {
      const x = y.left;
      const T2 = x.right;

      x.right = y;
      y.left = T2;

      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

      return x;
   }

   rotateLeft(x) {
      const y = x.right;
      const T2 = y.left;

      y.left = x;
      x.right = T2;

      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

      return y;
   }

   insertNode(node, value) {
      if (node === null) return new Node(value);

      if (value < node.value) {
         node.left = this.insertNode(node.left, value);
      } else if (value > node.value) {
         node.right = this.insertNode(node.right, value);
      } else {
         return node; // Duplicate values are not allowed
      }

      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      const balanceFactor = this.getBalanceFactor(node);

      // Left Left Case
      if (balanceFactor > 1 && value < node.left.value) {
         return this.rotateRight(node);
      }

      // Right Right Case
      if (balanceFactor < -1 && value > node.right.value) {
         return this.rotateLeft(node);
      }

      // Left Right Case
      if (balanceFactor > 1 && value > node.left.value) {
         node.left = this.rotateLeft(node.left);
         return this.rotateRight(node);
      }

      // Right Left Case
      if (balanceFactor < -1 && value < node.right.value) {
         node.right = this.rotateRight(node.right);
         return this.rotateLeft(node);
      }

      return node;
   }

   removeNode(node, value) {
      if (node === null) return node;

      if (value < node.value) {
         node.left = this.removeNode(node.left, value);
      } else if (value > node.value) {
         node.right = this.removeNode(node.right, value);
      } else {
         if (node.left === null || node.right === null) {
            return node.left || node.right;
         } else {
            const successor = this.findMinNode(node.right);
            node.value = successor.value;
            node.right = this.removeNode(node.right, successor.value);
         }
      }

      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      const balanceFactor = this.getBalanceFactor(node);

      // Left Left Case
      if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
         return this.rotateRight(node);
      }

      // Right Right Case
      if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
         return this.rotateLeft(node);
      }

      // Left Right Case
      if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
         node.left = this.rotateLeft(node.left);
         return this.rotateRight(node);
      }

      // Right Left Case
      if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
         node.right = this.rotateRight(node.right);
         return this.rotateLeft(node);
      }

      return node;
   }

   findMinNode(node) {
      let current = node;
      while (current.left !== null) {
         current = current.left;
      }
      return current;
   }
}

const AVLTreeVisualization = () => {
   const canvasRef = useRef(null);
   const avlTree = useRef(new AVLTree());
   const [searchValue, setSearchValue] = useState('');

   useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');
      visualize(ctx, avlTree.current.root);
   }, []);

   const visualize = (ctx, node) => {
      ctx.clearRect(0, 0, 1000, 430);
      drawNode(ctx, node, 500, 40);
   };

   const drawNode = (ctx, node, x, y) => {
      if (node !== null) {
         ctx.beginPath();
         ctx.arc(x, y, 14, 0, 2 * Math.PI);
         ctx.stroke();
         ctx.fillStyle = node.value === searchValue ? '#00FF00' : '#000000';
         ctx.fill();
         ctx.fillStyle = '#fff';
         ctx.fillText(node.value, x - 5, y + 5);

         const leftChild = node.left;
         const rightChild = node.right;

         if (leftChild !== null) {
            const leftX = x - 60;
            const leftY = y + 45;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(leftX, leftY);
            ctx.stroke();
            drawNode(ctx, leftChild, leftX, leftY);
         }

         if (rightChild !== null) {
            const rightX = x + 60;
            const rightY = y + 45;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
            drawNode(ctx, rightChild, rightX, rightY);
         }
      }
   };

   const handleInsert = () => {
      const value = +document.getElementById('val').value;
      if (isNaN(value)) return alert('Value is not a number');
      avlTree.current.root = avlTree.current.insertNode(avlTree.current.root, value);
      const ctx = canvasRef.current.getContext('2d');
      visualize(ctx, avlTree.current.root);
   };

   const handleRemove = () => {
      const value = +document.getElementById('val').value;
      if (isNaN(value)) return alert('Value is not a number');
      avlTree.current.root = avlTree.current.removeNode(avlTree.current.root, value);
      const ctx = canvasRef.current.getContext('2d');
      visualize(ctx, avlTree.current.root);
   };

   const handleSearch = () => {
      const value = +document.getElementById('val').value;
      if (isNaN(value)) return alert('Value is not a number');
      setSearchValue(value);
      const ctx = canvasRef.current.getContext('2d');
      visualize(ctx, avlTree.current.root);
   };

   return (
      <div className='vizual'>
         <canvas ref={canvasRef} width="1000" height="430"></canvas>
         <div className="h">
            <input className="val" type="number" id="val" placeholder="value" />
            <div className='but'>
               <button onClick={handleInsert}>Insert</button>
               <button onClick={handleRemove}>Remove</button>
               <button onClick={handleSearch}>Search</button>
            </div>
         </div>
         <br />
      </div>
   );
};

export default AVLTreeVisualization;
