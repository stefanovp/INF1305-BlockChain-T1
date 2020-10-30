let contractMetadata;

const contractMetadata = $.getJSON('./javascript/contractMetadata.json', function(result) {
contract = new web3.eth.Contract(result.abi, result.address);
});

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
    console.log('Creating bill');
    const billdesc = $('#newBillDesc').val();
    const billval = $('#newBillVal').val();

    contract.methods.CreateBill(billdesc, billval).send();
}

async function payBill(){
    const billid = $('billId').val();

    contract.methods.PayBill(billid).send();
}

async function renderBills(){
    const billCount = contract.billQty();
    for(var i = 0; i < billCount; i++){
        const bill = contract.bills(i);

        const billId = bill[0].toNumber()
        const billDesc = task[1]
        const billVal = task[2]
        const billIsPaid = task[3]

        // Create bill html
        const $newBillTemplate = $billTemplate.clone()
        $newBillTemplate.find('.billDesc').html(taskContent)
        $newBillTemplate.find('.billVal').html(taskContent)
        $newBillTemplate.find('.billStatus').html(taskContent)

        if (billIsPaid) {
            $('#paidBillList').append($newBillTemplate)
          } else {
            $('#pendingBillList').append($newTaskTemplate)
          }

        $newBillTemplate.show()
    }
}

