import string
from itertools import cycle

def caesar_cipher(text, shift):
    """Deciphers a text encoded using a simple Caesar cipher."""
    result = ""
    for char in text:
        if char in string.ascii_letters:
            shifted = ord(char) - shift
            if char.islower():
                result += chr(shifted) if 'a' <= chr(shifted) <= 'z' else chr(shifted + 26)
            else:
                result += chr(shifted) if 'A' <= chr(shifted) <= 'Z' else chr(shifted + 26)
        else:
            result += char
    return result

def brute_force_caesar(text):
    """Attempts all possible shifts in the Caesar cipher."""
    results = {}
    for shift in range(1, 26):
        results[shift] = caesar_cipher(text, shift)
    return results

def xor_decrypt(text, key):
    """Decrypts text using XOR with a repeating key."""
    return ''.join(chr(ord(c) ^ ord(k)) for c, k in zip(text, cycle(key)))

# Encrypted string
encoded_str = "siiqsjv{oekfqiiutjxujuij}"

# Attempt Caesar cipher brute-force
caesar_results = brute_force_caesar(encoded_str)

# Attempt common XOR key trials
xor_keys = ['key', 'pass', '1234']  # Common guesses
xor_results = {key: xor_decrypt(encoded_str, key) for key in xor_keys}

# Display results
import pandas as pd
df_caesar = pd.DataFrame.from_dict(caesar_results, orient='index', columns=['Decoded Text'])
df_xor = pd.DataFrame.from_dict(xor_results, orient='index', columns=['Decoded Text'])

print("Caesar Cipher Brute Force Results:")
print(df_caesar)

print("\nXOR Decryption Attempts:")
print(df_xor)