const rcp_http_client = require("./rpc_http_client")
const affiliate = require('./interfaces/affiliate')
const escrow = require('./interfaces/escrow')
const listing = require('./interfaces/listing')
const user = require('./interfaces/user')

class Lev1defiApiClient {

    constructor(endpoint, apiKey, secretKey) {
        this._client = new rcp_http_client(endpoint, apiKey, secretKey);
        this._affiliate = new affiliate(this.client);
        this._escrow = new escrow(this.client);
        this._listing = new listing(this.client);
        this._user = new user(this.client);
    }

    client() {
        return this._client;
    }

    affiliate() {
        return this._affiliate;
    }

    escrow() {
        return this._escrow;
    }

    listing() {
        return this._listing;
    }

    user() {
        return this._user;
    }

}

module.exports = Lev1defiApiClient
