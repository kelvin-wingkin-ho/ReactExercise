import { useState, type ChangeEvent } from "react";

interface Student {
  id: number;
  name: string;
}

export default function StudentApp() {
  const [students, setStudents] = useState<Student[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddStudent = () => {
    if (inputValue.trim() === "") return;

    const newStudent: Student = {
      id: Date.now(),
      name: inputValue.trim(),
    };

    setStudents([...students, newStudent]);
    setInputValue("");
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Student Management</h2>

      {/* Input Seection */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Student Name"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button style={{ padding: "8px 16px" }} onClick={handleAddStudent}>
          Add
        </button>
      </div>

      {/* Student Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
            <th style={{ textAlign: "right", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{student.name}</td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                <button onClickCapture={() => handleDeleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && <p>No students in the list</p>}
    </div>
  );
}
