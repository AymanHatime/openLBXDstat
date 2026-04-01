const userData = document.getElementById('lbzip');
const userDataStatus = document.getElementById('lbzip-status');

userData.addEventListener('change', () => {
    const file = userData.files[0];
    
    if (!file) {
        userDataStatus.textContent = 'No file selected.';
    } else {
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.zip')) {
            userDataStatus.textContent = `Selected file: ${file.name}`;
        } else {
            userDataStatus.textContent = 'Please select a valid .zip file.';
        }
    }
});