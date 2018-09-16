var config = {
    apiKey: "AIzaSyCCYWeCr5dQGMYDPzXwH7DtsOVcnUeVQD8",
    authDomain: "train-schedule-hw07.firebaseapp.com",
    databaseURL: "https://train-schedule-hw07.firebaseio.com",
    projectId: "train-schedule-hw07",
    storageBucket: "",
    messagingSenderId: "112191186713"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-button").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-time-input").val().trim();
      var frequncy = $("#frequency-input").val().trim();      

      var newTrain = {
          name: trainName,
          destination: destination,
          time: firstTrainTime,
          frequency: frequncy
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      alert("See Your Train Time");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");     
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var trainTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainTime),
      $("<td>").text(trainAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });