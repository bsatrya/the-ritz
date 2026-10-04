# THE RITZ Puncak Dieng - Laporan Harian PWA

Proyek PWA untuk laporan harian kavling (LG / LT1 / LT2).

## Cara buka di VSCodium
1. Buka VSCodium
2. File > Open Folder > pilih folder `the-ritz-pwa`
3. Install extension "Live Server" (ritwickdey.LiveServer)
4. Klik kanan `index.html` > Open with Live Server

## Struktur
```
the-ritz-pwa/
├── index.html      # UI utama
├── app.js          # Logika simpan & gabung pagi+sore (localStorage)
├── manifest.json   # Konfigurasi PWA (nama, icon)
├── sw.js           # Service Worker biar offline & installable
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Fitur sesuai permintaan
- Jam kerja 07:30, laporan jam 08:00 & 16:00
- Data pagi tidak hilang saat tambah sore (kumulatif)
- No timestamp 09:22 (sudah dihapus)
- Nama project default: THE RITZ Puncak Dieng
- Icon rumah 3 lantai transparan
- WA Business biasa: tombol WA Pagi / WA Sore Full Day langsung buka wa.me

## Pengembangan selanjutnya
- Sambung ke Google Sheet: ganti save() dengan fetch ke Google Apps Script Web App
- Tambah foto: tambah <input type=file> dan simpan base64
- Build APK via PWABuilder atau Capacitor

## Deploy gratis
- Drag folder ke Netlify Drop atau Vercel -> langsung dapat link https yang bisa di-install di HP mandor.
