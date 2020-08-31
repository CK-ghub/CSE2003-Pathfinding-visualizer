const cols = 25; 
const rows = 25; 
let grid = new Array(rows); 
let w, h; 
let visited = []; 
let lookingAt = []; 
let start, end, current; 
  
function setup(){ 
	createCanvas(600, 600); 	
	w = width / cols; 
	h = height / rows; 
  
	background(0); 
	frameRate(60); 
  
	for(let i = 0; i < rows; i++){  	
		grid[i] = new Array(cols); 
	} 
  
	for(let i = 0; i < rows; i++){  	
		for(let j = 0; j < cols; j++ ) { 
 			grid[i][j] = new Cell(i, j); 
 		} 
	} 
  
	start = grid[5][5]; //starting node, index position
	end = grid[cols - 5][rows - 10]; //ending node, index position
	start.distance = 0; 
	start.prev = start; current = start; 
	lookingAt.push(start); 
  
	//ensure start and end are not walls 
	end.wall = start.wall = false; 
} 
  
function removeElement(arr, element){ 
	for(let i = 0; i < arr.length; i++){  	
		if(arr[i] == element){ 
 			arr.splice(i,1); 
 	 	} 
	} 
} 
  
function shortestPath(start, end){ 
	let current = end.prev; 
	let path = []; 
	while(current.prev != current){  	
		path.unshift(current); 
 		current = current.prev; 
	} 
  
	for(let i = 0; i < path.length; i++){ 
 		path[i].show(255,255,0); 
	} 
} 
  
function heuristic(cell, end){ 
	return abs(cell.i - end.i) + abs(cell.j - end.j); 
} 
  
function draw(){ 
	for(let i = 0; i < rows; i++){  	
		for(let j = 0; j < cols; j++ ){  	
			if(grid[i][j].wall) 
 				grid[i][j].show(0, 0, 0);  	
 			else 
 				grid[i][j].show(200, 200, 200); 
 		} 
	} 
  
	for(let i = 0; i < visited.length; i++){  	
		visited[i].show(242, 141, 0); 
    } 
  
	for(let i = 0; i < lookingAt.length; i++){  	
		lookingAt[i].show(18,228,248); 
	}  
	start.show(0, 255, 0); 
	end.show(255, 0, 0); 
  
	if(current == end){ 
 		shortestPath(start, end);  	noLoop();  	return; 
	} 
  
	visited.push(current); 
	removeElement(lookingAt, current); 
  
	let neighbours = current.getNeighbours(); 
	for(let i = 0; i < neighbours.length; i++){ 
 		let neighbour = neighbours[i]; 
 		if(visited.includes(neighbour)){  	
 			continue; 
 	} 
  		let tentativeDist = current.distance + 1; 
  
 		// consider node only if its not a wall and if its not being looked at already 
 		if(!lookingAt.includes(neighbour) && !neighbour.wall){ 
 	  		lookingAt.push(neighbour); 
 		} 
  
 		if(tentativeDist < neighbour.distance){  	
 			neighbour.distance = tentativeDist;  	
 			neighbour.prev = current;  	
 			neighbour.total = neighbour.distance + heuristic(neighbour, end); // total cost estimate 
 		} 
	} 
	let minNode = 0; 
  	let minDist = Infinity; 
  	if(lookingAt.length == 0){  	// found shortest path tree 
 		noLoop();  	
 		return; 
	} 
	else{  	
		for(let i = 0; i < lookingAt.length; i++){  	
			if(lookingAt[i].total < lookingAt[minNode].total){  	
				minNode = i; 
 				minDist = lookingAt[i].total; 
 			} 
 		} 
 		current = lookingAt[minNode]; 
    } 
  
	if(minDist == Infinity){ 
		noLoop(); 
 	return; 
	} 
}   
