import { Contract, ethers } from 'ethers'

import abi from './abi.json'

const CONTRACT_ADDRESS = '0x710535b48B6C8bf9F35b11B22b9Ac63B404D28DB'
export const contractInterface = new ethers.utils.Interface(abi)
export const contract = new Contract(CONTRACT_ADDRESS, contractInterface)