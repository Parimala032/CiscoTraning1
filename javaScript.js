var data = [
    {      
        "NAME": "John Doe", 
        "CONTACT": "874562345", 
        "DETAILS": "From AP" 
    },
    {    
        "NAME": "Jane Doe", 
        "CONTACT": "818567690",
        "DETAILS": "From Ongole"
    },
    {    
        "NAME": "Jim Beam",
        "CONTACT": "9100562354", 
        "DETAILS": "From Kadapa" 
    }
];

function loadJSONdata()
{
    var table = document.querySelector('#infotable tbody');
    table.innerHTML = '';
    data.forEach((item, arrIndex) =>
    {
        var newRow = table.insertRow();
        Object.keys(item).forEach((key) =>
        {
            var cell = newRow.insertCell();
            cell.innerHTML = item[key];
        });
        newRow.innerHTML = `<td>${arrIndex + 1}</td>` + newRow.innerHTML;
        newRow.innerHTML += `
            <td>
                <button class="edit-button" onclick="editData(${arrIndex})">Edit</button>
                <button class="delete-button" onclick="deleteData(${arrIndex})">Delete</button>
            </td>`;
    });
}

function addData() 
{
    var editIndex = parseInt(document.getElementById('editingIndex').value);
    if (editIndex < 0) 
    {
        var NAME = document.getElementById('nameInput').value;
        var CONTACT = document.getElementById('contactInput').value;
        var DETAILS = document.getElementById('detailsInput').value;
        if (NAME === '' || CONTACT === '' || DETAILS === '') {
            Swal.fire({
                title: 'Alert',
                text: "it's mandatory to fill all the input text feilds",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            return;
        }
        if (!/^\d+$/.test(CONTACT)) {
            Swal.fire({
                title: 'Alert',
                text: "Please enter the valid numeric number not an alphanumeric",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            return;
        }
        var arr={NAME,CONTACT,DETAILS};
        data.push(arr);
        loadJSONdata();
        console.log('updated array of add data',data);
        clearInputs();
    }
}

function editData(arrayIndex) 
{
    var item = data[arrayIndex];
    document.getElementById('nameInput').value = item.NAME;
    document.getElementById('contactInput').value = item.CONTACT;
    document.getElementById('detailsInput').value = item.DETAILS;
    document.getElementById('editingIndex').value = arrayIndex; 
    document.querySelector('#addButton').style.display = 'none';
    document.querySelector('#saveButton').style.display = 'block';
}

function saveData() 
{
    var editIndex = parseInt(document.getElementById('editingIndex').value);
    if (editIndex >= 0 && editIndex < data.length)
    {
        var nameInput = document.getElementById('nameInput').value;
        var contactInput = document.getElementById('contactInput').value;
        var detailsInput = document.getElementById('detailsInput').value;
        if (!/^\d+$/.test(contactInput))
        {
            Swal.fire({
                title: 'Error',
                text: "Please enter the valid numeric number not an alphanumeric",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            return;
        }
        Swal.fire(
            'Sucessful!',
            'Your data has saved.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) 
            {
            data[editIndex].NAME = nameInput;
            data[editIndex].CONTACT = contactInput;
            data[editIndex].DETAILS = detailsInput;
            loadJSONdata();
            }
            console.log('updated array of save data', data);
        });
        clearInputs();
        document.getElementById('editingIndex').value = -1;
        document.querySelector('#addButton').style.display = 'block';
        document.querySelector('#saveButton').style.display = 'none';
    }
}

function deleteData(arrayIndex) 
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            data.splice(arrayIndex, 1);
            loadJSONdata();
            Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
            )
            console.log('updated array delete data', data);
        }
    });
}

function clearInputs() 
{
    document.getElementById("nameInput").value = '';
    document.getElementById("contactInput").value = '';
    document.getElementById("detailsInput").value = '';
}
window.onload = loadJSONdata;
