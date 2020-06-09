// Write your JavaScript code here!
// let pilotName = null;
// let coPilotName = null;
// let fuelLevel = null;
// let cargoMass = null;

function allLetter(input)  { 
   let inputNoSpace = input.replace(" ", "");
   var letters = /^[A-Za-z]+$/;
   if(inputNoSpace.match(letters))
     {
      return true;
     }
   else
     {
     return false;
     }
  }

window.addEventListener("load", init);

function init()   {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event)  {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let pilotName = pilotNameInput.value;
      let coPilotNameInput = document.querySelector("input[name=copilotName]");
      let coPilotName = coPilotNameInput.value;
      console.log(coPilotName);
      console.log(allLetter(coPilotName));
      
      let fuelLevel = document.querySelector("input[name=fuelLevel");
      let numFuelLevel= Number(fuelLevel.value);
      let cargoMass =document.querySelector("input[name=cargoMass]");
      let numCargoMass = Number(cargoMass.value);

      if (pilotName === "" || coPilotName === "" ||fuelLevel.value ===""
               || cargoMass.value ==="")  {
            alert("All field are required!");
            event.preventDefault();
            return;
      }

      if (isNaN(numFuelLevel)||isNaN(numCargoMass) || !allLetter(pilotName) 
            || !allLetter(coPilotName))   {
            alert("Make sure to enter valid information for each field!");
            event.preventDefault();
            return;
      }
            
      let pilotStatus = document.getElementById("pilotStatus");
      console.log(`Pilot ${pilotName} is ready for launch`);
      pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;

      let copilotStatus = document.getElementById("copilotStatus");
      console.log(`Co-pilot ${coPilotName.value} is ready for launch`);
      copilotStatus.innerHTML = `Co-pilot ${coPilotName.value} is ready for launch`;

      let fuelStatus = document.getElementById("fuelStatus");
      console.log(numFuelLevel);
      console.log(numFuelLevel<10000);
      if (numFuelLevel<10000) {
         fuelStatus.innerHTML = "Fuel level too low for launch";
         console.log("Fuel level too low for launch");
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").innerHTML= "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
         event.preventDefault();
      } else {
         console.log("Fuel level high enough for launch");
         let cargoStatus = document.getElementById("cargoStatus");
         console.log(numCargoMass>10000);
         if (numCargoMass>10000) {
            console.log("Cargo mass too large for launch");
            cargoStatus.innerHTML = "Cargo mass too large for launch";
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML= "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            event.preventDefault();
         }  else {
            console.log("Cargo mass low enough for launch");
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML= "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "green";
            event.preventDefault();
         }  
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
   .then(function(response)  {
      response.json().then(function(json)  {
         console.log(json);
         // let i = 4;
         // bonus: random selected index
         let i = Math.floor(Math.random()*json.length);
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
         <img src="${json[i].image}" width=50% ></img>
         </div>
         `;  
      })
   })
}

// window.onload = init;