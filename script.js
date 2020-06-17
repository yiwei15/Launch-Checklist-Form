// Write your JavaScript code here!
// let pilotName = null;
// let coPilotName = null;
// let fuelLevel = null;
// let cargoMass = null;

function allLetter(input) {
   let inputNoSpace = input.replace(" ", "");
   var letters = /^[A-Za-z]+$/;
   if (inputNoSpace.match(letters)) {
      return true;
   }
   else {
      return false;
   }
}

window.addEventListener("load", init);

function init() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function (event) {
      let pilotError = false;
      let copilotError = false;
      let fuelError = false;
      let cargoError = false;

      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let launchStatus = document.getElementById("launchStatus");
      let checkItems = document.getElementById("faultyItems");

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let pilotName = pilotNameInput.value;
      let coPilotNameInput = document.querySelector("input[name=copilotName]");
      let coPilotName = coPilotNameInput.value;

      checkItems.style.visibility = "hidden";

      let fuelLevel = document.querySelector("input[name=fuelLevel");
      let numFuelLevel = Number(fuelLevel.value);
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let numCargoMass = Number(cargoMass.value);

      if (pilotName === "" || coPilotName === "" || fuelLevel.value === ""
         || cargoMass.value === "") {
         event.preventDefault();
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         alert("All field are required!");
         return;
      }

      if (isNaN(numFuelLevel) || isNaN(numCargoMass) || !allLetter(pilotName)
         || !allLetter(coPilotName)) {
         event.preventDefault();
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         alert("Make sure to enter valid information for each field!");
         return;
      }

      // console.log(numFuelLevel);
      // console.log(numFuelLevel<10000);
      // if (numFuelLevel < 10000) {
      //    fuelError = true;
      // }
      fuelError = (numFuelLevel < 10000) ? true : false;
      // if (numCargoMass > 10000) {
      //    cargoError = true;
      // }
      cargoError = (numCargoMass > 10000) ? true : false;


      event.preventDefault();
      checkItems.style.visibility = "visible";

      if (pilotError || copilotError || fuelError || cargoError) {
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready to launch";
      } else {
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle ready to launch";
      }

      if (pilotError) {
         // pilotStatus.style.color = "red";
         pilotStatus.innerHTML = `Pilot ${pilotName} is not ready for launch`;
      } else {
         // pilotStatus.style.color = "green";
         pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;
      }

      if (copilotError) {
         // copilotStatus.style.color = "red";
         copilotStatus.innerHTML = `Co-pilot ${coPilotName} is not ready for launch`;
      } else {
         // copilotStatus.style.color = "green";
         copilotStatus.innerHTML = `Co-pilot ${coPilotName} is ready for launch`;
      }

      if (fuelError) {
         // fuelStatus.style.color = "red";
         fuelStatus.innerHTML = "Fuel level too low for launch";
      } else {
         // fuelStatus.style.color = "green";
         fuelStatus.innerHTML = "Fuel level high enough for launch";
      }

      if (cargoError) {
         // cargoStatus.style.color = "red";
         cargoStatus.innerHTML = "Cargo mass too high for launch";
      } else {
         // cargoStatus.style.color = "green";
         cargoStatus.innerHTML = "Cargo mass low enough for launch";
      }

   })





   /* This block of code shows how to format the HTML once you fetch some planetary JSON!
   <h2>Mission Destination</h2>
   <ol>
      <li>Name: ${}</li>
      <li>Diameter: ${}</li>
      <li>Star: ${}</li>
      <li>Distance from Earth: ${}</li>
      <li>Number of Moons: ${}</li>
   </ol>
   <img src="${}">
   */
   let json = [];
   fetch("https://handlers.education.launchcode.org/static/planets.json")
      .then(function (response) {
         response.json().then(function (json) {
            console.log(json);
            // let i = 4;
            // bonus: random selected index
            let i = Math.floor(Math.random() * json.length);
            const missionDestination = document.getElementById("missonDestination");
            missionDestination.innerHTML = `
         <div style="text-align:center;">
         <h2 >Mission Destination</h2>
         <ol>
            <li>Name: ${json[i].name}</li>
            <li>Diameter: ${json[i].diameter}</li>
            <li>Star: ${json[i].star}</li>
            <li>Distance from Earth: ${json[i].distance}</li>
            <li>Number of Moons: ${json[i].moons}</li>
         </ol>
         <img src="${json[i].image}" width=15% ></img>
         </div>
         `;
         })
      })
}

// window.onload = init;