const http = require("https");
const Profile = require("../models/profileSchema");




const privateKey = (customerID, address, index, callback) => {
    const options = {
        "method": "POST",
        "hostname": "api-us-west1.tatum.io",
        "port": null,
        "path": "/v3/ethereum/wallet/priv",
        "headers": {
          "content-type": "application/json",
          "x-api-key": process.env.API_TATUM
        }
      };
      
      const req = http.request(options, function (res) {
        const chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            //console.log(body.toString());
            const jsonify = JSON.parse(body.toString())
            //console.log(jsonify.key)
            const coinUpdate = Profile.findOneAndUpdate(
                { customerID: customerID},
                { depositAddress: address, derivationKey: index, privateKey: jsonify.key}, (req, res, error) => {
                    console.log(res)
                    callback({
                      privateKey: jsonify.key
                    })
                    if(error){
                        console.log(error)
                    }
                  //return res.redirect('/account');
                }
                
              );

        });
      });
      
      req.write(JSON.stringify({
        index: index,
        mnemonic: 'chunk edit success fruit attitude oyster lazy flag together glass belt mass fiber state series silver tip click satisfy bundle mushroom buddy reopen hub'
      }));
      req.end();
}

module.exports = privateKey;

