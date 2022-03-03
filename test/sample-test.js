let voting

describe("Voting", function () {
  it("Should create and execute voting functionality", async function () {
    const Voting = await ethers.getContractFactory("Voting")
    voting = await Voting.deploy()
    await voting.deployed()

    // add emails
    await voting.addEmails(
      [
        '19ce001@charusat.edu.in',
        '19ce002@charusat.edu.in',
      ],
      2
    )

    // add candidates
    await voting.addCandidate('101');
    await voting.addCandidate('102');
    await voting.addCandidate('103');

    // vote candidate
    await voting.voteCandidate('19ce001@charusat.edu.in', '101');
    await voting.voteCandidate('19ce002@charusat.edu.in', '102');

    // get results
    const result = await voting.getResult('101')
    console.log(result);
    
  })
})
