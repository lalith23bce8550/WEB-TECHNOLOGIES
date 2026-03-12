// Student details
let studentName = "Mourya";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

// Arrow function to calculate average
const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

// Calculate total
let total = mark1 + mark2 + mark3;

// Calculate average
let average = calculateAverage(mark1, mark2, mark3);

// Display results using template literals
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${total}`);
console.log(`Average Marks: ${average.toFixed(2)}`);

// Display on webpage
document.getElementById("output").innerHTML =
`Student Name: ${studentName} <br>
Total Marks: ${total} <br>
Average Marks: ${average.toFixed(2)}`;