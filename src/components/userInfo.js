
export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._name = profileName;
    this._job = profileJob;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  }
}