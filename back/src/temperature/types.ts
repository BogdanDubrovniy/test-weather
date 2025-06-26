export interface OHLC { // open-high-low-close chart interface
    open: number;
    close: number;
    high: number;
    low: number;
    timestamp: string;
}

export enum Cities {
    BERLIN = 'Berlin',
    NEW_YORK = 'NewYork',
    TOKYO = 'Tokyo',
    SAO_PAOLO = 'SaoPaulo',
    CAPE_TOWN = 'CapeTown',
}

export type City = `${Cities}`;

export interface TemperatureDto {
    city: City;
    temperature: number;
    timestamp: string;
}
