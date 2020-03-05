# MVP List

SeeEthe, an Etherscan clone, is a blockchain explorer that provides rich data
feeds, and analytics about accounts, miners, contracts and their transactions. A
user can label, comment, and track accounts. Stretch features include allowing
users to curate contracts, dapps, and dexas that they can prove ownership of and
also allow direct interaction with read and write functions of smart contracts.

#### 1. User Auth (3 days)

* User can sign up, sign in, and log out from nav bar
* User can use a demo login for a curated site experience
* Users can not use certain features when logged out
* User can update account attributes from settings Page
* Backend setup for tracking comments, private notes, and watched accounts

#### 2. Home Page (4 days)

* Network health overview including transaction history graph 
* Latest blocks feed
* Latest transaction feed
* See appendix A for more details

#### 3. Account Show Page (3 days)

* Overview including total balance
* Logged in user can add/update/drop name tag
* Logged in user can add/drop to watch list
* Logged in user can add/edit a private note
* Latest transactions feed
* Internal transactions feed
* Analytics ether balance
* Comments
* Profile Image
* Optional:
  * QR code
  * Miner features
  * ERC-20 txns
  * ERC721 txns
  * Analytics graphs
  * Token Value with dropdown listing each token and value
* See appendix D for more details on account page
* See Appendix E for CRUD features

#### 4. Transaction Show Page (2 days)

* Logged in user can add/update/drop name tag
* Logged in user can add/drop to watch list
* Logged in user can add/edit a private note
* Comments
* Overview
* Internal transaction (contracts)
* Event Logs
* State Changes
* See appendix C for more details

#### 5. Block Show Page (1 day)

* Overview
* Comments
* Optional:
    * Click through to transaction feed and internal transactions feed
* See appendix B for more details

#### 6. Hosting On Heroku (1 day)

#### 7. Production README (0.5 day)

#### 8. Search Bar (0.5 Day)

* Goes directly to relevant page or says not found

## Appendix

#### Appendix A "Home Page Details"

* Nav Bar (semi-functional)
* Search Bar  (non-functional)
* Network Metrics Status Bar
    - Ether Price
    - Market Cap
    - Latest Block
    - Difficulty
    - Ethereum Transaction History 14 Days (static-display)
* Latest Blocks Feed
    - Feed of individual block summary
* Latest Transactions Feed
    - Feed of individual transaction summary

#### Appendix B "Block Show Page Details"

* Overview
    - Block Height
        - Forward/Back buttons to go to higher/lower block
    - Timestamp
    - Transactions
        - Transaction count and internal transaction count
    - Mined by
        - Address link
        - Name if marked
        - Time
    - Block Reward
        - Total/ breakdown static reward / txn fees / uncle inclusion rewards
    - Uncles reward
        - award amount (uncle count at position)
    - Difficulty
    - Total Difficulty
    - Size
    - Gas Used
    - Gas Limit
    - Extra Data
    - Click to see more drop down
        - Hash
        - Parent Hash
        - Sha3uncles
        - Nonce

#### Appendix C "Transaction Show Page Details"

* Transaction Hash
* Status success/pending/fail
* Block Height
    - Links to block
    - Ribbon showing block confirmations
* Timestamp
* From
* To
* Value ether/usd
* Transaction Fee
* Click To See More Dropdown
    - Gas Limit
    - Gas Used By Transaction
    - Gas Price
    - Nonce / position
    - Input Data
* Privacy Note

#### Appendix D "Account Show Page"

* Header
    - Profile Picture
    - copy address to clipboard
    - click to view QR code
    - tags (i.e miner, dapp, etc)
* Overview
    - Balance
    - Ether Value
    - Token (only for token holders)
         - Drop down with holdings of each token
* Main (tabs)
    - Transactions
        - List of Transactions with IN/OUT tag
    - Internal Transactions
        - List Internal Transactions
    - Erc20 Token Txns
        - List Transactions Including token type
    - Analytics
        - Ether Balance
            - ETH Highest Balance
            - ETH Lowest Balance
            - USD Highest Value
            - USD Lowest Value
            - Ether Balance Graph x/time y/USD value
        - Transactions
            - Transactions Graphs
        - Token Transfers
            - ERC20 Token Transfer Graph
    - Comments

_logged in only_
* More Info
    - My Name Tag 
    - Heart - add to address watch list
    - Option to login if not already

_contract only_
* Contract Overview
    - Balance
    - Value
    - Token
* Main

* More Info
* Main
  - Internal Txns
    - ERC20 Token TXNS
    - Contract (Verified) 
        - [Example Page](https://etherscan.io/address/0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828#code)
        - Verified Contract Source Code (including UML link)
        - Contract ABI (export feature)
        - Contract Creation Code Bytcode && OPCode View
        - Read Contract
            - Read functions with input fields for args, query button to execute
        - Write Contract
            - Requires connection to Web3 so can pay gas
            - Write functions with input fields for args, query button to execute
        - Events

_miner only features_

* Main
    - Mined Blocks
        - List of block summary with bar % of gas used
    - Mined Uncles
        - List of block summary with count gas used
  
_token only features_

* Price
    - Fully Diluted Market Cap
    - Total Supply
    - Holders
    - Transfers
    - Profile Summary (edit option for token creator)
        - Menu Bar
            - Add token to Web3 Wallet
            - Verified Checkmark
    - Contract address (link)
    - Decimals
    - Official Site
    - Social Profiles email/blog/twitter/whitepaper/coin market cap
* Main
    - Transfers
    - Holders
    - Info
        - Coin Market Cap Data Source
        - /Volume/Market Capitalization/ Circulating Supply
    - Exchange
    - DEX Trades
    - Read Contract
    - Write Contract
    - Analytics

#### Appendix E "CRUD Features"

All below features can be implemented with all CRUD routes

* Address Watch List
  * Notification Options
    * Disable Email Notifications
    * Notify on Incoming & Outgoing Txns
    * Notify on Incoming (Receive) Txns only
    * Notify on Outgoing (Sent) Txns Only

* Txn Private Notes

* Address Name Tags
  * Name Tag
  * Private Note
  * Name tag displayed where address is normally displayed
