//Button Prevent Default
document.getElementById("book-button").addEventListener("click", function(event){
    event.preventDefault()
})

orderedList = document.getElementById("vehicleList")

fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make%2C%20model%2C%20drive&limit=10")
.then (data => data.json)
.then (usableData =>{
    usableData.results.forEach(result => {
        let li = document.createElement("li");
        li.textContent = result.make;
        orderedList.appendChild(li);
    });
})