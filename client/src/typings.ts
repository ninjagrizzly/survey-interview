export type BaseQuestion = {
    id: number;
    label: string;
    type: 'choice' | 'rating';
};

export type ChoiceQuestion = BaseQuestion & {
    type: 'choice';
    isMulti?: boolean;
    options: {
        id: number;
        label: string;
    }[];
};

export type RatingQuestion = BaseQuestion & {
    type: 'rating';
    maxValue: number;
};

export type Question = ChoiceQuestion | RatingQuestion;

export type Poll = {
    id: string;
    questions: {
        [id: number]: Question;
    };

    pages: {
        [id: number]: {
            id: number;
            questions: number[];
        };
    };

    pageOrder: number[];
};
