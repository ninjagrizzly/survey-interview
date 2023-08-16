import {useEffect, useState} from "react";
import {Polls} from 'typings'
import {Question} from "../question/question";

interface PollProps {
    pollID: string;
}

const PollPage = (props: {questions: any, pollID: any}) => {
    const {questions, pollID} = props
    return (<>
        {questions.map((el: any) => <Question onChange={(value) => {
        fetch(`/api/poll/${pollID}/answer`, {
            method: 'POST',
            body: JSON.stringify({
                questionId: el.id,
                answer: value,
                timestamp: Date.now()
            })
        })}
        } question={el}/>)}
    </>);
}

export function Poll({pollID}: PollProps) {
    const [poll, setPoll] = useState<Polls | null>(null)
    const [pageNum, setNextPage] = useState(0);
    const [isCompleted, setCompleted] = useState(false)

    useEffect(() => {
        fetch(`/api/poll/${pollID}`).then((res) => {
            return res.json()
        }).then((data) => {
            setPoll(data);
        })
    }, [])

    if (poll == null)
        return null;

    if (isCompleted) {
        return (<>
            <div>Завершено!</div></>)
    }

    const pageId = poll.pageOrder[pageNum];
    const questions = poll?.pages[pageId]?.questions;
    const pageQuestions = questions?.map(index => poll?.questions[index])

    return (
        <>
            <PollPage questions={pageQuestions} pollID={pollID}/>
            {pageNum < poll?.pageOrder?.length - 1 && <button onClick={() => setNextPage(pageNum + 1)}>Далее</button>}
            {pageNum === poll?.pageOrder?.length - 1 && <button onClick={() => {
                setCompleted(true);
                fetch(`/api/poll/${pollID}/finish`, {
                    method: 'POST'
                })
            }
            }>Завершить</button>}
        </>
    )
}