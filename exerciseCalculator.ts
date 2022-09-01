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
    
    target = Number(target);

    if(isNaN(target)) throw new Error('Target value is not a number'); 

    // if(process.argv.length < 4) throw new Error('Not enough arguments');

    const result = daily.reduce((a, b) => (a+b))/daily.length;

    const trainingDays = daily.filter(day=> day !== 0).length;

    const calculateRating = () =>{
        if(result < target) return 1;
        if(result === target) return 2;
        if(result > target) return 3;
        return 0;
    };

    const getDescription = () =>{
        const rating = calculateRating();

        if(rating === 3)return ('Good job, you accomplished your goal'); 
        if(rating === 2)return ('Not too bad but could be better');
        if(rating === 1)return ("You didn't accomplish your goal, try harder");
        return 'no rating';
    };
    
    return{
        periodLength: daily.length,
        trainingDays,
        success: result >= target? true: false,
        rating: calculateRating(),
        ratingDescription: getDescription(),
        target,
        average: result, 
    };

};

const len = process.argv.length;

// let array: number[] = [];

let argvs: number[] = [];

for (let index = 3; index < len; index++) {
     argvs = argvs.concat(Number(process.argv[index]));

    //  array = argvs.filter(arg=> !(isNaN(arg))) //one way
    
    const notNumbersArray = argvs.filter(arg=> (isNaN(arg)));
     if(notNumbersArray.length > 0) throw new Error ('Strings are not allowed as arguments');
    //  array = argvs;
    }

// const target = Number(process.argv[2]);

// console.log(calculateExercises(array, target));

export default calculateExercises;

