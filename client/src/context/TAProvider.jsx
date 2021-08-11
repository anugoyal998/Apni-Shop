import {createContext, useState} from 'react'

export const TAContext = createContext();

const TAProvider = ({children})=> {
    const [ta,setTA] = useState(0);
    return(
        <TAContext.Provider value={[ta,setTA]}>
            {children}
        </TAContext.Provider>
    )
}

export default TAProvider;