document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEM FILTER PROYEK
    // ==========================================
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas aktif dari tombol lama
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas aktif ke tombol yang diklik
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    card.classList.remove('hide');
                } else if (cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================
    // 2. VALIDASI FORM HUBUNGI SAYA
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (event) => {
        // Mencegah form melakukan refresh halaman default
        event.preventDefault();

        // Bersihkan spasi kosong di awal/akhir input
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Variabel penanda status validitas
        let hasError = false;
        let errorMessage = '';

        // Validasi kelengkapan data input
        if (nameValue === '' || emailValue === '' || messageValue === '') {
            hasError = true;
            errorMessage = 'Semua data input wajib diisi.';
        } else if (!validateEmail(emailValue)) {
            hasError = true;
            errorMessage = 'Format email tidak valid.';
        }

        // Tampilkan feedback berdasarkan hasil validasi
        if (hasError) {
            formFeedback.textContent = errorMessage;
            formFeedback.className = 'form-feedback error';
        } else {
            // Tampilkan pesan sukses berwarna hijau
            formFeedback.textContent = 'Pesan berhasil dikirim.';
            formFeedback.className = 'form-feedback success';
            
            // Reset isi form setelah berhasil dikirim
            contactForm.reset();
        }
    });

    // Fungsi utilitas untuk memeriksa format email menggunakan Regex
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});