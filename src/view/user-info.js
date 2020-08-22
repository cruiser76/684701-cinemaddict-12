import AbstractComponent from './abstract.js';

const createUserInfoTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class UserInfo extends AbstractComponent {
  getTemplate() {
    return createUserInfoTemplate();
  }
}

export default UserInfo;
