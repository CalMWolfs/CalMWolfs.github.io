import pyperclip

max_length = 100
start = '{\n"title": "",\n"text": ['
end = '],\n"image": {\n"src": ""\n}\n}'


# splitting the string into lines the same as the max length variable
def split_into_chunks(string):
    chunks = []
    current_chunk = ''

    words = string.split()
    for word in words:
        if len(current_chunk) + len(word) + 1 <= max_length:
            current_chunk += word + ' '
            # below is for the line after it has been split
        else:
            chunks.append(current_chunk.strip())
            current_chunk = word + ' '

    if current_chunk:
        chunks.append(current_chunk.strip())

    i = 1

    for chunk in chunks[1:]:
        chunks[i] = ' ' + chunks[i]
        i += 1

    return chunks


# getting the text input, sending to the function, and then printing it
def getInput():
    input_string = input("Enter the string: ")

    chunks = split_into_chunks(input_string)

    output = ',\n'.join(['"' + chunk + '"' for chunk in chunks])

    print("\nOutput copied to clipboard.\n")
    pyperclip.copy(start + output + end)
    getInput()


def main():
    getInput()


if __name__ == '__main__':
    main()
