// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Voting {
    using Counters for Counters.Counter;
    Counters.Counter private historyCount;
    Counters.Counter private candidateCount;
    // Counters.Counter private historyCount;

    enum EmailResponse {
        NOTAVAILABLE,
        AVAILABLE,
        VOTED 
    }

    mapping(string => EmailResponse) private emails;
    mapping(uint256 => uint256) private candidates;

    struct ElectionHistory {
        uint256 _date;
        mapping(uint256 => uint256) _candidates;
    }
    mapping(uint256 => ElectionHistory) private history;
    mapping(uint256 => uint256) private historyCandidateCount;

    function addCandidate(
        // string memory candidateId
    ) public {
        uint256 newCandidateCount = candidateCount.current();
        candidateCount.increment();
        candidates[newCandidateCount] = 0;
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
        uint256 candidateId
    ) public {
        require(emails[email] != EmailResponse.NOTAVAILABLE, 'email should be valid to vote');
        require(emails[email] != EmailResponse. VOTED, 'email is already used to vote');
        emails[email] = EmailResponse.VOTED;
        candidates[candidateId] = candidates[candidateId] + 1;
        // candidates[candidateId] = 100;
    }

    function getResult(
        uint256 candidateId
    ) public view returns(uint256) {
        return candidates[candidateId];
    }

    function closeElection() public {
        uint256 newHistoryCount = historyCount.current();

        historyCount.increment();
        // console.log(candidateCount.current());

        ElectionHistory storage newElectionHistory = history[newHistoryCount];
        newElectionHistory._date = block.timestamp;
        for(uint256 i = 0; i < candidateCount.current(); i++) {
            history[newHistoryCount]._candidates[i] = candidates[i];
        }

        for(uint256 i = 0; i < candidateCount.current(); i++) {
            candidates[i] = 0;
        }
        historyCandidateCount[newHistoryCount] = candidateCount.current();
        candidateCount.reset();
    }
    
    function getHistory(uint _historyCount) public view returns(uint256[] memory) {
        uint256[] memory dumCandidates = new uint256[](historyCandidateCount[_historyCount]);
        for(uint256 i = 0; i < historyCandidateCount[_historyCount]; i++) {
            dumCandidates[i] = history[_historyCount]._candidates[i];
        }

        return dumCandidates;
    }
}
