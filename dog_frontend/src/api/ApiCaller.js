import { QueryBuilder } from "@material-ui/icons";
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

  async all_lost_dogs_nearby(latitude, longitude, max_distance_in_km) {
    // new QueryBuilder();
    return fetch(
      `${this.base}/api/dogs/lost/all?` +
        new URLSearchParams({
          latitude,
          longitude,
          max_distance_in_km,
        }).toString(),
      {
        method: "GET",
        credentials: "include",
      }
    );
  }

  async found_lost_dog(latitude, longitude, lost_dog_id) {
    return fetch(`${this.base}/api/dogs/found`, {
      method: "POST",
      // credentials: "include",
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        dog_id: lost_dog_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ApiCaller(apiBase);
