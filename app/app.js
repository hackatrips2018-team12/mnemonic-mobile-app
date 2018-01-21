// Hardcoded constants:
const contractAddress = "0x1012b627b910e13739b466be1313afa954b77101";
const otaAddress = "0xbcDda8a84852dC328f90c4E881B3AC30D6a7AC51";
const blockChainNodeUrl = "https://ropsten.infura.io";
const ipfsHost = "ipfs.infura.io";
const ipfsPort = 5001;

// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract'
import mnemonicABI from '../contracts/MnemonicVault.json';

var mnemonicContract = web3.eth.contract(mnemonicABI.abi);
var mnemonic = mnemonicContract.at(contractAddress);

const ipfsAPI = require('ipfs-api');
const ethUtil = require('ethereumjs-util');
const ipfs = ipfsAPI({
    host: ipfsHost,
    port: ipfsPort,
    protocol: 'http'
})


window.App = {
    start: function() {
        var self = this;
        $(document).ready(function() {
            getDocuments();
        });
    }
};

function getDocuments() {

    var result = mnemonic.getTotalDocuments(function(error, result) {
        if (!error)
            console.log("documents found in our vault: " + result);
        else
            console.error(error);
    });
    console.log(result);

    var totalDocuments = 5;

    console.log("Own documents found in blockchain smart contract: " + totalDocuments);


    for (var i = totalDocuments; i > 0; i--) {
        var documentCode = mnemonic.getDocument(i, function(error, result) {
            if (!error)
                console.log("document found in our vault: " + result);
            else
                console.error(error);
        });
    }
}

window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("Using blockchain node: " + blockChainNodeUrl);
        window.web3 = new Web3(new Web3.providers.HttpProvider(blockChainNodeUrl));
    }

    App.start();
});