import { handleAuthConfig, handleError } from "./lib/handlers.js";

export default async function handler(req, res) {
  try {
    await handleAuthConfig(req, res);
  } catch (error) {
    handleError(res, error);
  }
}
