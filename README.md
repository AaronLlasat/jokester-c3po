# 🤖 Jokester C-3PO
This is a personal project I've developed on my own and entirely for fun. It consists on a C-3PO TTS voice model that reads a random joke of the category you choose.<br>

The frontend is built with plain HTML, CSS and JavaScript, while the backend is structured with Node and Express. You can find the code for the backend [here](https://github.com/AaronLlasat/c3po-api "C-3PO API").

---

## 🦴 The backbone of this website relies on two APIs
1) The [JokeAPI](https://sv443.net/jokeapi/v2/ "JokeAPI") developed by [Sv443](https://github.com/Sv443 "Sv443"), which I use to get the random jokes. 
2) The [FakeYou API](https://docs.fakeyou.com/#/ "FakeYou API") developed by [Echelon](https://github.com/echelon "Echelon"), which I use to get the C-3PO voice model that reads the joke with text to speech (TTS) technology.

---

## 🐌 It's usually slow and flawed, but I can't do anything about it myself

I don't currently own an API key for the FakeYou API, so you might have to wait to 20s or more for the TTS to popup. It may also crash if you ask for several jokes on a row. Master Yoda will make sure you know when you must stop and wait for a minute or two until the rate limit timeout ends.
Unfortunately, the only way to get an API key today is by contacting the owner and asking for one. I tried it but I haven't been that lucky myself.<br>

Finally, I don't own the voice model. Sometimes it's laggy or it cracks and doesn't end reading the joke, but I can't do anything about it. Please be patient, after all, C-3PO is just an amateur jokester.

---

## ⚠️ Warning
If you don't choose a specific joke category, you will get a random joke of any kind. If you're susceptible to dark/black/offensive humor, *please* make sure you select any other category than **Dark** or you might get an offensive joke randomly displayed.
