import crypto from "crypto";

export function geraToken() {
  return crypto.randomBytes(32).toString("hex");
}
