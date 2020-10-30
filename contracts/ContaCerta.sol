pragma solidity >=0.4.22 <0.7.0;

contract ContaCerta 
{
    struct Bill 
    {
        uint id;
        string description;
        uint value;
        bool isPaid;
        address payer;
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
        require(bytes(_desc).length > 0, "Description cant be empty.");
        require(_value > 0, "Value must be greater than zero.");
        
        bills[billQty] = Bill(billQty, _desc, _value, false, address(0));
        billQty++;
    }

    function PayBill(uint _contaId) public
    {
        require(!bills[_contaId].isPaid, "Bill already payed by someone.");
        
        bills[_contaId].isPaid = true;
        bills[_contaId].payer = msg.sender;
        
    }

    function getBillQty() public view returns (uint)
    {
        return billQty;
    }
}