const SaveData = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id_server",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "topic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "unit",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "addData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "last_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "writer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id_server",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "topic",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "unit",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "NewData",
    "type": "event"
  }
]

export default SaveData