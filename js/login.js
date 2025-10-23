let imageList = [
    '../images/login/1.jpg',
    '../images/login/2.jpg',
    '../images/login/3.jpg',
    '../images/login/4.jpg'
];

let sections = document.querySelectorAll('.main__section');

sections.forEach(section => {
    let bg1 = document.createElement('div');
    let bg2 = document.createElement('div');

    Object.assign(bg1.style, {
        position: 'absolute',
        inset: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        transition: 'opacity 1s ease-in-out',
        opacity: 1
    });

    Object.assign(bg2.style, {
        position: 'absolute',
        inset: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        transition: 'opacity 1s ease-in-out',
        opacity: 0
    });

    section.append(bg1, bg2);

    let current = 0;
    let showingFirst = true;

    bg1.style.backgroundImage = `url(${imageList[current]})`;

    setInterval(() => {
        current = (current + 1) % imageList.length;
        const nextImage = imageList[current];

        if (showingFirst) {
            bg2.style.backgroundImage = `url(${nextImage})`;
            bg2.style.opacity = 1;
            bg1.style.opacity = 0;
        } else {
            bg1.style.backgroundImage = `url(${nextImage})`;
            bg1.style.opacity = 1;
            bg2.style.opacity = 0;
        }

        showingFirst = !showingFirst;
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const openEyeIcon = document.getElementById('open-eye-icon');
    const closeEyeIcon = document.getElementById('close-eye-icon');

    closeEyeIcon.style.display = 'block';
    openEyeIcon.style.display = 'none';

    openEyeIcon.addEventListener('click', () => {
        passwordInput.type = 'password';
        closeEyeIcon.style.display = 'block';
        openEyeIcon.style.display = 'none';
    });

    closeEyeIcon.addEventListener('click', () => {
        passwordInput.type = 'text';
        closeEyeIcon.style.display = 'none';
        openEyeIcon.style.display = 'block';
    });
});

function authorizePlayer() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const hcaptchaResponse = hcaptcha.getResponse();

    const messageEl = document.getElementById("message");

    if (!username || !password) {
        messageEl.textContent = "Будь ласка впишіть ім'я користувача та пароль.";
        return;
    }

    if (!hcaptchaResponse) {
        messageEl.textContent = "Будь ласка пройдіть каптчу.";
        return;
    }

    hcaptcha.reset();
}