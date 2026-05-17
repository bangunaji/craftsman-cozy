# Implementation Plan: Crafting Slots via Anvil Upgrade

Berdasarkan "Solusi B" yang Anda ajukan, ini adalah rencana penerapan mekanik slot crafting yang dibatasi oleh level Anvil untuk memperlambat laju progres (progression pacing) secara natural dan memberikan insentif lebih kuat untuk melakukan upgrade.

## Usulan Mekanik Slot
Fungsi `getMaxSlots(anvilLevel)` akan diatur sebagai berikut:
- **Level 0 - 2**: 2 Slot
- **Level 3 - 6**: 3 Slot
- **Level 7 - 9**: 4 Slot
- **Level 10**: 5 Slot

## Perubahan Kode

### 1. [MODIFY] `src/game/gameState.jsx`
- Menambahkan pemeriksaan di fungsi `startCraft` agar tidak bisa menambah antrean pesanan apabila `state.activeCrafts.length` sudah menyamai atau melebihi kapasitas maksimum slot yang dihitung dari level Anvil saat ini.
- Mengekspor utilitas kalkulasi `getMaxSlots(level)` agar dapat digunakan juga di komponen antarmuka (UI).

### 2. [MODIFY] `src/components/CraftingTable.jsx`
- Merombak area `active-crafts` yang tadinya hanya menampilkan list. Sekarang akan secara presisi me-render struktur "Slot":
  - **Slot Terpakai**: Menampilkan bar progres *(seperti yang ada sekarang)*.
  - **Slot Kosong**: Menampilkan slot kosong yang siap digunakan.
  - **Slot Terkunci (Teaser)**: Menampilkan 1 slot terkunci di bawahnya dengan teks (contoh: "🔒 Locked — Upgrade Anvil Lv.3") untuk memancing rasa penasaran pemain, kecuali jika pemain sudah max level.

### 3. [MODIFY] `src/game/gameConfig.js`
- Memperbarui deskripsi `anvil` (Landasan) dari sekadar "Mempercepat waktu craft" menjadi "Mempercepat waktu craft & menambah Slot."

## User Review Required
> [!IMPORTANT]
> Untuk mengisi jarak antar level (karena Anda hanya menyebutkan Lv.1-2, 3-4, 7-8, 10), saya mengusulkan pembagian: Lv.0-2 (2 slot), Lv.3-6 (3 slot), Lv.7-9 (4 slot), Lv.10 (5 slot). Apakah distribusi level ini sudah pas, atau Anda ingin menyesuaikannya?

Jika Anda setuju dengan pembagian batas level tersebut, silakan beri lampu hijau dan saya akan mulai mengkodingnya!
