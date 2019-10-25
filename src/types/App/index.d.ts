declare namespace State {
  export interface Script {
    codeHash: string
    args: string
    hashType: string
  }

  export interface Data {
    data: string
  }

  export interface NodeVersion {
    version: string
  }

  export interface ToastMessage {
    message: string
    duration?: number
    id: number
  }

  export interface Modal {
    ui: React.ComponentType
    maskTop: number
    maskColor: string
  }

  export interface AppError {
    type: 'Network' | 'ChainAlert' | 'Maintain'
    message: string[]
  }

  interface Cell {
    id: number
    addressHash: string
    capacity: string
    fromCellbase: boolean
    generatedTxHash: string
    targetBlockNumber: number
    baseReward: string
    secondaryReward: string
    commitReward: string
    proposalReward: string
    consumedTxHash: string
    status: 'live' | 'dead'
    isGenesisOutput: boolean
    cellType: 'normal' | 'dao'
    startedBlockNumber: number
    endedBlockNumber: number
    subsidy: number
    daoTypeHash: string
  }

  export interface Address {
    addressHash: string
    lockHash: string
    balance: string
    transactionsCount: number
    lockScript: Script
    pendingRewardBlocksCount: number
    type: 'Address' | 'LockHash' | ''
  }

  export interface Block {
    blockHash: string
    number: number
    transactionsCount: number
    proposalsCount: number
    unclesCount: number
    uncleBlockHashes: string[]
    reward: string
    rewardStatus: 'pending' | 'issued'
    totalTransactionFee: string
    receivedTxFee: string
    receivedTxFeeStatus: 'pending' | 'calculated'
    totalCellCapacity: string
    minerHash: string
    timestamp: number
    difficulty: string
    epoch: number
    length: string
    startNumber: number
    version: number
    nonce: string
    transactionsRoot: string
  }

  export interface Transaction {
    transactionHash: string
    blockNumber: number
    blockTimestamp: number
    transactionFee: string
    income: string
    isCellbase: boolean
    targetBlockNumber: number
    version: number
    displayInputs: Cell[]
    displayOutputs: Cell[]
  }

  export interface BlockchainInfo {
    blockchain_info: {
      isInitialBlockDownload: boolean
      epoch: string
      difficulty: string
      medianTime: string
      chain: string
      alerts: {
        id: string
        message: string
        noticeNntil: string
        priority: string
      }[]
    }
  }

  export interface NervosDao {
    totalDeposit: number
    subsidyGranted: number
    depositTransactionsCount: number
    withdrawTransactionsCount: number
    depositorsCount: number
    totalDepositorsCount: number
    daoTypeHash: string
  }

  export interface NervosDaoDepositor {
    addressHash: string
    daoDeposit: number
  }

  export interface NervosDaoState {
    nervosDao: NervosDao
    transactions: Transaction[]
    total: number
    depositors: NervosDaoDepositor[]
  }

  export interface Statistics {
    tipBlockNumber: string
    currentEpochAverageBlockTime: string
    currentEpochDifficulty: string
    hashRate: string
  }

  export interface StatisticsChart {
    hashRate: {
      blockNumber: number
      hashRate: string
    }[]
    difficulty: {
      blockNumber: number
      difficulty: string
      epochNumber: number
    }[]
    uncleRate: {
      uncleRate: number
      epochNumber: number
    }[]
  }

  export interface StatisticsBaseData {
    blockNumber: number
    type: 'Difficulty' | 'HashRate' | 'EpochNumber'
    difficulty?: number
    hashRate?: number
    epochNumber?: number
  }

  export interface StatisticsUncleRate {
    uncleRate: number
    epochNumber: number
  }

  export interface Components {
    // mobile header search state
    searchBarEditable: boolean
  }

  export interface FetchStatus {
    OK: string
    Error: string
    None: string
  }

  export interface App {
    toast: State.ToastMessage | null
    loading: boolean
    secondLoading: boolean
    modal: State.Modal | null
    appErrors: [
      { type: 'Network'; message: string[] },
      { type: 'ChainAlert'; message: string[] },
      { type: 'Maintain'; message: string[] },
    ]
    nodeVersion: string
    tipBlockNumber: number

    appWidth: number
    appHeight: number
    language: 'en' | 'zh'
    chainType: 'main' | 'ckb_test'
  }

  export interface AddressState {
    address: Address
    transactions: Transaction[]
    total: number
    addressStatus: keyof FetchStatus
    transactionsStatus: keyof FetchStatus
  }

  export interface BlockState {
    block: Block
    transactions: Transaction[]
    total: number
    status: keyof FetchStatus
  }

  export interface BlockListState {
    blocks: Block[]
    total: number
  }

  export interface TransactionState {
    transaction: Transaction
    status: keyof FetchStatus
  }

  export interface AppState {
    app: App

    addressState: AddressState
    blockState: BlockState
    homeBlocks: Block[]
    blockListState: BlockListState
    transactionState: TransactionState
    statistics: Statistics
    statisticsChartData: StatisticsBaseData[]
    statisticsUncleRates: StatisticsUncleRateChart[]
    nervosDaoState: nervosDaoState

    components: Components
  }
}

declare namespace CustomRouter {
  interface Route {
    name: string
    path: string
    params?: string
    exact?: boolean
    comp: React.FunctionComponent<any>
  }
}
