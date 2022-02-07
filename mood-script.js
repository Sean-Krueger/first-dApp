window.ethereum.enable();
        var provider = new ethers.providers.Web3Provider(
          web3.currentProvider,
          "ropsten"
        );
        var MoodContractAddress="0xC176b05D410596E1a24F9D0c16a4295eeb5bE444";
        var MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
        var MoodContract;
        var signer;
        provider.listAccounts().then(function(accounts) {
          signer = provider.getSigner(accounts[0]);
          MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
          );
        });
        async function getMood(){
          getMoodPromise = MoodContract.getMood();
          var Mood = await getMoodPromise;
          console.log(Mood);
          document.getElementById("moodChange").innerHTML = Mood;
        }
        async function setMood(){
          let mood = document.getElementById("mood").value;
          setMoodPromise = MoodContract.setMood(mood);
          await setMoodPromise;
        }