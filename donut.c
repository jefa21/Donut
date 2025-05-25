#include <stdio.h>
#include <math.h>
#include <string.h>
#include <unistd.h>

int main() {
    float sudutA = 0, sudutB = 0;

    float kedalaman[1760];
    char layar[1760];

    printf("\x1b[2J");

    for (;;) {
        memset(layar, 32, 1760);       // Isi layar dengan spasi
        memset(kedalaman, 0, 7040);    // Isi kedalaman dengan nol

        // Perulangan dua sudut: j untuk lingkaran donat, i untuk rotasi bagian dalam
        for (float j = 0; j < 6.28; j += 0.07) {
            for (float i = 0; i < 6.28; i += 0.02) {
                float sinI = sin(i), cosI = cos(i);
                float sinJ = sin(j), cosJ = cos(j);
                float sinA = sin(sudutA), cosA = cos(sudutA);
                float sinB = sin(sudutB), cosB = cos(sudutB);

                float h = cosJ + 2;
                float jarak = 1 / (sinI * h * sinA + sinJ * cosA + 5);

                float t = sinI * h * cosA - sinJ * sinA;

                int x = 40 + 30 * jarak * (cosI * h * cosB - t * sinB);
                int y = 12 + 15 * jarak * (cosI * h * sinB + t * cosB);

                // Posisi dalam buffer 1D
                int pos = x + 80 * y;

                int indeksKar = 8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB);

                // Simpan karakter jika berada dalam batas layar
                if (y >= 0 && y < 22 && x >= 0 && x < 80 && jarak > kedalaman[pos]) {
                    kedalaman[pos] = jarak;
                    layar[pos] = ".,-~:;=!*#$@"[indeksKar > 0 ? indeksKar : 0];
                }
            }
        }

        printf("\x1b[H");

        // Tampilkan layar ke terminal
        for (int k = 0; k < 1760; k++) {
            putchar(k % 80 ? layar[k] : '\n');
        }

        sudutA += 0.04;
        sudutB += 0.02;

        usleep(30000);
    }

    return 0;
}
