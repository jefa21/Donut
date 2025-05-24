const lebar = 80;     // Lebar layar karakter
const tinggi = 24;    // Tinggi layar karakter

let sudutA = 0;
let sudutB = 0;

// Karakter kecerahan untuk shading
const karakterKecerahan = ".,-~:;=!*#$@";

// Fungsi utama untuk render donat
function renderDonat() {
  const zBuffer = new Array(lebar * tinggi).fill(0);
  const layar = new Array(lebar * tinggi).fill(' ');

  for (let j = 0; j < 6.28; j += 0.07) {       // j: sudut lingkaran luar
    for (let i = 0; i < 6.28; i += 0.02) {     // i: sudut lingkaran dalam
      const sinI = Math.sin(i);
      const cosJ = Math.cos(j);
      const sinA = Math.sin(sudutA);
      const sinJ = Math.sin(j);
      const cosA = Math.cos(sudutA);
      const jarak = cosJ + 2;
      const pembalik = 1 / (sinI * jarak * sinA + sinJ * cosA + 5);
      const cosI = Math.cos(i);
      const cosB = Math.cos(sudutB);
      const sinB = Math.sin(sudutB);

      const t = sinI * jarak * cosA - sinJ * sinA;

      const x = Math.floor(lebar / 2 + 30 * pembalik * (cosI * jarak * cosB - t * sinB));
      const y = Math.floor(tinggi / 2 + 15 * pembalik * (cosI * jarak * sinB + t * cosB));

      const indeks = x + lebar * y;

      const kecerahan = Math.floor(
        8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB
             - sinI * cosJ * sinA - sinJ * cosA
             - cosI * cosJ * sinB)
      );

      if (y >= 0 && y < tinggi && x >= 0 && x < lebar) {
        if (pembalik > zBuffer[indeks]) {
          zBuffer[indeks] = pembalik;
          layar[indeks] = karakterKecerahan[Math.max(kecerahan, 0)];
        }
      }
    }
  }

  // Gabungkan layar jadi string
  return layar.reduce((acc, cur, i) => {
    acc += cur;
    if ((i + 1) % lebar === 0) acc += '\n';
    return acc;
  }, '');
}

// Fungsi loop animasi
function animasi() {
  const elemenLayar = document.getElementById('layar');
  elemenLayar.textContent = renderDonat();

  sudutA += 0.07;
  sudutB += 0.03;

  requestAnimationFrame(animasi);
}

// Mulai animasi
animasi();