import { useEffect, useState } from "react";
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

  async inferBreed(fd) {
    return fetch(`${this.base}/api/dogs/infer`, {
      method: "POST",
      body: fd,
    });
  }
}
const caller = new ApiCaller(apiBase);

export const useLoggedIn = () => {
  const [login, setLogin] = useState(undefined);

  useEffect(() => {
    if (!login) {
      caller
        .isLoggedIn()
        .then((d) => d.json())
        .then((d) => setLogin(d))
        .catch((err) => {
          console.log(err);
          setLogin(null);
        });
    }
  }, [login]);

  return { login, setLogin };
};

export default caller;
