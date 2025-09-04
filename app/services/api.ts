import axios from 'axios';
// SweetAlert
const { $swal } = useNuxtApp();
const apiUrl = process.env.API_URL || 'https://cratobyte.com/api';
// const apiUrl = process.env.API_URL || 'http://localhost/cratobyte/api';
// const { $axios } = useNuxtApp();
const $axios = axios.create({
  // baseURL: config.public.apiUrl.replace(/\/$/, ''), // clean trailing slash
});

class Request {
  constructor() {
    $axios.interceptors.response.use(
      response => response,
      (error) => {
        const currentPath = window.location.pathname;

        // Skip logout logic if on login page
        const skip401Routes = ['/', '/register']; // Add more paths if needed
        if (
          error.response?.status === 401 &&
          !skip401Routes.includes(currentPath)
        ) {
          Request.Logout();
          useCookie('auth_token').value = '';
          $swal.fire({
            title: 'Sorry!',
            icon: 'warning',
            text: 'Session expired',
          });
          window.location.href = '/';
        }

        return Promise.reject(error);
      }
    );
  }

  static getCSC() {
    // return axios.get('https://api.countrystatecity.in/v1/countries', {
    //   headers: {
    //     'X-CSCAPI-KEY': 'RFA5RDR1bEN3YWMyNUpzZVdmMjA5YjhBa1Znajg1YkdoNk1jRmZFMA=='
    //   }
    // });
  }

  // format to money with decimal
  static formatToCurrency(value: number, currency: string = 'USD') {
    if (!value) return '$0.00';
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return formatted;
  }
  // Shorten wallet addr
  static shortenAddress(address: string, startLength = 4, endLength = 4): string {
    // if (!address.startsWith("0x") || address.length <= startLength + endLength + 2) {
    //   return address;
    // }
    const start = address.slice(4, 2 + startLength);
    const end = address.slice(-endLength);
    return `0x${start}....${end}`;
  }
  static formatSqlDatetime(sqlDate: string) {
    const date = new Date(sqlDate);

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12;

    return `${day}/${month}/${year} ${hour12}:${minutes}${ampm}`;
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
    return $axios.post(`${apiUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  static userDetails() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // Recovery
  static Recovery(email:any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/recovery`, {
      params: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // changePassword
  static changePassword(FD : any) {
    return $axios.post(`${apiUrl}/reset-password`, FD);
  }

  // Get assets
  static allAssets() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/assets`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  static assetBySlug(slug: any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/assets`, {
      params: {
        slug: slug,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  static userAssets(user_id: any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/assets`, {
      params: {
        user_id: user_id,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  
  // Get assets
  static allHistory() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/history`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  static historyByHash(hash: any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/history`, {
      params: {
        hash: hash,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  
  // Get notifications
  static allNotifications() {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/notifications`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  
  // OTP
  static requestOTP(email:string) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.get(`${apiUrl}/otp`, {
      params: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // Withdraw
  static Withdraw(FD:any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post(`${apiUrl}/history`, FD, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // Withdraw
  static confirmWithdraw(FD:any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post(`${apiUrl}/history`, FD, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // Deposit
  static Deposit(FD:any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post(`${apiUrl}/history`, FD, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
  // Deposit
  static addWallet(FD:any) {
    const ACCESS_TOKEN = useCookie('auth_token').value;
    return $axios.post(`${apiUrl}/connect-wallet`, FD, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
}
new Request;
export default Request;