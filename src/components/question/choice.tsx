import { FC, memo, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ChoiceQuestion } from 'typings';

type BaseChoiceProps = {
    data: ChoiceQuestion;
    onChange?: (value: number | number[]) => void;
};

type SingleChoiceProps = BaseChoiceProps & {
    initialValue?: number;
};

const SingleChoice: FC<SingleChoiceProps> = memo(
    ({ data, onChange, initialValue = null }) => {
        const [value, setValue] = useState(initialValue);

        const { label, options } = data;

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = Number(
                    (event.target as HTMLInputElement).value
                );
                setValue(newValue);
                onChange?.(newValue);
            },
            [setValue, onChange]
        );

        return (
            <Box>
                <FormControl>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup value={value} onChange={handleChange}>
                        {options.map(({ id, label }) => (
                            <FormControlLabel
                                key={id}
                                value={id}
                                control={<Radio />}
                                label={label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }
);

type MultiChoiceProps = BaseChoiceProps & {
    initialValue?: number[];
};

const MultiChoice: FC<MultiChoiceProps> = memo(
    ({ data, onChange, initialValue = [] }) => {
        const [value, setValue] = useState(initialValue);
        const { label, options } = data;

        const removeOption = useCallback(
            (optionId: number) => {
                const newValue = [...value];
                newValue.splice(newValue.indexOf(optionId), 1);
                setValue(newValue);
                onChange?.(newValue);
            },
            [value, setValue, onChange]
        );

        const addOption = useCallback(
            (optionId: number) => {
                const newValue = [...value, optionId];
                setValue(newValue);
                onChange?.(newValue);
            },
            [value, setValue, onChange]
        );

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const optionId = Number(event.target.value);
                if (event.target.checked) {
                    return addOption(optionId);
                } else {
                    removeOption(optionId);
                }
            },
            [addOption, removeOption]
        );

        return (
            <Box>
                <FormControl variant="standard">
                    <FormLabel component="legend">{label}</FormLabel>
                    <FormGroup>
                        {options.map(({ id, label }) => (
                            <FormControlLabel
                                key={id}
                                control={
                                    <Checkbox
                                        key={id}
                                        checked={value.includes(id)}
                                        onChange={handleChange}
                                        value={id}
                                    />
                                }
                                label={label}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        );
    }
);

type Props = SingleChoiceProps | MultiChoiceProps;

export const Choice: FC<Props> = memo(({ data, onChange, initialValue }) => {
    return (
        <Box sx={{ mt: 2 }}>
            {data.isMulti ? (
                <MultiChoice
                    data={data}
                    onChange={onChange}
                    initialValue={
                        Array.isArray(initialValue) ? initialValue : undefined
                    }
                />
            ) : (
                <SingleChoice
                    data={data}
                    onChange={onChange}
                    initialValue={
                        typeof initialValue === 'number'
                            ? initialValue
                            : undefined
                    }
                />
            )}
        </Box>
    );
});
