console.log("Client side JavaScript file is loaded!!!");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

// fetch("http://localhost:7000/weather?address=pocoleee").then((response) => {
//   response.json().then((data) => {
//     if (data.Error) {
//       console.log(data.Error);
//     } else {
//       console.log(data.location, data.Forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";

  fetch(`http://localhost:7000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.Error) {
          messageOne.textContent = data.Error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.Forecast;
        }
      });
    }
  );

  //   search.value = "";
});
