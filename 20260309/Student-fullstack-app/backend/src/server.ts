import express from "express";
import cors from "cors";
import loki from "lokijs";

const app = express();
app.use(cors());
app.use(express.json());

// initialize LokiJS
const db = new loki("students.db");
const students = db.addCollection("students");

// Routes
app.get("/api/students", (req, res) => {
  res.json(students.find());
});

app.post("/api/students", (req, res) => {
  const newStudent = students.insert({ name: req.body.name });
  res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
  const student = students.get(Number(req.params.id));
  if (student) {
    student.name = req.body.name;
    students.update(student);
    res.json(student);
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/api/students/:id", (req, res) => {
  const student = students.get(Number(req.params.id));
  if (student) {
    students.remove(student);
    res.status(204).send();
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
