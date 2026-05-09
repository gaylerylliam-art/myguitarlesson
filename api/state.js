import { handleError, handleState } from "./lib/handlers.js";

export default async function handler(req, res) {
  try {
    await handleState(req, res);
  } catch (error) {
    handleError(res, error);
  }
}
