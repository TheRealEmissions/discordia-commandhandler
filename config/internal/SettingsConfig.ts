import { ISettingsConfig } from "./interfaces/ISettingsConfig.js";
import FS from "fs-extra-promise";
import YAML from "yaml";
import { fileURLToPath } from "node:url";

const config = YAML.parse(
  FS.readFileSync(
    fileURLToPath(new URL("../Settings.yml", import.meta.url)),
    "utf8"
  )
);

console.log(config);

export const SettingsConfig: ISettingsConfig = config;
