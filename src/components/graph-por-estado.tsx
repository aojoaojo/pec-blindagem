import React from 'react';
import Chart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import type { TipoVoto, vote } from '../types';

interface GraficoProps {
    dados: vote[];
    isMobile?: boolean;
}

type VotosAgrupados = {
    [estado: string]: Record<TipoVoto, number>;
};

const GraficoVotosPorEstado: React.FC<GraficoProps> = ({ dados, isMobile }) => {
    const votosPorEstado = dados.reduce<VotosAgrupados>((acc, item) => {
        const { estado, como_votou } = item;
        if (!acc[estado]) {
            acc[estado] = { 'Sim': 0, 'Não': 0, 'Não votou': 0 };
        }
        acc[estado][como_votou as TipoVoto]++;
        return acc;
    }, {});

    const estados = Object.keys(votosPorEstado);

    const series = [
        { name: 'Sim', data: estados.map(e => votosPorEstado[e]['Sim']) },
        { name: 'Não', data: estados.map(e => votosPorEstado[e]['Não']) },
        { name: 'Outros', data: estados.map(e => votosPorEstado[e]['Não votou']) },
    ];

    const options: ApexOptions = {
        chart: { type: 'bar' },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 0 } },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        title: { text: 'Votação por Estado', align: 'center' },
        xaxis: { categories: estados },
        yaxis: { title: { text: 'Número de Votos' } },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: (val) => `${val} votos` } },
        colors: ['#00E396', '#FF4560', '#FEB019'],
    };

    return (
        <div className="chart-container" style={{ minWidth: isMobile ? '100%' : '1000px' }}>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default GraficoVotosPorEstado;