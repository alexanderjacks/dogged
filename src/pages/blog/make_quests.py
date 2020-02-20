# GOAL OF THIS SOFTWARE: scrape from a CSV into a batch of md files
## w the right type of CSV, you can run this script in Terminal with ```python make_quests.py``` and score markdown files per row!
### reuse & recycle & have a nice day


import csv, random # csv deciphering module, utility
# opens file to work from (only read not write (rb not wb))
with open('quests.csv', 'rb') as csvfile:
    # b/c this is hecka raw data...
    pulpy_data = csv.DictReader(csvfile, delimiter=',', quotechar='\"')
    # want a way to populate this from the csv header! less errors
    headers = ['title', 'description', 'when', 'how', 'rewardtext', 'itemRequired', 'imgReward', 'goldReward', 'heartReward', 'tags'] # manual entry for now
    # this needs to count down for the row count (while)

    for row in pulpy_data:
        # gotta assign fields to vars for later
        title = row['title']
        description = row['description']
        when = row['when']
        how = row['how']
        rewardtext = row['rewardtext']
        itemRequired = row['itemRequired']
        imgReward = row['imgReward']
        goldReward = row['goldReward']
        heartReward = row['heartReward']
        tags = row['tags'] # could try to split these now...

        working_file_name = row['title'] # for db schema
        # formatting filename, from the data object name
        rando = random.randint(1,6)
        img_file_name = 'quest_bg'+str(rando) # b/c filesystem
        md_file_name = working_file_name.lower().replace(' ','-') # b/c filesystem
        #
        # creating img asset path
        featuredimage = '/img/{}.png'.format(img_file_name)
        # # creates md to write csv row data into
        f = open('quest-{}.md'.format(md_file_name), 'w')
        f.write('---\n') # formatting req
        # f.write('Close to generating data file for {} ...'.format(md_file_name))
        f.write('templateKey: blog-post\n')
        f.write('featuredpost: false\n')
        f.write('date: 2020-02-19T14:12:24.711Z\n')
        f.write('featuredimage: {}\n'.format(featuredimage))
        f.write('title: {}\n'.format(title))
        f.write('description: {}\n'.format(description))
        f.write('when: {}\n'.format(when))
        f.write('how: {}\n'.format(how))
        f.write('rewardtext: {}\n'.format(rewardtext))
        f.write('itemRequired: {}\n'.format(itemRequired))
        f.write('imgReward: {}\n'.format(imgReward))
        f.write('goldReward: {}\n'.format(goldReward))
        f.write('heartReward: {}\n'.format(heartReward))
        f.write('tags:\n  - {}\n'.format(tags).replace(',','\n  -' ))
        f.write('---') # formatting req
        f.close() # python saves file on close()
