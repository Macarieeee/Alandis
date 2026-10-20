"""Extract every paragraph (including table cells) from the 16 local DOCX guides."""
import json
from pathlib import Path
import xml.etree.ElementTree as ET
from zipfile import ZipFile

root = Path(__file__).resolve().parent.parent
namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
documents = []
for index in range(1, 17):
    with ZipFile(root / "public" / "documents" / f"{index}.docx") as archive:
        document = ET.fromstring(archive.read("word/document.xml"))
    paragraphs = [
        "".join(node.text or "" for node in paragraph.findall(".//w:t", namespace)).strip()
        for paragraph in document.findall(".//w:p", namespace)
    ]
    documents.append({"id": index, "paragraphs": [p for p in paragraphs if p]})
(root / "src" / "data" / "documents.json").write_text(
    json.dumps(documents, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("Extracted all 16 guides.")
