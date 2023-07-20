import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {Poll} from '../../../typings';

const PollContext = createContext<Poll | null>(null);


type Props = {
    poll: Poll;
    children: ReactNode
}
export const PollContextProvider: FC<Props> = ({poll, children}) => {
    return <PollContext.Provider value={poll}>
        {children}
    </PollContext.Provider>
}

export const usePollContext = () => {
    const poll = useContext(PollContext);
    if (!poll) {
        throw new Error('expected PollContextProvider')
    }
    return poll;
}
