import { DirectionEnum, RoverCommandTypeEnum, InstructionEnum } from '../../constants';
import Mission from '../Mission';
import Plateau from '../Plateau';

class Rover {
  static readonly directions = [DirectionEnum.N, DirectionEnum.E, DirectionEnum.S, DirectionEnum.W];

  constructor(
    public readonly name: string,
    public x: number,
    public y: number,
    public direction: DirectionEnum,
    private readonly plateau: Plateau,
  ) {
    if (x > plateau.x || x < 0 || y > plateau.y || y < 0) {
      throw new Error('Rover coordinates must be within the Plateau!');
    }
  }

  /**
   * Looping over the instructions and calling to move the Rover
   */
  public applyInstructions(instructions: string): void {
    for (const instruction of instructions) {
      if (!InstructionEnum[instruction]) {
        throw new Error('Invalid instruction!');
      }

      if (instruction === InstructionEnum.M) {
        this.move();
      } else {
        this.turnTo(instruction);
      }
    }
  }

  /**
   * Logs some props of the Rover
   */
  public log(): void {
    console.log(`${this.name}:${this.x} ${this.y} ${this.direction}`);
  }

  /**
   * Turns the Rover left or right
   */
  private turnTo(instruction: string): void {
    const currentIndex = Rover.directions.indexOf(this.direction);

    let goTo: 1 | -1;
    switch (instruction) {
      case InstructionEnum.L:
        goTo = -1;
        break;
      case InstructionEnum.R:
        goTo = 1;
        break;
      default:
        throw new Error('Invalid move provided!');
    }

    if (currentIndex === 0 && goTo === -1) {
      this.direction = Rover.directions[Rover.directions.length - 1];
    } else if (currentIndex === Rover.directions.length - 1 && goTo === 1) {
      this.direction = Rover.directions[0];
    } else {
      this.direction = Rover.directions[currentIndex + goTo];
    }
  }

  /**
   * Moves 1 point on the current direction
   */
  private move(): void {
    switch (this.direction) {
      case DirectionEnum.N:
        if (this.plateau.y === this.y) {
          throw new Error('Out of Plateau area!');
        }
        this.y += 1;
        break;

      case DirectionEnum.S:
        if (this.y === 0) {
          throw new Error('Out of Plateau area!');
        }
        this.y -= 1;
        break;

      case DirectionEnum.E:
        if (this.plateau.x === this.x) {
          throw new Error('Out of Plateau! area!');
        }
        this.x += 1;
        break;

      case DirectionEnum.W:
        if (this.x === 0) {
          throw new Error('Out of Plateau! area!');
        }
        this.x -= 1;
        break;
    }
  }

  /**
   * Returns the commands omitting th Plateau command
   */
  static getRoversCommands(commands: string[]): string[] {
    const roversCommands = commands.slice(1);
    if (!roversCommands.length) {
      throw new Error('No Rovers found!');
    }
    return roversCommands;
  }

  /**
   * Parses the command returning the name, command type and the instructions part
   */
  static parseNameAndType(command: string): { name: string; type: RoverCommandTypeEnum; instructions: string } {
    const commandSplit = command.split(':');
    const nameAndType = commandSplit[0];
    const instructions = commandSplit[1];

    if (!nameAndType || !instructions) {
      throw new Error('Rover command is invalid!');
    }

    const [name, type] = nameAndType.split(' ');
    if (!name || !RoverCommandTypeEnum[type]) {
      throw new Error('Rover command is invalid!');
    }

    return { name, type: RoverCommandTypeEnum[type], instructions };
  }

  /**
   * Parses the instructions part of the command returning the coordinates and the direction
   */
  static getRoverCoordinatesAndDirection(instructions: string): { x: number; y: number; direction: DirectionEnum } {
    const [x, y, direction] = instructions.split(' ');
    if (!DirectionEnum[direction]) {
      throw new Error('Rover instruction is invalid!');
    }
    return {
      x: Mission.convertCoordinateIntoValidNumber(x),
      y: Mission.convertCoordinateIntoValidNumber(y),
      direction: DirectionEnum[direction],
    };
  }
}

export default Rover;
