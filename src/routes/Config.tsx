import Title from '../components/molecules/Title';
import Button from '../components/molecules/buttons/Button';

const Config = ({title, setStateGenerateExercices, config, setConfig}: any) => {

    const handleChange = (e:any, key:any) => {
      const { name, value } = e.target;
      const keys = key.split('.');
      let newConfig = { ...config };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      setConfig(newConfig);
    };
  
    const renderFields = (config:any, key='') => {
      return Object.keys(config).map((fieldKey) => {
        const field = config[fieldKey];
        const newKey = key ? `${key}.${fieldKey}` : fieldKey;
        if (typeof field === 'object' && !Array.isArray(field)) {
          return (
            <div key={newKey}>
              <h4>{fieldKey}</h4>
              {renderFields(field, newKey)}
            </div>
          );
        } else {
          return (
            <div key={newKey}>
              <label>{fieldKey}:</label>
              <input
                type={typeof field === 'number' ? 'number' : 'text'}
                name={newKey}
                value={field}
                onChange={(e) => handleChange(e, newKey)}
              />
            </div>
          );
        }
      });
    };
  
    return (
      <div>
        <Title>Configuration</Title>
        {renderFields(config)}
      </div>
    );
};

export default Config;