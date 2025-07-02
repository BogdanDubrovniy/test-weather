import { useState, useEffect, useRef, type RefObject } from 'react';
import { fetchStatistic, renderDiagram } from '../../utils';
import { useCities, useCityStatistic } from '../../hooks';

function App() {
    const { cities, loading: citiesLoading, error: cityError, } = useCities();
    const [ selectedCity, setSelectedCity ] = useState<string>('');
    const { data: statistics, error } = useCityStatistic(selectedCity, fetchStatistic);
    const svgRef: RefObject<SVGSVGElement | null> = useRef<SVGSVGElement>(null);

    // Choose an initial city
    useEffect(() => {
        if (cities.length > 0 && !selectedCity) setSelectedCity(cities[0].id);
    }, [ cities ]);

    // Render D3 candlestick chart
    useEffect(() => {
        if (!svgRef.current || statistics?.length === 0) return;
        renderDiagram(svgRef, statistics);
    }, [ statistics, cities ]);

    if (citiesLoading) return <div className="diagram">Cities loading...</div>
    if (cityError) return <div className="error">Cities cannot be loaded loading: {cityError}</div>
    if (!cities.length) return <div className="diagram">There is no provided cities</div>

    return (
        <div className="diagram">
            <h1>Candlestick Diagram:</h1>
            <label htmlFor="citySelect">Choose a city: </label>
            <select id="citySelect"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
            </select>
            {error && <div className="error">{error}</div>}
            {statistics?.length === 0 && !error && <div>Data is being uploaded...</div>}

            <svg ref={svgRef} width="800" height="400"></svg>
        </div>
    );
}

export default App;
