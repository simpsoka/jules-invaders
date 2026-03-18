const { performance } = require('perf_hooks');

// Mock state
const alienRowCount = 5;
const alienColumnCount = 11;
const aliens = [];
for (let c = 0; c < alienColumnCount; c++) {
  aliens[c] = [];
  for (let r = 0; r < alienRowCount; r++) {
    aliens[c][r] = { status: 1 };
  }
}

function countAliensO_N_M() {
  let activeAliens = 0;
  for (let c = 0; c < alienColumnCount; c++) {
    for (let r = 0; r < alienRowCount; r++) {
      if (aliens[c][r].status === 1) activeAliens++;
    }
  }
  return activeAliens;
}

let globalActiveAliens = alienRowCount * alienColumnCount;
function countAliensO_1() {
  return globalActiveAliens;
}

const iterations = 1000000;

let start1 = performance.now();
for (let i = 0; i < iterations; i++) {
  countAliensO_N_M();
}
let end1 = performance.now();
console.log(`O(N*M) counting: ${(end1 - start1).toFixed(2)} ms`);

let start2 = performance.now();
for (let i = 0; i < iterations; i++) {
  countAliensO_1();
}
let end2 = performance.now();
console.log(`O(1) counting: ${(end2 - start2).toFixed(2)} ms`);
