import requests
import pandas as pd
import time

# OMDb API anahtarı
api_key = "b03197bd"

# Excel dosyasını yükle
df = pd.read_excel(".\\newmovie.xlsx")

# Boş olmayan film adı olan satırları filtrele
df = df[df["Name"].notna() & df["Year"].notna() & df["Rating"].notna() ]

# Film bilgilerini saklayacağımız liste
film_data_list = []

delay = 2

# Her film için OMDb API'den verileri çek
for index, row in df.iterrows():
    title = row["Name"]
    year = int(row["Year"])
    my_rating = row["Rating"]
    url = f"http://www.omdbapi.com/?t={title}&y={year}&apikey={api_key}"
    
    try:

        response = requests.get(url)
        response.raise_for_status() #checking for http mistakes 
        data = response.json()
    
        # API'den gelen verilerle tabloyu doldur
        if data["Response"] == "True":
            film_data = {
                "title": title,
                "year": year,
                "myRating": my_rating,
                "imdbRating": data.get("imdbRating"),
                "country": data.get("Country"),
                "director": data.get("Director"),
                "duration": data.get("Runtime"),
                "language": data.get("Language"),
                "imdbLink": f"https://www.imdb.com/title/{data.get('imdbID')}/"
            }
            film_data_list.append(film_data)
        else:
            print(f"Film bulunamadı: {title} ({year})")

    except (requests.exceptions.HTTPError, requests.exceptions.ConnectionError) as e:
        print(f"API isteğinde hata: {e}")
    
    time.sleep(delay)
# Çekilen verileri bir DataFrame'e dönüştür
updated_df = pd.DataFrame(film_data_list)


# IMDb verileriyle birlikte yeni bir Excel dosyasına kaydet
updated_df.to_excel("notfound.xlsx", index=False)

# #Varolan excel sheetinde yeni sheet yaratarak oluşturma.
# with pd.ExcelWriter('updated_films_with_imdb.xlsx', mode='a', engine='openpyxl') as writer:  
#     updated_df.to_excel(writer, sheet_name='notfoundd',index=False)


print("IMDb verileri başarıyla çekildi ve dosya oluşturuldu.")