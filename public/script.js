// script.js
document.getElementById("studentForm").addEventListener("submit", addStudent);

function addStudent(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let rollNo = document.getElementById("rollNo").value;
  let branch = document.getElementById("branch").value;
  let prn = document.getElementById("prn").value;
  let semester = document.getElementById("semester").value;

  fetch("/addstudent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      rollNo: rollNo,
      branch: branch,
      prn: prn,
      semester: semester,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      document.getElementById("studentForm").reset();
      getStudents();
    })
    .catch((err) => console.log(err));
}

function getStudents() {
  fetch("/getstudents")
    .then((res) => res.json())
    .then((data) => {
      let records = document.getElementById("records");
      records.innerHTML = "";
      data.forEach((student) => {
        let studentDiv = document.createElement("div");
        studentDiv.classList.add("student-record");
        studentDiv.innerHTML = `
          <p>Name: ${student.name}</p>
          <p>Email: ${student.email}</p>
          <p>Roll Number: ${student.rollNo}</p>
          <p>Branch: ${student.branch}</p>
          <p>PRN: ${student.prn}</p>
          <p>Semester: ${student.semester}</p>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        `;
        records.appendChild(studentDiv);
      });
    })
    .catch((err) => console.log(err));
}

function deleteStudent(id) {
  fetch(`/deletestudent/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      getStudents();
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", getStudents);
