let studentChart = null;

function loadStudentChart() {

    const canvas =
        document.getElementById("studentChart");

    if (!canvas) return;

    if (studentChart) {
        studentChart.destroy();
    }

    const presentStudents =
        students.filter(
            s => s.attendance === "Present"
        ).length;

    const absentStudents =
        students.filter(
            s => s.attendance === "Absent"
        ).length;

    const grades = {
        "A+": 0,
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "F": 0
    };

    students.forEach(student => {

        if (grades[student.grade] !== undefined) {
            grades[student.grade]++;
        }

    });

    studentChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [
                "Present",
                "Absent",
                "A+",
                "A",
                "B",
                "C",
                "D",
                "F"
            ],

            datasets: [{

                label: "Student Analytics",

                data: [
                    presentStudents,
                    absentStudents,
                    grades["A+"],
                    grades["A"],
                    grades["B"],
                    grades["C"],
                    grades["D"],
                    grades["F"]
                ]
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = function () {
    loadStudentChart();
};