export class Rate {
    name: string = '';
    unit: number = 0;
    value: number = 0;

    constructor(data: {
        name: string;
        unit: number;
        value: number;
    }) {
        Object.assign(this,data);
    }
}