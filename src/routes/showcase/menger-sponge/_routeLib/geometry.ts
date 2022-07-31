import type { Position } from '@threlte/core';
const levelToDistanceMap: any = {
	'1': 1,
	'2': 3,
	'3': 9,
	'4': Math.pow(3, 3),
	'5': Math.pow(3, 4),
	'6': Math.pow(3, 5),
};
export function getMengerPositions(
	_level: number,
	origins: Position[] | any[],
	scaleFactor: number
): Position[] {
	if (_level === 0) {
		return origins;
	}
	let level: number = levelToDistanceMap[_level.toString()] * scaleFactor;
	let positions = [];
	for (let origin of origins) {
		let mPos = [
			// 		right
			{ x: origin.x + level, y: origin.y, z: origin.z + level },
			{ x: origin.x + level, y: origin.y, z: origin.z - level },

			{ x: origin.x + level, y: origin.y + level, z: origin.z },
			{ x: origin.x + level, y: origin.y + level, z: origin.z + level },
			{ x: origin.x + level, y: origin.y + level, z: origin.z - level },

			{ x: origin.x + level, y: origin.y - level, z: origin.z },
			{ x: origin.x + level, y: origin.y - level, z: origin.z - level },
			{ x: origin.x + level, y: origin.y - level, z: origin.z + level },
			// 		left
			{ x: origin.x - level, y: origin.y, z: origin.z + level },
			{ x: origin.x - level, y: origin.y, z: origin.z - level },

			{ x: origin.x - level, y: origin.y + level, z: origin.z },
			{ x: origin.x - level, y: origin.y + level, z: origin.z + level },
			{ x: origin.x - level, y: origin.y + level, z: origin.z - level },

			{ x: origin.x - level, y: origin.y - level, z: origin.z },
			{ x: origin.x - level, y: origin.y - level, z: origin.z - level },
			{ x: origin.x - level, y: origin.y - level, z: origin.z + level },
			// 		Center
			{ x: origin.x, y: origin.y - level, z: origin.z - level },
			{ x: origin.x, y: origin.y - level, z: origin.z + level },

			{ x: origin.x, y: origin.y + level, z: origin.z - level },
			{ x: origin.x, y: origin.y + level, z: origin.z + level }
		];
		positions.push(...mPos);
	}

	return getMengerPositions(_level - 1, positions, scaleFactor);
}
