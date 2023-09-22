import { Router } from "express";
import { filterByCandidate, getAllCities } from "../controllers/municipio.js";
import { getAllCandidates, getCandidatesByCity } from "../controllers/candidatos.js";

const router = Router()

router.get('/municipio/:municipio', getAllCities)
router.get('/municipio/:municipio/candidato/:candidato', filterByCandidate)

router.get('/candidato/:candidato', getAllCandidates)
router.get('/candidato/:candidato/municipio/:municipio', getCandidatesByCity)

export { router }