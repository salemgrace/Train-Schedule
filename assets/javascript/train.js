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

// Train Variables
var trainName;
var trainTime;
var destination;
var firstTrainTime;
var frequency;

$("#add-train-button").on("click", function (event) {
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

    console.log("New Train Name: ", newTrain.name);
    console.log(" New Train Destination: ", newTrain.destination);
    console.log("New Train Time: ", newTrain.time);
    console.log("New Train Frequency: ", newTrain.frequency);

    alert("See Your Train Time");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});
database.ref().on("child_added", function (childSnapshot) {
    console.log("Stored Snapshot: ", childSnapshot.val());

    var storedTrainName = childSnapshot.val().name;
    var storedTrainDestination = childSnapshot.val().destination;
    var storedTrainTime = childSnapshot.val().time;
    var storedTrainFrequency = childSnapshot.val().frequency;

    var trainTimeConverted = moment(storedTrainTime, "HH:mm").subtract(1, "years");
    console.log("First train time converted: ", trainTimeConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("First Train time in Minutes: " + diffTime);

    var tRemainder = diffTime % storedTrainFrequency;
    console.log("Remainder: " + tRemainder);

    var tMinutesTillTrain = storedTrainFrequency - tRemainder;
    console.log("Minutes till next Train: " + tMinutesTillTrain);

    var trainAway = moment().add(tMinutesTillTrain, "minutes");

    var arrivalTime = moment(trainAway).format("HH:mm");
    console.log("Arrival Time: " + arrivalTime);

    var storedTrain = {
        name: storedTrainName,
        destination: storedTrainDestination,
        time: storedTrainTime,
        frequency: storedTrainFrequency,
        arrival: arrivalTime,
        minutes: tMinutesTillTrain
    };

    // Stored Train Info
    console.log("Stored Train Name: ", storedTrain.name);
    console.log("Stored Train Destination: ", storedTrain.destination);
    console.log("Stored Train Time: ", storedTrain.time);
    console.log("Stored Train Frequency: ", storedTrain.frequency);
    console.log("Stored Train Arrival: ", storedTrain.arrival);
    console.log("Stored Train Minutes Away: ", storedTrain.minutes);


    // Stored Train Displayed
    var newRow = $("<tr>").append(
        $("<td>").text(storedTrainName),
        $("<td>").text(storedTrainDestination),
        $("<td>").text(storedTrainFrequency),
        $("<td>").text(storedTrain.arrival),
        $("<td>").text(storedTrain.minutes)
    );

    $("#train-table > tbody").append(newRow);
});