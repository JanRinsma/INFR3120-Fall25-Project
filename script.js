var selectedRow = null

//This is what happens when you hit "submit".
function onFormSubmit()
{
    if (validate())
    {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

//This is what allows the code to "read" the entries and stores them as data. It's taking the Event name, date and time.
function readFormData()
{
    var formData = {};
    formData["event"] = document.getElementById("event").value;
    formData["date"] = document.getElementById("date").value;
    formData["time"] = document.getElementById("time").value;
    return formData;
}

//This is what creates the table and organizes what data goes to which rows, and creates the edit / delete options.
function insertNewRecord(data)
{
    var table = document.getElementById("eventList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.event;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.date;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.time;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//This function is what clears the form, I have it set the values to "".
function resetForm()
{
    document.getElementById("event").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    selectedRow = null;
}

//This allows you to edit the table, basically it puts the stored data into the entered form.
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    document.getElementById("event").value = selectedRow.cells[0].innerHTML;
    document.getElementById("date").value = selectedRow.cells[1].innerHTML;
    document.getElementById("time").value = selectedRow.cells[2].innerHTML;
}

//This actually updates the data.
function updateRecord(formData)
{
    selectedRow.cells[0].innerHTML = formData.event;
    selectedRow.cells[1].innerHTML = formData.date;
    selectedRow.cells[2].innerHTML = formData.time;
}

//This is what actually let's you delete the table entry.
function onDelete(td)
{
    if (confirm('Are you sure to delete this record ?'))
    {
        row = td.parentElement.parentElement;
        document.getElementById("eventList").deleteRow(row.rowIndex);
        resetForm();
    }
}

//Every Event Needs a Title, but they can modify timings later so I made it required. I might decide to make the other values required but for now this just verifies that the data has a title.
function validate()
{
    isValid = true;
    if (document.getElementById("event").value == "")
    {
        isValid = false;
        document.getElementById("eventValidationError").classList.remove("hide");
    } 
    
    else
    {
        isValid = true;
        if (!document.getElementById("eventValidationError").classList.contains("hide"))
            document.getElementById("eventValidationError").classList.add("hide");
    }
    return isValid; //This is if it all worked out and has the title :D (Above Hides the errors)
}

//This is what actually makes the form visible once you click the button.
document.querySelector("button[name='entry-form']")
    .addEventListener("click", function () {
        document.getElementById("entry-form").style.display = "block";
    });