interface PollProps {
    pollID: string;
}

export function Poll({pollID}: PollProps) {
    return (
        <h1>Здесь опрос c id: {pollID}</h1>
    )
}