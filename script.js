  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAhh8JN12Xz7fLIavO-XuhO0V9bXHjAMI",
    authDomain: "my-first-firebase-c7fbc.firebaseapp.com",
    databaseURL: "https://my-first-firebase-c7fbc.firebaseio.com",
    projectId: "my-first-firebase-c7fbc",
    storageBucket: "my-first-firebase-c7fbc.appspot.com",
    messagingSenderId: "1043516369672"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var currentTime = moment().format('h:mm A');
  $('#current-time').text('The current time is: ' + currentTime);

$('#add-train').on('click', function(event) {
    event.preventDefault();

    var trainName = $('#trainName').val().trim();
    var trainDestination = $('#trainDestination').val().trim();
    var trainTime = $('#trainTime').val().trim();
    var trainFrequency = $('#trainFrequency').val().trim();

database.ref().push({
  name: trainName,
  destination: trainDestination,
  frequency: trainFrequency,
  time: trainTime
});
$('#trainName').val('');
$('#trainDestination').val('');
$('#trainTime').val('');
$('#trainFrequency').val('');
});

database.ref().on("child_added", function(snapshot) {
  var trainName = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var trainTime = snapshot.val().time;
  var trainFrequency = snapshot.val().frequency;

  var trainTimeConverted = moment(trainTime, 'HH:mm').subtract(1,'years')
  console.log(trainTimeConverted);

  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  console.log(diffTime);

  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 nextTrain = moment(nextTrain).format("h:mm A");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

  $('tbody').append(newRow);
});
