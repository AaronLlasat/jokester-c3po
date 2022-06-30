const button = document.getElementById("button");
const jokeContainer = document.getElementById("joke-container")

function tellJoke() {
    console.log("click")
    fetch("http://localhost:8000/getjoke")
    .then(response => response.json())
    .then(joke => {
        let h2Joke = `<h2>` + joke +`</h2>`
        jokeContainer.insertAdjacentHTML("beforeend", h2Joke);
    })
    .catch(err => console.log(err))
}
button.addEventListener('click', tellJoke)