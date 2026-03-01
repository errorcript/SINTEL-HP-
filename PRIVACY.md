# ⚖️ Privacy Policy & Disclaimer - SINTEL-HP
> **Version 1.2 - Last Updated: March 1, 2026**

---

## 🇮🇩 Bahasa Indonesia (ID)

### 🛡️ Pendahuluan
SINTEL-HP (Mata Penipu) adalah alat **Open Source Intelligence (OSINT)** yang dirancang untuk membantu pengguna melakukan investigasi defensif terhadap indikasi tindak penipuan. Kami menghormati privasi dan pelindungan data sesuai dengan **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** di Indonesia.

### 🔍 1. Data yang Dikumpulkan oleh Sistem
Alat ini bekerja dengan mekanisme "Target Logging". Data yang dapat ditarik oleh sistem saat target berinteraksi meliputi:
- **Alamat IP & Geo-IP:** Digunakan untuk mengidentifikasi lokasi kasar, ISP, dan wilayah koneksi.
- **Koordinat GPS Akurat:** Hanya diambil jika target memberikan izin eksplisit (*Explicit Consent*) melalui browser.
- **Fingerprinting Perangkat:** Meliputi tipe OS, resolusi layar, tipe GPU (WebGL), status baterai, CPU cores, dan User-Agent.
- **Data Jaringan:** Tipe koneksi (4G/Wifi), kecepatan *downlink*, dan zona waktu (Timezone).

### 💾 2. Penyimpanan dan Keamanan Data
- **Transient Data:** Data bersifat sementara dan diteruskan secara *real-time* ke Dashboard pengguna melalui Server-Sent Events (SSE).
- **Zero Database Policy:** SINTEL-HP tidak menyimpan data target di database permanen milik pengembang. Data hanya tersimpan di memori browser pengguna.
- **Enkripsi:** Kami menyarankan penggunaan HTTPS untuk memastikan data tidak disadap selama transmisi.

### 🚫 3. Batasan Penggunaan (Prohibited Use)
Anda dilarang keras menggunakan SINTEL-HP untuk:
1. Melakukan pengintaian (stalking) terhadap individu yang tidak bersalah.
2. Tindakan intimidasi, pemerasan, bullying, atau pengancaman.
3. Melanggar privasi orang lain tanpa dasar hukum atau kebutuhan investigasi defensif yang sah.
4. Segala tindakan yang melanggar **UU ITE**.

### ⚖️ 4. Pernyataan Tanggung Jawab (Disclaimer)
- **User Risk:** Penggunaan alat ini sepenuhnya merupakan tanggung jawab pengguna akhir.
- **No Liability:** Developer tidak bertanggung jawab atas segala kerusakan, kerugian hukum, atau tuntutan pihak ketiga akibat penyalahgunaan alat ini.
- **As-Is:** Alat ini disediakan "apa adanya" tanpa jaminan akurasi data 100%.

---

## 🇺🇸 English (EN)

### 🛡️ Introduction
SINTEL-HP is an **Open Source Intelligence (OSINT)** tool designed for defensive investigation against fraudulent activities. We adhere to privacy principles in line with the **General Data Protection Regulation (GDPR)** and international data protection standards.

### 🔍 1. Detailed Data Collection
The system captures the following technical data during target interaction:
- **IP Address & Coarse Geo-IP:** Identifying ISP, organization, and regional location.
- **Precise GPS Coordinates:** Only captured with explicit user consent via the browser's Geolocation API.
- **Advanced Device Fingerprinting:** Includes OS version, screen resolution, WebGL GPU renderer, battery level/status, hardware concurrency (CPU), and User-Agent strings.
- **Network Metadata:** Connection type (4G/Wifi), downlink speed, language, and system timezone.

### 💾 2. Data Retention & Security
- **Transient Transmission:** All captured data is transient and transmitted in real-time to the user's local dashboard.
- **Zero Database Policy:** We do not store target data on our developer servers. Captured data remains within the user's active browser session.
- **Encryption Standards:** We strongly recommend deploying via HTTPS to protect data integrity during transit.

### 🚫 3. Acceptable Use Policy (AUP)
Users are strictly prohibited from using SINTEL-HP for:
- Unlawful surveillance, stalking, or harassment of innocent individuals.
- Extortion, cyber-bullying, or any form of digital intimidation.
- Any actions violating international cyber-crime laws or the **Computer Misuse Act**.

### ⚖️ 4. Disclaimer of Liability
- **Assumption of Risk:** Deployment and use of this software are at the user's sole risk.
- **Warranty Disclaimer:** This tool is provided "AS IS" without any warranties, express or implied.
- **Indemnification:** The developers shall not be held liable for any legal consequences, damages, or third-party claims resulting from the misuse of this software.

---
**Warning:** *Misuse of tracking technology for illegal activities may result in severe criminal penalties.*
