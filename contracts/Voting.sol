// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Voting {
    using Counters for Counters.Counter;
    enum EmailResponse {
        NOTAVAILABLE,
        AVAILABLE,
        VOTED 
    }

    mapping(string => EmailResponse) private emails;
    mapping(string => uint256) private candidates;

    function addCandidate(
        string memory candidateId
    ) public {
        candidates[candidateId] = 0;
    }

    function addEmails(
        string[] memory _emails,
        uint256 emailCount
    ) public {
        for(uint256 i = 0; i < emailCount; i++) {
            emails[_emails[i]] = EmailResponse.AVAILABLE;
        }
    }

    function voteCandidate(
        string memory email,
        string memory candidateId
    ) public {
        require(emails[email] != EmailResponse.NOTAVAILABLE, 'email should be valid to vote');
        require(emails[email] != EmailResponse. VOTED, 'email is already used to vote');
        emails[email] = EmailResponse.VOTED;
        candidates[candidateId] = candidates[candidateId] + 1;
    }

    function getResult(
        string memory candidateId
    ) public view returns(uint256) {
        return candidates[candidateId];
    }
}
