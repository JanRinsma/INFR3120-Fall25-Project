const express = require('express');
const path = require('path');
const app = express();

//Changes all the files to be static.
app.use(express.static(path.join(__dirname)));

//Default is our login file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

//This lets us use either heroku or our PORT 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));