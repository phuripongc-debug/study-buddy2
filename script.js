/* =====================================================
   STUDY BUDDY
   Main JavaScript
===================================================== */


/* ================= DATA ================= */

let schedules =
    JSON.parse(localStorage.getItem("studyBuddySchedules")) || [

        {
            day: "จันทร์",
            time: "09:00 - 12:00",
            subject: "วิศวกรรมซอฟต์แวร์",
            room: "CE-301",
            teacher: "อาจารย์ A"
        },

        {
            day: "พุธ",
            time: "13:00 - 16:00",
            subject: "Data Structure",
            room: "CE-302",
            teacher: "อาจารย์ B"
        },

        {
            day: "ศุกร์",
            time: "09:00 - 12:00",
            subject: "Artificial Intelligence",
            room: "AI-201",
            teacher: "อาจารย์ C"
        }

    ];


let assignments =
    JSON.parse(localStorage.getItem("studyBuddyAssignments")) || [

        {
            name: "แบบฝึกหัดวิศวกรรมซอฟต์แวร์",
            detail: "ส่งใบงานบทที่ 3",
            date: "2026-10-05T23:59"
        },

        {
            name: "แบบฝึกหัด Data Structure",
            detail: "Linked List",
            date: "2026-10-08T23:59"
        }

    ];


let exams =
    JSON.parse(localStorage.getItem("studyBuddyExams")) || [

        {
            subject: "วิศวกรรมซอฟต์แวร์",
            date: "2026-10-10",
            time: "09:00 - 12:00",
            room: "CE-301"
        }

    ];


let appointments =
    JSON.parse(localStorage.getItem("studyBuddyAppointments")) || [

        {
            name: "ประชุมงานกลุ่ม",
            date: "2026-10-05",
            time: "13:00",
            room: "CE-301"
        }

    ];


let announcements =
    JSON.parse(localStorage.getItem("studyBuddyAnnouncements")) || [

        {
            title: "แจ้งกำหนดส่งงาน",
            detail: "อย่าลืมส่งแบบฝึกหัดวิชาวิศวกรรมซอฟต์แวร์",
            date: "วันนี้"
        },

        {
            title: "แจ้งเปลี่ยนห้องเรียน",
            detail: "คาบวันศุกร์ย้ายไปห้อง CE-302",
            date: "เมื่อวาน"
        }

    ];


/* ================= SAVE ================= */

function saveData() {

    localStorage.setItem(
        "studyBuddySchedules",
        JSON.stringify(schedules)
    );

    localStorage.setItem(
        "studyBuddyAssignments",
        JSON.stringify(assignments)
    );

    localStorage.setItem(
        "studyBuddyExams",
        JSON.stringify(exams)
    );

    localStorage.setItem(
        "studyBuddyAppointments",
        JSON.stringify(appointments)
    );

    localStorage.setItem(
        "studyBuddyAnnouncements",
        JSON.stringify(announcements)
    );
}


/* ================= PAGE ================= */

function showPage(pageId, button = null) {

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active");

    });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }


    document.querySelectorAll(".menu").forEach(menu => {

        menu.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }
    else {

        document.querySelectorAll(".menu").forEach(menu => {

            const onclick =
                menu.getAttribute("onclick") || "";

            if (
                onclick.includes(
                    "'" + pageId + "'"
                )
            ) {

                menu.classList.add("active");

            }

        });

    }


    const titles = {

        dashboard: "หน้าหลัก",
        schedule: "ตารางเรียน",
        assignment: "งานที่ต้องส่ง",
        exam: "ตารางสอบ",
        appointment: "นัดหมาย",
        announcement: "ประกาศ"

    };


    const title =
        document.getElementById("pageTitle");


    if (title && titles[pageId]) {

        title.textContent =
            titles[pageId];

    }

}


/* ================= MODAL ================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.add("show");

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

    }

}


/* ปิด Modal เมื่อกดพื้นหลัง */

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("show");

    }

});


/* ================= TODAY ================= */

function updateToday() {

    const element =
        document.getElementById("today");

    if (!element) return;


    const now =
        new Date();


    element.textContent =
        now.toLocaleDateString(
            "th-TH",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


/* ================= SCHEDULE ================= */

function addSchedule() {

    const day =
        document.getElementById("scheduleDay").value;

    const time =
        document.getElementById("scheduleTime").value.trim();

    const subject =
        document.getElementById("scheduleSubject").value.trim();

    const room =
        document.getElementById("scheduleRoom").value.trim();

    const teacher =
        document.getElementById("scheduleTeacher").value.trim();


    if (!time || !subject) {

        alert("กรุณากรอกวิชาและเวลา");

        return;

    }


    schedules.push({

        day,
        time,
        subject,
        room,
        teacher

    });


    saveData();

    renderSchedules();

    closeModal("scheduleModal");

    document.getElementById("scheduleTime").value = "";
    document.getElementById("scheduleSubject").value = "";
    document.getElementById("scheduleRoom").value = "";
    document.getElementById("scheduleTeacher").value = "";

}


function deleteSchedule(index) {

    if (!confirm("ต้องการลบตารางเรียนนี้หรือไม่?")) {

        return;

    }


    schedules.splice(index, 1);

    saveData();

    renderSchedules();

}


function renderSchedules() {

    const table =
        document.getElementById("scheduleTable");

    if (!table) return;


    if (schedules.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    ยังไม่มีตารางเรียน
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        schedules.map((item, index) => `

            <tr>

                <td>${escapeHTML(item.day)}</td>

                <td>${escapeHTML(item.time)}</td>

                <td><strong>${escapeHTML(item.subject)}</strong></td>

                <td>${escapeHTML(item.room || "-")}</td>

                <td>${escapeHTML(item.teacher || "-")}</td>

                <td>

                    <button
                        class="delete-button"
                        onclick="deleteSchedule(${index})">

                        ลบ

                    </button>

                </td>

            </tr>

        `).join("");

}


/* ================= ASSIGNMENT ================= */

function addAssignment() {

    const name =
        document.getElementById("assignmentName").value.trim();

    const detail =
        document.getElementById("assignmentDetail").value.trim();

    const date =
        document.getElementById("assignmentDate").value;


    if (!name || !date) {

        alert("กรุณากรอกชื่องานและกำหนดส่ง");

        return;

    }


    assignments.push({

        name,
        detail,
        date

    });


    saveData();

    renderAssignments();

    closeModal("assignmentModal");


    document.getElementById("assignmentName").value = "";
    document.getElementById("assignmentDetail").value = "";
    document.getElementById("assignmentDate").value = "";

}


function deleteAssignment(index) {

    if (!confirm("ต้องการลบงานนี้หรือไม่?")) {

        return;

    }


    assignments.splice(index, 1);

    saveData();

    renderAssignments();

}


function renderAssignments() {

    const list =
        document.getElementById("assignmentList");

    const dashboard =
        document.getElementById("dashboardAssignments");

    const count =
        document.getElementById("assignmentCount");


    if (count) {

        count.textContent =
            assignments.length;

    }


    if (list) {

        if (assignments.length === 0) {

            list.innerHTML = `
                <div class="empty">
                    ยังไม่มีงานที่ต้องส่ง
                </div>
            `;

        }
        else {

            list.innerHTML =
                assignments.map((item, index) => {

                    return `

                        <div class="assignment-card">

                            <h3>
                                ${escapeHTML(item.name)}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    item.detail ||
                                    "ไม่มีรายละเอียด"
                                )}
                            </p>

                            <div class="deadline">

                                <span>
                                    ⏰ กำหนดส่ง:
                                    ${formatDateTime(item.date)}
                                </span>

                                <button
                                    class="delete-button"
                                    onclick="deleteAssignment(${index})">

                                    ลบ

                                </button>

                            </div>

                        </div>

                    `;

                }).join("");

        }

    }


    if (dashboard) {

        const latest =
            assignments.slice(0, 3);


        if (latest.length === 0) {

            dashboard.innerHTML = `
                <div class="empty">
                    ยังไม่มีงาน
                </div>
            `;

        }
        else {

            dashboard.innerHTML =
                latest.map(item => `

                    <div class="assignment-mini">

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <p>
                            ${escapeHTML(
                                item.detail ||
                                "ไม่มีรายละเอียด"
                            )}
                        </p>

                        <small>
                            ⏰ ${formatDateTime(item.date)}
                        </small>

                    </div>

                `).join("");

        }

    }

}


/* ================= EXAM ================= */

function addExam() {

    const subject =
        document.getElementById("examSubject").value.trim();

    const date =
        document.getElementById("examDate").value;

    const time =
        document.getElementById("examTime").value.trim();

    const room =
        document.getElementById("examRoom").value.trim();


    if (!subject || !date) {

        alert("กรุณากรอกวิชาและวันที่สอบ");

        return;

    }


    exams.push({

        subject,
        date,
        time,
        room

    });


    saveData();

    renderExams();

    closeModal("examModal");


    document.getElementById("examSubject").value = "";
    document.getElementById("examDate").value = "";
    document.getElementById("examTime").value = "";
    document.getElementById("examRoom").value = "";

}


function deleteExam(index) {

    if (!confirm("ต้องการลบตารางสอบนี้หรือไม่?")) {

        return;

    }


    exams.splice(index, 1);

    saveData();

    renderExams();

}


function renderExams() {

    const table =
        document.getElementById("examTable");

    const count =
        document.getElementById("examCount");


    if (count) {

        count.textContent =
            exams.length;

    }


    if (!table) return;


    if (exams.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    ยังไม่มีตารางสอบ
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        exams.map((item, index) => `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(item.subject)}
                    </strong>
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

                <td>
                    ${escapeHTML(item.time || "-")}
                </td>

                <td>
                    ${escapeHTML(item.room || "-")}
                </td>

                <td>

                    <button
                        class="delete-button"
                        onclick="deleteExam(${index})">

                        ลบ

                    </button>

                </td>

            </tr>

        `).join("");

}


/* ================= APPOINTMENT ================= */

function addAppointment() {

    const name =
        document.getElementById("appointmentName").value.trim();

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value.trim();

    const room =
        document.getElementById("appointmentRoom").value.trim();


    if (!name || !date) {

        alert("กรุณากรอกชื่อนัดหมายและวันที่");

        return;

    }


    appointments.push({

        name,
        date,
        time,
        room

    });


    saveData();

    renderAppointments();

    closeModal("appointmentModal");


    document.getElementById("appointmentName").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("appointmentTime").value = "";
    document.getElementById("appointmentRoom").value = "";

}


function deleteAppointment(index) {

    if (!confirm("ต้องการลบนัดหมายนี้หรือไม่?")) {

        return;

    }


    appointments.splice(index, 1);

    saveData();

    renderAppointments();

}


function renderAppointments() {

    const list =
        document.getElementById("appointmentList");


    if (!list) return;


    if (appointments.length === 0) {

        list.innerHTML = `
            <div class="empty">
                ยังไม่มีนัดหมาย
            </div>
        `;

        return;

    }


    list.innerHTML =
        appointments.map((item, index) => {

            const date =
                new Date(item.date + "T00:00:00");


            const day =
                date.getDate();


            const month =
                date.toLocaleDateString(
                    "th-TH",
                    {
                        month: "short"
                    }
                );


            return `

                <div class="card appointment-card">

                    <div class="appointment-date">

                        <strong>
                            ${day}
                        </strong>

                        <span>
                            ${month}
                        </span>

                    </div>


                    <div class="appointment-info">

                        <h3>
                            ${escapeHTML(item.name)}
                        </h3>

                        <p>
                            📍 ${escapeHTML(item.room || "-")}
                            •
                            🕐 ${escapeHTML(item.time || "-")} น.
                        </p>

                    </div>


                    <button
                        class="delete-button"
                        onclick="deleteAppointment(${index})">

                        ลบ

                    </button>

                </div>

            `;

        }).join("");

}


/* ================= ANNOUNCEMENT ================= */

function addAnnouncement() {

    const title =
        document.getElementById("announcementTitle").value.trim();

    const detail =
        document.getElementById("announcementDetailInput").value.trim();


    if (!title || !detail) {

        alert("กรุณากรอกหัวข้อและรายละเอียด");

        return;

    }


    announcements.unshift({

        title,
        detail,
        date: "วันนี้"

    });


    saveData();

    renderAnnouncements();

    closeModal("announcementModal");


    document.getElementById("announcementTitle").value = "";
    document.getElementById("announcementDetailInput").value = "";

}


function deleteAnnouncement(index) {

    if (!confirm("ต้องการลบประกาศนี้หรือไม่?")) {

        return;

    }


    announcements.splice(index, 1);

    saveData();

    renderAnnouncements();

}


function renderAnnouncements() {

    const list =
        document.getElementById("announcementList");

    const dashboard =
        document.getElementById("dashboardAnnouncements");

    const count =
        document.getElementById("announcementCount");


    if (count) {

        count.textContent =
            announcements.length;

    }


    if (list) {

        if (announcements.length === 0) {

            list.innerHTML = `
                <div class="empty">
                    ยังไม่มีประกาศ
                </div>
            `;

        }
        else {

            list.innerHTML =
                announcements.map((item, index) => `

                    <div class="announcement-full">

                        <span class="tag">
                            ประกาศ
                        </span>

                        <h3>
                            ${escapeHTML(item.title)}
                        </h3>

                        <p>
                            ${escapeHTML(item.detail)}
                        </p>

                        <div class="deadline">

                            <small>
                                ประกาศโดยหัวหน้าห้อง •
                                ${escapeHTML(item.date)}
                            </small>

                            <button
                                class="delete-button"
                                onclick="deleteAnnouncement(${index})">

                                ลบ

                            </button>

                        </div>

                    </div>

                `).join("");

        }

    }


    if (dashboard) {

        const latest =
            announcements.slice(0, 3);


        if (latest.length === 0) {

            dashboard.innerHTML = `
                <div class="empty">
                    ยังไม่มีประกาศ
                </div>
            `;

        }
        else {

            dashboard.innerHTML =
                latest.map(item => `

                    <div class="announcement-mini">

                        <h4>
                            ${escapeHTML(item.title)}
                        </h4>

                        <p>
                            ${escapeHTML(item.detail)}
                        </p>

                        <small>
                            📢 ${escapeHTML(item.date)}
                        </small>

                    </div>

                `).join("");

        }

    }

}


/* ================= FORMAT ================= */

function formatDate(dateString) {

    if (!dateString) return "-";


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "th-TH",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function formatDateTime(dateString) {

    if (!dateString) return "-";


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "th-TH",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    )
    +
    " "
    +
    date.toLocaleTimeString(
        "th-TH",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    )
    +
    " น.";

}


/* ================= SECURITY ================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateToday();

        renderSchedules();

        renderAssignments();

        renderExams();

        renderAppointments();

        renderAnnouncements();

    }
)
