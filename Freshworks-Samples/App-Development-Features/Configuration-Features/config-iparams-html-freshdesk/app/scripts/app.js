const JOKE_ENDPOINT = "https://official-joke-api.appspot.com/random_joke";

function getJoke() {
  client.request.get(JOKE_ENDPOINT).then(function (data) {
    showSpinner(data);
    let setup = JSON.parse(data.response).setup;
    punchline = JSON.parse(data.response).punchline;
    pick(".card").style.display = "block";
    pick(
      "#setup"
    ).innerHTML = `<fw-label value="Question:" color="red"></fw-label> ${setup}`;
  }),
    function (error) {
      console.error("Error fetching data from endpoint", error);
    };
}

function showSpinner(data) {
  if (data) {
    pick(".spinner-div").style.display = "none";
  }
}

function addListener() {
  pick("#punchline-btn").addEventListener("click", function () {
    pick(
      "#punchline"
    ).innerHTML = `<fw-label value="${punchline}" color="green"></fw-label>`;
  });
}

function pick(selector) {
  return document.querySelector(selector);
}

document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();
    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
    }
  }
};

function onAppActivate() {
  getJoke();
  addListener();
}

function handleErr(err) {
  console.error(`Error occurred. Details:`, err);
}
