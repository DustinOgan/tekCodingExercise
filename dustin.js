const request = require('superagent');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

dustinMain();
async function dustinMain() {
    let stateMapByName = new Map();
    const response = await request.get('http://services.groupkt.com/state/get/USA/all');
    let stateArray =  response.body.RestResponse.result;
    let stateMaps =  fillStateMaps(stateArray);
    rl.setPrompt('Please Enter a State or State Code For Lookup:>  ');
    rl.clearLine();
    rl.prompt();

    rl.on('line', function (line) {
        switch (line.trim()) {
            case '?':
                console.log('Enter a state name (example: Alabama)');
                console.log('Or enter a state abbreviation (example; AL)');
                break;
            default:
                let returnedStates;
                let stateRequested = line.trim();
                if(isValidInput(stateRequested, stateMaps)){
                    console.log('You entered ' + stateRequested );
                    if(isStateAbbreviation(stateRequested)){
                         returnedStates = stateMaps.abbrMap;
                    }else{
                         returnedStates = stateMaps.nameMap;
                    }
                    
                    console.log('The state capital for queried state is  : ' + getStateCapital(returnedStates,stateRequested));
                    console.log('The largest city for the queried state is : ' + getLargestCity(returnedStates,stateRequested));

                }
                break;
        }
        rl.prompt();
    }).on('close', function () {
        console.log('You are now exiting the state lookup program');
        process.exit(0);
    });

}

function getStateCapital(states, stateRequested){
    return states.get(stateRequested.toLowerCase()).capital;
}

function getLargestCity(states, stateRequested){
    return states.get(stateRequested.toLowerCase()).largest_city;
}

function isStateAbbreviation(input) {
    return input.length == 2;
}

function fillStateMaps(sArray) {
    let sMapByAbbr = new Map();
    let sMapByName = new Map();
    sArray.forEach(function (state) {
        sMapByAbbr.set(state.abbr.toLowerCase(), { 'capital': state.capital, 'largest_city': state.largest_city });
        sMapByName.set(state.name.toLowerCase(), { 'capital': state.capital, 'largest_city': state.largest_city });
    });
    return { 'nameMap': sMapByName, 'abbrMap': sMapByAbbr };
};

function isValidInput(input, stateMaps) {
    var hasNumber = /\d/;
    if (hasNumber.test(input)) {
        console.log('This request contains numbers, please try a different lookup');
        return false;
    };
    if (input.length < 2) {
        console.log('This request is not long enought to query for a state');
        return false;
    };
    if (input.length == 2) {
        if (!stateMaps.abbrMap.has(input.toLowerCase())) {
            console.log('This 2 letter code was not found amongs the valid state abbreviations list');
            console.log('Please try a different state code');
            return false;
        }
    };
    if (input.length > 2) {
        if (!stateMaps.nameMap.has(input.toLowerCase())) {
            console.log('This name code was not found in the valid state names list');
            console.log('Please try a different state name');
            return false;
        }
    };
    return true;


}


module.exports = {
    fillStateMaps,
    isValidInput,
    getStateCapital,
    getLargestCity,
    isStateAbbreviation

}