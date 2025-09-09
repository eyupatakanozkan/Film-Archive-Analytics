import pandas as pd
import json

#load excel file
df = pd.read_excel(r"C:\Users\tuğba eyüp\Desktop\watched movies\imdbdataframe\updated_films_with_imdb.xlsx", sheet_name= 'watchedMovies', engine='openpyxl')

#change to dataframe JSON format
films_json = df.to_json(orient='records', force_ascii=False, indent=4)

with open('films.json','w', encoding= 'utf-8') as f:
  f.write(films_json)

print("Excel converted successfully")
