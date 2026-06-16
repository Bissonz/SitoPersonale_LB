document.addEventListener('DOMContentLoaded', function () {

    // ==============================
    // TITOLO WELCOME — rotazione lingue
    // ==============================
    const messages = [
        "Benvenuto!",           // Italiano
        "Welcome!",             // Inglese
        "¡Bienvenido!",         // Spagnolo
        "Bienvenue!",           // Francese
        "Willkommen!",          // Tedesco
        "Добро пожаловать!",    // Russo
        "أهلاً وسهلاً!",       // Arabo
        "ようこそ！",            // Giapponese
        "환영합니다!",           // Coreano
        "欢迎！",                // Cinese
        "Bem-vindo!",           // Portoghese
        "Välkommen!",           // Svedese
        "Καλώς ήρθες!",         // Greco
        "Welkom!",              // Olandese
        "Witamy!",              // Polacco
    ];

    let index = 0;
    const title = document.getElementById('welcome-title');

    if (title) {
        function changeTitle() {
            title.classList.add('welcome-fade');
            setTimeout(() => {
                index = (index + 1) % messages.length;
                title.textContent = messages[index];
                title.classList.remove('welcome-fade');
            }, 600);
        }
        setInterval(changeTitle, 2500);
    }

    // ==============================
    // WIDGET FLOTTANTE — sezione attiva
    // ==============================
    const floatLinks = document.querySelectorAll('.float-link');

    if (floatLinks.length > 0) {
        const sectionIds = Array.from(floatLinks).map(l => l.dataset.section);

        function updateActiveLink() {
            let current = '';
            sectionIds.forEach(id => {
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

        floatLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.getElementById(link.dataset.section);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

});

// ==============================
// ACCORDION BIOGRAFIA (index.html)
// ==============================
function toggleAcc(id) {
    document.getElementById(id).classList.toggle('open');
}

// ==============================
// EXPAND CARD (grid-item, index.html)
// ==============================
function toggleCard(btn) {
    const card = btn.closest('.grid-item');
    const isExpanded = card.classList.toggle('expanded');
    btn.innerHTML = isExpanded
        ? '<i class="ti ti-chevron-down"></i> Mostra meno'
        : '<i class="ti ti-chevron-down"></i> Leggi di più';
}

// ==============================
// CARD-BLOCK TOGGLE — usata ovunque
// (Materie, FSL dettaglio, Bio, ecc.)
// ==============================
function toggleBlock(id, btn) {
    const card = document.getElementById(id);
    const isOpen = card.classList.toggle('open');

    // Rimuove nodi di testo esistenti
    Array.from(btn.childNodes).forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) n.remove();
    });

    // Reinserisce testo corretto
    const arrow = btn.querySelector('i.arrow');
    btn.insertBefore(
        document.createTextNode(isOpen ? ' Nascondi ' : ' Argomenti svolti '),
        arrow
    );
}

// ==============================
// FSL — pannello unico (index.html)
// ==============================
const fslContents = {
    competenze:  "Ho rafforzato comunicazione professionale, documentazione del codice, code review e collaborazione tramite Git in un team reale. Ho anche acquisito autonomia nella risoluzione di problemi tecnici complessi.",
    progetti:    "Ho sviluppato un modulo per la reportistica automatizzata e partecipato alla progettazione di un pannello di amministrazione interno, dalla wireframe al codice finale.",
    riflessioni: "Il PCTO mi ha mostrato quanto sia diverso il lavoro reale dalla teoria scolastica. Ho capito l'importanza del team e della comunicazione. È stata la conferma che voglio lavorare nel settore IT."
};

let currentFsl = null;

function openFslPanel(key, btn) {
    const panel   = document.getElementById('fsl-panel');
    const text    = document.getElementById('fsl-panel-text');
    const allBtns = document.querySelectorAll('.fsl-btn');

    if (currentFsl === key) {
        panel.classList.remove('visible');
        btn.classList.remove('active');
        currentFsl = null;
        return;
    }

    allBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    text.textContent = fslContents[key];
    panel.classList.add('visible');
    currentFsl = key;
}

// ==============================
// BIOGRAFIA — pannello unico (index.html)
// ==============================
const bioContents = {
    percorso:  "Frequento l'Istituto Marconi Pieralisi, indirizzo Informatica e Telecomunicazioni. Ho acquisito basi solide in programmazione, reti e sistemi, partecipando a progetti scolastici e PCTO.",
    obiettivi: "Continuare gli studi in ingegneria del software o AI, contribuire a progetti open source e lavorare in un'azienda tech innovativa dove crescere professionalmente.",
    hobby:     "Programmazione per hobby, musica, escursioni in natura, videogiochi e cinema. Seguo le ultime novità in ambito tech e AI."
};

let currentBio = null;

function openBioPanel(key, btn) {
    const panel   = document.getElementById('bio-panel');
    const text    = document.getElementById('bio-panel-text');
    const allBtns = document.querySelectorAll('.bio-btn-col .fsl-btn');

    if (currentBio === key) {
        panel.classList.remove('visible');
        btn.classList.remove('active');
        currentBio = null;
        return;
    }

    allBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    text.textContent = bioContents[key];
    panel.classList.add('visible');
    currentBio = key;
}

// ==============================
// MENU HAMBURGER MOBILE
// ==============================
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}

// Chiudi menu cliccando fuori
document.addEventListener('click', function (e) {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.querySelector('.navbar-toggler-custom');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
    }
});
