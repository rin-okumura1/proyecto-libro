


function getDate() {

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Mes comienza en 0
let dd = today.getDate();

if (dd < 10) dd = '0' + dd; // para que sea en dos cifras
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd; 

return formattedToday
}


module.exports=
{
    getDate,
}