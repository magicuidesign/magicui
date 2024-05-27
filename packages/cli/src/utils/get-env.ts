import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Configstore from 'configstore';

const envName = "MAGICUI_PRO_ENV";
const config = new Configstore("magicui");

export const getEnv = () => config.get(envName);
export const setEnv = (env: string) => config.set(envName, env);
export const clearAll = () => config.clear()

export const login = async (env: string) => {
	try {
		setEnv(env);
		return "Logged in ✅"
	} catch (error) {
		return;
	}
}


export function parseEnvFile(filesPath: string[]) {
	try {
		for (const file of filesPath) {
			const envFilePath = path.resolve(process.cwd(), file);
			if (fs.existsSync(envFilePath)) {
				const envConfig = dotenv.parse(fs.readFileSync(envFilePath, "utf8"));
				if (envConfig?.MAGICUI_PRO_ENV) {
					// TODO: Add more checks for the env file
					if (envConfig.MAGICUI_PRO_ENV.length === 0) continue;

					return envConfig.MAGICUI_PRO_ENV;
				}
			}
		}
	} catch (error) {
		return undefined;
	}
}
