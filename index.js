const canvas = document.getElementById("donut");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let A = 0, B = 0;

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  const zBuffer = [];
  const chars = [];

  for (let i = 0; i < 1760; i++) {
    zBuffer[i] = 0;
    chars[i] = " ";
  }

  for (let j = 0; j < 6.28; j += 0.07) {
    for (let i = 0; i < 6.28; i += 0.02) {
      const c = Math.sin(i),
            d = Math.cos(j),
            e = Math.sin(A),
            f = Math.sin(j),
            g = Math.cos(A),
            h = d + 2,
            D = 1 / (c * h * e + f * g + 5),
            l = Math.cos(i),
            m = Math.cos(B),
            n = Math.sin(B),
            t = c * h * g - f * e,
            x = Math.floor(width / 2 + 30 * D * (l * h * m - t * n)),
            y = Math.floor(height / 2 + 15 * D * (l * h * n + t * m)),
            o = x + width * y,
            N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

      const charList = ".,-~:;=!*#$@";

      if (y >= 0 && y < height && x >= 0 && x < width && D > zBuffer[o]) {
        zBuffer[o] = D;
        ctx.fillStyle = "white";
        ctx.fillText(charList[N > 0 ? N : 0], x, y);
      }
    }
  }

  A += 0.04;
  B += 0.02;
  requestAnimationFrame(render);
}

ctx.font = "10px monospace";
render();