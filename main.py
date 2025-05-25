# Donat ASCII 3D ini terinspirasi dari "donut.c" karya Andy Sloane.
# Kode telah dimodifikasi oleh Jefanniel Nathan.
import math
import time
import sys

sudut_A = 0
sudut_B = 0

# Bersihkan layar sekali di awal
print("\x1b[2J", end='')

while True:
    kedalaman = [0] * 1760   # Z-buffer
    layar = [' '] * 1760     # Buffer karakter

    for j in range(0, 628, 7):      # sudut j dari 0 sampai 2π
        for i in range(0, 628, 2):  # sudut i dari 0 sampai 2π
            sin_i = math.sin(i)
            cos_j = math.cos(j)
            sin_A = math.sin(sudut_A)
            sin_j = math.sin(j)
            cos_A = math.cos(sudut_A)
            jarak = cos_j + 2
            pembalik = 1 / (sin_i * jarak * sin_A + sin_j * cos_A + 5)
            cos_i = math.cos(i)
            cos_B = math.cos(sudut_B)
            sin_B = math.sin(sudut_B)

            t = sin_i * jarak * cos_A - sin_j * sin_A

            x = int(40 + 30 * pembalik * (cos_i * jarak * cos_B - t * sin_B))
            y = int(12 + 15 * pembalik * (cos_i * jarak * sin_B + t * cos_B))
            indeks = int(x + 80 * y)

            kecerahan = int(8 * ((sin_j * sin_A - sin_i * cos_j * cos_A) * cos_B
                                 - sin_i * cos_j * sin_A - sin_j * cos_A
                                 - cos_i * cos_j * sin_B))

            if 0 < indeks < 1760 and pembalik > kedalaman[indeks]:
                kedalaman[indeks] = pembalik
                karakter = ".,-~:;=!*#$@"
                layar[indeks] = karakter[max(kecerahan, 0)]

    # Kembalikan kursor ke kiri atas dan cetak layar baru
    sys.stdout.write("\x1b[H")
    for baris in range(0, 1760, 80):
        sys.stdout.write("".join(layar[baris:baris+80]) + "\n")
    sys.stdout.flush()

    sudut_A += 0.04
    sudut_B += 0.08
    time.sleep(0.03)
