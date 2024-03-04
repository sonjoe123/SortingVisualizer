import { TIME } from "../components/SortVisualizer";

export async function bubbleSort(array, setComparingIndices, setSwappingIndices, setRandomNumbers) {
  const length = array.length;
  let swapped;

  for (let i = 0; i < length - 1; i++) {
    swapped = false;

    for (let j = 0; j < length - i - 1; j++) {
      setComparingIndices([j, j + 1]);
      await sleep(TIME);

      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1, setSwappingIndices, setRandomNumbers);
        swapped = true;
      }

      setComparingIndices([]);
    }

    // If no swapping occurred, array is already sorted
    if (!swapped) {
      break;
    }
  }

  setSwappingIndices([]);
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