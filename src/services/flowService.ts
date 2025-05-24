/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edge, getIncomers, Node } from "@xyflow/react";

export class FlowService{
    static buildGraph(outputNodeId : string, nodes : Node[], edges : Edge[]){
        const targetNode = nodes.find(node => node.id === outputNodeId)
        if(targetNode == null) return
        const inputNodes = getIncomers(targetNode, nodes, edges)
    }

    static buildAdjacencyList(edges: Edge[]): Record<NodeId, NodeId[]> {
        const adjacencyList: Record<NodeId, NodeId[]> = {};

        // console.log('edges : ', JSON.stringify(edges))

        edges.forEach(({ source, target }) => {
            if (!adjacencyList[target]) {
                adjacencyList[target] = [];
            }
            adjacencyList[target].push(source);
        });
        
        // console.log('adjency : ', JSON.stringify(adjacencyList))

        return adjacencyList;
    }

    static dfs(
        graph: Record<NodeId, NodeId[]>,
        startNodeId: NodeId,
        visited: Set<NodeId> = new Set(), // passed as a param only for recursive purposes
        result: NodeId[] = []
    ): NodeId[] {

        visited.add(startNodeId);
        result.push(startNodeId);

        const parents = graph[startNodeId] || [];
        for (const parent of parents) {
            if (!visited.has(parent)) {
                this.dfs(graph, parent, visited, result);
            }
        }

        return result;
    }

    static useDFSTraversal(edges: Edge[], startNodeId: NodeId): NodeId[] {
        const adjacencyList = this.buildAdjacencyList(edges);
        return this.dfs(adjacencyList, startNodeId).reverse();
    }

    static findNodesWithNoIncomingEdges(edges: Edge[], nodes : Node[]){
        const targetedNodes = this.getAllNodesWithParents(edges)

        const noParentsNodes: Set<NodeId> = new Set()
        nodes.forEach(({id}) => {
            if(!targetedNodes.includes(id)) noParentsNodes.add(id)
        })

        return Array.from(noParentsNodes)
    }

    static invertIntersection<T>(arr1: T[], arr2: T[]): T[] {
        const onlyInArr1 = arr1.filter(item => !arr2.includes(item));
        const onlyInArr2 = arr2.filter(item => !arr1.includes(item));
        return [...onlyInArr1, ...onlyInArr2];
    }

    static getAllNodesWithParents(edges : Edge[]) : NodeId[] {
        const targetedNodes : Set<NodeId> = new Set()
        edges.forEach(({target}) => {
            targetedNodes.add(target)
        })

        return Array.from(targetedNodes)
    }
}

type NodeId = string