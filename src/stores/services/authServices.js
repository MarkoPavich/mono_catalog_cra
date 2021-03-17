import { apiBaseUrl, postOptions, getOptions } from './config';

class authServices {
  static async validateToken(token) {
    const request = new Request(`${apiBaseUrl}/auth/user`);
    const options = {
      ...JSON.parse(getOptions),
      headers: { Authorization: `token ${token}` },
    };

    const response = await fetch(request, options);
    const data = await response.json();

    return { user: data, status: response.status };
  }

  static async login(loginData) {
    const request = new Request(`${apiBaseUrl}/auth/login`);
    const options = {
      ...JSON.parse(postOptions),
      body: JSON.stringify(loginData),
    };

    const response = await fetch(request, options);
    const data = await response.json();

    return { ...data, status: response.status };
  }

  static async logout(token) {
    const request = new Request(`${apiBaseUrl}/auth/logout`);
    const options = { ...JSON.parse(postOptions) };
    options.headers.Authorization = `token ${token}`;

    return await fetch(request, options);
  }

  static async registerNewAccount(validatedData) {
    const request = new Request(`${apiBaseUrl}/auth/register`);
    const options = {
      ...JSON.parse(postOptions),
      body: JSON.stringify(validatedData),
    };

    const response = await fetch(request, options);
    const data = await response.json();

    return { ...data, status: response.status };
  }
}

export default authServices;
