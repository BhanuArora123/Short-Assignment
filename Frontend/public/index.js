async function getDynamicData(req, res, next) {
    console.log("hello");
    console.log(this);
    let fetchHandler = new Fetching("http://localhost:3000/getData", "POST", {
        standard: parseInt(this.value)
    });
    let resolvedData = await fetchHandler.fetchData();
    let societies = document.getElementById("societies");
    let subjects = document.getElementById("subjects");
    // cleaning the innerhtml
    societies.innerHTML = "";
    subjects.innerHTML = "";

    resolvedData.societies.forEach(element => {
        societies.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name=${element.name} id='${element.name}' data-id='${element._id}'>
                    <label class="form-check-label" for="flexRadioDefault2">
                        ${element.name}
                    </label>
                </div>
        `
    });
    resolvedData.subjects.forEach(element => {
        subjects.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name=${element.name} id='${element.name}' >
                    <label class="form-check-label" for="flexRadioDefault2">
                        ${element.name}
                    </label>
                </div>
        `
    });
}
async function registerStudent() {
    let societies = document.getElementById("societies");
    let subjects = document.getElementById("subjects");
    let standard = document.getElementById("class").value;
    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    let society = [];
    let subject = [];
    for (let i = 0; i < societies.children.length; i++) {
        const element = societies.children[i];
        if (element.children[0].checked) {
            society.push(element.children[0].getAttribute("id"));
        }
    }
    for (let i = 0; i < subjects.children.length; i++) {
        const element = subjects.children[i];
        if (element.children[0].checked) {
            subject.push(element.children[0].getAttribute("id"));
        }
    }
    let fetchHandler = new Fetching("http://localhost:3000/addStudent", "POST", {
        name: name,
        standard: standard,
        contact: contact,
        societies: society,
        subjects: subject
    })
    let data = await fetchHandler.fetchData();
    if (data) {
        let alertMe = document.getElementById("alertMe");
        alertMe.innerHTML = `<div class="alert alert-success" role="alert">
    A simple success alert—check it out!
  </div>`
    }
}

window.onload = () => {
    let options = document.getElementById("class");
    console.log(options.value);
    options.addEventListener("change", getDynamicData);
    // adding listener to form button
    let addStudent = document.getElementById("addStudent");
    addStudent.addEventListener("click", registerStudent);
}