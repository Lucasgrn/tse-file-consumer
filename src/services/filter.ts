import { candi } from "@prisma/client"

export interface filtredData {
  candidato: string | null,
  nome: string | null,
  partido: string | null,
  cargo: string | null,
  turno: string | undefined,
  votos: number,
  zona: string | undefined,
  municipio: string
}
export const filter = (data: Array<candi>): Array<filtredData> => {
  const filtredData: Array<filtredData> = []
  for (const line of data) {
    const filter: filtredData = {
      candidato: line.NM_URNA_CANDIDATO,
      nome: line.NM_CANDIDATO,
      partido: line.NM_PARTIDO,
      cargo: line.DS_CARGO,
      turno: line.NR_TURNO?.toString(),
      votos: parseInt(line.QT_VOTOS_NOMINAIS_VALIDOS?.toString() || "0"),
      zona: line.NR_ZONA?.toString(),
      municipio: line.NM_MUNICIPIO || ""
    }
    filtredData.push(filter)
  }
  return filtredData
}

export const somarVotos = (data: Array<filtredData>) => {
  let totalVotos = 0
  let totalVotosSegundoTurno = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].turno == "1") {
      totalVotos = totalVotos + data[i].votos
    }
    if (data[i].turno == "2") {
      totalVotosSegundoTurno = totalVotosSegundoTurno + data[i].votos
    }
  }
  const res = {
    totalVotos,
    totalVotosSegundoTurno
  }
  return res
}

export const clearMunicipio = (data: Array<filtredData>) => {
  const array: Array<string> = []
  for (const i of data) {
    array.push(i.municipio)
  }
  const novaArr = array.filter((este, i) => {
    return array.indexOf(este) === i;
  });
  return novaArr
}

export const votosPorMunicipio = (data: Array<filtredData>, municipio: Array<string>) => {
  const res: Array<{ municipio: string, votos: number, votosSegundo: number }> = []
  for (let i = 0; i < municipio.length; i++) {
    const novo = data.filter((content) => content.municipio == municipio[i])
    const { totalVotos, totalVotosSegundoTurno } = somarVotos(novo)
    const content = {
      municipio: municipio[i],
      votos: totalVotos,
      votosSegundo: totalVotosSegundoTurno
    }
    res.push(content)
  }
  return res
}
