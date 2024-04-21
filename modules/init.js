async function fetchEmployees() {
    try {
        const response = await fetch('../data/employees.json',{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}

export default fetchEmployees 