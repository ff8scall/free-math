import React from 'react';
import { Route } from 'react-router-dom';

import AdditionWithCarry from '../components/math/AdditionWithCarry';
import FractionVisualizer from '../components/math/FractionVisualizer';
import MultiplicationVisualizer from '../components/math/MultiplicationVisualizer';
import GeometryExplorer from '../components/math/GeometryExplorer';
import DivisionVisualizer from '../components/math/DivisionVisualizer';
import ClockVisualizer from '../components/math/ClockVisualizer';
import SubtractionWithBorrow from '../components/math/SubtractionWithBorrow';
import UnitConverter from '../components/math/UnitConverter';
import CircleExplorer from '../components/math/CircleExplorer';
import WeightVolumeConverter from '../components/math/WeightVolumeConverter';
import FractionDecimalVisualizer from '../components/math/grade3/FractionDecimalVisualizer';
import DivisionMultiLinker from '../components/math/grade3/DivisionMultiLinker';
import CompassSimulator from '../components/math/grade3/CompassSimulator';
import WordProblemArchitect from '../components/math/grade3/WordProblemArchitect';
import DivisionMeaning from '../components/math/grade3/DivisionMeaning';

export const Grade3Routes = [
    <Route key="g3-ari" path="arithmetic" element={<AdditionWithCarry />} />,
    <Route key="g3-fra" path="fraction" element={<FractionVisualizer />} />,
    <Route key="g3-mul" path="multiplication" element={<MultiplicationVisualizer />} />,
    <Route key="g3-geo" path="geometry" element={<GeometryExplorer />} />,
    <Route key="g3-div" path="division" element={<DivisionVisualizer />} />,
    <Route key="g3-clo" path="clock" element={<ClockVisualizer />} />,
    <Route key="g3-sub" path="subtraction" element={<SubtractionWithBorrow />} />,
    <Route key="g3-len" path="length" element={<UnitConverter />} />,
    <Route key="g3-cir" path="circle" element={<CircleExplorer />} />,
    <Route key="g3-wv" path="weight-volume" element={<WeightVolumeConverter />} />,
    <Route key="g3-fd" path="fraction-decimal" element={<FractionDecimalVisualizer />} />,
    <Route key="g3-dm" path="division-multi" element={<DivisionMultiLinker />} />,
    <Route key="g3-com" path="compass" element={<CompassSimulator />} />,
    <Route key="g3-arc" path="architect" element={<WordProblemArchitect />} />,
    <Route key="g3-dm2" path="division-meaning" element={<DivisionMeaning />} />
];
