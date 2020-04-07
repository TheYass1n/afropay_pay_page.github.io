

// for this code i use 
// 1- URLSearchParams for handling url qurey string for more info: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
// 2- Fetch API  for more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

try{
 // this lines add qurey string to the url (for test only in real-world app we get the qurey string from merchant site)  
const searchParams = new URLSearchParams(window.location.search);
searchParams.set("price", 567);
let newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
history.pushState(null, '', newRelativePathQuery);


 //get the qurey string value from the url 
    
let string_url =  (window.location.href).toLowerCase(); 
let url = new URL(string_url);
const price = url.searchParams.get('price');
const sdg = 'SDG ' ;

document.getElementById('amont-value').innerHTML = sdg +  price;


document.getElementById('myform').addEventListener('submit', postData);
function postData(event){
    event.preventDefault();

    // get data from html form
    let name = document.getElementById('tittle').value;
    let cardnumber = document.getElementById('body').value;
    let date = document.getElementById('date').value;

    // send all form data and url qurey string to afropay server
    fetch('http://192.168.0.106:8080/pay/purchase', {  // replace this url with afropay api endpoint 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
       },
       

        body:JSON.stringify({ pin:name, pan:cardnumber , exp: date , amount: price})
        })
        .then((res) => res.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(' Ashraf there is an err  :' + err))
}
}
catch(err){
    console.log(' Ashraf There Is An ----- errer:' + err)
}