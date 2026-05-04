import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import GlobalLoading from './components/common/GlobalLoading';

// Eagerly loaded core pages (for fast initial paint)
import HomePage from './pages/HomePage';
import GradeSelection from './pages/GradeSelection';
import Curriculum from './pages/Curriculum';
import NotFound from './pages/NotFound';

// Lazy loaded feature modules
const MyRoom = lazy(() => import('./pages/MyRoom'));
const Shop = lazy(() => import('./pages/Shop'));
const ParentPage = lazy(() => import('./pages/ParentPage'));
const MathGame = lazy(() => import('./pages/MathGame'));

// Math Components (Lazy loaded by grade groups)
import { Grade1Routes } from './routes/Grade1Routes';
import { Grade2Routes } from './routes/Grade2Routes';
import { Grade3Routes } from './routes/Grade3Routes';
import { Grade4Routes } from './routes/Grade4Routes';
import { Grade5Routes } from './routes/Grade5Routes';
import { Grade6Routes } from './routes/Grade6Routes';

// Common Math Tools (Lazy)
const MathQuiz = lazy(() => import('./components/math/MathQuiz'));
const WordProblemQuiz = lazy(() => import('./components/math/WordProblemQuiz'));
const WordProblemWorksheet = lazy(() => import('./components/math/WordProblemWorksheet'));
const WorksheetGenerator = lazy(() => import('./components/math/WorksheetGenerator'));
const NumberCardGame = lazy(() => import('./components/math/common/NumberCardGame'));
const WordProblemDefenseGame = lazy(() => import('./components/math/common/WordProblemDefenseGame'));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <MainLayout>
          <Suspense fallback={<GlobalLoading />}>
            <Routes>
              {/* Core Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/grade-selection" element={<GradeSelection />} />
              <Route path="/selection" element={<GradeSelection />} />
              <Route path="/grade/:gradeId" element={<Curriculum />} />
              
              {/* Feature Routes */}
              <Route path="/myroom" element={<MyRoom />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/parent" element={<ParentPage />} />
              
              {/* Math Content Routes (Grouped by Grade) */}
              <Route path="/grade/1">
                {Grade1Routes}
              </Route>
              <Route path="/grade/2">
                {Grade2Routes}
              </Route>
              <Route path="/grade/3">
                {Grade3Routes}
              </Route>
              <Route path="/grade/4">
                {Grade4Routes}
              </Route>
              <Route path="/grade/5">
                {Grade5Routes}
              </Route>
              <Route path="/grade/6">
                {Grade6Routes}
              </Route>

              {/* Shared Math Tools */}
              <Route path="/grade/:gradeId/quiz" element={<MathQuiz />} />
              <Route path="/grade/:gradeId/word-problem" element={<WordProblemQuiz />} />
              <Route path="/grade/:gradeId/word-problem-worksheet" element={<WordProblemWorksheet />} />
              <Route path="/grade/:gradeId/worksheet" element={<WorksheetGenerator />} />
              <Route path="/grade/:gradeId/game" element={<MathGame />} />
              <Route path="/grade/:gradeId/number-card" element={<NumberCardGame />} />
              <Route path="/grade/:gradeId/defense-game" element={<WordProblemDefenseGame />} />
              
              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
