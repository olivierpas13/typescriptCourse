const calculateBmi = (height: number, weight: number) =>{
    const result = weight / Math.pow(height/100, 2);
    if(result > 30)return 'Obese (Unhealthy weight)'
    if(result > 25)return 'Overweight (Unhealthy weight)'
    if(result > 18.5)return 'Normal (Healthy weight)'
    if(result < 18.5)return 'Underweight (Unhealthy weight)'
}


console.log(calculateBmi(180, 74))
