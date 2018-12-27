const isValidInput = require('../dustin.js').isValidInput;
const fillStateMaps = require('../dustin.js').fillStateMaps;
const getStateCapital = require('../dustin.js').getStateCapital;
const getLargestCity = require('../dustin.js').getLargestCity;
const isStateAbbreviation = require('../dustin.js').isStateAbbreviation;
var expect = require('chakram').expect;


describe ('The state lookup program', function(){
    let stateMaps; 
    var stateArray = [
        {
        id: 1,
        country: "USA",
        name: "Alabama",
        abbr: "AL",
        area: "135767SKM",
        largest_city: "Birmingham",
        capital: "Montgomery"
        },
        {
        id: 2,
        country: "USA",
        name: "Alaska",
        abbr: "AK",
        area: "1723337SKM",
        largest_city: "Anchorage",
        capital: "Juneau"
        },
        {
        id: 3,
        country: "USA",
        name: "Arizona",
        abbr: "AZ",
        area: "113594SKM",
        largest_city: "Phoenix",
        capital: "Phoenix"
        }]
        
    before(function(){
        stateMaps = fillStateMaps(stateArray)
    });

    describe('for method isValidInput ', function(){

        it('should return false for data less than 2 characters', function(){
            expect(isValidInput('i', null)).to.be.false;
        });
        it('should return false for numeric data ', function() {
            expect(isValidInput('1', null)).to.be.false;
        });
        it('should return false when an otherwise valid 2 letter code is not found', function(){
            expect(isValidInput('zo',stateMaps)).to.be.false;
        });
        it('should return false when an otherwise valid 2 letter code is not found', function(){
            expect(isValidInput('florida',stateMaps)).to.be.false;
        });

        it('should return true for known valid input found in the state names map', function(){
            expect(isValidInput('alabama',stateMaps)).to.be.true;
        })
        it('should return true for known valid input found in the state abbreviation map', function(){
            expect(isValidInput('al',stateMaps)).to.be.true;
        })

    });

    describe('for method fillStateMaps', function() {
        
        it('should build a searchable abbreviation lookup containing Alabama', function(){
           expect(stateMaps.abbrMap.get('al').capital).to.equal('Montgomery');
        });

        it('should build a searchable name lookup map containing Alabama', function(){
            expect(stateMaps.nameMap.get('alabama').capital).to.equal('Montgomery');
         });
    });
    describe('method getStateCapital', function(){
        it('should expect both capital and lowercase abbreviations', function(){
            expect(getStateCapital(stateMaps.abbrMap, 'AL')).to.equal('Montgomery');
            expect(getStateCapital(stateMaps.abbrMap, 'al')).to.equal('Montgomery');
            expect(getStateCapital(stateMaps.abbrMap, 'aL')).to.equal('Montgomery');
         });
         it('should expect both capital and lowercase state names', function(){
            expect(getStateCapital(stateMaps.nameMap, 'alabama')).to.equal('Montgomery');
            expect(getStateCapital(stateMaps.nameMap, 'ALABAMA')).to.equal('Montgomery');
            expect(getStateCapital(stateMaps.nameMap, 'aLaBaMa')).to.equal('Montgomery');
         });
    });
    describe('method getLargestCity', function(){
        it('should expect both capital and lowercase abbreviations', function(){
            expect(getLargestCity(stateMaps.abbrMap, 'AL')).to.equal('Birmingham');
            expect(getLargestCity(stateMaps.abbrMap, 'al')).to.equal('Birmingham');
            expect(getLargestCity(stateMaps.abbrMap, 'aL')).to.equal('Birmingham');
         });
         it('should expect both capital and lowercase state names', function(){
            expect(getLargestCity(stateMaps.nameMap, 'alabama')).to.equal('Birmingham');
            expect(getLargestCity(stateMaps.nameMap, 'ALABAMA')).to.equal('Birmingham');
            expect(getLargestCity(stateMaps.nameMap, 'aLaBaMa')).to.equal('Birmingham');
         });
    });
    describe('method isStateAbbreviation', function(){
        it('should return true for any 2 letter code', function(){
            expect(isStateAbbreviation('AL')).to.be.true;
         });
         it('should return false for any 3 letter code', function(){
            expect(isStateAbbreviation('ALS')).to.be.false;
         });
         it('should return false for any 1 letter code', function(){
            expect(isStateAbbreviation('A')).to.be.false;
         });
        
    });
    

});