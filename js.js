

// for this code i use 
// 1- URLSearchParams for handling url qurey string for more info: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
// 2- Fetch API  for more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

try{
 // this lines add qurey string to the url (for test only in real-world app we get the qurey string from merchant site)  
const searchParams = new URLSearchParams(window.location.search);
searchParams.set("price", 1 );
let newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
history.pushState(null, '', newRelativePathQuery);

document.getElementById('myform').addEventListener('submit', postData);
function postData(event){
    event.preventDefault();

    //get the qurey string value from the url 
    let string_url =  (window.location.href).toLowerCase();
    let url = new URL(string_url);
    const price = url.searchParams.get('price');

    // get data from html form
    let name = document.getElementById('tittle').value;
    let cardnumber = document.getElementById('body').value;
    let date = document.getElementById('date').value;

    // send all form data and url qurey string to afropay server
    fetch('https://jsonplaceholder.typicode.com/posts', { // replace this url with afropay api endpoint 
        method: 'POST',
        headers : new Headers(),
        body:JSON.stringify({ name:name, cardnumber:cardnumber , date: date , price: price})
        })
        .then((res) => res.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log('Fuck Ashraf there is an err  :' + err))
}
}
catch(err){
    console.log('Fuck Ashraf There Is An ----- errer:' + err)
}