"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const lokijs_1 = __importDefault(require("lokijs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// initialize LokiJS
const db = new lokijs_1.default("students.db");
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
    }
    else {
        res.status(404).send("Not found");
    }
});
app.delete("/api/students/:id", (req, res) => {
    const student = students.get(Number(req.params.id));
    if (student) {
        students.remove(student);
        res.status(204).send();
    }
    else {
        res.status(404).send("Not found");
    }
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
//# sourceMappingURL=server.js.map