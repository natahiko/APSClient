var iterationCount = 1000;
var keySize = 128;
var iv = '';//CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
var salt = '';//CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
var passPhrase = "";
fillKey();
fillSalt();
filliv();


function fillKey() {
    jQuery.get('files/key/file.txt', function(data) {
        passPhrase = data;
    });
}
function fillSalt() {
    jQuery.get('files/key/salt.txt', function(data) {
        salt = data;
    });
}
function filliv() {
    jQuery.get('files/key/iv.txt', function(data) {
        iv = data;
    });
}

function encrypt(text) {
    var aesUtil = new AesUtil();
    return aesUtil.encrypt(text);
}
function decrypt(text) {
    var aesUtil = new AesUtil();
    return aesUtil.decrypt(text);
}

var AesUtil = function() {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(passPhrase) {
    var key = CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: this.keySize, iterations: this.iterationCount });
    return key;
};

AesUtil.prototype.encrypt = function(plainText) {
    var key = this.generateKey(salt, passPhrase);
    var encrypted = CryptoJS.AES.encrypt(
        plainText,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function(cipherText) {
    var key = this.generateKey(salt, passPhrase);
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });
    var decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return decrypted.toString(CryptoJS.enc.Utf8);
};