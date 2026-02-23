# 🕵️ SINTEL-HP (Mata Penipu)
> "Jangan biarkan kang tipu tidur nyenyak malam ini."

SINTEL-HP adalah tool **Open Source Intelligence (OSINT)** praktis yang di-build khusus buat ngeberantas dan melacak jejak digital nomor penipu di Indonesia. Nggak cuma modal ngecek *provider*, SINTEL-HP udah di-steroid pake fitur pelacakan satelit!

## 🔥 Fitur Utama (Overpowered OSINT Toolkit)
- 📱 **Validasi Nomor & Provider**: Cek format nomor (Global Format) beserta jaringan providernya.
- 🗺️ **HLR (Home Location Register) Region Lookup**: Prediksi awal wilayah kota/provinsi darimana kartu perdana target tersebut diaktifkan/berasal.
- 🎭 **Truecaller Auto-Doxx**: Otomatis narik nama asli si oknum langsung ke layar (butuh setup Token *Truecaller* pribadi). 
- 🤖 **Dork Generator**: Nggak usah mikir! Tool ini otomatis nge-generate *Google Dorks Query* sakti buat nyari jejak lapak sosmed/rekening penipu di Facebook, Twitter, atau situs komplain publik.
- 🎯 **LIVE GPS TRACKER & IP LOGGER**: Bikin link jebakan (auto-shortened). Begitu link diklik penipu, lokasi *high-accuracy* (dikombo pake *HTML5 Geolocation API* satelit + fallback *Geo-IP Router*) bakal dikirim **REAL-TIME** ke Dashboard Tracker Vercel lu sambil ngasih alert sonar (Beep! Beep! 📡). Tanpa panel Discord/Telegram pihak ketiga!

---

## 🚀 Cara Pake via Web & Deployment (Vercel 1-Click)
App ini udah dibekali Web Interface (UI Cyber-Glassmorphism) dan 100% kompatibel *Zero-Config* bareng **Vercel Serverless Functions**. 

Lu bisa nge-host alat lacak lu sendiri secara **GRATIS** dan mandiri:
1. *Fork* / *Import* Repo ini ke Vercel lu (Settings -> Framework Preset: `Other`).
2. Tungguin 1 menit sampe Deploy selesai (Warna Ijo).
3. (Opsional) Kalo lu punya Auth token instalasi Truecaller, pasangin di settingan **Environment Variables** -> `TC_INSTALLATION_ID` di dalem Vercel. Kalo gapunya biarin aja.
4. Buka URL Web lu (contoh: `https://sintel.vercel.app`), pancing target lu pake tab **LIVE GPS TRACKER**. KORDINAT BAKAL MUNCUL DI LAYAR SECARA *LIVE*!

---

## 💻 Instalasi Lokal (CLI / Terminal Mode)
Kalo lu anak terminal keras dan maunya maen layar item-item, gas juga bosku! CLI version-nya tetep kece badai.

```bash
# Clone Repository
git clone https://github.com/errorcript/SINTEL-HP-.git
cd SINTEL-HP-

# Install Dependensi NPM
npm install

# Start Engine CLI
node main.js
```

---

## ⚠️ Disclaimer
**Alat ini murni diciptakan untuk EDUKASI dan PERTAHANAN DIRI (Investigasi OSINT Defensif)** demi membantu korban melacak identitas penipu/scammer yang merugikan. 
*Developer tidak bertanggung jawab atas segala bentuk penyalahgunaan alat ini (pengintaian ilegal, doxxing target tidak bersalah, stalking, pelanggaran UU ITE).*  
**Do it at your own risk!** ☕

***
*Dibuat oleh Neoma / Errorcript untuk dunia maya Indonesia yang lebih bersih.*
