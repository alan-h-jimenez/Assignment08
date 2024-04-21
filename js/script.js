import fetchEmployees from "../modules/init.js"

// GET DOM ELEMENTS
let theTable = document.getElementById('employees')
let theEmployeeCount = document.querySelector('#empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// DELETE EMPLOYEE
theTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let rowIndex = e.target.parentNode.parentNode.rowIndex

        // CONFIRM THE DELETE
        if (confirm(`Are you sure you want to delete ${theTable.rows[rowIndex].cells[1].innerHTML} from the table?`)) {
            // REMOVE EMPLOYEE FROM ARRAY
            theTable.deleteRow(rowIndex)
        }
    }
})

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
    try {
        // DEFINE VARIABLES
        let tableHTML = ''
        let tableBody

        // CALL FETCH
        let response = await fetchEmployees()
        let theEmployees = await response.json()

        // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
        theTable.removeChild(theTable.getElementsByTagName('tbody')[0]);

        // REBUILD THE TBODY FROM SCRATCH
        tableBody = document.createElement('tbody')

        // LOOP THROUGH THE ARRAY OF EMPLOYEES
        // REBUILDING THE ROW STRUCTURE
        for (let i = 0; i < theEmployees.length; i++) {
            tableHTML += `<tr><td>${theEmployees[i].employeeid}</td><td>${theEmployees[i].name}</td><td>${theEmployees[i].extension}</td><td>${theEmployees[i].email}</td><td>${theEmployees[i].title}</td><td><button type="button" class="btn btn-danger btn-sm float-end delete">X</button></td></tr>`
        }

        tableBody.innerHTML = tableHTML

        // BIND THE TBODY TO THE EMPLOYEE TABLE
        theTable.appendChild(tableBody)

        // UPDATE EMPLOYEE COUNT
        theEmployeeCount.innerHTML = `(${theEmployees.length})`
    } catch (error) {
        console.log(error)
    }
}