document.addEventListener("DOMContentLoaded", function () {
    const dataList = document.getElementById("vehicle-list");
    const userName = document.getElementById( "name-input" );
    const userEmail = document.getElementById( "email-input" );
    const userPhone = document.getElementById( "phone-number-input" );

    // Replace the URL with your JSON server URL
    

    const apiUrl = "https://parallelum.com.br/fipe/api/v1/carros/marcas";

    // Fetch data from the JSON server
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // data = JSON.parse(data); --Online response to "forEch is not a function" error
            // Process the data and update the list
            console.log (data);

            const first10Items = data.slice(0, 10);
            first10Items.forEach(item => {

                    const listItem = document.createElement("li");

                    // Create a select element
                    const selectStatus = document.createElement("select");
                    selectStatus.innerHTML = `
                    <option value="open" selected>Open</option>
                    <option value="booked">Booked</option>
                    `;

                    selectStatus.addEventListener("change", function() {
                        // Update the status when the selection changes
                        item.status = this.value;
                    });

                    // Set the initial status
                    item.status = "open";

                    // Create a button element
                    const selectButton = document.createElement("button");
                    selectButton.textContent = "Select";
                    selectButton.addEventListener("click", function() {
                        // Perform an action when the button is clicked
                        // console.log(`Selected ${item.codigo}, ${item.nome} - Status: ${item.status}`);
                        if ( item.status == "open"){
                            
                            //User input validation
                            // if ( userEmail.textContent == "" || userPhone.textContent == "" ){
                            //     alert ( "Please enter your details above." )
                            // } else {
                                item.status = "booked";
                                alert (`Selected ${item.nome} - Status: ${item.status}`);
                            
                        } else {
                            alert ( "Sorry, that vehicle has been booked already. Please try another option." )
                        }
                    });


                    // Update the list item content
                    // listItem.textContent = `ID: ${item.codigo}. Brand: ${item.nome} - Status: ${item.status} `;
                    listItem.textContent = `ID: ${item.codigo}. Brand: ${item.nome}`;

                    // Append the select element and button to the list item
                    // listItem.appendChild(selectStatus);
                    listItem.appendChild(selectButton);

                    dataList.appendChild(listItem);
                
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
