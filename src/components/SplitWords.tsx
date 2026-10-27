import type { ReactNode } from "react";

interface SplitWordsProps {
  text: string;
  /**
   * Renders one character. Returning a plain <span> keeps it static; returning
   * a motion component lets the parent animate each character.
   */
  renderChar?: (char: string, index: number) => ReactNode;
  /** Class for each character span when `renderChar` is not used. */
  charClassName?: string;
  /** Extra class for each word wrapper (words never break mid-word). */
  wordClassName?: string;
}

/**
 * Splits text into words and characters so an animation can target each
 * character while words still wrap as whole units.
 *
 * Without the word wrapper, `inline-block` characters let a word such as
 * "PROFILE" break across lines as "PROFI" / "LE" — this prevents that.
 */
export function SplitWords({
  text,
  renderChar,
  charClassName = "",
  wordClassName = "",
}: SplitWordsProps) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={`inline-block whitespace-nowrap ${wordClassName}`}
        >
          {Array.from(word).map((char, charIndex) =>
            renderChar ? (
              renderChar(char, wordIndex * 100 + charIndex)
            ) : (
              <span key={`${char}-${charIndex}`} className={`inline-block ${charClassName}`}>
                {char}
              </span>
            ),
          )}
          {wordIndex < words.length - 1 ? <span>{"\u00A0"}</span> : null}
        </span>
      ))}
    </>
  );
}
