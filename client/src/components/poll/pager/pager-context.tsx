import {createContext, FC, ReactNode, useContext, useMemo} from 'react';


type PagerContext = {

    handleNext: () => void;
    handlePrev: () => void;
}
const PagerContext = createContext<PagerContext | null>(null);


type Props = {
    children: ReactNode
} & PagerContext;
export const PagerContextProvider: FC<Props> = ({handleNext, handlePrev, children}) => {

    const value = useMemo(() => ({
        handleNext,
        handlePrev
    }), [handleNext, handlePrev]);

    return <PagerContext.Provider value={value}>
        {children}
    </PagerContext.Provider>;
}

export const usePagerContext = () => {
    const poll = useContext(PagerContext);
    if (!poll) {
        throw new Error('expected PagerContextProvider')
    }
    return poll;
}
