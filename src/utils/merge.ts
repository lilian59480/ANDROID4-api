export default (obj1: any, obj2: any) => {
    const answer: any = {};
    for (let key in obj1) {
        if (answer[key] === undefined || answer[key] === null)
            answer[key] = obj1[key];
    }

    for (let key in obj2) {
        if (answer[key] === undefined || answer[key] === null)
            answer[key] = obj2[key];
    }
    return answer;
};

