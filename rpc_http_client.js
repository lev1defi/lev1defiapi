const axios = require('axios');
const crypto = require('crypto');

class RpcHttpClient {
  constructor(endpoint, apiKey, secretKey) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  generateApiAuth(path, body, apiDateTime) {
    const method = 'POST';
    const sortedFields = Object.keys(body.params)
      .sort()
      .map((key) => `${key}=${body.params[key]}`)
      .join('&');
    const prehash = `${method}${path}${sortedFields}${apiDateTime}`;
    console.log('method:', method, 'path:', path, 'sortedFields:', sortedFields);
    const apiAuthVerifyPrehash = crypto.createHash('sha256').update(prehash).digest('hex');
    const apiAuth = crypto.createHash('sha256').update(`${this.secretKey}${apiAuthVerifyPrehash}`).digest('hex');
    return apiAuth;
  }

  async call(_class, method, data = {}) {
    const apiDateTime = new Date().toISOString();

    console.log(_class, method, data);

    const body = {
      class: _class,
      method: method,
      params: data,
    };

    const url = new URL(this.endpoint);
    const path = url.pathname + url.search;

    const headers = {
      'api_key': this.apiKey,
      'api_date_time': apiDateTime,
      'api_auth': this.generateApiAuth(path, body, apiDateTime),
    };

    try {
      const config = {
        method: 'POST',
        url: this.endpoint,
        data: body,
        headers: headers,
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('Error making RPC request:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

module.exports = RpcHttpClient;
