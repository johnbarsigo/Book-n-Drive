document.addEventListener("DOMContentLoaded", function () {
    const dataList = document.getElementById("vehicle-list");
    const bookedList = document.getElementById( "booked-list" );
    const bookedItem = document.createElement ( "li" );

    //To update info in text input
    let variable1 = "";

    function updateInfo ( data ) {
        variable1 += data;
        console.log ( `Updated ${variable1}` );
    }
    document.getElementById ( "book-button" ).addEventListener ( "click", function() {
        userName = document.getElementById( "name-input" ).value;
        userEmail = document.getElementById( "email-input" ).value;
        userPhone = document.getElementById( "phone-number-input" ).value;

        updateInfo ( userName );
        updateInfo ( userEmail );
        updateInfo ( userPhone );
    });

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
            // data = JSON.parse(data); --Online response to "forEach is not a function" error
            // Process the data and update the list
            

            const first10Items = data.slice(0, 10);
            console.log ( first10Items );
            first10Items.forEach(item => {

                    const listItem = document.createElement("li");

                    // Create a select element
                    const selectStatus = document.createElement("select");
                    selectStatus.innerHTML = `
                    <option value="open" selected>Open</option>
                    <option value="booked">Booked</option>
                    `;

                    // Set the initial status
                    item.status = "open";

                    selectStatus.addEventListener("change", function() {
                        // Update the status when the selection changes
                        item.status = this.value;
                    });

                    

                    // Create a button element
                    const selectButton = document.createElement("button");
                    selectButton.textContent = "Select";
                    selectButton.addEventListener("click", function() {
                        // Perform an action when the button is clicked
                        // console.log(`Selected ${item.codigo}, ${item.nome} - Status: ${item.status}`);
                        if ( item.status == "open"){
                            
                            //User input validation
                            // if ( userEmail == "" || userPhone == null ){
                            //     alert ( "Please enter your details above." )
                            // } else {
                                item.status = "booked";
                                alert (`Selected ${item.nome} - Status: ${item.status}`);
                            
                            }
                        else {
                            alert ( "Sorry, that vehicle has been booked already. Please try another option." );
                        }

                        //POST the selected vehicle data to JSON Server
                        const bookInfo = {
                            id : item.codigo,
                            brand : item.nome,
                            vehicleStatus : item.status,
                            customerName : userName,
                            customerEmail : userEmail,
                            customerPhone : userPhone
                        }//RESUME WORK HERE!
                        

                        fetch ( "http://localhost:3000/selected_cars", {
                            method : "POST",
                            headers : {
                                "Content-Type" : "application/json"
                            },
                            body : JSON.stringify ( bookInfo )
                        })
                        .then ( response => response.text() )
                        .then ( data => console.log (data) )
                        .catch ( error => console.error ( "Could not save data: ",  error ) )

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

        fetch ( "http://localhost:3000/selected_cars" )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then ( data => {
                console.log ( data );
                
                data.forEach ( item => {

                    
                    
                    if ( item.vehicleStatus == "booked" ){

                        bookedItem.textContent = `Vehicle ID: ${item.id}, ${item.brand} has been booked.`

                    }
                } )
                
            })
            bookedList.appendChild( bookedItem )
            
});