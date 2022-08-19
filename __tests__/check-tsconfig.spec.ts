import { test, expect } from "@jest/globals";
import * as ts from "typescript";

import { setTypescriptModule } from "../src/tsproxy";
import { checkTsConfig } from "../src/check-tsconfig";

setTypescriptModule(ts);

const defaultConfig = { fileNames: [], errors: [], options: {} };

test("checkTsConfig", () => {
	expect(() => checkTsConfig({
		...defaultConfig,
		options: { module: ts.ModuleKind.ES2015 },
	})).not.toThrow();

	expect(() => checkTsConfig({
		...defaultConfig,
		options: { module: ts.ModuleKind.ES2020 },
	})).not.toThrow();

	expect(() => checkTsConfig({
		...defaultConfig,
		options: { module: ts.ModuleKind.ESNext },
	})).not.toThrow();
});

test("checkTsConfig - errors", () => {
	expect(() => checkTsConfig({
		...defaultConfig,
		options: { module: ts.ModuleKind.None },
	})).toThrow("Incompatible tsconfig option. Module resolves to 'None'. This is incompatible with Rollup, please use");
});
