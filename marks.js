// ==========================
// HIGHEST MARKS
// ==========================

function getHighestMarks() {

    if (students.length === 0)
        return 0;

    return Math.max(
        ...students.map(
            student =>
                Number(student.marks)
        )
    );
}

// ==========================
// LOWEST MARKS
// ==========================

function getLowestMarks() {

    if (students.length === 0)
        return 0;

    return Math.min(
        ...students.map(
            student =>
                Number(student.marks)
        )
    );
}

// ==========================
// AVERAGE MARKS
// ==========================

function getAverageMarks() {

    if (students.length === 0)
        return 0;

    const total =
        students.reduce(
            (sum, student) =>
                sum +
                Number(student.marks),
            0
        );

    return (
        total / students.length
    ).toFixed(2);
}

// ==========================
// TOPPER
// ==========================

function getTopper() {

    if (students.length === 0)
        return null;

    let topper =
        students[0];

    students.forEach(student => {

        if (
            Number(student.marks) >
            Number(topper.marks)
        ) {

            topper = student;
        }
    });

    return topper;
}

// ==========================
// GRADE COUNT
// ==========================

function getGradeStats() {

    const grades = {

        "A+": 0,
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "F": 0
    };

    students.forEach(student => {

        grades[
            student.grade
        ]++;
    });

    return grades;
}

// ==========================
// PERFORMANCE REPORT
// ==========================

function generatePerformanceReport() {

    return {

        totalStudents:
            students.length,

        highestMarks:
            getHighestMarks(),

        lowestMarks:
            getLowestMarks(),

        averageMarks:
            getAverageMarks(),

        topper:
            getTopper(),

        grades:
            getGradeStats()
    };
}