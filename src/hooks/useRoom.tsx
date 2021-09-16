import { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionsType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  hasLiked: boolean;
};

type FirebaseQuestionsType = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
      authorId: string;
    }>;
  }
>;

export default function useRoom(roomId: string) {
  const { user } = useAuth()
  const [question, setQuestion] = useState<QuestionsType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestionsType =
        databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            hasLiked: Object.values(value.likes ?? {}).some(like=> like.authorId === user?.id)
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    });
    return ()=>{
      roomRef.off('value')
    }
  }, [roomId, user?.id]);

  return { question, title }
}
