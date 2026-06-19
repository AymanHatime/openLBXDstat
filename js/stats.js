function startStat () {
    if (files != undefined && files.length > 0) {
        for(const currentFile of files) {
            files[currentFile.name.replace('.csv', '')] = currentFile.data;
        }
    }
    
    displayNumberOfMovies('total-movies', files['watched'].length, 'You have watched', 'movies');
    displayNumberOfMovies('total-watchlist-movies', files['watchlist'].length, 'You have', 'movies to watch');
}

function displayNumberOfMovies (idDiv, number, title, desscription) {
    const div = document.getElementById(idDiv);

    const titleElement = document.createElement('p');
    titleElement.textContent = title;
    div.appendChild(titleElement);

    const displayedValue = document.createElement('p');

    const spanNumber = document.createElement('span');
    spanNumber.textContent = number;
    spanNumber.classList.add('dashboard-movie-number');
    displayedValue.appendChild(spanNumber);

    displayedValue.appendChild(document.createTextNode(' ' + desscription));

    div.appendChild(displayedValue);
}
