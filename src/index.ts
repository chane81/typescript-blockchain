
// 함수 파라메터에 type 적용
// const sayHi = (name: string, age: number, gender: string): string => {
// 	return `Hello ${name}, you are ${age}, you are a ${gender}`;
// };

// console.log(sayHi("BM", 10, "male"));

// export {};




// 인터페이스 사용
// interface Human {
// 	name: string;
// 	age: number;
// 	gender: string;
// }

// const person = {
// 	name: 'lee',
// 	age: 7,
// 	gender: 'male'
// }

// const sayHi = (presonInfo: Human): string => {
// 	return `Hello ${presonInfo.name}, you are ${presonInfo.age}, you are a ${presonInfo.gender}`;
// };

// console.log(sayHi(person));

// export {};



// 클래스 사용
class Human {
	public name: string;
	public age: number;
	public gender: string;

	constructor(name: string, age: number, gender: string) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
}

const lee = new Human('lee', 5, 'male')

const sayHi = (presonInfo: Human): string => {
	return `Hello ${presonInfo.name}, you are ${presonInfo.age}, you are a ${presonInfo.gender}`;
};

console.log(sayHi(lee));

export {};