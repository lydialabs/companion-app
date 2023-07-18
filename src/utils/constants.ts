import { Contract, ethers } from 'ethers'

import abi from './abi.json'

const CONTRACT_ADDRESS = '0xDA88AD923139e51671ab06f9Cf49f13C20e70345'
export const contractInterface = new ethers.utils.Interface(abi)
export const contract = new Contract(CONTRACT_ADDRESS, contractInterface)