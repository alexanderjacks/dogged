# GOAL OF THIS SOFTWARE: scrape from a CSV into a batch of md files

## w the right type of CSV, you can run this script in Terminal with ```python make_crops.py``` and score markdown files per row!
### reuse & recycle & have a nice day

# csv reader module
import csv

# opens file to work from (only read not write (rb not wb))
with open('crops.csv', 'rb') as csvfile:
    # var name b/c this is hecka raw data
    pulpy_data = csv.DictReader(csvfile, delimiter=',', quotechar='\"')
    # want a way to populate this from the csv header! less errors
    headers = ['templateKey', 'title', 'description', 'featuredpost', 'featuredimage', 'sellPrice', 'tags'] # manual entry for now
    fields = []
    for row in pulpy_data:
        working_file_name = row['title'] # for db schema
        file_name = working_file_name.lower().replace(' ','-') # b/c filesystem
        print(file_name) # gonna save the .md w this name
        #
        # populates from the manual entry list
        # there's gotta exist a smoother, more pythonic way...
        fields.extend((row[headers[0]],row[headers[1]],row[headers[2]],row[headers[3]],row[headers[4]],row[headers[5]],row[headers[6]]))
        # creates md
        print("---") # for db schema
        for header, field in zip(headers, fields):
            # if field != "tags":
            print("{}: {}.".format(header, field))
            # else:
            #     print("tags ought be: {}".format(field).split())
        # need a 2nd loop to deal out tags field, by ','...
        print("---") # for db schema
        # need a method to write to .md file!
