let kotak, operasi, ekspresi;
ekspresi = '';
let sudahHasil = false; // belum menampilkan hasil
const hasil = document.querySelector('.hasil');
// mengambil semua tombol
document.querySelectorAll('.kotak').forEach(function (isiKotak) {
  // .querySelectorAll tidak bisa langsung diberi .onclick

  isiKotak.onclick = function () {
    kotak = isiKotak.dataset.value || isiKotak.textContent;
    // ketika tombol 5 diklik maka jadi kotak = '5'; jika 7 maka kotak = '7'; dst...
    console.log(kotak);

    // tombol AC
    if (kotak === 'AC') {
      ekspresi = ''; // ini berfungsi untuk mereset stringnya menjadi kosong
      hasil.textContent = '0'; // setelah kosong, menampilkan 0
      sudahHasil = true;
      return; // untuk memberhentikan fungsi .onclick
    }

    // tombol back space
    if (kotak === 'back') {
      //jika kotak mengandung value 'back', (benar/true)
      if (ekspresi.slice(-4) === '/100') {
        // jika 4 karakter terakhir dari ekspresi adalah /100,
        ekspresi = ekspresi.slice(0, -4); // maka hapus 4 karakter dari belakang.
      } else {
        ekspresi = ekspresi.slice(0, -1); // kalau bukan /100, maka hapus 1 karakter saja.
      }
      hasil.textContent = ekspresi.replace(/\*/g, 'x').replace(/\//g, '÷').replace(/\/100/g, '%') || '0'; // kemudian ekspresi yg baru ditampilkan
      // || '0'; diatas berguna agar hasil akhir ketika dibackspace tidak kosong, malainkan terisi dengan '0'
      return;
    }

    // // persen
    // if (kotak === '/100') {
    //   ekspresi += '/100';
    //   hasil.textContent = ekspresi.replace(/\/100/g, '%');
    //   // .replace() berfungsi untuk mengganti teks.
    //   //  '/' adalah pembuka regex (regular expresiion)
    //   // '\' untuk escape
    //   // '/g' -> flag global = ganti semua yang cocok. jika tidak ada ini maka % yang ditampilkan hanya yang pertama, seterusnya tetap menggunakan /100.
    //   return;
    // }

    // // kali
    // if (kotak === '*') {
    //   ekspresi += '*';
    //   hasil.textContent = ekspresi.replace(/\*/g, 'x');
    //   // .replace() berfungsi untuk mengganti teks.
    //   //  '/' adalah pembuka regex (regular expresiion)
    //   // '\' untuk escape
    //   // '/g' -> flag global = ganti semua yang cocok. jika tidak ada ini maka % yang ditampilkan hanya yang pertama, seterusnya tetap menggunakan /100.
    //   return;
    // }

    // // bagi
    // if (kotak === '/') {
    //   ekspresi += '/';
    //   hasil.textContent = ekspresi.replace(/\//g, '÷');
    //   // .replace() berfungsi untuk mengganti teks.
    //   //  '/' adalah pembuka regex (regular expresiion)
    //   // '\' untuk escape
    //   // '/g' -> flag global = ganti semua yang cocok. jika tidak ada ini maka % yang ditampilkan hanya yang pertama, seterusnya tetap menggunakan /100.
    //   return;
    // }

    if (sudahHasil && !isNaN(kotak)) {
      // untuk mengecek apakah kotak yg ditekan adalah angka
      ekspresi = kotak; // reset isi ekspresi menjadi angka baru
      hasil.textContent = ekspresi; // tampilkan ekspresi baru
      sudahHasil = false; // kembalikan ke nilai awal (false)
      return;
    }
    if (sudahHasil && isNaN(kotak)) {
      // mengecek apakah kotak yg ditekan merupakan operator (bukan angka)
      ekspresi += kotak;
      hasil.textContent = ekspresi.replace(/\*/g, 'x').replace(/\//g, '÷').replace(/\÷100/g, '%');
      sudahHasil = false;
      return;
    }

    // tombol sama dengan
    if (kotak === '=') {
      try {
        hasil.textContent = eval(ekspresi); // hitung nilai dari ekspresi string
        ekspresi = hasil.textContent;
        sudahHasil = false; // hasil sudah keluar
      } catch (error) {
        // apabila error,
        hasil.textContent = 'error'; // maka kerjakan perintah ini
      }
      return; // agar perintah yg di bawah tidak dijalankan.
      // apabila tidak menggunakan return, coba saja sendiri.
    }

    if (hasil === 'error') {
      ekspresi = '';
      hasil.textContent = ekspresi;
      sudahHasil = true;
      return;
    }
    ekspresi += kotak;
    hasil.textContent = ekspresi.replace(/\*/g, 'x').replace(/\//g, '÷').replace(/\÷100/g, '%');

    // Kalau variabel ekspresi ditulis di luar function,
    //  maka isinya bisa ditambahkan dari dalam function onclick,
    //  dan bisa ditampilkan ke layar secara terus-menerus (angka akan bertambah)

    // Tapi kalau ekspresi ditulis di dalam function (pakai let ekspresi = ""),
    //  maka setiap kali tombol diklik, ekspresi selalu mulai dari kosong lagi,
    //  dan hasil yang tampil hanya satu angka saja.
  };
});
