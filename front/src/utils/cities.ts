import type { City } from './types.ts';

export const getCities = (): City[]  => {
    return [ 'Berlin', 'NewYork', 'Tokyo', 'SaoPaulo', 'CapeTown' ];
};

// todo!!
/**
 * @deprecated
 */
export const getMockData = () => {
    return [
        {
            "open": -1.67,
            "high": 3.23,
            "low": -2.45,
            "close": 2.44,
            "timestamp": "2025-06-24T12:00:00.000Z"
        },
        {
            "open": 1.18,
            "high": 1.61,
            "low": -1.54,
            "close": -1.01,
            "timestamp": "2025-06-24T13:00:00.000Z"
        },
        {
            "open": -1.00,
            "high": 3.23,
            "low": -1.00,
            "close": 2.44,
            "timestamp": "2025-06-24T14:00:00.000Z"
        },
        {
            "open": -1.00,
            "high": 3.23,
            "low": -1.00,
            "close": 2.44,
            "timestamp": "2025-06-24T15:00:00.000Z"
        },
        {
            "open": 1.05,
            "high": 10.23,
            "low": -3.00,
            "close": -2.44,
            "timestamp": "2025-06-24T16:00:00.000Z"
        },
    ]
};
