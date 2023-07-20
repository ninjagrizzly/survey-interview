import {FC, memo} from 'react';
import {usePollContext} from '../poll-context';
import {Choice} from './choice/choice';
import {Rating} from './rating/rating';


type Props = {
    questionId: number
}
export const Question: FC<Props> = memo(({questionId}) => {
    const {questions} = usePollContext();

    const question = questions[questionId]
    switch (question.type) {
        case 'choice':
            return <Choice data={question} />

        case  'rating':
            return <Rating data={question} />;

        default:
            const tsTest: never = question;

    }

});
