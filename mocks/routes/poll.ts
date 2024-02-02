import type { Request, Response } from 'express';

import { POLLS } from '../fixtures/polls';
import { ANSWER_SCHEMA, FINISH_SCHEMA, STATS_SCHEMA } from '../schemas';

const routes = [
    {
        id: 'get-poll',
        url: '/api/poll/:slug',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'middleware',
                options: {
                    middleware: (req: Request, res: Response) => {
                        const slug = req.params.slug;
                        res.status(200);
                        res.send(POLLS[slug]);
                    },
                },
            },
        ],
    },
    {
        id: 'answer-poll',
        url: '/api/poll/:slug/answer',
        method: 'POST',
        variants: [
            {
                id: 'success',
                type: 'middleware',
                options: {
                    middleware: (req: Request, res: Response) => {
                        const slug = req.params.slug;

                        if (!POLLS[slug]) {
                            return res.sendStatus(404);
                        }

                        const { error: validationError } =
                            ANSWER_SCHEMA.validate(req.body, {
                                convert: false,
                            });

                        if (validationError) {
                            res.status(500);
                            return res.send(validationError.details);
                        }

                        res.sendStatus(200);
                    },
                },
            },
        ],
    },
    {
        id: 'finish-poll',
        url: '/api/poll/:slug/finish',
        method: 'POST',
        variants: [
            {
                id: 'success',
                type: 'middleware',
                options: {
                    middleware: (req: Request, res: Response) => {
                        const slug = req.params.slug;

                        if (!POLLS[slug]) {
                            return res.sendStatus(404);
                        }

                        const { error: validationError } =
                            FINISH_SCHEMA.validate(req.body, {
                                convert: false,
                            });

                        if (validationError) {
                            res.status(500);
                            return res.send(validationError.details);
                        }

                        res.sendStatus(200);
                    },
                },
            },
        ],
    },
    {
        id: 'stats-poll',
        url: '/api/poll/:slug/stats',
        method: 'POST',
        variants: [
            {
                id: 'success',
                type: 'middleware',
                options: {
                    middleware: (req: Request, res: Response) => {
                        const slug = req.params.slug;

                        if (!POLLS[slug]) {
                            return res.sendStatus(404);
                        }

                        const { error: validationError } =
                            STATS_SCHEMA.validate(req.body, { convert: false });

                        if (validationError) {
                            res.status(500);
                            return res.send(validationError.details);
                        }

                        res.sendStatus(200);
                    },
                },
            },
        ],
    },
];

export default routes;
