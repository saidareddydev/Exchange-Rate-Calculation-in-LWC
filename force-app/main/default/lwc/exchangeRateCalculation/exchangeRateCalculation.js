import { LightningElement } from 'lwc';

export default class ExchangeRateCalculation extends LightningElement {
    showOutput = false;
    convertedvalue = "";
    toCurrency = "";
    enteredamount = "";
    fromcurrency = "";
    currencyoptions = [];
   
    connectedCallback(){
        this.fetchSymbols();
    }

    changeHandler(event){
        let{name,value}=event.target;
        if(name === 'amount') this.enteredamount = value;
        if(name === 'fromcurr') this.fromcurrency = value;
        if(name === 'tocurr') this.toCurrency = value;
    }
    handleClick(){
        this.conversion();
    }

    async fetchSymbols(){
        let endpoint = "https://api.frankfurter.app/currencies";
        try {
            let response = await fetch(endpoint);
            if(!response.ok){
                throw new Error('Network Response Was Not Ok');
            }
            const data = await response.json();
            // Process the data returned from API

            let options = [];
            for(let symbol in data){
                options = [...options,{label:symbol,value:symbol}];
            }
            this.currencyoptions = [...options];
        } catch (error){
            console.log(error);
        }

    }
     async conversion(){
        // const host = 'api.frankfurter.app';
        // fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
        //   .then(resp => resp.json())
        //   .then((data) => {
        //     alert(`10 GBP = ${data.rates.USD} USD`);
        //   });

        let endpoint = `https://api.frankfurter.app/latest?amount=${this.enteredamount}&from=${this.fromcurrency}&to=${this.toCurrency}`;
        try {
            let response = await fetch(endpoint);
            if(!response.ok){
                throw new Error('Network Response Was Not Ok');
            }
            const data = await response.json();
            // Process the data returned from API
            this.convertedvalue = data.rates[this.toCurrency];
            this.showOutput = true;
            

        } catch (error){
            console.log(error);
        }
    }

}