"use client";
import { useEffect, useMemo, useState } from "react";
import "./terminal.css";

const Terminal = ({
  title = "Status",
  content = "Loading...",

  containerStyle = {},
  titleStyle = {},
  contentStyle = {},

  typewriter = false,
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1500,
  loop = true,
}) => {
  const texts = useMemo(
    () => (Array.isArray(content) ? content : [content]),
    [content],
  );
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!typewriter) return;

    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);

        if (textIndex < texts.length - 1) {
          setTextIndex((i) => i + 1);
        } else if (loop) {
          setTextIndex(0);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pause,
    loop,
    typewriter,
  ]);

  return (
    <div className="tb-terminal" style={containerStyle}>
      <div className="tb-terminal__header">
        <div className="tb-terminal__title" style={titleStyle}>
          {title}
        </div>

        <div className="tb-terminal__controls">
          <div className="tb-terminal__control tb-terminal__control--close" />
          <div className="tb-terminal__control tb-terminal__control--minimize" />
          <div className="tb-terminal__control tb-terminal__control--maximize" />
        </div>
      </div>

      <div
        className={`tb-terminal__text${typewriter ? " tb-terminal__text--cursor" : ""}`}
        style={contentStyle}
      >
        {typewriter ? displayedText : content}
      </div>
    </div>
  );
};

export default Terminal;
