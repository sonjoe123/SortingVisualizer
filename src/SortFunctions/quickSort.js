import { TIME } from "../components/SortVisualizer";

export async function quickSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers, start = 0, end = array.length - 1) {
    if (start >= end) {
      setComparingIndices([]); // Clear comparing indices when subarray has length 1
      return;
    }
  
    const pivotIndex = await partition(array, start, end, setComparingIndices, setSwappingIndices, setRandomNumbers);
    await Promise.all([
      quickSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers, start, pivotIndex - 1),
      quickSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers, pivotIndex + 1, end)
    ]);
  
    if (start === 0 && end === array.length - 1) {
      setComparingIndices([]); // Clear comparing indices when the entire array is sorted
    }
  }
  
  async function partition(array, start, end, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    const pivot = array[end];
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
      setComparingIndices([i, end]);
      await sleep(TIME); // Adjust the delay as needed
  
      if (array[i] < pivot) {
        await swap(array, i, pivotIndex, setSwappingIndices, setRandomNumbers);
        pivotIndex++;
      }
  
      setComparingIndices([]); // Clear comparing indices after each comparison
    }
  
    await swap(array, pivotIndex, end, setSwappingIndices, setRandomNumbers);
    setComparingIndices([]); // Clear comparing indices after swapping the pivot
    return pivotIndex;
  }
  
  async function swap(array, a, b, setSwappingIndices, setRandomNumbers) {
    setSwappingIndices([a, b]);
    await sleep(TIME); // Adjust the delay as needed
  
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  
    setRandomNumbers([...array]);
    setSwappingIndices([]);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }