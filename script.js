const moistureFill = document.getElementById("moistureFill");
const moistureText = document.getElementById("moistureText");
const pumpBtn = document.getElementById("pumpBtn");
const autoMode = document.getElementById("autoMode");
const lastWatered = document.getElementById("lastWatered");
const tipText = document.getElementById("tipText");

let moisture = 65;
let pumpOn = false;

// Tip list
const tips = [
  "Water plants early in the morning.",
  "Use mulch to retain soil moisture.",
  "Avoid watering leaves directly.",
  "Fix leaks in pipes or hoses.",
  "Group plants with similar water needs."
];

// Moisture chart setup
const ctx = document.getElementById("moistureChart").getContext("2d");
let moistureData = [moisture];
let labels = [new Date().toLocaleTimeString()];

const moistureChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Soil Moisture (%)",
      data: moistureData,
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      borderColor: "rgba(76, 175, 80, 1)",
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 2
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});

// Update moisture every 3 seconds
setInterval(() => {
  let change = Math.floor(Math.random() * 11) - 5; // random change between -5 to +5
  moisture = Math.max(0, Math.min(100, moisture + change));
  updateMoisture();

  // Auto Mode Logic
  if (autoMode.checked && moisture < 40 && !pumpOn) {
    togglePump(true);
  } else if (autoMode.checked && moisture >= 40 && pumpOn) {
    togglePump(false);
  }

  // Update chart
  labels.push(new Date().toLocaleTimeString());
  moistureData.push(moisture);
  if (labels.length > 10) {
    labels.shift();
    moistureData.shift();
  }
  moistureChart.update();

}, 3000);

function updateMoisture() {
  moistureFill.style.width = moisture + "%";
  moistureText.innerText = moisture + "%";
}

pumpBtn.addEventListener("click", () => {
  togglePump(!pumpOn);
});

function togglePump(state) {
  pumpOn = state;
  if (pumpOn) {
    pumpBtn.textContent = "Pump: ON";
    pumpBtn.classList.remove("off");
    lastWatered.textContent = new Date().toLocaleTimeString();
  } else {
    pumpBtn.textContent = "Pump: OFF";
    pumpBtn.classList.add("off");
  }
}

// Update tip every 6 seconds
setInterval(() => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  tipText.textContent = tip;
}, 6000);
