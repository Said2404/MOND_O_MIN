class ForfaitLivError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForfaitLivError";
    }
}

class ClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ClientError";
    }
}   

class FactureError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FactureError";
    }
}

class ProduitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ProduitError";
    }
}

class ProduitByFactureError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ProduitByFactureError";
    }
}

export { ForfaitLivError, ClientError, FactureError, ProduitError, ProduitByFactureError };