function startStat () {
    if (files != undefined && files.length > 0) {
        for(const currentFile of files) {
            files[currentFile.name.replace('.csv', '')] = currentFile.data;
        }
    }

    watched = files['watched'];
    watchlist = files['watchlist'];

    displayMenuYears(watched);
    
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

function displayMenuYears (watched) {
    const menuYearsDiv = document.getElementById('dashboard-menu-years');
    const currentYear = new Date().getFullYear();
    const minYear = Math.min(...watched.map(movie => new Date(movie.date).getFullYear()));
    const maxYear = Math.max(...watched.map(movie => new Date(movie.date).getFullYear()));

    const allYearsButton = document.createElement('button');
    allYearsButton.textContent = 'All';
    allYearsButton.classList.add('active-year-button');
    menuYearsDiv.appendChild(allYearsButton);

    for (let year = currentYear; year >= currentYear-3; year--) {
        const button = document.createElement('button');
        button.textContent = year;
        button.addEventListener('click', () => {
            // TO IMPLEMENT
        });
        menuYearsDiv.appendChild(button);
    }

    // ADD RANGE INPUTS
    const rangeContainer = document.createElement('div');
    const fromInput = document.createElement('input');
    fromInput.type = 'number';
    fromInput.placeholder = 'From year';
    fromInput.min = minYear;
    fromInput.max = maxYear;
    rangeContainer.appendChild(fromInput);

    const toInput = document.createElement('input');
    toInput.type = 'number';
    toInput.placeholder = 'To year';
    toInput.min = minYear;
    toInput.max = maxYear;
    rangeContainer.appendChild(toInput);

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.addEventListener('click', () => {
        const fromYear = parseInt(fromInput.value);
        const toYear = parseInt(toInput.value);
        if (isNaN(fromYear) || isNaN(toYear) || fromYear > toYear) {
            // TO IMPLEMENT: show error message
        }
        // TO IMPLEMENT
    });
    rangeContainer.appendChild(applyButton);
    
    menuYearsDiv.appendChild(rangeContainer);
}