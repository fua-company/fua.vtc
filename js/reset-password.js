emailjs.init("JIlrS0JgJLy0JfdMp");

document.getElementById("resetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const statusDiv = document.getElementById("authMessage");

    const nicknameElement = document.querySelector(".header__user-nickname");
    const nickname = nicknameElement ? nicknameElement.textContent.trim() : "Користувач";

    if (!email) {
        statusDiv.textContent = "Введіть коректний email";
        return;
    }

    const passcode = Math.floor(100000 + Math.random() * 900000);

    const expireTime = new Date(Date.now() + 15 * 60000);
    const time = expireTime.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" }) +
        " " + expireTime.toLocaleDateString("uk-UA");

    statusDiv.textContent = "Відправка...";

    emailjs.send("service_h33hci7", "template_ed6mnn8", {
        email: email,
        passcode: passcode,
        time: time,
        nickname: nickname,
    })
        .then(() => {
            statusDiv.style.color = "green";
            statusDiv.textContent = "Код відправлено на пошту " + email;
        })
        .catch((error) => {
            console.error("EmailJS помилка:", error);
            statusDiv.style.color = "red";
            statusDiv.textContent = "Помилка при відправці листа.";
        });
});