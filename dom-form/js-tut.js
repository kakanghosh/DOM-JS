var saveButton = document.getElementsByClassName('save-button')[0];
var resetButton = document.getElementsByClassName('reset-button')[0];
var clearRecordButton = document.getElementsByClassName('clear-record-button')[0];
var employeeForm = document.getElementsByName('employee-form')[0];
var employeeInformationDiv = document.getElementsByClassName('employee-info')[0];
var employeeInformationTable = employeeInformationDiv.getElementsByClassName('employee-table')[0];

const employeeFormFields = {
    firstName: employeeForm.getElementsByClassName('fName')[0],
    lastName: employeeForm.getElementsByClassName('lName')[0],
    age: employeeForm.getElementsByClassName('age')[0],
    salary: employeeForm.getElementsByClassName('salary')[0],
}

let employees = [];
let employeeID = 1;

if(employees.length == 0){
  employeeInformationDiv.style.display = 'none';
}else{
  employeeInformationDiv.style.display = 'block';
}

const saveRecord = function(){
    let valid = true
    for(let key in employeeFormFields){
        if(employeeFormFields[key].value.length == 0){
            valid = false;
            break;
        }
    }
    if (valid){
      let employee = {
        id: employeeID++,
        firstName: employeeFormFields.firstName.value,
        lastName: employeeFormFields.lastName.value,
        age: employeeFormFields.age.value,
        salary: employeeFormFields.salary.value, 
      };
      employees.push(employee);
      resetForm();
      var row = employeeInformationTable.insertRow(1);
      row.className += 'row-'+employee.id;
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = employee.firstName + ', ' + employee.lastName;
      cell2.innerHTML = employee.age;
      cell3.innerHTML = employee.salary;
      var deleteButton = document.createElement("BUTTON");
      deleteButton.className += 'btn red';
      deleteButton.appendChild(document.createTextNode('X'))
      deleteButton.addEventListener('click', () => {
        deleteRowByClass('row-'+employee.id, employee.id);
      });
      cell4.appendChild(deleteButton);
    }

    if(employeeInformationDiv.style.display === 'none' && employees.length > 0){
      employeeInformationDiv.style.display = 'block';
    }
}

const resetForm = function(){
    employeeForm.reset();
}

const clearAllRecord = function(){
    let len = employeeInformationTable.rows.length;
    while(employeeInformationTable.rows.length > 1){
      employeeInformationTable.deleteRow(1);
    }
    employeeID = 1;
    employees = [];
    employeeInformationDiv.style.display = 'none';
}

const deleteRowByClass = function(clName, id){
  let row = employeeInformationTable.getElementsByClassName(clName)[0];
  if(row != undefined){
    row.remove();
    employees = employees.filter(employee => {
      return employee.id != id
    })
    if(employees.length == 0){
      employeeInformationDiv.style.display = 'none';
    }
  }
}

saveButton.addEventListener('click', saveRecord);
resetButton.addEventListener('click', resetForm);
clearRecordButton.addEventListener('click', clearAllRecord);