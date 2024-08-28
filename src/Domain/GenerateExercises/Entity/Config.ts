const configParamList = ['displayLetterId'] as const;

export type ConfigParam = typeof configParamList[number];

export default class Config {
  public displayLetterId: {value: boolean, type: 'boolean'};

  constructor() {
    this.displayLetterId = { value: true, type: 'boolean' };
  }

  getParamList() {
    const configParamObject = {} as Record<ConfigParam, {value: boolean, type: 'boolean'}>;
    for (const key of configParamList) {
      configParamObject[key] = this[key];
    }
    return configParamObject;
  }

  getCopy(): Config {
    const newConfig = new Config();
    for (const key of configParamList) {
      newConfig[key].value = this[key].value;
    }
    return newConfig;
  }
}
