pragma solidity >=0.4.22 <0.7.0;

/**
 * @title AluguelTemporada
 * @dev Manages Aluguel logic
 */
contract AluguelTemporada 
{

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public 
    {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256)
    {
        return number;
    }
}