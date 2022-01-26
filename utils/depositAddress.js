const http = require("https");
const Profile = require("../models/profileSchema");

const depositAddress = (data, callback) => {

  const options = {
    "method": "POST",
    "hostname": "api-us-west1.tatum.io",
    "port": null,
    "path": `/v3/offchain/account/${data}/address`,
    "headers": {
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
      const jsonify = JSON.parse(body.toString())

      console.log(jsonify)
      callback({
        depositAddress: jsonify.address,
        customerID: data,
        derivationKey: jsonify.derivationKey
      })
      /*const coinUpdate = Profile.findOneAndUpdate(
        { customerID:data},
        { depositAddress: bob.address }, (req, res) => {
            console.log(res)
        }
        
      );*/
    });
  });
  
  req.end();

}


module.exports = depositAddress;
