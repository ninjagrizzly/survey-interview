import {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {Page} from '../page/page';
import {usePollContext} from '../poll-context';
import {PagerContextProvider} from './pager-context';

const LS_PREFIX = 'Pager_LS_'
const getLSPageIndex = (poolId: string): number | undefined => {
    const lsVal = parseFloat(localStorage.getItem(`${LS_PREFIX}${poolId}`) ?? '');

    if (lsVal !== lsVal) return undefined;

    return lsVal;
}
const setLSPageIndex = (poolId: string, index: number): void => {
    localStorage.setItem(`${LS_PREFIX}${poolId}`, String(index));
}

export const Pager: FC = memo(() => {
    const {pages, pageOrder, id} = usePollContext();
    const [pageIndex, setPageIndex] = useState(() => {
        return getLSPageIndex(id) ?? 0;
    });

    useEffect(() => {
        setLSPageIndex(id, pageIndex)
    })


    const handleNext = useCallback(() => {
        setPageIndex((p) => Math.min(p + 1, pageOrder.length - 1));
    }, []);
    const handlePrev = useCallback(() => {
        setPageIndex((p) => Math.max(p - 1, 0));
    }, []);

    const progress = Math.floor(pageIndex*100/pageOrder.length);

    return <PagerContextProvider
        handleNext={handleNext}
        handlePrev={handlePrev}
    >
        <div>
            {pageOrder.length > 1 && <progress max="100" value={progress}>{progress}%</progress>}
            <Page
                key={pageOrder[pageIndex]}
                pageId={pageOrder[pageIndex]}
                isLast={pageIndex === pageOrder.length - 1}
            />
        </div>
    </PagerContextProvider>
});
