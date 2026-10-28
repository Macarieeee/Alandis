"""Generate English DOCX downloads from the same translations used on the site.

Run: python scripts/build-english-guides.py
Uses only the Python standard library.
"""
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

root = Path(__file__).resolve().parents[1]
documents = json.loads((root / "src/data/documents.json").read_text(encoding="utf-8"))
translations = json.loads((root / "src/locales/en.json").read_text(encoding="utf-8"))
output = root / "public/documents/en"
output.mkdir(parents=True, exist_ok=True)

content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>'''
relationships = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

for document in documents:
    paragraphs = []
    for index, source in enumerate(document["paragraphs"]):
        text = translations[re.sub(r"\s+", " ", source).strip()]
        heading = index == 0 or (len(source) < 110 and not re.match(r"[a-z][).]|^-|^•", source))
        properties = '<w:b/><w:sz w:val="28"/>' if heading else '<w:sz w:val="22"/>'
        paragraphs.append(
            '<w:p><w:pPr><w:spacing w:after="160"/></w:pPr><w:r><w:rPr>'
            '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:lang w:val="en-GB"/>'
            + properties + '</w:rPr><w:t xml:space="preserve">' + escape(text) + '</w:t></w:r></w:p>'
        )
    xml = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
           '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'
           + ''.join(paragraphs)
           + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>'
           '</w:body></w:document>')
    with ZipFile(output / f'{document["id"]}.docx', "w", ZIP_DEFLATED) as archive:
        for name, content in [("[Content_Types].xml", content_types), ("_rels/.rels", relationships), ("word/document.xml", xml)]:
            entry = ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            entry.compress_type = ZIP_DEFLATED
            archive.writestr(entry, content.encode("utf-8"))
print(f"Generated {len(documents)} English guides.")
