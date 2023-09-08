

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

  Webcam.attach( '#camera' );

  function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oDVmWr5g9/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if(error) {
        //console.error(error);
    } else{
      console.log(results);

      document.getElementById("result_object_name").innerHTML = results[0].label;

      gesture = result[0].label;

      toSpeak = "";

      if(gesture == "Punho")
      {
        toSpeak = "Isso parece pancada!";
        document.getElementById("result_object_gesture_icon").innerHTML = "&#9994;";
      }
      else if(gesture == "Paz")
      {
        toSpeak = "Mó paz!";
        document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
      }
      else if(gesture == "Palma")
      {
        toSpeak = "Se você está feliz bata palmas!";
        document.getElementById("result_object_gesture_icon").innerHTML = "&#9995;";
      }

      speak();
    }
}

function speak(){
  var synth = window.speechSynthesis;

  speak_data = toSpeak;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);
  
}