import * as dotenv from 'dotenv';
import apiService from './services/api_service';

dotenv.config();

apiService.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is up and running on port: ${process.env.SERVER_PORT}`);
});