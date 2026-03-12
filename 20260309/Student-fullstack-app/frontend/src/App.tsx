import { useState } from "react";
import { useStudents } from "./hooks/useStudents";

export default function App() {
  const { students, add, update, remove, loading, error } = useStudents();
  const [newName, setNewName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string | null>(null);

  const handleAddStudent = async () => {
    console.log("Adding student:", newName);
    if (!newName) return;
    await add(newName);
    setNewName("");
  };

  const handleUpdateStudent = async (id: number) => {
    if (!editName) return;
    await update(id, editName);
    setEditingId(null);
  };

  const handleDeleteStudent = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await remove(id);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* header */}
      <header style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
        <input
          value={newName}
          placeholder="Student Name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAddStudent}>Add</button>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* table */}
      <table
        border={1}
        cellPadding={10}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.$loki}>
                <td>{student.$loki}</td>
                <td>
                  {editingId === student.$loki ? (
                    <input
                      value={editName ?? ""}
                      onChange={(e) => {
                        setEditName(e.target.value);
                      }}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingId === student.$loki ? (
                    <button onClick={() => handleUpdateStudent(student.$loki)}>
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(student.$loki);
                        setEditName(student.name);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  &nbsp;
                  {/* delete button */}
                  <button onClick={() => handleDeleteStudent(student.$loki)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
