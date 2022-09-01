interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

const calculateExercises = (daily: number[], target: number):Result =>{
    const result = daily.reduce((a, b) => (a+b))/daily.length

    const trainingDays = daily.filter(day=> day !== 0).length

    const calculateRating = () =>{
        if(result < target) return 1
        if(result === target) return 2
        if(result > target) return 3
    }

    const getDescription = () =>{
        const rating = calculateRating()

        if(rating === 3)return ('Good job, you accomplished your goal') 
        if(rating === 2)return ('Not too bad but could be better')
        if(rating === 1)return ("You didn't accomplish your goal, try harder")

    }
    
    return{
        periodLength: daily.length,
        trainingDays,
        success: result >= target? true: false,
        rating: calculateRating(),
        ratingDescription: getDescription(),
        target,
        average: result, 
    }

}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))