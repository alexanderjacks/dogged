# GOAL OF THIS SOFTWARE: scrape from a CSV into a batch of md files
## w the right type of CSV, you can run this script in Terminal with ```python2 make_EDIBLES.py``` and score markdown files per row!
### reuse & recycle & have a nice day

## from ~/Downloads
### rename 's/dex - //' *.csv && cp *.csv ~/dogged/src/pages/blog && rm *.csv

import csv # csv deciphering module
# opens file to work from (only read not write (rb not wb))
with open('EDIBLES.csv', 'rb') as csvfile:
    # b/c this is hecka raw data...
    pulpy_data = csv.DictReader(csvfile, delimiter=',', quotechar='\"')
    # want a way to populate this from the csv header! less errors
    headers = ['title', 'description', 'type', 'sellPrice', 'tags', 'energy', 'health',] # manual entry for now

    for row in pulpy_data:
        # gotta assign fields to vars for later
        title = row['title']
        description = row['description']
        type = row['type']
        sellPrice = row['sellPrice']
        tags =  row['tags'] # could try to split these now...
        energy = row['energy']
        health = row['health']

        # formatting filenames, from the data object name
        img_file_name = title.replace(' ','_') # b/c filesystem
        md_file_name = title.lower().replace(' ','-') # b/c filesystem
        #
        # creating img asset path
        featuredimage = '/img/{}.png'.format(img_file_name)
        # # creates md to write csv row data into
        f = open('{}.md'.format(md_file_name), 'w')
        f.write('---\n') # formatting req
        f.write('templateKey: blog-post\n')
        f.write('featuredpost: false\n')
        f.write('date: 2020-02-23T00:22:22.711Z\n')
        f.write('title: {}\n'.format(title))
        f.write('description: {}\n'.format(description))
        f.write('type: {}\n'.format(type))
        f.write('sellPrice: {}\n'.format(sellPrice))
        f.write('energy: {}\n'.format(energy))
        f.write('health: {}\n'.format(health))
        f.write('featuredimage: {}\n'.format(featuredimage))
        f.write('tags:\n  - {}\n'.format(tags).replace(',','\n  -' ))
        f.write('---') # formatting req
        f.close() # python saves file on close()
