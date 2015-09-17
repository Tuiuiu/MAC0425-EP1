// Nome       : Lucas Dário
// Número USP : 7990940


"use strict";

// ---------------------------------------------------------------------------
// Nós da busca (Search nodes)
// ---------------------------------------------------------------------------

// Construtor da estrutura Nó da árvore de busca
var Node = function (action, parent, state, depth, g, h) {
	this.state = state;     // representação do estado do nó
	this.parent = parent;   // nó pai na árvore de busca
	this.action = action;   // ação que gerou o nó
	this.depth = depth;     // profundidade do nó na árvore de busca
	this.g = g;             // custo de caminho até o nó
	this.h = h;             // heurística de custo até meta
};


// Recupera o caminho (sequência de ações) do nó raiz até nó corrente.
Node.prototype.getPath = function () {
	var path = [];
	var node = this;
	while (node.parent !== null) {
		path.unshift(node.action);
		node = node.parent;
	}
	return path;
};

// ==========================================================================================
// Buscas não-informadas (cegas)


// ---------------------------------------------------------------------------
// Busca em Profundidade (Depth-First Search)
// ---------------------------------------------------------------------------
var DFS = function (problem) {

	// retorno da função: mantenha essa interface!!!
	// solução e estatísticas de busca
	var result = {
		solution: null,   // solução: sequência de ações
		generated: 0,     // número de nós gerados
		expanded: 0,      // número de nós expandidos
		ramification: 0   // fator de ramificação médio
	}

	// Implemente a busca em profundidade com busca em grafo
	// ...
	// ...
	var nodeStack = new Stack();
	var visitedSet = new Set();
	var raiz = new Node(null, null, problem.initialState, 0, 0, 0);

	// Adciona a raíz à pilha de nós e conjunto de nós visistados
	nodeStack.push(raiz);
	visitedSet.add(raiz);
	result.generated++;

	while(!nodeStack.empty()) {
		var thisNode = nodeStack.pop();
		result.expanded++;
		if (!problem.GoalTest(thisNode.state)) {
			// Recupera as ações aplicáveis ao estado do nó sendo verificado
			var applicableActions = problem.Actions(thisNode.state);
			for (var i = 0; i < applicableActions.length; i++) {
				result.generated++;
				var possibleState = problem.Result(thisNode.state, applicableActions[i]);
				if(!visitedSet.hasElement(possibleState)) {
					// Se o novo estado ainda não foi visitado,
					// o adcionamos à lista de estados visitados
					visitedSet.add(possibleState);
					var newNode = new Node(applicableActions[i], 
						                   thisNode, 
						                   possibleState, 
						                   thisNode.depth + 1, 
						                   0, 0);
					nodeStack.push(newNode);
				}
			}
		}
		else {
			// Recuperamos o vetor de ações a serem executadas e retornamos o resultado
			result.solution = thisNode.getPath();
			result.ramification = result.generated/result.expanded;
			return result;
		}
	}
	return null; // retorna falha se não encontrou solução
};


// ---------------------------------------------------------------------------
// Busca em Largura (Breadth-First Search)
// ---------------------------------------------------------------------------
var BFS = function (problem) {

	// retorno da função: mantenha essa interface!!!
	// solução e estatísticas de busca
	var result = {
		solution: null,   // solução: sequência de ações
		generated: 0,     // número de nós gerados
		expanded: 0,      // número de nós expandidos
		ramification: 0   // fator de ramificação médio
	}

	// Implemente a busca em largura com busca em grafo
	// ...
	// ...
	var nodeQueue = new Queue();
	var visitedSet = new Set();
	var raiz = new Node(null, null, problem.initialState, 0, 0, 0);

	// Adciona a raíz à fila de nós e conjunto de nós visitados
	nodeQueue.put(raiz);
	visitedSet.add(raiz);
	result.generated++;

	while(!nodeQueue.empty()) {
		var thisNode = nodeQueue.get();
		result.expanded++;
		if (!problem.GoalTest(thisNode.state)) {
			// Recupera as ações aplicáveis ao estado do nó sendo verificado
			var applicableActions = problem.Actions(thisNode.state);
			for (var i = 0; i < applicableActions.length; i++) {
				result.generated++;
				var possibleState = problem.Result(thisNode.state, applicableActions[i]);
				if(!visitedSet.hasElement(possibleState)) {
					// Se o novo estado ainda não foi visitado,
					// o adcionamos à lista de estados visitados
					visitedSet.add(possibleState);
					var newNode = new Node(applicableActions[i], 
						                   thisNode, 
						                   possibleState, 
						                   thisNode.depth + 1, 
						                   0, 0);
					nodeQueue.put(newNode);
				}
			}
		}
		else {
			// Recuperamos o vetor de ações a serem executadas
			result.solution = thisNode.getPath();
			result.ramification = result.generated/result.expanded;
			return result;
		}
	}
	return null; // retorna falha se não encontrou solução
};



// ==========================================================================================
// Buscas informadas


// Heurística da distância de manhatttan: devolve a distância de manhattan
// entre a posição do tetraminó do estado s1 e a posição do tetraminó do estado s2
var manhattanDistance = function (s1, s2) {
	return Math.abs(s1.tetromino.xpos - s2.tetromino.xpos) + Math.abs(s1.tetromino.ypos - s2.tetromino.ypos);
};

var manhattanDistanceAdmissible = function (s1, s2) {
	// Ao considerar apenas a distância X, garantimos que esse valor nunca será maior que o menor número de
	// movimentos que uma peça deverá fazer (caso limite quando os unicos movimentos necessários sejam mover a peça
	// até a posição correta horizontalmente)
	return Math.abs(s1.tetromino.xpos - s2.tetromino.xpos);
};


// ---------------------------------------------------------------------------
// Busca de melhor escolha (Best-First Search)
// ---------------------------------------------------------------------------
var BestFS = function (problem) {

	var getHeuristic = function (node) {
		return node.h;
	}

	// retorno da função: mantenha essa interface!!!
	// solução e estatísticas de busca
	var result = {
		solution: null,   // solução: sequência de ações
		generated: 0,     // número de nós gerados
		expanded: 0,      // número de nós expandidos
		ramification: 0   // fator de ramificação médio
	}

	// Implemente a busca de melhor escolha com busca em grafo
	// ...
	// ...
	var nodePQueue = new PQueue(getHeuristic);
	var visitedSet = new Set();
	var raiz = new Node(null, null, problem.initialState, 0, 0, 0);

	// Adciona a raíz à fila de nós e conjunto de nós visitados
	nodePQueue.put(raiz);
	visitedSet.add(raiz);
	result.generated++;

	while(!nodePQueue.empty()) {
		var thisNode = nodePQueue.get();
		result.expanded++;
		if (!problem.GoalTest(thisNode.state)) {
			// Recupera as ações aplicáveis ao estado do nó sendo verificado
			var applicableActions = problem.Actions(thisNode.state);
			for (var i = 0; i < applicableActions.length; i++) {
				result.generated++;
				var possibleState = problem.Result(thisNode.state, applicableActions[i]);
				if(!visitedSet.hasElement(possibleState)) {
					// Se o novo estado ainda não foi visitado,
					// o adcionamos à lista de estados visitados
					visitedSet.add(possibleState);
					var newNode = new Node(applicableActions[i], 
						                   thisNode, 
						                   possibleState, 
						                   thisNode.depth + 1, 
						                   0, manhattanDistanceAdmissible(thisNode.state, problem.goalState));
					nodePQueue.put(newNode);
				}
			}
		}
		else {
			// Recuperamos o vetor de ações a serem executadas
			result.solution = thisNode.getPath();
			result.ramification = result.generated/result.expanded;
			return result;
		}
	}

	return null; // retorna falha se não encontrou solução
};


// ---------------------------------------------------------------------------
// Busca A*
// ---------------------------------------------------------------------------
var ASTAR = function (problem) {
	
	var getFValue = function (node) {
		return node.g + node.h;
	}

	// retorno da função: mantenha essa interface!!!
	// solução e estatísticas de busca
	var result = {
		solution: null,   // solução: sequência de ações
		generated: 0,     // número de nós gerados
		expanded: 0,      // número de nós expandidos
		ramification: 0   // fator de ramificação médio
	}

	// Implemente a busca A* com busca em grafo
	// ...
	// ...
	var nodePQueue = new PQueue(getFValue);
	var visitedSet = new Set();
	var raiz = new Node(null, null, problem.initialState, 0, 0, 0);

	// Adciona a raíz à fila de nós e conjunto de nós visitados
	nodePQueue.put(raiz);
	visitedSet.add(raiz);
	result.generated++;

	while(!nodePQueue.empty()) {
		var thisNode = nodePQueue.get();
		result.expanded++;
		if (!problem.GoalTest(thisNode.state)) {
			// Recupera as ações aplicáveis ao estado do nó sendo verificado
			var applicableActions = problem.Actions(thisNode.state);
			for (var i = 0; i < applicableActions.length; i++) {
				result.generated++;
				var possibleState = problem.Result(thisNode.state, applicableActions[i]);
				if(!visitedSet.hasElement(possibleState)) {
					// Se o novo estado ainda não foi visitado,
					// o adcionamos à lista de estados visitados
					visitedSet.add(possibleState);
					var newNode = new Node(applicableActions[i], 
						                   thisNode, 
						                   possibleState, 
						                   thisNode.depth + 1, 
						                   thisNode.g + problem.StepCost(possibleState, applicableActions[i]), 
						                   manhattanDistanceAdmissible(thisNode.state, problem.goalState));
					nodePQueue.put(newNode);
				}
			}
		}
		else {
			// Recuperamos o vetor de ações a serem executadas
			result.solution = thisNode.getPath();
			result.ramification = result.generated/result.expanded;
			return result;
		}
	}

	return null; // retorna falha se não encontrou solução
};
