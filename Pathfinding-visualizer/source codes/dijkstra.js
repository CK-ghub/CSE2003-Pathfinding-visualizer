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
  	frameRate(60); 
  	background(0); 

	for(let i = 0; i < rows; i++){ 
 		grid[i] = new Array(cols); 
	} 
  
	for(let i = 0; i < rows; i++){  	
		for(let j = 0; j < cols; j++ ){ 
 			grid[i][j] = new Cell(i, j); 
 		} 
	} 
  
	start = grid[5][5]; //Starting node, array index position
	end = grid[cols - 5][rows - 10]; //Ending node, array index position
	start.dist = 0; 
	start.prev = start; 
	current = start; 
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
  
function draw(){ 
	for(let i = 0; i < rows; i++){ 
 		for(let j = 0; j < cols; j++ ){  	
 			if(grid[i][j].wall)//IF there is a wall 
 	     		grid[i][j].show(0, 0, 0);//Black RGB 
 			else 
 			grid[i][j].show(255, 255, 255);//White 
 		} 
	} 
	for(let i = 0; i < visited.length; i++){ 
 		visited[i].show(242, 141, 0);//Orange 
	}	 
	for(let i = 0; i < lookingAt.length; i++){ 
 		lookingAt[i].show(18,228,248);//Light blue
	} 
  
	start.show(0, 255, 0); 
	end.show(255, 0, 0); 
  
	if(current == end){ 
 		shortestPath(start, end);  	
 		noLoop(); 
	} 
	visited.push(current); 
	removeElement(lookingAt, current); 
  
	let neighbours = current.getNeighbours(); 
	for(let i = 0; i < neighbours.length; i++){ 
 		let neighbour = neighbours[i]; 
  
 		if(visited.includes(neighbour)){ 
 			continue; 
 		} 
 	// consider node only if its not a wall and if its not being looked at already 
 		if(!lookingAt.includes(neighbour) && !neighbour.wall){  	
 			neighbour.dist = current.dist + 1;  	
 			neighbour.prev = current; 
 			lookingAt.push(neighbour); 
 		} 
  
 		let tentativeDist = current.dist + 1; 
  
 		if(tentativeDist < neighbour.dist){  	
 			neighbour.dist = tentativeDist; 
 			neighbour.prev = current; 
 		} 
  	
	} 
  
	// to find the next node 
	let minNode = 0; 
	let minDist = Infinity; 
	if(lookingAt.length == 0){  	
	// found shortest path tree 
 		noLoop();  	
 		return;   
	} 
	else{ 
 		for(let i = 0; i < lookingAt.length; i++){  	
 			if(lookingAt[i].dist < minDist){ 
 				minDist = lookingAt[i].dist; 
 				minNode = lookingAt[i]; 
 			} 
 		} 
 		current = minNode; 
	} 
  
	if(minDist == Infinity){ 
 		noLoop(); 
	} 
}   
