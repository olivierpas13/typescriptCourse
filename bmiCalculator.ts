const calculateBmi = (height: number, weight: number) =>{

    if(isNaN(height) || isNaN(weight)) throw new Error('Invalid arguments, not numbers')

    const result = weight / Math.pow(height/100, 2);
    if(result > 30)return 'Obese (Unhealthy weight)'
    if(result > 25)return 'Overweight (Unhealthy weight)'
    if(result > 18.5)return 'Normal (Healthy weight)'
    if(result < 18.5)return 'Underweight (Unhealthy weight)'
    return;
}

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])


// console.log(calculateBmi(height, weight))

export default calculateBmi
