import { TIME } from "../components/SortVisualizer";

export async function heapSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    const length = array.length;
  
    // Build max heap
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      await heapify(array, length, i, setComparingIndices, setSwappingIndices, setRandomNumbers);
    }
  
    // Extract elements from heap one by one
    for (let i = length - 1; i > 0; i--) {
      await swap(array, 0, i, setSwappingIndices, setRandomNumbers);
      await heapify(array, i, 0, setComparingIndices, setSwappingIndices, setRandomNumbers);
    }
  
    setComparingIndices([]);
    setSwappingIndices([]);
  }
  
  async function heapify(array, length, index, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
  
    if (left < length) {
      setComparingIndices([left, largest]);
      await sleep(TIME);
      if (array[left] > array[largest]) {
        largest = left;
      }
    }
  
    if (right < length) {
      setComparingIndices([right, largest]);
      await sleep(TIME);
      if (array[right] > array[largest]) {
        largest = right;
      }
    }
  
    if (largest !== index) {
      await swap(array, index, largest, setSwappingIndices, setRandomNumbers);
      await heapify(array, length, largest, setComparingIndices, setSwappingIndices, setRandomNumbers);
    }
  
    setComparingIndices([]);
  }
  
  async function swap(array, a, b, setSwappingIndices, setRandomNumbers) {
    setSwappingIndices([a, b]);
    await sleep(TIME);
  
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  
    setRandomNumbers([...array]);
    setSwappingIndices([]);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }