import AppRoutes from './rotas';
import { QuestionnaireProvider } from './contexts/QuestionnaireContext';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <QuestionnaireProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </QuestionnaireProvider>
  );
}

export default App;
