import { ReactNode } from "react";

import "./index.scss";

type QuestionType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

export default function Question({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children,
}: QuestionType) {
  return (
    <div
      className={`question ${isAnswered && "answered"} ${
        isHighLighted && "highlight"
      }`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
