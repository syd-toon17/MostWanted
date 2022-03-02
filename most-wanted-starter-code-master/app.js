"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let resultFirstName = firstName.toUpperCase();
  let lastName = promptFor("What is the person's last name?", autoValid);
  let resultLastName = lastName.toUpperCase();

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName.toUpperCase() === resultFirstName && potentialMatch.lastName.toUpperCase() === resultLastName){
      return true;
    }
    else{
      console.log("potentialMatch.firstName", potentialMatch.firstName)
      console.log("resultFirstName", resultFirstName)
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.

function searchByTraits(people){
  let tempPeople = people
  let searchType;
  
    
  
    while(searchType !== 'search'){
      searchType = promptFor("What trait would you like to search for? Or type 'search' to see list.", autoValid).toLowerCase();
      
      // while loop
      

    // display people or person
    
      
     
      switch(searchType){
        case 'eye color':
          tempPeople = searchByEyeColor(tempPeople);
          break;
        case 'gender':
          tempPeople = searchByGender(tempPeople);
          break;
        case 'height':
          tempPeople = searchByHeight(tempPeople);
          break;
        case 'weight':
          tempPeople = searchByWeight(tempPeople);
          break;
        case 'occupation':
          tempPeople = searchByOccupation(tempPeople);
          break;
      }
      console.log(tempPeople)
      
    }
    if(tempPeople.length === 1){
      displayPeople(tempPeople);
      return tempPeople[0]
    }
    else if(tempPeople.length === 0){
      alert("There is no one in the database that matches the search criteria. Please press 'ok' to try again.")
      return searchByTraits(people)
    }
    else{
      displayPeople(tempPeople);
      let searchResults = promptFor("Have you found the person you are searching for?", yesNo).toLowerCase();
      if(searchResults === 'yes'){
        return searchByName(people)
      }
      else{
        return searchByTraits(people)
      }
      
    } 
}
  
function searchByEyeColor(people){
  let chosenEyeColor = promptFor("What is their eye color?", traitValidationEyeColor);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === chosenEyeColor) { 
      return true;
     } else {
       return false;
     }
  })
  return foundPeople;
}
function searchByGender(people){
  let chosenGender = promptFor("What is their gender?", traitValidationGender);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.gender === chosenGender) { 
      return true;
     } else {
       return false;
     }
  })
  return foundPeople;
}
function searchByHeight(people){
  let chosenHeight = promptFor("What is their height? (without unit of measurement)", traitValidationHeight);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.height === chosenHeight) { 
      return true;
     } else {
       return false;
     }
  })
  return foundPeople;
}
function searchByWeight(people){
  let chosenWeight = promptFor("What is their weight? (without unit of measurement", traitValidationWeight);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.weight === chosenWeight) { 
      return true;
     } else {
       return false;
     }
  })
  return foundPeople;
}
function searchByOccupation(people){
  let chosenOccupation = promptFor("What is their occupation?", traitValidationOccupation);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === chosenOccupation) { 
      return true;
     } else {
       return false;
     }
  })
  return foundPeople;
}


//TODO: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "Id: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).



function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
//write validation function custom to our trait search functions
function traitValidationEyeColor(input){
  if(input.toLowerCase()=== "brown" || input.toLowerCase() === "blue" || input.toLowerCase() === "black" || input.toLowerCase() === "hazel" || input.toLowerCase() === "green"){
    return true;
  }
  else{
    alert("No one in the database matches that eye color.")
    return false;
  }
}
function traitValidationGender(input){
  if(input.toLowerCase()=== "male" || input.toLowerCase() === "female"){
    return true;
  }
  else{
    alert("Please enter male or female.")
    return false; 
  }
}
function traitValidationHeight(input){
  if(input >= 58 && input <= 76 ){
    return true;
  }
  else{
    alert("No one in the database matches that height.")
    return false; 
  }
}
function traitValidationWeight(input){
  if(input >= 100 && input <= 256 ){
    return true;
  }
  else{
    alert("No one in the database matches that weight.")
    return false; 
  }
}
function traitValidationOccupation(input){
  if(input.toLowerCase()=== "programmer" || input.toLowerCase() === "assistant" || input.toLowerCase() === "landscaper" || input.toLowerCase() === "nurse" || input.toLowerCase() === "student" || input.toLowerCase() === "architect" || input.toLowerCase() === "doctor" || input.toLowerCase() === "politition"){
    return true;
    }
  else{
    alert("No one in the database matches that occupation.")
    return false;
  }
  }

//#endregion