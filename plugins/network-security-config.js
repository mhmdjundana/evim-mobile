const { withAndroidManifest, withStringsXml } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function androidNetworkSecurityConfig(config) {
  config = withAndroidManifest(config, (config) => {
    let androidManifest = config.modResults.manifest;
    const application = androidManifest.application[0];
    application.$['android:networkSecurityConfig'] = '@xml/network_security_config';
    return config;
  });

  config = withStringsXml(config, (config) => {
    const filePath = path.join(config.modRequest.platformProjectRoot, 'app/src/main/res/xml/network_security_config.xml');
    const fileContent = `
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.10.25.83</domain>
        <domain includeSubdomains="true">192.168.101.192</domain>
    </domain-config>
</network-security-config>
    `;

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent);

    return config;
  });

  return config;
};