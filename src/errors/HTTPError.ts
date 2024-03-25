export class HTTPError extends Error {
	constructor(
		public message: string,
		public readonly statusCode: number = 400,
		public additionalInfo?: { [key: string]: any }
	) {
		super(message)
	}
}
