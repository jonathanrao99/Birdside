import zipfile
import xml.etree.ElementTree as ET

docx_file = 'public/rewards page content.docx'

with zipfile.ZipFile(docx_file, 'r') as zip_ref:
    xml_content = zip_ref.read('word/document.xml')

root = ET.fromstring(xml_content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

# Extract paragraphs and their text to preserve structure
output_lines = []
for para in root.findall('.//w:p', ns):
    para_text = ''
    for text_elem in para.findall('.//w:t', ns):
        if text_elem.text:
            para_text += text_elem.text
    if para_text.strip():
        output_lines.append(para_text)

# Print with formatting
for line in output_lines:
    print(line)
