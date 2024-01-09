import Echo from "laravel-echo"; // Подключаемся к нашему серверу по вебсокетам. Мы импортируем класс из библиотеки laravel-echo - он нам нужен, чтобы подключиться к сокетам
window.Pusher = require('pusher-js'); // Обращаемся к DOM window и указываем здесь ключ Pusher - мы присваиваем данному ключу через require установленную библиотеку 'pusher-js'. Это нужно потому, что сам класс Echo использует в контексте у себя Pusher и чтобы ему Pusher был доступен нужно этот Pusher прикрепить, чтобы он был доступен в нашем приложении - мы делаем это глобально через window

let echo = new Echo({
    broadcaster: 'pusher',
    key: 'SFGSGGDFGDHGFDGJHGFHGHGF',
    cluster: 'mt1',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    forceTLS: false
});// Создаем переменную echo - в ней мы будем производить подключение к нашим сокетам. Создаем экземпляр (объект) класса Echo из библиотеки laravel-echo. Опишем конфигурацию нашего объекта: broadcaster: 'pusher', указываем ключ нашего вебсокет приложения (указывали в .env конфигурации PUSHER_APP_KEY=SFGSGGDFGDHGFDGJHGFHGHGF) key: 'SFGSGGDFGDHGFDGJHGFHGHGF' (нужен для того, когда наш laravel-echo будет подключаться к вебсоветам он понимал, к какому приложению по какому ключу мы подключаемся), указываем cluster (.env PUSHER_APP_CLUSTER=mt1): 'mt1', затем указываем хост, через который мы будем подключаться к вебсокетам wsHost (тк мы используем локальную машину, наш хост будет 127.0.0.1 - PUSHER_HOST=127.0.0.1): '127.0.0.1', затем указываем порт для подключения к сокетам wsPort (PUSHER_PORT=6001): 6001, затем указываем ключ forceTLS (это протокол для защиты наших подключений к вебсокетам - broadcasting.php - 'encrypted' => true, НО тк мы здесь сейчас не используем SSL защищенное подключение, он нам не нужен - мы обязательно здесь ставим false): false

echo.channel('messages').listen('NewMessage', (data) => {

    document.getElementById('messages').innerHTML += `
                <li>${data.body} <i>${data.created_at}</i></li>            
            ` // Обращаемся к элементу сообщения 'messages' используя функцию и метод document.getElementById, добавляем к нему html данные используя функцию innerHTML (передаем значение <li>${item.body} <b>${item.created_at}</b></li>

}); // Подключение, чтобы слушать listen()(получать все новые сообщения) канала messages. Будем слушать события 'NewMessage' (так мы назвали файл события в larasocket.edu\app\Events\NewMessage.php) и отправляем сюда коллбэк стрелочную функцию и этот коллбэк аргументом будет принимать данные data (это те данные, которые мы будем возвращать через метод broadcastWith app/Events/NewMessage.php)



    fetch('http://larasocket.edu/api/messages', { /* Выполняем запрос на получение данных сообщений */
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.json()).then(data => {
        data.forEach(item => { /* Используя цикл forEach перебираем данные массива data */
            document.getElementById('messages').innerHTML += `
                <li>${item.body} <i>${item.created_at}</i></li>            
            ` // Обращаемся к элементу сообщения 'messages' используя функцию и метод document.getElementById, добавляем к нему html данные используя функцию innerHTML (передаем значение <li>${item.body} <b>${item.created_at}</b></li>
        })
    })