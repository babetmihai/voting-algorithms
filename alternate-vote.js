
/*
  Alternate voting algorithm
  https://www.electoral-reform.org.uk/voting-systems/types-of-voting-system/alternative-vote/
*/

const options = ['o1','o2','o3','o4','o5','o6']
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

while (true) {
  const count = votes
    .map((vote) => vote.filter((option) => options.includes(option)))
    .reduce((acc, vote) => {
      acc[vote[0]] = (acc[vote[0]] || 0) + 1
      return acc
    }, {})

  options.sort((first, second) => (count[second] || 0) - (count[first] || 0))
  options.pop()

  if (options.length === 1) break
}

console.log({ options })