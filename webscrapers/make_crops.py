# GOAL OF THIS SOFTWARE: scrape from a CSV into a batch of md files

## w the right type of CSV, you can run this script in Terminal with ```python make_crops.py``` and score markdown files per row!
### reuse & recycle & have a nice day

# csv reader module
import csv

# opens file to work from (only read not write (rb not wb))
with open('crops.csv', 'rb') as csvfile:
    pulpy_data = csv.DictReader(csvfile, delimiter=',', quotechar='\"')
    headers = ['templateKey', 'title', 'description', 'featuredpost', 'featuredimage', 'sellPrice', 'tags']
    fields = []
    for row in pulpy_data:
        t3st_file_name = row['title']
        fil3_nam3 = t3st_file_name.lower().replace(' ','-')
        print(fil3_nam3) # gonna save the .md w this name
        fields.extend((row[headers[0]],row[headers[1]],row[headers[2]],row[headers[3]],row[headers[4]],row[headers[5]],row[headers[6]]))
        print("---")
        for header, field in zip(headers, fields):
            print("{} : {}.".format(header, field))
        print("---")
