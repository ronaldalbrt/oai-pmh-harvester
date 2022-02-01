import sickle

sickle = sickle.Sickle('https://www.hindawi.com/oai-pmh/oai.aspx')
records = sickle.ListRecords(metadataPrefix='oai_dc')

record = records.next()

record.header
record.header.identifier

record.metadata
