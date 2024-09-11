import React, {createContext} from 'react';
import { useState } from 'react';

const PuntosContext = createContext({
    Puntos: null,
    setPuntos: () => {}
});

function PuntosContextProvider({children}){

    const [Puntos, setPuntos] = useState([]);

   return(
    <PuntosContext.Provider value={{Puntos,setPuntos}}>
        {children}
    </PuntosContext.Provider>
   );
}

export {PuntosContext,PuntosContextProvider}
