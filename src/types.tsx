export interface vote {
    deputado_federal: string;
    partido: string;
    como_votou: string;
    estado: string;
}

export type TipoVoto = 'Sim' | 'Não' | 'Não votou';
