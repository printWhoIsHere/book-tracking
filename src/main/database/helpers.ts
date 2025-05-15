import { RunResult } from 'better-sqlite3'
import { database } from '@main/database'

export async function dbGetOne<T>(
	query: string,
	params: any[] = [],
): Promise<T | null> {
	const db = await database.getInstance()
	const result = db.prepare(query).get(...params) as T | undefined
	return result ?? null
}

export async function dbGetAll<T>(
	query: string,
	params: any[] = [],
): Promise<T[]> {
	const db = await database.getInstance()
	return db.prepare(query).all(...params) as T[]
}

export async function dbRun(
	query: string,
	params: any[] = [],
): Promise<RunResult> {
	const db = await database.getInstance()
	return db.prepare(query).run(...params)
}

export async function dbRunMany(
	query: string,
	paramList: any[][],
): Promise<RunResult[]> {
	const db = await database.getInstance()
	const stmt = db.prepare(query)
	return paramList.map((params) => stmt.run(...params))
}
