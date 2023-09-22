import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { clearMunicipio, filter, somarVotos, votosPorMunicipio } from "../services/filter.js";

export const getAllCandidates = async (req: Request, res: Response) => {
  const { candidato } = req.params
  try {
    const data = await prisma.candi.findMany({
      where: {
        NM_URNA_CANDIDATO: candidato
      }
    })
    const filtredData = filter(data)
    const municipios = clearMunicipio(filtredData)
    const full = votosPorMunicipio(filtredData, municipios)
    return res.status(200).json({ candidato, votosPorMunicipio: full, quantidade: municipios.length })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}

export const getCandidatesByCity = async (req: Request, res: Response) => {
  const { candidato, municipio } = req.params
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