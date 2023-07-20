import {FC, memo} from 'react';
import {usePagerContext} from '../pager/pager-context';
import {usePollContext} from '../poll-context';
import {Question} from '../question/question';

type Props = {
    pageId: number;
    isLast: boolean;
}
export const Page: FC<Props> = memo(({pageId}) => {
    const {pages, questions} = usePollContext();
    const {handleNext} = usePagerContext();

    const page = pages[pageId]

    return <div>
        {page.questions.map((questionId) => {
            return <div>
                <Question questionId={questionId} />
            </div>
        })}
    </div>
})
