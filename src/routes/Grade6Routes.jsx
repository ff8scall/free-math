import React from 'react';
import { Route } from 'react-router-dom';

import FractionDivision6th from '../components/math/grade6/FractionDivision6th';
import RatioBarModel from '../components/math/grade6/RatioBarModel';
import Geometry6th from '../components/math/grade6/Geometry6th';
import DecimalDivision6th from '../components/math/grade6/DecimalDivision6th';
import RatioProportion6th from '../components/math/grade6/RatioProportion6th';
import Graphs6th from '../components/math/grade6/Graphs6th';
import VolumeArea6th from '../components/math/grade6/VolumeArea6th';
import Proportion6th from '../components/math/grade6/Proportion6th';
import CircleArea6th from '../components/math/grade6/CircleArea6th';
import RoundGeometry6th from '../components/math/grade6/RoundGeometry6th';
import Grade6Quiz from '../components/math/Grade6Quiz';
import BlockBuilder3D from '../components/math/grade6/BlockBuilder3D';
import Geometry3DExplorer from '../components/math/grade6/Geometry3DExplorer';

export const Grade6Routes = [
    <Route key="g6-fd" path="fraction-division" element={<FractionDivision6th />} />,
    <Route key="g6-rb" path="ratio-bar" element={<RatioBarModel />} />,
    <Route key="g6-geo" path="geometry" element={<Geometry6th />} />,
    <Route key="g6-dd" path="decimal-division" element={<DecimalDivision6th />} />,
    <Route key="g6-rp" path="ratio" element={<RatioProportion6th />} />,
    <Route key="g6-gra" path="graphs" element={<Graphs6th />} />,
    <Route key="g6-va" path="volume" element={<VolumeArea6th />} />,
    <Route key="g6-pro" path="proportion" element={<Proportion6th />} />,
    <Route key="g6-ca" path="circle-area" element={<CircleArea6th />} />,
    <Route key="g6-rg" path="round-geometry" element={<RoundGeometry6th />} />,
    <Route key="g6-qui" path="quiz" element={<Grade6Quiz />} />,
    <Route key="g6-bb" path="block-builder" element={<BlockBuilder3D />} />,
    <Route key="g6-g3d" path="geometry-3d" element={<Geometry3DExplorer />} />
];
