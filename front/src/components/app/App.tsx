import { useState, useEffect, useRef, useId, type RefObject } from 'react';
import { fetchStatistic, getCities, renderDiagram } from '../../utils';
import type { OHLC } from './types.ts';
import type { City } from '../../utils/types.ts';

function App() {
    const [ selectedCity, setSelectedCity ] = useState<City>(getCities()[0]);
    const [ data, setData ] = useState<OHLC[]>([]);
    const [ error, setError ] = useState<string | null>(null);
    const svgRef: RefObject<SVGSVGElement | null> = useRef<SVGSVGElement>(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async (city: City) => {
            setError(null);

            // todo mock start:
            // setData(getMockData());
            // todo end:

            try {
                setData(await fetchStatistic(city));
            } catch (err: any) {
                setError(err.message);
                setData([]);
            }
        };
        fetchData(selectedCity);
    }, [ selectedCity ]);

    // Render D3 candlestick chart
    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;
        renderDiagram(svgRef, data);
    }, [ data ]);

    return (
        <div className="diagram">
            <h1>Candlestick Diagram:</h1>
            <label htmlFor="citySelect">Choose a city: </label>
            <select id="citySelect"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value as City)}>
                {getCities().map(city => <option key={useId()} value={city}>{city}</option>)}
            </select>
            {error && <div className="error">{error}</div>}
            {data.length === 0 && !error && <div>Data is being uploaded...</div>}

            <svg ref={svgRef} width="800" height="400"></svg>
        </div>
    );
}

export default App;
