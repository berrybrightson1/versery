const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
    { name: 'sanctuary.ogg', url: 'https://www.orangefreesounds.com/wp-content/uploads/2017/05/Dreamy-ambient-background-music-loop.mp3' },
];

const downloadDir = path.join(__dirname, 'public', 'sounds');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

downloads.forEach(file => {
    const filePath = path.join(downloadDir, file.name);
    const fileStream = fs.createWriteStream(filePath);

    console.log(`Downloading ${file.name}...`);

    https.get(file.url, options, (response) => {
        if (response.statusCode === 200) {
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${file.name}`);
            });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
            console.log(`Redirecting ${file.name} to ${response.headers.location}`);
            https.get(response.headers.location, options, (redirectResponse) => {
                if (redirectResponse.statusCode === 200) {
                    redirectResponse.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        console.log(`Downloaded ${file.name}`);
                    });
                } else {
                    console.error(`Failed to download redirect for ${file.name}: ${redirectResponse.statusCode}`);
                    fileStream.close();
                    fs.unlink(filePath, () => { });
                }
            }).on('error', (err) => {
                fs.unlink(filePath, () => { });
                console.error(`Error downloading redirect ${file.name}: ${err.message}`);
            });
        } else {
            console.error(`Failed to download ${file.name}: ${response.statusCode}`);
            fileStream.close();
            fs.unlink(filePath, () => { }); // Delete empty file
        }
    }).on('error', (err) => {
        fs.unlink(filePath, () => { }); // Delete empty file
        console.error(`Error downloading ${file.name}: ${err.message}`);
    });
});
