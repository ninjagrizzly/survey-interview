import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button'
import {Poll} from '../../../typings';
import {Pager} from './pager/pager';
import {PollContextProvider} from './poll-context';

interface PollProps {
    pollID: string;
}

export function Poll({pollID}: PollProps) {

    const [pollState, setPollState] = useState<{status: 'loading'} | {status: 'error'} | {status: 'done', data: Poll}>({status: 'loading'});
    const [tryN, setTryN] = useState(0)
    useEffect(() => {
        let isActual = true;
        (async () => {
            setPollState({status: 'loading'});
            try {
                const resp = await fetch(`/api/poll/${pollID}`);
                if (!isActual) {
                    return;
                }
                if (!resp.ok) {
                    throw new Error('not ok resp');
                }
                setPollState({status: 'done', data: resp.json() as unknown as Poll});
            } catch (err) {
                setPollState({status: 'error'});
            }
        })();

        return () => {
            isActual = false;
        }
    }, [tryN]);


    if (pollState.status === 'error') {
        return <div>
            <h2>Ошибка загрузки</h2>
            <Button onClick={() => setTryN((n) => n + 1)}>Попробовать снова</Button>
        </div>
    }

    if (pollState.status === 'loading') {
        return <div>
            <h2>Загружаем ваш опрос...</h2>
        </div>
    }




    return (
        <PollContextProvider poll={pollState.data}>
            <div>
                <h1>Опрос #{pollID}</h1>
                <Pager key={pollState.data.id} />
            </div>
        </PollContextProvider>
    )
}
