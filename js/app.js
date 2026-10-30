/* ============================================================
   Kopi Nusantara - JavaScript utama
   Modul 6 : JavaScript dasar
   Modul 7 : DOM dan event
   Modul 8 : Validasi form
   ============================================================ */

/* ---------- Modul 6: data & fungsi dasar ---------- */
const menu = [
  { nama: "Kopi Wamena", harga: 18000 },
  { nama: "Kopi Susu", harga: 20000 },
  { nama: "Teh Tarik", harga: 15000 }
];

function hitungTotal(harga, jumlah) {
  let total = harga * jumlah;
  if (jumlah >= 5) {
    total = total * 0.9; // diskon 10% untuk pembelian minimal 5
  }
  return total;
}

function rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

for (let i = 0; i < menu.length; i++) {
  console.log(menu[i].nama + " : Rp" + menu[i].harga);
}
console.log("Total 5 Kopi Susu: Rp" + hitungTotal(20000, 5));

/* Tugas akhir Modul 6: total pendapatan dari array pesanan */
const pesanan = [
  { nama: "Maria", menu: "Kopi Susu", jumlah: 2, harga: 20000 },
  { nama: "Agus", menu: "Teh Tarik", jumlah: 3, harga: 15000 },
  { nama: "Daniel", menu: "Kopi Wamena", jumlah: 5, harga: 18000 }
];

function totalPendapatan(data) {
  let jumlahTotal = 0;
  for (const p of data) {
    jumlahTotal += hitungTotal(p.harga, p.jumlah);
  }
  return jumlahTotal;
}

console.log("Total pendapatan: Rp" + totalPendapatan(pesanan));

/* ---------- Modul 7: DOM & event ---------- */
const pilihMenu = document.getElementById("menu");
const inputJumlah = document.getElementById("jumlah");
const totalHarga = document.getElementById("total");

function updateTotal() {
  if (!pilihMenu || !inputJumlah || !totalHarga) return;
  const jumlah = Math.max(1, Number(inputJumlah.value) || 1);
  const hasil = hitungTotal(Number(pilihMenu.value), jumlah);
  totalHarga.textContent = rupiah(hasil);
}

if (pilihMenu && inputJumlah && totalHarga) {
  pilihMenu.addEventListener("change", updateTotal);
  inputJumlah.addEventListener("input", updateTotal);
  updateTotal();
}

/* Pencarian nama pelanggan pada tabel admin (Modul 7) */
const inputCari = document.getElementById("cari");
if (inputCari) {
  inputCari.addEventListener("input", function () {
    const kata = this.value.toLowerCase().trim();
    let tampil = 0;
    document.querySelectorAll("#tabelPesanan tbody tr").forEach(function (baris) {
      const nama = baris.cells[1] ? baris.cells[1].textContent.toLowerCase() : "";
      const cocok = nama.includes(kata);
      baris.style.display = cocok ? "" : "none";
      if (cocok) tampil++;
    });
    const info = document.getElementById("infoCari");
    if (info) info.textContent = tampil + " pesanan ditampilkan";
  });
}

/* Tombol Selesai pada setiap baris pesanan (Tugas Akhir Modul 7) */
document.querySelectorAll(".btn-selesai").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const baris = this.closest("tr");
    const status = baris.querySelector(".status");
    if (status) status.textContent = "Selesai";
    baris.classList.add("selesai");
    this.textContent = "Selesai ✓";
    this.disabled = true;
    this.classList.add("selesai");
  });
});

/* Total pendapatan pada tabel pesanan (Modul 2) */
function updateTotalPendapatan() {
  const selTotal = document.getElementById("totalPendapatan");
  if (!selTotal) return;
  let total = 0;
  document.querySelectorAll("#tabelPesanan tbody td[data-total]").forEach(function (sel) {
    total += Number(sel.dataset.total);
  });
  selTotal.textContent = rupiah(total);
}
updateTotalPendapatan();

/* ---------- Modul 8: validasi form pemesanan ---------- */
const formPesan = document.getElementById("formPesan");

if (formPesan) {
  formPesan.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const jumlah = Number(document.getElementById("jumlah").value);

    let valid = true;
    document.getElementById("errNama").textContent = "";
    document.getElementById("errHp").textContent = "";
    document.getElementById("errJumlah").textContent = "";
    const suksesPesan = document.getElementById("pesanSukses");
    suksesPesan.textContent = "";
    suksesPesan.className = "";

    if (nama.length < 3) {
      document.getElementById("errNama").textContent = "Nama minimal 3 huruf.";
      valid = false;
    }

    if (!/^08[0-9]{8,11}$/.test(hp)) {
      document.getElementById("errHp").textContent =
        "No. HP harus diawali 08 dan berisi 10-13 angka.";
      valid = false;
    }

    if (!jumlah || jumlah < 1) {
      document.getElementById("errJumlah").textContent = "Jumlah minimal 1.";
      valid = false;
    }

    if (valid) {
      const namaMenu = pilihMenu.options[pilihMenu.selectedIndex].text;
      const suksesPesan = document.getElementById("pesanSukses");
      suksesPesan.textContent =
        "Terima kasih " + nama + ", pesanan " + namaMenu + " x " + jumlah +
        " (" + totalHarga.textContent + ") diterima.";
      suksesPesan.className = "alert alert-success";
      formPesan.reset();
      updateTotal();
    }
  });
}

/* ---------- Modul 8: validasi form tambah menu (admin) ---------- */
const formTambahMenu = document.getElementById("formTambahMenu");

if (formTambahMenu) {
  formTambahMenu.addEventListener("submit", function (e) {
    e.preventDefault();

    const namaMenu = document.getElementById("namaMenu").value.trim();
    const kategori = document.getElementById("kategori").value;
    const harga = Number(document.getElementById("hargaMenu").value);
    const deskripsi = document.getElementById("deskripsiMenu").value.trim();

    let valid = true;
    document.getElementById("errNamaMenu").textContent = "";
    document.getElementById("errKategori").textContent = "";
    document.getElementById("errHargaMenu").textContent = "";
    const sukses = document.getElementById("pesanMenuSukses");
    sukses.textContent = "";
    sukses.className = "";

    if (namaMenu.length < 3) {
      document.getElementById("errNamaMenu").textContent =
        "Nama menu wajib diisi (minimal 3 huruf).";
      valid = false;
    }

    if (!kategori) {
      document.getElementById("errKategori").textContent = "Kategori wajib dipilih.";
      valid = false;
    }

    if (!harga || harga < 5000) {
      document.getElementById("errHargaMenu").textContent = "Harga minimal Rp5.000.";
      valid = false;
    }

    if (valid) {
      const tbody = document.querySelector("#tabelMenu tbody");
      if (tbody) {
        const baris = document.createElement("tr");
        baris.innerHTML =
          "<td>" + (tbody.rows.length + 1) + "</td>" +
          "<td>" + namaMenu + "</td>" +
          "<td>" + kategori + "</td>" +
          "<td>" + rupiah(harga) + "</td>";
        tbody.appendChild(baris);
      }
      sukses.textContent = "Menu \"" + namaMenu + "\" berhasil disimpan.";
      sukses.className = "alert alert-success";
      const infoJumlah = document.getElementById("jumlahMenu");
      if (infoJumlah && tbody) infoJumlah.textContent = tbody.rows.length + " menu";
      this.reset();
    }
  });
}
