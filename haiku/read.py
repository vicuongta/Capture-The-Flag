
import struct

with open("message.bin", "rb") as f:
    data = f.read()  # Reads the entire binary file
    print(data)
