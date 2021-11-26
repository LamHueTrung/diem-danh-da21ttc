
var courseApi = 'http://localhost:3000/courses'


function start() {
    getCourses(renderCourses);
    hanleCreateForm();
}   
start();

// Function
function getCourses(callBack) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        }) 
        .then(callBack);
}
function createCourse(data, callBack) {
    var options = {
        method: 'POST',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callBack);
}
function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        }
    };
    alert('Đã xóa');
    
    fetch(courseApi + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.cours-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}
function  renderCourses(courses) {

    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
        <li class="cours-item-${course.id}">
        <span class="subject subject-1"><span class="nd">${course.mssv}</span></span>
        <span class="name name-1"><span class="nd">${course.name}</span></span>
        <span class="subject subject-1"><span class="nd">${course.subject}</span></span>
        <span class="date date-1"><span class="nd">${course.date}</span></span>
        <span class="date date-1"><span class="nd">${course.out}</span></span>
        <span class="date"><span class="nd"><button id="delete" onclick="deleteCourse(${course.id})">Xóa</button></span></span>
        </li> 
        `;
    })
    listCoursesBlock.innerHTML = htmls.join('');
}
function hanleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        alert('Đã gởi thành công ! mời bạn xem lại {^_^}');
        var date = document.querySelector('input[name="date"]').value;
        var mssv = document.querySelector('input[name="mssv"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var subject = document.querySelector('input[name="subject"]').value;
        var out = document.querySelector('input[name="out"]').value;
        var formData = {
            date: date,
            mssv: mssv,
            name: name,
            subject: subject,
            out: out
        };
        createCourse(formData,function() {
            getCourses(renderCourses);
        });
    }
}
/// các bạn vắng
