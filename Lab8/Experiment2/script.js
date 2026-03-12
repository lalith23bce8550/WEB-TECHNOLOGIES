const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

console.log(id, name, department, marks);

const updatedStudent = {
    ...student,
    grade: "A"
};

console.log(updatedStudent);

document.getElementById("result").innerHTML =
`ID: ${id} <br>
Name: ${name} <br>
Department: ${department} <br>
Marks: ${marks} <br>
Grade: ${updatedStudent.grade}`;