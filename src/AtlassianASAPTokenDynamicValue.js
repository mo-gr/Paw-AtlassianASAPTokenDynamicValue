import jsrsasign from 'jsrsasign';

@registerDynamicValueClass
class AtlassianASAPTokenDynamicValue {
  static identifier = 'com.atlassian.PawExtensions.AtlassianASAPTokenDynamicValue';
  static title = 'Atlassian ASAP Token (JWT)';
  static help = 'https://github.com/mo-gr/Paw-AtlassianASAPTokenDynamicValue';
  static inputs = [
    InputField('bearer', 'Include Bearer?', 'Checkbox'),
    InputField('iss', 'Issuer (iss)', 'String'),
    InputField('sub', 'Subject (sub)', 'String'),
    InputField('aud', 'Audience (aud)', 'String'),
    InputField('kid', 'Key ID (kid)', 'String'),
    InputField('claims', 'Additional Claims', 'JSON'),
    InputField('signatureSecret', 'Private Key', 'SecureValue')
  ];

  title() {
    return 'Atlassian ASAP Token'
  }

  text() {
    return ''
  }

  evaluate() {
    const now = Math.floor((new Date()).getTime() / 1000)
    const header = {
      typ: "JWT",
      alg: "RS256",
      kid: this.kid
    }

    const payload = {
      iat: now,
      exp: now + 60,
      iss: this.iss,
      aud: this.aud,
      sub: this.sub,
      ...this.claims
    }

    const secret = this.signatureSecret;

    if (!secret || secret.length < 1) {
      return 'no key provided';
    }
    if (secret ===  '***** Hidden credentials *****') {
      return 'Bearer ' + secret;
    }
    //console.log(`Sign JWT: Header: ${JSON.stringify(header)} Payload: ${JSON.stringify(payload)} Secret: ${JSON.stringify(jsrsasign.KEYUTIL.getKey(secret))}`)

    try {
      return (this.bearer ? 'Bearer ' : '') + jsrsasign.jws.JWS.sign(null, header, payload, jsrsasign.KEYUTIL.getKey(secret));
    } catch(e) {
      console.log("Error signing key: ", e)
      return '';
    }
  }
}
