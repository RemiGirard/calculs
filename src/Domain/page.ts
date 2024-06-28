export const PageNames = [
  'generateExercises',
  // 'game',
  // 'finish',
  'config',
  // 'pageNotFound',
] as const;

export type PageName = typeof PageNames[number];
