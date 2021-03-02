const firstScreen = document.getElementById('first_screen');
const mainScreen = document.getElementById('main_screen');

const enterPage = document.querySelector('.authentification');
const regPage = document.querySelector('.registration');

const regLink = document.querySelector('.registration_link');
const regBtn = document.getElementById('registrate_btn');
const enterBtn = document.getElementById('enter_btn');
const exitBtn = document.querySelector('.exit');
const table = document.querySelector('.clients_table');


const enterUsername = document.getElementById('enter_username');
const enterPassword = document.getElementById('enter_password');
const regUsername = document.getElementById('reg_username');
const regPassword = document.getElementById('reg_password');
const regPasswordCheck = document.getElementById('reg_password_check');

const mainTab = document.getElementById('main');
const clientsTab = document.getElementById('clients');
const mapTab = document.getElementById('map');

let usersArray = [];
class newUser {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}

function openRegForm() {
    enterPage.style.display = "none";
    regPage.style.display = "flex";
}

function registrate() {

    let user = new newUser(regUsername.value, regPassword.value);
    usersArray.push(user);
    regPage.style.display = "none";
    enterPage.style.display = "flex";
}


function checkInputs() {
    if (enterUsername.value !== "" && enterPassword.value !== "") {
        enterBtn.classList.remove('disabled');
        enterBtn.removeAttribute('disabled');
        document.querySelector('.errorMessageEmail').style.display = "none";
        document.querySelector('.errorMessagePass').style.display = "none";
    } else {
        if(enterUsername.value === "") {
            document.querySelector('.errorMessageEmail').style.display = "inline";
        } else if (enterPassword.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        }
        enterBtn.classList.add('disabled');
        enterBtn.setAttribute('disabled', 'true');
    }
}

function checkRegInputs() {
    if (regUsername.value !== "" && regPassword.value !== "" && regPasswordCheck.value !== "") {
        regBtn.classList.remove('disabled');
        regBtn.removeAttribute('disabled');
        document.querySelector('.errorMessageEmail').style.display = "none";
        document.querySelector('.errorMessagePass').style.display = "none";
    } else {
        if(regUsername.value === "") {
            document.querySelector('.errorMessageEmail').style.display = "inline";
        } else if (regPassword.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        } else if (regPasswordCheck.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        }
        regBtn.classList.add('disabled');
        regBtn.setAttribute('disabled', 'true');
    }
}

function enterApp() {

    if(localStorage.getItem('email') === null && localStorage.getItem('password') === null) {
        for (let i = 0; i < usersArray.length; i++) {
            if(usersArray[i].userName === enterUsername.value) {
                if(usersArray[i].password === enterPassword.value) {
                    localStorage.setItem('email', enterUsername.value);
                    localStorage.setItem('password', enterPassword.value);
                    firstScreen.style.display = 'none';
                    mainScreen.style.display = 'block';
                }
            } else {
                alert("There's no such a user");
            }
        }
       
        if(usersArray.length === 0) {
            alert("There's no such a user");
        }

      } else {
        enterUsername.value = localStorage.getItem('email');
        enterPassword.value = localStorage.getItem('name');
        firstScreen.style.display = 'none';
        mainScreen.style.display = 'block';
      }
    
}

function exit() {
        firstScreen.style.display = 'block';
        mainScreen.style.display = 'none';
}
function getUserDevice() {
    let deviceInfo = document.createElement('p');
    let info = navigator.userAgent;

    deviceInfo.innerHTML = `Вы зашли через: ${info}`;
    mainTab.append(deviceInfo);
}

async function createClientsTable() {
    let response = await fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json');

    let json = await response.json();   
    
    let tr = document.createElement('tr');
        
        let thName = document.createElement('th');
        let thCompany = document.createElement('th');
        let thEmail = document.createElement('th');
        let thPhone = document.createElement('th');
        let thBalance = document.createElement('th');
        let thDate = document.createElement('th');

        thName.innerHTML = "Имя";
        thCompany.innerHTML = "Компания";
        thEmail.innerHTML = "Почта";
        thPhone.innerHTML = "Телефон";
        thBalance.innerHTML = "Баланс";
        thDate.innerHTML = "Дата регистрации";

        tr.append(thName);
        tr.append(thCompany);
        tr.append(thEmail);
        tr.append(thPhone);
        tr.append(thBalance);
        tr.append(thDate);
        tr.style.background = '#c3c3c4';
        table.append(tr);

    for(let i = 0; i < json.length; i++) {
        let tr = document.createElement('tr');
        
        let tdName = document.createElement('td');
        let tdCompany = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdPhone = document.createElement('td');
        let tdBalance = document.createElement('td');
        let tdDate = document.createElement('td');

        let str = json[i].registered.substr(0, 10);
        let ms = Date.parse(str);
        console.log(Date.parse(json[i].registered));
        let date = new Date(ms);
        let day = date.getDate();
        day = +day > 9 ? day : `0${day}`;
        let month = date.getMonth() + 1;
        month = +month > 9 ? month : `0${month}`;
        let year = date.getFullYear();

        tdName.innerHTML = json[i].name;
        tdCompany.innerHTML = json[i].company;
        tdEmail.innerHTML = json[i].email;
        tdPhone.innerHTML = json[i].phone;
        tdBalance.innerHTML = json[i].balance;
        tdDate.innerHTML = `${day}:${month}:${year}`;
        tdDate.style.position = 'relative';


        let btn = document.createElement('button');
        btn.innerHTML = 'X';
        btn.classList.add('delete');
        tdDate.append(btn);

        tr.append(tdName);
        tr.append(tdCompany);
        tr.append(tdEmail);
        tr.append(tdPhone);
        tr.append(tdBalance);
        tr.append(tdDate);
        

        if(json[i].isActive) {
            tr.style.background = 'white';
        } else {
            tr.style.background = '#dee0e2';
        }
        table.append(tr);


    }

    let extraInfo = document.createElement('div');
    extraInfo.classList.add('extraInfo');

    let men = document.createElement('div');
    let women = document.createElement('div');
    let balance = document.createElement('div');

    let menAmount = 0;
    let womenAmount = 0;
    let maxBalance = 0;
    for (let i = 0; i < json.length; i++) {
        if(json[i].gender == 'male') {
            menAmount++;
        } else if(json[i].gender == 'female') {
            womenAmount++;
        } 
        let balance = json[i].balance.slice(1).split('');
        for (let i = 0; i < balance.length; i++) {
            if(balance[i] === ',') {
                balance.splice(i, 1);
            }
        }

        if(+balance.join('') > maxBalance) {
            maxBalance = +balance.join('');
        }
        
    }

    men.innerHTML = `<span>Количество мужчин:</span> ${menAmount}`;
    women.innerHTML = `<span>Количество женщин:</span> ${womenAmount}`;
    balance.innerHTML = `<span>Максимальный баланс:</span> ${maxBalance}$`;

    extraInfo.append(men);
    extraInfo.append(women);
    extraInfo.append(balance);

    clientsTab.append(extraInfo);

    clientsTab.append(table);
}

function deleteRow(event) {
    if (event.target.className != 'delete') {
        return;
    } else {
        let  confirmDelete = confirm('Вы действительно хотите удалить эту сроку?');
        if(confirmDelete) {
            let tr = event.target.closest('tr');
            tr.remove();

            let infoMessage = document.createElement('div');
            let infoExit = document.createElement('span');

            infoMessage.classList.add('infoMessage');
            infoMessage.innerHTML = 'Строка успешно удалена';

            infoExit.classList.add('infoExit');
            infoExit.innerHTML = 'X';

            infoMessage.append(infoExit);
            mainScreen.append(infoMessage);

            infoExit.onclick = function() {
                infoMessage.style.display = 'none';
            }
}           
        }
    }
    






regLink.addEventListener('click', openRegForm);
regBtn.addEventListener('click', registrate);
enterBtn.addEventListener('click', enterApp);
exitBtn.addEventListener('click', exit);
table.addEventListener('click', deleteRow);
enterUsername.addEventListener('change', checkInputs);
enterPassword.addEventListener('change', checkInputs);
regUsername.addEventListener('change', checkRegInputs);
regPassword.addEventListener('change', checkRegInputs);
regPasswordCheck.addEventListener('change', checkRegInputs);


getUserDevice();
createClientsTable();
