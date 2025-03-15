def vigenere_decrypt(ciphertext, key):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    decrypted_text = ""
    key = key.lower()
    key_length = len(key)
    
    for i, char in enumerate(ciphertext):
        if char in alphabet:
            shift = alphabet.index(key[i % key_length])
            decrypted_char = alphabet[(alphabet.index(char) - shift) % 26]
            decrypted_text += decrypted_char
        else:
            decrypted_text += char  # Keep non-alphabet characters unchanged
    
    return decrypted_text

# Given encrypted text and key
ciphertext = "wfwassucqvr"
key = "ErenEgiv"

# Run decryption
decrypted_message = vigenere_decrypt(ciphertext, key)
print("Decrypted message:", decrypted_message)
