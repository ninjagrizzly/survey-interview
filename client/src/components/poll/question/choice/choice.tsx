import {FC, memo} from 'react';
import {ChoiceQuestion} from '../../../../../typings';


type Props = {
    data: ChoiceQuestion
}
export const Choice: FC<Props> = memo(({data}) => {

    return <div>
        {JSON.stringify(data)}
    </div>
});
