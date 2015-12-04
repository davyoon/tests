import csv
csv_file = open("rock.csv", 'rb')  #if python 3, use 'rU'

reader = csv.DictReader(csv_file)

rows = [row for row in reader]

def is_valid_year(string):
	try:
		int(string)
	except ValueError:
		return False
	else:
		return int(string) > 1900


print "There were {} songs released in 1981".format(
	len([x for x in rows if x["Release Year"] == "1981"])
)

print "There were {} songs released before 1984.".format(
	len([x for x in rows if is_valid_year(x["Release Year"]) and int(x["Release Year"]) < 1984])
)

print "The earliest release year is {}".format(
	min([row["Release Year"] for row in rows if is_valid_year(row["Release Year"])])
)

top_5_songs = sorted(
	rows, 
	key=lambda row: int(row["PlayCount"]), 
	reverse=True)[:5]

print "The top 5 songs were:"
for song in top_5_songs:
	print "{} {}".format(song["Song Clean"], song["PlayCount"])


rows = [row["ARTIST CLEAN"] for row in rows]
artist_freq = {}
for x in rows:
	if x in artist_freq:
		artist_freq[x] += 1
	else:
		artist_freq[x] = 1	

top_artists = sorted(artist_freq.items(), key=lambda x: x[1], reverse=True)

top_10_artists = top_artists[:10]

for pair in top_10_artists:
	print "{} {}".format(pair[0], pair[1])

import pdb; pdb.set_trace()












