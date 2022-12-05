//Function Name: Deflection
//Path: /deflection


exports.handler = function(context, event, callback) {
    // REPLACE THESE - Use a bitly_link to your web messaging page
    //Outsourced Demo
    //let bitly_link = "https://bit.ly/3LC1uf4";
    //Nandos Demo
    //let bitly_link = "https://bit.ly/3xZWwFk";
    //GenesisCare Demo
    //let bitly_link = "https://bit.ly/3S7NUTp";
    //OFX Demo
    let bitly_link = "http://bit.ly/3UDe1UE";

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