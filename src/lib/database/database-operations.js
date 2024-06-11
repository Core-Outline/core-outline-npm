const PouchDB = require('pouchdb');

const db = new PouchDB('core_outline_db');

const authentication=(access_id, secret_key)=>{
    db.put({
        access_id,
        secret_key
      }).then(function (response) {
        return response
      }).catch(function (err) {
        return err
      });
}

module.exports = authentication

