import React from "react";

function StudentCard({ name, department, marks }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.name}>{name}</h2>
      </div>
      <div style={styles.cardBody}>
        <p style={styles.detail}>
          <strong>Department:</strong> {department}
        </p>
        <p style={styles.detail}>
          <strong>Marks:</strong> {marks}
        </p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHeader: {
    backgroundColor: "#667eea",
    color: "#fff",
    padding: "16px",
    borderBottom: "4px solid #764ba2",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  cardBody: {
    padding: "16px",
  },
  detail: {
    fontSize: "16px",
    color: "#333",
    margin: "8px 0",
    lineHeight: "1.6",
  },
};

export default StudentCard;
