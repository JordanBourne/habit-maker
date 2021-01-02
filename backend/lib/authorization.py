import json
import jwt

def authorize_user(token):
  token = token.split(' ')[1]

  with open('jwks.json') as f:
    jwks = json.load(f)
    public_keys = {}
    for jwk in jwks['keys']:
        kid = jwk['kid']
        public_keys[kid] = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    kid = jwt.get_unverified_header(token)['kid']
    key = public_keys[kid]
    payload = jwt.decode(token, key=key, algorithms=['RS256'])
    return payload.get('username')

  return None