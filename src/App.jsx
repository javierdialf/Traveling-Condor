import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componets/Dashboard/Dashboard';
import Login from './Componets/Login/Login';
import Register from './Componets/Register/Register';
import Mapa from './Componets/Map/Mapa';
import Navbarn from './Componets/Vista/Navbarn';
import Sidebar from './Componets/Vista/Sidebar';
import { UserContextProvider } from './Componets/Context/UserContext';
import Misruta from './Componets/Pages/Misruta';
import PuntoIntere from './Componets/Pages/PuntosIntere';
import Recomendacion from './Componets/Pages/Recomendacion';
import RutasSiva  from './Componets/Pages/RutasSiva';
import Inicio from './Componets/Pages/Inicio';
import Traveling from './Traveling';
import { GeolocationContextProvider } from './Componets/Context/GeolocationContext';
import { RutaDibujarContextProvider } from './Componets/Context/RutaDibujarContext';
import './index.css';
import {PuntosContextProvider} from './Componets/Context/PuntosContext';
import { PuntosDeInteresContextProvider } from './Componets/Context/PuntosDeInteresContext';

const App = () => {
    return (
        
            <UserContextProvider>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                        <div>
                        <GeolocationContextProvider>
                            <RutaDibujarContextProvider>
                                <PuntosContextProvider>
                                    <PuntosDeInteresContextProvider>
                                    <Routes>
                                        <Route path="/traveling" element={<Traveling />} />
                                        <Route path="/inicio" element={<Inicio />} />
                                        <Route path="/misrutas" element={<Misruta />} />
                                        <Route path="/rutassiva" element={<RutasSiva />} />
                                        <Route path="/puntosintere" element={<PuntoIntere />} />
                                        <Route path="/recomendacion" element={<Recomendacion />} />
                                    </Routes>
                                    </PuntosDeInteresContextProvider>
                                </PuntosContextProvider>
                            </RutaDibujarContextProvider>
                            </GeolocationContextProvider>
                        </div>
                    </div>
                </Router>
            </UserContextProvider>
        
    );
};

export default App;
