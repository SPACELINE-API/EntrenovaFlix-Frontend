import AppRoutes from './rotas';
import { QuestionnaireProvider } from './contexts/QuestionnaireContext';

function App() {
  return (
    <QuestionnaireProvider>
      <AppRoutes />
    </QuestionnaireProvider>
  );
}

export default App;
