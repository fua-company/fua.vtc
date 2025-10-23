document.getElementById('copyButton').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const copyIcon = document.getElementById('copyIcon');
    const successImg = document.getElementById('copySuccessfully');

    // Создаем временный элемент для копирования
    const tempInput = document.createElement('input');
    tempInput.value = passwordInput.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // для мобильных

    const successful = document.execCommand('copy');
    document.body.removeChild(tempInput);

    if (successful) {
        copyIcon.style.display = 'none';
        successImg.style.display = 'inline';

        // Вернуть SVG через 2 секунды
        setTimeout(() => {
            copyIcon.style.display = 'inline';
            successImg.style.display = 'none';
        }, 2000);
    }
});