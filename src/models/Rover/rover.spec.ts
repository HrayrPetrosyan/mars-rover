import Rover from '.';
import Plateau from '../Plateau';
import { DirectionEnum, RoverCommandTypeEnum, InstructionEnum } from '../../constants';

describe('getRoverCoordinatesAndDirection static method', () => {
  it('should return x, y and direction properties when a valid instruction provided', () => {
    const validInstruction = '1 2 N';
    const result = Rover.getRoverCoordinatesAndDirection(validInstruction);
    expect(result).toMatchObject({ x: 1, y: 2, direction: DirectionEnum.N });
  });

  it('should fail when coordinate values are invalid', () => {
    const validInstruction = 'h F N';
    expect(() => Rover.getRoverCoordinatesAndDirection(validInstruction)).toThrowError();
  });

  it('should fail when the direction values is invalid', () => {
    const validInstruction = '4 5 I';
    expect(() => Rover.getRoverCoordinatesAndDirection(validInstruction)).toThrowError();
  });

  it('should fail when the instruction is invalid', () => {
    const validInstruction = '45I';
    expect(() => Rover.getRoverCoordinatesAndDirection(validInstruction)).toThrowError();
  });
});

describe('parseNameAndType static method', () => {
  it('should return name, type and instructions when a valid Landing type command is provided', () => {
    const validCommandLanding = 'Rover1 Landing:1 2 N';
    expect(Rover.parseNameAndType(validCommandLanding)).toMatchObject({
      name: 'Rover1',
      type: RoverCommandTypeEnum.Landing,
      instructions: '1 2 N',
    });
  });

  it('should return name, type and instructions when a valid Instructions type command is provided', () => {
    const validCommandInstructions = 'Rover1 Instructions:LMLMLMLMM';
    expect(Rover.parseNameAndType(validCommandInstructions)).toMatchObject({
      name: 'Rover1',
      type: RoverCommandTypeEnum.Instructions,
      instructions: 'LMLMLMLMM',
    });
  });

  it('should fail in case no name is provided', () => {
    const invalidCommand = ' Instructions:LMLMLMLMM';
    expect(() => Rover.parseNameAndType(invalidCommand)).toThrowError();
  });

  it('should fail in case no valid type of command is provided', () => {
    const invalidCommand = 'Rover1 junky:LMLMLMLMM';
    expect(() => Rover.parseNameAndType(invalidCommand)).toThrowError();
  });

  it('should fail in case no instructions is provided', () => {
    const invalidCommand = 'Rover1 Landing:';
    expect(() => Rover.parseNameAndType(invalidCommand)).toThrowError();
  });
});

describe('getRoversCommands static method', () => {
  it('should return an array sliced starting from the 2nd element', () => {
    const validCommand = ['Plateau:5 5', 'Rover2 Landing:3 3 E'];
    const result = Rover.getRoversCommands(validCommand);
    expect(result).not.toContain('Plateau:5 5');
    expect(result).toContain('Rover2 Landing:3 3 E');
    expect(result.length).toBe(1);
  });

  it('should fail when the length of the array is 1', () => {
    const invalidCommand = ['Plateau:5 5'];
    expect(() => Rover.getRoversCommands(invalidCommand)).toThrowError();
  });
});

describe('applyInstructions public method', () => {
  it('should move to south', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 6, DirectionEnum.S, plateau);
    rover.applyInstructions(InstructionEnum.M);
    expect(rover.y).toBe(5);
  });

  it('should fail move to south when it is out of Plateau', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 0, DirectionEnum.S, plateau);
    expect(() => rover.applyInstructions(InstructionEnum.M)).toThrowError();
  });

  it('should turn to west after a left move from north', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 0, DirectionEnum.N, plateau);
    rover.applyInstructions(InstructionEnum.L);
    expect(rover.direction).toBe(DirectionEnum.W);
  });

  it('should turn to west after a right move from south', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 0, DirectionEnum.S, plateau);
    rover.applyInstructions(InstructionEnum.R);
    expect(rover.direction).toBe(DirectionEnum.W);
  });

  it('should fail when invalid instruction is passed', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 0, DirectionEnum.S, plateau);
    expect(() => rover.applyInstructions('H')).toThrowError();
  });
});

describe('log public method', () => {
  it('should log the rover params in the following format: {name}:{x} {y} {direction}', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 1, DirectionEnum.S, plateau);
    const consoleSpy = jest.spyOn(console, 'log');
    rover.log();
    expect(consoleSpy).toBeCalledWith('Rover1:4 1 S');
  });
});

describe('constructor', () => {
  it('should instanciate when valid params are given', () => {
    const plateau = new Plateau(9, 9);
    const rover = new Rover('Rover1', 4, 3, DirectionEnum.S, plateau);
    expect(rover.name).toBe('Rover1');
    expect(rover.x).toBe(4);
    expect(rover.y).toBe(3);
  });

  it('should fail when a coordinate is not withing th Plateau area', () => {
    const plateau = new Plateau(9, 9);
    expect(() => new Rover('Rover1', 33, 3, DirectionEnum.S, plateau)).toThrowError();
  });

  it('should fail when a coordinate is a negative value', () => {
    const plateau = new Plateau(9, 9);
    expect(() => new Rover('Rover1', 3, -3, DirectionEnum.S, plateau)).toThrowError();
  });
});
