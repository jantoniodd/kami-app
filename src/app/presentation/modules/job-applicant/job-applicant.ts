export interface JobApplicant {

    candidateId: number;
    documento: {
        id: number,
        descripLarga: string;
    },
    numero: string;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    fcNacimiento: string;

}
