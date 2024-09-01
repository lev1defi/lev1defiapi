
class User {
  constructor(client) {
    this.client = client;
  }

  getAuthObject() {
    return this.client.call('user', 'getAuthObject', {});
  }

  getUser(user_id) {
    return this.client.call('user', 'getUser', { user_id });
  }

  getUserByEmailOrUsername(user) {
    return this.client.call('user', 'getUserByEmailOrUsername', { user });
  }

  createApiKey(user_id, permissions) {
    return this.client.call('user', 'createApiKey', { user_id, permissions: permissions.join(',') });
  }

  getApiKeys(user_id) {
    return this.client.call('user', 'getApiKeys', { user_id });
  }

  setPermissions(user_id, api_key_id, permissions) {
    return this.client.call('user', 'setPermissions', { user_id, api_key_id, permissions: permissions.join(',') });
  }

  makeAffiliate(user_id, deal_id) {
    return this.client.call('user', 'makeAffiliate', { user_id, deal_id });
  }

  makeEscrowModerator(user_id) {
    return this.client.call('user', 'makeEscrowModerator', { user_id });
  }

  makeForumModerator(user_id) {
    return this.client.call('user', 'makeForumModerator', { user_id });
  }
}

module.exports = User;
