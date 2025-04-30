import { RouterProvider } from "react-router-dom";
import AppRouter from './Router/Router'

function App() {
  return (
    <div className="">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App
