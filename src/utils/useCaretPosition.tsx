import { useState, useCallback, RefObject } from "react";

interface CaretPos {
  x: number;
  y: number;
}

const useCaretPosition = (input: RefObject<HTMLTextAreaElement>) => {
  const [caretPosition, setCaretPosition] = useState<CaretPos>({
    x: 0,
    y: 0,
  });

  const createCopy = useCallback((textArea: HTMLTextAreaElement) => {
    const copy = document.createElement("div");
    copy.textContent = textArea.value;
    const style = getComputedStyle(textArea);
    [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "wordWrap",
      "whiteSpace",
      "borderLeftWidth",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "lineHeight",
    ].forEach(function (key) {
      copy.style.setProperty(key, style.getPropertyValue(key));
    });
    copy.style.overflow = "auto";
    copy.style.width = `${textArea.offsetWidth}px`;
    copy.style.height = `${textArea.offsetHeight}px`;
    copy.style.position = "absolute";
    copy.style.left = `${textArea.offsetLeft}px`;
    copy.style.top = `${textArea.offsetTop}px`;
    copy.style.whiteSpace = "break-spaces";
    document.body.appendChild(copy);
    return copy;
  }, []);

  const getCaretPosition = useCallback(() => {
    const textArea = input.current;
    if (!textArea) return;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const copy = createCopy(textArea);
    const range = document.createRange();
    range.setStart(copy.firstChild as Node, start);
    range.setEnd(copy.firstChild as Node, end);
    const rects = range.getClientRects();
    document.body.removeChild(copy);
    textArea.selectionStart = start;
    textArea.selectionEnd = end;
    textArea.focus();
    if (rects.length > 0) {
      const rect = rects[0];
      setCaretPosition({
        x: rect.left,
        y: rect.top,
      });
    }
  }, [createCopy, input]);

  return { caretPosition, getCaretPosition };
};

export default useCaretPosition;
