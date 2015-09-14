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

	return result;
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

	return result; // retorna falha se não encontrou solução
};



// ==========================================================================================
// Buscas informadas


// Heurística da distância de manhatttan: devolve a distância de manhattan
// entre a posição do tetraminó do estado s1 e a posição do tetraminó do estado s2
var manhattanDistance = function (s1, s2) {
	return Math.abs(s1.tetromino.xpos - s2.tetromino.xpos) + Math.abs(s1.tetromino.ypos - s2.tetromino.ypos);
};

var manhattanDistanceAdmissible = function (s1, s2) {
	// Modifique o cálculo da distância de manhattan para tornar a heurística admissível
	// ...
};


// ---------------------------------------------------------------------------
// Busca de melhor escolha (Best-First Search)
// ---------------------------------------------------------------------------
var BestFS = function (problem) {

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

	return result; // retorna falha se não encontrou solução
};


// ---------------------------------------------------------------------------
// Busca A*
// ---------------------------------------------------------------------------
var ASTAR = function (problem) {

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

	return result; // retorna falha se não encontrou solução
};
