
class Listing {
  constructor(client) {
    this.client = client;
  }

  create(premium, negotiable, metadata) {
    return this.client.call('listing', 'create', { premium, negotiable, metadata });
  }

  list(mylistings, page) {
    return this.client.call('listing', 'list', { mylistings, page });
  }

  delete(listing_id) {
    return this.client.call('listing', 'delete', { listing_id });
  }

  edit(listing_id, premium, negotiable, metadata) {
    return this.client.call('listing', 'edit', { listing_id, premium, negotiable, metadata });
  }

  negotiate(listing_id, trading_pair_id) {
    return this.client.call('listing', 'negotiate', { listing_id, trading_pair_id });
  }

  endNegotiation(negotiation_id) {
    return this.client.call('listing', 'endNegotiation', { negotiation_id });
  }

  listNegotiations() {
    return this.client.call('listing', 'listNegotiations', {});
  }

  offerAccept(negotiation_id, offer_id) {
    return this.client.call('listing', 'offerAccept', { negotiation_id, offer_id });
  }

  offerMake(listing_id, negotiation_id, volume, price, message) {
    return this.client.call('listing', 'offerMake', {
      listing_id,
      negotiation_id,
      volume: volume.toString(),
      price: price.toString(),
      message,
    });
  }

  offerReject(negotiation_id, offer_id) {
    return this.client.call('listing', 'offerReject', { negotiation_id, offer_id });
  }

  setTradingPairs(listing_id, pairs) {
    const _pairs = pairs.map(pair => ({
      quote: pair.quote,
      base: pair.base,
      volume: pair.volume.toString(),
      price: pair.price.toString(),
    }));
    return this.client.call('listing', 'setTradingPairs', { listing_id, pairs: _pairs });
  }

  getTradingPairs(listing_id) {
    return this.client.call('listing', 'getTradingPairs', { listing_id });
  }
}

module.exports = Listing;
