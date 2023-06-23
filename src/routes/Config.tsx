import Title from '../components/molecules/Title';
import Button from '../components/molecules/buttons/Button';
import GlobalConfigInput from '../components/molecules/inputs/GlobalConfigInput';
import { ConfigWrapper, ExitButton } from './Config.style';
import colors from '../colors.json';
import dictionaryTyped from '../dictionary.json';
import Helper from '../components/molecules/Helper';

const dictionary:any = dictionaryTyped;
const Config = ({title, config, setConfig, pageGenerateExercices}: any) => {

    const handleChange = (value:any, key:any) => {
      let newConfig = structuredClone(config);
      newConfig[key] = {...newConfig[key], value};
      setConfig(newConfig);
    };
  
    const renderFields = (config:any, key='') => {
      return Object.keys(config).map((fieldKey) => {
        const field = config[fieldKey];
        const newKey = key ? key+'.'+fieldKey : fieldKey;
        if (typeof field === 'object' && !field.hasOwnProperty('value')) {
          return (
            <div key={newKey}>
              <h4>{fieldKey}</h4>
              {renderFields(field, newKey)}
            </div>
          );
        } else {
          return (
            <div key={newKey} style={{display: 'flex'}}>
              <div style={{marginRight: '15px'}}>{newKey}</div>
              <GlobalConfigInput value={field.value} setValue={(newValue:any)=>handleChange(newValue, newKey)} type={field.type} />
              {
                dictionary.helper.globalConfig[fieldKey]
                  ? <Helper text={dictionary.helper.globalConfig[fieldKey] ?? ''} />
                  : null
              }
            </div>
          );
        }
      });
    };
  
    return (
      <ConfigWrapper>
        <div style={{position: 'absolute', right: '2%', top: '1%'}}>
          <ExitButton onClick={pageGenerateExercices}>exit</ExitButton>
        </div>
        <Title>{title}</Title>
        {renderFields(config)}
      </ConfigWrapper>
    );
};

export default Config;