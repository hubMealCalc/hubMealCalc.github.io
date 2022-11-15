var numPeople;
var namePeoples = [];
var usersCosts = [];
var mealCosts = [];
var usersMeals = [];
var numWeeks;

function start() {
  document.getElementById("numPeople").value = "";
  document.getElementById("subNumberPeople").style.display = "inline-block";
  document.getElementById("names").style.display = "none";
  document.getElementById("tblCosts").style.display = "none";
  document.getElementById("tblCosts").innerHTML = "";
  document.getElementById("tblOutput").style.display = "none";
  document.getElementById("names").innerHTML = "";
  document.getElementById("noWeeks").innerHTML = "";
  document.getElementById("noWeeks").style.display = "none";
  numPeople = 0;
  namePeoples = [];
  usersCosts = [];
  mealCosts = [];
  usersMeals = [];
}

var modal = document.getElementById("myModal");

function openGuide() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function noPeople() {
  numPeople = document.getElementById("numPeople").value;

  // checks if textbox is null/empty
  if (numPeople == null || numPeople == "" || numPeople == "0") {
    numPeople = 0;
    alert("Please enter a valid number of people in your household.");
    // checks the value is a number
  } else if (isNaN(numPeople)) {
    alert("Please enter in a Number");
    // if value is not empty and is a number - continue with project
  } else {
    // creates fields to enter name of each housemate
    peopleNames(numPeople);

    // hides ENTER Number of people button
    document.getElementById("subNumberPeople").style.display = "none";

    // shows div for user to enter names of housemates
    document.getElementById("names").style.display = "block";
  }
}

// creates fields for user to enter in housemates names
// dynamically made by number of housemates entered
function peopleNames(people) {
  document.getElementById("names").innerHTML +=
    "<b>Please enter the names of people in your household: <b> <br>";
  for (i = 0; i < people; i++) {
    // gives each person an ID
    var sub = "person" + (i + 1);
    // creates each textbox with id "person1" , "person2" etc...
    document.getElementById("names").innerHTML +=
      "<p>Person " + (i + 1) + ': <input type="text" id="' + sub + '"></p>';
  }
  if (people != 0) {
    // this button will then ask the user how many weeks they would like to calculate
    document.getElementById("names").innerHTML +=
      '<button id="submitNames" class="btn" onclick="weeksCalc();">Submit Names</button><br><br>';
  }
}

// this button asks the user how many weeks they would like to calculate
function weeksCalc() {
  // names has been submited - hides div
  document.getElementById("submitNames").style.display = "none";
  // div to ask how many weeks they would like to calculate
  document.getElementById("noWeeks").style.display = "block";
  var weeksDiv = document.getElementById("noWeeks");
  // creates textbox for number of weeks
  var text =
    '<form action="#"><p><b>Please enter the number of weeks you would like to calculate: </b><input type="number" id="numWeeks" name="numWeeks"  maxlength="2"></p></form><button class="btn" id="subNumberWeeks" onclick="returnNames();">Submit</button>';
  weeksDiv.innerHTML = text;
}

function returnNames() {
  numWeeks = document.getElementById("numWeeks").value;

  // checks number of weeks entered is valid
  if (isNaN(numWeeks)) {
    alert("Please enter in a number! ");
  } else if (numWeeks < 0) {
    alert("Please enter in a value of 1 or higher");
  } else if (numWeeks > 30) {
    alert("Please enter a number less than 30");
  } else {
    document.getElementById("subNumberWeeks").style.display = "none";
    //creates basic table - no names incl.
    createTable();

    for (i = 0; i < numPeople; i++) {
      //adds peoples names to an Array to be used later on for table creation
      var title = "person" + (i + 1);
      var data = document.getElementById(title).value;
      namePeoples.push(data);
    }

    addToDropDown();
    addPresent();

    document.getElementById("tblCosts").style.display = "block";
  }
}

function createTable() {
  var tableToAdd = "";
  document.getElementById("tblCosts").innerHTML = "";

  for (i = 0; i < numWeeks; i++) {
    var weekNo = i + 1;
    // title
    tableToAdd +=
      "<h2>Week " + weekNo + '</h2><table id="costs' + weekNo + '">';

    // first row - titles
    tableToAdd +=
      '<tr id="w' +
      weekNo +
      'titles"><th>Day of Week</th><th>Cost</th><th>No. People</th><th>Chef</th><th>All Present?</th></tr>';

    // second row - MONDAY
    tableToAdd +=
      '<tr id="w' +
      weekNo +
      'mon"><td>Monday</td><td><input type="currency" placeholder="0.00" size="2" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' +
      weekNo +
      'cost" id="w' +
      weekNo +
      'cost1"></td><td><p id="w' +
      weekNo +
      'people1" class="w' +
      weekNo +
      'people">0</p></td><td><select name="w' +
      weekNo +
      'chef1" id="w' +
      weekNo +
      'chef1"></select></td><td><input type="checkbox" id="w' +
      weekNo +
      'all1" onclick="selectAll(' +
      weekNo +
      ' , 1 )">Select All</input></td></tr>';

    // third row - TUESDAY
    tableToAdd +=
      '<tr id="w' +
      weekNo +
      'tues"><td>Tuesday</td><td><input type="currency" placeholder="0.00" size="2" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' +
      weekNo +
      'cost" id="w' +
      weekNo +
      'cost2"></td><td><p id="w' +
      weekNo +
      'people2" class="w' +
      weekNo +
      'people">0</p></td><td><select name="w' +
      weekNo +
      'chef2" id="w' +
      weekNo +
      'chef2"></select></td><td><input type="checkbox" id="w' +
      weekNo +
      'all2" onclick="selectAll(' +
      weekNo +
      ' , 2 )">Select All</input></td></tr>';

    // fourth row - WEDNESDAY
    tableToAdd +=
      '<tr id="w' +
      weekNo +
      'wed"><td>Wednesday</td><td><input type="currency" placeholder="0.00" size="2" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' +
      weekNo +
      'cost" id="w' +
      weekNo +
      'cost3"></td><td><p id="w' +
      weekNo +
      'people3" class="w' +
      weekNo +
      'people">0</p></td><td><select name="w' +
      weekNo +
      'chef3" id="w' +
      weekNo +
      'chef3"></select></td><td><input type="checkbox" id="w' +
      weekNo +
      'all3" onclick="selectAll(' +
      weekNo +
      ' , 3 )">Select All</input></td></tr>';

    // fifth row - THURSDAY
    tableToAdd +=
      '<tr id="w' +
      weekNo +
      'thurs"><td>Thursday</td><td><input type="currency" placeholder="0.00" size="2" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' +
      weekNo +
      'cost" id="w' +
      weekNo +
      'cost4"></td><td><p id="w' +
      weekNo +
      'people4" class="w' +
      weekNo +
      'people">0</p></td><td><select name="w' +
      weekNo +
      'chef4" id="w' +
      weekNo +
      'chef4"></select></td><td><input type="checkbox" id="w' +
      weekNo +
      'all4" onclick="selectAll(' +
      weekNo +
      ' , 4 )">Select All</input></td></tr>';

    tableToAdd += "</table>";

    tableToAdd += " <br></br>";
  }

  document.getElementById("tblCosts").innerHTML += tableToAdd;

  document.getElementById("tblCosts").innerHTML +=
    '<input type="button" class="btn" value="Submit" onclick="costMeals();" />';
}

function addToDropDown() {
  // loop through weeks
  for (var w = 1; w <= numWeeks; w++) {
    // loop through days
    for (var d = 1; d <= 4; d++) {
      var idFinder = "w" + w + "chef" + d;
      var dropdown = document.getElementById(idFinder);
      // Loop through the array
      for (var i = 0; i < namePeoples.length; ++i) {
        // Append the element to the end of Array list
        dropdown[dropdown.length] = new Option(namePeoples[i], namePeoples[i]);
      }
    }
  }
}

// adds the present column for all housemates
function addPresent() {
  var days = ["mon", "tues", "wed", "thurs"];

  for (var w = 1; w <= numWeeks; w++) {
    // each week add the title head
    var rowName = "w" + w + "titles";
    var row = document.getElementById(rowName);
    //inserts new column at end of table (adds empty column)
    var t = row.insertCell(5);

    //adds name of person
    t.innerHTML = '<b style="color:black;">Present</b>';

    for (var d = 0; d < days.length; d++) {
      rowName = "w" + w + days[d];
      var row = document.getElementById(rowName);
      var x = row.insertCell(5);
      var toAdd = "";

      for (var i = 0; i < namePeoples.length; ++i) {
        toAdd +=
          '<input type="checkbox"  name="w' +
          w +
          "present" +
          (d + 1) +
          '" value = "w' +
          w +
          "present" +
          (d + 1) +
          '" class = "w' +
          w +
          "present" +
          (d + 1) +
          '" id="w' +
          w +
          "present" +
          (d + 1) +
          namePeoples[i] +
          '" onclick="updatePeople(' +
          w +
          ", " +
          (d + 1) +
          ');">' +
          namePeoples[i] +
          "</input><br>";
      }

      x.innerHTML = toAdd;
    }
  }
}

// selects if all users are present for a meal
function selectAll(week, day) {
  var peoplePres = document.getElementsByClassName(
    "w" + week + "present" + day
  );

  var idOfElement = "w" + week + "all" + day;

  if (document.getElementById(idOfElement).checked) {
    // checks all user as present
    if (peoplePres.length != 0) {
      for (i = 0; i < peoplePres.length; i++) {
        peoplePres[i].checked = true;
      }
    }
  } else {
    // unchecks all users as present
    if (peoplePres.length != 0) {
      for (i = 0; i < peoplePres.length; i++) {
        peoplePres[i].checked = false;
      }
    }
  }

  updatePeople(week, day);
}

function updatePeople(week, presDay) {
  var identify = "w" + week + "present" + presDay;
  var identify2 = "w" + week + "people" + presDay;

  var chx = document.getElementsByName(identify);

  var numTicked = 0;
  for (var i = 0; i < chx.length; i++) {
    if (chx[i].type == "checkbox" && chx[i].checked) {
      numTicked++;
    }
  }
  document.getElementById(identify2).innerHTML = numTicked;

  // checks that if a user has been unticked then the "all present" is unchecked
  if (!document.getElementById(event.target.id).checked) {
    document.getElementById("w" + week + "all" + presDay).checked = false;
  }

  // checks that if all people are present - it auto ticks "all present"
  if (numTicked == numPeople) {
    document.getElementById("w" + week + "all" + presDay).checked = true;
  }
}

// checks all costs are valid
function checkValues(week) {
  for (y = 0; y < 4; y++) {
    var sub = "w" + week + "cost" + (y + 1);
    if (
      isNaN(document.getElementById(sub).value) ||
      document.getElementById(sub).value == ""
    ) {
      return false;
    }
  }
  return true;
}

// checks valid fields and calcs output table for each person owes/owed
function costMeals() {
  var allCostNums = true;
  // checks all costs are valid
  for (i = 0; i < numWeeks; i++) {
    if (checkValues(i + 1) == false) {
      allCostNums = false;
      break;
    }
  }

  if (allCostNums) {
    usersCosts = [];
    // stores the cost per meal per person
    mealCosts = [];
    usersMeals = [];

    // calculates the cost per meal per person
    foodCosts();

    // console.log(
    //   "MEAL W1 Monday: -" + document.getElementById("w1chef1").value + "-"
    // );

    calcPerPerson();
    generateTableOutput();
  } else if (!allCostNums) {
    alert("Please check that all costs are numbers and filled in");
  } else {
    alert(
      "Hm. There seems to be another issues, refresh the page and start again"
    );
  }
}

// calculates the cost of each meal per person
function foodCosts() {
  //per week
  for (y = 0; y < numWeeks; y++) {
    //per day
    for (x = 0; x < 4; x++) {
      var day = "w" + (y + 1) + "cost" + (x + 1);
      var dayCost = document.getElementById(day).value;
      console.log(dayCost);
      console.log(parseFloat(dayCost));
      var costs = "w" + (y + 1) + "people" + (x + 1);
      var peoplePresent = parseFloat(document.getElementById(costs).innerHTML);

      mealCosts.push(dayCost / peoplePresent);
    }
  }
}

function calcPerPerson() {
  for (y = 0; y < numPeople; y++) {
    var userSpent = 0;
    var userMealCosts = 0;

    //per week
    var z = 1;
    var totalnum = parseInt(numWeeks);
    var a = totalnum + 1;
    var counter = 1;
    while (z < a) {
      //per day
      for (x = 0; x < 4; x++) {
        var userChef = false;
        var userPresent = false;

        if (
          document.getElementById("w" + z + "chef" + (x + 1)).value ==
          namePeoples[y]
        ) {
          userChef = true;
        }

        if (userChef == true) {
          userSpent += parseFloat(
            document.getElementById("w" + z + "cost" + (x + 1)).value
          );
        }
        if (
          document.getElementById(
            "w" + z + "present" + (x + 1) + namePeoples[y]
          ).checked
        ) {
          userPresent = true;
        }
        //correct meal costs for that week
        if (userPresent == true) {
          userMealCosts += mealCosts[(z - 1) * 4 + x];
        }
        counter++;
      }
      z++;
    }

    usersCosts.push(userSpent);
    usersMeals.push(userMealCosts);
  }
}

// calculates what each person owes / is owed
function generateTableOutput() {
  var x = document.getElementById("outputTable").rows.length;
  if (x > 1) {
    for (y = 0; y < x - 1; y++) {
      document.getElementById("outputTable").deleteRow(1);
    }
  }

  document.getElementById("tblOutput").style.display = "block";
  var table = document.getElementById("outputTable");

  // displays output to user
  for (y = 0; y < numPeople; y++) {
    var row = table.insertRow(1);

    // person's name
    var cell1 = row.insertCell(0);
    cell1.innerHTML = namePeoples[y];

    // how much the person has spent
    cell1 = row.insertCell(1);
    console.log('SPENT: ' + usersCosts[y]);
    cell1.innerHTML = "£" + usersCosts[y].toFixed(2);

    // how much the person's meals they have eaten have costed
    cell1 = row.insertCell(2);
    console.log('MEAL COST: ' + usersCosts[y]);
    cell1.innerHTML = "£" + usersMeals[y].toFixed(2);

    cell1 = row.insertCell(3);
    var cell2 = row.insertCell(4);
    cell1.innerHTML = "";
    cell2.innerHTML = "";

    // calculates if the users owes or is owed
    var usersMoney = usersCosts[y] - usersMeals[y];
    console.log('Money: ' + usersMoney);

    if (usersMoney < 0) {
      cell1.innerHTML = "£" + Math.abs(usersMoney).toFixed(2);
      cell2.innerHTML = '<span class="owes"> OWES</span>';
    } else if (usersMoney > 0) {
      cell1.innerHTML = "£" + Math.abs(usersMoney).toFixed(2);
      cell2.innerHTML = '<span class="owed"> OWED</span>';
    } else if (usersMoney == 0) {
      cell1.innerHTML = "£" + 0;
    }
  }
}
