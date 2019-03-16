import * as CryptoJS from 'crypto-js';

class Block {
	// block 해쉬 계산
	public static calculateBlockHash = (
		index: number,
		previousHash: string,
		timestamp: number,
		data: string
	): string =>
		CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

	// block 구조 validate 체크
	public static validateStructure = (aBlock: Block): boolean =>
		typeof aBlock.index === 'number' &&
		typeof aBlock.hash === 'string' &&
		typeof aBlock.previousHash === 'string' &&
		typeof aBlock.timestamp === 'number' &&
		typeof aBlock.data === 'string';

	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestamp: number;

	constructor(
		index: number,
		hash: string,
		previousHash: string,
		data: string,
		timestamp: number
	) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}

// default block
const genesisBlock: Block = new Block(0, '2020202020', '', 'hello', 123456);

// block chain
const blockchain: Block[] = [ genesisBlock ];

// get block chain
const getBlockchain = (): Block[] => blockchain;

// get 최근 block
const getLatestBlock = (): Block => getBlockchain()[blockchain.length - 1];

// get 새로운 timestamp
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 100);

// set 새로운 block 생성
const createNewBlock = (data: string): Block => {
	const previousBlock: Block = getLatestBlock();
	const newIndex: number = previousBlock.index + 1;
	const newTimestamp: number = getNewTimeStamp();

	// 새 해쉬 생성
	const newHash: string = Block.calculateBlockHash(
		newIndex,
		previousBlock.hash,
		newTimestamp,
		data
	);

	// 새 블록 생성
	const newBlock: Block = new Block(
		newIndex,
		newHash,
		previousBlock.hash,
		data,
		newTimestamp
	);

	// 블럭체인에 push
	blockchain.push(newBlock);

	return newBlock;
};

// block validate 체크
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
	if (!Block.validateStructure(candidateBlock)) {
		return false;
	} else if (previousBlock.index + 1 !== candidateBlock.index) {
		return false;
	} else if (previousBlock.hash !== candidateBlock.previousHash) {
		return false;
	} else {
		return true;
	}
};

const preBlock = createNewBlock('hello');
const nowBlock = createNewBlock('yap yap');

console.log(isBlockValid(nowBlock, preBlock));
console.log(preBlock, nowBlock);

export {};
