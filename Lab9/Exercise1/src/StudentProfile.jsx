import React from "react";

function StudentProfile() {
  const name = "Lalith Mourya";
  const department = "Computer Science";
  const year = "3rd Year";
  const Regno = "23BCE8550";

  return (
    <div className="card">
      <h1>Student Profile</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Registration Number:</strong> {Regno}</p>
    </div>
  );
}

export default StudentProfile;