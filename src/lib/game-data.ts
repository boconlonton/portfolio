import gameContent from "./game-content.json";

export type GameType = "wyr" | "nhi" | "mlt";
export type GameTypeOrShuffle = GameType | "shuffle";
export type PenaltyIntensity = "easy" | "medium" | "hard";
export type QuestionLevel = 1 | 2 | 3 | 4 | 5;

export interface GameModeDefinition {
  label: string;
  rule: string;
  penalty: string;
}

export const GAME_DEFINITIONS: Record<GameType, GameModeDefinition> = {
  nhi: {
    label: "Never Have I Ever",
    rule: "Ai đã từng làm việc này thì phải hạ 1 ngón tay hoặc uống 1 ngụm.",
    penalty:
      "Người hết ngón tay trước hoặc say trước sẽ phải thực hiện một yêu cầu lớn từ người kia.",
  },
  wyr: {
    label: "Would You Rather",
    rule: "Chọn 1 trong 2 lựa chọn và giải thích lý do tại sao.",
    penalty:
      "Nếu không chọn được sau 10 giây, phải uống một ngụm 'phạt vì thiếu quyết đoán'.",
  },
  mlt: {
    label: "Most Likely To",
    rule: "Cả hai cùng đếm 1-2-3 và chỉ tay về phía người mà bạn nghĩ là giống với mô tả nhất.",
    penalty:
      "Người bị chỉ tay vào (hoặc cả hai nếu chỉ khác nhau) phải uống 1 ngụm.",
  },
};

export interface Question {
  id: string;
  gameType: GameType;
  level: QuestionLevel;
  content: string;
  specialRule: string | null;
  specialPenalty: string | null;
}

export interface Penalty {
  id: string;
  intensity: PenaltyIntensity;
  content: string;
}

export const QUESTIONS: Question[] = gameContent.questions as Question[];
export const PENALTIES: Penalty[] = gameContent.penalties as Penalty[];
