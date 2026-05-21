document.addEventListener('DOMContentLoaded', function() {
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
});