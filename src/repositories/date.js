
// OBTENEMOS FECHA ACTUAL
async function getDateNow() {

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Mes comienza en 0
let dd = today.getDate();

if (dd < 10) dd = '0' + dd; // para que sea en dos cifras
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd; 

return await formattedToday
}


// SETEAMOS LA FECHA DE PENALIDAD
function getDateForPenalty() {

    const today = new Date();
    today.setDate(today.getDate()+5)
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Mes comienza en 0
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd; // para que sea en dos cifras
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = yyyy + '-' + mm + '-' + dd; 
    
    return formattedToday
    }

    
//TRANSFORMAR EL FORMATO DE DATETOEXPECT EN DATE NORMAL PARA QUE VALIDAR SI CORRESPONDE O NO APLICAR UNA SANCION
function setFormatDateToExpect(dateToExpect){  

    const today = dateToExpect;
    const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Mes comienza en 0
let dd = today.getDate() +1 ;

if (dd < 10) dd = '0' + dd; // para que sea en dos cifras
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd;

    return  formattedToday
}





module.exports=
{
    getDateNow,
    getDateForPenalty,
    setFormatDateToExpect,
}