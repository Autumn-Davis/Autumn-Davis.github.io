let myData = {};

function fetchData(){
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
        .then(res =>{
            if(res.ok){
                return res.json();
            }else{
                console.log(res);
            }
        }).then(res => {
            myData = res;
            console.log(myData["joke"]);
            document.getElementById("joke").innerHTML = myData.joke;
        })
        .catch(error => {console.log(error)})
}

document.getElementById("generate").addEventListener("click", e=> {fetchData();})

console.log(myData);

getJoke();