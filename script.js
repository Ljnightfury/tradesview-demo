// Elements
const chartContainer = document.getElementById("chartContainer");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const symbolSelect = document.getElementById("symbolSelect");

// Chart canvas
let canvas = document.getElementById("chart");
let ctx = canvas.getContext("2d");

// Resize canvas to container
function resizeCanvas() {
    canvas.width = chartContainer.clientWidth;
    canvas.height = chartContainer.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Generate fake candlestick data
function generateCandles() {
    let candles = [];
    let price = 100;

    for (let i = 0; i < 50; i++) {
        let open = price;
        let close = price + (Math.random() * 10 - 5);
        let high = Math.max(open, close) + Math.random() * 5;
        let low = Math.min(open, close) - Math.random() * 5;

        candles.push({ open, close, high, low });
        price = close;
    }
    return candles;
}

let data = generateCandles();

// Draw candlesticks
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let candleWidth = canvas.width / data.length;

    data.forEach((c, i) => {
        let x = i * candleWidth + candleWidth / 4;
        let color = c.close > c.open ? "lime" : "red";

        // Wick
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 4, canvas.height - c.high);
        ctx.lineTo(x + candleWidth / 4, canvas.height - c.low);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.fillRect(
            x,
            canvas.height - c.open,
            candleWidth / 2,
            c.open - c.close
        );
    });
}

drawChart();

// Symbol change = refresh chart with new random prices
symbolSelect.addEventListener("change", () => {
    data = generateCandles();
    drawChart();
});

// Fullscreen Mode
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        chartContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
