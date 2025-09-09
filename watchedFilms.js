import { films } from "./data.js";


document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#filmTable tbody");

    let sortDirection = {
        title: 'asc',
        director: 'asc',
        year: 'asc',
        myRating: 'asc',
        imdbRating: 'asc',
        country:'asc',
        duration: 'asc',
        language:'asc'
    };

    // Filmleri tabloya ekleme
    function populateTable(films) {
        tbody.innerHTML = ''; // Mevcut tabloyu temizle
        films.forEach((film) => {
            const tr = document.createElement("tr");
            tr.addEventListener('click', () => {
                window.open(film.imdbLink, '_blank') });

            tr.innerHTML = `
                <td>${film.title}</td>
                <td>${film.director}</td>
                <td>${film.year}</td>
                <td>${film.myRating}</td>
                <td>${film.imdbRating}</td>
                <td>${film.country}</td>
                <td class= flex-container-small>${film.duration}</td>
                <td class= "flex-container-small">${film.language}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Sayfa yüklendiğinde Benim Puanıma göre sıralama yap (yüksekten aza)
    function sortFilmsByRating(films) {
        return films.sort((a, b) => b.myRating - a.myRating);
    }

    // Sorting by clicking table headers 
    function sortTable(columnIndex, dir = 'asc') {
        const sortedFilms = [...films].sort((a, b) => {
            let x = Object.values(a)[columnIndex];
            let y = Object.values(b)[columnIndex];

            if (dir === 'asc') {
                return x > y ? 1 : -1;
            } else {
                return x < y ? 1 : -1;
            }
        });
        populateTable(sortedFilms);
    }

    // Başlangıçta Benim Puanıma göre sıralama
    populateTable(sortFilmsByRating(films));

    // function of changing the direction of sort
    function toggleSortDirection(key) {
        sortDirection[key] = sortDirection[key] === 'asc' ? 'desc' : 'asc';
    }

    // Sıralama işlemleri için tablo başlıklarına event listener ekleyelim
    document.getElementById('film').addEventListener('click', () => {
        toggleSortDirection("title");
        sortTable(0,sortDirection['title']);
    });

    document.getElementById('director').addEventListener('click', () => {
        toggleSortDirection("director");
        sortTable(5,sortDirection['director']);
    });  

    document.getElementById('year').addEventListener('click', () => {
        toggleSortDirection("year");
        sortTable(1,sortDirection['year']);
    });


    // Default, selected initially.
    document.getElementById('rating').addEventListener('click', () => {
        toggleSortDirection("rating");
        sortTable(2,sortDirection['rating']);
    });
 
    document.getElementById('imdb').addEventListener('click', () => {
        toggleSortDirection("imdb");
        sortTable(3,sortDirection['imdb']);
    });

    document.getElementById('country').addEventListener('click', () => {
        toggleSortDirection("country");
        sortTable(4,sortDirection['country']);
    });

    document.getElementById('duration').addEventListener('click', () => {
        toggleSortDirection("duration");
        sortTable(6,sortDirection['duration']);
    });

    document.getElementById('language').addEventListener('click', () => {
        toggleSortDirection("language");
        sortTable(7,sortDirection['language']);
    });

});

