import { RoverCommandTypeEnum } from '../../constants';
import Plateau from '../Plateau';
import Rover from '../Rover';

export default class Mission {
  private readonly commands: string[];
  private plateau: Plateau;
  private rovers: Rover[] = [];

  constructor(commands: string) {
    this.commands = Mission.getCommandsArr(commands);

    this.initPlateau();
    this.initRovers();
  }

  /**
   * Prints out the rovers' parameters in the following format: {name}:{x} {y} {direction}
   */
  public printRoversPositions(): void {
    this.rovers.forEach((rover) => {
      console.log(`${rover.name}:${rover.x} ${rover.y} ${rover.direction}`);
    });
  }

  /**
   * Instanciates a Plateau and assigns to plateau prop
   */
  private initPlateau() {
    const command = Plateau.getPlateauCommand(this.commands);
    const params = Plateau.getPlateauCoordinates(command);
    this.plateau = new Plateau(params.x, params.x);
  }

  /**
   * Loops over the commands, calls to parse them and calling to apply the instructions
   */
  private initRovers() {
    const commands = Rover.getRoversCommands(this.commands);

    for (const command of commands) {
      const { name, type, instructions } = Rover.parseNameAndType(command);

      switch (type) {
        case RoverCommandTypeEnum.Landing:
          this.createRover(name, instructions);
          break;
        case RoverCommandTypeEnum.Instructions:
          this.applyRoverInstructions(name, instructions);
          break;
      }
    }
  }

  /**
   * Instanciates a Rover with a unique name.
   */
  private createRover(name: string, instructions: string) {
    const found = this.rovers.find((rover) => rover.name === name);
    if (found) {
      throw new Error('Rover already exists!');
    }
    const { x, y, direction } = Rover.getRoverCoordinatesAndDirection(instructions);
    const rover = new Rover(name, x, y, direction, this.plateau);
    this.rovers.push(rover);
  }

  /**
   * Finds the rover and calls to apply the instructions.
   */
  private applyRoverInstructions(name: string, instructions: string) {
    const rover = this.rovers.find((r) => r.name === name);
    if (!rover) {
      throw new Error('No rover was found');
    }
    rover.applyInstructions(instructions);
  }

  /**
   * Splits the string into chunks.
   */
  static getCommandsArr(commands: string): string[] {
    if (!commands) {
      throw new Error('No commands provided!');
    }
    return commands.split('\n');
  }

  /**
   * Takes a value and tries to convert to a positive number.
   */
  static convertCoordinateIntoValidNumber(coordinate: unknown): number {
    const coordinateNumber = Number(coordinate);
    if (isNaN(coordinateNumber) || coordinate < 0) {
      throw new Error('Coordinate is invalid!');
    }
    return coordinateNumber;
  }
}
