import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table, Accordion } from "react-bootstrap";
import "chart.js/auto";
import LineChart from '@/components/chart/LineChart';
// Internationalization
import { useTranslation } from 'react-i18next';
import formatDate from '@/pipe/formatDate.jsx'
import truncateDecimal from '@/pipe/truncateDecimal';


const PointAdjustReport = ({ zwoAdjustmentPoints, regressionTrajectory, trajectoryData }) => {
    
    const { t } = useTranslation(['text']);
    const [activeKeys, setActiveKeys] = useState(['0']);

    const handleAccordionToggle = (eventKey) => {
        setActiveKeys(prevKeys => 
            prevKeys.includes(eventKey)
                ? prevKeys.filter(key => key !== eventKey)
                : [...prevKeys, eventKey]
        );
    };

    return (
        <div>
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            ZWO
                        </Accordion.Header>
                        <Accordion.Body>
                            <h2>{t('REPORT.POINT_ADJUST.ZWO.TITLE')}</h2>
                            
                            <Row>
                                <h4>{t('REPORT.POINT_ADJUST.ZWO.TABLE.TITLE')}</h4>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>{t('REPORT.POINT_ADJUST.ZWO.TABLE.HEADER.DATE')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.ZWO.TABLE.HEADER.HOUR')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.ZWO.TABLE.HEADER.Ar_Grados')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.ZWO.TABLE.HEADER.De_Grados')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {zwoAdjustmentPoints.map((p) => (
                                            <tr key={p.Fecha + p.X}>
                                                <td>{formatDate(p.Fecha)}</td>
                                                <td>{new Date(`1970-01-01T${p.Hora}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                                <td>{truncateDecimal(p.Ar_Grados)}</td>
                                                <td>{truncateDecimal(p.De_Grados)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            {t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TITLE')}
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>{t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TABLE.HEADER.DATE')}</th>
                                        <th>{t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TABLE.HEADER.HOUR')}</th>
                                        <th>{t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TABLE.HEADER.t')}</th>
                                        <th>{t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TABLE.HEADER.s')}</th>
                                        <th>{t('REPORT.POINT_ADJUST.REGRESSION_TRAJECTORY.TABLE.HEADER.v')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regressionTrajectory.map((point, index) => (
                                        <tr key={point.Fecha+point.t}>
                                            <td>{formatDate(point.Fecha)}</td>
                                            <td>{point.Hora}</td>
                                            <td>{truncateDecimal(point.t)}</td>
                                            <td>{truncateDecimal(point.s)}</td>
                                            <td>{truncateDecimal(point.v_Kms)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            {t('REPORT.POINT_ADJUST.TRAJECTORY.TITLE')}
                        </Accordion.Header>
                        <Accordion.Body>
                            <div style={{ overflowX: 'auto' }}>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.DATE')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.HOUR')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.S')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.T')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.V')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.LAMBDA')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.PHI')}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.RA', { id: '1' })}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.DE', { id: '1' })}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.RA', { id: '2' })}</th>
                                            <th>{t('REPORT.POINT_ADJUST.TRAJECTORY.TABLE.HEADER.DE', { id: '2' })}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trajectoryData.map((p) => (
                                            <tr key={p.Fecha+p.s}>
                                                <td>{formatDate(p.Fecha)}</td>
                                                <td>{p.Hora}</td>
                                                <td>{truncateDecimal(p.s)}</td>
                                                <td>{truncateDecimal(p.t)}</td>
                                                <td>{truncateDecimal(p.v)}</td>
                                                <td>{truncateDecimal(p.lambda)}</td>
                                                <td>{truncateDecimal(p.phi)}</td>
                                                <td>{truncateDecimal(p.AR_Estacion_1)}</td>
                                                <td>{truncateDecimal(p.De_Estacion_1)}</td>
                                                <td>{truncateDecimal(p.Ar_Estacion_2)}</td>
                                                <td>{truncateDecimal(p.De_Estacion_2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </div>
    );
};

export default PointAdjustReport;