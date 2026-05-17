const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('PiForge_GDD_v6.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('PiForge_GDD_v6.txt', data.text);
    console.log("PDF extraction complete.");
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
