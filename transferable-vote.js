
/*
	Alternate voting algorithm
	https://www.electoral-reform.org.uk/voting-systems/types-of-voting-system/alternative-vote/
*/

const options = ['o1','o2','o3','o4','o5','o6', 'o7']
const votes = [
	['o1','o2','o5'],
  ['o1','o3','o4'],
	['o1'],
	['o1'],
	['o2','o5','o1'],
	['o2','o1'],
	['o2','o5','oo', 'o4'],
	['o3','o5'],
	['o4','o5'],
	['o5'],
	['o5'],
	['o6','o5']
]
const seats = 6


const countVotes = ({ votes, options, seats }) => {
  const count =  votes
    .map((vote) => vote.filter((option) => options.includes(option)))
    .reduce((acc, vote) => {
      acc[vote[0]] = (acc[vote[0]] || 0) + 1
      return acc
    }, {})

  return levelCount({
    votes: votes.map((vote) => vote.filter((option) => options.includes(option))),
    count,
    seats
  })
}

const levelCount = ({ votes, count, seats }) => {
    const maxVotes =votes.length / seats
    for (const option in count) {
      const diff = count[option] - maxVotes
      console.log(option, count[option] , maxVotes, diff)
      if (diff > 1) {
        count[option] = maxVotes
        for (const options in votes) {
            if ((options[0] === option) && options.length > 1) {
            count[options[1]] = Math.floor(diff + count[options[1]] || 0)
            return levelCount({ votes, count, seats })
          }
        }
      }
    }
    return count
}



while (true) {
  const count = countVotes({ votes, options, seats })
	options.sort((first, second) => (count[second] || 0) - (count[first] || 0))
	options.pop()

	if (options.length === seats) break
}

console.log({ options })