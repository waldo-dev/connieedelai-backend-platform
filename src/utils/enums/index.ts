enum rolEnum {
	Admin = 1,
	Supervisor = 2,
	Auditor = 3,
	Cliente = 4,
}

enum jwtEnum {
	reset_token = "reset_token",
}

enum statusEnum {
	EN_ESPERA = 1,
	APROBADO = 2,
	RECHAZADO = 3,
	PROCESO = 4,
}

export { rolEnum, statusEnum, jwtEnum };
