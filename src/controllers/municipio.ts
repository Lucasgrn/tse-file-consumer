import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { filter, somarVotos } from "../services/filter.js";

export const getAllCities = async (req: Request, res: Response) => {
  const { municipio } = req.params
  try {
    const data = await prisma.candi.findMany({
      where: {
        'NM_MUNICIPIO': municipio
      }
    })
    const filtredData = filter(data)
    return res.status(200).json(filtredData)
  } catch (error) {

  }
}

export const filterByCandidate = async (req: Request, res: Response) => {
  const { municipio, candidato } = req.params
  try {
    const data = await prisma.candi.findMany({
      where: {
        NM_URNA_CANDIDATO: candidato,
        NM_MUNICIPIO: municipio
      }
    })
    const filtredData = filter(data)
    const { totalVotos, totalVotosSegundoTurno } = somarVotos(filtredData)
    return res.status(200).json({ filtredData, totalVotos, totalVotosSegundoTurno })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}