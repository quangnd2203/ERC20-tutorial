import { NetworkResponse, STATUS_CODE } from '../models/network_response';
import SmartContractRepo from '../repositories/smart_contract';

async function withdraw(request): Promise<NetworkResponse> {
    try {
        const body = request.body;
        if (!body.address || !body.amount) {
            throw Error('address_and_amount_is_required');
        }
        const data = await SmartContractRepo.instance().withdraw(body.address, body.amount);
        return NetworkResponse.success({
            'transaction_id': data,
        }, 'withdraw_success');
    } catch (e) {
        console.error(e);
        return NetworkResponse.fromErrors(STATUS_CODE.bad_request, e.message || 'withdraw_fail');
    }
}

export { withdraw }