const main = document.querySelector('.main');

const form = document.getElementById('inputMessage');

const getNickname = document.getElementById('inputNickName');
// Получаем элемент чата
const chat = document.querySelector("#divMessages")
// Получаем строку ввода сообщения
const input = document.querySelector("#inputMessage")
// Получаем кнопку для ввода сообщения
const btnSubmit = document.querySelector("#btnSend")

const btnSubmitNickname = document.querySelector("#btnSendName")
const inputNickname = document.querySelector("#inputNickName")
 
// Подключаем WebSocket
const webSocket = new WebSocket('ws://localhost:5678');


// const username = prompt('your username', '228')


// Получаем сообщение от сервера
webSocket.onmessage = function(e) {
    // Парсим полученные данные
    let data = JSON.parse(e.data);
    if (data.key == 1){
        for( let i = 0; i < data.content.length; i++){
            chat.innerHTML += '<div class="msg">' + data.content[i].username + ': ' + data.content[i].content + '</div>'
        }
    } else if(data.key == 2) {
        chat.innerHTML += '<div class="msg">' + data.content.username + ': ' + data.content.message + '</div>'

    }
    chat.scrollBy(0, 100)
    data = ''
};

var username = "Guest"

btnSubmitNickname.addEventListener("click", () => {
    if (inputNickname.value != ''){
    username = String(inputNickname.value)
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
});



form.addEventListener('focus', (event) => {
  event.target.style.color = 'rgb(228, 228, 228)';
}, true);



getNickname.addEventListener('focus', (event) => {
    event.target.style.color = 'rgb(228, 228, 228)';
}, true);


