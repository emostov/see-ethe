
    {
      entities: {
        blocks: {
          "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46": {  // Use hash as id
            number: 3,
            hash: "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
            parentHash: "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
            nonce: "0xfb6e1a62d119228b",
            sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
            logsBloom: "0x00000000000000000",
            transactionsRoot: "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
            stateRoot: "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
            miner: "0x8888f1f195afa192cfee860698584c030f4c9db1",
            difficulty: '21345678965432',
            totalDifficulty: '324567845321',
            size: 616,
            extraData: "0x",
            gasLimit: 3141592,
            gasUsed: 21662,
            timestamp: 1429287689,
            transactionCount: 1,
            internalTransactionCount: 22,
            staticBlockReward: 2.0, // ether
            transactionFees: 0.14,
            uncleInclusionRewards: 0.01,
            uncles: [],
            isUncle: false 
          }
          blockHashes: [0x4,0x6,0x7,0x8,0x9,0x10,0x11] // maintaining order
        },
        users: {
          11: {
            id: 11,
            username: "f_plus_one",
            account: "0xef85f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b89"
            totalBalance: 21.1,
            lastLogin: "2020-2-24-14-32-00      
          }
        },
        accounts: {
          0xef85f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b89: {
            type: "miner" // "externalUser", "contract", "token"
            tags: [], // "exchange", "miner
            profileImg: "defaultImg5",
            addressQR: "generatedQRurl",
            balance: 10.24 // ether value
            transactions: [0x7, 0x10],
            etherBalance: 29.2,
            ethHighestBalance: 30,
            ethLowestBalance: 2,
            usdHighestBalance: 1000,
            usdLowestBalance: 12,

            // dependent on holding
            tokens: ["tether", "dai"],
            internalTransactions: [0x3a],
            ERC20TokenTransactions: [0x4f],

            // miner only,
            minedBlocks: [0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46],

            // contract & token only non-null attributes
            contractHash: "0x2147f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34c96",

            // ERC-20 token only
            dilutedMarketCap: 1,000,000,
            totalSupply: 100,
            tokenName: "ultimateAltCoin",
            transfers: [0xef95f2]
            holder: 1,824
            decimals: 7
            officialSite: "",
            socialProfiles: {}, // make its own entity?
            price: // in ether
          }
        },
        contracts: {
          0x2147f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34c96: {
            hash: "0x2147f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34c96",
            name: ""
            compilerVersion: "",
            sourceCode: "",
            ABI: "",
            bytecode: "",
            opCode: "",
            readFunctions: [],
            writeFunctions: [],
            umlLink: ""
          }
        },
        events: {
          0xef47f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34a92: {
            transactionHash: "0xef47f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34a92",
            contractHash: "0x2147f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34c96",
            method: "",
            eventLog: ""
          },
        },
        transactions: {
          0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b: { 
            status: "pending",   
            hash: "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
            nonce: 2,
            blockHash: "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
            blockNumber: 3,
            transactionIndex: 0,
            from: "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
            to: "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
            value: '123450000000000000',
            gas: 314159, // gas provided by the sender
            gasPrice: '2000000000000',
            gasUsed: 300000, // check if this should be null on pending
            input: "0x57cb2fc4",
            transactionFee: 0.01,
          }
        },
        txPrivateNotes: {
          1: {
            authorId: 2,
            body: "Check in on this next week",
            notableId: 0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b
            notableType: 'transaction' // address, transaction
          }
        }
        comments: {
          1: {
            authorId: 2,
            body: "What entity controlls this address? Looks super active"
            commentableId: 0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b
            commentableType: 'transaction'
          }
        },
        likes: {
          1: {
            userId: 2,
            account: 0xef85f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b89
          }
        }, 
        addressNameTags: {
          1: {
            userId: 2,
            account: 0xef85f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b89
            name: "Mine Pool Faker",
            link: ''
          }
        }
        privateAddressWatchList: {
          2 :{
            userId: 2,
            addresses: '0xef85f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b89',
            description: 'remeber to check for coin dumps',
            nameTag: 'Dorsey's Pool',
            emailSetting: 'IN_AND_OUT_TX_NOTIFICATION',
            createdAt: 9-10-2019 // for keeping list order
          }
        }
      },
      ui: {
        loading: true/false
      },
      errors: {
        login: ["Incorrect username/password combination"],
      },
      session: { currentUserId: 2},
      general: {
        networkMetrics: {
          etherPrice: 100,
          marketCap: 999,
          difficulty: 589475878451, // maybe just use most recent block
        }
      },
    } 

