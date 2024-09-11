import React, {createContext} from 'react';
import { useState } from 'react';

const RutaDibujarContext = createContext({
    RutaDibujar: null,
    setRutaDibujar: () => {}
});

function RutaDibujarContextProvider({children}){

    const [RutaDibujar, setRutaDibujar] = useState(null);

   return(
    <RutaDibujarContext.Provider value={{RutaDibujar,setRutaDibujar}}>
        {children}
    </RutaDibujarContext.Provider>
   );
}

export {RutaDibujarContext,RutaDibujarContextProvider}

