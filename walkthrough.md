# Pembaruan Mekanik: Slot Crafting Berbasis Anvil

Sistem *crafting* telah diperbarui dengan sukses mengadopsi mekanisme **"Solusi B"** untuk mengontrol kecepatan progres permainan (*progression pacing*).

## Yang Telah Diimplementasikan:
1. **Sistem Kapasitas Slot**
   Sekarang, pemain tidak bisa lagi membuat barang tanpa batas secara bersamaan. Batas kapasitas ditentukan oleh level Anvil:
   - **Anvil Lv.0 - 2**: 2 Slot Crafting (Awal game, progres ketat)
   - **Anvil Lv.3 - 6**: 3 Slot Crafting (Mid-game awal)
   - **Anvil Lv.7 - 9**: 4 Slot Crafting (Mid-game pertengahan)
   - **Anvil Lv.10**: 5 Slot Crafting (Kapasitas maksimum)

2. **Antarmuka (UI) Baru di Crafting Table**
   - Menu *In Progress* telah diubah menjadi **Crafting Slots**.
   - Ini akan menampilkan visualisasi slot secara presisi:
     - **Active Slot**: Menampilkan progres bar dari *crafting* yang sedang berjalan.
     - **Empty Slot**: Slot kosong bergaya *dashed-border* abu-abu dengan status "Siap digunakan".
     - **Locked Slot (Teaser)**: Menampilkan 1 slot terkunci tepat di bawah slot yang tersedia (berwarna merah pastel dengan teks "🔒 Locked — Upgrade Anvil Lv.X") untuk secara psikologis memotivasi pemain melakukan upgrade.

3. **Tombol Craft Pintar**
   Jika seluruh slot Anda sedang terpakai, tombol "Craft" pada resep-resep di bawahnya akan secara otomatis berubah menjadi **"Slot Penuh"** dan dinonaktifkan hingga ada slot yang selesai (*free*).

4. **Info Upgrade Anvil**
   Deskripsi Anvil di bagian *Workshop* sekarang sudah diperbarui bunyinya menjadi: *"Mempercepat waktu craft & menambah Slot."*

Ini seharusnya akan secara drastis menyeimbangkan jumlah pendapatan koin dari pesanan yang bisa diselesaikan pemain di awal permainan, menciptakan siklus retensi ("tension") yang adiktif!
