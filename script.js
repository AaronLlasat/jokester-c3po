const button = document.getElementById("button");
let audio = document.getElementById("audio");
let jokeText = document.getElementById("joke-text");


const assignJSON = (data) =>{
   console.log("data:",data)
   jokeText.innerHTML = data.joke;
   audio.src = data.audio;
   typewriter();
   
}
const getJoke = () => {
   console.log("click")
   fetch("http://localhost:8000/getjoke")
   .then(res => res.json())
   .then(data => assignJSON(data))
   .catch(err => console.log(err))
}

// Typing effect


button.addEventListener('click', getJoke);