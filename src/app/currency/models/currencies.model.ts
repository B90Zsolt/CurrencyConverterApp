import { Rate } from "./rate.model";

export class Currencies {
    date: Date = new Date();
    rates: Rate[] = [];
    constructor(data: {
        date: any;
        rates: any[];
    }) {
        if(data.date)
            this.date = new Date(data.date);
        this.rates = data.rates.map(m => new Rate(m));
    }
}