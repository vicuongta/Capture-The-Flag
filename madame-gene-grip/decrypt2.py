def analyze_empty_file(file_path):
    with open(file_path, 'rb') as f:
        lines = f.readlines()
    
    line_count = len(lines)
    print(f"Number of lines: {line_count}")
    
    for i, line in enumerate(lines, start=1):
        if line.strip():  # Check if there's anything that isn't just whitespace
            print(f"Line {i} has data: {line}")
        else:
            print(f"Line {i} is empty.")
    
    # Hypothetical further analysis, such as converting hex to text if you find data:
    # for line in lines:
    #     if line.strip():
    #         try:
    #             print(bytes.fromhex(line.strip()).decode())
    #         except ValueError:
    #             pass

# Replace "path/to/your/file" with the actual file path you want to analyze.
analyze_empty_file("evident.txt")



