pre1="";
pre2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function snap(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; });
}

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded(){
    console.log("model loaded!")
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="the first prediction is"+pre1;
    speak2="the second prediction is"+pre2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("emotion1").innerHTML=results[0].label;
        document.getElementById("emotion2").innerHTML=results[1].label;
        pre1=results[0].label;
        pre2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("emoji1").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("emoji1").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("emoji1").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("emoji2").innerHTML="&#128548;";
        }
    }
}