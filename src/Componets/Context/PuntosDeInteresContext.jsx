import React, {createContext} from 'react';
import { useState } from 'react';


const PuntosDeInteresContext = createContext({
    PuntosDeInteres: null,
    setPuntosDeInteres: () => {}
});

function PuntosDeInteresContextProvider({children}){

    const [PuntosDeInteres, setPuntosDeInteres] = useState(null);

   return(
    <PuntosDeInteresContext.Provider value={{PuntosDeInteres,setPuntosDeInteres}}>
        {children}
    </PuntosDeInteresContext.Provider>
   );
}

export {PuntosDeInteresContext,PuntosDeInteresContextProvider}
