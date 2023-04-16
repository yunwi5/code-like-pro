export enum ShowCaseSection {
  MODEL_ANSWER = 'Model Answer',
  SHOWCASES = 'Showcases',
  DISCUSSIONS = 'Discussions',
}

export const ShowCaseSectionList = Object.values(ShowCaseSection || {});

export const getShowCaseSection = (section: string): ShowCaseSection | undefined => {
  return ShowCaseSectionList.find((s) => s.toLowerCase() === section.toLowerCase());
};
