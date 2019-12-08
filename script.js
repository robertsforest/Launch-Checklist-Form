// Write your JavaScript code here!
function isAnElementBlank(fieldArray){
    let aFieldIsBlank = false;
    for(let i = 0; i < fieldArray.length; i++){
        if(fieldArray[i].value === ""){
            aFieldIsBlank = true;
        }
    }
    return aFieldIsBlank;
}

let pilotsReady = false;
let fuelReady = false;
let cargoReady = false;

let launchStatus = null;


function notReadyForLaunch(){
    let div = document.getElementById("faultyItems");
    div.style.visibility = "visible";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "Red";
}

function readyForLaunch(){
    launchStatus.innerHTML = "Shuttle is ready for launch";
    launchStatus.style.color = "Green";
}


window.addEventListener("load",function(){
    let form = document.querySelector("form");
    form.addEventListener("submit",function(submitEvent){
        
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
        let fieldArray = [pilotName, copilotName, fuelLevel, cargoMass];

        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        if(isAnElementBlank(fieldArray)){
            alert("All fields are required!");
            submitEvent.preventDefault();
        } else {
            if(!isNaN(pilotName.value)|| !isNaN(copilotName.value)){
                alert("Pilot and Co-Pilot names must be string values!")
                submitEvent.preventDefault();
                pilotsReady = false;
            } else {
                let pilotStatus = document.getElementById("pilotStatus");
                pilotStatus.innerHTML = `Pilot ${pilotName.value} Ready`;
                let copilotStatus = document.getElementById("copilotStatus");
                copilotStatus.innerHTML = `Co-pilot ${copilotName.value} Ready`;
                pilotsReady = true;
                submitEvent.preventDefault();
            }

            if(isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
                alert("Fuel Level and Cargo Mass must be numbers!");
                submitEvent.preventDefault();
            } else {
                if(fuelLevel.value < 10000){
                    
                    fuelStatus.innerHTML = "Fuel level too low for launch"
                    notReadyForLaunch();
                    fuelReady = false;
                    submitEvent.preventDefault();
                    
                } else {
                    fuelStatus.innerHTML = "Fuel level high enough for launch"
                    fuelReady = true;
                }
            
                if(cargoMass.value > 10000){
                    
                    cargoStatus.innerHTML = "Cargo mass too high for launch"
                    notReadyForLaunch();
                    cargoReady = false;
                    submitEvent.preventDefault();
                    
                } else {
                    cargoStatus.innerHTML = "Cargo mass low enough for launch"
                    cargoReady = true;
                }
            }
        }
        launchStatus = document.getElementById("launchStatus");
        if(pilotsReady && fuelReady && cargoReady){
            readyForLaunch();
            submitEvent.preventDefault();
        } else {
            notReadyForLaunch();
            submitEvent.preventDefault();
        }




    
    });





});


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
