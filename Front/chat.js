const main = document.querySelector('.main');

const form = document.getElementById('inputMessage');

const getNickname = document.getElementById('inputNickName');
// Получаем элемент чата
const chat = document.querySelector("#divMessages");
const divMessagesContainer = document.querySelector("#divMessagesContainer");
// Получаем строку ввода сообщения
const input = document.querySelector("#inputMessage");
// Получаем кнопку для ввода сообщения
const btnSubmit = document.querySelector("#btnSend");

const btnSubmitNickname = document.querySelector("#btnSendName");
const inputNickname = document.querySelector("#inputNickName");
const onlineNow = document.querySelector("#onlineNow");
const intOnline = document.querySelector("#intOnline");

const listUsers = document.querySelector("#listUsers");
// Подключаем WebSocket
const webSocket = new WebSocket('ws://localhost:5678');


// const username = prompt('your username', '228')

IDofUser = 0;
usernameOfUser = "Guest";

// Получаем сообщение от сервера
webSocket.onmessage = function(dataFromServer) {
    // Парсим полученные данные
    let data = JSON.parse(dataFromServer.data);
    let stillUtc = moment.utc(data.content.time).toDate();
    let localTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    if (data.key == 1){
        for( let i = 0; i < data.content.length; i++){
            chat.innerHTML += '<div class="msgContainer"><span class="msg">' + data.content[i].username + ': ' + data.content[i].content + '</span><span class="time">  ' + localTime +'</span></div>'
        }
        chat.scrollTo(0, chat.scrollHeight + 1000);
    } else if(data.key == 2) {
        chat.innerHTML += '<div class="msgContainer"><span class="msg">' + data.content.username + ': ' + data.content.message + '</span><span class="time">  ' + localTime +'</span></div>'
    }
    else if(data.key == 3){
        intOnline.innerHTML = '<span id="intOnline">' + data.onlineUsers + '</span>';
    }
    else if(data.key == 4){
        IDofUser = data.content.id;
        usernameOfUser = data.content.username;
    }
    else if(data.key == 6){
        listUsers.innerHTML = ""
        for(let i = 0; i < data.content.length; i++){
            listUsers.innerHTML += '<div id="userConteinerInList">' + data.content[i].username + '</div>'
        }
    }
    if(data.content.message.length > 190){
        divMessagesContainer.scrollBy(0, (Math.ceil(data.content.message.length / 190) * 20.1) + 20.1)
    } else {
        divMessagesContainer.scrollBy(0, Math.ceil(data.content.message.length / 190) * 20.1)
    };
    
    data = ''
};

let username = "Guest"

try {
    username = localStorage.getItem('username', username)
} catch{} 
inputNickname.value = username

btnSubmitNickname.addEventListener("click", () => {
    if (inputNickname.value != ''){
    username = String(inputNickname.value)
    localStorage.setItem('username', username)
    webSocket.send(JSON.stringify({
        key: 5,
        content: {
            id: IDofUser,
            username: username
        }
    }));
    }
    
})


// Отслеживаем нажатие мыши
btnSubmit.addEventListener("click", () => {
    if (input.value != ''){
        
        message = String(input.value);
        webSocket.send(JSON.stringify({
            key: 2,
            content: {
                username: username,
                content: message
            }
            
        }));
        input.value = '';
    }
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        if (input.value != ''){
            message = String(input.value);
            webSocket.send(JSON.stringify({
                key: 2,
                content: {
                    username: username,
                    content: message
            }
            }));
            input.value = '';
            
        }
    }
})



form.addEventListener('focus', (event) => {
  event.target.style.color = 'rgb(228, 228, 228)';
}, true);


getNickname.addEventListener('focus', (event) => {
    event.target.style.color = 'rgb(228, 228, 228)';
}, true);


let stillUtc = moment.utc(date).toDate();
let local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

console.log(local); // 2015-09-13 09:39:27
 
document.addEventListener('keydown', function(event) {
    if (event.code == 'F12') {
        setTimeout(
            divMessagesContainer.scrollBy(0, 300), 1000)
        console.log('f12')
    }
})