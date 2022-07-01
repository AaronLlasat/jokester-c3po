const button = document.getElementById("button");
const jokeContainer = document.getElementById("joke-container")
let video = document.getElementById("video");
let jokeText = document.getElementById("joke");


const assignJSON = (data) =>{
   console.log("data:",data)
   jokeText.innerHTML = data.joke;
   video.src = data.audio;
}
const getJoke = () => {
   console.log("click")
   fetch("http://localhost:8000/getjoke")
   .then(res => res.json())
   .then(data => assignJSON(data))
   .catch(err => console.log(err))
}


button.addEventListener('click', getJoke);