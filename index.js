// Donat ASCII 3D ini terinspirasi dari "donut.c" karya Andy Sloane. 
// Kode telah dimodifikasi oleh Jefanniel Nathan.
const lebar = 80;
const tinggi = 24;

let sudutA = 0;
let sudutB = 0;
let warnaHue = 0;

const karakter = ".,-~:;=!*#$@";

function renderDonat() {
  const zBuffer = new Array(lebar * tinggi).fill(0);
  const layar = new Array(lebar * tinggi).fill(' ');

  for (let j = 0; j < 6.28; j += 0.07) {
    for (let i = 0; i < 6.28; i += 0.02) {
      const sinI = Math.sin(i), cosI = Math.cos(i);
      const sinJ = Math.sin(j), cosJ = Math.cos(j);
      const sinA = Math.sin(sudutA), cosA = Math.cos(sudutA);
      const sinB = Math.sin(sudutB), cosB = Math.cos(sudutB);

      const jarak = cosJ + 2;
      const pembalik = 1 / (sinI * jarak * sinA + sinJ * cosA + 5);
      const t = sinI * jarak * cosA - sinJ * sinA;

      const x = Math.floor(lebar / 2 + 30 * pembalik * (cosI * jarak * cosB - t * sinB));
      const y = Math.floor(tinggi / 2 + 15 * pembalik * (cosI * jarak * sinB + t * cosB));
      const indeks = x + lebar * y;

      let kecerahan = Math.floor(
        8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB
            - sinI * cosJ * sinA - sinJ * cosA
            - cosI * cosJ * sinB)
      );

      if (y >= 0 && y < tinggi && x >= 0 && x < lebar && pembalik > zBuffer[indeks]) {
        zBuffer[indeks] = pembalik;
        kecerahan = Math.max(0, Math.min(karakter.length - 1, kecerahan));
        layar[indeks] = karakter[kecerahan];
      }
    }
  }

  return layar.reduce((t, c, i) => {
    t += `<span class="donat">${c}</span>`;
    if ((i + 1) % lebar === 0) t += '<br>';
    return t;
  }, '');
}

function animasi() {
  document.getElementById('layar').innerHTML = renderDonat();
  sudutA += 0.07;
  sudutB += 0.03;
  requestAnimationFrame(animasi);
}

function ubahWarnaDasar() {
  warnaHue = (warnaHue + 30) % 360;
  document.documentElement.style.setProperty('--warna-dasar', `hsl(${warnaHue}, 100%, 70%)`);
}

setInterval(ubahWarnaDasar, 1000); // Ganti warna tiap sedetik
animasi();