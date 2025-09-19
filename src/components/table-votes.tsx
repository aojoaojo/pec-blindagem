import React, { useState, useEffect } from 'react';
import './TabelaVotosResponsiva.css'; // Criaremos este arquivo de CSS a seguir
import type { vote } from '../types';

// Definindo as props do componente
interface TabelaProps {
    dados: vote[];
}

const TabelaVotosResponsiva: React.FC<TabelaProps> = ({ dados }) => {
    // Estado para armazenar o valor da barra de pesquisa
    const [filtro, setFiltro] = useState<string>('');

    // Estado para armazenar os dados já filtrados que serão exibidos
    const [dadosFiltrados, setDadosFiltrados] = useState<vote[]>(dados);

    // useEffect é perfeito para reagir a mudanças no filtro ou nos dados originais
    useEffect(() => {
        // Transforma o termo de busca para minúsculas para uma busca case-insensitive
        const termoBusca = filtro.toLowerCase();

        const resultado = dados.filter(item =>
            item.deputado_federal.toLowerCase().includes(termoBusca) ||
            item.partido.toLowerCase().includes(termoBusca) ||
            item.estado.toLowerCase().includes(termoBusca) ||
            item.como_votou.toLowerCase().includes(termoBusca)
        );

        setDadosFiltrados(resultado);
    }, [filtro, dados]); // O hook executa sempre que 'filtro' ou 'dados' mudar

    // Função para aplicar uma classe CSS baseada no tipo de voto
    const getClassForVote = (voto: string) => {
        switch (voto) {
            case 'Sim': return 'voto-sim';
            case 'Não': return 'voto-nao';
            case 'Abstenção': return 'voto-abstencao';
            default: return 'voto-outro';
        }
    };

    return (
        <div className="tabela-container">
            <input
                type="text"
                className="barra-pesquisa"
                placeholder="Pesquisar por deputado, partido, estado, voto..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <table className="tabela-responsiva">
                <thead>
                    <tr>
                        <th>Deputado(a)</th>
                        <th>Partido</th>
                        <th>Estado</th>
                        <th>Como Votou</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosFiltrados.length > 0 ? (
                        dadosFiltrados.map((item) => (
                            <tr key={item.deputado_federal}>
                                <td data-label="Deputado(a)">{item.deputado_federal}</td>
                                <td data-label="Partido">{item.partido}</td>
                                <td data-label="Estado">{item.estado}</td>
                                <td data-label="Como Votou">
                                    <span className={`badge-voto ${getClassForVote(item.como_votou)}`}>
                                        {item.como_votou}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="sem-resultados">Nenhum resultado encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaVotosResponsiva;