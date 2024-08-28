import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/userContext";
import SignUpPage from "./pages/SignUpPage";
import RegisterPet from "./pages/RegisterPet";
import PetGallery from "./pages/PetGallery";
import PetInfo from "./pages/PetInfo";
import MyAccount from "./pages/MyAccount";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/pets" element={<PetGallery />} />
            <Route path="/pets/:id" element={<PetInfo />}/>
            <Route path="/new-pet" element={<RegisterPet/>}/>
            <Route path="/my-account" element={<MyAccount/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}
