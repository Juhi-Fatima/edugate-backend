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

app.listen(5000, () => console.log("EduGate Brain: ONLINE at Port 5000"));