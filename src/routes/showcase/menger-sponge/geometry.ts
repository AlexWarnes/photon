import type {  Position } from "threlte";
const levelToDistanceMap: any = {
	"1": 1,
	"2": 3,
	"3": 3^3,
	"4": 3^4,
  "5": 3^5,
  "6": 3^6,
  "7": 3^7,
  "8": 3^8,
  // ... etc
}

export function getMengerPositions(_level: number, origin: Position | any){
	if (_level > 4) return [];
	let level: number = levelToDistanceMap[_level.toString()];
	return [
// 		right
		{x: origin.x + level, y: origin.y, z: origin.z + level},
		{x: origin.x + level, y: origin.y, z: origin.z - level},
		
		{x: origin.x + level, y: origin.y + level, z: origin.z},
		{x: origin.x + level, y: origin.y + level, z: origin.z + level},
		{x: origin.x + level, y: origin.y + level, z: origin.z - level},

		{x: origin.x + level, y: origin.y - level, z: origin.z},
		{x: origin.x + level, y: origin.y - level, z: origin.z - level},
		{x: origin.x + level, y: origin.y - level, z: origin.z + level},
// 		left
		{x: origin.x - level, y: origin.y, z: origin.z + level},
		{x: origin.x - level, y: origin.y, z: origin.z - level},
		
		{x: origin.x - level, y: origin.y + level, z: origin.z},
		{x: origin.x - level, y: origin.y + level, z: origin.z + level},
		{x: origin.x - level, y: origin.y + level, z: origin.z - level},

		{x: origin.x - level, y: origin.y - level, z: origin.z},
		{x: origin.x - level, y: origin.y - level, z: origin.z - level},
		{x: origin.x - level, y: origin.y - level, z: origin.z + level},
// 		Center
		{x: origin.x, y: origin.y - level, z: origin.z - level},
		{x: origin.x, y: origin.y - level, z: origin.z + level},
		
		{x: origin.x, y: origin.y + level, z: origin.z - level},
		{x: origin.x, y: origin.y + level, z: origin.z + level},

	];
}