
import './App.css';
import Header from './comp/header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './comp/footer';
import Home from './comp/home';
import AVLTreeVisualization from './comp/a';

function App() {
   return (
      <BrowserRouter>
         <Header/>
         <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/algo" element={<AVLTreeVisualization/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>
   );
}

export default App;
