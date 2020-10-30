let contract;
const contractMetadata = $.getJSON('./javascript/contractMetadata.json', function(result) {
contract = new web3.eth.Contract(result.abi, result.address);
renderBills();
});

const ethEnabled = async () => {
    if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3.eth.handleRevert = true;
        return true;
    }
    return false;
}

if (!ethEnabled()) {
    alert("Metamask or browser with Ethereum not detected. Consider installing Metamask!");
}
else{
    window.web3.eth.getAccounts().then(function (accounts) {
        if (accounts.length > 0) {
            window.web3.eth.defaultAccount = accounts[0];
            console.log("Current account: " + window.web3.eth.defaultAccount);
        }
        else {
            console.log("No account available.");
        }
    });
}

async function createBill(){
    console.log('Creating bill');
    const billdesc = $('#newBillDesc').val();
    const billval = $('#newBillVal').val();
    await contract.methods.CreateBill(billdesc, billval).send({from: window.web3.eth.defaultAccount});
    window.location.reload();
}

async function payBill(){
    const billid = $('#billId').val();
    console.log(billid);
    await contract.methods.PayBill(billid).send({from: window.web3.eth.defaultAccount});
    window.location.reload();
}

async function renderBills(){
    const billCount = await contract.methods.getBillQty().call();
    for(var i = 0; i < billCount; i++){
        const bill = await contract.methods.bills(i).call();

        const billId = bill[0];
        const billDesc = bill[1];
        const billVal = bill[2];
        const billIsPaid = bill[3];

        // Create bill html
        const html = '<tr><th scope=\"row\">' + billId + '</th><td>' + billDesc + '</td><td>' + billVal +'</td><td>' + billIsPaid + '</td></tr>';
        if (billIsPaid) {
            $('#paidBillList').append(html);
          } else {
            $('#pendingBillList').append(html);
          }
    }
}

