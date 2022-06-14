import { writable, derived, type Readable, type Writable } from "svelte/store";
import type { RequestStatus } from "$lib/ts-models/general";

// Contains the status of all models
export const statusOfModels: Writable<any> = writable({}); // { uniqueName: "LOADING" | "ERROR" | "SUCCESS" }

// Returns a boolean if any model has a status of loading
export const modelsLoading: Readable<boolean> = derived(statusOfModels, statusObj => {
	return Object.values(statusObj).includes("LOADING");
})

// Updates a model's status based on its unique name
export const updateModelStatus = (name: string, status: RequestStatus) => {
	statusOfModels.update(current => {
		return {
			...current,
			[name]: status,
		}
	})
}

export const controlStatus: Writable<"Locked"|"Available"> = writable("Locked")
export const firstPerson: Writable<boolean> = writable(false)