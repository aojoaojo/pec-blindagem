import React from 'react';
import Chart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts'; // Importando os tipos do ApexCharts
import type { vote } from '../types';

// Definindo a interface para as props do componente
interface GraficoProps {
    dados: vote[];
    isMobile?: boolean;
}

const GraficoResultadoGeral: React.FC<GraficoProps> = ({ dados, isMobile }) => {
    // Tipando o acumulador do reduce para mais segurança
    const contagemVotos = dados.reduce((acc: { [key: string]: number }, voto) => {
        acc[voto.como_votou] = (acc[voto.como_votou] || 0) + 1;
        return acc;
    }, {});

    const series = Object.values(contagemVotos);
    const labels = Object.keys(contagemVotos);

    // Aplicando o tipo ApexOptions para ter autocompletar e verificação de tipos
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        title: {
            text: 'Distribuição Geral dos Votos',
            align: 'center',
        },
        colors: ['#00E396', '#FF4560', '#FEB019', '#775DD0'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: isMobile ? 400 : 400
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div className="chart-container">
            <Chart options={options} series={series} type="donut" width="500" />
        </div>
    );
};

export default GraficoResultadoGeral;