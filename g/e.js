


const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  function Encrypt_text() {
	var v, i;
	var prefix = "#####  Encrypted:\n",
	    suffix = "#####  End encrypted message\n";
	
    	if (document.key.text.value.length == 0) {
	    alert("Please specify a key with which to encrypt the message.");
	    return;
	}
    	if (document.plain.text.value.length == 0) {
	    alert("No plain text to encrypt!  Please enter or paste plain text in the field above.");
	    return;
	}
    	document.cipher.text.value = "";
    	setKey();

	addEntropyTime();
    	prng = new AESprng(keyFromEntropy());
	var plaintext = encode_utf8(document.plain.text.value);
	
	//  Compute MD5 sum of message text and add to header
	
	md5_init();
	for (i = 0; i < plaintext.length; i++) {
	    md5_update(plaintext.charCodeAt(i));
	}
	md5_finish();
	var header = "";
	for (i = 0; i < digestBits.length; i++) {
	    header += String.fromCharCode(digestBits[i]);
	}
	
	//  Add message length in bytes to header
	
	i = plaintext.length;
	header += String.fromCharCode(i >>> 24);
	header += String.fromCharCode(i >>> 16);
	header += String.fromCharCode(i >>> 8);
	header += String.fromCharCode(i & 0xFF);

    	/*  The format of the actual message passed to rijndaelEncrypt
	    is:
	    
	    	    Bytes   	Content
		     0-15   	MD5 signature of plaintext
		    16-19   	Length of plaintext, big-endian order
		    20-end  	Plaintext
		    
	    Note that this message will be padded with zero bytes
	    to an integral number of AES blocks (blockSizeInBits / 8).
	    This does not include the initial vector for CBC
	    encryption, which is added internally by rijndaelEncrypt.
	    
	*/

	var ct = rijndaelEncrypt(header + plaintext, key, "CBC");
    	if (document.plain.encoding[0].checked) {
	    v = armour_codegroup(ct);
	} else if (document.plain.encoding[1].checked) {
    	    v = armour_hex(ct);
	} else if (document.plain.encoding[2].checked) {
    	    v = armour_base64(ct);
	}
	document.cipher.text.value = prefix + v + suffix;
    	delete prng;
    }


      
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
  var dataString = '{"domain":{"domainName": "' + 'sdfhdsfhsdfhfh.com' + '" }}';

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








