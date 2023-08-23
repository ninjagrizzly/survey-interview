import { FC, memo } from 'react';

import { Choice } from './choice';
import { Rating } from './rating';

import { Question as QuestionType } from 'typings';

type Props = {
    question: QuestionType;
    onChange?: (value: number | number[] | null) => void;
};

export const Question: FC<Props> = memo(({ question, onChange }) => {
    switch (question.type) {
        case 'choice':
            return <Choice data={question} onChange={onChange} />;
        case 'rating':
            return <Rating data={question} onChange={onChange} />;
        default:
            return null;
    }
});
