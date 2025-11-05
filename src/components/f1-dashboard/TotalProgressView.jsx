import React from 'react';
import GaugeContainer from './gauges/GaugeContainer';

export default function TotalProgressView({ data }) {
  return <GaugeContainer data={data} />;
}