function calculate() {
    
    let requiredCash = document.getElementById('reqcash').value; 
    requiredCash = parseInt(requiredCash);
    
    let remainingPoints = document.getElementById('rempoints').value; 
    remainingPoints = parseInt(remainingPoints);
    
    let requiredPoints = document.getElementById('reqpoints').value; 
    requiredPoints = parseInt(requiredPoints);

    let levels = 0; let cashSum = 0;
    let levelsCountList = []; let respectPointList = []; let remainingPointsList = [];

    while (remainingPoints > requiredPoints) {
        
        levels += 1; levelsCountList.push(levels);
        
        remainingPoints -= requiredPoints; remainingPointsList.push(remainingPoints);
        
        cashSum += requiredCash; requiredCash += 2500;
        
        requiredPoints += 4 ; respectPointList.push(requiredPoints);

    }

    let requiredPointsHtml = document.getElementById('requiredPointsHtml');
    requiredPointsHtml.innerHTML += `Respect Points: ${remainingPoints}/${requiredPoints} [$${requiredCash.toLocaleString('en')}]`;

    let availableLevelsHtml = document.getElementById('availableLevelsHtml'); 
    availableLevelsHtml.innerHTML += `${levels} level-up${levels > 1 ? "s" : ""} available`;

    let requiredCashHtml = document.getElementById('requiredCashHtml');
    requiredCashHtml.innerHTML += `Total cash required for ${levels} levels: $${cashSum.toLocaleString('en')}`;
    
}; 
