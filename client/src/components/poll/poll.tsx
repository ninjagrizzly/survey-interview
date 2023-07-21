import * as React from "react";
import { useEffect, useState } from "react";
import { Poll as IPoll, ChoiceQuestion, RatingQuestion } from "../../typings";
import MuiRating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

interface PollProps {
  pollID: string;
}

const Choice = (props: { label: string }) => {
  return (
    <>
      <br />
      <Typography>{props.label}</Typography>
    </>
  );
};

const Rating = ({
  max,
  onChange,
}: {
  max: number;

  onChange: (v: number | null) => void;
}) => {
  const [value, setValue] = useState<number | null>(0);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <MuiRating
        value={value}
        onChange={(_, value) => {
          setValue(value);
          onChange(value);
        }}
        max={max}
      />
    </Box>
  );
};

export function Poll({ pollID }: PollProps) {
  const [data, setdata] = useState<IPoll>();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState<
    (ChoiceQuestion | RatingQuestion)[]
  >([]);
  const [amountPages, setAmountPages] = useState(0);

  useEffect(() => {
    const getPoll = async () => {
      const res = await fetch(`/api/poll/${pollID}`);
      const data = (await res.json()) as IPoll;

      setdata(data);
    };

    getPoll();
  }, []);

  useEffect(() => {
    if (!data) return;

    const questions = data.pages[currentPage].questions.map(
      (questionId) => data.questions[questionId]
    );

    setAmountPages(data.pageOrder.length);
    setQuestions(questions);
  }, [data, currentPage]);

  const onRatingChange = (value: number | null) => {
    // send to back
  };

  const onPageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <h1>
      Здесь опрос c id: {pollID}
      {questions.map((ques, i) => {
        if (ques.type === "choice") {
          return <Choice key={ques.id} label={ques.label} />;
        }
        if (ques.type === "rating") {
          return (
            <Rating
              key={ques.id}
              max={ques.maxValue}
              onChange={onRatingChange}
            />
          );
        }
      })}
      <br />
      <Pagination
        count={amountPages}
        page={currentPage}
        color="secondary"
        onChange={onPageChange}
      />
    </h1>
  );
}
