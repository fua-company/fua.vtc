function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function incrementShowCount() {
    var count = parseInt(getCookie("cookie_show_count") || "0");
    count++;
    setCookie("cookie_show_count", count, 365);
    return count;
}

function shouldShowConsentMessage() {
    if (getCookie("cookie_consent") === "true") {
        return false;
    }

    var count = parseInt(getCookie("cookie_show_count") || "0");
    var lastDismissed = parseInt(getCookie("last_dismissed_count") || "0");

    if (count - lastDismissed >= 10 && count - lastDismissed <= 15) {
        return true;
    }
    return false;
}

function setConsent() {
    setCookie("cookie_consent", "true", 365);
    setCookie("last_dismissed_count", incrementShowCount(), 365);
}

function setCancel() {
    setCookie("last_dismissed_count", incrementShowCount(), 365);
}