
define([
    "sjcl/core/sjcl",
    "sjcl/core/aes",
    "sjcl/core/bitArray",
    "sjcl/core/bn",
    "sjcl/core/cbc",
    "sjcl/core/ccm",
    "sjcl/core/ccmArrayBuffer",
    "sjcl/core/codecArrayBuffer",
    "sjcl/core/codecBase32",
    "sjcl/core/codecBase64",
    "sjcl/core/codecBytes",
    "sjcl/core/codecHex",
    "sjcl/core/codecString",
    "sjcl/core/convenience",
    "sjcl/core/ctr",
    "sjcl/core/ecc",
    "sjcl/core/gcm",
    "sjcl/core/hkdf",
    "sjcl/core/hmac",
    "sjcl/core/ocb2",
    "sjcl/core/ocb2progressive",
    "sjcl/core/pbkdf2",
    "sjcl/core/sha1",
    "sjcl/core/sha256",
    "sjcl/core/sha512",
    "sjcl/core/random",
    "sjcl/core/ripemd160",
    "sjcl/core/scrypt",
    "sjcl/core/srp"
], function(sjcl) {
    return sjcl;
});
