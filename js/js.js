window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cookieContainer = document.querySelector(".cookie__container");
  const problemsContainer = document.querySelector(".some_problems");
  const acceptBtn = document.getElementById("accept-cookie");
  const cancelBtn = document.getElementById("cancel-cookie");

  if (!cookieContainer) {
    problemsContainer.style.bottom = "30px";
    return;
  }

  if (window.getComputedStyle(cookieContainer).display !== "none") {
    problemsContainer.style.bottom = "130px";
  } else {
    problemsContainer.style.bottom = "30px";
  }

  function updatePosition(showCookie) {
    problemsContainer.style.bottom = showCookie ? "130px" : "30px";
  }

  const observer = new MutationObserver(() => {
    const isDisplayed = window.getComputedStyle(cookieContainer).display !== "none";
    updatePosition(isDisplayed);
  });

  observer.observe(cookieContainer, { attributes: true, attributeFilter: ["style"] });

  if (acceptBtn) acceptBtn.addEventListener("click", () => {
    cookieContainer.style.display = "none";
    updatePosition(false);
  });

  if (cancelBtn) cancelBtn.addEventListener("click", () => {
    cookieContainer.style.display = "none";
    updatePosition(false);
  });
});

const proxyUrl = 'https://corsproxy.io/?url=' +
  encodeURIComponent('https://truckershub.in/vtc/1407');

function fetchData() {
  fetch(proxyUrl)
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;

      const items = temp.querySelectorAll('.fs-2.fw-bold');

      if (items.length >= 2) {
        document.getElementById('km__company').textContent = items[0].textContent.trim();
        document.getElementById('totalJobs__company').textContent = items[3].textContent.trim();

        startNumberAnimationOnce();

      } else {
        console.error('.fs-2.fw-bold:', items.length);
      }
    })
    .catch(e => console.error(e));
}

fetchData();
setInterval(fetchData, 300000);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".why");

  const onScroll = () => {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !element.classList.contains("animate")) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", onScroll);

  onScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".animate__title");

  const onScroll = () => {
    titles.forEach((title) => {
      const rect = title.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !title.classList.contains("animate")) {
        title.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", onScroll);

  onScroll();
});

function toggleLanguageMenu() {
  const menu = document.getElementById('languageMenu');
  menu.classList.toggle('active');
}

function changeLanguage(langId) {
  const currentLangImg = document.getElementById('currentLangImg');
  const selectedLink = document.getElementById(langId);
  const newImgSrc = selectedLink.querySelector('img').src;

  currentLangImg.src = newImgSrc;

  document.getElementById('languageMenu').classList.remove('active');

  console.log("Выбран язык:", langId);
}

document.addEventListener('click', function (event) {
  const menu = document.getElementById('languageMenu');
  const container = document.querySelector('.container__language');
  if (!container.contains(event.target)) {
    menu.classList.remove('active');
  }
});



const translations = {
  en: {
    title: "Welcome",
    description: "This is a test site",
    buttonText: "Click me"
  }
};

let currentLang = localStorage.getItem('siteLang') || 'ua';
const originalTexts = {};

function applyTranslation(langId) {
  const elements = document.querySelectorAll('[data-i18n]');
  if (langId === 'en') {
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!originalTexts[key]) originalTexts[key] = el.textContent;
      if (translations.en[key]) el.textContent = translations.en[key];
    });
  } else if (langId === 'ua') {
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (originalTexts[key]) el.textContent = originalTexts[key];
    });
  }
}

function changeLanguage(langId) {
  if (langId === currentLang) return;

  const currentLangImg = document.getElementById('currentLangImg');
  const selectedLink = document.getElementById(langId);
  if (selectedLink) {
    const newImgSrc = selectedLink.querySelector('img').src;
    currentLangImg.src = newImgSrc;
  }

  document.getElementById('languageMenu').classList.remove('active');

  applyTranslation(langId);

  currentLang = langId;
  localStorage.setItem('siteLang', langId);
}

function initLanguage() {
  const currentLangImg = document.getElementById('currentLangImg');
  const selectedLink = document.getElementById(currentLang);
  if (selectedLink) {
    const newImgSrc = selectedLink.querySelector('img').src;
    currentLangImg.src = newImgSrc;
  }
  applyTranslation(currentLang);
}

window.addEventListener('DOMContentLoaded', initLanguage);

function openDropMenuInformation(event) {
  event.preventDefault();
  const menu = event.currentTarget.nextElementSibling;

  if (menu.classList.contains('show')) {
    closeMenu(menu);
  } else {
    openMenu(menu);
  }
}

function openMenu(menu) {
  menu.style.display = 'flex';
  menu.style.maxHeight = '0';

  setTimeout(() => {
    menu.classList.add('show');
    menu.style.maxHeight = menu.scrollHeight + 'px';
  }, 10);
}

function closeMenu(menu) {
  menu.style.maxHeight = menu.scrollHeight + 'px';
  setTimeout(() => {
    menu.style.maxHeight = '0';
  }, 10);

  menu.addEventListener('transitionend', function handler() {
    menu.classList.remove('show');
    menu.style.display = 'none';
    menu.style.maxHeight = null;
    menu.removeEventListener('transitionend', handler);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const acceptButton = document.getElementById("accept-cookie");
  const cancelButton = document.getElementById("cancel-cookie");
  const cookieBlock = document.querySelector(".cookie__container");

  const isLocalStorageSupported = () => {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  const fadeOut = (element) => {
    if (element && element.style.opacity !== "0") {
      element.style.transition = "opacity 0.5s ease";
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.display = "none";
      }, 500);
    }
  };

  const fadeIn = (element) => {
    if (element && element.style.opacity !== "1") {
      element.style.transition = "opacity 0.5s ease";
      element.style.opacity = "1";
      element.style.display = "flex";
    }
  };

  const showConsentMessage = () => {
    if (cookieBlock) {
      fadeIn(cookieBlock);
    }
  };

  const setConsent = () => {
    if (isLocalStorageSupported()) {
      localStorage.setItem("cookie-consent", "accepted");
    }
  };

  const setCancel = () => {
    if (isLocalStorageSupported()) {
      localStorage.setItem("cookie-consent", "cancelled");
    }
  };

  if (acceptButton) {
    acceptButton.addEventListener("click", () => {
      setConsent();
      fadeOut(cookieBlock);
    });

    acceptButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        setConsent();
        fadeOut(cookieBlock);
      }
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      setCancel();
      fadeOut(cookieBlock);
    });

    cancelButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        setCancel();
        fadeOut(cookieBlock);
      }
    });
  }

  if (isLocalStorageSupported()) {
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted" && consent !== "cancelled") {
      showConsentMessage();
    }
  }
});

let animationStarted = false;

function formatKm(value, decimals) {
  if (value >= 1000) {
    let result = (value / 1000).toFixed(decimals);
    if (result.endsWith('.0')) result = result.slice(0, -2);
    return result + ' тис. км';
  } else {
    let result = value.toFixed(decimals);
    if (result.endsWith('.0')) result = result.slice(0, -2);
    return result + ' км';
  }
}

function animateNumber(el) {
  const rawText = el.textContent.trim();
  const isKm = el.id === "km__company";
  const isPlus = rawText.includes('+') || el.classList.contains("smile--stats");

  const hasDecimal = rawText.includes('.') || rawText.includes(',');

  let target = parseFloat(rawText.replace(',', '.')) || 0;
  const decimals = hasDecimal ? 1 : 0;

  let count = 0;
  const duration = 2000;
  const frameTime = 20;
  const steps = duration / frameTime;
  const stepValue = target / steps;

  el.textContent = isKm ? formatKm(0, decimals) : "0";

  const interval = setInterval(() => {
    count += stepValue;
    if (count >= target) {
      clearInterval(interval);
      if (isKm) {
        el.textContent = formatKm(target, decimals);
      } else if (isPlus) {
        el.textContent = Math.round(target) + "+";
      } else {
        el.textContent = Math.round(target);
      }
    } else {
      if (isKm) {
        el.textContent = formatKm(count, decimals);
      } else {
        el.textContent = Math.round(count);
      }
    }
  }, frameTime);
}

function startNumberAnimationOnce() {
  if (animationStarted) return;
  animationStarted = true;

  const numberElements = document.querySelectorAll(".animation__numbers");
  const animatedElements = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting && !animatedElements.has(el)) {
        animateNumber(el);
        animatedElements.add(el);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  numberElements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal__instructions-container");
  const openBtn = document.querySelector(".detalis__watch-how");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.classList.add("active");
  });

  modal.addEventListener("click", function (event) {
    if (!event.target.closest(".modal__instructions-content")) {
      modal.classList.remove("active");
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const header = document.querySelector('.header__container-navigation');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      header.parentElement.classList.toggle('mobile-menu-active');
    });
  }
});

let urlWebHook = 'https://discord.com/api/webhooks/1392750108805955605/jECUI9uEIBZLe6Yfae52tdGdc7siayPTZMztU2RfP2BdeYnjBPrv8XP8cPRB5ZPtpQnX'