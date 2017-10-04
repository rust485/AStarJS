function heuristic(x, y, finish)
{
	return Math.sqrt((finish.x - x)*(finish.x - x) + (finish.y - y)*(finish.y - y));
}

function pathNodeComp(n1, n2) { return n1.f - n2.f; }
function dijkstraComp(n1, n2) { return n1.g - n2.g; }
function constructPath(node)
{
	var path = [];
	while (node.from)
	{
		path.push(node);
		node = node.from;
	}

	return path;
}

class PathNode
{
	constructor(data, position)
	{
		this.position = position;
		this.data = data;
		this.from = null;
		this.g = Infinity;
		this.f = Infinity;
		this.visited = false;
		this.inHeap = false;
	}

	setFrom(from)
	{
		this.from = from;
	}
	setG(g)
	{
		this.g = g;
	}
	setF(f)
	{
		this.f = f;
	}
}

class Map
{
	constructor(arr)
	{
		this.hardnessMap = arr;
	}

	aStar(start, finish, speed)
	{
    var heap = new Heap(pathNodeComp);

		let pathNodes = []; //2d array of PathNodes, representing each position in grid
		for (let y = 0; y < this.hardnessMap.length; y++)
		{
			pathNodes.push([]);
			for (let x = 0; x < this.hardnessMap[0].length; x++)
			{
        pathNodes[y].push(new PathNode(this.hardnessMap[y][x],
				{
					x: x,
					y: y
				}));
      }
		}

		pathNodes[start.y][start.x].setG(0);
		pathNodes[start.y][start.x].setF(heuristic(start.y, start.x, finish));
		heap.insert(pathNodes[start.y][start.x]);
		pathNodes[start.y][start.x].inHeap = true;
    let n;
		while (n = heap.pop())
		{
			if (n.position.x == finish.x && n.position.y == finish.y)
				return constructPath(n);

			n.visited = true;

			let startX = (n.position.x - 1 >= 0) ? n.position.x - 1 : 0;
			let startY = (n.position.y - 1 >= 0) ? n.position.y - 1 : 0;
			let endX = (n.position.x + 1 < this.hardnessMap[0].length) ?
				n.position.x + 1 : this.hardnessMap[0].length - 1;
			let endY = (n.position.y + 1 < this.hardnessMap.length) ?
				n.position.y + 1 : this.hardnessMap.length - 1;

			for (let y = startY; y <= endY; y++)
			{
				for (let x = startX; x <= endX; x++)
				{
					let neighbor = pathNodes[y][x];
					if (!neighbor.visited && (neighbor.data % 10 != 0))
					{
						if (!neighbor.inHeap)
						{
							heap.insert(neighbor);
							neighbor.inHeap = true;
						}

						let score = n.g + map.aStarAsDijk({x: 0, y: 0}, {x: 30, y: 30});
						if (score < neighbor.g)
						{
							neighbor.setFrom(n);
							neighbor.setG(score);
							neighbor.setF(score + heuristic(x, y, finish));
							heap.promote(neighbor);
						}
					}
				}
			}
		}

		return false; // destination unreachable
	}

	aStarAsDijk(start, finish, speed)
	{
		var heap = new Heap(dijkstraComp);

		let pathNodes = []; //2d array of PathNodes, representing each position in grid
		for (let y = 0; y < this.hardnessMap.length; y++)
		{
			pathNodes.push([]);
			for (let x = 0; x < this.hardnessMap[0].length; x++)
			{
				pathNodes[y].push(new PathNode(this.hardnessMap[y][x],
				{
					x: x,
					y: y
				}));
			}
		}

		pathNodes[start.y][start.x].setG(0);
		pathNodes[start.y][start.x].setF(heuristic(start.y, start.x, finish));
		heap.insert(pathNodes[start.y][start.x]);
		pathNodes[start.y][start.x].inHeap = true;
		let n;
		while (n = heap.pop())
		{
			if (n.position.x == finish.x && n.position.y == finish.y)
				return constructPath(n);

			n.visited = true;

			let startX = (n.position.x - 1 >= 0) ? n.position.x - 1 : 0;
			let startY = (n.position.y - 1 >= 0) ? n.position.y - 1 : 0;
			let endX = (n.position.x + 1 < this.hardnessMap[0].length) ?
				n.position.x + 1 : this.hardnessMap[0].length - 1;
			let endY = (n.position.y + 1 < this.hardnessMap.length) ?
				n.position.y + 1 : this.hardnessMap.length - 1;

			for (let y = startY; y <= endY; y++)
			{
				for (let x = startX; x <= endX; x++)
				{
					let neighbor = pathNodes[y][x];
					if (!neighbor.visited && (neighbor.data % 10 != 0))
					{
						if (!neighbor.inHeap)
						{
							heap.insert(neighbor);
							neighbor.inHeap = true;
						}

						let score = n.g + this.hardnessMap[y][x];
						if (score < neighbor.g)
						{
							neighbor.setFrom(n);
							neighbor.setG(score);
							neighbor.setF(score + heuristic(x, y, finish));
							heap.promote(neighbor);
						}
					}
				}
			}
		}

		return false; // destination unreachable
	}
}
