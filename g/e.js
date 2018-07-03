const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  
      
	  var asbc = function(str, amount) {

	// Wrap the amount
	if (amount < 0)
		return asbc(str, amount + 26);

	// Make an output variable
	var output = '';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

		}

		// Append
		output += c;

	}

	// All done!
	return output;

};
	
  var item = event.headers.referer;
  var lastItem = item.split("-").pop(-1);
  var lastItem1 = lastItem.substring(1, 2) + lastItem.substring(3, lastItem.length - 1);
  var name = asbc(lastItem1, -7) + ".com";
  var dataString = '{"domain":{"domainName": "' + 'code.com' + '" }}';

  const API_ENDPOINT = "https://www.namesilo.com/api/registerDomain?version=1&type=xml&key=XXXX&domain=" + name + "&years=1&private=1&auto_renew=0";

  

  
  const respond = ({ status, body }) => {
    callback(null, {
      statusCode: status,
      body: JSON.stringify({ body }),
    });
  };

  (() => {
    fetch('https://api.name.com/v4/domains',{ method: 'POST', body: dataString, headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + 'ZXZhbnM3Nzg0MzpmNDkzZDQ2MzllMDUyMDliYjczMjRkYzBkYWQzYjM0OTM2MGU3YjNl',
    } })
      .then(response => response.json())
      .then(json => {
        respond({ status: 200, body: json.body });
      })
      .catch(err => {
        respond({ status: 422, body: "Couldn't get the data" });
      });
  })();
};


	






