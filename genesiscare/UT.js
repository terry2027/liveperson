// Whatsapp List
cb.rich.create('ut', 'walist', {
    title: 'Telstra Instore',
    subtitle: 'how can we help you today?',
    buttonLabel: 'See options',
    sections: [{
            title: 'Purchase',
            buttons: [
                { title: 'buy a new phone', subtitle: 'latest range of smart phones' },
                { title: 'buy a new tablet', subtitle: 'large range of tablets' },
                { title: 'accessories', subtitle: 'We got all the extras' }
            ]
        },
        {
            title: 'Other',
            buttons: [
                { title: 'repair phone/tablet', subtitle: 'phone/tablet repairs' }
            ]
        }
    ]
});

// Whatsapp button card
var ut = cb.rich.wabuttons({
    title: 'What is your mode of transport to the clinic??',
    buttons: [
        { title: 'Car' },
        { title: 'Taxi' },
        { title: 'Tram' }
    ]
});
cb.setVar('ut', JSON.stringify(ut));