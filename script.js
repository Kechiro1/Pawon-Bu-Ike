// 1. DATA MASTER (Silakan tambah produk baru di sini)
const foodData = [
    {
        id: 1,
        name: "Ayam Cabai Hijau",
        price: 40000,
        category: "Ayam",
        image: "img/Ayamcabaihijau.jpeg",
        description: "Ayam goreng lezat dengan ulekan cabai hijau asli."
    },
    {
        id: 2,
        name: "Bolu Pandan",
        price: 30000,
        category: "Bolu", 
        image: "img/BoluPandan.jpeg",
        description: "Bolu lembut dengan aroma pandan alami."
    },
    {
        id: 3,
        name: "Bolu Pisang",
        price: 25000,
        category: "Bolu",
        image: "img/BoluPisang.jpeg",
        description: "Kue pisang manis dan legit."
    },
    {
        id: 4,
        name: "Bolu Ketan Hitam",
        price: 15000,
        category: "Bolu",
        image: "img/BoluKetanHitam.jpeg",
        description: "Olahan ketan hitam premium."
    },
    // Contoh penambahan produk baru untuk ngetes sistem grid:
    {
        id: 5,
        name: "Ayam Lada Hitam",
        price: 45000,
        category: "Ayam",
        image: "img/AyamLadaHitam.jpeg",
        description: "Ayam goreng dengan saus lada hitam yang menggugah selera."
    },
    {
        id: 6,
        name: "Nasi Uduk",
        price: 35000,
        category: "Nasi",
        image: "img/NasiUduk.jpeg",
        description: "Nasi uduk gurih dengan berbagai lauk pilihan."
    }
];

// Variabel untuk kontrol jumlah tampilan
let isShowAll = false;
const initialLimit = 8; 

// 2. FUNGSI UNTUK MENAMPILKAN MENU
function displayMenuFoods(category = 'all') {
    const menuFoods = document.getElementById('menuFoods');
    if (!menuFoods) return;
    
    menuFoods.innerHTML = '';
    
    // Filter berdasarkan kategori
    let filteredFoods = category === 'all' 
        ? foodData 
        : foodData.filter(food => food.category === category);
    
    // Logika "Lihat Selengkapnya": jika tidak 'all', tampilkan semua. 
    // Jika 'all' dan isShowAll false, batasi jumlahnya.
    const foodsToDisplay = (category === 'all' && !isShowAll) 
        ? filteredFoods.slice(0, initialLimit) 
        : filteredFoods;

    foodsToDisplay.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'col-3 food-card'; 
        
        foodCard.innerHTML = `
            <div class="card-content" style="background: white; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 25px; overflow: hidden; display: flex; flex-direction: column; height: 100%;">
                <img src="${food.image}" alt="${food.name}" style="width:100%; height:200px; object-fit:cover;">
                <div class="food-info" style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${food.name}</h3>
                        <p style="font-size: 0.8rem; color: #666; margin-bottom: 10px; min-height: 40px;">${food.description}</p>
                        <span class="price" style="font-weight: bold; color: #1e3c72; display: block; margin-bottom: 15px;">Rp ${food.price.toLocaleString()}</span>
                    </div>
                    
                    <a href="https://wa.me/6281234567890?text=Halo%20Bu%20Ike,%20saya%20mau%20pesan%20${food.name}" 
                       target="_blank" 
                       class="btn" 
                       style="display: block; text-align: center; padding: 12px; text-decoration: none; background: #1e3c72; color: white; border-radius: 8px; font-size: 0.85rem; font-weight: 600; border: none;">
                       Pesan Yuk!
                    </a>
                </div>
            </div>
        `;
        menuFoods.appendChild(foodCard);
    });

    // Munculkan/Hilangkan tombol "Lihat Selengkapnya"
    updateLoadMoreButton(filteredFoods.length, category);
}

// 3. FUNGSI TOMBOL LOAD MORE
function updateLoadMoreButton(totalData, currentCategory) {
    let btnMore = document.getElementById('btnMoreContainer');
    
    // Jika data sedikit atau sedang difilter kategori tertentu, hapus tombolnya
    if (totalData <= initialLimit || currentCategory !== 'all' || isShowAll) {
        if (btnMore) btnMore.remove();
        return;
    }

    // Jika belum ada tombolnya, buat baru
    if (!btnMore) {
        const container = document.createElement('div');
        container.id = 'btnMoreContainer';
        container.style.cssText = "text-align: center; width: 100%; margin-top: 20px; margin-bottom: 50px;";
        container.innerHTML = `
            <button id="loadMoreBtn" style="padding: 12px 30px; background: none; border: 2px solid #1e3c72; color: #1e3c72; border-radius: 50px; cursor: pointer; font-weight: bold; transition: 0.3s;">
                Lihat Menu Selengkapnya
            </button>
        `;
        document.getElementById('menuFoods').after(container);

        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            isShowAll = true;
            displayMenuFoods('all');
        });
    }
}

// 4. FUNGSI FILTER
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            isShowAll = false; // Reset saat pindah kategori
            displayMenuFoods(category);
        });
    });
}

// 5. INISIALISASI
document.addEventListener('DOMContentLoaded', function() {
    displayMenuFoods('all'); 
    setupFilterButtons();
});