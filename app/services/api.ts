// import axios from 'axios';

const { $axios } = useNuxtApp();

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
    return $axios.post('/register', fd);
  }
  static Login(fd: object) {
    const Forms = JSON.stringify(fd);
    return $axios.post('/login', Forms);
  }
  static Logout() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post('/logout');
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