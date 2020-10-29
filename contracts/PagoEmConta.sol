pragma solidity >=0.4.22 <0.7.0;

contract PagoEmConta 
{
    struct Conta 
    {
        uint id,
        string description,
        uint value,
        bool isPaid
    }

    uint contasQty = 0;
    mapping(uint => Conta) public contas;
    
    function AddConta(string memory _desc, uint memory _value) public 
    {
        contas[contasQty] = Conta(contasQty, _desc, _value);
        contasQty++;
    }

    function PagarConta(uint _contaId) public
    {
        if(!contas[_contaId].isPaid)
            contas[_contaId].isPaid = true;
    }
}