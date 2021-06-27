export enum DirectionEnum {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export enum InstructionEnum {
  L = 'L',
  R = 'R',
  M = 'M',
}

export enum RoverCommandTypeEnum {
  Landing = 'Landing',
  Instructions = 'Instructions',
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ParsedRoverLanding {
  name: string;
  type: RoverCommandTypeEnum;
  instructions: string;
}

export interface ParsedRoverInstructions extends Coordinates {
  type: RoverCommandTypeEnum;
  direction: DirectionEnum;
}

export type ParsedRoverCommand = ParsedRoverInstructions | ParsedRoverLanding;

export const PLATEAU = 'Plateau';
