<script>
        // Static data
        var data = [
            {   
                "NO": "1", 
                "NAME": "John Doe", 
                "CONTACT": "874562345", 
                "DETAILS": "From AP" 
            },
            {   "NO": "2", 
                "NAME": "Jane Doe", 
                "CONTACT": "818567690",
                "DETAILS": "From Ongole"
            },
            {   "NO": "3", 
                "NAME": "Jim Beam",
                "CONTACT": "9100562354", 
                "DETAILS": "From Kadapa" 
            }
        ];
        // Function to load static data into the table
        function loadJSONdata() 
        {
            var table = document.querySelector('#infotable tbody');
            data.forEach((item) => {
                var newRow = table.insertRow();
                newRow.innerHTML =
                    `<td>${item.NO}</td>
                    <td>${item.NAME}</td>
                    <td>${item.CONTACT}</td>
                    <td>${item.DETAILS}</td>
                    <td><button onclick="editData(this)">Edit</button>
                        <button onclick="deleteData(this)">Delete</button></td>`;
                
                table.appendChild(newRow);
            });
            
            
        }
            function addData() 
            {
                // Only add new data if we are not in edit mode
                var index = parseInt(document.getElementById('editingIndex').value);
                if (index < 0) {
                    var nameInput = document.getElementById('nameInput').value;
                    var contactInput = document.getElementById('contactInput').value;
                    var detailsInput = document.getElementById('detailsInput').value;
                    
                    // Create a new object for the new data
                    var newData = {
                        "NO": (data.length + 1).toString(),
                        "NAME": nameInput,
                        "CONTACT": contactInput,
                        "DETAILS": detailsInput
                    };

                    // Append new object to the data array
                    data.push(newData);
                    
                    // Append new row to the table
                    var tableBody = document.querySelector('#infotable tbody');
                    var newRow = tableBody.insertRow();
                    newRow.innerHTML = 
                        `<td>${newData.NO}</td>
                        <td>${newData.NAME}</td>
                        <td>${newData.CONTACT}</td>
                        <td>${newData.DETAILS}</td>
                        <td><button onclick="editData(this)">Edit</button>
                                <button onclick="deleteData(this)">Delete</button></td>
                        `;

                    // Reset the form
                    clearInputs();
                    console.log('Updated Data:', data);
                }
            }
        function editData(button) {
            if (confirm("Are you sure you want to edit this data?")){
                var row = button.closest('tr');
                var index = row.rowIndex - 1; // rowIndex is 1-based; array is 0-based

                // Get data from the row
                var name = row.cells[1].innerText;
                var contact = row.cells[2].innerText;
                var details = row.cells[3].innerText;

                // Populate the form fields with the data
                document.getElementById('nameInput').value = name;
                document.getElementById('contactInput').value = contact;
                document.getElementById('detailsInput').value = details;

                // Store the index of the row being edited
                document.getElementById('editingIndex').value = index;

                // Optional: Hide the "Add" button and only show the "Save" button
                document.querySelector('#addButton').style.display = 'none';
                document.querySelector('#saveButton').style.display = 'block';
            }
        }
        function saveData() {
            var index = parseInt(document.getElementById('editingIndex').value);
            var nameInput = document.getElementById('nameInput').value;
            var contactInput = document.getElementById('contactInput').value;
            var detailsInput = document.getElementById('detailsInput').value;

            if (index >= 0)
            {
                 // We are editing an existing row
                // Update the data array with the new data
                data[index].NAME = nameInput;
                data[index].CONTACT = contactInput;
                data[index].DETAILS = detailsInput;

                // Update the table row with the new data
                var table = document.getElementById('infotable');
                var row = table.rows[index + 1]; // Table rows are 1-based due to header row
                row.cells[1].innerText = nameInput;
                row.cells[2].innerText = contactInput;
                row.cells[3].innerText = detailsInput;

                // Reset the form
                // document.getElementById('addForm').reset();
                clearInputs();
                document.getElementById('editingIndex').value = -1;
                document.querySelector('#addButton').style.display = 'block';
                document.querySelector('#saveButton').style.display = 'none';
                // Optional: Reset UI state if needed
                // ...
            } else {
                // Add new data
                addData();
            }
        }

        // Function to delete data from the table and update the data array
        function deleteData(button) {
            if (confirm("Are you sure you want to delete this data?")) {
                var row = button.closest('tr');
                var index = row.rowIndex - 1; // rowIndex is 1-based; array is 0-based
                data.splice(index, 1); // Remove the data from the array
                row.parentNode.removeChild(row); // Remove the row from the table
                updateSerialNumbers(); // Update the serial numbers after deletion
                
            }   
        }

        // Clear input fields after adding new data
        function clearInputs() {
            //document.getElementById("numberInput").value = '';
            document.getElementById("nameInput").value = '';
            document.getElementById("contactInput").value = '';
            document.getElementById("detailsInput").value = '';
        }

        function updateSerialNumbers() {
            var tableBody = document.querySelector('#infotable tbody');
            var rows = tableBody.querySelectorAll('tr');

            for (var i = 0; i < rows.length; i++) {
                rows[i].cells[0].innerText = i + 1; // Update the serial number to match the row index + 1
            }
        }
        // Load static data into the table when the page loads
        window.onload = loadJSONdata;
    </script>
