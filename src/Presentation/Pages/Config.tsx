import {useEffect} from "react";
import { useRouter } from '@/Presentation/Router.tsx';
import Config, {ConfigParam} from '@/Domain/GenerateExercises/Entity/Config.ts';
import ConfigWrapper from '@/Presentation/Pages/Config.style.tsx'
import dictionary from "@/Presentation/dictionary.ts";
import updateConfig from "@/Domain/GenerateExercises/UseCase/updateConfig.ts";
import quitPage from "@/Domain/Score/UseCase/quitPage.ts";

type componentProps = {
  config: Config;
  setConfig: (newConfig: Config) => void;
}

export default function ({ config, setConfig }: componentProps) {
  const { navigate } = useRouter();

  const keyPressHandler = (event: KeyboardEvent) => {
    if(event.key === 'Escape') quitPage(navigate);
  }

  const onChangeHandler = (key: ConfigParam, value: boolean) => updateConfig(config, setConfig, key, value);
  const pressCloseButtonHandler = () => quitPage(navigate);

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => document.removeEventListener('keydown', keyPressHandler);
  }, []);

  return (<ConfigWrapper>
      <button onClick={pressCloseButtonHandler}>{dictionary.configPage.exitButton}</button>
      <h1>{dictionary.configTitle}</h1>
      <div>
        {(Object.entries(config.getParamList()) as [ConfigParam, {value: boolean, type: 'boolean'}][]).map(([key, value]) => {
          return (<div key={''+key+value.value}>
            <label>{key}</label>
            <input type="checkbox" checked={value.value} onChange={(e) => {
              onChangeHandler(key, e.target.checked);
            }} />
          </div>);
        })}
      </div>
    </ConfigWrapper>
  );
}
