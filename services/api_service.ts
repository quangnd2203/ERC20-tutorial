import express, { Application } from "express";
import cors from 'cors';
import router from '../routes/routes';
import { NetworkResponse, STATUS_CODE } from "../models/network_response";

const apiService: Application = express();

apiService.use(express.json());
apiService.use(express.urlencoded({ extended: true }));
apiService.use(cors());
apiService.options('*', cors());
apiService.use('/api', router);
apiService.use((req, res, next) => {
    next(NetworkResponse.fromErrors(STATUS_CODE.not_found, 'not_found'));
});

export default apiService;