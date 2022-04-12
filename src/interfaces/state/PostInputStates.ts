export interface PostInputStates {
  title: string;
  content: string;
  previewContent: string;
  valid: boolean;
  didError: {
    title: boolean | undefined;
    content: boolean | undefined;
  };
  validate: boolean;
}
