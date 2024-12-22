let myData = {};

function fetchData() {
    let comicNumber = Math.floor(Math.random() * 3000) + 1;

    // Disable the button while fetching
    const generateButton = document.getElementById("generate");
    generateButton.disabled = true;

    fetch(`https://api.allorigins.win/raw?url=https://xkcd.com/${comicNumber}/info.0.json`)
        .then(res => { // Fetches the response
            if (res.ok) {
                return res.json(); // If true, it returns the JSON data
            } else {
                console.error("Failed to fetch comic data", res);
                throw new Error('Failed to fetch comic data');
            }
        })
        .then(res => {
            myData = res; // Sets the pre-declared myData to the values from the JSON data
            console.log(myData); // Logs the data to the console

            // Title
            document.getElementById("title").innerHTML = myData.title;

            // Image
            const comicImage = document.getElementById("comic");
            comicImage.src = myData.img;
            comicImage.setAttribute("alt", myData.alt);

            // Date
            let m = myData.month;
            let d = myData.day;
            let y = myData.year;
            document.getElementById("date").innerHTML = `${m}/${d}/${y}`;

        })
        .catch(error => {
            console.error("Error fetching comic:", error);
            alert("There was an issue fetching the comic data. Please try again.");
        })
        .finally(() => {
            // Re-enable the button after the fetch completes
            generateButton.disabled = false;
        });
}

fetchData(); // Runs the function and draws the page initially

document.getElementById("generate").addEventListener("click", (e) => {
    fetchData(); // Generate new comic on button click
});
