# PRO CV STUDIO

Aplikasi pembuat CV berbasis HTML, CSS, dan JavaScript vanilla. Tanpa dependensi, tanpa build, tanpa server.

## Menjalankan
1. Ekstrak folder ini.
2. Buka `index.html` di browser modern (Chrome, Edge, Firefox, Safari).
3. Opsional: `python3 -m http.server 8000` lalu buka http://localhost:8000.

## Penggunaan
- Dashboard: buat, edit, duplikat, hapus CV. Import JSON untuk memulihkan cadangan.
- Editor: tab Isi, Desain, Periksa (skor ATS), Bantuan (writing assistant lokal).
- Unduh PDF / Cetak: dialog cetak browser, pilih "Simpan sebagai PDF". Ukuran kertas mengikuti pilihan A4 atau Letter.
- Cadangan: tombol JSON (salin atau unduh), lalu impor kembali dari dashboard.
- Pintasan: Ctrl+Z undo, Ctrl+Y redo, Ctrl+S simpan, Ctrl+P cetak.

## Penyimpanan
Data disimpan di `localStorage` browser pada perangkat yang sama (kunci `pcs.v1`). Tidak ada data yang dikirim ke server.

## Struktur
- `index.html` kerangka halaman
- `css/style.css` seluruh gaya (UI, template, cetak)
- `js/app.js` logika (data, editor, template, pratinjau, penyimpanan, ATS)
