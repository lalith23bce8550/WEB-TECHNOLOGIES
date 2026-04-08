const fs = require('fs');

fs.writeFile('test.txt', 'Hello, this is Node.js!', (err) => {
    if (err) throw err;
    console.log('File created and written');

    fs.readFile('test.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('File content:', data);

        fs.appendFile('test.txt', '\nAppended text', (err) => {
            if (err) throw err;
            console.log('Data appended');

            fs.unlink('test.txt', (err) => {
                if (err) throw err;
                console.log('File deleted');
            });
        });
    });
});