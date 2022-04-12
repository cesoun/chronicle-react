interface PostValidation {
  didTitle: boolean;
  didContent: boolean;
}

export function validatePost(title: string, content: string): PostValidation {
  const titleMin = 5;
  const titleMax = 255;
  const contentMin = 35;
  const contentMax = 65535;

  let didTitle = title.length >= titleMin && title.length <= titleMax;
  let didContent = content.length >= contentMin && content.length <= contentMax;

  return { didTitle, didContent };
}
