exports.handler = function(context, event, callback) {
    // REPLACE THESE
    let bitly_link = "https://bit.ly/3LC1uf4";
    //let sms_sender_name = "LivePerson"
    let sms_sender_name = "+61481614007"
        // END

    let twiml = new Twilio.twiml.VoiceResponse()
    console.log("EVENT", event);

    context.getTwilioClient().messages.create({
        to: event.From,
        from: sms_sender_name,
        body: "Thank you for selecting to message with us. Just reply to this SMS or start messaging with us here: \n " + bitly_link
    }).then(msg => {
        twiml.hangup();
        callback(null, twiml);
    }).catch(err => {
        twiml.hangup();
        console.log("failed");
        console.log(err);
        callback(err);
    });
}