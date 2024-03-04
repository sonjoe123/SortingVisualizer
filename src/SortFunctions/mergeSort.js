import { TIME } from "../components/SortVisualizer";
export async function mergeSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    await performMergeSort(array, 0, array.length - 1, setComparingIndices, setSwappingIndices, setRandomNumbers);
    setComparingIndices([]);
    setSwappingIndices([]);
  }
  
  async function performMergeSort(array, start, end, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    if (start >= end) return;
  
    const mid = Math.floor((start + end) / 2);
    await Promise.all([
      performMergeSort(array, start, mid, setComparingIndices, setSwappingIndices, setRandomNumbers),
      performMergeSort(array, mid + 1, end, setComparingIndices, setSwappingIndices, setRandomNumbers)
    ]);
  
    await merge(array, start, mid, end, setComparingIndices, setSwappingIndices, setRandomNumbers);
  }
  
  async function merge(array, start, mid, end, setComparingIndices, setSwappingIndices, setRandomNumbers) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
  
    let leftIndex = 0;
    let rightIndex = 0;
    let currentIndex = start;
  
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      setComparingIndices([start + leftIndex, mid + 1 + rightIndex]);
      await sleep(TIME); // Adjust the delay as needed
  
      if (leftArray[leftIndex] <= rightArray[rightIndex]) {
        array[currentIndex] = leftArray[leftIndex];
        leftIndex++;
      } else {
        array[currentIndex] = rightArray[rightIndex];
        rightIndex++;
      }
  
      setSwappingIndices([currentIndex]);
      await sleep(TIME); // Adjust the delay as needed
      setRandomNumbers([...array]);
      currentIndex++;
    }
  
    while (leftIndex < leftArray.length) {
      array[currentIndex] = leftArray[leftIndex];
      leftIndex++;
      setSwappingIndices([currentIndex]);
      await sleep(TIME); // Adjust the delay as needed
      setRandomNumbers([...array]);
      currentIndex++;
    }
  
    while (rightIndex < rightArray.length) {
      array[currentIndex] = rightArray[rightIndex];
      rightIndex++;
      setSwappingIndices([currentIndex]);
      await sleep(TIME); // Adjust the delay as needed
      setRandomNumbers([...array]);
      currentIndex++;
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  