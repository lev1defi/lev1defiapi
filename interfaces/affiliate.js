
class Affiliate {
  constructor(client) {
    this.client = client;
  }

  createDeal(label, fixed, commision, customer_discount, metadata) {
    return this.client.call('affiliate', 'createDeal', {
      label,
      fixed: fixed.toString(),
      commision: commision.toString(),
      customer_discount: customer_discount.toString(),
      metadata: JSON.stringify(metadata),
    });
  }

  listDeals() {
    return this.client.call('affiliate', 'listDeals', {});
  }
}

module.exports = Affiliate;
