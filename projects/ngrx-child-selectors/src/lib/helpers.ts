export function capitalize<Text extends string>(text: Text): Capitalize<Text> {
  const capitalizedText = text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
  return capitalizedText as Capitalize<Text>;
}
