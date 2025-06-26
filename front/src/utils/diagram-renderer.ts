import * as d3 from 'd3';
import type { RefObject } from 'react';
import type { OHLC } from '../components/app/types.ts';

/**
 * Will render an SVG by next rules:
 * min Y - by low value, max Y - by high value
 * if close > open temperature, use '#26a69a' (light green), else '#b68f18' (yellow)
 *
 * @param svgRef {RefObject<SVGSVGElement | null>} - SVG ref
 * @param data {OHLC[]} - data array
 */
export const renderDiagram = (svgRef: RefObject<SVGSVGElement | null>, data: OHLC[]) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const chartData = data.map(d => ({
        ...d,
        date: new Date(d.timestamp),
    }));

    // X: ordinal index scale instead of time
    const x = d3
        .scaleBand()
        .domain(chartData.map((_, i) => i.toString()))
        .range([margin.left, width - margin.right])
        .paddingInner(0.3)
        .paddingOuter(0.2);

    const y = d3
        .scaleLinear()
        .domain([
            d3.min(chartData, d => d.low) as number,
            d3.max(chartData, d => d.high) as number,
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

    // X Axis:
    const xAxis = d3.axisBottom(x)
        .tickFormat((d) => d3.timeFormat('%H:%M')(chartData[+d].date))
        .tickValues(chartData.map((_, i) => i.toString()));

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    // Y Axis
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .text('Temperature (°C)');

    // Candlestick group
    const candlestick = svg
        .selectAll('.candlestick')
        .data(chartData)
        .enter()
        .append('g')
        .attr('class', 'candlestick');

    // High-low lines
    candlestick
        .append('line')
        .attr('x1', (_, i) => x(i.toString())! + x.bandwidth() / 2)
        .attr('x2', (_, i) => x(i.toString())! + x.bandwidth() / 2)
        .attr('y1', d => y(d.high))
        .attr('y2', d => y(d.low))
        .attr('stroke', d => (d.close > d.open ? '#26a69a' : '#b68f18'))
        .attr('stroke-width', 1);

    // Body rectangles
    candlestick
        .append('rect')
        .attr('x', (_, i) => x(i.toString())!)
        .attr('y', d => y(Math.max(d.low, d.high)))
        .attr('width', x.bandwidth())
        .attr('height', d => Math.max(1, Math.abs(y(d.high) - y(d.low))))
        .attr('fill', d => (d.close > d.open ? '#26a69a' : '#b68f18'));
};
