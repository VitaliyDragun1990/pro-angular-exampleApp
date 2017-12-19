export function getStylesFromClasses(names: string | string[],
                                     elementType: string = 'div'): { [key: string]: string | number } {

  const elem = document.createElement(elementType);
  (typeof names === 'string' ? [names] : names).forEach(c => elem.classList.add(c));

  const result = {};
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i] as CSSStyleSheet;
    const rules = sheet.rules || sheet.cssRules;
    for (let j = 0; j < rules.length; j++) {
      if (rules[j].type === CSSRule.STYLE_RULE) {
        const styleRule = rules[j] as CSSStyleRule;
        if (elem.matches(styleRule.selectorText)) {
          for (let k = 0; k < styleRule.style.length; k++) {
            result[styleRule.style[k]] =
              styleRule.style[styleRule.style[k]];
          }
        }
      }
    }
  }
  return result;
}
