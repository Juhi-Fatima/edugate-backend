const express = require('express');
const cors = require('cors');
const app = express();

// 1. OPEN THE SECURITY GATE (CORS)
// This tells Azure: "Let my website talk to this server!"
app.use(cors()); 
app.use(express.json());

// 2. TEACHER DATA
const teacherDatabase = [
    { name: "Miss Sara", pin: "1111" },
    { name: "Miss Zoha", pin: "2222" },
    { name: "Mr. Arif", pin: "3333" }
];

// 3. THE "WAKE UP" SIGNAL (Crucial Fix)
// When the frontend checks if the brain is online, this responds "YES!"
app.get('/', (req, res) => {
    res.json({ status: "online", message: "Server is awake and ready!" });
});

// 4. THE PIN CHECKER
app.post('/verify', (req, res) => {
    const { enteredPin } = req.body;
    
    const teacher = teacherDatabase.find(t => t.pin === enteredPin);
    
    if (teacher) {
        // Use .json instead of .send for better compatibility
        res.json({ status: "APPROVED", teacherName: teacher.name }); 
    } else {
        res.json({ status: "DENIED" });   
    }
});

// 5. AZURE CONNECTION
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
