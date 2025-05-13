const idKey = "USER-ID";
const id = document.getElementsByName('loginId');
const password = document.getElementsByName('password');
const name = document.getElementsByName('name');
const email = document.getElementsByName('email');

const loginInfo = localStorage.getItem(idkey);

if(loginInfo!=null){

    idInput.value = loginInfo;
    console.log('저장된 아이디값 불러옴');

}