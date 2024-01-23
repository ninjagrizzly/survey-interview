# API

## Poll

```typescript
type Poll = {
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
```

Получение опроса:
`GET /api/poll/:slug`

Ответ на вопрос:
`POST /api/poll/:slug/answer`

Тело запроса:

```
{
    questionId: number;
    value: number | number[];
    timestamp: number;
}
```

Завершение опроса:
`POST /api/poll/:slug/finish`

Тело запроса:

```
{
    timestamp: number;
}
```

События аналитики:
`POST /api/poll/:slug/stats`

Тело запроса:

```
{
    event: string;
    timestamp: number;
    meta: any;
}
```
