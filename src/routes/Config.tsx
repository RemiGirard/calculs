import Title from '../components/Title';
import Button from '../components/buttons/Button';

const Config = ({title, setStateGenerateExercices, config, setConfig}: any) => {
  // {
  //   default: {
  //     numberOfGroup: 2,
  //     group: {min: 1, max: 9},
  //     calcSpeRange: { min: 10, max: 50 },
  //     calcSpeNumber: { min: 10, max: 50 },
  //     calcType: '+',
  //     calcNumber: 6,
  //     difficulty: 1,
  //     questionDuration: isDevEnv ? 5 : 180,
  //     answerDuration: isDevEnv ? 5 : 60,
  //     gap: 'result',
  //   },
  //   displayLetterId: true,
  // }
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