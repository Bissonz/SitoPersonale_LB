document.addEventListener('DOMContentLoaded', function () {

    // ==============================
    // TITOLO WELCOME — rotazione lingue
    // ==============================
    const messages = [
        "नमस्ते!",
        "Hello!",
        "مرحبا!",
        "¡Hola!",
        "こんにちは！",
        "Bonjour!",
        "안녕하세요!",
        "Привет!",
        "היי!",
        "Здравейте!",
        "Ciao!",
        "你好！"
    ];

    let index = 0;
    const title = document.getElementById('welcome-title');

    function changeTitle() {
        title.classList.add('welcome-fade');
        setTimeout(() => {
            index = (index + 1) % messages.length;
            title.textContent = messages[index];
            title.classList.remove('welcome-fade');
        }, 600);
    }

    setInterval(changeTitle, 2500);

    // ==============================
    // WIDGET FLOTTANTE — highlight sezione attiva
    // ==============================
    const sections = ['sezione-biografia', 'sezione-materie', 'sezione-pcto'];
    const floatLinks = document.querySelectorAll('.float-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    current = id;
                }
            }
        });
        floatLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // Scroll fluido per i link del widget
    floatLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

// ==============================
// ACCORDION BIOGRAFIA
// ==============================
function toggleAcc(id) {
    const item = document.getElementById(id);
    item.classList.toggle('open');
}

// ==============================
// EXPAND / COLLAPSE CARD (Materie e PCTO)
// ==============================
function toggleCard(btn) {
    const card = btn.closest('.grid-item');
    const isExpanded = card.classList.toggle('expanded');
    btn.innerHTML = isExpanded
        ? '<i class="ti ti-chevron-down"></i> Mostra meno'
        : '<i class="ti ti-chevron-down"></i> Leggi di più';
}
