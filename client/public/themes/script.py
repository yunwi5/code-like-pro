#!/usr/bin/env python3
import os
import re
import glob

def is_pascal_case(word):
    # Check if the word is in PascalCase using a regular expression
    pattern = r'^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$'
    return bool(re.match(pattern, word))

def pascal_case(filename):
    if is_pascal_case(filename):
        return filename

    # Remove special characters and split words
    words = re.split(r'[^A-Za-z0-9]+', filename)
    # Capitalize the first letter of each word and join them together
    pascal_case_name = ''.join(word.capitalize() for word in words)
    return pascal_case_name


def main():
    # Get all JSON files in the current directory
    json_files = glob.glob("*.json")

    processed_file_names = []
    for file in json_files:
        # Remove the '.json' extension from the filename
        file_without_ext = os.path.splitext(file)[0]

        # Convert the filename to PascalCase
        pascal_case_name = pascal_case(file_without_ext)

        # Add the '.json' extension back to the new filename
        new_file = f"{pascal_case_name}.json"

        processed_file_names.append(new_file)

        # Rename the file
        os.rename(file, new_file)
        print(f"Renamed {file} to {new_file}")

    with open('import-format.txt', 'w') as f:
        print(processed_file_names)
        for file in processed_file_names:
            f.write(f"import {file[:-5]} from './{file}';\n")

    with open('list-format.txt', 'w') as f:
        print(processed_file_names)
        list_format = f"const themes = {', '.join([fn[:-5] for fn in processed_file_names])}]"
        f.write(list_format)


if __name__ == "__main__":
    main()
