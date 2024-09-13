export interface ICoinsResponse {
    data: ICoin[];
    timestamp: number;
}

export interface ICoinResponse {
    data: ICoin;
    timestamp: number;
}


export interface IGetCoinsParams {
    limit: number;
    offset: number;
}

export interface ICoin {
    
    id: string; //"bitcoin"
    rank: string; //"1"
    symbol: string; //"BTC"
    name: string; //"Bitcoin"
    supply: string; //"17193925.0000000000000000"
    maxSupply: string; //"21000000.0000000000000000"
    marketCapUsd: string; //"119179791817.6740161068269075"
    volumeUsd24Hr: string; //"2928356777.6066665425687196"
    priceUsd: string; //"6931.5058555666618359"
    changePercent24Hr: string; //"-0.8101417214350335"
    vwap24Hr: string; //"7175.0663247679233209"
}

export interface IGetCoinByIdQueryParams {
    id: string,
}