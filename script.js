var trainName;
var trainDestination;
var trainTime;
var trainFrequency;

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
$('#add-train').on('click', function(event) {
    event.preventDefault();

    trainName = $('#trainName').val().trim();
    trainDestination = $('#trainDestination').val().trim();
    trainTime = $('#trainTime').val().trim();
    trainFrequency = $('#trainFrequency').val().trim();
    console.log(trainFrequency);

    

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
      });

});

database.ref().on("child_added", function(snapshot) {

  var newRow = $('<tr>');

  var name = $('<td>');
  name.text(snapshot.val().name);
  newRow.append(name);

  var destination = $('<td>');
  destination.text(snapshot.val().destination);
  newRow.append(destination);

  var frequency = $('<td>');
  frequency.text(snapshot.val().time);
  newRow.append(frequency);

  $('tbody').append(newRow);
  
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
