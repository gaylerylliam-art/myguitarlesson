import { handleError, handlePractice } from "./lib/handlers.js";

export default async function handler(req, res) {
  try {
    await handlePractice(req, res);
  } catch (error) {
    handleError(res, error);
  }
}
