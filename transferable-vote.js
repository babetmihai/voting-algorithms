
/*
	Alternate voting algorithm
	https://www.electoral-reform.org.uk/voting-systems/types-of-voting-system/alternative-vote/
*/

const seats = 3
const options = ['o1','o2','o3','o4','o5','o6', 'o7']
const votes = [
	['o1','o2','o5'],
  ['o1','o3','o4'],
	['o1'],
	['o1'],
	['o1','o5'],
	['o1',],
	['o1','o5','oo', 'o4'],
	['o3','o5'],
	['o4','o5'],
	['o5'],
	['o5'],
	['o6','o5']
]

const countVotes = ({ votes, options, seats }) => {
  const filteredVotes = votes
    .map((vote) => {
      return vote.filter((option) => options.includes(option))
    })
  const count = filteredVotes
    .reduce((acc, vote) => {
      acc[vote[0]] = (acc[vote[0]] || 0) + 1
      return acc
    }, {})
    
  return spreadVotes({
    votes: filteredVotes,
    count,
    seats
  })
}

const spreadVotes = ({ votes, count, seats }) => {
  const maxVotes = votes.length / seats
  for (const option in count) {
    let diff = count[option] - maxVotes
    if (diff > 0) {
      count[option] = maxVotes
      for (const options of votes) {
          if ((options[0] === option) && options.length > 1) {
          count[options[1]] = 1 + (count[options[1]] || 0)
          diff = diff - 1
        }
      }
      return spreadVotes({ votes, count, seats })
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