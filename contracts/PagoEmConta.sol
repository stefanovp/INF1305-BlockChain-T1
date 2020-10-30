pragma solidity >=0.4.22 <0.7.0;

contract PagoEmConta 
{
    struct Bill 
    {
        uint id;
        string description;
        uint value;
        bool isPaid;
    }

    uint billQty = 0;
    mapping(uint => Bill) public bills;
    
    constructor() public 
    {
        CreateBill("Boleto Puc Novembro", 4100);
        CreateBill("Light Novembro", 550);
        CreateBill("IPTU 2020", 360);
    }

    function CreateBill(string memory _desc, uint _value) public 
    {
        bills[billQty] = Bill(billQty, _desc, _value, false);
        billQty++;
    }

    function PayBill(uint _contaId) public
    {
        if(!bills[_contaId].isPaid)
            bills[_contaId].isPaid = true;
        else
            return;
    }

    function getBillQty() public
    {
        return billQty;
    }
}