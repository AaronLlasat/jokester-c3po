const button = document.getElementById("button");
let audio = document.getElementById("audio");
let jokeText = document.getElementById("joke-text");
let foundJoke = false;
let jokeFirstPart;
let jokeSecondPart;
let timeOutDuration;

const assignJSON = async(data) =>{
   formatJoke(data);
   audio.src = data.audio;
   jokeText.innerHTML = jokeFirstPart;
   console.log(jokeFirstPart.length)
   //112 = 4s
   //46 = 4s 
   await new Promise(res => setTimeout(res, timeOutDuration));
   jokeText.innerHTML = jokeText.innerHTML + "<br><br>" + jokeSecondPart;
}

const formatJoke = (data) => {
   foundJoke = true;
   console.log("data:",data)
   jokeFirstPart = data.joke.split("*")[0];
   jokeSecondPart = data.joke.split("*")[1];
   if (jokeFirstPart.length < 80) {
      timeOutDuration = 3000;
   } if(jokeFirstPart.length === 80){
      timeOutDuration = 4000;
   } if (jokeFirstPart.length > 80) {
      timeOutDuration = 5000;
   } if (jokeFirstPart.length > 100) {
      timeOutDuration = 6000;
   }
}

const getJoke = () => {
   console.log("click")
   stateOfLoader(true);
   fetch("http://localhost:8000/getjoke")
   .then(res => res.json())
   .then(data => assignJSON(data))
   .catch(err => console.log(err))
}

const stateOfLoader = async(loading) => {
   if (loading) {
      let i = 0;
      foundJoke = false;
      jokeText.innerHTML = "Loading";
      while (i < 4 && !foundJoke) {
         await new Promise(res => setTimeout(res, 1000));
         jokeText.innerHTML = jokeText.innerHTML + "."
         i++;
         if (i === 4 && !foundJoke) {
            jokeText.innerHTML = "Loading"
            i = 0;
         }
      }
      
   }
}


button.addEventListener('click', getJoke);