import path from "node:path";
import type { Config } from "../get-config";

export async function getSvgFolderPath(
    config: Config,
    override?: string,
) {
    if (override) {
        return override;
    }

    const [parent, type] = ["components", "icons"] as const
    if (!(parent in config.resolvedPaths)) {
        return null;
    }

    return path.join(
        config.resolvedPaths[parent],
        type,
    );
}