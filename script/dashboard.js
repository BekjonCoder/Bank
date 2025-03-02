'use strict'
document.addEventListener('DOMContentLoaded', ()=>{
const account=JSON.parse(localStorage.getItem('account'))
const profileImage=document.getElementById('profileImage')
const welcomeOwner=document.getElementById('welcomeOwner')
const balance=document.getElementById('balance')
const logoutBtn=document.getElementById('logoutBtn')
const ownerName=document.getElementById('ownerName')
const accAmount=account?.amount
let format=new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
    accAmount
}).format(accAmount)
account?.userImage ?profileImage.src=account.userImage:profileImage.src='../assees/default.jpg'
welcomeOwner.textContent=account?.adminname
balance.textContent=format
ownerName.textContent=account?.adminname

logoutBtn.addEventListener('click',()=>{
    Toastify({
        text: "Chiqish muaffaqiyatli amalga oshirildi",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "green",
        borderRadius: "25px",
    }).showToast();
    setTimeout(() => {
        localStorage.removeItem('account')
    window.location.href='../index.html'
    }, 2000);
})
})