function downloadFile(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function HTMLGenerator(response) {
    return  '<h3>Результат:</h3>' +
        '<pre>' +  JSON.stringify(response.data, null, '\t') + '</pre>' +
        '<h4>Статус:</h4>' +
        '<pre>' + response.status + ' ' + response.statusText + '</pre>';
}

function get(){
    let res = document.getElementById('getRes');
    res.innerHTML = '';

    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(function (response) {
            res.innerHTML = HTMLGenerator(response);
            downloadFile(JSON.stringify(response.data, null, '\t'), 'json.txt', 'text/plain');
        })
        .catch(function (err) {
            res.innerText = "Упс... ошибка"
           console.log(err.message)
        });
}

document.getElementById('inputForm').addEventListener('submit', post);

function post(e) {
    let res = document.getElementById('postRes');
    let postUserId = document.getElementById('postUserId').value;
    let postTitle = document.getElementById('postTitle').value;
    let postBody = document.getElementById('postBody').value;

    res.innerHTML = '';

    axios.post('http://jsonplaceholder.typicode.com/posts', {
        userId: postUserId,
        title: postTitle,
        body: postBody
    })
        .then(function(response) {
            res.innerHTML = HTMLGenerator(response);
        })
        .catch(function (err) {
            res.innerText = "Упс... ошибка"
            console.log(err.message)
        });
    e.preventDefault();
}

function put(){
    let res = document.getElementById('putRes');
    let putId = document.getElementById('putId').value;
    let putTitle = document.getElementById('putTitle').value;
    let putBody = document.getElementById('putBody').value;
    res.innerHTML = '';
    axios.put(`http://jsonplaceholder.typicode.com/posts/${putId}`,{
        title: putTitle,
        body: putBody
    }, config)
        .then(function(response) {
            res.innerHTML = HTMLGenerator(response);
        })
        .catch(function (err) {
            res.innerText = "Упс... ошибка"
            console.log(err.message)
        });
}

const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
}

