# WHATSAPP-AUTOMATIC-BOT-MESSAGE

# 📲 WA Broadcast - Panduan Lengkap

## Persiapan (sekali saja)

### 1. Install Node.js
Download di https://nodejs.org → pilih versi LTS → install.

Cek berhasil:
```
node -v
npm -v
```

### 2. Install dependencies
Buka terminal/CMD di folder ini, lalu jalankan:
```
npm init -y
npm install whatsapp-web.js qrcode-terminal
```

> ⚠️ Proses install bisa 2-5 menit, sabar ya.

---

## Edit Script

Buka file `index.js`, edit 2 bagian ini:

### Bagian 1 — Pesan
```js
const PESAN = `Tulis pesan kamu di sini`;
```

### Bagian 2 — Nomor
```js
const NOMOR_LIST = [
  '6281234567890',  // format: 62 + nomor (tanpa 0 di depan)
  '6289876543210',
  // dst...
];
```

**Contoh format nomor:**
| No HP        | Format di script |
|--------------|-----------------|
| 081234567890 | 6281234567890   |
| 089876543210 | 6289876543210   |

---

## Cara Jalankan

```
node index.js
```

Pertama kali akan muncul **QR Code** di terminal → scan dengan WhatsApp kamu
(WhatsApp > Perangkat Tertaut > Tautkan Perangkat)

Selanjutnya script otomatis kirim pesan ke semua nomor.

---

## Tips Agar Tidak Kena Ban ✅

- Delay default sudah 2 menit antar pesan 
- Jangan broadcast ke > 50 nomor sekaligus
- Gunakan nomor WA yang aktif dan sudah lama dipakai
- Hindari kata-kata spam (promo berlebihan, link mencurigakan)

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| QR tidak muncul | Pastikan sudah `npm install` |
| Auth gagal | Hapus folder `.wwebjs_auth`, jalankan ulang |
| Nomor tidak terkirim | Cek format nomor (harus awalan 62) |
| Error Puppeteer | Install Chrome/Chromium di komputer |
