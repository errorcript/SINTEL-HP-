# 🗺️ Roadmap SINTEL-HP

Dokumen ini berisi daftar ide dan rencana pengembangan fitur **SINTEL-HP** ke depannya. Kalau lu punya ide gila lain, lu bisa langsung nambahin ke sini atau bikin PR!

## ⏳ To Do (Segera Dieksekusi)
- [ ] **WhatsApp OSINT Checker**: Integrasi API WhatsApp (via Baileys/Unofficial API) buat nyedot Foto Profil Terakhir (HD) dan Status (About) target otomatis cuma lewat input nomor. Biar penampakan muka penipu keliatan.
- [ ] **Reverse Rekening / E-Wallet Checker**: Fitur spesifik untuk nyari nama asli pemilik (KYC Name) rekening Bank lokal dan E-Wallet (OVO, GoPay, DANA) melalui API checker (Contoh: Flip/Oy!). Target telanjang bulet sesuai KTP.
- [ ] **Auto-Scrape Database Penipu (Puppeteer/Playwright)**: Bypass CloudFlare atau sistem *anti-bot* dari situs semacam kredibel.co.id/cekrekening.id buat nampilin *direct result* riwayat pelaporan target langsung ke *dashboard* atau CLI, nggak cuma lempar dork lagi.

## 🏃 In Progress
- *Belum ada fitur besar yang sedang dikerjakan saat ini.*

## ✅ Selesai (MVP / V1.0)
- [x] **Validasi Nomor & Provider (Global Format)** (libphonenumber-js).
- [x] **HLR (Home Location Register) Region Lookup** (Prediksi provinsi kartu perdana aktif).
- [x] **Truecaller Auto-Doxx Integration** (Tarik nama).
- [x] **Dork Generator** (Buat Google search jejak digital otomatis).
- [x] **LIVE GPS TRACKER & SILENT IP LOGGER (Server-Side by Vercel)** (Bypass Adblock, auto-shorten link via is.gd).
- [x] **Advanced Device Fingerprinting (Logger Level 2)**: Nyedot Status Baterai, Info GPU, CPU Cores, dan Resolusi Layar secara otomatis.
- [x] **Glassmorphism Web Dashboard** untuk Live Tracker via ntfy.

---

*"Gasskeun intelijen maya."* 🛠️💀
