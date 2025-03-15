def process_binary_file(filename):
    with open("evidence_cGFyaXR5.txt", 'r') as file:
        lines = file.read().splitlines()

    output = []
    
    for i in range(0, len(lines), 7):
        chunk = lines[i:i+7]  # Take a chunk of 7 lines
        odd_sum = sum(int(num, 2) for num in chunk if int(num, 2) % 2 == 1)  # Sum odd numbers
        eighth_value = '1' if odd_sum % 2 == 1 else '0'
        output.extend(chunk + [eighth_value])

    return output

# File path
file_path = "evidence_cGFyaXR5.txt"
result = process_binary_file(file_path)

# Save output to a new file
output_file_path = "processed_output.txt"
with open(output_file_path, 'w') as f:
    for line in result:
        f.write(line + '\n')

print(f"Processed output saved to: {output_file_path}")
