
class Escrow {
  constructor(client) {
    this.client = client;
  }

  create(escrow_builder) {
    const p = escrow_builder.get();
    if (p) {
      return this.client.call('escrow', 'create', p);
    }
    return null;
  }

  get(escrow_id, password = null) {
    return this.client.call('escrow', 'get', {
      escrow_id,
      password,
    });
  }
}

module.exports = Escrow;
