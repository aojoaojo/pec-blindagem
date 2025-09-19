import { type ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';
import type { TipoVoto, vote } from '../types';

interface GraficoProps {
    dados: vote[];
    isMobile: boolean;
}

type VotosAgrupados = {
    [partido: string]: Record<TipoVoto, number>;
};

const GraficoVotosPorPartido: React.FC<GraficoProps> = ({ dados, isMobile }) => {
    const votosPorPartido = dados.reduce<VotosAgrupados>((acc, item) => {
        const { partido, como_votou } = item;

        if (!acc[partido]) {
            acc[partido] = { Sim: 0, "Não": 0, "Não votou": 0 };
        }

        acc[partido][como_votou as TipoVoto]++;
        return acc;
    }, {});

    const partidos = Object.keys(votosPorPartido);

    const series = [
        { name: 'Sim', data: partidos.map(p => votosPorPartido[p]['Sim']) },
        { name: 'Não', data: partidos.map(p => votosPorPartido[p]['Não']) },
        { name: 'Abstenção', data: partidos.map(p => votosPorPartido[p]['Não votou']) },
    ];

    const options: ApexOptions = {
        chart: { type: 'bar', stacked: true },
        plotOptions: { bar: { horizontal: true } },
        stroke: { width: 1, colors: ['#fff'] },
        title: { text: 'Como cada Partido Votou', align: 'center' },
        xaxis: { categories: partidos, title: { text: 'Número de Deputados' } },
        yaxis: { title: { text: 'Partidos' } },
        tooltip: { y: { formatter: (val) => `${val} votos` } },
        fill: { opacity: 1 },
        legend: { position: 'top', horizontalAlign: 'left', offsetX: 40 },
        colors: ['#00E396', '#FF4560', '#FEB019', '#775DD0'],
    };

    return (
        <div className="chart-container" style={{
            minWidth: isMobile ? '300px' : '500px'
        }}>
            <Chart options={options} series={series} type="bar" height={450} />
        </div >
    );
};

export default GraficoVotosPorPartido;