import { readFile } from 'fs';
import { join } from 'path';
import Mission from './models/Mission';

readFile(join(__dirname, 'COMMAND.txt'), 'utf8', function (err, commands) {
  if (err) {
    throw err;
  }

  const mission = new Mission(commands);
  mission.printRoversPositions();
});
