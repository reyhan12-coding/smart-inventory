# 📦 SmartInventory Management System

![Project Status](https://img.shields.io/badge/Status-Live_Demo_Available-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)

**SmartInventory** adalah aplikasi web manajemen inventaris modern yang dirancang untuk membantu Usaha Kecil Menengah (UKM) memantau stok barang secara efisien, *real-time*, dan akurat.

Project ini dibangun sebagai **Portofolio Full Stack** untuk mendemonstrasikan kemampuan integrasi antara Frontend modern (Next.js) dan Backend-as-a-Service (Supabase).

---

## 🌐 Live Demo
Cobalah aplikasi ini secara langsung tanpa perlu instalasi:
### 👉 [KLIK DISINI UNTUK MEMBUKA WEBSITE](https://smart-inventory-reyhanarrafifathalla.vercel.app/)


---

## 📸 Tampilan Aplikasi
*(Gambar di atas menunjukkan antarmuka dashboard monitoring stok barang)*

---

## ✨ Fitur Utama

Aplikasi ini memiliki fitur **CRUD (Create, Read, Update, Delete)** lengkap:

* **Dashboard Monitoring:** Melihat ringkasan total barang dan stok yang menipis.
* **Manajemen Barang:**
    * ✅ **Create:** Menambah barang baru dengan detail (Nama, Kategori, Harga, Stok).
    * ✅ **Read:** Menampilkan daftar barang secara real-time dari database.
    * ✅ **Update:** Mengedit informasi barang yang sudah ada.
    * ✅ **Delete:** Menghapus barang dari inventaris.
* **Real-time Database:** Data langsung tersimpan aman di Supabase (PostgreSQL).
* **Responsive Design:** Tampilan optimal di Desktop, Tablet, dan Smartphone.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

Project ini dibangun menggunakan standar industri terkini:

| Kategori | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 14 (App Router)](https://nextjs.org/) | Framework React utama untuk performa & SEO. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework. |
| **Backend & DB** | [Supabase](https://supabase.com/) | PostgreSQL Database & Auto API generation. |
| **Deployment** | Vercel | Cloud platform untuk hosting aplikasi Next.js. |

---

## 🚀 Cara Menjalankan di Lokal (Installation)

Jika Anda ingin melihat kode sumber dan menjalankannya di komputer lokal:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/reyhan12-coding/smart-inventory
    cd smart-inventory
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` dan isi dengan kredensial Supabase Anda:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Tentang Pembuat

Project ini dibuat oleh **[Reyhan Arrafif Athalla]**, mahasiswa Teknik Informatika Semester 5.

Saya memiliki ketertarikan kuat pada **Software Engineering** dan **Web Development**. Saat ini saya sedang mencari kesempatan **Magang (Internship)** untuk berkontribusi dan belajar lebih jauh di lingkungan profesional.

* 📧 **Email:** [antnest15@gmail.com]
* 🐙 **GitHub:** [https://github.com/reyhan12-coding](https://github.com/reyhan12-coding)

---

> *Dibuat dengan ❤️ menggunakan Next.js dan Supabase.*
