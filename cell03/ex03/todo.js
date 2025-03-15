document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // โหลดรายการเมื่อเปิดหน้า

    document.getElementById("new-btn").addEventListener("click", addTask);
});

function addTask() {
    let taskText = prompt("กรุณากรอกงานใหม่:");
    if (taskText && taskText.trim() !== "") {
        createTaskElement(taskText);
        saveTasks(); // บันทึกลง cookies
    }
}

function createTaskElement(taskText) {
    let task = document.createElement("div"); // ใช้ <div> สำหรับ TO DO
    task.className = "task";
    task.innerText = taskText;

    // ลบ TO DO เมื่อคลิก
    task.addEventListener("click", function () {
        if (confirm("คุณต้องการลบ TO DO นี้หรือไม่?")) {
            task.remove();
            saveTasks(); // อัปเดต cookies
        }
    });

    let list = document.getElementById("ft_list");
    list.insertBefore(task, list.firstChild); // เพิ่ม TO DO ไว้ด้านบนสุด
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push(task.innerText);
    });
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // หมดอายุใน 7 วัน
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

function loadTasks() {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        if (cookie.startsWith("tasks=")) {
            let tasks = JSON.parse(cookie.split("=")[1]);
            tasks.forEach(taskText => createTaskElement(taskText));
        }
    }
}