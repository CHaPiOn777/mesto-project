// export function callServer(what, method, info) {

//   return fetch(`https://nomoreparties.co/v1/plus-cohort-9/${what}`, {
//   method: method,
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8',
    
//     'Authorization': '4aa45065-cf66-4840-9e29-974284b6da3e'
//   },
//   body: JSON.stringify(info)
// })
//   .then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//     // если ошибка, отклоняем промис
//   })
// }

export class Api {
  constructor(what, method, info) {
    this._what = what;
    this._method = method;
    this._info = info;
  }
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  };
  
  fetch() {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-9/${this._what}`, {
      method: this._method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': '4aa45065-cf66-4840-9e29-974284b6da3e'
      },
      body: JSON.stringify(this._info)
    }).then((res) => this._requestResult(res))

  }

}
