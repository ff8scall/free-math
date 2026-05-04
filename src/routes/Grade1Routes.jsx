import React from 'react';
import { Route } from 'react-router-dom';

// 1학년 컴포넌트들
import NumberCounting from '../components/math/grade1/NumberCounting';
import NumberDecomposer from '../components/math/grade1/NumberDecomposer';
import SubitizingGame from '../components/math/grade1/SubitizingGame';
import ShapeExplorer1st from '../components/math/grade1/ShapeExplorer1st';
import SimpleArithmetic1st from '../components/math/grade1/SimpleArithmetic1st';
import NumberTo50 from '../components/math/grade1/NumberTo50';
import ClockBasic1st from '../components/math/grade1/ClockBasic1st';
import NumberTo100 from '../components/math/grade1/NumberTo100';
import Patterns1st from '../components/math/grade1/Patterns1st';
import Graph1st from '../components/math/grade1/Graph1st';
import Grade1Quiz from '../components/math/Grade1Quiz';

export const Grade1Routes = [
    <Route key="g1-nc" path="number-counting" element={<NumberCounting />} />,
    <Route key="g1-dec" path="decomposer" element={<NumberDecomposer />} />,
    <Route key="g1-sub" path="subitizing" element={<SubitizingGame />} />,
    <Route key="g1-sha" path="shapes" element={<ShapeExplorer1st />} />,
    <Route key="g1-ari" path="arithmetic" element={<SimpleArithmetic1st />} />,
    <Route key="g1-n50" path="number-50" element={<NumberTo50 />} />,
    <Route key="g1-clo" path="clock" element={<ClockBasic1st />} />,
    <Route key="g1-n100" path="number-100" element={<NumberTo100 />} />,
    <Route key="g1-pat" path="patterns" element={<Patterns1st />} />,
    <Route key="g1-gra" path="graph" element={<Graph1st />} />,
    <Route key="g1-qui" path="quiz" element={<Grade1Quiz />} />
];
