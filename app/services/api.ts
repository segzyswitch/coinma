import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost/coinma/api';
// const { $axios } = useNuxtApp();
const $axios = axios.create({
  // baseURL: config.public.apiUrl.replace(/\/$/, ''), // clean trailing slash
});

class Request {
  static getCSC() {
    // return axios.get('https://api.countrystatecity.in/v1/countries', {
    //   headers: {
    //     'X-CSCAPI-KEY': 'RFA5RDR1bEN3YWMyNUpzZVdmMjA5YjhBa1Znajg1YkdoNk1jRmZFMA=='
    //   }
    // });
  }

  // User
  static Register(fd: any) {
    return $axios.post(`${apiUrl}/register`, fd);
  }
  static Login(fd: object) {
    // const Forms = JSON.stringify(fd);
    return $axios.post(`${apiUrl}/login`, fd);
  }
  static Logout() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post('/logout', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  static userDetails() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get('/user', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
}

export default Request;