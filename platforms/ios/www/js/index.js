/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

app.initialize();

function onDeviceReady(){
    console.log("Device is ready");
}

function recognizeSpeech() {
    var maxMatches = 5;
    var promptString = "Speak now"; // optional
    var language = "en-US";                     // optional
    window.plugins.speechrecognizer.startRecognize(function(result){
        alert(result);
    }, function(errorMessage){
        console.log("Error message: " + errorMessage);
    }, maxMatches, promptString, language);
}

// Show the list of the supported languages
function getSupportedLanguages() {
    window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
        // display the json array
        alert(languages);
    }, function(error){
        alert("Could not retrieve the supported languages : " + error);
    });
}

// Check to see if a recognition activity is present
function checkSpeechRecognition() {
    window.plugins.speechrecognizer.checkSpeechRecognition(function(){
        alert('Speech Recogition is present! :D');
    }, function(){
        alert('Speech Recogition not found! :(');
    });
}

document.addEventListener("deviceready", onDeviceReady, true);
