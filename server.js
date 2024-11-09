const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Use the correct path for the PDF folder
const policyFolder = path.resolve('public', 'pdfs');  // Make sure this points to the correct location
console.log('Policy folder path:', policyFolder);  // Log the path for debugging

app.use(cors());  // Enable cross-origin requests (if needed)
app.set('view engine', 'ejs');  // Set EJS as the view engine for HTML rendering

// Serve the PDF files from the static folder
app.use('/pdfs', express.static(policyFolder));

// Endpoint to fetch the list of PDFs
app.get('/policies', (req, res) => {
  fs.readdir(policyFolder, (err, files) => {
    if (err) {
      console.log('Error reading policy folder:', err);  // Log error if folder can't be read
      return res.status(500).json({ error: 'Could not read policy folder' });
    }

    const pdfFiles = files
      .filter(file => path.extname(file).toLowerCase() === '.pdf')
      .map(file => ({ name: file, path: `/pdfs/${file}` }));  // Correct path syntax here

    if (pdfFiles.length === 0) {
      console.log('No PDFs found in the policy folder');  // Log if no PDFs found
      return res.status(404).json({ error: 'No PDF files found in policy folder' });
    }

    res.json(pdfFiles);  // Send back the list of PDFs
  });
});

// Serve the main page (index.ejs)
app.get('/', (req, res) => {
  res.render('index');  // Render the index.ejs page for frontend
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
