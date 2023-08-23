import { FC, memo, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import MuiRating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { RatingQuestion } from 'typings';

type Props = {
    data: RatingQuestion;
    initialValue?: number;
    onChange?: (value: number | null) => void;
};
export const Rating: FC<Props> = memo(
    ({ data, onChange, initialValue = null }) => {
        const [value, setValue] = useState(initialValue);

        const handleChange = useCallback(
            (event: React.SyntheticEvent, newValue: number | null) => {
                setValue(newValue);
                onChange?.(newValue);
            },
            [setValue, onChange]
        );

        return (
            <Box sx={{ mt: 2 }}>
                <Typography component="legend">{data.label}</Typography>
                <MuiRating
                    value={value}
                    max={data.maxValue}
                    onChange={handleChange}
                    size="large"
                />
            </Box>
        );
    }
);
