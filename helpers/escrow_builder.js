const Decimal = require('decimal.js');
const { getAddressByNetworkAndSymbol } = require('./client/tokens');

class EscrowBuilder {
  constructor() {
    this.priority = false;
    this.smart_contract_network = 'tron';
    this.token_address = '0x0000000000000000000000000000000000000000';
    this.recipient = null;
    this.amount = null;
    this.external_network = null;
    this.external_network_symbol = null;
    this.paired_address = null;
    this.expected_deposit = null;
    this.service_fee = null;
    this.allow_partial_refund = false;
    this.metadata = {};
    this.offchain_data = {};

    this.user = 0;
    this.encrypted = false;
    this.direct_transfer = false;
  }

  setPriority(val) {
    this.priority = val;
    return this;
  }

  setSmartContractNetwork(network) {
    this.smart_contract_network = network;
    return this;
  }

  setToken(network, token_symbol) {
    const token_addr = getAddressByNetworkAndSymbol(network, token_symbol);
    if (token_addr) {
      this.token_address = token_addr;
      return true;
    }
    return false;
  }

  setTokenAddress(addr) {
    this.token_address = addr;
    return this;
  }

  setRecipient(addr) {
    this.recipient = addr;
    return this;
  }

  setAmount(amount) {
    this.amount = amount;
    return this;
  }

  setExternalNetwork(network) {
    this.external_network = network;
    return this;
  }

  setExternalSymbol(symbol) {
    this.external_network_symbol = symbol;
    return this;
  }

  setExternalAddress(addr) {
    this.paired_address = addr;
    return this;
  }

  setExpectedDeposit(amount) {
    this.expected_deposit = amount;
    return this;
  }

  setPartialRefund(val) {
    this.allow_partial_refund = val;
    return this;
  }

  setMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }

  setOffChainData(data) {
    this.offchain_data = data;
    return this;
  }

  setUserId(user) {
    this.user = user;
  }

  setEncrypted(val) {
    this.encrypted = val;
  }

  setDirectTransfer(val) {
    this.direct_transfer = val;
  }

  getServiceFee() {
    if (this.amount) {
      const commission = this.priority ? 0.4 : 0.2;
      const minimum = new Decimal(this.priority ? 2 : 1);
      let base = this.amount.div(100).mul(commission);
      let extras = 0;

      if (base.lessThan(minimum)) {
        base = minimum;
      }

      if (this.encrypted) {
        extras += 1;
      }

      if (this.direct_transfer) {
        extras += 1;
      }

      const break_down = {
        base: this.amount.div(100).mul(0.2),
        priority: this.priority ? this.amount.div(100).mul(0.2) : 0,
        encryption: this.encrypted ? 1 : 0,
        direct_transfer: this.direct_transfer ? 1 : 0,
        total: base.add(extras),
      };

      return break_down;
    }
    return null;
  }

  get() {
    if (this.recipient == null) {
      throw new Error('recipient cannot be null');
    }

    if (this.amount == null) {
      throw new Error('amount cannot be null');
    }

    if (this.expected_deposit == null) {
      throw new Error('expected deposit cannot be null');
    }

    this.service_fee = this.getServiceFee().total;

    if (this.service_fee) {
      return {
        priority: this.priority,
        smart_contract_network: this.smart_contract_network,
        token_address: this.token_address,
        recipient: this.recipient,
        amount: this.amount.toString(),
        external_network: this.external_network,
        external_network_symbol: this.external_network_symbol,
        paired_address: this.paired_address,
        expected_deposit: this.expected_deposit.toString(),
        service_fee: this.service_fee.toString(),
        allow_partial_refund: this.allow_partial_refund,
        metadata: this.metadata,
        offchain_data: this.offchain_data,
        user: this.user,
        encrypted: this.encrypted,
        direct_transfer: this.direct_transfer,
      };
    }
    return null;
  }

  set(values) {
    this.priority = values.priority;
    this.smart_contract_network = values.smart_contract_network;
    this.token_address = values.token_address;
    this.recipient = values.recipient;
    this.amount = new Decimal(values.amount);
    this.external_network = values.external_network;
    this.external_network_symbol = values.external_network_symbol;
    this.paired_address = values.paired_address;
    this.expected_deposit = new Decimal(values.expected_deposit);
    this.allow_partial_refund = values.allow_partial_refund;
    this.metadata = values.metadata;
    this.offchain_data = values.offchain_data;
    this.user = values.user;
    this.encrypted = values.encrypted;
    this.direct_transfer = values.direct_transfer;

    this.service_fee = this.getServiceFee().total;
  }
}

module.exports = { EscrowBuilder };
