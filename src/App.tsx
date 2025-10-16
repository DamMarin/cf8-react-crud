import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          <Route index element={<HomePage />}/>
          {/*<Route path="products">*/}
          {/*  <Route index element={<ProductListPage/>}/>*/}
          {/*  <Route path=":productId" element={<ProductPage/>}/>*/}
          {/*</Route>*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
