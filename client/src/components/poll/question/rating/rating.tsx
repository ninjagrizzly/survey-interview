import {FC, memo} from 'react';
import {RatingQuestion} from '../../../../../typings';
import MuiRating from '@mui/material/Rating'


type Props = {
    data: RatingQuestion;
}
export const Rating: FC<Props> = memo(({data}) => {





    return <div>
        <MuiRating value={} max={data.maxValue} />
    </div>
})
