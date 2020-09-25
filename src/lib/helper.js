/*eslint-disable*/
import store from '../store';

export function getFieldBounds (xPos, yPos) {
  const xMin = xPos > 0 ? xPos - 1 : 0;
  const xMax = xPos < store.state.settings.fieldSize.x - 1
    ? xPos + 1
    : store.state.settings.fieldSize.x - 1;

  const yMin = yPos > 0 ? yPos - 1 : 0;
  const yMax = yPos < store.state.settings.fieldSize.y - 1
    ? yPos + 1
    : store.state.settings.fieldSize.y - 1;

  return {
    xMin: xMin,
    xMax: xMax,
    yMin: yMin,
    yMax: yMax
  };
}

export function getMinesAroundField (xPos, yPos) {
  const bounds = getFieldBounds(xPos, yPos);

  return store.state.game.mines.filter(mine => {
    return (mine[0] >= bounds.xMin && mine[0] <= bounds.xMax)
      && (mine[1] >= bounds.yMin && mine[1] <= bounds.yMax);
  });
}

export function getFreeFieldsForPosition (xPos, yPos) {
  const bounds = getFieldBounds(xPos, yPos);

  return store.state.game.fields.filter(field => {
    return (field.x !== xPos && field.y !== yPos) // field is not at the current position
      && (field.x >= bounds.xMin && field.x <= bounds.xMax) // field is inside x bounds
      && (field.y >= bounds.yMin && field.y <= bounds.yMax) // field is inside y bounds
      && field.mineCount < 2; // field has max 1 mine count
  });
}

export function revealFreeFields (field) {
  if (field.mineCount > 0) {
    return;
  }

  const fields = getFreeFieldsForPosition(field.x, field.y);

  console.log(fields); //@DEBUG

  if (fields.length === 0) {
    return;
  }

  fields.forEach((field) => {
    field.setRevealed(true);
  });
}
