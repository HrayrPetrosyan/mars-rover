import Plateau from '.';

describe('getPlateauCommand static method', () => {
  it('should return the 1st line as it starts with Plateau', () => {
    const validCommandArr = ['Plateau:5 5'];
    const plateauCommand = Plateau.getPlateauCommand(validCommandArr);
    expect(plateauCommand).toBe(validCommandArr[0]);
  });

  it('should fail if the 1st command does not start with Plateau', () => {
    const invalidCommandArr = ['5 5:Plateau'];
    expect(() => Plateau.getPlateauCommand(invalidCommandArr)).toThrowError();
  });

  it('should fail in case the 1st command is empty', () => {
    const invalidCommandArr = [''];
    expect(() => Plateau.getPlateauCommand(invalidCommandArr)).toThrowError();
  });
});

describe('getPlateauCoordinates static method', () => {
  it('should return x and y coordinates when a valid command is passed', () => {
    const validCommand = 'Whatever:1 2';
    const result = Plateau.getPlateauCoordinates(validCommand);
    expect(result).toMatchObject({ x: 1, y: 2 });
  });

  it('should fail when no space between the coordinates', () => {
    const invalidCommand = 'Whatever:12';
    expect(() => Plateau.getPlateauCoordinates(invalidCommand)).toThrowError();
  });

  it('should fail when the command is empty', () => {
    const invalidCommand = '';
    expect(() => Plateau.getPlateauCoordinates(invalidCommand)).toThrowError();
  });
});

describe('constructor', () => {
  it('should instanciate with valid parameters', () => {
    const plateau = new Plateau(3, 8);
    expect(plateau).toHaveProperty('x', 3);
    expect(plateau).toHaveProperty('y', 8);
  });

  it('should fail when a parameter is under 0', () => {
    expect(() => new Plateau(-3, 8)).toThrowError();
  });
});
