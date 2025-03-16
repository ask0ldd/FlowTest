import { type Node } from '@xyflow/react';
 
export type TextNodeType = Node<{ text: string }, 'text'>;
export type ResultNodeType = Node<{text: string}, 'result'>;
export type UpperCaseNodeType = Node<{ text: string }, 'uppercase'>;
export type MyNodeType = TextNodeType | ResultNodeType | UpperCaseNodeType;
 
export function isTextNode(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
): node is TextNodeType | UpperCaseNodeType | undefined {
  return !node ? false : node.type === 'text' || node.type === 'uppercase';
}