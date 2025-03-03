// 'use strict'
// document.addEventListener('DOMContentLoaded', ()=>{
// const account=JSON.parse(localStorage.getItem('account'))
// const profileImage=document.getElementById('profileImage')
// const welcomeOwner=document.getElementById('welcomeOwner')
// const balance=document.getElementById('balance')
// const logoutBtn=document.getElementById('logoutBtn')
// const ownerName=document.getElementById('ownerName')
// const depositBtn=document.getElementById('depositBtn')
// const withdrawBtn=document.getElementById('withdrawBtn')
// const amountInput=document.getElementById('amountInput')





// const accAmount=account?.amount
// let format=new Intl.NumberFormat('en-US',{
//     style:'currency',
//     currency:'USD',
//     accAmount
// }).format(accAmount)
// account?.userImage ?profileImage.src=account.userImage:profileImage.src='../assees/default.jpg'
// welcomeOwner.textContent=account?.adminname
// balance.textContent=format
// ownerName.textContent=account?.adminname



// logoutBtn.addEventListener('click',()=>{
//     Toastify({
//         text: "Chiqish muaffaqiyatli amalga oshirildi",
//         duration: 2000,
//         close: true,
//         gravity: "top",
//         position: "center",
//         backgroundColor: "green",
//         borderRadius: "25px",
//     }).showToast();
//     setTimeout(() => {
//         localStorage.removeItem('account')
//     window.location.href='../index.html'
//     }, 2000);
// })
// })

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    class Account {
        constructor(adminname, amount, userImage, username, transaction) {
            this.adminname = adminname;
            this.amount = amount;
            this.userImage = userImage || '../assets/default.jpg';
            this.username = username;
            this.transaction = transaction || [];
        }

        deposit(amount) {
            if (amount > 0) {
                this.amount += amount;
                this.transaction.push({ type: "deposit", amount, date: new Date().toLocaleString() });
                this.saveToLocalStorage();
                this.updateUI();
                this.showTransactions();
                this.showToast(`Hisobingizga $${amount} qo'shildi`, "green");
            } else {
                this.showToast("Noto'g'ri miqdor kiritildi", "red");
            }
        }

        withdraw(amount) {
            if (amount > 0 && amount <= this.amount) {
                this.amount -= amount;
                this.transaction.push({ type: "withdraw", amount, date: new Date().toLocaleString() });
                this.saveToLocalStorage();
                this.updateUI();
                this.showTransactions();
                this.showToast(`Hisobingizdan $${amount} yechildi`, "blue");
            } else {
                this.showToast("Pul yetarli emas!", "red");
            }
        }

        saveToLocalStorage() {
            localStorage.setItem('account', JSON.stringify(this));
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const updatedAccounts = accounts.map(acc => acc.username === this.username ? this : acc);
            localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        }

        updateUI() {
            balance.textContent = this.formatAmount();
        }

        showTransactions() {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = "";
            this.transaction.forEach(trans => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${trans.type}</td>
                    <td>$${trans.amount}</td>
                    <td>${trans.date}</td>
                    <td>${trans.type === "deposit" ? "✅" : "❌"}</td>
                `;
                transactionList.appendChild(row);
            });
        }

        formatAmount() {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(this.amount);
        }

        showToast(message, bgColor) {
            Toastify({
                text: message,
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: bgColor,
                borderRadius: "25px",
            }).showToast();
        }
    }

    const storedAccount = JSON.parse(localStorage.getItem('account'));
    if (!storedAccount) {
        window.location.href = "../index.html";
        return;
    }

    const account = new Account(storedAccount.adminname, storedAccount.amount, storedAccount.userImage, storedAccount.username, storedAccount.transaction);
    
    const profileImage = document.getElementById('profileImage');
    const welcomeOwner = document.getElementById('welcomeOwner');
    const balance = document.getElementById('balance');
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const amountInput = document.getElementById('amountInput');

    profileImage.src = account.userImage;
    welcomeOwner.textContent = account.adminname;
    balance.textContent = account.formatAmount();
    account.showTransactions();

    depositBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        account.deposit(amount);
        amountInput.value = "";
    });

    withdrawBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        account.withdraw(amount);
        amountInput.value = "";
    });
});
