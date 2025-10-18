import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";
import ProductsPage from "@/components/pages/ProductsPage.tsx";
import ProductPage from "@/components/pages/ProductPage.tsx";
import {Toaster} from "sonner";
import LoginPage from "@/components/pages/LoginPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="products">
            <Route index element={<ProductsPage/>}/>
            <Route path=":productId" element={<ProductPage/>}/>
            <Route path="new" element={<ProductPage/>}/>
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </>
  )
}

export default App
