import React, { useState } from 'react';
import './Visualizer.css';
import { mergeSort } from '../SortFunctions/mergeSort';
import { quickSort } from '../SortFunctions/quickSort';
import { bubbleSort } from '../SortFunctions/bubbleSort';
import { heapSort } from '../SortFunctions/heapSort';
export let TIME = 80;
const SortVisualizer = () => {

  const DEFAULT_DISPLAY_COUNT = 80; // Adjust as needed
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers(DEFAULT_DISPLAY_COUNT));
  const [displayCount, setDisplayCount] = useState(DEFAULT_DISPLAY_COUNT);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  function generateRandomNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
      numbers.push(randomNumber);
    }
    return numbers;
  }

  async function handleSorting(sortingFunction) {
    if (isSorting) return; // If sorting is already in progress, do nothing
    setIsSorting(true); // Set sorting flag to true
    setComparingIndices([]);
    setSwappingIndices([]);
    await sortingFunction(randomNumbers, setComparingIndices, setSwappingIndices, setRandomNumbers,);
    setIsSorting(false); // Reset sorting flag to false after sorting is finished
  }

  function getBarColor(index) {
    if (comparingIndices.includes(index)) {
      return 'red'; // Color for elements being compared
    }
    if (swappingIndices.includes(index)) {
      return 'blue'; // Color for elements being swapped
    }
    return 'black'; // Default color
  }

  function handleGenerateClick() {
    setRandomNumbers(generateRandomNumbers(randomNumbers.length));
    setComparingIndices([]);
    setSwappingIndices([]);
  }

  function handleDisplayCountChange(event) {
    let count = parseInt(event.target.value, 10);
    setDisplayCount(count);
    setRandomNumbers(generateRandomNumbers(count));
  
     // Calculate new time based on display count
  let newTime = Math.max(Math.min(100 - count, 97), 3);
  TIME = newTime; // Update the global TIME variable
    console.log(TIME);
  }
  function changeBackground(color) {
    document.body.style.background = color;
 }
 
 window.addEventListener("load",function() { changeBackground('gray') });

  return (
    <div className="page-container">
      <div className="bar-chart">
        {randomNumbers.map((number, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${number / 1.5}px`, backgroundColor: getBarColor(index) }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleGenerateClick} disabled={isSorting}>
          Generate New Numbers
        </button>
        <button onClick={() => handleSorting(mergeSort)} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={() => handleSorting(quickSort)} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={() => handleSorting(heapSort)} disabled={isSorting}>
          Heap Sort
        </button>
        <button onClick={() => handleSorting(bubbleSort)} disabled={isSorting}>
          Bubble Sort
        </button>
        <input type="number" value={displayCount} onChange={handleDisplayCountChange} disabled={isSorting} />
      </div>
    </div>
  );
};

export default SortVisualizer;
