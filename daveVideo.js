
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const NOSCREEN_MESSAGE = "NO SCREEN DETECTED";

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetVideo');
    },
    'MainIntent': function () {
        this.emit('GetVideo');
    },
    'GetVideo': function () {
        var speechOutput ="";
        
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));

          renderTemplate.call(this, content);
        } else {
        // Just use a card if the device doesn't support a card.
          speechOutput=NOSCREEN_MESSAGE;
          this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), "");
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


//==============================================================================
//=========================== Helper Functions  ================================
//==============================================================================

function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return isSimulator;
}

function renderTemplate (content) {
    var response = {
        "version": "1.0",
        "response": {
        "directives": [
             {
               "type": "VideoApp.Launch",
               "videoItem": {
                 "source": "https://s3.amazonaws.com/alexademos/phonevideoconverted.m4v",
                 "metadata": {
                    "title": "Adding Simple Video",
                    "subtitle": "From Our Phone"
                  }
               }
             }
           ],
           "outputSpeech": {},
           "reprompt": {},
           "shouldEndSession": content.askOrTell==":tell",
           "card": {}
         },
         "sessionAttributes": ""
       }
       this.context.succeed(response);
       break;
}
