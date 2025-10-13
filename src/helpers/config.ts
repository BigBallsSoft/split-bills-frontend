const env = {
  API_URL: import.meta.env.VITE_API_URL,
  TG_APP_URL: import.meta.env.VITE_TG_APP_URL,
};

const checkConfig = (config: typeof env) => {
  const missingKeys = Object.keys(config).filter(
    (key) => config[key as keyof typeof config] === undefined
  );
  if (missingKeys.length > 0) {
    throw new Error(
      missingKeys
        .join(', ')
        .concat(` config ${missingKeys.length > 1 ? 'properties are' : 'property is'} missing`)
    );
  }
  return config;
};

const checkedConfig = checkConfig(env);

export const config = checkedConfig;
