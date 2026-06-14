let students = JSON.parse(localStorage.getItem("students")) || [];

// Generate Student ID
function generateID() {
    return "STU" + Date.now();
}

// Calculate Grade
function calculateGrade(marks) {
    marks = Number(marks);

    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";

    return "F";
}

// Save Students
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Add Student
function addStudent() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value.trim();
    const marks = Number(document.getElementById("marks").value);

    if (!name || !age || !course || isNaN(marks)) {
        alert("Please fill all fields");
        return;
    }

    if (marks < 0 || marks > 100) {
        alert("Marks must be between 0 and 100");
        return;
    }

    students.push({
        id: generateID(),
        name: name,
        age: age,
        course: course,
        marks: marks,
        attendance: "Present",
        grade: calculateGrade(marks)
    });

    saveStudents();
    displayStudents();
    clearForm();
}

// Clear Form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}

// Display Students
function displayStudents() {
    const table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>

            <td>
                <button class="attendance-btn"
                    onclick="markAttendance(${index}, 'Present')">
                    Present
                </button>

                <button class="delete-btn"
                    onclick="markAttendance(${index}, 'Absent')">
                    Absent
                </button>

                <br><br>

                ${student.attendance}
            </td>

            <td>${student.grade}</td>

            <td>
                <button class="edit-btn"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateDashboard();
}

// Edit Student
function editStudent(index) {
    const student = students[index];

    const newName = prompt("Enter Name", student.name);
    const newAge = prompt("Enter Age", student.age);
    const newCourse = prompt("Enter Course", student.course);
    const newMarks = Number(prompt("Enter Marks", student.marks));

    if (!newName || !newAge || !newCourse) return;

    if (newMarks < 0 || newMarks > 100) {
        alert("Marks must be between 0 and 100");
        return;
    }

    students[index] = {
        ...student,
        name: newName,
        age: newAge,
        course: newCourse,
        marks: newMarks,
        grade: calculateGrade(newMarks)
    };

    saveStudents();
    displayStudents();
}

// Delete Student
function deleteStudent(index) {
    if (confirm("Delete Student?")) {
        students.splice(index, 1);
        saveStudents();
        displayStudents();
    }
}

// Search Student
function searchStudent() {
    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";
    });
}

// Dashboard Update
function updateDashboard() {
    const total = students.length;

    const present = students.filter(
        student => student.attendance === "Present"
    ).length;

    const absent = students.filter(
        student => student.attendance === "Absent"
    ).length;

    const averageMarks =
        total > 0
            ? (
                students.reduce(
                    (sum, student) => sum + Number(student.marks),
                    0
                ) / total
            ).toFixed(2)
            : 0;

    const totalElement = document.getElementById("totalStudents");
    const presentElement = document.getElementById("presentStudents");
    const absentElement = document.getElementById("absentStudents");
    const averageElement = document.getElementById("averageMarks");
    const highestElement = document.getElementById("highestMarks");
    const lowestElement = document.getElementById("lowestMarks");

    if (totalElement) totalElement.innerText = total;
    if (presentElement) presentElement.innerText = present;
    if (absentElement) absentElement.innerText = absent;
    if (averageElement) averageElement.innerText = averageMarks;

    if (highestElement && typeof getHighestMarks === "function") {
        highestElement.innerText = getHighestMarks();
    }

    if (lowestElement && typeof getLowestMarks === "function") {
        lowestElement.innerText = getLowestMarks();
    }

    if (typeof updateAttendanceCard === "function") {
        updateAttendanceCard();
    }
}

// Initial Load
displayStudents();