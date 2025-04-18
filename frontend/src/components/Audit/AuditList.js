import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box
} from '@mui/material';
import axios from 'axios';

const AuditList = () => {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        const fetchAudits = async () => {
            try {
                const response = await axios.get('/api/audit');
                setAudits(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des audits:', error);
            }
        };

        fetchAudits();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Journal d'Audit
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Utilisateur</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Détails</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {audits.map((audit) => (
                            <TableRow key={audit.id}>
                                <TableCell>{new Date(audit.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{audit.username}</TableCell>
                                <TableCell>{audit.action}</TableCell>
                                <TableCell>{audit.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AuditList;
