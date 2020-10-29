const contractMetadata = $.getJSON('./contractMetadata.json');
const contract = web3.eth.contract(contractMetadata.abi, contractMetadata.address);

const ethEnabled = () => {
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

async function createBill(){
    const billdesc = $('#newBillDesc').val();
    const billval = $('#newBillVal').val();

    contract.methods.CreateBill(billdesc, billval);
}

async function payBill(){
    const billid = $('billId').val();

    contract.methods.PayBill(billid);
}

