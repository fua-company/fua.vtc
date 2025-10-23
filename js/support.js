const img = document.getElementsByClassName("img__supportCenter");
let x = 950, y = 205;

function randomMove() {
    x += Math.random() * 40 - 20;
    y += Math.random() * 40 - 20;

    img.style.marginLeft = x + "px";
    img.style.marginTop = y + "px";

    requestAnimationFrame(randomMove);
}

randomMove();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.support-input-container form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Проверка капчи
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse.length) {
            alert('Пожалуйста, подтвердите, что вы не робот');
            return;
        }

        // Сбор данных формы
        const formData = {
            nickname: document.getElementById('nickname').value,
            email: document.getElementById('email').value,
            problem: document.getElementById('problem').value,
            images: []
        };

        // Сбор изображений
        const imageWrappers = document.querySelectorAll('.image-wrapper');
        imageWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            formData.images.push(img.src);
        });

        // Отправка через EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Замените на ваши ID
            .then(function (response) {
                alert('Ваша заявка успешно отправлена!');
                form.reset();
                document.querySelector('.container__img').innerHTML = '';
                grecaptcha.reset();
            }, function (error) {
                alert('Произошла ошибка при отправке: ' + JSON.stringify(error));
            });
    });
});