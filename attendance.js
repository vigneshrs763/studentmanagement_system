function markAttendance(index, status) {

    students[index].attendance = status;

    saveStudents();

    displayStudents();

    updateAttendanceCard();
}

function getPresentStudents() {

    return students.filter(
        student => student.attendance === "Present"
    ).length;
}

function getAbsentStudents() {

    return students.filter(
        student => student.attendance === "Absent"
    ).length;
}

function calculateAttendancePercentage() {

    const totalStudents = students.length;

    if (totalStudents === 0) {
        return "0%";
    }

    const presentStudents =
        getPresentStudents();

    const percentage =
        (
            (presentStudents / totalStudents) * 100
        ).toFixed(2);

    return percentage + "%";
}

function updateAttendanceCard() {

    const attendanceElement =
        document.getElementById(
            "attendancePercentage"
        );

    if (attendanceElement) {

        attendanceElement.innerText =
            calculateAttendancePercentage();
    }
}

function markAllPresent() {

    students.forEach(student => {

        student.attendance =
            "Present";
    });

    saveStudents();

    displayStudents();

    updateAttendanceCard();
}

function markAllAbsent() {

    students.forEach(student => {

        student.attendance =
            "Absent";
    });

    saveStudents();

    displayStudents();

    updateAttendanceCard();
}

function attendanceReport() {

    return students.map(student => {

        return {

            id: student.id,

            name: student.name,

            attendance:
                student.attendance
        };
    });
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAttendanceCard();
    }
);