import { string } from "yup";
import ValueObject from "./value-object.interface";

export default class Address implements ValueObject{
    private _street: string;
    private _number: number;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(street: string, number: number, complement: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }
    
    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    toJSON() {
        return {
            street: this._street,
            number: this._number,
            complement: this._complement,
            city: this._city,
            state: this._state,
            zipCode: this._zipCode
        };
    }

}