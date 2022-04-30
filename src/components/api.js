export function callServer(what, method, info) {

  return fetch(`https://nomoreparties.co/v1/plus-cohort-9/${what}`, {
  method: method,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    
    'Authorization': '4aa45065-cf66-4840-9e29-974284b6da3e'
  },
  body: JSON.stringify(info)
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    // если ошибка, отклоняем промис
  })
}

