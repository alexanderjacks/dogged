#!/usr/bin/env bash
# run this script w `source startupwi.sh`
echo "｡,･* Thank you for installing StardewDex *･,｡"
project=`pwd`

echo "Cleaning and moving the data file downloads"
cd ~/Downloads
rename 's/to-CSV\ -\ //' *.csv && cp *.csv $project/src/pages/blog

echo "Now copying over the make tools (ﾉ>ω<)ﾉ :｡･:*:･ﾟ’★,｡･:*:♪･ﾟ’☆"
cd $project/wonderful/backup_makescripts
cp make* $project/src/pages/blog
cd $project/src/pages/blog

echo "Here go some Python scripts! (∩｀-´)⊃━━━*･｡ﾟ*･｡ﾟ*"
source python make_bundles.py
source python make_quests.py
source python make_fish.py
source python make_BUILDABLES.py
source python make_EDIBLES.py
# echo "Now ---ing the _______ (ﾉ>ω<)ﾉ :｡･:*:･ﾟ’★,｡･:*:♪･ﾟ’☆"

# echo "Removing the _____ with fire magic (∩｀-´)⊃━炎炎炎炎炎"
# echo "An unexplained error occurred. ¯\(°_o)/¯"
echo "Good job, StardewDex installed! ♪ヽ( ⌒o⌒)人(⌒-⌒ )v ♪"
echo "Now firing up Gatsby"
cd $project
gatsby develop
