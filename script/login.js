'use strict';
const accounts = [
    {
        username: 'Behruz_123',
        password: 'Behruz_123',
        adminname: 'Behruz',
        userImage:'../assees/person2.jpg',
        amount: 5000,
        transaction: []
    },
    {
        username: 'Bekzod_123',
        password: 'Bekzod_123',
        adminname: 'Bekzod',
        userImage:'../assees/person1.jpg',
        amount: 7000,
        transaction: []
    },
    {
        username: 'Bekjon_123',
        password: 'Bekjon_123',
        adminname: 'Bekjon',
        userImage:'../assees/bek.jpg',
        amount: 100000,
        transaction: []
    },
];

const userInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.querySelector('.error-message');
const passwordError = document.querySelector('.password-error');

const login = () => {
    const userName = userInput.value;
    const password = passwordInput.value;

    if (userName === '' || password === "") {
        errorMessage.textContent = "Foydalanuvchi nomini kiriting";
        passwordError.textContent = "Parolni kiriting";
        userInput.style.border = "2px solid red";
        passwordInput.style.border = "2px solid red";
        setTimeout(() => {
            errorMessage.textContent = "";
            passwordError.textContent = "";
            userInput.style.border = "none";
            passwordInput.style.border = "none";
        }, 2000);
    } else {
        const account = accounts.find(acc => acc.username === userName.trim() && acc.password === password);
        if (account) {
            localStorage.setItem('account', JSON.stringify(account));
            Toastify({
                text: "Login muvaffaqiyatli amalga oshirildi",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "green",
                borderRadius: "25px",
            }).showToast();
            setTimeout(() => {
                window.location.href='../public/dashboard.html'
            }, 2000);
        } else {
            Toastify({
                text: "Bunday accaunt yo'q!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                borderRadius: "25px",
            }).showToast();
        }
    }
};
document.addEventListener('keyup',(event)=>{
    if(event.key==='Enter'){
        login()
    }
})
loginBtn.addEventListener('click', login);

