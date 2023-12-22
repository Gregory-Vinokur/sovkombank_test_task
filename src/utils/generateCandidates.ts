import { ICandidate } from "@/interfaces/ICandidate";

export const generateCandidates = (): ICandidate[] => {
  const candidatesArray: ICandidate[] = [];

  for (let i = 1; i <= 100; i++) {
    const candidate: ICandidate = {
      name: `Призёр ${i}`
    };
    candidatesArray.push(candidate);
  }

  return candidatesArray;
}