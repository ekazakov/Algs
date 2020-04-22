// https://www.geeksforgeeks.org/quicksort-on-singly-linked-list
// In partition(), we consider last element as pivot.
// We traverse through the current list and if a node
// has value greater than pivot, we move it after tail.
// If the node has smaller value, we keep it at its current position.
// In QuickSortRecur(), we first call partition() which places pivot
// at correct position and returns pivot. After pivot is placed at
// correct position, we find tail node of left side (list before pivot)
// and recur for left list. Finally, we recur for right list.
const { buildList, lToS } = require('./list-tools');

// function quickSort(head) {
//     let tail = head;
//
//     while (tail && tail.next) {
//         tail = tail.next;
//     }
//
//     // takes first and last node,
//     // but do not break any links in
//     // the whole linked list
//     function partition(head, tail) {
//         if (head === tail || head == null || tail == null) {
//             return head;
//         }
//
//         let pivotPrev = head;
//         let curr = head;
//         const pivot = tail.val;
//
//         // console.log('partition::', 'head:', head.val, 'tail:', tail.val);
//
//         // iterate till one before the end,
//         // no need to iterate till the end
//         // because end is pivot
//         while (head.next !== tail) {
//             if (head.val < pivot) {
//                 pivotPrev = curr;
//                 const tmp = curr.val;
//                 curr.val = head.val;
//                 head.val = tmp;
//                 curr = curr.next;
//             }
//             head = head.next;
//         }
//
//         // swap the position of curr i.e.
//         // next suitable index and pivot
//         const tmp = curr.val;
//         curr.val = pivot;
//         tail.val = tmp;
//
//         // return one previous to current
//         // because current is now pointing to pivot
//         return pivotPrev;
//     }
//
//     function _quickSort(head, tail) {
//         if (head === tail) {
//             return head;
//         }
//
//         // split list and partition recurse
//         const pivotPrev = partition(head, tail);
//         // console.log('partition pivot:', pivotPrev.val, 'head:', head.val);
//         _quickSort(head, pivotPrev);
//
//         // if pivot is picked and moved to the start,
//         // that means start and pivot is same
//         // so pick from next of pivot
//         if (pivotPrev != null && pivotPrev === head) {
//             // console.log('pivotPrev:', pivotPrev.val, 'head:', head.val);
//             _quickSort(pivotPrev.next, tail);
//         } else {
//             // if pivot is in between of the list,
//             // start from next of pivot,
//             // since we have pivot_prev, so we move two nodes
//             if (pivotPrev != null && pivotPrev.next != null) {
//                 _quickSort(pivotPrev.next.next, tail);
//             }
//         }
//
//         return head;
//     }
//
//     return _quickSort(head, tail);
// }




// TODO: lets try this
// https://www.studytonight.com/post/use-quick-sort-to-sort-a-linear-linked-list

// const l1 = buildList([30, 3, 4, 20, 5]);
// const out1 = quickSort(l1);
const l2 = buildList([1, 2, 3, 4, 5]);
const out2 = quickSort(l2);
console.log(lToS(out2));
