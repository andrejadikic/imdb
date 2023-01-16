const express = require('express');
const cors = require('cors');
const authRoutes = require( './routes/auth.routes');
require('dotenv').config();
const { sequelize} = require('./models');
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './auth/routes/auth.routes.js';
// dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/auth', authRoutes);

app.listen(2000, () => {
    console.log('Auth service running on port 3000');
})
