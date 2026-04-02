import React from "react";
import StudentCard from "./StudentCard.jsx";

function App() {
  // Student data array
  const students = [
    {
      id: 1,
      name: "Lalith Mourya",
      department: "Computer Science",
      marks: 92,
    },
    {
      id: 2,
      name: "Priya Sharma",
      department: "Electronics",
      marks: 88,
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      department: "Mechanical",
      marks: 85,
    },
    {
      id: 4,
      name: "Ananya Singh",
      department: "Computer Science",
      marks: 95,
    },
    {
      id: 5,
      name: "Vikram Patel",
      department: "Civil",
      marks: 80,
    },
    {
      id: 6,
      name: "Neha Gupta",
      department: "Electrical",
      marks: 90,
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Student Cards</h1>
        <p style={styles.subtitle}>Displaying multiple student profiles with reusable components</p>
      </header>

      <div style={styles.cardsGrid}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  header: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "40px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    opacity: 0.9,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
};

export default App;
