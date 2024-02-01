type BaseQuestion = {
    id: number;
    label: string;
    type: 'choice' | 'rating';
};

type ChoiceQuestion = BaseQuestion & {
    type: 'choice';
    isMulti?: boolean;
    options: {
        id: number;
        label: string;
    }[];
};

type RatingQuestion = BaseQuestion & {
    type: 'rating';
    maxValue: number;
};

export type Poll = {
    id: string;
    questions: {
        [id: number]: ChoiceQuestion | RatingQuestion;
    };

    pages: {
        [id: number]: {
            id: number;
            questions: number[];
        };
    };

    pageOrder: number[];
};

export const POLLS: { [id: string]: Poll } = {
    abc: {
        id: 'abc',
        questions: {
            1: {
                id: 1,
                label: 'Какого цвета солнце?',
                type: 'choice',
                options: [
                    {
                        id: 1,
                        label: 'Желтый',
                    },
                    {
                        id: 2,
                        label: 'Оранжевый',
                    },
                    {
                        id: 3,
                        label: 'Красный',
                    },
                    {
                        id: 4,
                        label: 'Алый',
                    },
                ],
            },
            2: {
                id: 2,
                label: 'Насколько высоко оцениваете фильм "Форсаж 10"?',
                type: 'rating',
                maxValue: 10,
            },
            3: {
                id: 3,
                label: 'По каким дням играем в футбол?',
                type: 'choice',
                isMulti: true,
                options: [
                    {
                        id: 1,
                        label: 'Понедельник',
                    },
                    {
                        id: 2,
                        label: 'Вторник',
                    },
                    {
                        id: 3,
                        label: 'Среда',
                    },
                    {
                        id: 4,
                        label: 'Четверг',
                    },
                    {
                        id: 5,
                        label: 'Пятница',
                    },
                    {
                        id: 6,
                        label: 'Суббота',
                    },
                    {
                        id: 7,
                        label: 'Воскресенье',
                    },
                ],
            },
            4: {
                id: 4,
                label: 'Дыня или арбуз?',
                type: 'choice',
                options: [
                    {
                        id: 1,
                        label: 'Дыня',
                    },
                    {
                        id: 2,
                        label: 'Арбуз',
                    },
                ],
            },
            5: {
                id: 5,
                label: 'Насколько высоко оцениваете опрос?',
                type: 'rating',
                maxValue: 5,
            },
        },

        pages: {
            1: {
                id: 1,
                questions: [1, 2],
            },
            2: {
                id: 2,
                questions: [3, 4],
            },
            3: {
                id: 3,
                questions: [5],
            },
        },

        pageOrder: [1, 2, 3],
    },
};
