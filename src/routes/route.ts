import { Router } from "express";
import { filterByCandidate, getAllCities } from "../controllers/municipio.js";

const router = Router()

router.get('/municipio/:municipio', getAllCities)
router.get('/municipio/:municipio/candidato/:candidato', filterByCandidate)

export { router }