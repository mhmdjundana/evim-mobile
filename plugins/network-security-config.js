const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function androidNetworkSecurityConfig(config) {
  return withAndroidManifest(config, (config) => {
    let androidManifest = config.modResults.manifest;
    const application = androidManifest.application[0];
    application.$['android:networkSecurityConfig'] = '@xml/network_security_config';
    return config;
  });
};