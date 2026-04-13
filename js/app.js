const userData = document.getElementById('lbzip');
const userDataStatus = document.getElementById('lbzip-status');
const processDataButton = document.getElementById('process-data-btn');

let file = null;
let formatedDataJson = [];

/**
 * Collect the user data file and validate it is a .zip file.
 */
userData.addEventListener('change', () => {
    processDataButton.disabled = true;
    file = userData.files[0];
    
    if (!file) {
        userDataStatus.textContent = 'No file selected.';
    } else {
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.zip')) {
            userDataStatus.textContent = `Selected file: ${file.name}`;
            processDataButton.disabled = false;
        } else {
            userDataStatus.textContent = `You selected ${file.name} Please select a valid .zip file.`;
            file = null;
        }
    }
});

document.getElementById('upload-btn').addEventListener('click', () => {
    userData.click();
});

/**
 * Unzip the user data.
 */
processDataButton.addEventListener('click', async () => {
    const sectionProcessingStatus = document.getElementById('upload-section-processing-status');
    userData.disabled = true;
    processDataButton.disabled = true;
    sectionProcessingStatus.textContent = 'Processing...';

    try {
        const zip = await JSZip.loadAsync(file);    
        console.log(zip);
        
        sectionProcessingStatus.textContent = 'Folder unzipped successfully.';

        for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
            if (!zipEntry.dir) {
                const fileData = await zipEntry.async('string');
                let jsonData;
                Papa.parse(fileData, {
                    complete: function(results) {
                        jsonData = results;
                    }
                });
                formatedDataJson.push(jsonData);
            }
        }

        console.log(formatedDataJson);
        sectionProcessingStatus.textContent = 'All files processed successfully.';
        document.querySelector('nav').classList.remove('is-hidden');
        changeSection('dashboard-section');

        document.querySelectorAll('header p').forEach(p => p.classList.add('is-hidden'));
    } catch (error) {
        sectionProcessingStatus.textContent = `Error processing file: ${error.message}`;
        userData.disabled = false;
    }
});


/**
 * Navigation Managment
 */
const navLinks = document.querySelectorAll('nav button');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const clickedLink = event.currentTarget.id.replace('nav-', '');
        changeSection(clickedLink);
        navLinks.forEach(navLink => {
            if (navLink === event.currentTarget) {
                navLink.classList.add('current-page');
            } else {
                navLink.classList.remove('current-page');
            }
        });
    });
});


/**
 * Navigation function to switch between sections of the application.
 */
function changeSection (sectionId) {
    const sections = document.querySelectorAll('main > section');
    let foundSection = false;
    
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('is-hidden');
            foundSection = true;
        } else {
            section.classList.add('is-hidden');
        }
    });

    if (!foundSection) {
        console.error(`Section with id "${sectionId}" not found.`);
    }
}