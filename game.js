// --- Basic 2048 Game Logic with Smooth Sliding Tiles ---
const gridSize = 4;
const tileSize = 100; // Each tile is 100px
const gap = 15;       // Gap between tiles is 15px
const containerSize = 500; // Container is 500px square
const totalGridSize = (gridSize * tileSize) + ((gridSize - 1) * gap); // 445px
const offset = (containerSize - totalGridSize) / 2; // ~27.5px

let grid = [];           // 2D array holding numbers (0 means empty)
let score = 0;
const tileElements = {}; // Object keyed by "i-j" to hold tile DOM elements

const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');

function initGrid() {
  grid = [];
  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(0);
    }
    grid.push(row);
  }
}

function updateTiles() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const key = `${i}-${j}`;
      const value = grid[i][j];
      const topPos = offset + i * (tileSize + gap);
      const leftPos = offset + j * (tileSize + gap);
      if (value !== 0) {
        if (tileElements[key]) {
          // Update existing tile's content and then force a reflow to trigger the transition.
          const tileElem = tileElements[key];
          tileElem.textContent = value;
          tileElem.className = `tile tile-${value}`;
          // Force a repaint in the next frame before updating the position.
          requestAnimationFrame(() => {
            tileElem.style.top = `${topPos}px`;
            tileElem.style.left = `${leftPos}px`;
          });
        } else {
          // Create a new tile element and set its position.
          const tileElem = document.createElement('div');
          tileElem.className = `tile tile-${value}`;
          tileElem.textContent = value;
          // Set initial position
          tileElem.style.top = `${topPos}px`;
          tileElem.style.left = `${leftPos}px`;
          gridContainer.appendChild(tileElem);
          tileElements[key] = tileElem;
        }
      } else {
        if (tileElements[key]) {
          tileElements[key].remove();
          delete tileElements[key];
        }
      }
    }
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

function spawnTile() {
  const emptyCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ i, j });
      }
    }
  }
  if (emptyCells.length === 0) return;
  const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function slideAndMerge(row) {
  let arr = row.filter(val => val !== 0);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(val => val !== 0);
  while (arr.length < gridSize) {
    arr.push(0);
  }
  return arr;
}

function moveLeft() {
  let moved = false;
  for (let i = 0; i < gridSize; i++) {
    const currentRow = grid[i];
    const newRow = slideAndMerge(currentRow);
    if (JSON.stringify(newRow) !== JSON.stringify(currentRow)) {
      grid[i] = newRow;
      moved = true;
    }
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let i = 0; i < gridSize; i++) {
    const reversed = [...grid[i]].reverse();
    const newRowReversed = slideAndMerge(reversed);
    const newRow = newRowReversed.reverse();
    if (JSON.stringify(newRow) !== JSON.stringify(grid[i])) {
      grid[i] = newRow;
      moved = true;
    }
  }
  return moved;
}

function moveUp() {
  let moved = false;
  for (let j = 0; j < gridSize; j++) {
    let col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i][j]);
    }
    const newCol = slideAndMerge(col);
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][j] !== newCol[i]) {
        grid[i][j] = newCol[i];
        moved = true;
      }
    }
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let j = 0; j < gridSize; j++) {
    let col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i][j]);
    }
    const newColReversed = slideAndMerge(col.reverse());
    const newCol = newColReversed.reverse();
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][j] !== newCol[i]) {
        grid[i][j] = newCol[i];
        moved = true;
      }
    }
  }
  return moved;
}

function isGameOver() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) return false;
      if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) return false;
      if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) return false;
    }
  }
  return true;
}

function handleKey(e) {
  let moved = false;
  switch (e.key) {
    case 'ArrowLeft': moved = moveLeft(); break;
    case 'ArrowRight': moved = moveRight(); break;
    case 'ArrowUp': moved = moveUp(); break;
    case 'ArrowDown': moved = moveDown(); break;
  }
  if (moved) {
    spawnTile();
    updateTiles();
    if (isGameOver()) {
      setTimeout(() => alert("Game Over!"), 100);
    }
  }
}

function newGame() {
  // Remove existing tile elements
  for (const key in tileElements) {
    tileElements[key].remove();
  }
  for (const key in tileElements) {
    delete tileElements[key];
  }
  initGrid();
  score = 0;
  spawnTile();
  spawnTile();
  updateTiles();
}

document.addEventListener('keydown', handleKey);
document.getElementById('newGame').addEventListener('click', newGame);
newGame();
const contractABI = [
    "function submitScore(uint256 score) public",
    "function highScores(address) public view returns (uint256)"
  ];
  const contractAddress = "0x953BF8eB530Ae3c62b7EC2E9fd0831B41E3ED4F2";
  
  document.getElementById('submitScore').addEventListener('click', async () => {
    if (typeof window.ethereum === 'undefined') {
      alert("MetaMask is not installed.");
      return;
    }
    
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Current network:", network);
      
      const monadTestnetChainIdDecimal = 10143;
      const monadTestnetChainIdHex = '0x' + monadTestnetChainIdDecimal.toString(16);
      console.log("Expected Monad Testnet chainId (hex):", monadTestnetChainIdHex);
      
      if (network.chainId !== monadTestnetChainIdDecimal) {
        console.log("Switching network...");
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: monadTestnetChainIdHex }],
          });
          console.log("Network switched successfully.");
        } catch (switchError) {
          console.error("Error switching network:", switchError);
          if (switchError.code === 4902) {
            console.log("Adding network to MetaMask...");
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: monadTestnetChainIdHex,
                chainName: 'Monad Testnet',
                rpcUrls: ['https://testnet-rpc.monad.xyz'],
                nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
                blockExplorerUrls: ['https://testnet.monadexplorer.com'],
              }],
            });
            console.log("Network added, please try again.");
            return;
          } else {
            alert("Failed to switch network. Check console for details.");
            return;
          }
        }
        provider = new ethers.BrowserProvider(window.ethereum);
      } else {
        console.log("Already on the Monad Testnet.");
      }
      
      const signer = await provider.getSigner();
      const gameContract = new ethers.Contract(contractAddress, contractABI, signer);
      
      console.log("Submitting score:", score);
      const tx = await gameContract.submitScore(score);
      console.log("Transaction sent, hash:", tx.hash);
      await tx.wait();
      alert(`Score of ${score} submitted to the Monad Testnet!`);
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Error submitting score. Check the console for details.");
    }
  });