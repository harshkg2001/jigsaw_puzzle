function generateRandomPermutation(n)
{
    const permutation = Array.from({ length: n }, (_, index) => index);
  
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
  
    return permutation;
}

const n = 10;
const randomPermutation = generateRandomPermutation(n);
for(let i=0; i<n; i++)
console.log(randomPermutation[i]+" ");
  