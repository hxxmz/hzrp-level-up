// Old main solution

function calculate() {
    
    let requiredCash = document.getElementById('reqcash').value; 
    requiredCash = parseInt(requiredCash);
    
    let remainingPoints = document.getElementById('rempoints').value; 
    remainingPoints = parseInt(remainingPoints);
    
    let requiredPoints = document.getElementById('reqpoints').value; 
    requiredPoints = parseInt(requiredPoints);

    let levels = 0; let cashSum = 0;
    let levelsCountList = []; let respectPointList = []; let remainingPointsList = [];

    while (remainingPoints >= requiredPoints) {
        
        levels += 1; levelsCountList.push(levels);
        
        remainingPoints -= requiredPoints; remainingPointsList.push(remainingPoints);
        
        cashSum += requiredCash; requiredCash += 2500;
        
        requiredPoints += 4 ; respectPointList.push(requiredPoints);

    }

    let requiredPointsHtml = document.getElementById('requiredPointsHtml');
    requiredPointsHtml.innerHTML = `Respect Points: ${remainingPoints}/${requiredPoints} [$${requiredCash.toLocaleString('en')}]`;

    let availableLevelsHtml = document.getElementById('availableLevelsHtml'); 
    availableLevelsHtml.innerHTML = `${levels} level-up${levels > 1 ? "s" : ""} available`;

    let requiredCashHtml = document.getElementById('requiredCashHtml');
    requiredCashHtml.innerHTML = `Total cash required for ${levels} levels: $${cashSum.toLocaleString('en')}`;
    
}; 

// An alternative solution with mathematics :D

function altCalculate() {

    let requiredCash = document.getElementById('reqcash').value; 
    requiredCash = parseInt(requiredCash);
    
    let remainingPoints = document.getElementById('rempoints').value; 
    remainingPoints = parseInt(remainingPoints);
    
    let requiredPoints = document.getElementById('reqpoints').value; 
    requiredPoints = parseInt(requiredPoints);

    let levels = getLevels(requiredPoints, remainingPoints);
    let remainderPts = getRemainderPoints(remainingPoints,levels,requiredPoints);
    let newReqPts = getNewRequiredPoints(levels, requiredPoints);
    let cashReqSum = getCashRequired(levels, requiredCash);
    let newCashReq = getNewCashRequired(levels, requiredCash);

    let requiredPointsHtml = document.getElementById('requiredPointsHtml');
    requiredPointsHtml.innerHTML = `Respect Points: ${remainderPts}/${newReqPts} [$${newCashReq.toLocaleString('en')}]`;

    let availableLevelsHtml = document.getElementById('availableLevelsHtml'); 
    availableLevelsHtml.innerHTML = `${levels} level-up${levels > 1 ? "s" : ""} available`;

    let requiredCashHtml = document.getElementById('requiredCashHtml');
    requiredCashHtml.innerHTML = `Total cash required for ${levels} levels: $${cashReqSum.toLocaleString('en')}`;

};

function solveQuadratic(a, b, c) {
    
    const discriminant = b * b - 4 * a * c;
  
    if (discriminant < 0) {
      return []; // No real solutions
    }
  
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const solution1 = (-b + sqrtDiscriminant) / (2 * a);
    const solution2 = (-b - sqrtDiscriminant) / (2 * a);
  
    return [solution1, solution2];
};

function getLevels(st, end) {
    
    /*
        * nth term of the series: an ​= [st] + d (n−1) => an ​= [st] + 4 (n−1)
        * sum of the series up to the nth term:  Sn ​= [∑i=1 to n] ​([st] + 4 (i−1) )
        * resolving gives: Sn ​= [st]n + 4( (n−1)n/2 ​) => Sn ​= [st]n + 2(n−1)n 
        * Sn​ = [st]n + 2(n^2−n) => Sn​ = [st]n + 2n^2 − 2n => Sn​ = 2n^2 + [st]n − 2n
        * Sn = 2n^2 + (st-2)n
        * 2n^2 + (st-2)n - Sn = 0
    */

    let a = 2; let b = st-2; let c = end*(-1);

    const solutions = solveQuadratic(a, b, c);
    // Filter out negative solutions and round down positive solutions
    const positiveSolutions = solutions.filter(n => n > 0).map(Math.floor);

    return positiveSolutions[0];

};

function getRemainderPoints(totalPts,lvls,reqPts) {
    const diff = 4;
    let sumOfPts = (lvls/2) * ((2*reqPts) + ((lvls-1)*diff)) // Sn = n/2 (2a + (n-1)d) sum of arithmetic series
    return totalPts - sumOfPts;
};

function getNewRequiredPoints(lvls, reqPts) {
    const diff = 4;
    return reqPts + (lvls * diff) // an​ = a + (n−1) ⋅ d => since (N+1-1 = N) => an​ = a + (n ⋅ d)
};

function getCashRequired(lvls, reqCash) {
    const diff = 2500;
    return (lvls/2) * ((2*reqCash) + ((lvls-1)*diff)) // Sn = n/2 (2a + (n-1)d) sum of arithmetic series
};

function getNewCashRequired(lvls, reqCash) {
    const diff = 4;
    return reqCash + (lvls * diff); // an​ = a + (n−1) ⋅ d => since (N+1-1 = N) => an​ = a + (n ⋅ d)
};