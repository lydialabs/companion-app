import { Contract, ethers } from 'ethers'

import abi from './abi.json'

const CONTRACT_ADDRESS = '0x028E7A08170134A01c69C16A77EFAd2DFef11D85'
export const contractInterface = new ethers.utils.Interface(abi)
export const contract = new Contract(CONTRACT_ADDRESS, contractInterface)