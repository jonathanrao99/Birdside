import xml.etree.ElementTree as ET
import os

def extract_docx_text(xml_path):
    if not os.path.exists(xml_path):
        return "File not found"
    
    tree = ET.parse(xml_path)
    root = tree.getroot()
    
    # Namespaces are usually like {http://schemas.openxmlformats.org/wordprocessingml/2006/main}
    namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    texts = []
    for p in root.findall('.//w:p', namespaces):
        p_text = []
        for t in p.findall('.//w:t', namespaces):
            if t.text:
                p_text.append(t.text)
        if p_text:
            texts.append("".join(p_text))
            
    return "\n".join(texts)

if __name__ == "__main__":
    content = extract_docx_text('tmp/word/document.xml')
    with open('tmp/faq_extracted.txt', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Extracted content saved to tmp/faq_extracted.txt")
