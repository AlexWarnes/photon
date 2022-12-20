// <script lang="ts">
// 	// import { status, time } from "./state";
// 	let interval: ReturnType<typeof setInterval>;
// 	let delta = 0;
// 	let startTime: number;
// 	function reset(){
// 		if (interval){
// 			clearInterval(interval);
// 			delta = 0;
// 		}
// 	}

// 	function pause(){
// 		if (interval){
// 			clearInterval(interval);
// 		}
// 	}

// 	function start(){
// 		startTime = Date.now();
// 		interval = setInterval(() => {
// 			delta = (Date.now() - startTime) / 1000
// 		}, 50)
// 	}
// 	$: if ($status === "IDLE") {
// 		reset();
// 	} else if ($status === "PLAYING") {
// 		start();
// 	} else if ($status === "DONE"){
// 		pause();
// 	}

// 	$:	$time = delta.toFixed(2);
// </script>
import { writable } from 'svelte/store';

function createStopwatch() {
	const { subscribe, set, update } = writable(0);
	let intervalID: ReturnType<typeof setInterval>;
	let interval: number = 50; // ms
	return {
		subscribe,
		start: () => {
			intervalID = setInterval(() => {
				update((t) => t + interval / 1000);
			}, interval);
		},
		pause: () => {
			if (intervalID) {
				clearInterval(intervalID);
			}
		},
		reset: () => {
			if (intervalID) {
				clearInterval(intervalID);
				set(0);
			}
		}
	};
}

export const stopwatch = () => createStopwatch();
