'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const profileImage = document.getElementById('profileImage');
    const welcomeOwner = document.getElementById('welcomeOwner');
    const balance = document.getElementById('balance');
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const amountInput = document.getElementById('amountInput');
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
                this.showToast(`Hisobingizga ${amount}$ qo'shildi`, "green");
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
            const storedAccount = JSON.parse(localStorage.getItem('account'));
            if (storedAccount) {
                this.amount = storedAccount.amount;
                balance.textContent = this.formatAmount();
            }
        }
        

        showTransactions() {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = "";
            this.transaction.forEach(b => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${b.type}</td>
                    <td>$${b.amount}</td>
                    <td>${b.date}</td>
                    <td>${b.type === "deposit" ? "✅" : "❌"}</td>
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
