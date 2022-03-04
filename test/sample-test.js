let voting

describe("Voting", function () {
  it("should add candidates", async function () {
    const Voting = await ethers.getContractFactory("Voting")
    voting = await Voting.deploy()
    await voting.addCandidate();
    await voting.addCandidate();
    await voting.addCandidate();
  })
  it("should add all emails", async function () {
    await voting.deployed()
    await voting.addEmails(
      [
        '19ce001@charusat.edu.in',
        '19ce002@charusat.edu.in',
      ],
      2
    )
  })
  it("should vote to candidates", async function () {
    await voting.voteCandidate('19ce001@charusat.edu.in', '0');
    await voting.voteCandidate('19ce002@charusat.edu.in', '0');
  })
  it("should get resuls of election", async function () {
    const result = await voting.getResult('0')
    console.log('result', result);
  })
  it("should close election", async function () {
    await voting.closeElection()
  })
  it("should get election history", async function () {
    const history = await voting.getHistory(0)
    console.log('history', history);
  })
})