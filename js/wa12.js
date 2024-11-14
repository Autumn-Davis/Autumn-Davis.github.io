let myData = {};

function fetchData(){
    comicNumber = Math.floor(Math.random() * 3000) +1;
    fetch('https://corsproxy.io/?https://xkcd.com/${comicNumber}/info.0.json')
        .then(res =>{ //fetches the response
            if(res.ok){
                return res.json(); //if this is true it returns the JSON data as the response
            }else{
                console.log(res) //if not, it returns the console log of the data
            }
        })

        .then(res=> {
            myData = res; //sets the predeclared myData to the values given by the JSON data
            console.log(myData); //logs the data as JSON

            //title
            document.getElementById("title").innerHTML = myData.title; //gets teh title element from the html page and sets it to the title from the JSON data

            //image
            document.getElementById("comic").src = myData.img;
            document.getElementById("comic").setAttribute("alt", myData.alt);

            //date
            let m = myData.month;
            let d = myData.day;
            let y = myData.year;
            document.getElementById("date").innerHTML = (m + "/" + d + "/" + y);
        })

    .catch(error => {console.log(error)}) //if the JSON data doesnt transfer right, it prints an error to the display on the consol
}

fetchData (); //runs the function and draws the page

document.getElementById("generate").addEventListener("click", (e) => {
    fetchData();
});