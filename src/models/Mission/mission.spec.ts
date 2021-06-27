import Mission from '.';

describe('convertCoordinateIntoValidNumber static method', () => {
  it('should convert a string to number', () => {
    const result = Mission.convertCoordinateIntoValidNumber('54');
    expect(result).toBe(54);
  });

  it("should fail if the provided param can't be converted to number", () => {
    expect(() => Mission.convertCoordinateIntoValidNumber('CSGO')).toThrowError();
  });

  it('should fail if the number is negative', () => {
    expect(() => Mission.convertCoordinateIntoValidNumber(-2)).toThrowError();
  });
});

describe('getCommandsArr static method', () => {
  it('should return an array of strings splitted by new line indicator', () => {
    const command = 'Plateau:5 5\nRover1 Landing:1 2 N\nRover1 Instructions:LMLMLMLMM';
    const result = Mission.getCommandsArr(command);
    expect(result[0]).toBe('Plateau:5 5');
    expect(result[1]).toBe('Rover1 Landing:1 2 N');
    expect(result[2]).toBe('Rover1 Instructions:LMLMLMLMM');
  });

  it('should fail with an empty command string', () => {
    expect(() => Mission.getCommandsArr('')).toThrowError();
  });
});

describe('constructor', () => {
  it('should give the expected output when its properties logged', () => {
    const command =
      'Plateau:5 5\nRover1 Landing:1 2 N\nRover1 Instructions:LMLMLMLMM\nRover2 Landing:3 3 E\nRover2 Instructions:MMRMMRMRRM';
    const mission = new Mission(command);
    const consoleSpy = jest.spyOn(console, 'log');
    mission.printRoversPositions();
    expect(consoleSpy).toBeCalledWith('Rover1:1 3 N');
    expect(consoleSpy).toBeCalledWith('Rover2:5 1 E');
    expect(consoleSpy).toBeCalledTimes(2);
  });
});
