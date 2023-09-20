import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const getAllCities = async (req: Request, res: Response) => {
  const { municipio } = req.params
  try {
    const data = await prisma.candi.findMany({
      where: {
        'NM_MUNICIPIO': municipio
      }
    })
    const filtredData = []
    for (const line of data) {
      const filter = {
        candidato: line.NM_URNA_CANDIDATO,
        partido: line.NM_PARTIDO,
        cargo: line.DS_CARGO,
        votos: parseInt(line.QT_VOTOS_NOMINAIS_VALIDOS?.toString() || "0"),
        zona: line.NR_ZONA?.toString(),
        municipio: line.NM_MUNICIPIO
      }
      filtredData.push(filter)
    }
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
    const filtredData = []
    for (const line of data) {
      const filter = {
        candidato: line.NM_URNA_CANDIDATO,
        partido: line.NM_PARTIDO,
        cargo: line.DS_CARGO,
        votos: parseInt(line.QT_VOTOS_NOMINAIS_VALIDOS?.toString() || "0"),
        turno: line.NR_TURNO?.toString(),
        zona: line.NR_ZONA?.toString(),
        municipio: line.NM_MUNICIPIO
      }
      filtredData.push(filter)
    }
    let totalVotos = 0
    let totalVotosSegundoTurno = 0
    for (let i = 0; i < filtredData.length; i++) {
      if (filtredData[i].turno == "1") {
        totalVotos = totalVotos + filtredData[i].votos
      }
      if (filtredData[i].turno == "2") {
        totalVotosSegundoTurno = totalVotosSegundoTurno + filtredData[i].votos
      }
    }
    return res.status(200).json({ filtredData, totalVotos, totalVotosSegundoTurno })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}