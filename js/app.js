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
    } catch (error) {
        sectionProcessingStatus.textContent = `Error processing file: ${error.message}`;
        userData.disabled = false;
    }
});