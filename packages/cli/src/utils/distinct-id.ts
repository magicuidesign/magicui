import crypto from "crypto";
import os from "os";

export function generateDistinctId(): string {
  const username = os.userInfo().username;
  const hostname = os.hostname();
  const platform = os.platform();
  const uniqueString = `${username}-${hostname}-${platform}`;
  return crypto.createHash("md5").update(uniqueString).digest("hex");
}
