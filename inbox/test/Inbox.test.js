const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

const INITIAL_STRING= 'Hi there!';

//const Inbox = new Inbox();

let accounts;
let inbox;
let message;
beforeEach(async () => {
    // Get a listof all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments : [INITIAL_STRING]})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox contract', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('contains a message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('changed the message' ,async () => {
        await inbox.methods.setMessage('Bye There!')
            .send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye There!');
    });
});





/* class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });

}); */