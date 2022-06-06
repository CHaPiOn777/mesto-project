
export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar, profileId) {
    this._name = profileName;
    this._job = profileJob;
    this._profileAvatar = profileAvatar;
    this._profileId = profileId;
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
    this._profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
  }

  // setUserAvatar(data) {
  //   this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  // }
}