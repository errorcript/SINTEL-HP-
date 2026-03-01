# ⚖️ Privacy Policy & Disclaimer - SINTEL-HP
> **Versi 1.0 - Terakhir Diperbarui: 1 Maret 2026**

## 🛡️ Pendahuluan
SINTEL-HP (Mata Penipu) adalah alat **Open Source Intelligence (OSINT)** yang dirancang untuk membantu pengguna melakukan investigasi defensif terhadap indikasi tindak penipuan (scam). Kami sangat menghargai privasi dan hak data pribadi sesuai dengan semangat **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** di Indonesia.

Penggunaan alat ini sepenuhnya merupakan tanggung jawab pengguna akhir. Dengan menggunakan SINTEL-HP, Anda menyetujui ketentuan yang tercantum dalam dokumen ini.

---

## 🔍 1. Data yang Dikumpulkan oleh Tool
Alat ini bekerja dengan mekanisme "Target Logging" melalui link jebakan (Trap Link). Data yang dapat ditarik oleh sistem saat target melakukan interaksi meliputi:
- **Alamat IP (Internet Protocol):** Digunakan untuk mengidentifikasi lokasi kasar dan penyedia layanan internet (ISP).
- **Koordinat GPS Presisi:** Hanya diambil jika target memberikan izin (explicit consent) pada browser mereka melalui HTML5 Geolocation API.
- **Informasi Perangkat (Fingerprinting):** Meliputi tipe OS (Android/iOS/Windows), resolusi layar, tipe GPU, status baterai, dan User-Agent browser.
- **Data Jaringan:** Tipe koneksi (4G/Wifi) dan perkiraan kecepatan internet.

## 💾 2. Penyimpanan dan Keamanan Data
- **Transient Data:** Data yang ditarik oleh tool ini bersifat sementara dan diteruskan secara *real-time* ke Dashboard pengguna melalui protokol Server-Sent Events (SSE).
- **Zero Database Policy:** SINTEL-HP (versi standar) tidak menyimpan data target di database permanen milik pengembang. Data hanya tersimpan di memori browser pengguna selama sesi berlangsung.
- **Enkripsi:** Kami menyarankan penggunaan HTTPS (SSL) untuk setiap deployment guna memastikan data tidak disadap oleh pihak ketiga selama transmisi.

## 🚫 3. Batasan Penggunaan (Acceptable Use Policy)
Anda dilarang keras menggunakan SINTEL-HP untuk:
1. Melakukan pengintaian (stalking) terhadap individu yang tidak bersalah.
2. Tindakan intimidasi, pemerasan, atau pengancaman.
3. Melanggar privasi orang lain tanpa dasar hukum atau kebutuhan investigasi defensif yang sah.
4. Segala tindakan yang melanggar **UU ITE (Informasi dan Transaksi Elektronik)**.

## ⚖️ 4. Disclaimer (Pernyataan Ganti Rugi)
- **Developer SINTEL-HP** tidak bertanggung jawab atas segala kerusakan, kerugian hukum, atau tuntutan pihak ketiga yang timbul akibat penyalahgunaan alat ini oleh pengguna.
- Alat ini disediakan "AS IS" (apa adanya) tanpa jaminan ketersediaan layanan atau akurasi data 100%.
- Pengguna wajib menaati hukum yang berlaku di wilayah hukum masing-masing (khususnya Indonesia).

## 📩 5. Kontak & Kontribusi
Jika Anda menemukan kerentanan pada alat ini atau ingin melakukan komplain terkait penyalahgunaan link yang mengatasnamakan infrastruktur kami, silakan buka *Issue* di repositori resmi GitHub kami.

---
**Peringatan:** *Penyalahgunaan teknologi pelacakan untuk tindakan ilegal dapat berujung pada sanksi pidana.*
