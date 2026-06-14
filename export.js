// ===============================
// EXPORT TO PDF
// ===============================

function exportPDF() {

    if (students.length === 0) {

        alert(
            "No student data available"
        );

        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "Student Management Report",
        20,
        20
    );

    let y = 40;

    students.forEach(
        (student, index) => {

            doc.text(

                `${index + 1}. ${student.name}
 | ${student.course}
 | Marks: ${student.marks}
 | Grade: ${student.grade}
 | Attendance: ${student.attendance}`,

                10,

                y
            );

            y += 10;

            if (y > 270) {

                doc.addPage();

                y = 20;
            }
        }
    );

    doc.save(
        "Student_Report.pdf"
    );
}

// ===============================
// EXPORT TO EXCEL
// ===============================

function exportExcel() {

    if (students.length === 0) {

        alert(
            "No student data available"
        );

        return;
    }

    const excelData =
        students.map(student => ({

            ID: student.id,

            Name: student.name,

            Age: student.age,

            Course: student.course,

            Marks: student.marks,

            Grade: student.grade,

            Attendance:
                student.attendance
        }));

    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Students"
    );

    XLSX.writeFile(

        workbook,

        "Student_Report.xlsx"
    );
}