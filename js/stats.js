function startStat () {
    if (files != undefined && files.length > 0) {
        for(const currentFile of files) {
            files[currentFile.name.replace('.csv', '')] = currentFile.data;
        }
    }
    console.log(files['watched']);

    totalMovies();
}

function totalMovies () {
    const countNumber = files['watched'].length;
    const totalMoviesElement = document.getElementById('total-movies-count');
    totalMoviesElement.textContent = countNumber;
}