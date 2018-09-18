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

    // Store everything into a variable.
    var storedTrainName = childSnapshot.val().name;
    var storedTrainDestination = childSnapshot.val().destination;
    var storedTrainTime = childSnapshot.val().time;
    var storedTrainFrequency = childSnapshot.val().frequency;

    // Train Info
    console.log("Stored Train Name: ", storedTrainName);
    console.log("Stored Train Destination: ", storedTrainDestination);
    console.log("Stored Train Time: ", storedTrainTime);
    console.log("Stored Train Frequency: ", storedTrainFrequency);


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
    console.log("Arrival Time: " + moment(trainAway).format("HH:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(storedTrainName),
        $("<td>").text(storedTrainDestination),
        $("<td>").text(storedTrainFrequency),
        $("<td>").text(moment(trainAway).format("HH:mm")),
        $("<td>").text(tMinutesTillTrain)
    );


    $("#train-table > tbody").append(newRow);
});