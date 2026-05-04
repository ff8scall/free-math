import React from 'react';
import { Route } from 'react-router-dom';

import LargeNumbers4th from '../components/math/grade4/LargeNumbers4th';
import Angles4th from '../components/math/grade4/Angles4th';
import MultiDiv4th from '../components/math/grade4/MultiDiv4th';
import GeometryMaster4 from '../components/math/grade4/GeometryMaster4';
import BarGraph4th from '../components/math/grade4/BarGraph4th';
import FindingRules4th from '../components/math/grade4/FindingRules4th';
import FractionArithmetic4th from '../components/math/grade4/FractionArithmetic4th';
import FractionIsDivision from '../components/math/grade4/FractionIsDivision';
import TriangleExplorer4th from '../components/math/grade4/TriangleExplorer4th';
import DecimalArithmetic4th from '../components/math/grade4/DecimalArithmetic4th';
import QuadrilateralExplorer4th from '../components/math/grade4/QuadrilateralExplorer4th';
import LineGraph4th from '../components/math/grade4/LineGraph4th';
import Polygons4th from '../components/math/grade4/Polygons4th';
import Grade4Quiz from '../components/math/Grade4Quiz';

export const Grade4Routes = [
    <Route key="g4-ln" path="large-numbers" element={<LargeNumbers4th />} />,
    <Route key="g4-ang" path="angles" element={<Angles4th />} />,
    <Route key="g4-ari" path="arithmetic" element={<MultiDiv4th />} />,
    <Route key="g4-gm" path="geometry-move" element={<GeometryMaster4 />} />,
    <Route key="g4-bg" path="bar-graph" element={<BarGraph4th />} />,
    <Route key="g4-rul" path="rules" element={<FindingRules4th />} />,
    <Route key="g4-fa" path="fraction" element={<FractionArithmetic4th />} />,
    <Route key="g4-fd" path="fraction-division-link" element={<FractionIsDivision />} />,
    <Route key="g4-tri" path="triangle" element={<TriangleExplorer4th />} />,
    <Route key="g4-da" path="decimal" element={<DecimalArithmetic4th />} />,
    <Route key="g4-qe" path="quadrilateral" element={<QuadrilateralExplorer4th />} />,
    <Route key="g4-lg" path="line-graph" element={<LineGraph4th />} />,
    <Route key="g4-pol" path="polygons" element={<Polygons4th />} />,
    <Route key="g4-qui" path="quiz" element={<Grade4Quiz />} />
];
