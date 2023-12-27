
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