import React from 'react';
import { Route } from 'react-router-dom';

import ThreeDigitNumber from '../components/math/grade2/ThreeDigitNumber';
import Shapes2nd from '../components/math/grade2/Shapes2nd';
import TwoDigitArithmetic from '../components/math/grade2/TwoDigitArithmetic';
import LengthMeasure from '../components/math/grade2/LengthMeasure';
import FourDigitNumber from '../components/math/grade2/FourDigitNumber';
import MultiplicationTable from '../components/math/grade2/MultiplicationTable';
import MultiplicationLinker from '../components/math/grade2/MultiplicationLinker';
import TimeCalculation from '../components/math/grade2/TimeCalculation';
import Patterns2nd from '../components/math/grade2/Patterns2nd';
import Graph2nd from '../components/math/grade2/Graph2nd';
import Grade2Quiz from '../components/math/Grade2Quiz';

export const Grade2Routes = [
    <Route key="g2-tdn" path="three-digit" element={<ThreeDigitNumber />} />,
    <Route key="g2-sha" path="shapes" element={<Shapes2nd />} />,
    <Route key="g2-ari" path="arithmetic" element={<TwoDigitArithmetic />} />,
    <Route key="g2-len" path="length" element={<LengthMeasure />} />,
    <Route key="g2-fdn" path="four-digit" element={<FourDigitNumber />} />,
    <Route key="g2-mul" path="multiplication" element={<MultiplicationTable />} />,
    <Route key="g2-mlink" path="multiplication-link" element={<MultiplicationLinker />} />,
    <Route key="g2-tim" path="time" element={<TimeCalculation />} />,
    <Route key="g2-pat" path="patterns" element={<Patterns2nd />} />,
    <Route key="g2-gra" path="graph" element={<Graph2nd />} />,
    <Route key="g2-qui" path="quiz" element={<Grade2Quiz />} />
];
