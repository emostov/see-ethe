# README

More coming soon! See below for a glimpse...

See-The-Ethe, an Etherscan clone, is a blockchain explorer that provides rich data feeds, and analytics about accounts, miners, contracts and their transactions. A user can label, comment, and track accounts. Stretch features include allowing users to curate contracts, dapps, and dexas that they can prove ownership of and also allow direct interaction with read and write functions of smart contracts.

# See-The-Ethe Design Documents

* [MVP list](https://github.com/emostov/see-ethe/wiki/MVPs)
* [Schema](https://github.com/emostov/see-ethe/wiki/Schema)
* [Sample State](https://github.com/emostov/see-ethe/wiki/Sample-State)
* [Frontend routes and components](https://github.com/emostov/see-ethe/wiki/Frontend-routes-and-components)
* [Backend routes](https://github.com/emostov/see-ethe/wiki/Backend-routes)


Flow for fetches
fetch blocks+associated transactions -> fetch associated transaction reciept for each transaction -> combine reciept and tx objects -> every re-render calculate block reward bc we are waiting for tx reciepts to come in -> after 100 seconds of block age just save reward as an attribute of the block to save calculations
