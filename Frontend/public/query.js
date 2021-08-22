async function query(){
    let societySelect = document.getElementById("societySelect");
    let classSelect = document.getElementById("classSelect");
    let queryObj = {
        society:societySelect.value,
        class:classSelect.value
    }
    let fetchHandler2 = new Fetching("http://localhost:3000/query","POST",{
        query:queryObj
    })
    let queryOutput = document.getElementById("queries");
    queryOutput.innerHTML = "";
    let fetchedData = await fetchHandler2.fetchData();
    fetchedData.filteredData.forEach((element) => {
        let stud = element.studentId;
        if(!stud){
            stud = element;
        }
        queryOutput.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body w-75">
                <h5 class="card-title">${stud.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
                <div> Class:- ${stud.standard}</div>
            </div>
        </div>
        `
    })
}

window.onload = async () => {
    let societySelect = document.getElementById("societySelect");
    let classSelect = document.getElementById("classSelect");
    let fetchHandler = new Fetching("http://localhost:3000/getAllData","GET");
    let data = await fetchHandler.fetchData();
    societySelect.innerHTML = '<option selected>Societies</option>';
    data.societies.forEach(element => {
        societySelect.innerHTML += `
        <option value='${element.name}'>${element.name}</option>
        `;
    });
    // adding onchange event to filters
    societySelect.addEventListener("change",query);
    classSelect.addEventListener("change",query);
}