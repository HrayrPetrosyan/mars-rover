import { Coordinates, PLATEAU } from '../../constants';
import Mission from '../Mission';

export default class Plateau {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = Mission.convertCoordinateIntoValidNumber(x);
    this.y = Mission.convertCoordinateIntoValidNumber(y);
  }

  /**
   * Validates the 1st line of the command and returns it
   */
  static getPlateauCommand(commands: string[]): string {
    const plateauCommand = commands[0];
    if (!plateauCommand.startsWith(PLATEAU)) {
      throw new Error('The Plateau command is invalid!');
    }
    return plateauCommand;
  }

  /**
   * Parses the Plateau command and returns it params
   */
  static getPlateauCoordinates(command: string): Coordinates {
    const coordinates = command.split(':')[1];
    if (!coordinates) {
      throw new Error('The Plateau command is invalid!');
    }

    const [x, y] = coordinates.split(' ');
    const params = {
      x: Mission.convertCoordinateIntoValidNumber(x),
      y: Mission.convertCoordinateIntoValidNumber(y),
    };

    return params;
  }
}
