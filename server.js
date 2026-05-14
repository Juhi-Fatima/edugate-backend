const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// This is our list of Teachers with their secret codes
const teacherDatabase = [
    { name: "Miss Sara", pin: "1111" },
    { name: "Miss Zoha", pin: "2222" },
    { name: "Mr. Arif", pin: "3333" }
];

app.post('/verify', (req, res) => {
    const { enteredPin } = req.body;
    
    // Look for the teacher who has this PIN
    const teacher = teacherDatabase.find(t => t.pin === enteredPin);
    
    if (teacher) {
        res.send({ status: "APPROVED", teacherName: teacher.name }); 
    } else {
        res.send({ status: "DENIED" });   
    }
});

// This tells the app to use Azure's port, or 8080 as a fallback
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
