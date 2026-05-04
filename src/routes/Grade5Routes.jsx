import React from 'react';
import { Route } from 'react-router-dom';

import MixedArithmetic5th from '../components/math/grade5/MixedArithmetic5th';
import FactorsMultiples5th from '../components/math/grade5/FactorsMultiples5th';
import RulesResponse5th from '../components/math/grade5/RulesResponse5th';
import ReductionCommonDenom5th from '../components/math/grade5/ReductionCommonDenom5th';
import CommonDenomVisualizer from '../components/math/grade5/CommonDenomVisualizer';
import FractionArithmetic5th from '../components/math/grade5/FractionArithmetic5th';
import PerimeterArea5th from '../components/math/grade5/PerimeterArea5th';
import AreaFormulaDeriver from '../components/math/grade5/AreaFormulaDeriver';
import NumbersRange5th from '../components/math/grade5/NumbersRange5th';
import FractionMultiplication5th from '../components/math/grade5/FractionMultiplication5th';
import CongruenceSymmetry5th from '../components/math/grade5/CongruenceSymmetry5th';
import DecimalMultiplication5th from '../components/math/grade5/DecimalMultiplication5th';
import Cuboids5th from '../components/math/grade5/Cuboids5th';
import AveragePossibility5th from '../components/math/grade5/AveragePossibility5th';
import Grade5Quiz from '../components/math/Grade5Quiz';

export const Grade5Routes = [
    <Route key="g5-ma" path="mixed-arithmetic" element={<MixedArithmetic5th />} />,
    <Route key="g5-fm" path="factors-multiples" element={<FactorsMultiples5th />} />,
    <Route key="g5-rul" path="rules" element={<RulesResponse5th />} />,
    <Route key="g5-red" path="reduction" element={<ReductionCommonDenom5th />} />,
    <Route key="g5-cd" path="common-denominator" element={<CommonDenomVisualizer />} />,
    <Route key="g5-fa" path="fraction-arithmetic" element={<FractionArithmetic5th />} />,
    <Route key="g5-pa" path="area" element={<PerimeterArea5th />} />,
    <Route key="g5-afd" path="area-formula" element={<AreaFormulaDeriver />} />,
    <Route key="g5-ran" path="range" element={<NumbersRange5th />} />,
    <Route key="g5-fm2" path="fraction-multiplication" element={<FractionMultiplication5th />} />,
    <Route key="g5-cs" path="congruence" element={<CongruenceSymmetry5th />} />,
    <Route key="g5-dm" path="decimal-multiplication" element={<DecimalMultiplication5th />} />,
    <Route key="g5-cub" path="cuboid" element={<Cuboids5th />} />,
    <Route key="g5-ap" path="average" element={<AveragePossibility5th />} />,
    <Route key="g5-qui" path="quiz" element={<Grade5Quiz />} />
];
