document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const registerModal = document.getElementById('register-modal');
    const loginModal = document.getElementById('login-modal');
    const closeRegister = document.getElementById('close-register');
    const closeLogin = document.getElementById('close-login');

    registerBtn.onclick = () => {
        registerModal.style.display = 'block';
    };

    loginBtn.onclick = () => {
        loginModal.style.display = 'block';
    };

    closeRegister.onclick = () => {
        registerModal.style.display = 'none';
    };

    closeLogin.onclick = () => {
        loginModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    };

    // Обработка регистрации
    const registerForm = document.getElementById('register-form');
    const sendCodeBtn = document.getElementById('send-code-btn');
    const registerEmail = document.getElementById('register-email');
    const registerNickname = document.getElementById('register-nickname');
    const registerCode = document.getElementById('register-code');
    const registerPassword = document.getElementById('register-password');
    const codeLabel = document.getElementById('code-label');
    const passwordLabel = document.getElementById('password-label');
    const registerSubmit = document.getElementById('register-submit');

    let verificationCode;

    sendCodeBtn.onclick = () => {
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        alert(`Ваш код подтверждения: ${verificationCode}`);
        codeLabel.style.display = 'block';
        registerCode.style.display = 'block';
        passwordLabel.style.display = 'block';
        registerPassword.style.display = 'block';
        registerSubmit.style.display = 'block';
    };

    registerForm.onsubmit = (event) => {
        event.preventDefault();
        if (registerCode.value === verificationCode) {
            const email = registerEmail.value;
            const nickname = registerNickname.value;
            const password = registerPassword.value;
            localStorage.setItem(email, JSON.stringify({ nickname, password }));
            alert('Регистрация прошла успешно!');
            registerModal.style.display = 'none';
        } else {
            alert('Неверный код подтверждения.');
        }
    };

    // Обработка входа
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            alert(`Добро пожаловать, ${user.nickname}!`);
            loginModal.style.display = 'none';
            registerBtn.style.display = 'none';
            loginBtn.style.display = 'none';
            const userNickname = document.createElement('p');
            userNickname.textContent = user.nickname;
            document.querySelector('nav').appendChild(userNickname);
        } else {
            alert('Неверная электронная почта или пароль.');
        }
    };
});
