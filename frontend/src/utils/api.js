import getApiBaseUrl from "./config.js";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  _getHeaders(token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(token),
    }).then(this._handleResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(token),
    }).then(this._handleResponse);
  }

  updateUserInfo(token, { name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  updateAvatar(token, avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({ avatar }),
    }).then(this._handleResponse);
  }

  addCard(token, { name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(token),
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  deleteCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(token),
    }).then(this._handleResponse);
  }

  likeCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(token),
    }).then(this._handleResponse);
  }

  unlikeCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(token),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(token, cardId, isLiked) {
    return isLiked
      ? this.unlikeCard(token, cardId)
      : this.likeCard(token, cardId);
  }
}

const api = new Api({ baseUrl: getApiBaseUrl() });

export default api;
