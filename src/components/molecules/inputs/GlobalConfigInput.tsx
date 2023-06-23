import { Case, Switch } from "../../../utils/Switch";
import { stringToBoolean } from "../../../utils/utils";
import { GlobalConfigInputWrapper } from "./GlobalConfigInput.style";
import dictionary from '../../../dictionary.json';

const GlobalConfigInput = ({type='text', value, setValue, options = []}: any) => {
    return (<GlobalConfigInputWrapper $isFocus={false}>
        {<Switch expression={type}>
            <Case value={'text'}>
                <input value={value} onChange={setValue}/>
            </Case>
            <Case value={'boolean'}>
                <select onChange={({target}) => setValue(stringToBoolean(target.value))} 
                    style={{backgroundColor: 'transparent', color: 'inherit', background: 'none !important'}}
                    >
                    <option value={'null'}>null</option>
                    <option value={'true'}>true</option>
                    <option value={'false'}>false</option>
                </select>
            </Case>
        </Switch>
        }
    </GlobalConfigInputWrapper>)
};

export default GlobalConfigInput;