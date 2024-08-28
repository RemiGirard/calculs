import Config, {ConfigParam} from "@/Domain/GenerateExercises/Entity/Config.ts";

export default (config: Config, setConfig: (newConfig: Config) => void, key: ConfigParam, value: boolean) => {
  const newConfig = config.getCopy();
  newConfig[key].value = value;
  setConfig(newConfig);
}
