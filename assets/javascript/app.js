function calculateNextArrival(firstTrainTime, frequency) {
    var currentime = moment()
    var FirstTrainFormatted = moment(firstTrainTime, 'HH:mm').format('X');
    var timedifference = currentime.diff(moment.unix(FirstTrainFormatted), "minutes");
    var timeLeft = timedifference % frequency;
    var mins = moment(frequency - timeLeft, "mm").format('mm');
    var nextTrain = currentime.add(mins, "m").format("hh:mm A");
    return nextTrain
}
function calculateMinutesAway(firstTrainTime, frequency) {
    var currentime = moment()
    var FirstTrainFormatted = moment(firstTrainTime, 'HH:mm').format('X');
    var timedifference = currentime.diff(moment.unix(FirstTrainFormatted), "minutes");
    var timeLeft = timedifference % frequency;
    var mins = moment(frequency - timeLeft, "mm").format('mm');
    return mins
}
var config = {
    apiKey: "AIzaSyDD-mpd2h8sQ1MqX5wgcGv59NWWuJYTDjg",
    authDomain: "trainactivity-e95bb.firebaseapp.com",
    databaseURL: "https://trainactivity-e95bb.firebaseio.com",
    projectId: "trainactivity-e95bb",
    storageBucket: "trainactivity-e95bb.appspot.com",
    messagingSenderId: "775383903906"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submitbutton").on("click", function (event) {
    var valueOfTrain = $("#trainName").val();
    var valueOfDestination = $("#destination").val();
    var valueOftime = $("#trainTime").val();
    var valueOfFrequency = $("#frequency").val();
    if (isNaN(valueOfFrequency)) {
        alert("Invalid frequency input!")
    }
    else if (valueOfTrain === "" || valueOfDestination === "" || valueOftime === "" || valueOfFrequency === "") {
        alert("a field was empty!")
    }
    else {
        database.ref().push({
        trainName: valueOfTrain,
        trainDestination: valueOfDestination,
        trainTime: valueOftime,
        trainFrequency: valueOfFrequency,
    });


    }


});
database.ref().on("child_added", function (snapshot) {
    var trainNamec = snapshot.val().trainName;
    var trainDestinationc = snapshot.val().trainDestination;
    var trainTimec = snapshot.val().trainTime;
    var trainFrequencyc = snapshot.val().trainFrequency;
    var nextArrival = calculateNextArrival(trainTimec, trainFrequencyc)
    var timeAway = calculateMinutesAway(trainTimec, trainFrequencyc)
    $("#maintablebody").append("<tr><td>" + trainNamec + "</td><td>" + trainDestinationc + "</td><td>" + trainFrequencyc + "</td><td>" + nextArrival + "</td><td>" + timeAway + "</td></tr>")
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});