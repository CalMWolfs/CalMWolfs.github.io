import pyperclip

max_length = 100

# splitting the string into lines the same as the max length variable
def split_into_chunks(string):
    chunks = []
    current_chunk = ''

    words = string.split()
    for word in words:
        if len(current_chunk) + len(word) + 1 <= max_length:
            current_chunk += '' + word + ' '
            # below is for the line after it has been split
        else:
            chunks.append(current_chunk.strip())
            current_chunk = '' + word + ' '

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

# getting the text input, sending to the function, and then printing it
def getInput():
    input_string = input("Enter the string: ")

    chunks = split_into_chunks(input_string)

    output = ',\n'.join(['"' + chunk + '"' for chunk in chunks])

    print("\nOutput copied to clipboard.")
    pyperclip.copy("[" + output + "]")
    getInput()

def main():
    getInput()

if __name__ == '__main__':
    main()
