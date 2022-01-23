const { randomBytes } = require("crypto");
const request = require("request");
const Profile = require("../models/profileSchema");

const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const createAccount = async (id, username, serverID, callback) => {
const uuidchose = uuidv4()
console.log(uuidchose)
const http = require("https");

const options = {
  "method": "POST",
  "hostname": "api-us-west1.tatum.io",
  "port": null,
  "path": "/v3/ledger/account/batch",
  "headers": {
    "x-testnet-type": "ethereum-ropsten",
    "content-type": "application/json",
    "x-api-key": process.env.API_TATUM,
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
    console.log(uuidchose);
    const jsonify = JSON.parse(body.toString())
    console.log(jsonify[0].id, id, username, serverID)
    /*const coinUpdate = Profile.findOneAndUpdate(
        { issuer:"did:ethr:0xD4dE8D990d31fb2523aca2570A2b40Ce7c77e0CA"},
        { customerID: jsonify[0].id, externalID: uuidchose}, (req, res, error) => {
            console.log(res)
            if(error){
                console.log(error)
            }
        }
        
      );*/
      const coinUpdate = Profile.create(
        {
          userID: id,
          username: username,
          serverID: serverID,
          tokens: 1000,
          customerID: jsonify[0].id,
        }, (req, res, error) => {
            callback(jsonify[0].id)
            if(error){
              console.log(error)
            }
            //return done(null, res)
            
        } 
      );


  });
});

req.write(JSON.stringify({
  accounts: [
    {
        currency: 'ETH',
        xpub: 'xpub6DkFB88p6KuxpwP4ceRdph1aFHj8hxHULFrbKdSB5pQ9BJkfcMki7ubQUaj3gHJRQYDcnbxAW1PNodKRjprRo3wzcN8V6vbzraCGx4UtKEs',
        customer: {
          externalId: uuidchose,
        },
        compliant: false,
        accountingCurrency: 'USD'
    },
  ]
}));

'little genre fire aerobic lonely drastic one skate benefit legal weasel feature flag ship cradle gesture away skill student pudding toward crash faculty skill'
req.end();



};



module.exports = createAccount;