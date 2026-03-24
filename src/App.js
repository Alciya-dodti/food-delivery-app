import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
 
import Navbar        from "./components/Navbar";
import Home          from "./pages/Home";
import Menu          from "./pages/Menu";
import Cart          from "./pages/Cart";
import Login         from "./pages/Login";
import OrderSuccess  from "./pages/OrderSuccess";
 
 
function App() {
  return (
    // CONCEPT: Redux Provider
    // Wraps everything so any component can useSelector / useDispatch
    <Provider store={store}>
 
      {/* CONCEPT: Context Provider
          Wraps everything so any component can useAuth() */}
      <AuthProvider>
 
        {/* CONCEPT: React Router
            BrowserRouter enables client-side navigation
            (no page reload when switching routes)              */}
        <BrowserRouter>
 
          {/* Navbar is outside Routes so it shows on every page */}
          <Navbar />
 
          {/* CONCEPT: Routes
              Only the matching <Route> renders its component
              All others are ignored                            */}
          <Routes>
            <Route path="/"              element={<Home />}         />
            <Route path="/menu"          element={<Menu />}         />
            <Route path="/cart"          element={<Cart />}         />
            <Route path="/login"         element={<Login />}        />
            <Route path="/order-success" element={<OrderSuccess />} />
 
            {/* Catch-all: if URL doesn't match anything */}
            <Route path="*" element={
              <div style={{ textAlign: "center", padding: "80px" }}>
                <h2>404 — Page not found 😅</h2>
              </div>
            } />
          </Routes>
 
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
 
export default App;
 