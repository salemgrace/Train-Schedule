var config = {
    apiKey: "AIzaSyCCYWeCr5dQGMYDPzXwH7DtsOVcnUeVQD8",
    authDomain: "train-schedule-hw07.firebaseapp.com",
    databaseURL: "https://train-schedule-hw07.firebaseio.com",
    projectId: "train-schedule-hw07",
    storageBucket: "train-schedule-hw07.appspot.com",
    messagingSenderId: "112191186713"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName;
  var trainTime;
  var destination;
  var firstTrainTime;
  var frequency;

  $("#add-train-button").on("click", function(event) {
      event.preventDefault();

      trainName = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#first-time-input").val().trim();
      frequncy = $("#frequency-input").val().trim();      

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
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


    var trainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var trainAway = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainAway).format("hh:mm"));
  
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