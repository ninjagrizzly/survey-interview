import { FC, memo } from 'react';

interface PollProps {
    pollID: string;
}

export const Poll: FC<PollProps> = memo(({ pollID }: PollProps) => {
    return <h1>Опрос c id: {pollID}</h1>;
});
