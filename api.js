// import * as opn from "../node_modules/opn/index.js"
// import * as fetch from "../node_modules/node-fetch/src/index.js"
import express from 'express';
import opn from 'opn';
import fetch from 'node-fetch'
import cors from 'cors';
const modelToken = "TM:kz7xck6af35w";
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());


// Get Joke
function generateGuid() {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

let postRequest = {
  "tts_model_token": modelToken,
  "uuid_idempotency_token": generateGuid(),
  "inference_text": ""
};


async function getJoke() {
  try {
    const resp = await fetch("https://v2.jokeapi.dev/joke/Dark?format=json")
    const data = await resp.json()
    setUpJoke(data);
  } catch (error) {
    console.log("err inference", error)
  }
  
}




async function getInferenceToken() {
  try {
    const resp = await fetch("https://api.fakeyou.com/tts/inference", {
      method: 'POST',
      body: JSON.stringify(postRequest),
      headers: {'Content-Type':'application/json'}
    })
    const data = await resp.json()
    return data

  } catch (error) {
    console.log("err inference", error)
  }
  
}

async function fetchPatiently(url, params) {
  let response = await fetch(url, params);

  while (response.status === 408 || response.status === 502) {
      // Wait three seconds between each new request
      await new Promise(res => setTimeout(res, 3000));
      response = await fetch(url, params);
  }

  return response;
}

function pollRequest(token) {
  console.log("Polling...")
  return new Promise(async(resolve, reject) => {

      // Wait one second between each poll request
      await new Promise(res => setTimeout(res, 1000));

      // Retrieve status of current speech request
      console.log('Fetching...')
      const response = await fetchPatiently(`https://api.fakeyou.com/tts/job/${token}`, {
          method: "GET",
          headers: {
              // "Authorization": fakeYouToken,
              "Accept": "application/json"
          }
      }).catch(error => {
          reject(`HTTP error! ${error.name}`);
          console.error(error);
  })
 
  const json = await response.json().catch(error => {
    reject("Failed to parse poll JSON")
  });
  if (!json) return;

  if (!json.success) {
    reject(`Failed poling! ${json.error_reason}`)
    console.error(json);
    return
  }

  switch (json.state.status) {
    case "pending":{

    }
    case "started":{

    }
    case "attempt_failed":{
      console.log("Trying again...")
      await pollRequest(token).then(resolve).catch(reject);
    }
    case "complete_success":{
      console.log("Done!")
      return opn(`https://storage.googleapis.com/vocodes-public${json.state.maybe_public_bucket_wav_audio_path}`)
    }
    default:
      console.log("Big error, exiting for the best.");
      break;
  }
})}

const setUpJoke = (res) => {
  let joke = "";
  res.type === "twopart"
  ? joke = joke + res.setup + ".........." + res.delivery
  : joke = joke + res.joke

  postRequest.inference_text = joke;

  console.log(res.type, ": ", joke)

  getInferenceToken()
  .then(res => pollRequest(res.inference_job_token));
}


app.get("/getjoke", (req, res) => {
  res.send(postRequest.inference_text)
  getJoke();
})
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
