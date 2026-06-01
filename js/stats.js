function startStat () {
    if (files != undefined && files.length > 0) {
        for(const currentFile of files) {
            files[currentFile.name.replace('.csv', '')] = currentFile.data;
        }
    }
    console.log(files['watched']);
    console.log("---------------------------------------");
    console.log(files);
    
    
    totalMovies();
    totalMoviesWatchlist();
}

function totalMovies () {
    const countNumber = files['watched'].length;
    const totalMoviesElement = document.getElementById('total-movies-count');
    totalMoviesElement.textContent = countNumber;
}

function totalMoviesWatchlist () {
    const countNumber = files['watchlist'].length;
    const totalMoviesElement = document.getElementById('total-watchlist-movies-count');
    totalMoviesElement.textContent = countNumber;
}