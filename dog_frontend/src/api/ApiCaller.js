import { apiBase } from "../config";

class ApiCaller {
  constructor(base) {
    this.base = base;
  }

  async isLoggedIn() {
    return fetch(`${this.base}/auth/loggedin`, {
      method: "GET",
      credentials: "include",
    });
  }

  async logout() {
    return fetch(`${this.base}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
  }
}

export default new ApiCaller(apiBase);
