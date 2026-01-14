function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    
    return age;
}

let btn1 = document.getElementById('btn');
btn1.addEventListener('click', () => {
    const birthDateInput = document.getElementById('birthDate').value;
    const age = calculateAge(birthDateInput);
    document.getElementById('result').innerText = `Your age is ${age} years`;

})