# 📖 TUTORIAL PENGGUNAAN SINTEL-HP (LOCAL MODE)

Selamat datang di pusat komando **SINTEL-HP**. Alat ini didesain buat investigasi mandiri terhadap nomor-nomor penipu. Berikut adalah panduan cara pakai 2 fitur andalan lu:

---

## 🚀 1. Cara Menjalankan Alat (Local Server)
Sebelum pake fiturnya, lu wajib nyalain "mesinnya" dulu di laptop lu:
1. Buka terminal di folder `mata-penipu`.
2. Jalankan perintah: `node local-server.js`.
3. Buka browser dan pergi ke: `http://localhost:3000`.

---

## 📱 2. Fitur: Lacak Nomor (HLR & Info)
Gunakan fitur ini kalo lu baru dapet nomor penipu dan pengen tau info dasarnya.
*   **Cara Pakai**: Masukkan nomor HP target (Contoh: `0812xxxx`).
*   **Hasil yang Didapat**:
    *   **Status**: Apakah nomor itu aktif di jaringan atau nomor abal-abal.
    *   **Provider**: Kartu apa yang dia pake (Telkomsel, Indosat, dll).
    *   **HLR Region**: Ini yang paling sakti. Lu bisa tau di **Provinsi/Kota mana** kartu itu pertama kali diaktifkan. Kalo dia ngaku di Jakarta tapi HLR-nya Medan, fiks dia bohong!
    *   **Truecaller**: Kalo lu udah pasang API, nama asli dia bakal nongol di sini.

---

## 🌍 3. Fitur: Live GPS Tracker (Link Jebakan)
Ini fitur buat nyari lokasi asli dia secara real-time.
*   **Langkah 1 (Setup)**: Masukkan "URL Palsu" buat ngalihin perhatian (Misal: `https://youtube.com` atau link paket J&T asli).
*   **Langkah 2 (Generate)**: Klik **"BUAT TRACKING LINK"**. Lu bakal dapet link jebakan dan dashboard radar bakal aktif.
*   **Langkah 3 (Kirim)**: Copas link jebakan itu, trus lu *shorten* (pake bit.ly atau s.id) biar gak curiga. Kirim ke si penipu!
*   **Langkah 4 (Pantau)**: JANGAN TUTUP TAB DASHBOARD. Begitu si penipu klik:
    *   **Suara BEEEEP** bakal bunyi di laptop lu.
    *   Data IP, ISP, dan Titik Koordinat otomatis muncul.
    *   Klik **"Buka Google Maps"** buat liat posisi dia di gang mana.

---

## 📡 4. Fitur Tambahan: Berbagi Dashboard (Mabar)
Kalo lu mau ngajak temen lu buat ikut mantau radar si penipu bareng-bareng:
1. Klik tombol **Share (Ikon Biru 📡)** di dashboard tracker yang lagi aktif.
2. Link dashboard khusus bakal ke-copy (Contoh: `.../?topic=sintel_xxx`).
3. Kirim link itu ke temen lu. 
4. Pas dia buka, dia bakal liat radar yang sama persis kayak lu. Kalian bisa koordinasi buat ngepung atau lapor bareng!

---

## 🛑 5. Cara Reset / Berhenti
Kalo misi udah kelar, klik tombol **Power (Ikon Merah ⭘)** buat ngebersihin log dan matiin koneksi radar.

---
*Ingat: Gunakan dengan bijak buat pertahanan diri dari penipu!* 🕵️‍♂️🔥
