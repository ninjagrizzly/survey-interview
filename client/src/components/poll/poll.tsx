import { useCallback, useEffect, useState, useMemo} from 'react';
import {Choice} from '../question/choice';
import {Question} from '../question/question';

import {Question as QuestionType, Poll as PollType} from 'typings';

interface PollProps {
    pollID: string;
}

const API_HOST = 'http://localhost:3000';
const API_ENDPOINTS_TEMPLATES = {
    GET_POLL: (slug: string) => `${API_HOST}/api/poll/${slug}`,
    FINISH: (slug: string) => `${API_HOST}/api/poll/${slug}/finish`,
    ANSWER: (slug: string) => `${API_HOST}/api/poll/${slug}/answer`,
    STATS: (slug: string) => `${API_HOST}/api/poll/${slug}/stats`,
};

interface FinishDataReq {
    timestamp: number;
}

interface AnswerDataReq {
    questionId: number;
    answer: number | number[];
    timestamp: number;
}


const getPoll = async (slug: string): Promise<PollType> => {
    const endpoint = API_ENDPOINTS_TEMPLATES.GET_POLL(slug);
    

    try {
        const res = await fetch(endpoint);
        const parsed = await res.json();

        return parsed;
    } catch (err) {
        console.error(err);

        throw new Error();
    };
}

const finishPoll = async (slug: string, data: FinishDataReq) => {
    const endpoint = API_ENDPOINTS_TEMPLATES.FINISH(slug);
    const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return res;
}

const answerPoll = async (slug: string, data: AnswerDataReq) => {
    const endpoint = API_ENDPOINTS_TEMPLATES.ANSWER(slug);
    const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return res;
};

export function Poll({pollID}: PollProps) {
    const [pollData, setPollData] = useState<PollType | null>(null);
    const {pageOrder, pages} = pollData || {};

    const [currentPageId, setCurrentPageId] = useState(pageOrder?.[0]);
    const [isPollDone, setPollDone] = useState(false);

    useEffect(() => {
        getPoll(pollID).then(res => {
            setPollData(res);
            setCurrentPageId(res.pageOrder?.[0]);
        });
    }, [pollID]);

    const handleAnswer = useCallback((questionId: number, answer: number | number[] | null) => {
        if (answer === null) {
            return;
        }

        answerPoll(pollID, {questionId, answer, timestamp: Date.now()}).then(() => {
            console.log('success');
        });
    }, [pollID]);

    const handleGoToNextPage = useCallback(() => {
        const indexInList = pageOrder?.findIndex(val => val === currentPageId);
        const newIndex = indexInList === undefined ? 0 : indexInList + 1;

        setCurrentPageId(pageOrder?.[newIndex]);
    }, [currentPageId, pageOrder]);

    const handleFinish = useCallback(() => {
        finishPoll(pollID, {timestamp: Date.now()}).then(() => {
            setPollDone(true);
        });
    }, [pollID]);

    const currentPage = useMemo(() => {
        return currentPageId ? pages?.[currentPageId] : null;
    }, [currentPageId, pages]);

    const isLastPage = useMemo(() => {
        const indexInList = pageOrder?.findIndex(val => val === currentPageId);

        return Boolean(pageOrder?.length && indexInList === pageOrder?.length - 1);
    }, [currentPageId, pageOrder]);

    const questionsList = useMemo(() => {
        const questionsIds = currentPage?.questions;

        if (!questionsIds) {
            return [];
        }

        return (questionsIds.map(qId => pollData?.questions[qId]) as QuestionType[]);
    }, [pollData?.questions, currentPage])


    if (!questionsList) {
        return null;
    }

    if (isPollDone) {
        return <h2>Опрос завершен</h2>;
    }

    return (
        <>
            <Page
                isLastPage={isLastPage}
                questions={questionsList}
                onAnswer={handleAnswer}
                onGoToNextPage={handleGoToNextPage}
                onFinish={handleFinish}
            />
        </>
    )
}

function Page(props: {
    isLastPage?: boolean;
    questions: QuestionType[],
    onAnswer: (questionId: number, value: number | number[] | null) => void,
    onGoToNextPage: () => void;
    onFinish: () => void;
}) {
    const {isLastPage, questions, onAnswer, onGoToNextPage, onFinish} = props;
    const handleAnswerFabric = (questionId: number) => (value: number | number[] | null) => {
        onAnswer(questionId, value);
    };

    return (
        <>
            <div>
                {questions.map((question) => {
                    return (
                       <Question 
                            key={question.id}
                            question={question}
                            onChange={handleAnswerFabric(question.id)}
                        />
                    );
                })}
            </div>
            <div>
                <button onClick={isLastPage ? onFinish : onGoToNextPage}>{isLastPage ? 'Отправить' : 'Далее'}</button>
            </div>
        </>
    );
}