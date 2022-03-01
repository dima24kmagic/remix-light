import { init, sendTx, web3Instance } from './chain';
import deployContract from './deployContract';

(async () => {
  await init();
  const web3 = web3Instance();

  const [acc1] = await web3.eth.getAccounts();

  const contractAddr = await deployContract(acc1,
    // eslint-disable-next-line max-len
    '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220404e37f487a89a932dca5e77faaf6ca2de3b991f93d230604b1b8daaef64766264736f6c63430008070033'
  );

  const abi = [
    {
      'inputs': [
        {
          'internalType': 'uint256',
          'name': 'num',
          'type': 'uint256'
        }
      ],
      'name': 'store',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'inputs': [],
      'name': 'retrieve',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': '',
          'type': 'uint256'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    }
  ];

  await sendTx({
    from: acc1,
    to: contractAddr,
    data: web3.eth.abi.encodeFunctionCall(abi[0] as any, ['22'])
  });

  console.log(web3.eth.abi.decodeParameter('uint256', await web3.eth.call({
    from: acc1,
    to: contractAddr,
    data: web3.eth.abi.encodeEventSignature(abi[1] as any)
  })));

  // setInterval(() => 1, 10000);
})();