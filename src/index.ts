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
	addBlock(newBlock);

	return newBlock;
};

// get block hash
const getHashForBlock = (aBlock: Block): string =>
	Block.calculateBlockHash(
		aBlock.index,
		aBlock.previousHash,
		aBlock.timestamp,
		aBlock.data
	);

// get block validate 체크
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean =>

		!Block.validateStructure(candidateBlock) ? false :
		previousBlock.index + 1 !== candidateBlock.index ? false :
		previousBlock.hash !== candidateBlock.previousHash ? false :
		getHashForBlock(candidateBlock) !== candidateBlock.hash ? false :
		true;

// set block add
const addBlock = (candidateBlock: Block): void => {
	if (isBlockValid(candidateBlock, getLatestBlock())) {
		blockchain.push(candidateBlock);
	}
};

// block 생성
createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blockchain);

export {};
