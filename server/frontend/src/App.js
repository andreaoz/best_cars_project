import LoginPanel from "./components/Login/Login"
import RegistrationPanel from "./components/Register/Register"
import Dealer from "./components/Dealers/Dealer"
import PostReview from "./components/Dealers/PostReview"
import Dealers from './components/Dealers/Dealers';
import Home from './components/Mains/Home';
import NotReady from "./components/Mains/NotReady";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegistrationPanel />}/>
      <Route path="/dealers" element={<Dealers/>} />
      <Route path="/dealer/:id" element={<Dealer/>} />
      <Route path="/postreview/:id" element={<PostReview/>} />
      <Route path="/under-construction" element={<NotReady/>} />
    </Routes>
  );
}
export default App;
