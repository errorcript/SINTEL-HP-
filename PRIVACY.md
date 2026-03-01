# ⚖️ Privacy Policy & Disclaimer - SINTEL-HP
> **Version 1.3 - Comprehensive Global Standard**
> **Last Updated: March 2, 2026**

---

## 🇮🇩 Bahasa Indonesia (ID)

### 🛡️ 1. Pendahuluan dan Dasar Hukum
SINTEL-HP (Mata Penipu) adalah kerangka kerja **Open Source Intelligence (OSINT)** yang dikembangkan untuk tujuan investigasi defensif, keamanan siber, dan analisis data forensik digital. Kami berkomitmen untuk menghormati privasi data sesuai dengan:
- **UU No. 27 Tahun 2022** tentang Pelindungan Data Pribadi (UU PDP) - Indonesia.
- **UU No. 11 Tahun 2008** (dan perubahannya) tentang Informasi dan Transaksi Elektronik (UU ITE).
- Standar internasional seperti **GDPR (General Data Protection Regulation)** dan **APEC Privacy Framework**.

### 🔍 2. Klasifikasi Data yang Dikumpulkan
Sistem ini menggunakan teknik *Active Logging* untuk mengumpulkan metadata target. Data yang dikirimkan meliputi:

#### A. Informasi Identifikasi Jaringan
- **Alamat IP Publik (IPv4/IPv6):** Digunakan untuk melacak asal koneksi.
- **Data Geolocation Kasar:** Negara, Provinsi, Kota, Kode Pos, dan Koordinat estimasi berdasarkan database ISP.
- **Metadata ISP:** Nama provider, ASN (Autonomous System Number), dan tipe koneksi (Mobile/Broadband).

#### B. Informasi Perangkat (Advanced Fingerprinting)
- **Sistem Operasi:** Tipe, versi, dan arsitektur (misal: Android 14, iOS 17.2).
- **Web Browser:** Nama (Chrome/Safari), mesin rendering, dan versi spesifik.
- **Spesifikasi Hardware:** Jumlah core CPU (Logical Processors), memori RAM (estimasi), resolusi layar, dan kedalaman warna.
- **GPU Renderer:** Informasi grafis melalui WebGL (misal: Adreno, Apple GPU, Nvidia).
- **Status Hardware:** Level baterai, status pengisian daya, dan orientasi layar.

#### C. Lokasi Presisi (High-Accuracy GPS)
- **HTML5 Geolocation:** Sistem hanya akan mengakses koordinat lintang (latitude) dan bujur (longitude) secara presisi jika dan hanya jika target memberikan izin secara manual melalui dialog browser (*Opt-in Consent*).

### 💾 3. Retensi dan Keamanan Data
- **Transient Data Flow:** SINTEL-HP beroperasi dengan kebijakan "Zero Persistence". Data yang diambil diteruskan secara langsung (*streaming*) ke dashboard pengguna melalui protokol SSE (Server-Sent Events).
- **Lokalitas Data:** Pengembang resmi SINTEL-HP tidak memiliki akses ke data yang Anda kumpulkan. Semua data bersifat privat antara "Link Jebakan" dan "Dashboard" yang Anda operasikan sendiri.
- **Rekomendasi Keamanan:** Pengguna wajib menggunakan enkripsi **TLS/SSL (HTTPS)** pada server hosting untuk mencegah intersepsi data di jalur komunikasi (*Man-in-the-Middle attack*).

### 🚫 4. Ketentuan Penggunaan dan Larangan
Pengguna setuju untuk tidak menyalahgunakan SINTEL-HP untuk:
1. **Cyber-Stalking:** Melacak lokasi individu tanpa alasan hukum yang sah.
2. **Social Engineering Jahat:** Melakukan penipuan balik atau pemerasan (extortion).
3. **Pelanggaran Hak Asasi:** Melakukan doxxing atau publikasi data pribadi pihak yang tidak bersalah.
4. **Tindakan Kriminal:** Segala aktifitas yang melanggar hukum pidana di wilayah hukum masing-masing.

### ⚖️ 5. Penyangkalan Tanggung Jawab (Disclaimer)
- **Tanggung Jawab Mutlak:** Segala resiko hukum, teknis, dan sosial yang timbul dari penggunaan alat ini sepenuhnya berada di tangan pengguna.
- **Bantuan Hukum:** Pengembang **TIDAK** akan memberikan perlindungan hukum atau bantuan teknis bagi pengguna yang terjerat masalah hukum akibat penyalahgunaan alat ini.
- **Status Perangkat Lunak:** Kode ini disediakan secara terbuka (*Open Source*) dengan lisensi MIT, "apa adanya" tanpa garansi dalam bentuk apapun.

---

## 🇺🇸 English (EN)

### 🛡️ 1. Introduction and Legal Basis
SINTEL-HP is an **Open Source Intelligence (OSINT)** framework developed for defensive investigation, cybersecurity research, and digital forensic analysis. We are committed to data privacy alignment with:
- **General Data Protection Regulation (GDPR)** - European Union.
- **California Consumer Privacy Act (CCPA)** - USA.
- **Law No. 27 of 2022** regarding Personal Data Protection (UU PDP) - Indonesia.

### 🔍 2. Data Classification and Collection
The system utilizes *Active Logging* techniques to capture target metadata. The data transmitted includes:

#### A. Network Identification Information
- **Public IP Address (IPv4/IPv6):** Used to trace the origin of the connection.
- **Coarse Geolocation Data:** Country, Region, City, ZIP code, and estimated coordinates based on ISP databases.
- **ISP Metadata:** Provider name, ASN (Autonomous System Number), and connection type.

#### B. Advanced Device Fingerprinting
- **Operating System:** Type, version, and architecture (e.g., Android, iOS, Windows).
- **Web Browser:** Browser engine, specific version, and capabilities.
- **Hardware Specs:** CPU core count, estimated RAM, screen resolution, and color depth.
- **GPU Renderer:** Graphical hardware information via WebGL (e.g., Apple GPU, Adreno).
- **Hardware Status:** Battery level, charging state, and device orientation.

#### C. Precise Location (High-Accuracy GPS)
- **HTML5 Geolocation:** The system accesses precise Latitude and Longitude if and only if the target manually grants permission via the browser's permission dialog (*Opt-in Consent*).

### � 3. Data Retention and Security
- **Transient Data Flow:** SINTEL-HP operates under a "Zero Persistence" policy. Captured data is streamed in real-time to the user's dashboard via SSE (Server-Sent Events).
- **Data Sovereignty:** The developers of SINTEL-HP do NOT have access to any data you collect. All data remains private between the "Trap Link" and the "Dashboard" operated by the user.
- **Security Recommendation:** Users must implement **TLS/SSL (HTTPS)** encryption to prevent data interception during transmission (MITM protection).

### 🚫 4. Acceptable Use Policy (AUP)
Users are strictly prohibited from utilizing SINTEL-HP for:
1. **Cyber-Stalking:** Tracking individuals without a valid legal or investigatory basis.
2. **Malicious Social Engineering:** Fraudulent activities, extortion, or blackmail.
3. **Privacy Violation:** Doxxing or unauthorized publication of personal data.
4. **General Unlawful Acts:** Any activities that violate local or international cyber-laws.

### ⚖️ 5. Disclaimer of Liability
- **Assumption of Risk:** All legal, technical, and social risks arising from the use of this tool rest solely with the end user.
- **No Legal Support:** The developers **SHALL NOT** provide legal protection or technical assistance for users facing legal consequences due to misuse.
- **Software Status:** This source code is provided under the MIT License "AS IS," without any warranties of any kind.

---
**Warning:** *Unauthorized tracking or illegal surveillance is a criminal offense in most jurisdictions and may result in imprisonment or heavy fines.*
