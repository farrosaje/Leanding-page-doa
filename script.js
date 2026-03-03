// ===== JS SEMRAWUT =====
// variabel random ga kepake
var x = 100;
let y = 'testing';
const z = [1,2,3,4,5];

// fungsi ga jelas
function testingSaja() {
    console.log('testing 123');
    return null;
}

// panggil fungsi ga jelas
testingSaja();

// ===== DATA BACAAN DZIKIR =====
const bacaanDzikir = [
    {
        arab: "سُبْحَانَ اللَّهِ",
        latin: "Subhanallah",
        arti: "Maha Suci Allah"
    },
    {
        arab: "الْحَمْدُ لِلَّهِ",
        latin: "Alhamdulillah",
        arti: "Segala puji bagi Allah"
    },
    {
        arab: "اللَّهُ أَكْبَرُ",
        latin: "Allahu Akbar",
        arti: "Allah Maha Besar"
    },
    {
        arab: "لَا إِلَهَ إِلَّا اللَّهُ",
        latin: "La ilaha illallah",
        arti: "Tiada Tuhan selain Allah"
    }
];

// ===== FUNGSI ANIMASI =====
function animasiTambah() {
    const tambahBtn = document.getElementById('tambahBtn');
    const counterValue = document.getElementById('counterValue');
    
    if (tambahBtn && counterValue) {
        // animasi tombol
        anime({
            targets: tambahBtn,
            scale: 0.95,
            duration: 100,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
        
        // animasi angka
        anime({
            targets: counterValue,
            scale: 1.1,
            duration: 150,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    }
}

function animasiGantiBacaan() {
    anime({
        targets: '.zikir-bacaan',
        opacity: 0.7,
        duration: 200,
        direction: 'alternate',
        easing: 'linear'
    });
}

function animasiTargetTercapai() {
    const notification = document.getElementById('notification');
    if (notification) {
        anime({
            targets: notification,
            opacity: 0.8,
            duration: 200,
            direction: 'alternate',
            loop: 1,
            easing: 'linear'
        });
    }
}

function animasiCompletion() {
    const completionArea = document.getElementById('completionArea');
    if (completionArea) {
        anime({
            targets: completionArea,
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
}

// ===== MAIN FUNCTION =====
document.addEventListener('DOMContentLoaded', function() {
    // ambil element2 yang diperlukan
    const counterValue = document.getElementById('counterValue');
    const tambahBtn = document.getElementById('tambahBtn');
    const resetBtn = document.getElementById('resetBtn');
    const targetSelect = document.getElementById('targetSelect');
    const targetValue = document.getElementById('targetValue');
    const notification = document.getElementById('notification');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const completionArea = document.getElementById('completionArea');
    
    const zikirArab = document.getElementById('zikirArab');
    const zikirLatin = document.getElementById('zikirLatin');
    const zikirArti = document.getElementById('zikirArti');
    const zikirSekarang = document.getElementById('zikirSekarang');
    const zikirSelanjutnya = document.getElementById('zikirSelanjutnya');

    // ini variable utama
    let count = 0;
    let target = 33;
    let indexBacaan = 0;
    let totalBacaan = bacaanDzikir.length;
    let semuaSelesai = false;
    
    // fungsi ganti bacaan
    function gantiBacaan() {
        if (indexBacaan < totalBacaan) {
            zikirArab.textContent = bacaanDzikir[indexBacaan].arab;
            zikirLatin.textContent = bacaanDzikir[indexBacaan].latin;
            zikirArti.textContent = bacaanDzikir[indexBacaan].arti;
            zikirSekarang.textContent = bacaanDzikir[indexBacaan].latin;
            
            if (indexBacaan + 1 < totalBacaan) {
                zikirSelanjutnya.textContent = bacaanDzikir[indexBacaan + 1].latin;
            } else {
                zikirSelanjutnya.textContent = "Selesai ✨";
            }
            
            animasiGantiBacaan();
        }
    }
    
    // fungsi cek selesai
    function cekSemuaSelesai() {
        if (indexBacaan >= totalBacaan) {
            semuaSelesai = true;
            document.querySelector('.zikir-bacaan').style.display = 'none';
            document.querySelector('.zikir-progress').style.display = 'none';
            completionArea.classList.add('show');
            tambahBtn.disabled = true;
            targetSelect.disabled = true;
            notification.classList.remove('show');
            progressBar.style.width = '100%';
            progressText.textContent = '100%';
            progressBar.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
            
            animasiCompletion();
            return true;
        }
        return false;
    }
    
    // fungsi update display
    function updateDisplay() {
        counterValue.textContent = count;
        
        let percentage = (count / target) * 100;
        if(percentage > 100) percentage = 100;
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
        
        if (count >= target && !semuaSelesai) {
            notification.classList.add('show');
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #e5b73b)';
            
            animasiTargetTercapai();
            
            let kelebihan = count - target;
            count = kelebihan;
            indexBacaan++;
            
            if (!cekSemuaSelesai()) {
                gantiBacaan();
                notification.innerHTML = '<i class="fas fa-book-open"></i> <span>Pindah ke ' + bacaanDzikir[indexBacaan].latin + '!</span>';
            }
            
            counterValue.textContent = count;
        } else if (!semuaSelesai) {
            notification.classList.remove('show');
            progressBar.style.background = 'linear-gradient(90deg, var(--ijo), var(--emas))';
            notification.innerHTML = '<i class="fas fa-flag-checkered"></i> <span>Selamat! Target tercapai!</span>';
        }
    }

    // event tombol tambah
    tambahBtn.onclick = function() {
        if (semuaSelesai) return;
        count++;
        updateDisplay();
        animasiTambah();
    };

    // event tombol reset
    resetBtn.onclick = function() {
        count = 0;
        indexBacaan = 0;
        semuaSelesai = false;
        
        document.querySelector('.zikir-bacaan').style.display = 'block';
        document.querySelector('.zikir-progress').style.display = 'flex';
        completionArea.classList.remove('show');
        
        tambahBtn.disabled = false;
        targetSelect.disabled = false;
        
        gantiBacaan();
        updateDisplay();
        
        notification.classList.remove('show');
        notification.innerHTML = '<i class="fas fa-flag-checkered"></i> <span>Selamat! Target tercapai!</span>';
        progressBar.style.background = 'linear-gradient(90deg, var(--ijo), var(--emas))';
    };

    // event ganti target
    targetSelect.addEventListener('change', function() {
        if (semuaSelesai) return;
        target = parseInt(this.value);
        targetValue.textContent = target;
        updateDisplay();
    });

    // panggil pertama kali
    gantiBacaan();
    updateDisplay();

    // keyboard shortcut
    document.onkeydown = function(e) {
        if (semuaSelesai) return;
        if (e.code === 'Space') {
            e.preventDefault();
            tambahBtn.click();
        }
        if (e.code === 'KeyR') {
            e.preventDefault();
            resetBtn.click();
        }
    };
});

// variabel ga kepake lagi
var a = 10;
var b = 20;
var c = a + b;
console.log('c = ' + c + ' (ga dipake)');

// comment sampah
/*
ini comment panjang
yang ga jelas
tapi biar keliatan rame
*/
